# Code Audit & Cleanliness Report — play/index.html

Final pass. Every figure re-verified against the file as it stands now. Where earlier
drafts were wrong, that is corrected explicitly below.

## Result summary

| Metric | Audit start | Now |
|---|---|---|
| Total lines | 9,815 | 9,473 |
| Dead "cockpit" references | 112 | 0 |
| Duplicate function definitions | 0 | 0 |
| var / legacy declarations | 0 | 0 |
| TODO / FIXME / debugger | 0 | 0 |
| Orphaned DOM handlers (guarded no-ops) | ~10 | ~10 (flagged) |
| node --check (main script) | OK | OK |

## Fixed this session

Removed the entire abandoned "cockpit / arrange-mode" skin — 342 lines total, in three
verified deletions, each followed by a syntax check with automatic revert on failure:

1. CSS block (~91 lines): body.cockpit-on / .cp-* / #cp-arrange-bar rules.
2. JS layout engine (248 lines, contiguous, lines 8012–8259): setCockpit, cockpitArrange,
   layoutCockpit, refreshCockpitStates, cockpitFrameBox, buildArrangeBar, COCKPIT_ZONES,
   COCKPIT_LAYOUT, saveCockpitLayout and the drag/arrange handlers.
3. State flags (G.cockpit, G.cockpitEdit), the renderHUD cockpit hook, and the
   canvas-click cockpitEdit guard.

Post-removal verification: 0 cockpit references anywhere, main script `node --check` PASS,
file ends with `</html>`, and all 12 core systems still defined exactly once
(damagePiece, revealAll, resolveReveal, finishRound, runBlockusBattle, maybeRunDisaster,
setFlatView, setLabelsVisible, openGalleryModal, startGame, validMoves, aiPickPlot).

## Verified sound (no action needed)

- No duplicate function definitions; no var; no TODO/FIXME/XXX/HACK/debugger.
- Tag balance: style 2/2, script 5/5 (3 of the script tags are the THREE.js
  CDN-fallback document.write loaders, by design).
- restore-rail resolves correctly — it is created at runtime by ensureRestoreRail (not a
  missing element).
- No undefined game calls — every non-local identifier resolves to a host/standard API
  (THREE.js, Canvas2D, DOM, Map/Set).
- Damage model is consistent: the hardcoded damagePiece(x, 1, ...) calls are correct
  because every piece is hp:1 / maxHp:1, so 1 damage is lethal by design.
- The prior stall fix (resolveReveal, fire-once) is intact — rounds no longer stalemate on
  a no-capture turn and manual-select stays responsive.

## Corrections to earlier drafts (stated plainly)

- A draft claimed the cockpit code was already removed when it was not (the removal script
  had aborted on a guard mismatch). That was false at the time; it is now actually removed.
- A draft listed refreshRestoreRail as a dead no-op. That was wrong — restore-rail is
  created dynamically by ensureRestoreRail, so the function is live. Removed from findings.

## Remaining minor items (cosmetic dead code, not runtime bugs — left as-is)

1. Orphaned top-cluster wiring. bindTopCluster() and refreshWalletPill() (~55 lines near
   line 7905) bind ~10 handlers to tc-* element ids (tc-chat, tc-rules, tc-profile,
   tc-wallet, etc.). Those elements live inside `<div id="top-cluster" style="display:none">`
   — a reverted layout experiment that renders nothing. Every lookup is guarded with
   `if (el)`, so the handlers safely no-op; nothing breaks. This is dead code, not a bug.
   Recommend removing in a dedicated pass (the container div + the two functions + their
   CSS) once layout is final.

2. btn-clear-board exists in the DOM (line ~969) but is hidden via
   `#btn-clear-board { display:none }` (line ~857) with its handler still wired. Functional
   but hidden — slightly inconsistent with the "no hidden controls" goal. Trivial to delete
   on request.

Both were left in place deliberately: they are guarded and harmless, and the layout has
been iterated heavily this session — bundling more deletions risks regressions for zero
runtime benefit. They are flagged here so the decision is yours.

## Conclusion

The codebase is structurally sound and runtime-clean: syntactically valid, no duplicate
definitions, no undefined calls, no var/TODO/debugger, correct tag balance, and the major
dead-code blob (the cockpit skin, 342 lines) is gone. Two small pockets of guarded dead
code remain (the hidden top-cluster wiring and one hidden button) — both safe no-ops,
flagged above for an optional final cleanup. No runtime bugs were found.

## Backups
- outputs/index.preaudit.html — snapshot before this audit's edits.
- /tmp/audit_safe.html — snapshot taken immediately before the cockpit removal (session-local).
