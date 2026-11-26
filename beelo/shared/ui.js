/* BEELO shared helpers. Exposed on window.UI. No dependencies. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* money(1234.5) -> "$1,234.50". Always shows cents. */
  function money(n) {
    const v = Number(n) || 0;
    return (v < 0 ? '-$' : '$') + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  /* timeAgo(isoOrDate) -> "5 min ago" */
  function timeAgo(d) {
    const s = Math.round((Date.now() - new Date(d).getTime()) / 1000);
    if (s < 45) return 'just now';
    const m = Math.round(s / 60); if (m < 60) return m + ' min ago';
    const h = Math.round(m / 60); if (h < 24) return h + ' h ago';
    const dd = Math.round(h / 24); if (dd < 30) return dd + ' d ago';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const fmtTime = (d) => new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  function toast(msg, kind = '') {
    let host = $('#toast-host');
    if (!host) { host = document.createElement('div'); host.id = 'toast-host'; document.body.appendChild(host); }
    const t = document.createElement('div'); t.className = 'toast ' + kind; t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 3200);
  }

  /* modal(html, {onOpen}) -> close fn. Any [data-close] inside closes it. */
  function modal(html, opts = {}) {
    const back = document.createElement('div'); back.className = 'modal-back';
    back.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + html + '</div>';
    const close = () => { if (back.parentNode) back.parentNode.removeChild(back); };
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) close(); });
    document.body.appendChild(back);
    if (opts.onOpen) opts.onOpen(back.firstChild, close);
    return close;
  }

  /* tabs(root, onChange): buttons .tab[data-tab=x] toggle .tab-panel[data-panel=x] inside root. Returns show(name). */
  function tabs(root = document, onChange) {
    const btns = $$('.tab[data-tab]', root);
    const show = (name) => {
      btns.forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
      $$('.tab-panel[data-panel]', root).forEach((p) => p.classList.toggle('active', p.dataset.panel === name));
      if (onChange) onChange(name);
    };
    btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.tab)));
    if (btns[0]) show((btns.find((b) => b.classList.contains('active')) || btns[0]).dataset.tab);
    return show;
  }

  /* Placeholder photo as inline SVG (reads colors from tokens). kind: leak|pipe|ac|door|house|fixed|generic */
  function photo(kind = 'generic', label = '') {
    const c = getComputedStyle(document.documentElement);
    const v = (n) => c.getPropertyValue(n).trim();
    const g = v('--gold'), ink = v('--ink-2'), iv = v('--ivory-2'), info = v('--info'), ok = v('--ok');
    const shapes = {
      leak: `<rect x="20" y="20" width="160" height="14" fill="${ink}"/><path d="M100 34 q-8 18 0 26 q8 -8 0 -26" fill="${info}"/><ellipse cx="100" cy="120" rx="50" ry="8" fill="${info}" opacity=".5"/>`,
      pipe: `<rect x="10" y="60" width="180" height="18" fill="${ink}"/><path d="M96 78 l8 0 l-4 20z" fill="${info}"/><circle cx="100" cy="112" r="10" fill="${info}" opacity=".6"/>`,
      ac: `<rect x="50" y="30" width="100" height="90" rx="6" fill="${ink}"/><circle cx="100" cy="75" r="30" fill="${iv}"/><path d="M100 50v50M75 75h50" stroke="${ink}" stroke-width="4"/>`,
      door: `<rect x="70" y="20" width="60" height="110" fill="${g}"/><circle cx="120" cy="78" r="4" fill="${ink}"/>`,
      house: `<path d="M40 80 L100 35 L160 80 V130 H40Z" fill="${g}"/><rect x="88" y="95" width="24" height="35" fill="${ink}"/>`,
      fixed: `<rect x="10" y="60" width="180" height="18" fill="${ink}"/><circle cx="100" cy="105" r="18" fill="${ok}"/><path d="M91 105l6 6 12-12" stroke="${iv}" stroke-width="4" fill="none"/>`,
      generic: `<circle cx="100" cy="70" r="28" fill="${g}"/>`,
    };
    return `<span class="photo"><svg viewBox="0 0 200 150" role="img" aria-label="${esc(label || kind + ' photo')}"><rect width="200" height="150" fill="${iv}"/>${shapes[kind] || shapes.generic}${label ? `<text x="8" y="144" font-size="10" fill="${ink}" font-family="sans-serif">${esc(label)}</text>` : ''}</svg></span>`;
  }

  const sampleBadge = () => '<span class="badge sample" title="Mock data for demo purposes. Not live MLS.">Sample data</span>';
  const estimateNote = () => '<span class="disclaimer">Estimate, not an appraisal</span>';
  const soonBadge = (t = 'Coming soon') => `<span class="badge soon">${esc(t)}</span>`;

  window.UI = { $, $$, esc, money, timeAgo, fmtDate, fmtTime, toast, modal, tabs, photo, sampleBadge, estimateNote, soonBadge };
})();
