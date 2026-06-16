# COLLAB.md — multi-agent coordination contract

Two AI agents are working this repo **through the shared filesystem** at
`~/Documents/toroid-fyi`. There is no direct agent-to-agent API; this file IS
the shared memory and message bus. Both agents MUST read it before editing and
update it after.

Agents:
- **CLAUDE-COWORK** (Anthropic, Cowork) — bash, headless render-testing, git. Owns cockpit UI.
- **PPLX** (Perplexity) — no GitHub (needs paid upgrade); file access unconfirmed. Relay via human for now.
- **CLAUDE-CODE** (Anthropic, Claude Code) — pushes branches to GitHub. Working backend/multiplayer.

## Branches in play (as of this writing)
- `main` — LIVE (deploys toroid.fyi via Cloudflare Pages/Workers). Do NOT collaborate here.
- `claude/toroid-outage-multiplayer-3h72r` — CLAUDE-CODE WIP: Cloudflare Workers + Durable
  Objects multiplayer scaffold (`assets/multiplayer.js`, `src/room-do.js`, `src/worker.js`,
  `wrangler.jsonc`). Isolated; safe to ignore/delete. Does NOT touch `play/` or `Strat-Dom-3d/`.
- `cloudflare/workers-autoconfig` — already merged to main.

## ✅ DECISION (Axel, locked): backend = Cloudflare Workers + Durable Objects
- **Platform:** Cloudflare Workers + Durable Objects (matches live hosting `wrangler.jsonc`
  on `main`, app `toroidfyi`). One game = one DO instance holding authoritative state over a
  live WebSocket. Persistence via D1 (SQL) + KV. Payments via Stripe-in-a-Worker.
- **Reuse from Build B** (`Strat-Dom-3d/03_MVP`) as reference only: auth flow, Stripe wiring,
  DB schema, matchmaking patterns. **Discard** its chess `matchEngine.ts` and the "chat-sdk" idea.
- **Critical spine (for paid play):** port the toroidal rules (currently client-only in
  `play/index.html`) to run **server-authoritatively inside the DO** → anti-cheat. No backend
  has this yet; it's the central build.
- **Monetization model:** chess.com-style paid accounts / subscriptions (Stripe). NOT wagering.

## Sole agent
Axel consolidated to CLAUDE-COWORK only. Other agents/branches deprioritized; the
`claude/...multiplayer-3h72r` scaffold remains as a Cloudflare DO reference, safe to ignore.

## Roadmap
1. **Cockpit UI** (in progress) — finish controls-on-frame: right-ring toggles ✓, Profile-on-eye ✓,
   bottom-left piece-preview cluster (selected/target piece + Select/Unselect/Confirm/Suggest),
   phase-controls auto-dismiss popup. Verify via headless render.
2. **Server-authoritative engine** — extract toroidal rules into a shared module usable by both
   `play/index.html` and the DO; validate moves server-side.
3. **Accounts + payments** — D1 schema (users, ratings, matches), Stripe subscriptions via Worker.
4. **Matchmaking + realtime** — DO room lifecycle, WebSocket sync, reconnect, simultaneous-reveal.
5. **Wire client → backend** — replace hotseat with online play; keep simultaneity + hidden-info.

---

## 0 · Golden rules (read every time)

1. **Pull before you edit.** `git pull --rebase` (or re-open files) so you're not
   editing a stale copy. Stale edits are the #1 way we clobber each other.
2. **Claim before you edit.** Add a row to the *Active claims* table below with
   your agent name, the file/region, and a UTC timestamp. Remove it when done.
   Do NOT edit a file another agent currently claims.
3. **Stay inside your fence.** Edit only files/regions you own (see Ownership).
   Never reach into the other agent's fence — leave a request in *Message queue*.
4. **Small commits, clear messages.** One concern per commit, prefixed with your
   name: `CLAUDE: ...` / `PPLX: ...`.
5. **Append to the changelog** after every change so the other agent can catch up
   without re-reading diffs.
6. **Never push to the live site** (`git push` to `main` → toroid.fyi) without the
   human (Axel) explicitly approving that build. The live site is known-good.

---

## 1 · What the project is (ground truth)

- **Build A — `play/index.html`** — single-file vanilla JS + Three.js. This is
  THE game (toroidal Sun/Moon Warplan). All current UI/gameplay work lives here.
  Runs by opening the file; no server.
- **Build B — `Strat-Dom-3d/03_MVP`** — React client + Node/Fastify/Socket.io/
  SQLite server. The future online backend (auth, matchmaking, payments). Its
  chess ruleset is to be discarded and replaced with A's rules later.
- Direction: chess.com-style competitor with **paid accounts, NOT wagering**.
  Any Ante/Wager/stakes language is legacy — do not build on it.

---

## 2 · Render-testing (share this — it's the fix for "nothing looks right")

`play/index.html` has no server, so an **open browser tab caches hard** and shows
a stale build. Don't trust a tab you didn't just hard-refresh (Cmd+Shift+R).

To get a TRUE screenshot of the file on disk (CLAUDE uses this every iteration):

```bash
cd ~/Documents/toroid-fyi/play
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --enable-unsafe-swiftshader --hide-scrollbars \
  --window-size=1600,1000 --screenshot=_render.png \
  "file://$PWD/index.html"
```

Then view `_render.png`. The frame art is `game/gameframe.PNG`; the human's
**labeled** layout spec is `game/AF46AE5C-EFEC-4B32-A7AD-E68F342A9A75.PNG`.

---

## 3 · Ownership map (PROPOSED — adjust with the human)

Goal: zero shared edit surface. Within the single `index.html`, ownership is by
**fenced region**, marked with comments. Prefer extracting to separate files.

| Area | Owner | Where |
|------|-------|-------|
| Cockpit UI: frame, control placement, ring buttons, panels, hover states | CLAUDE | `index.html` CSS block `COCKPIT CONSOLE … END` + JS IIFE `cockpit()` |
| Game logic: rules, movement, phases, mini-games, AI, resolution | PPLX | everything else in `index.html` |
| Backend (Build B) | (unassigned) | `Strat-Dom-3d/03_MVP` |

**Open proposal:** CLAUDE can extract the cockpit CSS → `play/cockpit.css` and the
cockpit JS → `play/cockpit.js`, linked from `index.html`. That converts the
fenced-region split into clean **file-level** ownership (no same-file conflicts).
Pending human approval — see Message queue.

---

## 4 · Active claims (edit-locks)

| Agent | File / region | Claimed (UTC) | Note |
|-------|---------------|---------------|------|
| _(none)_ | | | |

---

## 5 · Message queue

### → To PPLX (from CLAUDE)
- Current cockpit state: frame renders; controls are transparent and mounted on
  the painted slots; right rings are wired toggles (Play/rotate, Rules, MATCH,
  CHAT, LOG, START); reactor eye = Profile. Bottom-left piece-preview cluster
  (selected/target piece, Select/Unselect/Confirm/Suggest) is NOT yet bound.
- Card/economy shapes the human labeled (Wallet, Credits, Draw/My/Exchange card,
  Game disk) have **no game logic** — left inert on purpose. If you own logic and
  want these, define the data model first and note it here.
- Please don't edit the `COCKPIT CONSOLE` CSS block or the `cockpit()` JS IIFE.

### → To CLAUDE (from PPLX)
- _(PPLX: write here — what you changed, what you need, what you're claiming)_

---

## 6 · Changelog (append-only, newest last)

- CLAUDE: established this COLLAB.md; cockpit UI = transparent controls on painted
  frame slots, wired ring toggles, Profile-on-eye, hover shape-change states.
