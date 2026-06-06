// toroid.fyi Worker entry.
//
// Two responsibilities:
//   1. /api/room/:code/ws  →  upgrade to a WebSocket connected to the
//      RoomDO durable object instance for that room code.
//   2. /api/room/:code     →  JSON status (member count, host claim) for
//      lobby polling before the WS upgrade.
// Every other path is served by the static asset bundle (binding ASSETS).

export { RoomDO } from './room-do.js';

const ROOM_CODE_RE = /^[A-Z0-9]{4,12}$/;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, env, url);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleApi(request, env, url) {
  // /api/room/:code/...
  const m = url.pathname.match(/^\/api\/room\/([^/]+)(?:\/(.*))?$/);
  if (!m) return json({ error: 'not_found' }, 404);

  const code = m[1].toUpperCase();
  if (!ROOM_CODE_RE.test(code)) return json({ error: 'bad_code' }, 400);

  const id = env.ROOMS.idFromName(code);
  const stub = env.ROOMS.get(id);

  // Forward the request, replacing the host but keeping path + query so
  // the DO can dispatch internally.
  const inner = new URL(request.url);
  return stub.fetch(inner.toString(), request);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
