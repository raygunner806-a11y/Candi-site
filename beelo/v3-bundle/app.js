/* V3 One Dashboard Bundle: Hive + BEELO in one Today feed. Mock data only. */
(function () {
  const { $, $$, esc, money, timeAgo, fmtDate, toast, modal, tabs, photo, sampleBadge, estimateNote } = window.UI;
  const SELL_COST = 0.07;   // est. commissions + closing costs
  const LIST_SIDE = 0.03;   // agent's listing side, for the agent's own view
  const OPEN = ['new', 'assigned', 'scheduled', 'in-progress', 'awaiting-approval'];
  let S, filter = 'all', showTab, demoRunning = false;

  function reset() {
    const src = {}; Object.keys(window.MOCK).forEach((key) => { if (typeof window.MOCK[key] !== 'function') src[key] = window.MOCK[key]; });
    S = structuredClone(src);
    S.selectedDoor = null; S.converted = {}; S.flashIds = new Set();
  }
  const owner = (d) => S.owners.find((o) => o.id === d.ownerId);
  const door = (id) => S.doors.find((d) => d.id === id);
  const tenantsOf = (d) => d.tenantIds.map((id) => S.tenants.find((t) => t.id === id)).filter(Boolean);
  const label = (d) => d.address + (d.unit ? ' ' + d.unit : '') + ', ' + d.city;
  const k = (n) => '$' + Math.round(n / 1000) + 'k';

  /* Equity math for the "sell or 1031" prompt */
  function equity(d) {
    const v = d.valuation, gain = v.estimate - d.purchasePrice;
    const costs = Math.round(v.estimate * SELL_COST);
    return { est: v.estimate, basis: d.purchasePrice, gain, pct: gain / d.purchasePrice, costs, net: gain - costs, years: 2026 - d.purchaseYear, side: Math.round(v.estimate * LIST_SIDE) };
  }
  const qualifies = (d) => { const e = equity(d); return e.gain >= 150000 && e.pct >= 0.4 && d.valuation.change12mo > 0; };
  /* Hero door: best equity among occupied doors (so owner + tenant + valuation all show) */
  const heroDoor = () => S.doors.filter((d) => d.status === 'occupied' && qualifies(d)).sort((a, b) => equity(b).gain - equity(a).gain)[0];

  /* ---------- KPIs ---------- */
  function renderKpis() {
    const open = S.tickets.filter((t) => OPEN.includes(t.status)).length;
    const newLeads = S.leads.filter((l) => l.status === 'new').length;
    const value = S.doors.reduce((s, d) => s + d.valuation.estimate, 0);
    const prompts = S.doors.filter((d) => qualifies(d) && !S.converted[d.id]).length;
    $('#kpis').innerHTML = [
      ['Open tickets', open, 'Hive'], ['New leads', newLeads, 'BEELO'],
      ['Owner portfolio (est.)', '$' + (value / 1e6).toFixed(1) + 'M', 'Sample'], ['Sell / 1031 ideas', prompts, 'BEELO'],
    ].map(([l, v, tag]) => `<div class="card flat kpi"><div class="val">${esc(v)}</div><div class="lbl">${esc(l)} <span class="tag-${tag.toLowerCase()}">${tag}</span></div></div>`).join('');
    $('#lead-count').textContent = S.leads.length;
  }

  /* ---------- Today feed ---------- */
  function feedItems() {
    const items = [];
    const h = heroDoor();
    if (h && !S.converted[h.id]) items.push({ kind: 'growth', id: 'g-' + h.id, at: S.now, door: h });
    S.tickets.filter((t) => OPEN.includes(t.status)).forEach((t) => items.push({ kind: 'ticket', id: t.id, at: t.updatedAt, t }));
    S.leads.forEach((l) => items.push({ kind: 'lead', id: l.id, at: l.createdAt, l }));
    items.sort((a, b) => (a.kind === 'growth' ? -1 : b.kind === 'growth' ? 1 : new Date(b.at) - new Date(a.at)));
    return items.filter((i) => filter === 'all' || (filter === 'doors' ? i.kind !== 'lead' : i.kind === 'lead' || i.kind === 'growth'));
  }
  const urgBadge = (u) => `<span class="badge ${{ emergency: 'danger', high: 'warn', normal: 'info', low: '' }[u]}">${esc(u)}</span>`;
  const leadBadge = (s) => `<span class="badge ${{ new: 'ok', contacted: 'info', nurture: '' }[s] || 'warn'}">${esc(s)}</span>`;

  function renderFeed() {
    const items = feedItems();
    $('#feed-count').textContent = items.length + ' items';
    $('#feed').innerHTML = items.map((i) => {
      if (i.kind === 'growth') {
        const e = equity(i.door);
        return `<li class="feed-item growth" data-id="${i.id}" data-open-door="${i.door.id}"><span class="src beelo">BEELO</span>
          <div class="fi-body"><b>Good time to sell or 1031: ${esc(label(i.door))}</b>
          <div class="small muted">${esc(owner(i.door).name)} is up about ${money(e.gain)} (${Math.round(e.pct * 100)}%) since ${i.door.purchaseYear}. ${sampleBadge()}</div></div>
          <button class="btn sm" data-open-door="${i.door.id}">Review</button></li>`;
      }
      if (i.kind === 'ticket') {
        const d = door(i.t.doorId);
        return `<li class="feed-item" data-id="${i.id}" data-ticket="${i.t.id}"><span class="src hive">Hive</span>
          <div class="fi-body"><b>${esc(i.t.title)}</b> ${urgBadge(i.t.urgency)}
          <div class="small muted">${esc(label(d))} · ${esc(i.t.status.replace('-', ' '))} · ${timeAgo(i.at)}</div></div>
          <span class="tiny muted">${esc(i.t.id)}</span></li>`;
      }
      return `<li class="feed-item${S.flashIds.has(i.id) ? ' flash' : ''}" data-id="${i.id}" data-lead="${i.l.id}"><span class="src beelo">BEELO</span>
        <div class="fi-body"><b>${esc(i.l.name)}</b> ${leadBadge(i.l.status)} <span class="badge info">${esc(i.l.intent)}</span>
        <div class="small muted">${esc(i.l.source)} · ${esc(i.l.area)} · ${timeAgo(i.at)}</div></div>
        <span class="tiny muted">${i.l.budget ? k(i.l.budget) : ''}</span></li>`;
    }).join('') || '<li class="muted small">Nothing here. Nice.</li>';
  }

  /* ---------- Doors ---------- */
  function renderDoorList() {
    $('#door-list').innerHTML = S.doors.map((d) => {
      const open = S.tickets.filter((t) => t.doorId === d.id && OPEN.includes(t.status)).length;
      const tags = (qualifies(d) && !S.converted[d.id] ? '<span class="badge ok">Equity</span> ' : '') + (S.converted[d.id] ? '<span class="badge info">Listing lead</span> ' : '') + (open ? `<span class="badge warn">${open} open</span>` : '');
      return `<li class="door-row${S.selectedDoor === d.id ? ' sel' : ''}" data-open-door="${d.id}" tabindex="0">
        <div class="row between"><b class="small">${esc(label(d))}</b><span class="small">${k(d.valuation.estimate)}</span></div>
        <div class="row between tiny muted"><span>${esc(owner(d).name)} · ${esc(d.status)}</span><span>${tags}</span></div></li>`;
    }).join('');
  }

  function renderDetail() {
    const host = $('#door-detail'), layout = $('#doors-layout');
    const d = S.selectedDoor && door(S.selectedDoor);
    layout.classList.toggle('has-detail', !!d);
    if (!d) { host.innerHTML = '<div class="card flat muted small">Pick a door to see owner, tenant and valuation together.</div>'; return; }
    const o = owner(d), ts = tenantsOf(d), v = d.valuation, e = equity(d);
    const tickets = S.tickets.filter((t) => t.doorId === d.id && OPEN.includes(t.status));
    const chg = v.change12mo;
    let prompt = '';
    if (S.converted[d.id]) {
      prompt = `<div class="card hero done" id="hero-card"><b>✓ Listing lead created</b><p class="small muted">${esc(o.name)} is in your Leads list as a seller. Next: send a pricing conversation, not a contract.</p><button class="btn sm ghost" data-goto="leads">View in Leads</button></div>`;
    } else if (qualifies(d)) {
      prompt = `<div class="card hero" id="hero-card">
        <div class="row between"><h3>Good time to sell or 1031</h3>${sampleBadge()}</div>
        <p class="small">${esc(o.name)} bought in ${d.purchaseYear}. Value is up ${chg.toFixed(1)}% this year. Here is the rough math to bring to them:</p>
        <table class="table math"><tbody>
          <tr><td>Estimated value</td><td class="num">${money(e.est)}</td></tr>
          <tr><td>Purchase price (${d.purchaseYear})</td><td class="num">− ${money(e.basis)}</td></tr>
          <tr><td>Equity gain (${Math.round(e.pct * 100)}%)</td><td class="num"><b>${money(e.gain)}</b></td></tr>
          <tr><td>Est. selling costs (7%)</td><td class="num">− ${money(e.costs)}</td></tr>
          <tr class="tot"><td>Est. gain after costs, before tax</td><td class="num"><b>${money(e.net)}</b></td></tr>
        </tbody></table>
        <p class="tiny muted">Options for the owner: sell and take the gain, or a 1031 exchange into another rental to defer capital-gains tax (owner should confirm with their CPA). Your listing side at 3%: about ${money(e.side)}. ${estimateNote()}</p>
        <button class="btn block" id="convert" data-convert="${d.id}">Turn into BEELO listing lead</button></div>`;
    }
    host.innerHTML = `<div class="stack">
      <div class="row between"><button class="btn sm ghost back" data-back>← Doors</button>${sampleBadge()}</div>
      <div class="card"><div class="door-head">${photo('house', d.city)}<div><h2>${esc(d.address)}${d.unit ? ' ' + esc(d.unit) : ''}</h2>
        <div class="muted small">${esc(d.city)}, ${esc(d.state)} ${esc(d.zip)} · ${d.beds} bd / ${d.baths} ba · ${d.sqft.toLocaleString()} sqft · built ${d.yearBuilt}</div>
        <div class="small">Rent ${money(d.rent)}/mo · <span class="badge ${d.status === 'occupied' ? 'ok' : 'warn'}">${esc(d.status)}</span></div></div></div></div>
      <div class="trio">
        <div class="card flat"><div class="lbl-sm">Owner</div><b>${esc(o.name)}</b><div class="small muted">${esc(o.phone)}<br>${o.doorIds.length} door${o.doorIds.length > 1 ? 's' : ''} with you · approves up to ${money(o.spendLimit)}</div></div>
        <div class="card flat"><div class="lbl-sm">Tenant</div>${ts.length ? ts.map((t) => `<b>${esc(t.name)}</b><div class="small muted">${esc(t.phone)}<br>Lease ends ${fmtDate(t.leaseEnd)} · balance ${money(t.balance)}</div>`).join('') : '<span class="muted small">Vacant. No tenant right now.</span>'}</div>
        <div class="card flat"><div class="lbl-sm">Valuation ${sampleBadge()}</div><div class="val-big">${money(v.estimate)}</div>
          <div class="small">Range ${money(v.low)} – ${money(v.high)}</div><div class="small ${chg >= 0 ? 'up' : 'down'}">${chg >= 0 ? '▲' : '▼'} ${Math.abs(chg).toFixed(2)}% last 12 mo · as of ${fmtDate(v.asOf)}</div>${estimateNote()}</div>
      </div>
      ${prompt}
      <div class="card flat"><div class="lbl-sm">Open Hive tickets</div>${tickets.length ? '<ul class="list">' + tickets.map((t) => `<li class="row between" data-ticket="${t.id}"><span class="small"><b>${esc(t.title)}</b> ${urgBadge(t.urgency)}</span><span class="tiny muted">${esc(t.status)}</span></li>`).join('') + '</ul>' : '<span class="small muted">No open tickets.</span>'}</div>
    </div>`;
  }

  function openDoor(id) {
    S.selectedDoor = id; showTab('doors'); renderDoorList(); renderDetail();
    $('#door-detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- Leads ---------- */
  function renderLeads() {
    const leads = S.leads.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    $('#lead-list').innerHTML = leads.map((l) => `<li class="lead-row${S.flashIds.has(l.id) ? ' flash' : ''}" data-lid="${l.id}">
      <div class="row between"><div><b>${esc(l.name)}</b> ${leadBadge(l.status)} <span class="badge info">${esc(l.intent)}</span></div>
      <span class="small">${l.budget ? (l.intent.startsWith('Seller') ? 'Est. ' : 'Budget ') + money(l.budget) : ''}</span></div>
      <div class="small muted">${esc(l.source)} · ${esc(l.area)} · ${timeAgo(l.createdAt)}</div>
      <div class="small">${esc(l.note)}</div>
      <div class="row lead-actions">${l.status === 'new' ? `<button class="btn sm" data-contact="${l.id}">Mark contacted</button>` : ''}${l.doorId ? `<button class="btn sm ghost" data-open-door="${l.doorId}">Open door</button>` : ''}</div></li>`).join('');
    $$('[data-sample]').forEach((el) => (el.innerHTML = sampleBadge()));
  }

  /* ---------- HERO: door -> listing lead ---------- */
  function convert(id) {
    const d = door(id);
    if (!d || S.converted[id]) return;
    const o = owner(d), e = equity(d);
    const lead = { id: 'LD' + (S.leads.length + 1), name: o.name, phone: o.phone, source: 'Hive door · ' + d.address, intent: 'Seller (listing)', budget: e.est, area: d.city, status: 'new', createdAt: new Date().toISOString(), doorId: d.id,
      note: `Owner rental, up ${money(e.gain)} since ${d.purchaseYear}. Talk sell vs 1031. Estimate, not an appraisal.` };
    S.leads.push(lead); S.converted[id] = lead.id; S.flashIds = new Set([lead.id]);
    renderAll();
    toast(`Listing lead created for ${o.name} · ${d.address}`, 'ok');
    setTimeout(() => { S.flashIds.clear(); }, 1500);
    return lead;
  }

  function ticketModal(id) {
    const t = S.tickets.find((x) => x.id === id), d = door(t.doorId);
    modal(`<div class="row between"><h3>${esc(t.title)}</h3>${urgBadge(t.urgency)}</div>
      <p class="small muted">${esc(t.id)} · ${esc(label(d))} · ${esc(t.status)}</p>
      <div class="photos">${t.photos.map((p) => photo(p.kind, p.label)).join('')}</div>
      <p class="small">${esc(t.description)}</p>
      <ul class="list tiny">${t.timeline.map((x) => `<li>${fmtDate(x.at)} · ${esc(x.who)}: ${esc(x.text)}</li>`).join('')}</ul>
      <div class="row"><button class="btn sm" data-ack>Mark checked</button><button class="btn sm ghost" data-door="${d.id}">Open door</button><button class="btn sm ghost" data-close>Close</button></div>`, {
      onOpen(el, close) {
        el.querySelector('[data-ack]').onclick = () => { t.timeline.push({ at: new Date().toISOString(), who: S.agent.name, text: 'Checked from Today feed' }); close(); toast('Checked. Alert repeats stop for ' + t.id, 'ok'); };
        el.querySelector('[data-door]').onclick = () => { close(); openDoor(d.id); };
      },
    });
  }

  function renderAll() { renderKpis(); renderFeed(); renderDoorList(); renderDetail(); renderLeads(); }

  /* ---------- events ---------- */
  document.addEventListener('click', (ev) => {
    const el = (s) => ev.target.closest(s);
    let x;
    if ((x = el('[data-convert]'))) return convert(x.dataset.convert);
    if ((x = el('[data-open-door]'))) return openDoor(x.dataset.openDoor);
    if ((x = el('[data-back]'))) { S.selectedDoor = null; renderDoorList(); return renderDetail(); }
    if ((x = el('[data-goto]'))) return showTab(x.dataset.goto);
    if ((x = el('[data-contact]'))) { const l = S.leads.find((y) => y.id === x.dataset.contact); l.status = 'contacted'; renderAll(); return toast(`${l.name} marked contacted`, 'ok'); }
    if ((x = el('#feed [data-ticket], #door-detail [data-ticket]'))) return ticketModal(x.dataset.ticket);
    if ((x = el('#feed [data-lead]'))) { showTab('leads'); const r = $(`[data-lid="${x.dataset.lead}"]`); r.classList.remove('flash'); void r.offsetWidth; r.classList.add('flash'); return r.scrollIntoView({ block: 'center' }); }
    if ((x = el('.chip'))) { filter = x.dataset.f; $$('.chip').forEach((c) => c.classList.toggle('on', c === x)); return renderFeed(); }
  });
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && ev.target.matches('.door-row')) openDoor(ev.target.dataset.openDoor); });

  /* ---------- Run demo ---------- */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  function cap(n, text) { $('#demo-bar').classList.remove('hide'); $('#demo-step').textContent = 'Step ' + n + ' of 6'; $('#demo-text').textContent = text; }
  function spot(sel) { const e = $(sel); if (!e) return; e.classList.add('spot'); e.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => e.classList.remove('spot'), 1800); }
  async function runDemo() {
    if (demoRunning) return; demoRunning = true; $('#run-demo').disabled = true;
    reset(); filter = 'all'; $$('.chip').forEach((c) => c.classList.toggle('on', c.dataset.f === 'all'));
    renderAll(); showTab('today'); window.scrollTo(0, 0);
    const h = heroDoor();
    cap(1, 'Today mixes Hive tickets and BEELO leads in one feed.'); await sleep(1800);
    cap(2, `BEELO spots strong equity on ${h.address}.`); spot('.feed-item.growth'); await sleep(2000);
    cap(3, 'Door detail: owner, tenant and valuation together.'); openDoor(h.id); await sleep(2000);
    cap(4, 'The equity math, labelled as an estimate.'); spot('#hero-card'); await sleep(2400);
    cap(5, 'One tap turns it into a BEELO listing lead.'); spot('#convert'); await sleep(1000); convert(h.id); await sleep(1600);
    showTab('leads'); spot('.lead-row.flash'); await sleep(2000);
    cap(6, 'It shows up in Leads and the Today feed. Done.'); filter = 'leads'; $$('.chip').forEach((c) => c.classList.toggle('on', c.dataset.f === 'leads'));
    S.flashIds = new Set([S.converted[h.id]]); showTab('today'); renderFeed(); spot('#feed .flash'); await sleep(2600);
    S.flashIds.clear(); $('#demo-bar').classList.add('hide'); $('#run-demo').disabled = false; demoRunning = false;
  }
  $('#run-demo').addEventListener('click', runDemo);

  /* ---------- boot ---------- */
  reset();
  $('#tw').textContent = S.agent.twilioNumber;
  showTab = tabs($('main'), () => window.scrollTo({ top: Math.min(window.scrollY, $('#tabs').offsetTop - 60) }));
  renderAll();
})();
