# T1 — prediction elicitation sheet

**For:** Briar Greenway. **Prepared:** 2026-09-21, by Claude, after the T2 validation pass.
**Status:** awaiting the analyst. Nothing here is a prediction, and nothing here contains evidence.

T1 is blocked on exactly one input: your locked prediction. This sheet exists to make locking it a
ten-minute job instead of an afternoon, and to stop T1 repeating two defects the T2 validation found.

**No anchors, figures, or case material appear in this sheet on purpose.** Reading it cannot move your
prior about the case, only about the format your prediction has to take. The evidence hunt is specified
in `T1-convict-a-friend.md` by document class and has not been run.

---

## Why the format is changing — two defects carried from T2

### Defect 1: the predicted band was too wide to be worth much

T2's locked prediction was **"Mixed or lower"** — composite 0–70 on a 0–100 scale. That is 70% of the
range. Scoring the outcome against a width-proportional baseline, the match carried about **0.5 bits**.
The case had also been selected, in writing, because its profile was expected to score low.

None of that makes the T2 result worthless — it is still a live-domain architecture the instrument
declined to convict, which is what Part VIII needed. But "prediction matched" is doing less work than
the phrase implies, and a critic will find that in about a minute.

T1's drafted composite prediction has the same shape: *"high_asymmetry is live; mixed is also
admissible"* spans 30–85, or 55% of the range. **A prediction that admits most outcomes cannot
embarrass you, and T1 is worth running only to the extent it can.**

### Defect 2: the scorer was not blind

T2's locked prediction sat in the worksheet header, read by the scorer before scoring. Pre-registration
is supposed to constrain the scorer; it cannot do that when the scorer's interest runs toward a match.
This is procedural and avoidable, and §3 below avoids it.

---

## §1 — Lock a distribution, not a band

For the composite, put a probability on each band. They must sum to 1. Rough numbers are fine; the
point is that they commit you.

| Band | Range | Your probability |
|---|---|---|
| Genuine | 0–30 | ____ |
| Mixed | 30–70 | ____ |
| High-Asymmetry | 70–85 | ____ |
| Extreme-Asymmetry | 85–100 | ____ |

This buys three things a band statement cannot:

- **It is scoreable.** Information gain against a width-proportional baseline (0.30 / 0.40 / 0.15 / 0.15)
  turns "matched / didn't match" into a number. A confident correct call earns real credit; a hedge
  earns almost none; a confident wrong call costs you. That is what makes it a prediction.
- **It cannot be wide by accident.** Spreading mass to stay safe is visible as spreading mass.
- **It survives a near miss.** If T1 returns 68 against a High-band call, a point-and-distribution
  prediction records a near miss honestly; a band statement records a flat failure and invites
  re-litigating the threshold afterwards.

## §2 — Lock a point estimate per dimension

The operative claim in Part VIII is about **S5 specifically**, not the composite. Give each dimension a
point estimate; the ±10 band is implied and does not need stating.

| Dim | Weight | Your point estimate | Would a result 20 points away change your mind about the instrument? |
|---|---|---|---|
| S1 outcome distribution | 0.25 | ____ | |
| S2 domain-selective competence | 0.20 | ____ | |
| S3 anti-remediation | 0.15 | ____ | |
| S4 personnel selection | 0.10 | ____ | |
| **S5 information architecture** | **0.30** | ____ | **operative — answer this one** |

Note the weights: S5 alone carries 0.30, more than any other dimension, and S1+S5 together carry 0.55.
A prediction about S5 is most of a prediction about the composite.

## §3 — The blind-scoring condition

**Whoever scores T1 must not see §1 or §2 until every dimension is scored and written up.**

The mechanics, whoever does the scoring:

1. You lock §1/§2 and put them somewhere the scorer cannot read — a separate file, committed, hash
   recorded in `slate.json`.
2. The scorer works from the evidence pack and the rubric only. The worksheet header carries the
   case, the rubric version and the epoch — **not the prediction.**
3. Scores are written and frozen.
4. Only then is the prediction opened and the comparison recorded.

If I do the scoring, blinding is enforceable the same way: I score in a session that has never been
shown §1/§2. This fixes non-blindness. **It does not fix non-independence** — a Claude-scored T1 is
still Claude-scored, still the register's weakest provenance class, and still no substitute for a
second human rater. Say so on the page if it comes to that.

## §4 — What you are committing to publish

Already committed in `T1-convict-a-friend.md`, restated because this is the moment it binds:

> Whatever this returns is published at `/sabbot` in the same table as the seeds, with the same rubric
> version, and with the prediction and its lock date shown beside the result.

And the two falsification conditions for the *framework* — the double-standard condition, and the S5
evasion condition (scoring S5 low because the incoherence was *honest* requires extending that same
allowance to every seed, and rescoring them). The S5 evasion condition is the one that will actually
be tempting. It is named in advance for that reason.

## §5 — One thing to decide before locking

The drafted prediction says S5 lands **high**. If that is genuinely your expectation, T1 is not a
"convict a friend" test at all — it is another confirming case, and it is worth much less than Part VIII
claims. The test earns its name only if you expect the instrument to return something **you would rather
it didn't**.

So, before filling in §2: **do you expect this case to score high, or do you expect it to score low and
fear that the instrument will score it high anyway?** Those are different tests. The first is
confirmation. The second is the one that retires the mirror prior. Write which it is in the lock note —
it changes how the result should be read, and a reader cannot infer it from the numbers.

---

## To lock

Fill in §1 and §2, add date and signature, and record the lock in `slate.json` under
`locked_predictions.T1-PUBHEALTH-INFO` with the text verbatim. Per §8 of `PRE-REGISTRATION.md`,
any later change is a dated amendment with a stated reason and a flag for whether it affects a
locked prediction.

**Amendment note, 2026-09-21:** this sheet changes the *format* required of the T1 prediction (a band
statement becomes a distribution plus per-dimension point estimates) and adds a blind-scoring condition.
It does not affect any locked prediction — T1's has never been locked, and T2's is closed. Reason: the
T2 validation pass found its locked prediction spanned 70% of the scale and its scorer was unblinded.
