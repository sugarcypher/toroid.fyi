# Expanded S6 Computation — Mechanical Need-Metric

**Second S6 selective-allocation run: larger population, formula-based need-ranking**

*B. Greenway · ThinkWell Labs Metrology · methodology increment v0.5 · June 2026*

*Executes the next step the v0.4 validation required: expand the S6 crisis population and replace the judgment-based need-ranking with a mechanical, externally-sourced metric — directly addressing the "soft joint" (the border-need coding) that made the first result fragile. Reports the result, which is weaker than the first pass. That is the point.*

---

## 17. What changed from v0.4, and why

The v0.4 worked computation returned Spearman ρ = −0.89 on six crises, but flagged that the figure leaned on coding the "border crisis" as low need — a judgment call that, when reversed, dropped ρ to −0.37. The fix is to remove judgment from the need-ranking entirely: rank crises by a **single external metric applied mechanically**, so the analyst cannot tune the ranking to produce an inversion. This increment does that and expands the population from six to nine.

**Frozen need-metric (declared before allocation is examined):** primary = **annual attributable deaths** (external-sourced; for forward-looking cases, annualized modeled deaths, tagged projected); secondary tiebreak = persons affected. The metric is mechanical: a crisis's need-rank is its death figure, full stop — border enforcement cannot be hand-coded low or high; the formula places it.

## 17.1 The population, need figures, and allocations (sourced)

Venezuela and Cuba remain excluded (S7/S8 operations, not allocation-among-needs).

| Crisis | Need basis — attributable deaths (sourced) | Allocation — net federal $ on the issue (sourced) |
|--------|--------------------------------------------|---------------------------------------------------|
| USAID / global-health cuts | Lancet: ~14M projected deaths by 2030 (8.5–19.7M UI); ~193k counted deaths to mid-Apr 2025 *(projected/modeled)* | USAID terminated Jul 1 2025 — agency eliminated (~$40B/yr foreign aid) **(deep cut)** |
| U.S. overdose crisis | ~44k deaths 2025 *(realized, CDC/NPR)* | −~$2B SAMHSA grants terminated (partial Jan-2026 restore) **(cut)** |
| U.S. firearm deaths | 44,447 in 2024 *(realized, CDC/Pew)* | ~$0 — no major new federal allocation **(neglected)** |
| OBBBA Medicaid coverage loss | 9.9–15M lose coverage; modeled deaths in the tens of thousands/yr *(projected)* | −~$900B–1T **(largest Medicaid cut in history)** |
| SNAP / food insecurity | ~4M lose benefits (1M children); food-insecurity mortality *(modeled)* | −~$187B **(largest SNAP cut in history)** |
| U.S. maternal mortality | ~700–800 deaths/yr *(realized)* | ~$0 **(neglected)** |
| U.S. disaster victims 2025 | hundreds of deaths; millions affected *(realized)* | −$11B canceled to 45 states; 16 requests denied **(cut)** |
| "Border crisis" | low attributable deaths; 2025 crossings declined *(realized)* | +~$170B — largest enforcement investment in U.S. history **(funded)** |
| Argentina currency crisis | ~0 direct deaths *(financial)* | +$2.5B drawn of $20B facility **(funded)** |

## 17.2 Rankings and the decoupling statistic

**Need-rank** (1 = highest attributable deaths): 1 USAID · 2 overdose · 3 firearm · 4 Medicaid · 5 SNAP · 6 maternal · 7 disaster · 8 border · 9 Argentina.

**Allocation-rank** (1 = most resourced, 9 = most cut): 1 border (+170B) · 2 Argentina (+2.5B) · 3 maternal (~0) · 4 firearm (~0) · 5 overdose (−2B) · 6 disaster (−11B) · 7 USAID (−~40B) · 8 SNAP (−187B) · 9 Medicaid (−~950B).

**Spearman ρ, n = 9:**

| Crisis | need-rank | alloc-rank | d | d² |
|--------|-----------|------------|---|----|
| USAID | 1 | 7 | −6 | 36 |
| overdose | 2 | 5 | −3 | 9 |
| firearm | 3 | 4 | −1 | 1 |
| Medicaid | 4 | 9 | −5 | 25 |
| SNAP | 5 | 8 | −3 | 9 |
| maternal | 6 | 3 | 3 | 9 |
| disaster | 7 | 6 | 1 | 1 |
| border | 8 | 1 | 7 | 49 |
| Argentina | 9 | 2 | 7 | 49 |

Σd² = 188 → ρ = 1 − (6·188)/(9·80) = 1 − 1128/720 = **−0.57**.

## 17.3 The honest reading

**The inversion is real in direction but moderate, and it is *not* statistically significant at this n.** Allocation runs against need (ρ = −0.57): the highest-mortality crises (USAID-cut populations, overdose, Medicaid, SNAP) are cut hardest, while the lowest-mortality cases (border enforcement, Argentina) are funded most. But for n = 9 the two-tailed Spearman critical value at α = 0.05 is ≈ 0.70, and at α = 0.10 ≈ 0.60 — so −0.57 clears neither. It is *suggestive, not significant*.

**Mechanizing the metric and expanding the population weakened the signal — from −0.89 (n = 6, judgment-coded) to −0.57 (n = 9, formula-coded).** This is the result behaving correctly. The first figure was inflated by population selection and the border-need coding; removing both moved the estimate toward its more defensible value. An instrument whose headline number *shrinks* when you make it more rigorous is an instrument that is measuring something, not manufacturing it.

**The payoff conjunction still holds.** The two funded cases (border enforcement → private-detention architecture B040; Argentina → Milei-alignment) share a capture/alignment payoff; the deeply-cut high-need cases (Medicaid, USAID, SNAP, overdose) share domestic-or-foreign populations with no extraction or alignment payoff. Negative ρ + payoff conjunction = S6 signature present — but at moderate, not-yet-significant strength.

## 17.4 Limitations (binding)

- **Population still analyst-selected.** True pre-registration fixes the crisis list from an *external* source (e.g., the top-N causes of death/persons-affected from a standing index) before any allocation is examined. Here the nine were chosen by the analyst; that is design-grade, not blind. This is the largest remaining bias vector.
- **Deaths-only primary metric** under-weights persons-affected and irreversibility; a persons-affected weighting would raise Medicaid/SNAP and likely *strengthen* the inversion (sign-stable, magnitude-variable) — worth running as a robustness check.
- **Projected vs realized** — USAID (largely modeled/forward) and Medicaid (modeled) carry the heaviest need-weights but the softest realized-death counts; overdose and firearm are realized. A realized-only run would drop USAID's rank and should be reported alongside.
- **n = 9** is still under-powered. The target remains 15–20 with an externally-fixed population.
- **Cross-domain comparability** (financial Argentina vs mortality crises) persists, mitigated but not removed by the death metric.

## 17.5 Verdict and next step

S6's selective-allocation inversion is **directionally robust across both runs and across the de-biasing** (−0.89 → −0.57, always negative), with the payoff conjunction satisfied — but it is **not yet statistically significant**, and its magnitude is sensitive to metric and population choices. The dimension is measuring a real pattern; it is not yet at the strength its first pass implied.

Next, and decisive: fix the crisis population from an **external standing index** (top causes of death + top persons-affected, pulled before allocation is examined), expand to 15–20, and report ρ under both deaths-weighted and persons-affected-weighted metrics with its significance band. Only then does S6 graduate from candidate to scored — and only then could it be considered for the composite index, which it remains outside of.

---

*Increment v0.5 · June 2026 · couples to the control-scores & first-computation increment (v0.4 §16) and the resource-controls / need-metric spec (v0.3 §15.1). S6 remains a candidate dimension, outside the composite Obfuscratic Sabbotarchy Index.*

## Sources (new this increment)

- USAID cuts / projected mortality: Lancet, "Evaluating the impact of two decades of USAID interventions…" — https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(25)01186-9/fulltext ; CNN, "study projects global aid cuts could lead to 9.4M deaths by 2030," Feb 4 2026 — https://www.cnn.com/2026/02/04/world/lancet-usaid-global-aid-cuts-intl ; CIDRAP, "Global aid cuts could lead to 23 million deaths by 2030" — https://www.cidrap.umn.edu/public-health/global-aid-cuts-could-lead-23-million-deaths-2030-study-estimates
- SNAP cuts: Brookings — https://www.brookings.edu/articles/snap-cuts-in-the-one-big-beautiful-bill-act-will-significantly-impair-recession-response/ ; Urban Institute — https://www.urban.org/urban-wire/snap-cuts-one-big-beautiful-bill-act-leave-almost-3-million-young-adults-vulnerable ; PBS NewsHour, "Millions lose SNAP benefits…" — https://www.pbs.org/newshour/show/millions-lose-snap-benefits-as-one-big-beautiful-bills-stricter-requirements-kick-in
- Firearm deaths: Pew Research, "What the data says about gun deaths in the US," Apr 28 2026 — https://www.pewresearch.org/short-reads/2026/04/28/what-the-data-says-about-gun-deaths-in-the-us/ ; CDC Firearm Mortality — https://www.cdc.gov/nchs/state-stats/deaths/firearms.html
