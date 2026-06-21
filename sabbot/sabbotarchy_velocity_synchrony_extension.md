# The Velocity & Synchrony Extension

**A temporal-dynamics layer for the Obfuscratic Sabbotarchy signature framework**

*B. Greenway · ThinkWell Labs Metrology · methodology increment v0.2 · June 2026*

*Extends the Obfuscratic Sabbotarchy — Deception Arcane signature instrument (v0.1) and the methodology paper (v1.1) with a temporal-dynamics construct: per-dimension velocity, system-level breadth-velocity, and an onset-synchrony coordination index.*

---

## 11. Why the static instrument is incomplete

The v0.1 instrument scores each architecture synchronically — a single composite index at a single observation point. The methodology paper's Limitation #4 concedes this directly: "engineered incompetence is typically a developmental phenomenon — architectures move toward or away from engineered states over time." The five signature dimensions measure regime *state*; they do not measure regime *rate*. They compute a position, not a derivative.

This is not a cosmetic gap. Two architectures with identical static composites are not analytically equivalent if one reached that composite across fifteen years (an entrenched, slow equilibrium) and the other across fifteen months (an active capture in progress). The static index cannot distinguish them. Yet the distinction is the entire content of the claim that something is *being destroyed* — destruction is a rate, not a state. An instrument that cannot represent rate cannot represent the phenomenon its users are most often pointing at.

The velocity extension computes the missing derivatives. It introduces three constructs, ordered from local to global: signature velocity (per-dimension, per-architecture rate of change), breadth-velocity (system-level rate at which architectures cross into the engineered band), and the synchrony index (the temporal concentration of those crossings, which is the falsifiable form of the coordination claim the static instrument could only assert).

A design commitment governs the whole extension: velocity is treated as a *distinct object* from the static signature, not as a sixth peer-weighted dimension folded into the composite. The composite index answers "is this engineered?" The velocity layer answers "how fast, accelerating or decelerating, and in concert with what else?" Collapsing the two would destroy information; the framework keeps them orthogonal and reports them as a pair.

## 11.1 Signature velocity (per-dimension, per-architecture)

For architecture *A* and signature dimension *i* ∈ {S1…S5}, scored at observation times *t₀, t₁, … tₙ*, the first-order signature velocity over an interval is the discrete time-derivative of the dimension score:

> **Vᵢ(A) = ΔSᵢ / Δt**, expressed in signature-points per quarter (the recommended epoch unit).

The composite velocity uses the same weights *wᵢ* as the static index, so it is dimensionally commensurate with the composite (index-points per quarter):

> **V(A) = Σ wᵢ · (dSᵢ/dt) = 0.25·V₁ + 0.20·V₂ + 0.15·V₃ + 0.10·V₄ + 0.30·V₅**

Sign carries meaning. Positive V indicates an intensifying engineered signature; negative V indicates remediation or reversion toward the genuine band. A near-zero V on a high static composite is the signature of an *entrenched* engineered equilibrium; a large positive V on a still-moderate composite is the signature of an *active, accelerating* capture — operationally the more urgent object, and the one the static instrument systematically under-weights.

### 11.1.1 Acceleration (second order)

The phenomenology the framework's users most often report — "the *speed* at which power is being destroyed" — is frequently a second-order claim: not merely that the signature is rising, but that the rate of rise is itself increasing. The second-order construct captures it:

> **Aᵢ(A) = d²Sᵢ/dt²**, requiring ≥3 observation epochs.

Acceleration is the most literal operationalization of the "destruction is speeding up" intuition. It is also the noisiest construct in the extension and must be reported with the widest confidence band (see 11.4).

## 11.2 Breadth-velocity (system-level)

Signature velocity is per-architecture. The user-reported phenomenon of breadth — "power, of all kinds, on all levels, being destroyed" — is a *system-level* rate that no per-architecture metric captures. Breadth-velocity measures how fast the *population* of engineered architectures is growing.

Over a pre-defined population of candidate architectures (the fixed frame — see the non-negotiable denominator condition below), let:

- **N₇₀(t)** = count of architectures with composite ≥ 70 (engineered threshold) at epoch *t*
- **N₈₅(t)** = count with composite ≥ 85 (extreme threshold) at epoch *t*

Then breadth-velocity is the discrete derivative of the engineered count:

> **B(t) = ΔN₇₀ / Δt**, in architectures-per-quarter.

B(t) is the formal version of "all levels at once." A high B(t) means new architectures are crossing into the engineered band in rapid succession — the legible signature of a coordinated, broad-front program rather than isolated agency drift.

### 11.2.1 The non-negotiable denominator condition

Breadth-velocity is **only valid against a fixed, pre-defined denominator** — the full population of candidate architectures, scored over time, including the architectures that *stay low*. If the frame is allowed to grow by adding architectures selected because they already score high, N₇₀(t) rises as a pure artifact of sampling, and B(t) measures the analyst's attention, not the world. This is the same selection-on-the-dependent-variable failure the negative-control set exists to prevent, now in temporal form. The two extensions are therefore coupled: **breadth-velocity cannot be computed honestly without the negative-control architectures in the denominator.** The controls are not an optional robustness check; they are a precondition for the breadth metric to mean anything.

## 11.3 The synchrony / coordination index

This is the analytically load-bearing construct of the extension. The static instrument's coordination claim rests on *spatial* clustering — many architectures scoring high simultaneously. But spatial clustering is weakly diagnostic: a single common cause (one administration with one ideological program) produces it without requiring "coordination" in any stronger sense. The static clustering argument cannot distinguish coordinated engineering from ordinary common-cause policy alignment, and it cannot fail — which is precisely why it is epistemically weak.

*Temporal* clustering is stronger. If multiple, structurally independent architectures cross the engineered threshold within a tight time-window, coincidence becomes a poorer explanation as the window narrows. Define, for each architecture *A*, its **onset time τ_A** = the first epoch at which its composite reaches ≥ 70. The set {τ_A} across all architectures in the frame has a dispersion σ_τ (standard deviation of onset times).

> **Synchrony Index Σ = 1 − (σ_τ / σ_null)**

where σ_null is the onset dispersion expected under an explicit **independent-onset null model** — architectures crossing threshold at random times, uniformly distributed across the observation window. Σ → 1 means onsets are far more bunched than chance allows; Σ → 0 means onset timing is indistinguishable from independent drift.

The decisive property: **Σ is falsifiable.** Under the null hypothesis of uncoordinated, independently-evolving agencies, onsets spread out and Σ approaches 0. A high Σ is the rigorous form of the coordination claim the static instrument could only assert. And — unlike the static clustering argument — it *can come out the other way*: if the onset data are temporally dispersed, the coordination claim is disconfirmed by the framework's own instrument. This is the single most important upgrade the extension provides: it converts an unfalsifiable assertion into a measurable, defeasible quantity.

### 11.3.1 The common-cause confound and the transition baseline

Synchrony is necessary but not sufficient for the strong coordination claim, and the framework must say so plainly. A single common driver — an administration taking office on a fixed date and changing many policies at once — produces high Σ *without* requiring covert coordination. High Σ concentrated exactly at an administration transition is therefore *expected even under the null-adjacent "ordinary fast regime change" hypothesis*, and cannot by itself carry the engineered-coordination diagnosis.

Two discriminators separate sustained engineering from ordinary transition:

1. **Post-transition persistence.** Do onsets cluster only at the transition (consistent with ordinary regime change), or do they continue rolling at an elevated rate well after, in a sequenced pattern (more consistent with a sustained program executed in stages)? A rolling, sequenced onset distribution is the harder pattern to explain by transition alone.
2. **Transition-baseline benchmarking.** Did *prior* administration transitions of comparable ideological scope produce similar Σ? This requires scoring prior-administration architectures — which is exactly what negative-control C2 supplies. If prior transitions produced equally high Σ, then high Σ is the baseline rate of regime change and is not diagnostic of engineering; if the current Σ markedly exceeds the historical transition baseline, the excess is the diagnostic quantity.

The synchrony index, in other words, is only interpretable *differentially* — against a historical baseline the negative-control set is built to provide. Reported as a raw number it overclaims; reported as an excess over transition-baseline it is defensible.

## 11.4 Measurement-noise discipline

Velocity inherits and compounds the static instrument's interpretive uncertainty. The methodology paper acknowledges that static scores are interpretive and may vary across analysts; call the cross-analyst noise band on a single score ±ε (provisionally ε ≈ 5–10 points until a formal replication study fixes it). A velocity computed from two such scores has an error term of roughly √2·ε / Δt — the differencing of two noisy quantities amplifies noise. Three consequences are binding:

1. **A velocity is only meaningful when |ΔS| exceeds the noise band.** If a dimension moves 4 points between epochs and ε ≈ 7, the reported velocity is noise. Either widen Δt until signal exceeds noise, or suppress the velocity as not-yet-resolvable.
2. **Acceleration requires the widest band and the most epochs.** Second-order quantities should not be reported at all until at least three well-separated epochs with multi-analyst scoring exist.
3. **Multi-analyst scoring per epoch is the principal noise-reduction lever.** Averaging *k* independent analysts per epoch reduces the per-score band by ~√k and is the cheapest route to resolvable velocities. This makes the open cross-analyst replication program (paper §9, fifth extension) a prerequisite for the velocity layer, not a parallel nicety.

The discipline is deliberately conservative: the extension would rather report "not yet resolvable" than manufacture a precise-looking rate from noise. A fortress does not mistake a flapping banner for a breach.

## 11.5 Longitudinal scoring protocol

The velocity layer requires the static instrument to be run as a time series. Three protocol requirements follow:

1. **Defined epochs.** Score the full architecture frame at fixed intervals (recommended: quarterly). For retrospective construction, the seed architectures should be back-scored at a minimum of three epochs — e.g., 2025-Q1 (administration onset), 2025-Q3, 2026-Q1 — to establish initial velocity and onset-time estimates.
2. **Dated evidence anchors.** Every evidence anchor must carry a date, so that any architecture's score can be reconstructed *as of* any past epoch using only evidence available at that time. This is also required by the evidence-anchor audit for an independent reason (preventing projection-as-realized contamination), so the two extensions reinforce a single discipline: **every anchor gets a date and a status tag.**
3. **As-of-epoch blinding.** When back-scoring epoch *t*, the analyst must score using only evidence dated ≤ *t*, not with hindsight knowledge of later outcomes. Hindsight inflates early-epoch scores and artificially flattens velocity.

## 11.6 Reporting objects

The extension outputs three reporting objects layered on the static instrument:

- **Per-architecture velocity vector** — {V₁…V₅, composite V, and where resolvable, composite A}, each with its confidence band, alongside the static composite.
- **System breadth curve** — N₇₀(t) and N₈₅(t) plotted over epochs, with B(t) as the slope.
- **Onset-synchrony report** — Σ with its null model stated, reported as excess over the historical transition baseline, never as a raw bare number.

## 11.7 What this extension does and does not establish

It does not strengthen any individual architecture's static diagnosis; a velocity says nothing about whether a score of 86 is correct. It adds three things the static instrument structurally could not provide: a rate (is the signature intensifying, and how fast), a system-level breadth rate (how quickly the engineered population is growing against a fixed frame), and a *falsifiable* coordination quantity (onset synchrony benchmarked against historical transition baselines). The third is the most important, because it replaces the static instrument's one genuinely unfalsifiable move — reading spatial clustering as proof of coordination — with a quantity that can, and on honest data sometimes will, disconfirm the coordination claim. That replacement is what lets the framework keep calling itself a measurement instrument rather than an accusation with mathematics attached.

---

*Increment v0.2 · June 2026 · couples to the negative-control set (shared denominator and transition-baseline requirements) and to the evidence-anchor audit (shared anchor-dating discipline).*
