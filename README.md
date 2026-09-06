# toroid.fyi

**The first emanation of ThinkWell Labs Metrology.**
B. Greenway · v0.1 · May 2026

This repository hosts three toroidal instruments, each treating the torus as
a research substrate rather than a decoration. Bounded, edgeless, doubly
periodic — the simplest surface that captures the structural reality of
upstream systems where pressure loops back, flanking is constant, and feedback
re-enters its own origin.

```
toroid-fyi/
├── index.html    ← public root landing (mirrored in landing/index.html)
├── poly/         ← Polymorphic Catalysis Toroid v0.33 (relational instrument)
├── sabbot/       ← Obfuscratic Sabbotarchy — Deception Arcane v0.1 (signature instrument)
├── play/         ← Strata-Dom-3D research game (ludic substrate)
├── matrix/       ← Polymorphic Matrix v1 (precursor, March 2026)
│                  └ + circulatory_pressure_architectures.{docx,summary.pdf}
├── huemain/      ← HueMain (hue-relation discrimination task)
├── papers/       ← consolidated methodology documents
└── (originals)   ← original source folders preserved unchanged:
                    Strat-Dom-3d/, Polymorphic Matrix/, sabbotarchy/,
                    opmanifold/, etc.
```

## The two-instrument stack

The Catalysis Toroid and the Deception Arcane are companion instruments.

- **Layer 1 — Evidence.** `poly/` documents operating-coalition architecture:
  136 actors, 118 targets, 349 operational cells, 130 actor-actor relationship
  cells, 50 wormhole backchannels, 17 polarity-tension cells, six consolidation
  vortices. Nested tire-and-inner-tube geometry, four parallel edge layers, six
  intent channels (STRUCT / CONV / COORD / OPP / INACT / UNK), 42-mode
  Multimalocracy taxonomy.

- **Layer 2 — Measurement.** `sabbot/` scores government-services-redirection
  architectures on the five-dimensional signature: S1 outcome-distribution
  asymmetry, S2 domain-selective competence, S3 anti-remediation response,
  S4 recruitment selection, S5 information-architecture asymmetry. Composite
  Obfuscratic Sabbotarchy Index distinguishes engineered incompetence from
  genuine incompetence by signature, not by claim.

- **Layer 3 — Substrate.** `play/` is Strata-Dom-3D, a research game that
  exercises the TWL upstream-commitment pattern as gameplay: actors commit
  irrevocable plans in parallel; the world is the resolved superposition.

Cell references in the toroid (e.g. `7.297`, `R040`, `B042`) anchor measurement
rows in the Deception Arcane. The toroid is the evidence layer; the
Deception Arcane is the measurement layer.

## Coined predicates

The framework's analytical predicates are neologisms coined by B. Greenway —
each names a distinction the standard governance vocabulary collapses:

- **Sabbotarchy** (sabotage + -archy) — the regime form: rule by sabotage.
- **Obfuscratic** (obfuscation + -cratic) — the operational signature:
  deliberate production of confusion and manufactured incoherence.
- **Multimalocracy** — the 42-mode discriminative-vocabulary taxonomy within
  which Sabbotarchy operates.

The bipartite **Obfuscratic Sabbotarchy** names rule-by-sabotage operating
through deliberate obfuscation that frames the sabotage as incompetence —
neither half is sufficient. A Sabbotarchy operating transparently would be
recognized and resisted; an Obfuscratic regime without sabotage would have
nothing to obfuscate.

## Deployment

This is a static site. The `landing/` directory is the public root;
all artifact subdirectories are self-contained HTML.

**Cloudflare Pages + GitHub.**

```bash
# from this directory
git init
git add -A
git commit -m "toroid.fyi v0.1 — first emanation"
git remote add origin git@github.com:<your-handle>/toroid-fyi.git
git push -u origin main
```

In Cloudflare Pages, connect the GitHub repo. Build settings:

- **Build command:** (none)
- **Build output directory:** `landing`

Then in Cloudflare DNS, attach `toroid.fyi` (apex) and `www.toroid.fyi` to
the Pages project. The artifact subdirectories (`poly/`, `sabbot/`, `play/`,
`papers/`) need to be **copied into `landing/` at build time** or referenced
via Pages' `_routes.json` — see the build note below.

### Build note — sibling-folder access

Because `landing/index.html` references `./poly/`, `./sabbot/`, `./play/`, and
`./papers/`, those sibling directories must end up *inside* the Pages output
directory at deploy time. Two options:

1. **Output the repo root** — change Pages' output directory to `.` and move
   `landing/index.html` to the repo root. Simplest. (Recommended.)
2. **Copy via a build step** — add a `_build.sh` that copies `poly/`,
   `sabbot/`, `play/`, `papers/` into `landing/` before deploy.

If choosing (1), the final tree is:

```
toroid-fyi/
├── index.html        ← moved from landing/
├── poly/             ← unchanged
├── sabbot/
├── play/
├── papers/
└── (originals)
```

## Status

- `poly/` — **live**, v0.33, instrument complete, methodology shipped.
- `sabbot/` — **live**, v0.1, instrument + methodology + scoring rubric shipped.
- `play/` — **live research preview**, single-file prototype, play tokens only.
- `huemain/` — **live**, v1.0, single file, zero external requests; a timed
  hue-relation discrimination task (SAME / ANALOGOUS / TRIADIC / OPPOSITE)
  that reports per-relation median latency at the end of each run.
- `matrix/` — **archive**, v1 (March 2026), precursor to the Catalysis Toroid;
  Circulatory Pressure Architectures paper (docx + summary PDF) lives here.
- `index.html` / `landing/` — v0.1, awaiting Cloudflare deploy.

## Citation

> Greenway, B. (2026). *Toroidal Instruments for ThinkWell Labs Metrology.*
> toroid.fyi v0.1 — Polymorphic Catalysis Toroid v0.33; Obfuscratic Sabbotarchy
> — Deception Arcane v0.1; Strata-Dom-3D research preview.

---

*This package was prepared May 22, 2026 on the consolidated `~/Documents/toroid-fyi/`
working folder. Originals preserved unchanged in `Strat-Dom-3d/`,
`Polymorphic Matrix/`, `sabbotarchy/`, and `opmanifold/`.*
