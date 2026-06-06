// RoomDO — one Durable Object instance per game room code.
//
// Role: WebSocket relay + minimal lobby coordination. The host client
// is authoritative for game state; the DO does not simulate. It just
// fans messages out to the room and remembers the most recent snapshot
// so a late-joining or reconnecting client can resync without waiting
// for the next host broadcast.
//
// Uses the WebSocket Hibernation API so an idle room costs almost nothing.

const MAX_MEMBERS = 12;       // 6 seats + spectators headroom
const MAX_SNAPSHOT_BYTES = 256 * 1024;
const MAX_MESSAGE_BYTES  = 32 * 1024;

export class RoomDO {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    // Map<WebSocket, { id, seat, name, role }>
    this.members = new Map();
    // Most recent host-broadcast G snapshot (JSON string) so new joiners can resync.
    this.snapshot = null;
    // Identity of the host socket (its member.id), if any.
    this.hostId = null;

    // Re-attach metadata for already-open hibernated sockets.
    for (const ws of state.getWebSockets()) {
      const meta = ws.deserializeAttachment();
      if (meta) this.members.set(ws, meta);
      if (meta?.role === 'host') this.hostId = meta.id;
    }
  }

  async fetch(request) {
    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    // parts = ['api','room',CODE, ...rest]
    const tail = parts.slice(3);
    const code = (parts[2] || '').toUpperCase();

    if (tail[0] === 'ws') {
      return this.handleUpgrade(request, code);
    }
    if (tail.length === 0 || tail[0] === 'status') {
      return this.handleStatus(code);
    }
    return new Response('not_found', { status: 404 });
  }

  handleStatus(code) {
    const seats = {};
    for (const meta of this.members.values()) {
      if (meta.seat != null) seats[meta.seat] = { id: meta.id, name: meta.name || `seat-${meta.seat}` };
    }
    return new Response(JSON.stringify({
      code,
      members: this.members.size,
      hostId: this.hostId,
      seats,
    }), { headers: { 'content-type': 'application/json' } });
  }

  async handleUpgrade(request, code) {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('upgrade required', { status: 426 });
    }
    if (this.members.size >= MAX_MEMBERS) {
      return new Response('room full', { status: 503 });
    }

    const url = new URL(request.url);
    const role = url.searchParams.get('role') === 'host' ? 'host' : 'client';
    const requestedSeat = parseInt(url.searchParams.get('seat') ?? '', 10);
    const name = (url.searchParams.get('name') || '').slice(0, 32) || null;

    const pair = new WebSocketPair();
    const [client, server] = [pair[0], pair[1]];

    const id = crypto.randomUUID();
    const meta = {
      id,
      role,
      name,
      seat: Number.isFinite(requestedSeat) && requestedSeat >= 0 && requestedSeat <= 5 ? requestedSeat : null,
      code,
    };

    // Only one host slot — if a host is already attached, demote the new one to client.
    if (role === 'host' && this.hostId) meta.role = 'client';
    if (meta.role === 'host') this.hostId = id;

    server.serializeAttachment(meta);
    this.members.set(server, meta);

    this.state.acceptWebSocket(server);

    // Send a hello with current room state + last snapshot (if any).
    safeSend(server, {
      t: 'hello',
      you: meta,
      members: this.snapshotMembers(),
      hostId: this.hostId,
      hasSnapshot: !!this.snapshot,
    });
    if (meta.role !== 'host' && this.snapshot) {
      safeSend(server, { t: 'snapshot', data: this.snapshot });
    }
    this.broadcast({ t: 'member-joined', member: meta }, server);

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, raw) {
    if (typeof raw !== 'string') return;
    if (raw.length > MAX_MESSAGE_BYTES) {
      safeSend(ws, { t: 'error', why: 'message_too_large' });
      return;
    }
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    if (!msg || typeof msg.t !== 'string') return;

    const meta = this.members.get(ws);
    if (!meta) return;

    switch (msg.t) {
      case 'claim-seat': {
        const seat = parseInt(msg.seat, 10);
        if (!Number.isInteger(seat) || seat < 0 || seat > 5) return;
        // Reject if already taken by another member.
        for (const m of this.members.values()) if (m !== meta && m.seat === seat) {
          safeSend(ws, { t: 'error', why: 'seat_taken', seat });
          return;
        }
        meta.seat = seat;
        if (msg.name) meta.name = String(msg.name).slice(0, 32);
        ws.serializeAttachment(meta);
        this.broadcast({ t: 'member-updated', member: meta });
        break;
      }
      case 'release-seat': {
        meta.seat = null;
        ws.serializeAttachment(meta);
        this.broadcast({ t: 'member-updated', member: meta });
        break;
      }
      case 'snapshot': {
        // Only the host may push authoritative snapshots.
        if (meta.role !== 'host') return;
        if (typeof msg.data !== 'string') return;
        if (msg.data.length > MAX_SNAPSHOT_BYTES) {
          safeSend(ws, { t: 'error', why: 'snapshot_too_large' });
          return;
        }
        this.snapshot = msg.data;
        this.broadcast({ t: 'snapshot', data: msg.data }, ws);
        break;
      }
      case 'intent': {
        // Player inputs flowing client → host. Forward only to the host.
        const hostSocket = this.findSocketById(this.hostId);
        if (!hostSocket) return;
        safeSend(hostSocket, {
          t: 'intent',
          from: { id: meta.id, seat: meta.seat, name: meta.name },
          action: msg.action,
        });
        break;
      }
      case 'chat': {
        const text = String(msg.text || '').slice(0, 280);
        if (!text.trim()) return;
        this.broadcast({
          t: 'chat',
          from: { id: meta.id, seat: meta.seat, name: meta.name },
          text,
          at: Date.now(),
        });
        break;
      }
      case 'ping': {
        safeSend(ws, { t: 'pong', at: Date.now(), echo: msg.at });
        break;
      }
      case 'start-host-claim': {
        // Fallback host election: if no host is present yet, the first
        // member to ask gets it.
        if (this.hostId && this.findSocketById(this.hostId)) return;
        this.hostId = meta.id;
        meta.role = 'host';
        ws.serializeAttachment(meta);
        this.broadcast({ t: 'host-changed', hostId: this.hostId });
        break;
      }
    }
  }

  async webSocketClose(ws, code, reason, wasClean) {
    this.dropSocket(ws);
  }
  async webSocketError(ws, err) {
    this.dropSocket(ws);
  }

  dropSocket(ws) {
    const meta = this.members.get(ws);
    if (!meta) return;
    this.members.delete(ws);
    if (this.hostId === meta.id) {
      this.hostId = null;
      // Promote the next member (if any) to host so a disconnect doesn't kill the room.
      const next = this.members.values().next().value;
      if (next) {
        next.role = 'host';
        this.hostId = next.id;
        const nextSock = this.findSocketById(next.id);
        if (nextSock) nextSock.serializeAttachment(next);
        this.broadcast({ t: 'host-changed', hostId: this.hostId });
      } else {
        // Room is empty — drop the cached snapshot so a fresh match starts clean.
        this.snapshot = null;
      }
    }
    this.broadcast({ t: 'member-left', id: meta.id, seat: meta.seat });
  }

  findSocketById(id) {
    if (!id) return null;
    for (const [ws, meta] of this.members) if (meta.id === id) return ws;
    return null;
  }

  snapshotMembers() {
    return Array.from(this.members.values()).map((m) => ({
      id: m.id, role: m.role, name: m.name, seat: m.seat,
    }));
  }

  broadcast(payload, exceptWs) {
    const text = JSON.stringify(payload);
    for (const ws of this.members.keys()) {
      if (ws === exceptWs) continue;
      try { ws.send(text); } catch {}
    }
  }
}

function safeSend(ws, payload) {
  try { ws.send(JSON.stringify(payload)); } catch {}
}
