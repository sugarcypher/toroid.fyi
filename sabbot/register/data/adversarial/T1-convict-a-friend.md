# Adversarial Test 1 — Convict a Friend

**Architecture ID:** `T1-PUBHEALTH-INFO`
**Slate:** SLATE-2026-09 · role `adversarial_test`
**Status:** prediction drafted, NOT LOCKED, NOT SCORED
**Required before scoring:** the analyst locks the prediction below with a date and signature. A prediction the analyst did not author is not one the result can embarrass.
**Lock it here:** `T1-prediction-elicitation.md` — added 2026-09-21 after the T2 validation pass. It replaces the band statement below with a probability distribution plus per-dimension point estimates (T2's locked band spanned 70% of the scale and carried ~0.5 bits), and adds a blind-scoring condition (T2's scorer read the prediction before scoring). The drafted table below stands until you lock over it.

---

## What this test is for

Part VIII states the problem plainly: every architecture the instrument scored high is one the analyst already opposed, and every architecture it scored low is temporally and politically remote. The reform-lineage controls prove the instrument *can* acquit, but they acquit the distant dead. Until the instrument rules against its operator somewhere a reader can watch, a reader is right to suspect it has only ever agreed with them.

This is the first of the two tests that retires that suspicion. It is worth more to the project's standing than any number of additional confirming architectures, because confirming cases raise the mirror prior while this one is the only thing that lowers it.

## The case

The federal pandemic-era public-health **information apparatus**, 2020-Q1 through 2022-Q4.

Scope boundary, stated before scoring so it cannot be narrowed later to protect the result: this test scores the **information architecture** — guidance issuance, its internal coordination, and its external coherence. It does not score vaccine development, distribution logistics, or clinical practice. It does not score whether any particular guidance was correct on the merits. S5 reads the *ratio* between internal coherence and external coherence, and that ratio is scoreable independently of whether the underlying science was right.

## The locked prediction (DRAFT — analyst to confirm or revise, then lock)

The claim in Part VIII is narrow and falsifiable: the instrument *as specified* will plausibly score this architecture into the **high band on S5 in particular** — coordinated internal messaging beside shifting and self-contradictory external guidance, with cheap corrections resisted as hard as costly ones.

| Dimension | Predicted range | Reasoning stated in advance |
|---|---|---|
| S1 outcome distribution | low to mid | No clean realized-beneficiary divergence is expected; the stated and realized beneficiary classes are both broadly `general_public`. If S1 comes back high, say why in terms a critic scoring a seed low would be allowed to use. |
| S2 domain-selective competence | mid | Requires identifying an extractive counter-function running clean beside a failing public-facing one. If no extractive counter-function is identifiable, S2 is low and must be scored low. |
| S3 anti-remediation | mid to high | The construct reads the slope of resistance against the cost of the fix. Cheap corrections — a retraction, a plain restatement, a published revision log — resisted as hard as expensive ones would fire this dimension. |
| S4 personnel selection | low to mid | |
| S5 information architecture | **high** | This is the operative prediction. High internal coordination beside low external coherence is the signature, and the apparatus is a live candidate for it on the public record. |
| **Composite** | **predicted band: high_asymmetry is live; mixed is also admissible** | The prediction is that S5 lands high. The composite following it into the high band is likely but is not itself the test. |

## Falsification conditions for the test itself

The test fails — meaning the *framework* fails, not the case — under either of these:

1. **The double-standard condition.** If the analyst reaches for reasons to score this architecture low that they would not accept from a critic scoring a seed low. Every such reason must be written into the scoring worksheet and checked against the seed scoring notes for the same dimension. If a reason appears here that was rejected there, that is a recorded failure of the instrument and must be published as one.
2. **The S5 evasion condition.** If S5 is scored low on the grounds that the external incoherence was *honest* — that guidance shifted because the science shifted — then the same allowance must be extended to every seed architecture where external incoherence could be attributed to evolving circumstance, and the seed S5 scores rescored accordingly. The allowance is either available to both or to neither. Choosing it here alone is the double standard in its most likely disguise, and it is named in advance for that reason.

## Required evidence anchors, by class

No anchors are supplied here. Supplying them would put unverified material into the register wearing the analyst's signature. What is specified is the *class* of document each dimension requires, so the anchor hunt is bounded:

- **S5 internal coherence:** contemporaneous interagency coordination records — meeting records, coordinated messaging guidance, cleared talking points. Tag `occurred` only where the document is in hand.
- **S5 external coherence:** dated guidance issuances and revisions from the same body, side by side, with the revision interval recorded. The measurable quantity is the count of mutually contradictory public framings issued from coordinated sources within a fixed window, not a general impression of confusion.
- **S3:** for each identified dysfunction, the proposed fix, its cost class (near-zero / moderate / high), and the documented response. The dimension reads the *slope*, so at least one near-zero-cost fix and one high-cost fix are required or S3 is not scoreable and must be left unscored rather than estimated.
- **S2:** identification of an extractive counter-function within the same body, or the explicit finding that none exists.
- **S1, S4:** standard rubric anchors.

## Publication commitment

Whatever this returns is published at `/sabbot` in the same table as the seeds, with the same rubric version, and with the prediction and its lock date shown beside the result. A result withheld because it was uncongenial would be worse for the project than a high score here, and this paragraph exists so that withholding leaves a visible hole.
