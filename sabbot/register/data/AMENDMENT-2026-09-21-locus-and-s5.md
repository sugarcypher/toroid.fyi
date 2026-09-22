# Amendment 2026-09-21 — three analyst rulings, and a bound the third one needs

Per `PRE-REGISTRATION.md` §8: a dated amendment with a stated reason and a flag for whether it affects
a locked prediction.

**Affects a locked prediction:** T2's — **no** (closed; the S2 change does not move its band or its
match). T1's — **no, because T1's prediction is not yet locked.** These rulings are therefore
*pre-registration content*, fixed before scoring, which is the correct order and not contamination of
the blind-scoring condition in `T1-prediction-elicitation.md` §3.

**Ruled by:** Briar Greenway, 2026-09-21. **Executed by:** Claude. The rulings are the analyst's; the
drafting, the arithmetic and the objection in §4 are Claude's.

---

## §1 — Ruling: the pre-called disguise does not lower S5

The T1 evidence pack flagged that the documented internal coordination in the public-health information
apparatus was **adversarial** — political appointees coordinating against career scientists — rather
than one body holding a plan behind external fog, and asked whether that structure fires S5.

**Ruled:** it does not lower S5. The packet's S5 evasion condition named the disguise in advance, and
"the internal incoherence was structurally different" is within the class it named. An argument
pre-identified as the likely shape of a motivated low score does not get to function as one merely
because it is raised by the scorer rather than the analyst.

**Scope of the ruling, stated so it is not read wider than given:** this bars the structural argument
from *lowering* S5. It does not settle what S5 *is* on this case, which remains for the scorer, nor
does it convert the argument into a reason to raise S5.

## §2 — Ruling: an abolished relief function must influence the score

**Ruled:** the termination of the Section 232 exclusion process is an existing-function degradation and
must influence T2's S2. Applied: **S2 58 → 70**, composite **48 → 50**, band **Mixed** (unchanged),
prediction **still matched**.

70 is the worksheet's own pre-computed figure for refusing the new-function disanalogy — *"if a second
rater refuses that disanalogy, S2 rises to roughly 70 and the composite to 50"* — not a number invented
after the fact. Using the analyst's own pre-registered sensitivity value rather than a fresh judgment is
deliberate: it keeps the correction inside what was committed before the evidence arrived.

Anchors: `adversarial/T2-evidence-addendum-2026-09-21.md` §1.

## §3 — Ruling: the sabbotarchy is a faction, not the whole apparatus

**Ruled:** resistance, reversal under pressure, and internal turmoil are **downstream battle** — the
apparatus fighting the faction — and are not by themselves evidence against the signature. Not everyone
inside an architecture is part of the sabbotarchy.

This is a real refinement and it is analytically right about the cases at hand. The August 2020 testing
guidance was, on the record, *"not written by scientists and posted despite their serious objections"* —
the faction acting through the apparatus. The 25-day reversal under professional-society pressure is
then the remainder winning one, not the faction declining to resist.

**Consequence for T1's S3, traced:** the evidence pack read R1 (guidance reversed in 25 days under
pressure) as pointing against anti-remediation. Under this ruling it does not — a fix extracted by
external pressure is not a fix the operator granted. R1 is re-tagged accordingly and no longer counts
against S3.

## §4 — The bound §3 needs before it ships, and why

**The objection, stated plainly because it is the strongest one available against this refinement:**
an unbounded faction rule makes the instrument unfalsifiable. If every piece of counter-evidence can be
reassigned to "the non-sabbotarchic remainder," then no observation can lower any score, and the
instrument stops being a measuring device. That is a more serious failure than the ceiling-slamming
charge in Part VIII, because ceiling-slamming is visible in the distribution while this would not be.

**The two T1 rows the rule does not cover, and they are the load-bearing ones.** R4 and R5 — the
agency-wide review that leadership **self-initiated** in April 2022, and the return of hospital data
collection to CDC — were not extracted by external pressure. R4 in particular was commissioned by the
director, who then said publicly that *"our performance did not reliably meet expectations."* Calling a
self-initiated, self-critical, high-cost reform "the remainder winning" empties the distinction: the
remainder would then include the agency head acting in their own name. **Under §3 as ruled, R4 and R5
still point against the anti-remediation signature on T1**, and S3 must be scored with that.

**Proposed bound, for the analyst to confirm, revise or reject:** the faction attribution is available
only where the record identifies *who* acted and *against whose objection* — as it does for the August
2020 guidance. Where a corrective act issues from the architecture's own leadership in its own name,
with no documented internal opponent, it counts as the architecture remediating and scores against the
signature. Absent that bound, §3 should not be applied to any seed.

**The symmetry obligation, which is not optional.** §3 is a construct refinement, not a T1-specific
allowance. Under the packet's double-standard condition it is available to every architecture in the
register or to none. Applied to the seeds it will tend to **raise** scores, since each seed's
disconfirming evidence becomes reassignable to a non-sabbotarchic remainder. The seeds already sit
76–91 with none below 70, which is the exact distribution Part VIII concedes a ceiling-slamming
instrument produces.

**Therefore:** before §3 is used to score anything, it should be applied to at least one seed whose
score it would *raise*, and the result published. A refinement that only ever operates where it
protects the thesis is the double standard at construct level rather than at dimension level, and the
register has no check that would catch it there.

## §5 — Status

| Ruling | Status |
|---|---|
| §1 S5 disguise barred from lowering | **in force** |
| §2 T2 S2 → 70, composite → 50 | **applied**, `sabbotarchy.json` v0.9.3, build verifies the recompute |
| §3 faction / downstream-battle rule | **ruled, not yet bounded** — §4 bound awaiting the analyst |
| §4 seed symmetry test | **RUN 2026-09-21** — `SYMMETRY-TEST-2026-09-21-faction-rule.md`, reproducible via `build/verify-symmetry.mjs` |

## §6 — Symmetry test result (added 2026-09-21, after the rulings above)

The test §4 demanded has been run. **The faction rule cannot materially inflate the seeds: maximum
inflation is +2 composite points, on VA, and no seed changes band** (76–91 becomes 78–92 under the
most aggressive reading). All seven composites were verified against their canonical published values
before any counterfactual was run.

The reason is structural, and it converts §4's objection from a worry into a bounded one: the
moderations §3 reaches sit almost entirely on **S4 (weight 0.10)** and **S3 (0.15)**, the two
lowest-weighted dimensions. The seeds are driven by S1, S2 and S5 (0.75 combined), where the
moderations are *epistemic restraint* — a claim withdrawn for want of evidence, a figure ranged, an
inference declined — which §3 does not reach and must never be read to reverse.

**The rule is therefore safe because of where it operates, not because of what it says.** On S5
(weight 0.30) the same argument — "the external incoherence was the remainder fighting back" — would
move a composite by up to 30 points and cross band lines freely. **T1's live S5 question has exactly
that shape.** The bound in §4 is accordingly sharpened: **the faction rule applies to S3 and S4 only;
extending it to S1, S2 or S5 requires its own ruling**, because only there is it capable of moving a
band. Full reasoning and the per-seed table are in the symmetry-test file.
