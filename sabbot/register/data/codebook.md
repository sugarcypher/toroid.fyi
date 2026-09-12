# Obfuscratic Instance Register — Coding Manual

Version 1.0. Locked 2026-09-12. Amendments are dated additions; nothing in this file is silently edited.

This manual governs the **instance layer**, which is a different object from the architecture register. An instance is a single dated event drawn from a pre-registered frame. It carries a direction sign and nothing resembling a composite score. The instance layer answers one question: **does the residue of ordinary failure keep a direction?** The architecture register answers a different question and keeps its own rubric.

---

## 1. Why the instance layer exists, and what it is not

The concession at the front of *Named and Counted* is that ordinary failure is symmetric, slow, and uncoordinated. That concession supplies the null hypothesis for this layer, and it is a strong one:

> **Null:** Under honest failure, the direction of divergence between stated beneficiary and realized incidence is symmetric. Across independent decision loci, direction is as likely to run one way as the other.

That null is exactly what a corpus of ordinary incompetence should produce. Fatigue keeps no direction. So a corpus of *incompetencies* is the null's home ground, and testing there is the strongest available form of the argument: if the register is drawn by an enumeration rule that could return counter-directional items, and the observed direction departs from symmetry across independent loci, the departure is the residue the book names.

The instance layer is **not** a way to score more architectures. It is **not** a place to put items because they are salient. It does **not** produce bands. Five things are forbidden outright:

1. Coding an item that was not enumerated by a locked frame.
2. Coding an item whose frame position is unknown.
3. Entering an unratified machine-proposed record into any statistic or figure.
4. Adding an item to a frame after coding has begun, except as a dated amendment that states whether it affects the locked prediction.
5. Reporting a per-instance p-value as though instances were independent. See section 5.

---

## 2. Frames

A frame is a rule, published before coding, that enumerates a population of events independently of their content. Federal Register final rules in a quarter. GAO reports issued in a window. Inspector General findings. Agency reduction-in-force notices. Court filings in a docket class.

A source qualifies as a frame only if all four hold:

- **Enumerable.** The full item list can be produced mechanically by a third party from the stated rule.
- **Content-blind.** The rule refers to document type, issuing body, and date, never to subject matter, severity, or expected outcome.
- **Counter-directionally reachable.** At least two item types that would code negative are named in the frame record before coding begins.
- **Archivable.** Every item has a permanent identifier or an archive snapshot.

"Headlines I noticed" fails the first three. It is not a frame and no statistic may be computed over it. High-salience non-frame events belong in a separate illustrative annex, rendered as illustration and never entering a test.

---

## 3. The locus rule — the most consequential decision a coder makes

**`locus_id` is the unit of statistical independence.** It is not the agency, not the topic, and not the news story. It is the smallest unit within which outcomes were decided together.

Two items share a locus when a single decision, a single authorizing instrument, or a single decision-maker acting on one occasion produced both. They differ when the decisions could have gone differently from one another.

- Forty final rules implementing one statute: **one locus.** The statute decided them.
- Forty final rules from forty agencies under separate authorities: **forty loci.**
- Three hundred news items about one reconciliation bill: **one locus, and one instance.** Reporting volume is not evidence volume.
- One agency issuing independent enforcement decisions across unrelated programs in different quarters: **multiple loci**, if and only if the decisions were not made together. State why in `locus_rationale`.

**Consequence to internalise.** A register of 3,000 items spanning 40 loci has the statistical power of 40, not 3,000. Corpus value is measured in independent loci, not item count. Coding effort should be spent widening the locus span, not deepening coverage of loci already represented. The register reports its locus count more prominently than its item count for this reason.

The temptation the rule exists to block: splitting one decision into many loci inflates significance without adding information. Where a locus boundary is arguable, **collapse to the coarser unit.** Coarser is conservative; it can only reduce the claim.

---

## 4. Direction coding

Direction is the signed divergence between the **stated** beneficiary class and the **realized** incidence class.

Procedure, in this order, and the order matters:

1. Read the authorizing document. Record the purpose language **verbatim** in `stated_beneficiary_quote`. Assign `stated_beneficiary_class` from the closed vocabulary. Paraphrase is not permitted at this step; the stated purpose is the document's, not the coder's.
2. Establish realized first-order incidence from `incidence_basis`. If nothing in the permitted basis list establishes it, `incidence_basis` is `not_yet_established`, direction is **0**, and the instance is registered but excluded from the test. Registering it is not optional; excluding it is not discretionary.
3. Only then assign direction.

| Value | Meaning |
|---|---|
| **+2** | Incidence fell on a class with an identifiable payoff while the stated class bore net loss, and the divergence is large relative to the operation's scale. |
| **+1** | Incidence diverged from the stated class toward an unstated class. |
| **0** | Incidence fell roughly where stated, or divergence is symmetric across classes, or incidence is not yet established, or the event is indeterminate. |
| **−1** | Incidence fell **more** on the stated beneficiary class than the document promised, or fell on a class that would be expected to benefit under the directional reading and instead bore the loss. |
| **−2** | As −1, and large: the operation's failure ran hard against the class the directional reading predicts it would protect. |

**Negative values must be reachable or the test is void.** A frame that returns no negative items over hundreds of coded instances is either measuring a genuinely one-directional world or was not content-blind. The register cannot tell those apart from the inside, which is why the frame record names negative-coding item types in advance and the coding rate against them is published.

Worked examples of items that **must** code negative when they appear:

- A deregulatory action whose realized incidence falls on `large_incumbent_firms` — the rollback cost the incumbents it would be predicted to favour.
- An enforcement teardown followed by enforcement actually landing on `detention_or_enforcement_contractors` or `political_alignment_network`.
- A funding cut whose incidence fell on `high_income_households` or `financial_asset_holders` rather than on the enrolled population.
- A procurement action awarded against the interest of a `specific_contractor_or_vendor` with an established channel.
- A delivery failure that fell symmetrically on the public-facing and extractive functions alike — which codes **0** and is the single most common honest result in a frame drawn from ordinary administrative output.

A coder who cannot produce a negative or zero coding across a substantial frame run should stop and have a second coder re-run a random subset blind. That instruction is part of the method, not a caution attached to it.

**`payoff_conjunction` is recorded separately from direction.** Part V's rule is that directional coding without a shared payoff on the resourced side is noise rather than signature. Keeping the two fields apart lets the whole register be re-run under the stricter reading, where only payoff-conjoined items count. Publish both numbers.

---

## 5. Statistics — what may and may not be reported

**Never report a per-instance binomial p-value.** Instances within a locus are dependent by construction, and the per-instance test treats them as independent. On a real register the per-instance p is inflated by orders of magnitude. The pipeline computes it anyway, and prints it beside the valid figure, labelled as the invalid one. It is shown precisely so the inflation is visible rather than available.

**The valid test is a cluster-level sign-flip permutation test.** Collapse each locus to its mean direction. Under the null, flip the sign of whole loci independently with probability one half; arbitrary dependence inside a locus is thereby permitted, which is what makes the test conservative and correct. Report:

- number of loci with nonzero mean (`effective_n`)
- observed mean of locus means
- two-sided permutation p
- the per-instance p, labelled invalid, for contrast

**Report the effect, not only the sign.** A locus-level mean of +0.15 across 200 loci and a mean of +1.6 across 12 loci are different claims. The first is a faint, wide residue; the second is a strong, narrow one. State which.

**Synchrony is reported only as an excess over matched baseline transitions.** Its bare form overclaims and Part IV forbids it. The rank-based p against *B* matched baselines cannot fall below 1/(B+1). With three baseline transitions the floor is 0.25, which means **the synchrony claim cannot reach conventional significance at the current baseline count, however bunched the observed onsets are.** The pipeline refuses to report a synchrony p with fewer than six matched transitions and says why.

**Breadth velocity requires a fixed denominator.** The pipeline compares the slate at each epoch against the pre-registered slate and returns a frame violation, not a number, if the slate grew. Adding architectures because they score high makes the count rise as an artifact of attention.

---

## 6. Provenance

Machine extraction may propose a candidate record. It may not code one.

- A machine-proposed record carries `proposed_by: machine_extraction` and its agent identifier for the life of the record, whether or not a human later changed every field.
- `ratified: false` until a human has opened the primary source and confirmed every field against it. Unratified records are excluded from every statistic and every rendered figure, without exception and without a flag the renderer can be told to ignore.
- Fields the human changed at ratification are listed in `machine_fields_altered_at_ratification`. The running alteration rate is the register's measured machine error rate and is published alongside the statistics.

A machine-proposed field that a human ratified without opening the source is unsourced material wearing a human signature. The alteration-rate column exists so that failure mode leaves a trace.

---

## 7. Double coding

Double-code a random 10% of every closed frame, blind, by a second human. Publish the direction agreement rate and the locus-assignment agreement rate separately; they fail differently. Locus disagreement changes effective *n* and therefore the p-value, so it is the more serious of the two and is reported first.
