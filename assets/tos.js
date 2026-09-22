/* toroid.fyi — site-wide terms agreement.
 *
 * One agreement, honoured on every page. A visitor who lands anywhere on the
 * site (a deep link from search, a shared URL) sees the notice once, agrees,
 * and is not asked again until the terms change. Agreement is stored in
 * localStorage only (see /legal/ → Privacy); nothing leaves the device.
 *
 * Bump VERSION whenever /legal/ changes materially — every visitor is then
 * asked to agree to the new terms once.
 *
 * Not shown on:  /legal/  (you must be able to read the terms before agreeing)
 *                /play/   (the game carries its own, stricter agreement)
 *                pages embedded in an iframe (the parent page gates)
 *
 * Exposes window.TWL_TOS = { version, agreed, open } and fires a
 * 'twl-tos-agreed' event on window when the visitor agrees. The homepage
 * uses both to hold its opening animation until the terms are accepted.
 */
(function () {
  'use strict';

  var VERSION = '2026-09-22';
  var KEY = 'twl-tos-agreed';
  var LEGAL = '/legal/';

  var path = location.pathname;
  var embedded = false;
  try { embedded = window.top !== window.self; } catch (e) { embedded = true; }
  var skip = embedded || /^\/(legal|play)(\/|$)/.test(path);

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  var agreed = stored === VERSION;

  var api = window.TWL_TOS = { version: VERSION, agreed: agreed || skip, open: false };
  if (api.agreed) return;

  var css = '' +
    '.twl-tos{position:fixed;inset:0;z-index:2147483600;display:grid;place-items:center;padding:24px;' +
      'background:rgba(6,7,10,0.8);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);' +
      'font-family:"Space Grotesk",system-ui,-apple-system,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}' +
    '.twl-tos-card{max-width:560px;width:100%;background:#15171b;border:1px solid rgba(207,211,215,0.18);border-radius:6px;' +
      'padding:30px 32px;color:#eef0f2;box-shadow:0 20px 60px rgba(0,0,0,0.6);max-height:calc(100vh - 48px);overflow:auto}' +
    '.twl-tos-card h2{font-weight:500;font-size:18px;letter-spacing:0.06em;margin:0 0 14px;color:#eef0f2}' +
    '.twl-tos-card p{font-weight:300;font-size:13.5px;line-height:1.62;color:#c4c8cd;margin:0 0 12px}' +
    '.twl-tos-card p b{color:#eef0f2;font-weight:500}' +
    '.twl-tos-card p a{color:#9adfe0;text-decoration:none;border-bottom:1px solid rgba(154,223,224,0.4)}' +
    '.twl-tos-card .twl-tos-row{display:flex;align-items:center;gap:16px;margin-top:20px;flex-wrap:wrap}' +
    '.twl-tos-card a.twl-tos-terms{font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.1em;color:#9adfe0;text-decoration:none}' +
    '.twl-tos-card a.twl-tos-terms:hover{text-decoration:underline}' +
    '.twl-tos-card button{font-family:inherit;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;font-weight:500;' +
      'background:#eef0f2;color:#111214;border:0;border-radius:999px;padding:11px 22px;cursor:pointer;transition:transform .15s,background .15s}' +
    '.twl-tos-card button:hover{transform:translateY(-1px);background:#fff}' +
    '.twl-tos-card button:focus-visible{outline:2px solid #9adfe0;outline-offset:3px}' +
    '@media (max-width:480px){.twl-tos-card{padding:24px 20px}}';

  var html = '' +
    '<div class="twl-tos-card" role="dialog" aria-modal="true" aria-labelledby="twl-tos-h">' +
      '<h2 id="twl-tos-h">Before you enter</h2>' +
      '<p>This site is a set of analytical instruments — measurements and commentary, built from public sources, on how public value is moved from where it does good into private extraction. It documents and interprets; <b>it does not allege crimes</b>, and nothing here is legal, financial, or professional advice.</p>' +
      '<p>All material on <b>toroid.fyi</b> is <b>© ThinkWell Labs</b>, all rights reserved. You may reference it <b>only with proper citation</b>. The site is offered as is, uses no tracking, and remembers only this agreement on your device.</p>' +
      '<p>By entering you confirm you are 13 or older and agree to the <a href="' + LEGAL + '">terms &amp; legal</a>.</p>' +
      '<div class="twl-tos-row">' +
        '<a class="twl-tos-terms" href="' + LEGAL + '">Read the full terms &amp; legal →</a>' +
        '<button type="button" id="twl-tos-agree">Agree &amp; enter</button>' +
      '</div>' +
    '</div>';

  function show() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var veil = document.createElement('div');
    veil.className = 'twl-tos';
    veil.id = 'twl-tos';
    veil.innerHTML = html;
    document.body.appendChild(veil);
    document.documentElement.setAttribute('data-tos', 'open');
    api.open = true;

    var btn = veil.querySelector('#twl-tos-agree');
    var focusables = veil.querySelectorAll('a,button');
    var first = focusables[0], last = focusables[focusables.length - 1];

    // Nothing behind the veil receives clicks or keys until the visitor agrees.
    veil.addEventListener('click', function (e) { e.stopPropagation(); });
    veil.addEventListener('keydown', function (e) {
      e.stopPropagation();
      if (e.key === 'Escape') { e.preventDefault(); return; }
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // Keys arriving at the page while the veil is up (e.g. Enter to start an animation) are swallowed.
    var keyGuard = function (e) { if (api.open && !veil.contains(e.target)) { e.stopImmediatePropagation(); e.preventDefault(); } };
    window.addEventListener('keydown', keyGuard, true);

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      try { localStorage.setItem(KEY, VERSION); } catch (err) {}
      window.removeEventListener('keydown', keyGuard, true);
      veil.remove();
      document.documentElement.removeAttribute('data-tos');
      api.open = false; api.agreed = true;
      try { window.dispatchEvent(new CustomEvent('twl-tos-agreed', { detail: { version: VERSION } })); } catch (err) {}
    });

    setTimeout(function () { btn.focus(); }, 0);
  }

  if (document.body) show();
  else document.addEventListener('DOMContentLoaded', show);
})();
