# T1-PUBHEALTH-INFO — evidence pack (machine-proposed)

**Architecture:** the federal pandemic-era public-health **information apparatus**, 2020-Q1 → 2022-Q4.
**Compiled:** 2026-09-21 by Claude (Opus 5). **Status: `ratified: false`. Machine-proposed.**
**This pack contains no scores and must not be scored from until ratified.**

## What this is and what it is not

Per `PROVENANCE.md` and the machine-proposal boundary enforced in `pipeline/ingest.py`: every anchor
below is **Claude-proposed and unverified**. It carries the agent identifier for life, stays
`ratified: false` until a human confirms each field **against the primary source**, and is excluded
from every statistic and every rendered figure until then. Nothing here has the analyst's signature.

**No prediction was consulted in compiling this.** T1's prediction is unlocked, and the drafted table
in `T1-convict-a-friend.md` was not read against the evidence while gathering. The elicitation sheet's
blind-scoring condition (§3) survives this pack.

**Search effort is declared, because the T2 validation found effort asymmetry biases scores.** This is
one pass: eight targeted searches, two page fetches, roughly ninety minutes. It is **thinner than the
seed corpus** (338 lines of compiled backscoring evidence) and thicker than T2's single pass. Anchors
marked `headline-only` were not read in the body. A second pass should go first to the gaps in §7.

**Tags:** `occurred` = documented event · `projected` = model or forecast · `contested` = disputed
magnitude or characterization · `correlation` = measured relationship, no causal claim.

---

## §1 — S5 external coherence · dated issuances and revisions

The packet requires the measurable quantity to be *"the count of mutually contradictory public framings
issued from coordinated sources within a fixed window,"* not an impression of confusion. Intervals are
computed from the dates as recorded.

| # | Issuance | Date | Revision / contradiction | Date | Interval | Tag |
|---|---|---|---|---|---|---|
| E1 | Asymptomatic close contacts "do not necessarily need a test" | 2020-08-24 | Reversed; testing of asymptomatic close contacts again recommended | 2020-09-18 *or* -09-19 | **25–26 days** | `occurred`; end date differs by source, recorded as a range |
| E2 | Fully vaccinated people may gather indoors without masks or distancing | 2021-03-08 | Everyone in substantial/high transmission areas should mask indoors | 2021-07-27 | **141 days** | `occurred` |
| E3 | Elementary school distancing reduced 6 ft → 3 ft with universal masking | 2021-03-19 | — | — | — | `occurred` |
| E4 | Isolation shortened 10 days → 5 days, no negative test required to exit | 2021-12-27 | — | — | — | `occurred` |
| E5 | Healthcare-worker isolation: 7-day return with negative test | 2021-12-23 | General-population guidance issued 4 days later requires **no** test to exit at 5 days (E4) | 2021-12-27 | **4 days** | `occurred`; the contradiction is between two same-agency issuances in the same week |
| E6 | Transmission guidance updated to acknowledge airborne spread in poorly ventilated spaces | 2020-10-05 | — | — | — | `occurred` |
| E7 | Masks recommended for all people outside the home | 2020-04-03 | — | — | — | `occurred` |

**E5 is the strongest single external-coherence anchor in this pack** and was not something the search
was looking for: the same agency, in the same week, told healthcare workers a negative test gates a
7-day exit and told the general public no test gates a 5-day exit. Four days apart. Whether that is a
contradiction or a defensible population-specific distinction is a scoring judgment, not an evidence
judgment, and is left open.

**Known gap:** the early-2020 position that the general public should *not* wear masks — the most
frequently cited reversal of the period — **has no dated anchor in this pack.** The CDC Museum
timeline, fetched for exactly this, begins its mask entries at 2020-04-03 and does not record the
prior position or its reversal. A primary-source date is required before it can be used, and its
absence from the agency's own timeline may itself be an S5 datum. **Do not score E-series on memory
of this episode; it is not anchored here.**

## §2 — S5 internal coherence · coordination records

| # | Finding | Date | Source class | Tag |
|---|---|---|---|---|
| I1 | HHS political appointees altered an MMWR on early pandemic spread | 2020-05 | Congressional report, quoting documents | `occurred` |
| I2 | HHS Secretary Azar directed CDC to change the MMWR editorial process because officials were "not happy" that an MMWR did not draw a politically advantageous conclusion; warned that "if the CDC would not get in line, then HHS would take control of approving the publication of the MMWRs" | 2020-05 | Congressional report, quoted | `occurred` (quoted language) |
| I3 | HHS officials delayed release of a Health Alert Network advisory on MIS-C in children | 2020-05 | Congressional report | `occurred` |
| I4 | Guidance for faith communities, meatpacking plants, polling locations and voters, restaurants and bars, and testing was overruled or weakened by political appointees; Redfield acknowledged these were "compromised" on multiple occasions | 2020 | Congressional report; Redfield acknowledgment | `occurred` |
| I5 | The August 2020 asymptomatic-testing change (E1) "was not written by scientists and posted despite their serious objections" | 2020-08-24 | Reporting; reproduced in peer-reviewed commentary | `occurred`, characterization `contested` |
| I6 | Administration rejected CDC's plan to extend the No Sail Order through winter 2020-21; a Conditional Sail Order issued instead | 2020-10-30 | Congressional report | `occurred` |
| I7 | Source report: *"It Was Compromised": The Trump Administration's Unprecedented Campaign to Control CDC and Politicize Public Health During the Coronavirus Crisis*, House Select Subcommittee on the Coronavirus Crisis | 2022-10-17 | Congressional report | `occurred` |

**A record-destruction finding was searched for and NOT confirmed in the fetched source.** A search
result referenced testimony that the MMWR editor-in-chief was instructed to delete an email, with the
instruction attributed to Director Redfield. **The fetched report page did not contain this finding**,
and the discrepancy is recorded rather than resolved. Treat as `contested` and unanchored pending a
primary source. It must not be used until someone reads the underlying testimony.

### The structural question §2 raises, named so it cannot be resolved silently

S5 reads the **ratio** of internal coherence to external coherence. The §2 record documents internal
coordination that was **adversarial** — political appointees coordinating *against* career scientists —
rather than a single coordinated body maintaining a plan behind deliberate external fog. Whether that
structure fires S5, fires it at reduced weight, or fails to fire it is a **scoring judgment the rubric
does not obviously settle**, and it is the pivot on which T1's operative prediction turns.

It is flagged here, in advance and in the open, for one reason: the packet's **S5 evasion condition**
names the most likely disguise a motivated low score would wear, and *"the incoherence was structurally
different"* is a close cousin of *"the incoherence was honest."* Whichever way the scorer resolves it,
the resolution must be written out and checked against what the seed worksheets permit — and if the
distinction is allowed here, it must be offered to every seed where external incoherence could be
attributed to contested internal control.

## §3 — S3 anti-remediation · fixes by cost class

The packet: *"at least one near-zero-cost fix and one high-cost fix are required or S3 is not scoreable
and must be left unscored rather than estimated."* Both classes are present. **Both directions are
present too, and that is the finding.**

| # | Dysfunction | Proposed fix | Cost class | Documented response | Tag |
|---|---|---|---|---|---|
| R1 | Aug 2020 testing guidance contradicted evidence | Restore prior guidance | **near-zero** | **Fix adopted** after external professional-society pressure — reversed in 25–26 days (E1) | `occurred` |
| R2 | Dec 2021 isolation change lacked published supporting data | Publish the rationale / supporting data | **near-zero** | Rationale given verbally and shifted: contagiousness "wanes after about five days," and separately that it "really had a lot to do with what we thought people would be able to tolerate." No published data release is anchored here | `occurred` for the statements; the absence of a data release is `contested` and under-searched |
| R3 | MMWR editorial independence compromised (I1–I2) | Restore the editorial firewall; publish a revision log | **near-zero** | **Not anchored.** No documented response either way in this pass | **gap** |
| R4 | Agency-wide structural and scientific failure | Full agency review and reorganization | **high** | **Fix self-initiated and adopted.** CDC leadership began an agency-wide review 2022-04; ~120 interviews; 10 strike teams; "CDC Moving Forward" launched 2022-08 | `occurred` |
| R5 | Hospital data reporting pathway | Return collection to CDC/NHSN | **high** | **Fix adopted**, ~29 months later — reporting transitioned back to CDC NHSN mid-December 2022 | `occurred` |

**This table points substantially against the anti-remediation signature, and that is stated plainly
rather than buried.** S3 reads the *slope* of resistance against the cost of the fix. Here the two
highest-cost fixes (R4, R5) were adopted — one of them self-initiated, with the director stating
publicly, *"For 75 years, CDC and public health have been preparing for COVID-19, and in our big
moment, our performance did not reliably meet expectations."* A near-zero-cost fix (R1) was also
adopted, under pressure, in under a month. **A positive cost-resistance slope is the rubric's own
control condition for a genuinely struggling agency, not the signature.** R2 and R3 are the rows that
could cut the other way, and R3 is unanchored.

Whoever scores this should note that the seeds were scored on records where cheap fixes were refused
outright. The disanalogy here is large and runs toward a low score — which is exactly the direction a
"convict a friend" test must be most suspicious of. Write the reasoning out.

## §4 — S2 domain-selective competence

The packet requires identifying an extractive counter-function within the same body **or the explicit
finding that none exists.**

**One candidate, and it is genuinely arguable rather than strong:**

| # | Finding | Date | Tag |
|---|---|---|---|
| C1 | Hospitals stopped daily COVID reporting to CDC's NHSN and were directed to report to HHS TeleTracking / "HHS Protect" instead, despite ~85% of hospitals already reporting through NHSN | 2020-07-15 | `occurred` |
| C2 | Redfield testified before Congress that CDC was not involved in the decision and was informed only after it was made | 2020-07-31 | `occurred` |
| C3 | Reported effects: increased hospital data-management burden, potential delays to supply shipments, compromised state access to key data, reduced public transparency | 2020 | `contested` (characterization from advocacy and trade sources) |
| C4 | Collection returned to CDC NHSN | 2022-12 | `occurred` |

**The honest reading is that this is a weak S2 candidate.** The rubric's S2 signature is *the same body*
running one function surgically while a public-facing function degrades. Here the data-collection
function was **moved out of** the body whose public-facing function degraded — which is a different
shape. Calling the receiving system an "extractive counter-function" would require showing it ran
clean, and C3 suggests the opposite (the collected data was itself reported as questionable).

**Provisional finding, for the analyst to confirm or reject: no clear extractive counter-function is
identified within the information apparatus in this pass.** Per the packet, if that finding holds,
**S2 is low and must be scored low** — not left generous because the case is sympathetic, and not
inflated because C1–C4 look bad in isolation.

## §5 — S4 personnel selection

| # | Finding | Date | Tag |
|---|---|---|---|
| P1 | Messonnier publicly warned Americans to prepare, saying "disruption to everyday life may be severe," while other officials said the immediate threat remained low | 2020-02-25 | `occurred` (quoted) |
| P2 | She did not appear at the White House briefing again after those comments | 2020-02-26 onward | `occurred` |
| P3 | **Disconfirming:** she continued giving regular *CDC* briefings until April 2020, and resigned in 2021 (last day 2021-05-14) for an outside role | 2020–2021 | `occurred` |
| P4 | Day after the first CDC White House briefing, Pence named task-force chair; Birx installed as response coordinator | 2020-02-26 | `occurred`; the stated motive ("sunnier forecasts") is `contested` commentary, not a finding |

**P2 and P3 must be read together.** "Silenced" is the common characterization and it is `contested`
on the record assembled here: removal from one podium is documented; removal from her role is not, and
she briefed for another two months. A scorer using P1–P2 without P3 is building the double standard the
packet's condition 1 exists to catch.

**Under-searched.** No systematic anchor on career-scientist departures, loyalty screening, or
advancement patterns across the apparatus. S4 carries weight 0.10; a thin pass here costs least, but it
should not be scored as if it were complete. See §7.

## §6 — S1 outcome distribution

**Thinnest dimension in this pack, and it carries the second-highest weight (0.25).**

The packet's own expectation is that stated and realized beneficiary classes are both broadly
`general_public`, with no clean realized-beneficiary divergence. Nothing gathered in this pass
contradicts that, and nothing in this pass positively establishes it either. **S1 is not scoreable from
this pack.** Treat §6 as a gap, not as support for a low score — the T2 validation found that exactly
this move, scoring low from absence of located evidence, biases toward acquittal.

## §7 — Gaps, in priority order for a second pass

1. **S1 entirely** (weight 0.25) — nothing gathered. Highest weight per unit of missing evidence.
2. **E-series early-mask reversal** — the period's most-cited reversal has no dated anchor.
3. **R3, MMWR editorial firewall** — a near-zero-cost fix with no documented response either way. This
   row alone could move S3 materially, and it is the one row where the resistance reading is untested.
4. **The record-destruction discrepancy** (§2) — a search result asserts it; the fetched report does
   not contain it. Resolve against primary testimony or drop it.
5. **S4 systematic personnel record** — beyond the single Messonnier episode.
6. **E1 end date** — 2020-09-18 vs -09-19 across sources.
7. **Anchors marked `headline-only`** — none in this pack were body-read beyond the two fetched pages.

## §8 — What this pack does and does not establish

**Establishes:** that T1 is evidentially tractable. Both S3 cost classes are present, so S3 is
scoreable. S5 has dated issuances with computed revision intervals on both the internal and external
side, which is what the operative prediction needs.

**Does not establish:** any score, on any dimension. It also does not establish that the evidence is
balanced — §3 and §5 turned up disconfirming material readily, §1 and §2 turned up confirming material
readily, and **one pass is not enough to know which way the remaining evidence leans.** The gaps in §7
are not neutral: §6 and §7.3 are both rows where the missing evidence would most plausibly *raise* the
score, which means scoring this pack as it stands would tilt low.

**Sources.** House Select Subcommittee on the Coronavirus Crisis, *"It Was Compromised,"* 2022-10-17 ·
CDC Museum COVID-19 Timeline · Journal of Clinical Microbiology, "When Should Asymptomatic Persons Be
Tested for COVID-19?" · IDSA/HIVMA statement on CDC guidance changes · Axios, 2020-09-18 · AHA Special
Bulletins 2020-07-13 and 2022-08-17 · CDC "Moving Forward" summary · STAT, 2020-02-25 · NPR, 2021-05-07
· Boston Globe and The Hill, 2021-12-29 on the isolation rationale. Full URLs to be recorded in
`evidence-annex.json` on ratification — **they are deliberately not written into the annex yet**,
because annex entry is the step that confers the analyst's signature.
