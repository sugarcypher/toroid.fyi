# Deploy guide — toroid.fyi

Static site. GitHub → Cloudflare Pages → custom domain.
~25KB landing page + three self-contained instruments. No build step.

---

## 1 · Initialize the repo (one-time)

```bash
cd ~/Documents/toroid-fyi
git init -b main
git add -A
git status   # sanity-check the file list — originals are .gitignored
git commit -m "toroid.fyi v0.1 — first emanation"
```

The `.gitignore` excludes the large source folders (`Polymorphic Matrix/`,
`Strat-Dom-3d/`, `sabbotarchy/`, `opmanifold/`) — originals stay on disk
for reference, the deploy serves only the consolidated `poly/`, `sabbot/`,
`play/`, `papers/` copies plus `index.html`.

Expected first-commit footprint: ~1.5 MB.

---

## 2 · Push to GitHub

Create an empty repo at `github.com/<your-handle>/toroid-fyi` (private or
public, both work with Pages).

```bash
git remote add origin git@github.com:<your-handle>/toroid-fyi.git
git push -u origin main
```

---

## 3 · Cloudflare Pages

Cloudflare → Workers & Pages → **Create application** → **Pages** →
**Connect to Git** → select `toroid-fyi`.

Build settings:

| Field                       | Value      |
|-----------------------------|------------|
| Framework preset            | `None`     |
| Build command               | *(empty)*  |
| Build output directory      | `/`        |
| Root directory (advanced)   | `/`        |
| Environment variables       | *(none)*   |

Click **Save and deploy**. Build completes in ~10s — there is no build.
The first deploy URL is `https://toroid-fyi.pages.dev` (or similar).

Verify in the deploy preview:

- `/` → landing page renders, animated torus is visible
- `/poly/` → Polymorphic Catalysis Toroid loads
- `/sabbot/` → Deception Arcane loads
- `/play/` → Strata-Dom-3D launches
- `/papers/obfuscratic_sabbotarchy_methodology.md` → markdown served

---

## 4 · Attach toroid.fyi

In the Pages project: **Custom domains** → **Set up a custom domain**.

Add both:

- `toroid.fyi`           (apex)
- `www.toroid.fyi`       (canonical redirect target — your call which is canonical)

Cloudflare will auto-create the DNS records if the domain is on Cloudflare
nameservers. If `toroid.fyi` is registered elsewhere, point its nameservers
to Cloudflare first, or add the CNAME records Cloudflare displays.

SSL/TLS certificates are issued automatically.

---

## 5 · Optional — subdomains per instrument

If you want clean subdomain URLs like `poly.toroid.fyi`, `sabbot.toroid.fyi`,
`play.toroid.fyi`, do one of:

**(a) Subdomain → same Pages project, path-prefixed routes.**
Add `poly.toroid.fyi` as a custom domain on the same Pages project, then
in **Settings → Functions** add a `_redirects` file:

```
/  /poly/index.html  200
```

Repeat for each subdomain — each maps `/` on that hostname to the right
path inside the project.

**(b) Subdomain → separate Pages project.**
Create one project per instrument, point each subdomain at its own project.
Cleaner separation, but you maintain three deploys.

Recommendation: **path-based only for v0.1.** `toroid.fyi/poly/` is fine
and keeps everything in one project. Move to subdomains if/when each
instrument develops independent release cadence.

---

## 6 · Updates

```bash
# edit, then
git add -A
git commit -m "describe the change"
git push
```

Cloudflare auto-deploys on push. Each PR gets a preview URL.

---

## File-size budget

Cloudflare Pages limits:

- 25 MB per file
- 20,000 files per project
- 25 MB per asset upload

Current bundle: well under all three.

| Asset                              | Size      |
|------------------------------------|-----------|
| `index.html`                       | ~30 KB    |
| `poly/index.html`                  | ~419 KB   |
| `poly/` (3 papers + 2 PDFs)        | ~333 KB   |
| `sabbot/index.html`                | ~75 KB    |
| `sabbot/` (methodology + rubric)   | ~55 KB    |
| `play/index.html`                  | ~350 KB   |
| `matrix/index.html`                | ~35 KB    |
| `matrix/circulatory_pressure_*`    | ~712 KB   |
| `papers/` (4 markdown files)       | ~195 KB   |
| **Total deploy**                   | ~2.2 MB   |

---

## v0.2 — TODO before broader announcement

- favicon (toroidal glyph, both light + dark)
- OG/Twitter card image (1200×630, static toroid render)
- 404 page (`404.html`) styled to match landing
- `robots.txt` + `sitemap.xml`
- analytics (Cloudflare Web Analytics — zero-config, no cookies)
- `papers/` index page (lightweight markdown listing)

None of these are blocking the v0.1 launch.
