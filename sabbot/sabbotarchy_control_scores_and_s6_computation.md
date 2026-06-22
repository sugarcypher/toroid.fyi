# Control Scores & the First S6 Worked Computation

**Validation pass for the candidate resource-operations dimensions (S6 / S7 / S8)**

*B. Greenway · ThinkWell Labs Metrology · methodology increment v0.4 · June 2026*

*Executes the validation the resource-controls document (v0.3, §15) required: scores the three pre-registered negative controls, and computes the first real S6 selective-allocation result on a sourced crisis population. Reports what the data show, including where the result is weak.*

---

## 16. What this pass tests

A candidate dimension earns the right to score real architectures only after (a) its negative control returns its predicted-low band — proving the dimension has a working "off" position and does not fire on benign cases — and (b) the dimension produces a measurable, sourced result on real data. This increment does both for the resource-operations dimensions. The honest finding up front: **all three controls return low (the dimensions discriminate), and S6 produces a strong inversion signal that is fragile to one coding choice** — which is reported rather than hidden, because the fragility is the actual state of the evidence.

## 16.1 Negative-control scores

### S6 control — COVID-19 vaccine allocation (ACIP, Dec 2020). Predicted LOW. **Result: LOW. PASS.**

Need-ranking (mortality/exposure risk): long-term-care residents and the elderly (highest mortality), health-care personnel (highest exposure), then descending age/comorbidity. Allocation-ranking: Phase 1a doses to health-care personnel + LTC residents, then 1b (75+, frontline essential), then 1c (65+, high-risk). Allocation-rank **positively** tracks need-rank — the genuine-triage profile. Spearman ρ strongly positive; no inverse-to-need-with-payoff pattern. The dimension does not fire on need-tracking allocation. **Off-position confirmed.**

### S7 control — 1991 Gulf War (Desert Storm). Predicted LOW. **Result: LOW. PASS.**

Four-part test: (1) *Manufactured pretext?* No — Iraq's invasion and annexation of Kuwait were real. (2) *Assets/lives/legality expended?* Yes, but under UNSC Res 678 and a Jan 12 1991 congressional authorization. (3) *Net public value low?* No — a defined, limited aim (reverse the annexation) achieved, then halted. (4) *Factional/spectacle payoff?* No — coalition action toward a public-strategic end. Fails every signature test → low S7. The dimension does not fire on lawful, authorized, proportionate force. **Off-position confirmed — and important, because S7 is the most intent-exposed dimension.**

### S8 control — UNSCR 2664 / OFAC humanitarian general licenses (Dec 2022). Predicted LOW. **Result: LOW. PASS.**

Four-part test: (1) *Deliberate civilian harm?* No — the resolution and licenses exist precisely to *prevent* it. (2) *Harm on non-combatants?* No — food, medicine, humanitarian transactions exempted. (3) *Instrumentalized immiseration?* No. (4) *Obfuscated?* No — the carve-out is explicit. Fails every test → low S8. The dimension does not fire on carve-out-preserving sanctions; it fires only when carve-outs are *removed* and population-level harm results (its passing anchor, the Cuba fuel blockade). **Off-position confirmed.**

**Control verdict:** all three candidate dimensions discriminate. None fires on genuine triage, lawful force, or humanitarian-preserving sanctions. They have a working zero.

## 16.2 The first S6 worked computation

**Status disclosure (reduces evidentiary tier — stated plainly).** The resource-controls metric (v0.3 §15.1) requires the need-ranking to be frozen *before* the allocation-ranking is examined. This computation was assembled retrospectively, with both rankings built in one pass. It is therefore a **worked example**, not a pre-registered scoring; its purpose is to show the machinery produces a real number on real data and to expose where that number is fragile. A pre-registered run is the next step.

**Population (2025–26 window).** Six crises on which the administration made a clear resource decision — acted, neglected, or cut. (Venezuela and Cuba are excluded: they are S7/S8 operations — force and induced-harm — not allocation-among-genuine-needs.)

**Need-ranking** (coarse 0–100, anchored to external mortality / persons-affected / irreversibility figures; ordinal, judgment-laden, *not* precise):

| Crisis | Need basis (sourced) | Need score | Need rank |
|--------|----------------------|-----------|-----------|
| OBBBA Medicaid coverage loss | 9.9–15M projected to lose coverage; modeled mortality; irreversible health harm (CBO/CBPP) | 90 | 1 |
| U.S. overdose/opioid crisis | ~44k deaths in 2025 (down from ~80k 2021–23), ongoing (CDC/NPR) | 88 | 2 |
| U.S. disaster victims (2025 fires/storms) | deaths + millions affected; acute, irreversible for victims | 75 | 3 |
| U.S. maternal mortality | ~700–800 deaths/yr, persistent | 60 | 4 |
| "Border crisis" (humanitarian need) | crossings *declined* through 2025; acute humanitarian need low relative to claim | 30 | 5 |
| Argentina currency crisis | financial, foreign, no direct mortality | 25 | 6 |

**Allocation-ranking** (net federal resources deployed on the issue, signed; sourced):

| Crisis | Allocation (sourced) | Alloc rank |
|--------|----------------------|-----------|
| Border/immigration enforcement | **+~$170B** total; +$45B detention (265% increase), +$29.9B ICE ops (3×) — largest in U.S. history (2025 reconciliation bill) | 1 |
| Argentina | **+$2.5B drawn** of a $20B facility (aligned government) | 2 |
| U.S. maternal mortality | ~0 — no major new allocation (neglected) | 3 |
| U.S. overdose crisis | **−~$2B** terminated (block grants + overdose prevention; harm-reduction defunded; partial Jan-2026 restoration) | 4 |
| U.S. disaster victims | **−$11B** canceled to 45 states; 16 major-disaster requests denied (~2× first-term avg) | 5 |
| OBBBA Medicaid | **−~$900B–1T** cut (admin-driven) | 6 |

**Decoupling statistic.** Spearman ρ between need-rank and allocation-rank, n = 6:

Σd² = 66 → ρ = 1 − (6·66)/(6·35) = **−0.89**.

A strong *negative* correlation: allocation runs nearly opposite to need. Highest-need domestic crises (Medicaid, overdose, disaster) are cut; low-humanitarian-need cases (border enforcement, Argentina) are resourced most.

**Payoff conjunction (required, and satisfied).** The resourced set shares a payoff property: border enforcement routes to the private-detention architecture (seed B040) and serves a political priority; Argentina is electorally aligned (Milei). The cut/ignored set shares domestic high-need populations with no extraction or alignment payoff. Negative ρ *plus* the payoff conjunction is the S6 signature.

## 16.3 The result is fragile — sensitivity analysis (the soft joint, made concrete)

The resource-controls metric warned (v0.3 §15.1) that the **need-ranking is where analyst bias enters.** That warning is not hypothetical here. The −0.89 depends heavily on coding the "border crisis" as *low* humanitarian need (defensible — 2025 crossings declined — but contestable).

Recode the border crisis as genuine *high* need (need rank 2), allocation unchanged:

Σd² = 48 → ρ = 1 − (6·48)/(6·35) = **−0.37**.

So a single defensible recoding moves the result from "strong inversion" (−0.89) to "weak/suggestive inversion" (−0.37). Two honest conclusions follow:

1. The inversion **survives in sign** even under the adversarial recoding — Medicaid/overdose/disaster cut while Argentina (low need) is funded keeps ρ negative regardless. The *direction* is robust.
2. The inversion's **strength is not robust** — it rests substantially on the border-need coding. Any headline "−0.89" must be reported with its −0.37 shadow, or it overstates.

This is the falsifiability guard and the soft-joint warning doing exactly what they were built to do: the dimension yields a real signal, and the same machinery exposes how much of that signal is coding-dependent.

## 16.4 Limitations (binding)

- **Not pre-registered** — retrospective; lower evidentiary tier than a frozen-need-ranking run.
- **n = 6** — at this size the critical Spearman value (two-tailed α = 0.05) is ≈ 0.886, so −0.89 sits *right at* the significance threshold and −0.37 is not significant. The population must be expanded (12–20 crises) before any inferential claim.
- **Cross-domain severity** — comparing a financial crisis (Argentina) to mortality crises (overdose) on one need scale is inherently rough; the four-component metric mitigates but does not eliminate this.
- **Allocation sign/scope** — "resources deployed on the issue" is not identical to "resources addressing the need" (border enforcement is not humanitarian spend); the coding treats deployment magnitude, which is the intended S6 object, but the distinction should be documented per case.

## 16.5 Verdict and next steps

- **Controls:** S6, S7, S8 all return predicted-low. The dimensions discriminate and may proceed to candidate scoring — still **outside the composite index** (carried from v0.3 §14.9).
- **S6 signal:** a real inversion of allocation against need (ρ between −0.37 and −0.89 depending on border-need coding), with the payoff conjunction satisfied. Directionally robust, strength coding-dependent.
- **Next:** (1) pre-register a frozen need-ranking over an expanded population (12–20 crises) with the four named sources fixed before allocation is examined; (2) resolve the border-need coding with an external metric rather than judgment; (3) report ρ with its sensitivity band, never as a point estimate.

---

*Increment v0.4 · June 2026 · couples to the resource-operations extension (v0.3 §14) and the resource-controls / need-ranking metric (v0.3 §15). Candidate dimensions remain outside the composite Obfuscratic Sabbotarchy Index pending pre-registered, expanded scoring.*

## Sources (new this increment)

- SAMHSA / overdose funding cuts: STAT, Oct 30 2025 — https://www.statnews.com/2025/10/30/samhsa-grant-cuts-staff-reductions-impact-analyzed/ ; "reverses course on $1.9B in cuts," STAT, Jan 14 2026 — https://www.statnews.com/2026/01/14/samhsa-grant-cancellations-alignment-trump-priorities/ ; Stateline, Nov 18 2025 — https://stateline.org/2025/11/18/progress-on-overdose-deaths-could-be-jeopardized-by-federal-cuts-critics-say/
- Immigration enforcement funding: American Immigration Council, "Congress Approves Unprecedented Funding for Mass Deportation," 2025 — https://www.americanimmigrationcouncil.org/press-release/congress-approves-unprecedented-funding-mass-detention-deportation-2025/ ; EPI, "$185 billion to carry out mass deportation" — https://www.epi.org/blog/house-republican-budget-bill-gives-trump-185-billion-to-carry-out-his-mass-deportation-agenda-while-doing-nothing-for-workers-immigration-enforcement-would-have-80-times-more-funding-than-la/
- FEMA disaster-aid cuts: E&E/POLITICO, "FEMA canceled $11B in disaster payments to states" — https://www.eenews.net/articles/fema-canceled-11b-in-disaster-payments-to-states/ ; CBPP, "Trump Administration Actions Weakening Disaster Preparation and Response" — https://www.cbpp.org/blog/trump-administration-actions-weakening-disaster-preparation-and-response
