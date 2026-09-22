#!/usr/bin/env node
// Reproduces the arithmetic published in data/SYMMETRY-TEST-2026-09-21-faction-rule.md.
//
//     cd sabbot/register && node build/verify-symmetry.mjs
//
// The symmetry test's whole claim is arithmetic — that adopting the faction rule
// (AMENDMENT-2026-09-21-locus-and-s5.md §3) cannot inflate the seed distribution
// past +2 composite points or change any seed's band. A claim like that should be
// re-runnable rather than trusted, so this script recomputes it from the live
// ARCHITECTURES data and fails loudly if anything has drifted.
//
// It verifies two things before reporting anything:
//   1. every seed composite recomputes to its canonical published value;
//   2. the maximum-inflation counterfactual moves no seed across a band line.
// Either failing is a non-zero exit, because the published table would then be wrong.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(here, '..', '..', 'index.html');   // sabbot/index.html
const html = readFileSync(htmlPath, 'utf8');

const wm = html.match(/const WEIGHTS = \{([\s\S]*?)\};/);
if (!wm) { console.error('ERROR: WEIGHTS not found in sabbot/index.html'); process.exit(1); }
const W = Object.fromEntries([...wm[1].matchAll(/(\w+)\s*:\s*([\d.]+)/g)].map(([, k, v]) => [k, +v]));

const DIMS = ['s1_outcome', 's2_domain', 's3_remediation', 's4_recruitment', 's5_information'];
const block = html.slice(html.indexOf('const ARCHITECTURES = {'));
const seeds = {};
for (const m of block.matchAll(/^  (\w+): \{\n\s*name:/gm)) {
  const start = m.index;
  const rest = block.slice(start + 1).search(/^  \w+: \{\n\s*name:/m);
  const body = rest === -1 ? block.slice(start) : block.slice(start, start + 1 + rest);
  const dims = {};
  for (const d of DIMS) {
    const dm = body.match(new RegExp(d + ':\\s*\\{[\\s\\S]*?score:\\s*(\\d+)'));
    if (dm) dims[d] = +dm[1];
  }
  if (Object.keys(dims).length === DIMS.length) seeds[m[1]] = dims;
}

// Canonical published composites (site-audit convention; /sabbot/ footer states these).
const CANONICAL = { irs: 91, doge: 89, rollback: 88, ice: 85, obbba: 85, nih: 80, va: 76 };
// Highest S4 anywhere in the register — the ceiling the counterfactual raises every seed to.
const MAX_S4 = Math.max(...Object.values(seeds).map(d => d.s4_recruitment));

const band = x => x >= 85 ? 'Extreme' : x >= 70 ? 'High' : x >= 30 ? 'Mixed' : 'Genuine';
const composite = d => Object.entries(W).reduce((t, [k, w]) => t + w * d[k], 0);

let failed = false, maxInflation = 0;
console.log(`weights: ${JSON.stringify(W)}  ·  S4 ceiling used: ${MAX_S4}\n`);
console.log('seed       raw     now  canon      inflated  delta  band');
for (const [k, d] of Object.entries(seeds)) {
  const raw = composite(d), now = Math.round(raw);
  if (CANONICAL[k] === undefined) { console.error(`  unknown seed "${k}"`); failed = true; continue; }
  if (now !== CANONICAL[k]) {
    console.error(`  ${k}: recomputes to ${now}, canonical says ${CANONICAL[k]}`);
    failed = true;
  }
  const inflRaw = raw + W.s4_recruitment * (Math.max(d.s4_recruitment, MAX_S4) - d.s4_recruitment);
  const infl = Math.round(inflRaw);
  maxInflation = Math.max(maxInflation, infl - now);
  const crossed = band(raw) !== band(inflRaw);
  if (crossed) { console.error(`  ${k}: band changes ${band(raw)} -> ${band(inflRaw)}`); failed = true; }
  console.log(
    `${k.padEnd(10)} ${raw.toFixed(2).padStart(6)}  ${String(now).padStart(3)}  ${String(CANONICAL[k]).padStart(5)}` +
    `      ${inflRaw.toFixed(2).padStart(6)}->${String(infl).padStart(3)}  +${infl - now}     ${band(raw)}${crossed ? ' -> ' + band(inflRaw) : ''}`
  );
}

console.log(`\nmaximum inflation across all seeds: +${maxInflation} composite points`);
if (failed) {
  console.error('FAILED — the published symmetry test no longer matches the data. Do not cite it.');
  process.exit(1);
}
console.log('OK — all composites match canonical; no band changes under maximum inflation.');
