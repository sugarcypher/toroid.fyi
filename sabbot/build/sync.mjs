#!/usr/bin/env node
// Single-source-of-truth build for the Obfuscratic Sabbotarchy instrument.
//
//   Edit  data/sabbotarchy.json   →   run  `node build/sync.mjs`   →
//   it regenerates the data block + version strings in index.html and
//   writes data/RESOURCE_OPS.generated.md. No hand-syncing.
//
// Wire it to deploy automatically by setting the Cloudflare Pages build
// command to `node build/sync.mjs` (it is idempotent and safe to re-run).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dataPath = join(root, 'data', 'sabbotarchy.json');
const htmlPath = join(root, 'index.html');
const genMdPath = join(root, 'data', 'RESOURCE_OPS.generated.md');

const d = JSON.parse(readFileSync(dataPath, 'utf8'));

// ---- 1. generated JS data block (between sentinels) ----
const START = '/* SSOT-GEN:START (generated from data/sabbotarchy.json by build/sync.mjs — do not hand-edit) */';
const END = '/* SSOT-GEN:END */';
const block = [
  START,
  `const SAB_VERSION = ${JSON.stringify(d.version)};`,
  `const RESOURCE_OPS = ${JSON.stringify({ dims: d.dims, anchors: d.anchors, controls: d.controls })};`,
  `const RO_CHAINS = ${JSON.stringify(d.chains)};`,
  `const DIM_META = ${JSON.stringify(d.dimMeta)};`,
  `const S6 = ${JSON.stringify(d.s6)};`,
  `const SEED_EPOCHS = ${JSON.stringify(d.epochs || {})};`,
  `const EPOCH_LABELS = ${JSON.stringify(d.epochLabels || [])};`,
  `const BASELINES = ${JSON.stringify(d.baselines || [])};`,
  END
].join('\n');

let html = readFileSync(htmlPath, 'utf8');
const blockRe = /\/\* SSOT-GEN:START[\s\S]*?SSOT-GEN:END \*\//;
if (!blockRe.test(html)) {
  console.error('ERROR: SSOT-GEN markers not found in index.html. Aborting.');
  process.exit(1);
}
html = html.replace(blockRe, block);

// ---- 2. version strings ----
const v = d.version;
html = html.replace(/(<title>Obfuscratic Sabbotarchy — The Deception Arcane )v[\d.]+(<\/title>)/, `$1${v}$2`);
html = html.replace(/(<span class="version">)v[\d.]+(<\/span>)/, `$1${v}$2`);
html = html.replace(/(THE DECEPTION ARCANE — )v[\d.]+/, `$1${v}`);

writeFileSync(htmlPath, html);

// ---- 3. generated data doc (single-sourced reference for the markdown side) ----
const esc = s => String(s).replace(/\|/g, '\\|');
let md = `# Resource-Operations Data (generated)\n\n`;
md += `> Auto-generated from \`data/sabbotarchy.json\` by \`build/sync.mjs\`. Do not hand-edit. Instrument version: **${d.version}**.\n\n`;
md += `## Dimensions\n\n| Dim | Operation | Status | Mechanism | Moves | Payoff | Anchor |\n|--|--|--|--|--|--|--|\n`;
for (const x of d.dims) md += `| ${x.map(esc).join(' | ')} |\n`;
md += `\n## Worked anchors\n\n| Case | Dimension | Tags | Finding |\n|--|--|--|--|\n`;
for (const a of d.anchors) md += `| ${esc(a[0])} | ${esc(a[1])} | ${a[2].map(esc).join('; ')} | ${esc(a[3])} |\n`;
md += `\n## Negative controls (all returned LOW)\n\n| Dim | Instance | Why LOW |\n|--|--|--|\n`;
for (const c of d.controls) md += `| ${esc(c[0])} | ${esc(c[1])} | ${esc(c[2])} |\n`;
md += `\n## S6 selective-allocation computation\n\n`;
md += `- Spearman ρ = **${d.s6.rho}** (n = ${d.s6.n}); first pass (judgment-coded, n=6) was ${d.s6.rhoFirst}.\n`;
md += `- Need order (high→low): ${d.s6.needOrder.join(' · ')}\n`;
md += `- Funding order (most→least): ${d.s6.allocOrder.join(' · ')}\n`;
writeFileSync(genMdPath, md);

console.log(`sync ok — version ${d.version}; ${d.dims.length} dims, ${d.anchors.length} anchors, ${d.controls.length} controls; wrote index.html + data/RESOURCE_OPS.generated.md`);
