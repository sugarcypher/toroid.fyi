#!/usr/bin/env node
// toroid.fyi · render every Markdown document to a sibling .html reader page
//
//   node tools/render-md.mjs            # render all *.md (outside .git / node_modules / vendor)
//   node tools/render-md.mjs --check    # list what would change, write nothing
//
// Why: Cloudflare Pages serves .md as text/plain, so a visitor following a paper link saw
// raw markup. Each document now has <same path>.html beside it — the .md stays as the
// source and stays downloadable; pages link to the .html. Rendering uses the vendored
// marked (assets/vendor/marked/, MIT) so the build has no network dependency. Re-run after
// editing any .md; the output is committed, so deploy stays a plain upload.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from '../assets/vendor/marked/marked.esm.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const SKIP = new Set(['.git', 'node_modules', 'vendor', 'Strat-Dom-3d', 'opmanifold', 'sabbotarchy', 'Polymorphic Matrix']);
const skipFile = new Set(['README.md', 'DEPLOY.md', 'COLLAB.md', 'OFL.txt', 'LICENSE.md']);  // repo docs, not site documents

marked.setOptions({ gfm: true, breaks: false });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function titleOf(md, file) {
  const m = md.match(/^#\s+(.+)$/m);
  return (m ? m[1] : path.basename(file, '.md')).replace(/[*_`]/g, '').trim();
}
function crumbs(rel) {
  const parts = rel.split('/').slice(0, -1);
  // only segments that have a page of their own become links; data folders stay plain text
  return `<a href="/">surface</a>` + parts.map((p, i) => { const dir = parts.slice(0, i + 1).join('/'); const has = fs.existsSync(path.join(ROOT, dir, 'index.html'));
    return ` <span class="sep">/</span> ` + (has ? `<a href="/${dir}/">${esc(p)}</a>` : `<span>${esc(p)}</span>`); }).join('');
}
function page(rel, md) {
  const title = titleOf(md, rel);
  // headings get ids so in-document links and deep links work
  const r = new marked.Renderer();
  const seen = new Map();
  r.heading = ({ tokens, depth }) => {
    const text = r.parser.parseInline(tokens);
    let id = text.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'h';
    const n = seen.get(id) || 0; seen.set(id, n + 1); if (n) id += '-' + n;
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };
  const body = marked.parse(md, { renderer: r });
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)} · toroid.fyi</title>
<meta name="description" content="${esc(title)} — ThinkWell Labs Metrology. Rendered from the source document ${esc(path.basename(rel))}." />
<meta name="theme-color" content="#111214" />
<meta name="copyright" content="© ThinkWell Labs. All rights reserved." />
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='none' stroke='%23bfc3c7' stroke-width='2'/><circle cx='16' cy='16' r='5' fill='none' stroke='%23bfc3c7' stroke-width='1.5'/></svg>" />
<link href="/assets/fonts/space-grotesk.css" rel="stylesheet">
<link href="/assets/reader.css" rel="stylesheet">
</head>
<body>
<a href="/" class="tsys-back" id="tsys-back" aria-label="Toroidal System — go back">↩ <b>Toroidal&nbsp;System</b> · back</a>
<script>(function(){var b=document.getElementById('tsys-back');if(!b)return;b.addEventListener('click',function(e){var s=false;try{s=document.referrer&&new URL(document.referrer).origin===location.origin;}catch(_){}if(history.length>1&&s){e.preventDefault();history.back();}});})();</script>
<div class="bread">${crumbs(rel)} <span class="sep">/</span> <span class="here">${esc(path.basename(rel, '.md'))}</span></div>
<main class="reader">
<article>
${body}
</article>
<footer class="reader-foot">
  <span>Rendered from <a href="/${esc(rel)}">${esc(path.basename(rel))}</a> (source, plain text)</span>
  <span>© ThinkWell Labs · <a href="/legal/">Terms &amp; Legal</a></span>
</footer>
</main>
<script src="/assets/tos.js"></script>
</body>
</html>
`;
}

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md') && !skipFile.has(e.name)) files.push(p);
  }
})(ROOT);

let changed = 0;
for (const f of files) {
  const rel = path.relative(ROOT, f).split(path.sep).join('/');
  const out = f.replace(/\.md$/, '.html');
  const html = page(rel, fs.readFileSync(f, 'utf8'));
  const prev = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : null;
  if (prev === html) continue;
  changed++;
  console.log((CHECK ? 'would write ' : 'wrote ') + path.relative(ROOT, out));
  if (!CHECK) fs.writeFileSync(out, html);
}
console.log(`${files.length} documents · ${changed} ${CHECK ? 'would change' : 'written'}`);
