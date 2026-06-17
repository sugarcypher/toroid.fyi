# HUD Port — Green Frame → Node-Constellation: Functional-Parity Diff & Spec

Comparison of **`play/index.html`** (the live game, "green frame," ~10,954 lines, fully
functional) vs **`play/hud-concept.html`** (the node-cluster prototype, ~30 KB, visual only).
Goal: replace the painted frame with the constellation **without losing any functionality**.

---

## TL;DR — why past attempts kept missing functionality

The prototype's tile **labels already mirror the green control set almost 1:1** (DASH, LOG,
CHAT, RULES, GALLERY, PROFILE, START/GO, PLAY/ROTATE, UNROLL, LABELS, CLEAR, ROT arrows, ZOOM,
the plot tiles SUGGEST/AUTO/MANUAL/LOCK/CONFIRM/UNDO/DRAW/EXCH/OFF/DEF, the weapon compass,
anomaly CHANNEL/EXTINCT/REGENESIS/CLAIM). The designer **anticipated** the controls — but:

- **There is no per-control dispatch at all.** Every one of ~50 tiles flows through a single
  generic `pointerup` handler that only sets `selected`, flips a local `r.on` boolean, and
  pulses lighting. No tile opens a panel, moves the camera, or calls any game logic.
- **All data is hardcoded.** Telemetry (PHASE/ROUND/TURN/POT…), both token bays
  (SELECTED Possibility H4 / TARGET Moon C9), and both info strips are literals — not bound
  to game state.
- **The marquee "triangle data-fields" are never rendered** (`infoField`/`ellipseField` and the
  node-designation system are built but uncalled — vestigial).

So the prototype is **chrome, not a game.** The recurring failure mode is treating it as a
from-scratch rebuild and re-implementing the game inside it. **Don't.** The fix is a transplant.

---

## Recommended architecture — TRANSPLANT, not rewrite

Green's controls are **already independent of the painted art** (Agent A confirmed: "the painted
`#frame` div is empty chrome… every function is independent of the `#frame`/`gameframe` art").
So:

1. **Keep green's entire functional layer intact** — all HTML panels, modals, render functions
   (`renderHUD`, `renderDashboard`, `renderSelPortraits`, the 8 mini-games, anomaly, profile),
   the `G` state, the board raycast/selection pipeline, and localStorage persistence.
2. **Remove only**: the painted `#frame` + `gameframe.PNG`, the `.ring-btn` set, and the dead
   legacy UI (see §5).
3. **Bring in the prototype's THREE.js constellation** as the new shell around the board "screen."
4. **Add the dispatch the prototype lacks**: a `tileName → existing green handler/id` map. Each
   node click calls the **same** function the matching ring button already calls — we REUSE
   green's handlers, we don't reimplement them. That's what guarantees parity.
5. **Bind the prototype's fake readouts to live data** (telemetry ← `refreshTicker`; token bays
   ← `renderSelPortraits`; strips/triangle-fields ← dashboard/log).
6. **Host the heavy panels/modals as DOM overlays** inside the new HUD's screen region (they are
   already DOM and already work). Nodes just toggle them, exactly as the rings did. Do **not**
   try to cram modals/mini-games into 3D.

This shrinks the job from "build the whole game in a new HUD" to "swap the chrome + wire a
dispatch map onto proven handlers."

---

## 1. Controls present in BOTH (label match) but UNWIRED in prototype → just need dispatch

| Green control | id / handler | Prototype tile | Port action |
|---|---|---|---|
| PLAY ↔ ROTATE | `lock-toggle` → `toggleCameraLock` | PLAY/ROTATE hero (color-swap only) | node → `toggleCameraLock()` |
| GO / START | `btn-go-big` / `rb-start`→`btn-start`‖`btn-go-big`.click | GO hero (does nothing) | node → same proxy + `updateRingLabels` |
| STATS (dashboard) | `rb-dash` toggles `#hud-dashboard` | DASH toggle | node → toggle dashboard panel |
| LOG | `rb-log` toggles `#log` | LOG toggle | node → toggle log |
| CHAT | `rb-chat` toggles `#chat-panel` | CHAT toggle | node → toggle chat |
| Rules | `btn-rules` → `openRulesModal` | RULES btn | node → `openRulesModal()` |
| Gallery | `btn-gallery` → `openGalleryModal` | GALLERY btn | node → `openGalleryModal()` |
| Profile | `btn-profile` → `openProfileModal` | PROFILE btn | node → `openProfileModal()` |
| Labels on/off | `btn-labels` → `setLabelsVisible` | LABELS toggle | node → `setLabelsVisible(!G.showLabels)` |
| Unroll/flatten | `btn-flat` → `setFlatView` | UNROLL toggle | node → `setFlatView(!G.flatView)` |
| Clear/restore board | `btn-clear-board` → `clearBoard` | CLEAR toggle | node → `clearBoard()` |
| Camera nudges | arrow keys / drag (camera live) | ROT ◀▶▲▼, ZOOM ± (camera STATIC) | nodes → camera yaw/pitch/zoom fns |
| **plot dock** | `btn-suggest-commit`,`btn-autoplay`,`btn-lock-auto`,`btn-manual`,`btn-confirm-card`,`btn-undo`,`btn-draw`,`btn-exchange`, GO `btn-go-big`, OFF/DEF dirs | SUGGEST/AUTO/MANUAL/LOCK/CONFIRM/UNDO/DRAW/EXCH/OFF/DEF | map each tile → its `btn-*` handler |
| **setup** | mode `data-mode`, count `btn-1p…6p`, `btn-start`→`startGame` | SANDBOX/SOLO/MULTI/◀▶/START | map → mode/count/start handlers |
| **weapon-commit** | `data-weapon`+`data-dir`→`commitWeapon`, section `data-aim` | 8 compass tris + ☀FLARE/☾BEAM | map → `commitWeapon`; keep on-torus compass too |
| **anomaly** | `btn-anomaly-extinct`/`-revive`/`-recall`→`stageBehemoth`/`unstageBehemoth`; contest `an-claim` | CHANNEL/EXTINCT/REGENESIS/CLAIM | map → stage/unstage + claim |

## 2. Readouts present in BOTH but HARDCODED in prototype → need live binding

| Green readout | source | Prototype | Port action |
|---|---|---|---|
| Phase/Round/Turn/Pot/☀next/☾next/Barrier pills | `refreshTicker` (10657) | TL telemetry trapezoids (literals) | bind tile `val` ← ticker values each `refreshTicker` |
| Per-colour composition dials `#top-pies` | `renderTopPies`/`buildCompositionPie` | (none — see §3) | host as overlay or map onto a cluster |
| Token bays (You / Target) | `renderSelPortraits` ← `G.selectedPieceId`/`selHoverTargetId`, HP pips, % left | bottom holograms (literal H4/C9) | drive bays from real selection; reuse proto `moveCells` 7×7 map |
| Dashboard standings + ⚰ graveyard + House rake | `renderDashboard` (8026) | bottom strip (literals) | keep panel; optionally surface summary in a triangle field |
| Rotation readout θ/φ + compass | `updateReadout` (8478) | (none) | host as overlay |

## 3. Components ENTIRELY ABSENT from prototype → must host as DOM overlays

These have **no tile and no equivalent** in the prototype. They stay as green's existing DOM,
re-positioned inside the new HUD; nodes toggle/trigger them.

- **8 battle mini-games** + shared `#c4-modal`: Connect-Four, Precision Aim, Cup Shuffle, Memory
  Match, Sequence Echo, Polarity Grid, Blockus (auto-triggered on same-type clashes).
- **Anomaly skill-contest** UI (`an-*` ids) — the who-wins-the-power mini-game sequence.
- **Profile/account/wallet modal** — login/create/logout, seats, daily bonus, deposit/withdraw,
  payment methods, SHA-256 profiles in localStorage.
- **Gallery modal**, **Rules modal** (content), **Privacy gate** (hot-seat look-away),
  **Combo reward panel**, **Piece tooltip** (raycast hover), **Hand strip** (cards),
  **Round summary** toast (+ replay), **mode chip / toast layer / achievement toast**.
- **Board raycast pipeline** (plot-move commit, node-place, compass click, node isolation):
  canvas-level, frame-independent → **stays as-is**, no porting needed.

## 4. Mechanisms the prototype lacks → reconcile

- **Per-control dispatch** — does not exist; this is the core thing to add (§1).
- **Two visibility systems** to unify: `setPanelState`/localStorage (`COLLAPSE_STATE_KEY`,
  `LAYOUT_VERSION='v10-trackers'`, `firstLoadDefaults`) for the docks **vs** the cockpit
  `bindToggle` raw `display` for `rb-dash/rb-log/rb-chat`. They can desync today — pick one.
- **Phase-driven regeneration** — green's `renderHUD` rebuilds `#phase-controls` per `G.phase`;
  the prototype rebuilds its tile field per phase but with empty/fake content. Wire the
  prototype's per-phase rebuild to the real `renderHUD` phase branches.
- **AI seat toggles** (`data-ai-toggle`→`setSeatAI`), **wallet pill** monkey-patch on `renderHUD`.

## 5. Dead / legacy green UI to DELETE during the port (Agent A flagged)

`#suggest-panel` (Accept/Override never wired, force-hidden 7895), `#orbital-spine`,
`#instructions-zone`, `#top-cluster` (hidden legacy + null-safe no-op bindings),
`setupDrawers` (returns 9323), `refreshRestoreRail` (no-op 9378), `bindTopCluster`.
Plus the painted `#frame` + `gameframe.PNG` and the `.ring-btn` set.

## 6. Reusable prototype assets (keep)

Raycast pick/hover + tap-vs-drag input layer (381–399), phase-switch rebuild pipeline
(`build`/`setPhase`/`layoutCorner`, keys 1–5), per-tile animation state machine (408–421),
`moveCells` 7×7 move-map renderer (299–316), PMREM reflections + lighting rig.

---

## Suggested build phases (incremental, headless-verify each)

1. **Shell up**: mount the constellation in `play/index.html` alongside the board; board still
   renders in the centre "screen." Frame still present. Verify it renders headlessly.
2. **Dispatch map**: wire §1 nodes → existing green handlers/ids (no new logic). Verify each
   control fires its green action.
3. **Live binding**: §2 — telemetry, token bays, strips from real state.
4. **Strip the frame**: remove `#frame`/`gameframe.PNG` + `.ring-btn` + §5 dead UI; reposition
   the §3 overlays inside the new HUD screen region. Unify the §4 visibility systems.
5. **Phase wiring + parity pass**: per-phase tiles ↔ `renderHUD`; walk every control in §1–§4
   against a live match; confirm mini-games, anomaly, profile all reachable.
6. **Polish**: tile proportions/count/shape variety against the real board; HUD-law pass
   (frame IS the instrument, dual token bays, onboarding teaches the HUD). Sync to sches repo.
