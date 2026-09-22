#!/usr/bin/env python3
"""Rebuild the Obfuscratic Instance Register download bundle.

    cd sabbot/register && python3 build/bundle.py

The bundle is the zip offered at /sabbot/register/. Before this script existed it
was assembled by hand, and it drifted: v1.4 shipped the withdrawn "twelve-point
cross-analyst range" text for eight days after the page had retracted it.

This derives the new bundle FROM the previous one rather than from the repo tree,
because five bundle members have no source in the repo and exist only inside the
zip — oir/pipeline/*.py, oir/README.md, oir/register/instances.jsonl,
oir/render/payload.json, oir/render/nullcheck.json. A from-scratch rebuild would
silently drop them. Every entry is carried over verbatim except those with a live
repo source, which are refreshed from it. What was refreshed is printed, so a
member that quietly stopped tracking its source is visible rather than assumed.

Set PREV and VERSION together; VERSION must match the version printed in index.html.
"""

import re
import sys
import zipfile
from pathlib import Path

PREV = "v1.5"
VERSION = "v1.6"

here = Path(__file__).resolve().parent
root = here.parent                      # sabbot/register
data = root / "data"
page = root / "index.html"
prev = root / f"obfuscratic-instance-register-{PREV}.zip"
out = root / f"obfuscratic-instance-register-{VERSION}.zip"

# bundle path -> live source in the repo. Anything not listed is carried over
# from the previous bundle unchanged.
SOURCES = {
    "oir/PRE-REGISTRATION.md": data / "PRE-REGISTRATION.md",
    "oir/PROVENANCE.md": data / "PROVENANCE.md",
    "oir/schema/codebook.md": data / "codebook.md",
    "oir/schema/frame.schema.json": data / "frame.schema.json",
    "oir/schema/instance.schema.json": data / "instance.schema.json",
    "oir/schema/architecture.schema.json": data / "architecture.schema.json",
    "oir/register/architectures.json": data / "architectures.json",
    "oir/register/slate.json": data / "slate.json",
    "oir/register/onsets.json": data / "onsets.json",
    "oir/annex/evidence-annex.json": data / "evidence-annex.json",
    "oir/adversarial/T1-convict-a-friend.md": data / "adversarial/T1-convict-a-friend.md",
    "oir/adversarial/T2-acquit-an-enemy.md": data / "adversarial/T2-acquit-an-enemy.md",
    "oir/adversarial/T1-prediction-elicitation.md":
        data / "adversarial/T1-prediction-elicitation.md",
    "oir/adversarial/T2-scoring-worksheet-2026-09-13.md":
        data / "adversarial/T2-scoring-worksheet-2026-09-13.md",
    "oir/adversarial/scoring-worksheet.template.md":
        data / "adversarial/scoring-worksheet.template.md",
    "oir/render/index.html": page,
}
for f in sorted(data.glob("frames/FRM-*.json")):
    SOURCES[f"oir/frames/{f.name}"] = f


def main() -> int:
    if not prev.exists():
        print(f"ERROR: previous bundle {prev.name} not found", file=sys.stderr)
        return 1

    html = page.read_text(encoding="utf8")
    declared = re.search(r'<span class="version">(v[\d.]+)</span>', html)
    if not declared:
        print("ERROR: no version span found in index.html", file=sys.stderr)
        return 1
    if declared.group(1) != VERSION:
        print(f"ERROR: page declares {declared.group(1)}, bundle.py is {VERSION}. "
              f"Bump both together.", file=sys.stderr)
        return 1

    missing = [b for b, p in SOURCES.items() if not p.exists()]
    if missing:
        print("ERROR: mapped sources do not exist:", file=sys.stderr)
        for m in missing:
            print(f"  {m} -> {SOURCES[m]}", file=sys.stderr)
        return 1

    refreshed, carried = [], []
    with zipfile.ZipFile(prev) as zin, \
         zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zout:
        names = [n for n in zin.namelist() if not n.endswith("/")]
        for name in names:
            if name in SOURCES:
                zout.write(SOURCES[name], name)
                refreshed.append(name)
            else:
                zout.writestr(name, zin.read(name))
                carried.append(name)

        unmapped = [b for b in SOURCES if b not in names]
        for name in unmapped:
            zout.write(SOURCES[name], name)
            refreshed.append(name)

    # guard: nothing in the bundle may reassert the withdrawn inter-rater figure
    stale = []
    with zipfile.ZipFile(out) as z:
        for name in z.namelist():
            if not name.endswith((".md", ".html", ".json")):
                continue
            body = z.read(name).decode("utf8", "replace")
            for phrase in ("twelve-point", "observed cross-analyst range",
                           "twelve points on the hundred-point scale"):
                if phrase in body and "withdrawn" not in body:
                    stale.append(f"{name}: {phrase!r}")
    if stale:
        out.unlink()
        print("ERROR: bundle reasserts the withdrawn inter-rater claim:", file=sys.stderr)
        for s in stale:
            print(f"  {s}", file=sys.stderr)
        return 1

    print(f"bundle ok — {out.name}, {len(refreshed) + len(carried)} files, "
          f"{out.stat().st_size:,} bytes")
    print(f"  refreshed from repo ({len(refreshed)}):")
    for n in sorted(refreshed):
        print(f"    {n}")
    print(f"  carried from {PREV}, no repo source ({len(carried)}):")
    for n in sorted(carried):
        print(f"    {n}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
