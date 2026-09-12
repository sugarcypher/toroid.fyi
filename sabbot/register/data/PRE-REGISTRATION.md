# Obfuscratic Instance Register — Pre-Registration

**Status: DRAFT. Nothing here is locked.** Locking is the analyst's act and requires a date and a signature. A prediction authored by anyone else, a machine included, is not a prediction whose failure costs the analyst anything, and therefore is not a prediction at all.

Version 1.0 · drafted 2026-09-12 · instrument: Obfuscratic Asymmetry, five signatures, weights 0.25 / 0.20 / 0.15 / 0.10 / 0.30 · threshold 70

---

## 1. What is being added to the project, and what is not

Two layers are added. They answer different questions and must not be merged.

**The instance layer** answers: *does the residue of ordinary administrative failure keep a direction?* It holds dated events, drawn from enumerable frames, each carrying a direction sign and no score. It can grow to thousands of items. It produces one statistic.

**The adversarial layer** answers: *can the instrument rule against its operator?* It holds two architectures, scored on the existing rubric against predictions locked in advance. It will never grow.

What is **not** added: more scored architectures on the strength of being salient. The architecture register grows only from the pre-registered slate, and a member enters the slate with a locked prior band prediction or does not enter it. Growing the register by adding high-scoring cases does not strengthen the breadth finding; Part IV states that it converts breadth into a measure of the analyst's attention. The pipeline enforces this by refusing to compute rather than by warning.

## 2. The null hypothesis, taken from the book's own concession

*Named and Counted* concedes at the door that ordinary failure is symmetric, slow, and uncoordinated. That concession is the null and it is a strong one:

> **H0.** Across independent decision loci, the direction of divergence between stated beneficiary and realized incidence is symmetric. Ordinary failure keeps no direction.

> **H1.** Across independent decision loci drawn by a content-blind rule, direction departs from symmetry.

This is the sharpest available form of the argument, because the corpus is drawn from exactly the material the null claims ownership of. A register of *incompetencies* is the null's home ground. Departure from symmetry there is the residue the book names; no departure is a disconfirmation the project should publish.

## 3. Unit of analysis, and the thing most likely to be attacked

The unit is the **independent decision locus**, not the item and not the news story. Items inside a locus are dependent by construction.

**A register of 3,000 items spanning 40 loci has the statistical power of 40.** The pipeline's fourth null scenario is that case in its extreme form: 3,000 items all pointing one way from a single locus returns an effective *n* of 1 and nothing reportable, while the per-instance test returns a p-value below double precision. Corpus value is measured in loci. Coding effort belongs in widening the locus span, never in deepening coverage of loci already represented.

Where a locus boundary is arguable, collapse to the coarser unit. Coarser is conservative and can only weaken the claim.

## 4. Frames, drafted and awaiting lock

Four frames are drafted in `frames/`. Each is enumerable, content-blind, and names in advance at least two item types within it that would code negative.

| Frame | Source | Window | Target | Locus span per item |
|---|---|---|---|---|
| `FRM-OIG-2025` | oversight.gov consolidated IG reports | 2025 | exhaustive | **widest** — offices distributed across agencies |
| `FRM-GAO-2025` | GAO reports and testimonies | 2025 | exhaustive | wide; strongest frame for S3 specifically, since GAO documents both the dysfunction and the agency response |
| `FRM-USASPENDING-TERM-2025` | award terminations at or above $1M | 2025 | exhaustive | moderate; **cheapest per item**, since realized incidence is in the source record |
| `FRM-FR-FINALRULES-2025H2` | all Federal Register final rules | 2025 H2 | systematic every *n*th | narrow — many rules share one authorizing statute and collapse to one locus |

**Recommended order: OIG, then GAO, then USAspending, then Federal Register.** The ordering is by independent loci gained per item coded, which is the only quantity that buys statistical power. The Federal Register frame is last despite being the largest population, because rules cluster hard into few loci.

Each frame still needs, before its first item is coded: the population size recorded, the sampling *n* fixed where sampling applies, and the analyst's own direction-share prediction with a falsification trigger.

## 5. The two adversarial tests

Specified in `adversarial/`, both with predictions drafted and **not locked**.

- **T2 `T2-TARIFF` — acquit an enemy.** Predicted Mixed or lower. Recommended to run **first**: cheaper evidence base, and it addresses the single most attackable feature of the current table, which is that nothing live scores below 70. One documented Mixed inside the live domain changes what the whole table means to a hostile reader.
- **T1 `T1-PUBHEALTH-INFO` — convict a friend.** Predicted high on S5 in particular.

Each carries falsification conditions for the *test*, not only for the case: a double-standard condition, and for T1 an S5-evasion condition naming in advance the most likely disguise a motivated low score would wear.

## 6. What the layers may and may not report

| Layer | Reportable | Refused |
|---|---|---|
| Direction | cluster-level sign-flip permutation p, effective *n*, locus-mean effect size, payoff-conjoined variant | per-instance p as a finding. It is computed and printed labelled invalid, so the inflation is visible rather than available |
| Synchrony | excess of observed onset bunching over matched baseline transitions | any p with fewer than six matched baselines. A rank-based p cannot fall below 1/(B+1); three baselines floor it at 0.25 |
| Breadth | count and proportion above threshold against a fixed pre-registered denominator | any number at all once the slate has grown. The module returns a frame violation |
| Architecture | composites recomputed from dimensions | composites whose dimensions were never published, which are marked un-auditable rather than back-fitted |

## 7. Standing liabilities, carried forward from Part VIII

1. Scoring is largely one analyst's. Cross-analyst agreement runs to about twelve points on the hundred-point scale, which crosses band lines. Every claim is a rank-order claim about bands, never a point-score claim.
2. The two adversarial tests are unrun. Until one of them rules against the analyst somewhere a reader can watch, a reader is right to suspect the instrument has only ever agreed with its maker.
3. The synchrony layer currently reports nothing, because fewer than six matched baseline transitions have been scored. Scoring six is the entire cost of making the coordination reading capable of disconfirmation.
4. The machine-extraction alteration rate is published alongside the statistics. A rate near zero on a large batch is more likely to mean ratification without reading than a reliable extractor, and is treated as a warning rather than a result.

## 8. Amendment discipline

Every change to this file, to a frame, to the slate, or to a locked prediction is a dated amendment with a stated reason and a flag for whether it affects a locked prediction. Nothing is silently edited. Part VI: matching a prediction to an outcome after the fact destroys the only thing the controls were worth.
