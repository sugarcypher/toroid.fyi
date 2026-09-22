# Provenance

Every file in this bundle was drafted by Claude (Opus 5) on 2026-09-12, in session with B. Greenway, and is **Claude-generated and unverified** except where noted below. Nothing here has acquired the analyst's signature by being fluent in his register.

## Revision 1.5 — 2026-09-21, validation pass

A pre-publication validation of the T2 entry found two defects and they are corrected here rather than quietly:

1. **A withdrawn claim had returned.** `PRE-REGISTRATION.md`, the T2 worksheet, and the register page each asserted a "twelve-point observed cross-analyst range." No cross-analyst study has ever been run — as those same pages state two paragraphs away — and the figure was withdrawn from the book in July 2026 as a drafting artifact with no test behind it. It is withdrawn again in all three places, and the withdrawal is recorded in `PRE-REGISTRATION.md` rather than deleted. Band robustness for T2 is now argued from the weight arithmetic, which is checkable and stronger: reaching High requires +22.35 weighted points and the largest headroom any single dimension carries is S5's 18.0, so no single dimension moved to its maximum crosses a band line, and none moved to zero reaches Genuine.
2. **The published T2 result was not visible.** On `/sabbot/`, the comparison table's renderer rewrites its tbody from the seven seed architectures on load, destroying the static T2 row beneath it; the `adversarial` record was never emitted to the page. The one number inside the live domain that answers Part VIII's ceiling-slamming charge rendered only for readers with JavaScript disabled. The record now flows through the single-source build and is rendered.

Standing liability 2 was also stale — it still read that both adversarial tests were unrun — and now states T2's result together with the four things that limit what it establishes.

## Transcribed from the analyst's own work — his material, not Claude's

- `register/architectures.json` — the 2026-Q1 per-dimension scores for the seven seed architectures, the 2025-Q1 composites, and the three reform-lineage composites (14 / 19 / 20) are transcribed verbatim from *Named and Counted* v8, Part VII. Epochs where only a composite was published carry `composite_only` with its source and are marked un-auditable. **No dimension score was reconstructed to fit a published composite**; back-fitting dimensions would be fabrication.
- `register/slate.json` — slate membership is transcribed from the cases the book names: the seven seeds and reform lineage from Part VII, the dimension controls and opposite-valence slot from Part VI, the two adversarial tests from Part VIII. Four members carry `predicted_band: null` because the book names them without publishing a band prediction; those four must be predicted and locked by the analyst.
- `register/onsets.json` — derived mechanically from the two epochs present in the register. The 2025-Q3 checkpoint published at `/sabbot` is **absent**, because its per-dimension scores were not available to this bundle. Its absence materially changes the persistence reading; see the caveat in that file.
- Weights, bands, thresholds, the five signature definitions, the four evidence tags, the contestation-quality filter, and the resource-layer rules are the analyst's, from the book.

## Claude-generated, unverified, requiring the analyst's judgment before use

- `schema/*.json`, `schema/codebook.md` — the instance-layer data model, the closed beneficiary-class vocabulary, the locus rule, and the direction scale. The vocabulary in particular is a first draft; classes that do not fit real items are codebook amendments, and several will be needed.
- `frames/*.json` — five candidate frames. The enumeration rules were originally stated from general knowledge and have now been **executed where possible**; each frame's `enumeration_verified` block records what happened. The oversight.gov path in the first draft was wrong and 404s, which is recorded as a dated amendment rather than silently fixed. `FRM-SCOTUS-EMERGENCY-2025-2026` was drafted this session and has not been enumerated.
- `pipeline/*.py` — the statistics. Calibration is demonstrated rather than asserted: `nullcheck.py` runs four synthetic scenarios over 400 replications and reports rejection rates. Read that output before trusting any number the pipeline produces on real data.
- `adversarial/T1-*.md`, `adversarial/T2-*.md` — the predicted ranges and per-dimension reasoning are **Claude's proposals**, drafted from what the book says about each case. They are not the analyst's predictions and carry none of the evidentiary weight a locked prediction has. The analyst confirms, revises, or replaces each row, then locks with a date. **Running either test against a Claude-drafted prediction would forfeit the entire point of the exercise.**
- `PRE-REGISTRATION.md` — the frame ordering recommendation, the null statement, and the reportability table.
- `render/*` — the page and its payload.

## Verified in this session, with sources attached

- `annex/evidence-annex.json` — 15 items checked against published reporting on 2026-09-12. Each carries its sources, an evidence tag, and where relevant an `explicit_non_claim` or `could_not_verify` field stating what is **not** established. Four corrections to the received account are recorded there: product safety rather than food safety; the fund rescinded in writing on 2026-08-03 with the audit bar narrowed to retroactive-only; compelled civil discovery rather than a judicial investigation; and the Supreme Court ruling **against** IEEPA tariff authority.
- `frames/*.json` — enumeration attempts executed. One frame returned a population count from an open API. Three did not, and each records the specific blocker and the step that closes it, rather than a plausible rule left standing.
- One received figure was dropped rather than softened: the claim that the maritime-strike munitions cost roughly one million dollars each. No procurement or defence source was located for it.

## No evidence anchors were invented

Not one factual claim about any event, agency, document, figure, or outcome was added to this bundle by Claude. The adversarial packets specify the *class* of document each dimension requires and stop there. The synthetic demo records that shipped in v1.0 have been deleted. `register/instances.jsonl` is empty. `pipeline/nullcheck.py` generates corpora in memory as a self-test of the estimator; that is a unit test of the arithmetic, not data about the world, and its output no longer appears on the page.

This is deliberate. A plausible-looking anchor in the analyst's register is the exact failure the provenance rule exists to prevent: fluency in his register is how unsourced material acquires his signature unnoticed.

## The machine-proposal boundary, enforced in code

`pipeline/ingest.py` refuses to let a machine populate `direction`, `direction_rationale`, `locus_id`, `locus_rationale`, `payoff_conjunction`, or any coder field. A machine-proposed record carries its agent identifier for life, stays `ratified: false` until a human confirms every field against the primary source, and records which fields the human changed. Unratified records are excluded from every statistic and every rendered figure, with no flag the renderer can be told to ignore.
