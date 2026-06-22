# Resource-Operations Negative Controls & the S6 Need-Ranking Metric

**Pre-registered validity tests for the candidate dimensions S6 / S7 / S8**

*B. Greenway · ThinkWell Labs Metrology · methodology increment v0.3 · June 2026*

*Companion to the resource-operations extension (v0.3). No candidate dimension may be scored on any architecture until its negative control here is pre-registered and the S6 need-ranking metric is fixed. Predictions are locked at publication; revisions are logged as dated amendments only.*

---

## 15. Why this document blocks scoring

The resource-operations extension introduced three candidate dimensions — S6 (redefined: selective-allocation asymmetry), S7 (asset/standing dissipation), S8 (induced-harm coercion). Each is structurally capable of becoming an unfalsifiable accusation: S6 because unmet needs always exist, S7 because national-security actions always have a defensible rationale to reinterpret, S8 because a target's suffering always has multiple causes to over- or under-attribute. A candidate dimension that cannot fail is not a measurement and must not be scored. This document supplies, for each, the pre-registered negative control that gives it a working "off" position, plus the external need-ranking metric without which S6 cannot be computed honestly.

The discipline is identical to the original negative-control set (increment v0.2, §12): the predicted band and the falsification trigger are committed **before** any architecture is scored on the dimension; matching predictions to outcomes after the fact destroys the test.

## 15.1 The S6 need-ranking metric (mandatory pre-commitment)

S6's signature is allocation *anti-correlated with need*. That comparison is only meaningful against a need-ranking the analyst cannot tune to produce the desired inversion. The metric is therefore fixed here, before use.

**Construction.** For a defined population of candidate crises (domestic and foreign, within a stated time window), each is scored on four external severity components, each drawn from a named third-party source, none from analyst judgment:

1. **Mortality / morbidity** — deaths and serious-harm counts attributable to the crisis (e.g., CDC, WHO, GBD, agency reporting).
2. **Persons affected** — population exposed or harmed (census, agency, UN/IOM figures).
3. **Cost-of-inaction** — projected economic or human cost if unaddressed (CBO, GAO, peer-reviewed estimates).
4. **Irreversibility** — degree to which delay forecloses remedy (qualitative 0–3, anchored to documented thresholds, e.g., developmental harm to children, species/ecosystem loss, debt-trap dynamics).

Each component is normalized and the need-score is their fixed-weight sum (provisional equal weighting, 0.25 each, until a sensitivity analysis justifies otherwise). **The need-ranking is built and frozen before the allocation-ranking is examined.**

**Allocation-ranking.** The same crisis population is ranked by resources actually deployed (dollars, relief, force, sustained official attention), from public budget and action records.

**Decoupling statistic.** Compute the rank correlation (Spearman ρ) between need-rank and allocation-rank across the population.

- ρ strongly positive → genuine triage (need is being resourced) → **low S6**.
- ρ near zero → allocation indifferent to need → mixed.
- ρ negative → allocation *inverted* against need → **S6 signature present**, *conditional on* the payoff test below.

**Payoff conjunction (required).** A negative ρ alone is not sufficient. The resourced set must additionally share a payoff property (financial capture or political alignment) **and** the high-need/ignored set must share the absence of payoff. Negative ρ without the payoff conjunction is noise, not signature.

**Bias audit.** The crisis population and the four sources must be listed before scoring; adding or dropping crises after seeing the allocation data is a logged amendment, not a silent edit.

## 15.2 Negative controls, pre-registered

### S6 control — genuine triage (predicted LOW)

*Candidate:* a documented disaster-response or public-health allocation in which resources flowed to the most severe, time-critical needs first (e.g., a major hurricane or pandemic response where deployment tracked casualty and exposure data).
*Prediction:* **Genuine band (0–30).** Need-rank and allocation-rank positively correlated (ρ > 0); no inverse-to-need-plus-payoff pattern.
*Decisive test:* the ρ statistic and the payoff conjunction.
*Falsification trigger:* if a genuine-triage case scores in the engineered band, the need-ranking metric is miscalibrated or the payoff conjunction is being applied too loosely — S6 is not yet usable.

### S7 control — genuine national-security action (predicted LOW)

*Candidate:* a use of force against a real, imminent threat, with congressional authorization (or clear statutory basis), proportionate means, and a strategic public benefit — scored on the same four-part test as the candidate S7 cases.
*Prediction:* **Genuine band (0–30).** Justification not manufactured (real threat); assets expended toward a public-strategic end; not primarily factional/spectacle.
*Decisive test:* test 1 (manufactured pretext?) and test 4 (factional vs. public payoff?).
*Falsification trigger:* if a lawful, proportionate, publicly-beneficial action scores engineered, S7 is reading ordinary statecraft as signature and must be tightened before use. (S7 is already the most intent-exposed dimension; this control is its principal safeguard.)

### S8 control — carve-out-preserving targeted sanction (predicted LOW)

*Candidate:* a targeted sanctions regime that retained explicit humanitarian carve-outs for food and medicine and produced no measurable civilian-mortality effect.
*Prediction:* **Genuine band (0–30).** Harm not deliberately inflicted on a civilian population; no instrumentalized immiseration.
*Decisive test:* test 1 (deliberate causation of civilian harm?) and test 2 (harm falls on non-combatants?).
*Falsification trigger:* if a carve-out-preserving sanction scores as induced-harm coercion, S8 is conflating *any* sanction with weaponized suffering — the signature must be the *removal* of carve-outs and resulting population-level harm, not sanctions per se.

## 15.3 Matched passing anchors (for contrast, from v0.3)

Each control is paired with an already-documented passing case so the dimension's discrimination is legible:

| Dimension | Passing anchor (signature present) | Negative control (predicted low) |
|-----------|------------------------------------|----------------------------------|
| S6 | $1.8B self-settlement fund (manufactured); Argentina (selected-by-alignment) | genuine disaster/public-health triage |
| S7 | Caribbean/Pacific boat strikes; Maduro capture | lawful, authorized, proportionate use of force |
| S8 | Cuba oil blockade; Venezuela pre-capture pressure | carve-out-preserving targeted sanction |

The pairing is the point: a dimension earns the right to score its passing anchors only once its control returns low under identical rubric application.

## 15.4 Status

- Predictions and the need-ranking metric are **locked** at this publication; amendments dated and logged.
- Formal scoring of any architecture on S6 / S7 / S8 remains blocked until each control is scored and returns its predicted low band.
- The candidate dimensions stay **outside the composite Obfuscratic Sabbotarchy Index** until validated (carried from v0.3 §14.9).
- Next: identify and name the specific control architectures (the §15.2 candidates are categories; each needs one named, dated instance with its evidence anchors) and assemble the S6 crisis population with its four named sources.

---

*Increment v0.3 · June 2026 · pre-registration document; couples to the resource-operations extension (v0.3 §14) and the original negative-control set (v0.2 §12).*
