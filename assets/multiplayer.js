/* ============================================================
   toroid.fyi · play/ multiplayer client
   ------------------------------------------------------------
   Host-authoritative relay against the RoomDO Worker.

   - One client per room is the HOST. They run the canonical
     simulation in their own browser using the game's G object
     and existing logic. After every meaningful state change
     they broadcast a snapshot of G.
   - All other clients are MIRRORS. They receive snapshots,
     overwrite their local G, and re-render. Their inputs go
     to the host as "intent" messages; the host applies them
     as if they were local clicks.
   - The Durable Object is a pure relay + snapshot cache.

   Designed to be additive: if multiplayer.js fails to load
   (or the Worker isn't reachable), the existing hot-seat
   game keeps working unchanged.
   ============================================================ */
(function () {
  'use strict';

  if (window.__toroidMP) return;
  const MP = (window.__toroidMP = {});

  const wsScheme = location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsBase = `${wsScheme}//${location.host}/api/room`;

  // ---------- state ----------
  const net = {
    ws: null,
    code: null,
    role: null,           // 'host' | 'client'
    you: null,            // member identity assigned by the DO
    members: [],          // array of { id, role, seat, name }
    connected: false,
    snapshotPending: false,
    lastSentSnapshot: '',
    snapshotTimer: null,
  };

  // ---------- snapshot serialization ----------
  // G contains some non-JSON-friendly types (Set). Convert on the way out
  // and reconstruct on the way in. Three.js objects (camera, renderer,
  // meshes) are NOT in G — they live in module scope — so they never
  // serialize. The game's renderEntities() rebuilds visuals from G.
  function serializeG() {
    if (typeof G === 'undefined') return null;
    const out = {};
    for (const [k, v] of Object.entries(G)) {
      // Skip private/derived fields and DOM refs.
      if (k.startsWith('_')) continue;
      if (v instanceof Set) { out[k] = { __set: [...v] }; continue; }
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        // Walk one level for nested Sets in keyed dicts like sunSquaresClaimed.
        let copy = null;
        for (const [kk, vv] of Object.entries(v)) {
          if (vv instanceof Set) {
            if (!copy) copy = { ...v };
            copy[kk] = { __set: [...vv] };
          }
        }
        out[k] = copy || v;
        continue;
      }
      out[k] = v;
    }
    try { return JSON.stringify(out); } catch { return null; }
  }

  function applySnapshot(jsonStr) {
    if (typeof G === 'undefined') return;
    let parsed;
    try { parsed = JSON.parse(jsonStr); } catch { return; }
    if (!parsed || typeof parsed !== 'object') return;
    // Rehydrate Sets.
    for (const [k, v] of Object.entries(parsed)) {
      if (v && typeof v === 'object' && Array.isArray(v.__set)) {
        parsed[k] = new Set(v.__set);
        continue;
      }
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        for (const [kk, vv] of Object.entries(v)) {
          if (vv && typeof vv === 'object' && Array.isArray(vv.__set)) {
            v[kk] = new Set(vv.__set);
          }
        }
      }
    }
    // Overwrite top-level fields without breaking object identity of G.
    for (const k of Object.keys(G)) if (k in parsed) G[k] = parsed[k];
    // Mirror clients should always view from their bound seat.
    if (net.you && net.you.seat != null) G.viewerPlayer = net.you.seat;

    // Re-render. These globals are defined in play/index.html.
    safeCall(window.refreshTorusTexture);
    safeCall(window.renderEntities);
    safeCall(window.syncNodeVisuals);
    safeCall(window.syncBarrierVisuals);
    safeCall(window.renderHUD);
  }

  function safeCall(fn) { if (typeof fn === 'function') try { fn(); } catch {} }

  // ---------- host snapshot scheduler ----------
  // Rather than instrument every G mutation, we sample G ~5×/s while
  // the room has a host. If the JSON hasn't changed, nothing is sent.
  function startHostBroadcastLoop() {
    if (net.snapshotTimer) return;
    net.snapshotTimer = setInterval(() => {
      if (!net.connected || net.role !== 'host') return;
      const json = serializeG();
      if (!json || json === net.lastSentSnapshot) return;
      net.lastSentSnapshot = json;
      send({ t: 'snapshot', data: json });
    }, 200);
  }
  function stopHostBroadcastLoop() {
    if (net.snapshotTimer) { clearInterval(net.snapshotTimer); net.snapshotTimer = null; }
  }

  // ---------- intent dispatch (mirror → host) ----------
  function sendIntent(action) {
    if (!net.connected) return;
    if (net.role === 'host') { applyIntentLocally(action); return; }
    send({ t: 'intent', action });
  }

  function applyIntentLocally(action) {
    // Host applies a remote seat's input as if it were a local click.
    // The active player check inside the game functions normally gates
    // who can act; we temporarily flip activePlayer so the action
    // resolves under the correct identity, then return.
    if (!action || typeof action !== 'object') return;
    const fromSeat = action.seat;
    const savedActive = G.activePlayer;
    if (Number.isInteger(fromSeat)) G.activePlayer = fromSeat;
    try {
      switch (action.kind) {
        case 'plot':
          if (typeof window.plotMove === 'function' && action.pieceId != null && Array.isArray(action.target))
            window.plotMove(action.pieceId, action.target);
          break;
        case 'unplot':
          if (typeof window.unplotLast === 'function') window.unplotLast();
          break;
        case 'ready':
          if (typeof window.readyUp === 'function') window.readyUp();
          break;
        case 'card':
          if (typeof window.stageCard === 'function' && action.card)
            window.stageCard(fromSeat ?? G.activePlayer, action.card);
          break;
      }
    } finally {
      G.activePlayer = savedActive;
      safeCall(window.renderHUD);
    }
  }

  // ---------- WebSocket plumbing ----------
  function connect({ code, role, seat, name }) {
    return new Promise((resolve, reject) => {
      if (!/^[A-Z0-9]{4,12}$/.test(code)) return reject(new Error('bad code'));
      const qs = new URLSearchParams();
      if (role) qs.set('role', role);
      if (seat != null) qs.set('seat', String(seat));
      if (name) qs.set('name', name);
      const url = `${wsBase}/${code}/ws?${qs.toString()}`;
      const ws = new WebSocket(url);
      net.ws = ws;
      net.code = code;

      ws.addEventListener('open', () => {
        net.connected = true;
        if (role === 'host') startHostBroadcastLoop();
        renderLobby();
      });
      ws.addEventListener('close', () => {
        net.connected = false;
        stopHostBroadcastLoop();
        renderLobby();
      });
      ws.addEventListener('error', (e) => {
        // Resolve(false) so caller knows to surface a UI error.
        reject(e);
      });
      ws.addEventListener('message', (ev) => {
        let msg;
        try { msg = JSON.parse(ev.data); } catch { return; }
        handleMessage(msg);
        if (msg.t === 'hello') resolve(msg);
      });
    });
  }

  function send(payload) {
    if (!net.ws || net.ws.readyState !== WebSocket.OPEN) return;
    net.ws.send(JSON.stringify(payload));
  }

  function handleMessage(msg) {
    switch (msg.t) {
      case 'hello':
        net.you = msg.you;
        net.role = msg.you.role;
        net.members = msg.members;
        break;
      case 'member-joined':
        if (!net.members.find((m) => m.id === msg.member.id)) net.members.push(msg.member);
        break;
      case 'member-updated':
        net.members = net.members.map((m) => (m.id === msg.member.id ? msg.member : m));
        break;
      case 'member-left':
        net.members = net.members.filter((m) => m.id !== msg.id);
        break;
      case 'host-changed':
        net.members = net.members.map((m) => ({ ...m, role: m.id === msg.hostId ? 'host' : 'client' }));
        if (net.you) {
          net.you.role = net.you.id === msg.hostId ? 'host' : 'client';
          net.role = net.you.role;
          if (net.role === 'host') startHostBroadcastLoop(); else stopHostBroadcastLoop();
        }
        break;
      case 'snapshot':
        if (net.role !== 'host') applySnapshot(msg.data);
        break;
      case 'intent':
        if (net.role === 'host') applyIntentLocally({ ...msg.action, seat: msg.from?.seat });
        break;
      case 'chat':
        addChatLine(msg);
        break;
    }
    renderLobby();
  }

  // ---------- UI (lobby modal) ----------
  function ensureUI() {
    if (document.getElementById('mp-modal')) return;

    const css = `
      #mp-pill { background:rgba(28,20,52,0.65); color:#cbb4ff; border:1.5px solid rgba(203,180,255,0.6); }
      #mp-modal { position:fixed; inset:0; z-index:1000; background:rgba(4,2,9,0.78);
        display:none; align-items:center; justify-content:center; backdrop-filter:blur(6px); }
      #mp-modal.show { display:flex; }
      #mp-modal .card { background:linear-gradient(180deg,#1b1432,#0f0a22); border:1px solid rgba(182,164,255,0.45);
        border-radius:14px; padding:22px 26px; width:min(94vw, 520px); color:#ece8e0;
        font-family:ui-sans-serif,-apple-system,Segoe UI,Roboto,sans-serif; box-shadow:0 18px 60px rgba(0,0,0,0.6); }
      #mp-modal h3 { margin:0 0 8px; font-weight:500; letter-spacing:0.02em; }
      #mp-modal .row { display:flex; gap:8px; align-items:center; margin:10px 0; flex-wrap:wrap; }
      #mp-modal label { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#8c8298; }
      #mp-modal input { background:rgba(8,4,18,0.6); border:1px solid rgba(182,164,255,0.35); border-radius:8px;
        padding:8px 10px; color:#ece8e0; font-family:ui-monospace,Menlo,monospace; font-size:13px; letter-spacing:0.16em;
        text-transform:uppercase; width:160px; }
      #mp-modal button.mp-btn { padding:8px 14px; border-radius:999px; border:1px solid rgba(182,164,255,0.55);
        background:rgba(28,20,52,0.65); color:#ece8e0; cursor:pointer; font-size:12px; letter-spacing:0.04em; }
      #mp-modal button.mp-btn.primary { background:rgba(124,80,224,0.30); border-color:rgba(182,164,255,0.85); }
      #mp-modal button.mp-btn:hover { background:rgba(182,164,255,0.18); }
      #mp-modal .seats { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; margin-top:8px; }
      #mp-modal .seat { padding:8px; border:1px solid rgba(182,164,255,0.25); border-radius:8px; font-size:12px;
        display:flex; flex-direction:column; gap:2px; cursor:pointer; }
      #mp-modal .seat.mine { border-color:#b6a4ff; background:rgba(124,80,224,0.18); }
      #mp-modal .seat.taken { opacity:0.65; cursor:not-allowed; }
      #mp-modal .seat .name { font-weight:600; }
      #mp-modal .seat .who { font-family:ui-monospace,Menlo,monospace; font-size:10px; color:#8c8298; letter-spacing:0.12em; }
      #mp-modal .code { font-family:ui-monospace,Menlo,monospace; font-size:24px; letter-spacing:0.42em; color:#cbb4ff; padding:8px 12px;
        border:1px dashed rgba(182,164,255,0.45); border-radius:10px; display:inline-block; }
      #mp-modal .muted { color:#8c8298; font-size:11px; }
      #mp-modal .close { position:absolute; top:14px; right:18px; background:none; border:none; color:#8c8298; font-size:22px; cursor:pointer; }
      #mp-status { position:fixed; left:14px; bottom:14px; z-index:90; font-family:ui-monospace,Menlo,monospace;
        font-size:11px; color:#cbb4ff; background:rgba(8,4,18,0.7); border:1px solid rgba(182,164,255,0.35);
        border-radius:999px; padding:5px 12px; display:none; }
      #mp-status.show { display:inline-block; }
      #mp-chat { margin-top:10px; max-height:120px; overflow-y:auto; font-size:12px; }
      #mp-chat .line { padding:2px 0; }
      #mp-chat .line b { color:#cbb4ff; }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const modal = document.createElement('div');
    modal.id = 'mp-modal';
    modal.innerHTML = `
      <div class="card" style="position:relative">
        <button class="close" aria-label="Close" id="mp-close">×</button>
        <h3>🛰 Online play</h3>
        <p class="muted">Host-authoritative. One browser runs the match; others mirror.
        Empty seats fall back to AI automatically.</p>

        <div id="mp-pre">
          <div class="row">
            <button class="mp-btn primary" id="mp-host-btn">Host new room</button>
            <span class="muted">or</span>
            <input id="mp-code-input" maxlength="12" placeholder="ROOM CODE" autocapitalize="characters" />
            <button class="mp-btn" id="mp-join-btn">Join</button>
          </div>
          <div class="row">
            <label>Your name</label>
            <input id="mp-name-input" maxlength="24" placeholder="player" style="text-transform:none; letter-spacing:0.04em; width:200px" />
          </div>
          <p class="muted" id="mp-err" style="min-height:14px"></p>
        </div>

        <div id="mp-post" style="display:none">
          <div class="row">
            <label>Room</label>
            <span class="code" id="mp-code-display">—</span>
            <button class="mp-btn" id="mp-copy">Copy link</button>
            <button class="mp-btn" id="mp-leave">Leave</button>
          </div>
          <div class="row">
            <label>You</label>
            <span id="mp-you">—</span>
          </div>
          <div>
            <label>Seats</label>
            <div class="seats" id="mp-seats"></div>
          </div>
          <div class="row">
            <button class="mp-btn primary" id="mp-start-btn">Start match</button>
            <span class="muted" id="mp-start-hint">Only the host can start.</span>
          </div>
          <div id="mp-chat"></div>
          <div class="row">
            <input id="mp-chat-input" maxlength="280" placeholder="Say something…" style="flex:1; min-width:140px; text-transform:none; letter-spacing:0.02em; width:auto" />
            <button class="mp-btn" id="mp-chat-send">Send</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const status = document.createElement('div');
    status.id = 'mp-status';
    document.body.appendChild(status);

    // Bind interactions.
    document.getElementById('mp-close').onclick = closeModal;
    document.getElementById('mp-host-btn').onclick = onHost;
    document.getElementById('mp-join-btn').onclick = onJoin;
    document.getElementById('mp-copy').onclick = copyLink;
    document.getElementById('mp-leave').onclick = leaveRoom;
    document.getElementById('mp-start-btn').onclick = startMatch;
    document.getElementById('mp-chat-send').onclick = sendChat;
    document.getElementById('mp-chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChat();
    });

    // Restore saved name.
    try {
      const saved = localStorage.getItem('toroid.mp.name');
      if (saved) document.getElementById('mp-name-input').value = saved;
    } catch {}
  }

  function openModal() {
    ensureUI();
    document.getElementById('mp-modal').classList.add('show');
    renderLobby();
    // Auto-fill from URL ?room=CODE if present.
    const params = new URLSearchParams(location.search);
    const code = (params.get('room') || '').toUpperCase();
    if (code && !net.connected) document.getElementById('mp-code-input').value = code;
  }
  function closeModal() {
    const m = document.getElementById('mp-modal');
    if (m) m.classList.remove('show');
  }

  function onHost() {
    const name = readName();
    const code = randomCode();
    connect({ code, role: 'host', seat: 0, name }).then(() => {
      try { history.replaceState(null, '', `?room=${code}`); } catch {}
    }).catch((e) => showError('Could not start room: ' + (e?.message || 'connection failed')));
  }

  function onJoin() {
    const name = readName();
    const code = (document.getElementById('mp-code-input').value || '').toUpperCase().trim();
    if (!/^[A-Z0-9]{4,12}$/.test(code)) { showError('Room code must be 4–12 letters or digits.'); return; }
    // Pick the lowest unclaimed seat; the user can change it after joining.
    connect({ code, role: 'client', name }).then((hello) => {
      try { history.replaceState(null, '', `?room=${code}`); } catch {}
      // Try to grab seat 1 by default; if taken, leave them as spectator.
      const taken = new Set(hello.members.map((m) => m.seat).filter((s) => s != null));
      for (let s = 1; s <= 5; s++) if (!taken.has(s)) { send({ t: 'claim-seat', seat: s, name }); break; }
    }).catch((e) => showError('Could not join: ' + (e?.message || 'connection failed')));
  }

  function readName() {
    const v = (document.getElementById('mp-name-input')?.value || '').trim().slice(0, 24);
    if (v) try { localStorage.setItem('toroid.mp.name', v); } catch {}
    return v || null;
  }

  function leaveRoom() {
    if (net.ws) try { net.ws.close(); } catch {}
    net.ws = null;
    net.connected = false;
    net.code = null;
    net.role = null;
    net.you = null;
    net.members = [];
    stopHostBroadcastLoop();
    renderLobby();
    try { history.replaceState(null, '', location.pathname); } catch {}
  }

  function copyLink() {
    if (!net.code) return;
    const url = `${location.origin}${location.pathname}?room=${net.code}`;
    try {
      navigator.clipboard.writeText(url);
      flashStatus('Link copied');
    } catch {
      prompt('Copy this link:', url);
    }
  }

  function startMatch() {
    if (net.role !== 'host') { showError('Only the host can start the match.'); return; }
    if (typeof window.startGame !== 'function') { showError('Game not loaded yet.'); return; }
    // Configure seats: every claimed seat becomes a human; everything else is AI.
    const seats = new Set(net.members.map((m) => m.seat).filter((s) => s != null));
    seats.add(0); // host always plays seat 0 by default
    const maxSeat = Math.max(...seats);
    const playerCount = Math.max(2, Math.min(6, maxSeat + 1));
    G.playerCount = playerCount;
    G.humanCount = seats.size;
    // setupSeats is the right click-path normally; we just call startGame.
    window.startGame();
    closeModal();
  }

  function sendChat() {
    const el = document.getElementById('mp-chat-input');
    if (!el) return;
    const text = el.value.trim();
    if (!text) return;
    send({ t: 'chat', text });
    el.value = '';
  }
  function addChatLine(msg) {
    const box = document.getElementById('mp-chat');
    if (!box) return;
    const div = document.createElement('div');
    div.className = 'line';
    const who = msg.from?.name || (msg.from?.seat != null ? `seat ${msg.from.seat}` : 'someone');
    div.innerHTML = `<b>${escapeHtml(who)}:</b> ${escapeHtml(msg.text)}`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function renderLobby() {
    if (!document.getElementById('mp-modal')) return;
    const pre = document.getElementById('mp-pre');
    const post = document.getElementById('mp-post');
    if (net.connected) {
      pre.style.display = 'none'; post.style.display = '';
      document.getElementById('mp-code-display').textContent = net.code || '—';
      const youStr = net.you ? `${net.you.name || '(anon)'} · ${net.you.role}${net.you.seat != null ? ' · seat ' + net.you.seat : ' · spectator'}` : '—';
      document.getElementById('mp-you').textContent = youStr;
      const seatHost = document.getElementById('mp-seats');
      seatHost.innerHTML = '';
      const playerNames = ['Indigo','Sienna','Verdant','Magenta','Amber','Cyan'];
      for (let s = 0; s < 6; s++) {
        const claimer = net.members.find((m) => m.seat === s);
        const mine = net.you && net.you.seat === s;
        const div = document.createElement('div');
        div.className = 'seat' + (mine ? ' mine' : '') + (claimer && !mine ? ' taken' : '');
        div.innerHTML = `<span class="name">${playerNames[s]}</span><span class="who">${claimer ? escapeHtml(claimer.name || claimer.id.slice(0,4)) : 'AI'}</span>`;
        div.onclick = () => {
          if (claimer && !mine) return;
          if (mine) send({ t: 'release-seat' });
          else send({ t: 'claim-seat', seat: s, name: readName() });
        };
        seatHost.appendChild(div);
      }
      document.getElementById('mp-start-btn').disabled = net.role !== 'host';
      document.getElementById('mp-start-hint').textContent = net.role === 'host' ? 'Host plays seat 0; empty seats become AI.' : 'Waiting for the host to start.';
      flashStatus(net.role === 'host' ? `Hosting ${net.code}` : `Joined ${net.code}`);
    } else {
      pre.style.display = ''; post.style.display = 'none';
      const status = document.getElementById('mp-status');
      if (status) status.classList.remove('show');
    }
  }

  function showError(msg) {
    const el = document.getElementById('mp-err');
    if (el) { el.textContent = msg; setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 5000); }
  }

  function flashStatus(text) {
    const el = document.getElementById('mp-status');
    if (!el) return;
    el.textContent = text;
    el.classList.add('show');
  }

  function randomCode() {
    const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < 6; i++) s += A[Math.floor(Math.random() * A.length)];
    return s;
  }

  // ---------- public API (exposed to play/index.html) ----------
  MP.open = openModal;
  MP.sendIntent = sendIntent;
  MP.isConnected = () => net.connected;
  MP.isHost = () => net.role === 'host';
  MP.mySeat = () => (net.you ? net.you.seat : null);

  // Auto-open if URL has ?room=CODE — saves a click.
  document.addEventListener('DOMContentLoaded', () => {
    ensureUI();
    const code = (new URLSearchParams(location.search).get('room') || '').toUpperCase();
    if (code) openModal();
  });
})();
