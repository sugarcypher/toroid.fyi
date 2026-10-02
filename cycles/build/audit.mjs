#!/usr/bin/env node
// toroid.fyi · cross-instrument audit
// Reads the data blocks straight out of the instrument pages and prints the counts the
// site's prose claims, so the prose can be checked against the data instead of memory.
//   node cycles/build/audit.mjs
// No dependencies. Does not modify anything.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const slice = (s, from, to) => { const a = s.indexOf(from); const b = s.indexOf(to, a); if (a < 0 || b < 0) throw new Error(`block not found: ${from} … ${to}`); return s.slice(a, b); };
const load = (code, names) => { const f = new Function(`${code}\nreturn {${names.join(',')}};`); return f(); };
const count = arr => arr.reduce((m, x) => (m[x] = (m[x] || 0) + 1, m), {});

// ---- Polymorphic Catalysis Toroid --------------------------------------------------------
const poly = read('poly/index.html');
const P = load(slice(poly, 'const actorClusters', 'const channelColors') + slice(poly, 'const vortexTypes = [', 'const vortexTypesEnabled'),
  ['actorClusters', 'actorFlow', 'targetFlow', 'targetGroups', 'cells', 'actorLinks', 'wormholes', 'polarities', 'vortexTypes']);
const actors = P.actorClusters.flatMap(c => c.actors.map(a => ({ ...a, cluster: c.name })));
const targets = P.targetGroups.flatMap(g => g.targets.map(t => ({ ...t, group: g.name })));
const aid = new Set(actors.map(a => a.id)), tid = new Set(targets.map(t => t.id));
const inCells = new Set(P.cells.map(c => c.actor));
const inEdges = new Set([...P.actorLinks, ...P.wormholes, ...P.polarities].flatMap(l => [l.a, l.b]));
const rendered = new Set([...inCells, ...inEdges]);   // the render rule since 2026-10-02: any edge of any layer
const dropped = arr => arr.filter(l => !rendered.has(l.a) || !rendered.has(l.b));
const droppedOld = arr => arr.filter(l => !inCells.has(l.a) || !inCells.has(l.b));

console.log('== Catalysis Toroid (poly/index.html)');
console.log(`actors ${actors.length} · targets ${targets.length} · 7.x cells ${P.cells.length} · R ${P.actorLinks.length} · B ${P.wormholes.length} · P ${P.polarities.length} · vortices ${P.vortexTypes.length}`);
console.log('channels', count(P.cells.map(c => c.channel)), 'tiers', count(P.cells.map(c => c.tier)));
console.log('complexes', count(P.cells.flatMap(c => c.complexes || [])));
const modes = count(P.cells.flatMap(c => c.modes || []));
console.log(`modes in use ${Object.keys(modes).length}:`, Object.entries(modes).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(', '));
console.log('actors with no 7.x cell (rendered only because they carry R/B/P edges):', actors.filter(a => !inCells.has(a.id)).map(a => a.id).join(', '));
console.log(`actors rendered ${actors.filter(a => rendered.has(a.id)).length}/${actors.length} · edges with an unrendered endpoint: R ${dropped(P.actorLinks).length}/${P.actorLinks.length} · B ${dropped(P.wormholes).length}/${P.wormholes.length} · P ${dropped(P.polarities).length}/${P.polarities.length}`);
console.log(`(under the pre-2026-10-02 rule, cells only: R ${droppedOld(P.actorLinks).length} · B ${droppedOld(P.wormholes).length} · P ${droppedOld(P.polarities).length} were silently dropped)`);
console.log('ids used as both actor and target:', actors.map(a => a.id).filter(x => tid.has(x)).join(', '));
console.log('actors missing from actorFlow:', actors.filter(a => !P.actorFlow[a.id]).map(a => a.id).join(', ') || 'none');
const dangling = [];
P.cells.forEach(c => { if (!aid.has(c.actor)) dangling.push(`${c.id} actor ${c.actor}`); if (!tid.has(c.target)) dangling.push(`${c.id} target ${c.target}`); });
[...P.actorLinks, ...P.wormholes, ...P.polarities].forEach(l => { [l.a, l.b].forEach(x => { if (!aid.has(x)) dangling.push(`${l.id} ${x}`); }); });
P.vortexTypes.forEach(v => { [v.centerActor, ...v.sources].forEach(x => { if (!aid.has(x)) dangling.push(`vortex ${v.id} ${x}`); }); });
console.log('dangling references:', dangling.length ? dangling.join('; ') : 'none');

// ---- Multimalocracy page vs modes in use --------------------------------------------------
const multi = read('predicates/multimalocracy/index.html');
const listed = new Set([...multi.matchAll(/<div class="name">([^<]+)<\/div>/g)].map(m => m[1].trim()));
console.log('== Multimalocracy (predicates/multimalocracy)');
console.log(`listed on the 42-slot page: ${listed.size} distinct`);
console.log('used by cells but not listed:', Object.keys(modes).filter(m => !listed.has(m)).map(m => `${m} (${modes[m]})`).join(', ') || 'none');
console.log('listed but used by no cell:', [...listed].filter(m => !modes[m]).join(', ') || 'none');

// ---- Polymorphic Matrix --------------------------------------------------------------------
const matrix = read('matrix/index.html');
const M = load(slice(matrix, 'const VECTORS', '// ============ SCENE'), ['nodes', 'edges']);
console.log('== Polymorphic Matrix (matrix/index.html)');
console.log(`nodes ${Object.keys(M.nodes).length} · edges ${M.edges.length} ·`, count(M.edges.map(e => e.type)));

// ---- Deception Arcane --------------------------------------------------------------------
const S = JSON.parse(read('sabbot/data/sabbotarchy.json'));
const W = { s1_outcome: .25, s2_domain: .20, s3_remediation: .15, s4_recruitment: .10, s5_information: .30 };
const comp = s => Object.keys(W).reduce((t, k) => t + W[k] * s[k], 0);
console.log('== Deception Arcane (sabbot/data/sabbotarchy.json)', S.version);
for (const [k, eps] of Object.entries(S.epochs)) { const c = eps.map(e => comp(e.s)); console.log(`${k.padEnd(9)} composites ${c.map(x => x.toFixed(1)).join(' → ')} · velocity ${(c.at(-1) - c.at(-2)).toFixed(1)}`); }
S.adversarial?.forEach(a => console.log(`${a.id} composite from dims ${comp(a.s).toFixed(1)} · stated ${a.composite} ${a.band}`));

// ---- Cross-references into the toroid ------------------------------------------------------
const allIds = new Set([...P.cells, ...P.actorLinks, ...P.wormholes, ...P.polarities].map(x => x.id));
const refs = new Set();
for (const dir of ['sabbot', 'removal', 'substrate-attack', 'book', 'tour', 'research', 'predicates', 'papers', 'cycles']) {
  const walk = d => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (/\.(html|md|json)$/.test(f.name)) for (const m of fs.readFileSync(p, 'utf8').matchAll(/\b(7\.\d{3}|[BRP]0\d{2}|R1[0-3]\d)\b/g)) refs.add(m[1]); } };
  if (fs.existsSync(path.join(ROOT, dir))) walk(path.join(ROOT, dir));
}
const missing = [...refs].filter(r => !allIds.has(r));
console.log('== Cell ids cited elsewhere on the site:', refs.size, '· not found in the toroid data:', missing.length ? missing.join(', ') : 'none');

// ---- Prose counts --------------------------------------------------------------------------
console.log('== Prose that states counts (check against the numbers above)');
for (const f of ['README.md', 'about/index.html', 'tour/index.html', 'poly/index.html', 'index.html']) {
  const s = read(f); const hits = [...s.matchAll(/\b(1[0-9]{2}|[2-9][0-9]) (actors|targets|operational cells|R-cells|actor-actor|wormhole|B-wormholes|P-cells|nodes|edges|feedback loops|instruments)\b/g)].map(m => m[0]);
  if (hits.length) console.log(`${f}: ${[...new Set(hits)].join(' · ')}`);
}
