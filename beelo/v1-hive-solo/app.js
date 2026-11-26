/* V1 Hive Solo: agent console + tenant phone + vendor accept. Mock data only. */
(function () {
  const { $, $$, esc, money, fmtDate, fmtTime, toast, modal, tabs, photo, sampleBadge } = UI;
  const S = {};
  Object.keys(MOCK).forEach((k) => { if (typeof MOCK[k] !== 'function') S[k] = structuredClone(MOCK[k]); });
  const by = (col, id) => S[col].find((x) => x.id === id);
  const doorLabel = (d) => d ? MOCK.doorLabel(d) : '';
  const STATUS = {
    new: ['New', 'Received', 'warn'], assigned: ['Assigned', 'Vendor contacted', 'info'], scheduled: ['Scheduled', 'Visit scheduled', 'info'],
    'in-progress': ['In progress', 'Work underway', 'info'], 'awaiting-approval': ['Owner OK', 'Waiting on owner OK', 'warn'],
    completed: ['Completed', 'Fixed', 'ok'], closed: ['Closed', 'Closed', ''],
  };
  const URG = { low: '', normal: '', high: 'warn', emergency: 'danger' };
  const badge = (st, tenant) => `<span class="badge ${STATUS[st][2]}">${STATUS[st][tenant ? 1 : 0]}</span>`;
  const when = (d) => `${fmtDate(d)} · ${fmtTime(d)}`;
  const view = { role: 'agent', phone: 'tenant', tScreen: 'home', tTicket: null, tPhoto: 'leak', tUpload: null, vendorId: 'v1', fresh: null };
  const TENANT = 't1';
  const T0 = Date.now(), now0 = new Date(S.now || Date.now()).getTime();
  const clock = () => new Date(now0 + (Date.now() - T0)); /* demo clock anchored to mock 'now' */
  let showTab;

  /* ---------- header + KPIs ---------- */
  function header() {
    $('#price').textContent = money(S.pricing.hive);
    $('#agent-name').textContent = S.agent.name.split(' ')[0];
    $('#agent-sub').textContent = `${S.agent.brokerage} · ${S.doors.length} doors · alerts from ${S.agent.twilioNumber}`;
    $('#sample').innerHTML = sampleBadge();
  }
  function kpis() {
    const open = S.tickets.filter((t) => !['completed', 'closed'].includes(t.status));
    const fresh = S.tickets.filter((t) => t.status === 'new').length;
    const occ = S.doors.filter((d) => d.status === 'occupied').length;
    const rent = S.doors.filter((d) => d.status === 'occupied').reduce((a, d) => a + d.rent, 0);
    $('#kpis').innerHTML = [[fresh, 'New tickets'], [open.length, 'Open tickets'], [`${occ}/${S.doors.length}`, 'Occupied'], [money(rent), 'Monthly rent']]
      .map(([v, l]) => `<div class="kpi"><div class="val">${v}</div><div class="lbl">${l}</div></div>`).join('');
  }

  /* ---------- agent board ---------- */
  function board() {
    const sorted = S.tickets.slice().sort((a, b) => (b.id === view.fresh) - (a.id === view.fresh) || new Date(b.openedAt) - new Date(a.openedAt));
    $('#board').innerHTML = S.ticketStatuses.map((st) => {
      const list = sorted.filter((t) => t.status === st);
      return `<div class="col ${st}" data-col="${st}"><h4><span>${STATUS[st][0]}</span><span>${list.length}</span></h4>${list.map(card).join('') || '<p class="tiny muted">Nothing here</p>'}</div>`;
    }).join('');
    $$('#board .tk').forEach((b) => b.addEventListener('click', () => openTicket(b.dataset.id)));
    kpis();
  }
  function card(t) {
    const d = by('doors', t.doorId), v = t.vendorId && by('vendors', t.vendorId);
    const p = t.upload ? `<img class="photo user-img" src="${t.upload}" alt="Tenant photo">` : t.photos && t.photos[0] ? photo(t.photos[0].kind) : '';
    return `<button class="tk ${view.fresh === t.id ? 'fresh' : ''}" data-id="${t.id}">${p}
      <span class="tiny muted">${t.id} · ${esc(t.trade)}</span>
      <div class="t">${esc(t.title)}</div>
      <div class="tiny muted">${esc(d ? d.address : '')}</div>
      <div class="row" style="gap:4px;margin-top:4px">${t.urgency !== 'normal' ? `<span class="badge ${URG[t.urgency]}">${t.urgency}</span>` : ''}${v ? `<span class="badge">${esc(v.name)}</span>` : ''}</div></button>`;
  }

  /* three taps: open ticket -> pick vendor -> confirm */
  function openTicket(id) {
    const t = by('tickets', id); if (!t) return;
    if (view.fresh === id) { view.fresh = null; }
    const d = by('doors', t.doorId), ten = by('tenants', t.tenantId);
    const vendors = S.vendors.slice().sort((a, b) => (b.trade === t.trade) - (a.trade === t.trade) || b.rating - a.rating);
    let pick = null;
    const pics = (t.upload ? [`<img class="user-img" src="${t.upload}" alt="Tenant photo">`] : []).concat((t.photos || []).map((p) => photo(p.kind, p.label)));
    const html = `<div class="row between"><h3 style="margin:0">${esc(t.title)}</h3>${badge(t.status)}</div>
      <p class="small muted">${t.id} · ${esc(doorLabel(d))} · ${esc(ten ? ten.name : '')} · opened ${when(t.openedAt)}</p>
      <div class="photos">${pics.join('')}</div>
      <p class="small" style="margin-top:12px">${esc(t.description)}</p>
      <p class="tiny muted">AI urgency read: ${t.aiUrgencyScore}/100 · ${esc(t.urgency)}</p>
      ${t.status === 'new' ? `<div class="step-dots"><span><b>1</b> Opened</span><span id="sd2">2 Pick vendor</span><span id="sd3">3 Confirm</span></div>
        <div class="vlist">${vendors.map((v) => `<button class="vopt" data-v="${v.id}"><span><b>${esc(v.name)}</b><br><span class="tiny muted">${esc(v.trade)} · ★ ${v.rating} · answers in ~${v.avgResponseMin} min</span></span>${v.trade === t.trade ? '<span class="badge ok">Match</span>' : ''}</button>`).join('')}</div>
        <button class="btn block" id="confirm" disabled>Pick a vendor</button>`
      : `<h4 class="small">Timeline</h4>${timeline(t)}`}
      <div class="row" style="margin-top:12px"><button class="btn ghost sm" data-close>Close</button></div>`;
    modal(html, { onOpen(el, close) {
      $$('.vopt', el).forEach((b) => b.addEventListener('click', () => {
        pick = b.dataset.v; $$('.vopt', el).forEach((x) => x.classList.toggle('on', x === b));
        const btn = $('#confirm', el); btn.disabled = false; btn.textContent = `Confirm & text ${by('vendors', pick).name}`;
        $('#sd2', el).innerHTML = '<b>2</b> Vendor picked';
      }));
      const c = $('#confirm', el);
      if (c) c.addEventListener('click', () => { assign(t, pick); close(); });
    } });
  }
  function assign(t, vid) {
    const v = by('vendors', vid);
    t.vendorId = vid; t.status = 'assigned'; t.updatedAt = clock().toISOString();
    t.timeline.push({ at: t.updatedAt, who: S.agent.name, text: `Sent to ${v.name}. Waiting for them to accept.` });
    view.vendorId = vid;
    toast(`Texted ${v.name} from ${S.agent.twilioNumber}`, 'ok');
    renderAll();
  }

  /* ---------- doors + ledger ---------- */
  function doors() {
    const rows = S.doors.map((d) => {
      const ten = d.tenantIds.map((id) => by('tenants', id)).filter(Boolean).map((x) => x.name).join(', ') || '—';
      const own = by('owners', d.ownerId);
      const open = S.tickets.filter((t) => t.doorId === d.id && !['completed', 'closed'].includes(t.status)).length;
      return `<tr data-door="${d.id}"><td><b>${esc(doorLabel(d))}</b><div class="tiny muted">${d.beds} bd · ${d.baths} ba · ${d.sqft} sqft</div></td><td>${esc(ten)}</td><td>${esc(own ? own.name : '')}</td><td class="num">${money(d.rent)}</td><td>${open ? `<span class="badge warn">${open} open</span>` : '<span class="badge ok">Clear</span>'}</td></tr>`;
    }).join('');
    $('#doors').innerHTML = `<div class="scroll-x"><table class="table"><thead><tr><th>Door</th><th>Tenant</th><th>Owner</th><th class="num">Rent</th><th>Tickets</th></tr></thead><tbody>${rows}</tbody></table></div><p class="tiny muted">Tap a door to see its tickets.</p>`;
    $$('#doors tr[data-door]').forEach((r) => r.addEventListener('click', () => doorModal(r.dataset.door)));
  }
  function doorModal(id) {
    const d = by('doors', id);
    const tk = S.tickets.filter((t) => t.doorId === id);
    modal(`<h3>${esc(doorLabel(d))}</h3><p class="small muted">Rent ${money(d.rent)} · management fee ${d.mgmtFeePct}%</p>
      <ul class="list">${tk.map((t) => `<li class="row between"><span class="small">${t.id} · ${esc(t.title)}</span>${badge(t.status)}</li>`).join('') || '<li class="small muted">No tickets yet.</li>'}</ul>
      <button class="btn ghost sm" data-close style="margin-top:12px">Close</button>`);
  }
  let ledgerDoor = '';
  function ledger() {
    const rows = S.ledger.filter((l) => !ledgerDoor || l.doorId === ledgerDoor).sort((a, b) => b.date.localeCompare(a.date));
    const month = rows[0] ? rows[0].date.slice(0, 7) : '';
    const mo = rows.filter((l) => l.date.startsWith(month));
    const sum = (f) => mo.filter(f).reduce((a, l) => a + l.amount, 0);
    const inc = sum((l) => l.amount > 0), out = sum((l) => l.amount < 0);
    $('#ledger').innerHTML = `<div class="row between"><label class="field" style="min-width:220px"><span>Door</span><select class="input" id="ledger-door"><option value="">All doors</option>${S.doors.map((d) => `<option value="${d.id}" ${d.id === ledgerDoor ? 'selected' : ''}>${esc(doorLabel(d))}</option>`).join('')}</select></label>
      <button class="btn ghost sm" id="export">Export CSV</button></div>
      <div class="ledger-sum"><div class="kpi"><div class="val">${money(inc)}</div><div class="lbl">In · ${month ? fmtDate(month + '-15').replace(/ \d+,/, '') : ''}</div></div><div class="kpi"><div class="val">${money(out)}</div><div class="lbl">Out</div></div><div class="kpi"><div class="val">${money(inc + out)}</div><div class="lbl">Net</div></div></div>
      <div class="scroll-x"><table class="table"><thead><tr><th>Date</th><th>Door</th><th>Memo</th><th class="num">Amount</th></tr></thead><tbody>
      ${rows.slice(0, 30).map((l) => `<tr><td>${fmtDate(l.date + 'T12:00:00')}</td><td>${esc((by('doors', l.doorId) || {}).address || '')}</td><td>${esc(l.memo)}</td><td class="num">${money(l.amount)}</td></tr>`).join('')}
      </tbody></table></div><p class="tiny muted">Showing latest 30 of ${rows.length}. Paying vendors and owners from trust: ${UI.soonBadge()}</p>`;
    $('#ledger-door').addEventListener('change', (e) => { ledgerDoor = e.target.value; ledger(); });
    $('#export').addEventListener('click', () => toast(`Ledger export ready: ${rows.length} rows (demo)`, 'ok'));
  }

  /* ---------- tenant phone ---------- */
  function timeline(t) {
    return `<ul class="timeline">${t.timeline.map((e, i) => `<li class="${i === t.timeline.length - 1 && t.justChanged ? 'flash' : ''}"><span class="when">${when(e.at)}</span><b>${esc(e.who)}</b>: ${esc(e.text)}</li>`).join('')}</ul>`;
  }
  function tenantView() {
    const ten = by('tenants', TENANT), d = by('doors', ten.doorId);
    const mine = S.tickets.filter((t) => t.tenantId === TENANT).sort((a, b) => new Date(b.openedAt) - new Date(a.openedAt));
    if (view.tScreen === 'new') {
      const kinds = [['leak', 'Leak'], ['ac', 'A/C'], ['door', 'Door'], ['pipe', 'Pipe'], ['generic', 'Other']];
      return `<button class="btn ghost sm" data-t="home">&larr; Back</button><p class="ph-h" style="margin-top:8px">What needs fixing?</p>
        <p class="tiny muted">Add a photo. It helps ${esc(S.agent.name.split(' ')[0])} send the right person.</p>
        <div class="pick">${kinds.map(([k, l]) => `<button data-photo="${k}" class="${view.tPhoto === k && !view.tUpload ? 'on' : ''}" aria-label="${l} photo">${photo(k, l)}</button>`).join('')}
        <label class="upload ${view.tUpload ? 'on' : ''}">${view.tUpload ? `<img class="user-img" src="${view.tUpload}" alt="Your photo">` : '+ Your photo'}<input type="file" accept="image/*" id="t-file" class="hide"></label></div>
        <label class="field"><span>Type</span><select class="input" id="t-trade">${['Plumbing', 'HVAC', 'Electrical', 'Appliance', 'Locksmith', 'General'].map((x) => `<option>${x}</option>`).join('')}</select></label>
        <label class="field"><span>Tell us what happened</span><textarea class="input" id="t-desc" rows="3" placeholder="Water dripping under the bathroom sink"></textarea></label>
        <label class="row small" style="margin-bottom:12px"><input type="checkbox" id="t-emerg"> This is an emergency (flooding, no heat, gas smell)</label>
        <button class="btn block" id="t-send">Send to ${esc(S.agent.name.split(' ')[0])}</button>`;
    }
    if (view.tScreen === 'detail') {
      const t = by('tickets', view.tTicket), v = t.vendorId && by('vendors', t.vendorId);
      return `<button class="btn ghost sm" data-t="home">&larr; My requests</button>
        <p class="ph-h" style="margin-top:8px">${esc(t.title)}</p><p class="tiny muted">${t.id} · ${esc(d.address)}</p>
        <div class="status-big ${t.justChanged ? 'flash' : ''}"><span class="small">Status</span>${badge(t.status, true)}</div>
        ${v ? `<p class="small">Vendor: <b>${esc(v.name)}</b>${t.visitAt ? `<br>Visit: <b>${when(t.visitAt)}</b>` : ''}</p>` : '<p class="small muted">We got it. A vendor is picked next.</p>'}
        ${t.upload ? `<img class="user-img" src="${t.upload}" alt="Your photo">` : t.photos[0] ? photo(t.photos[0].kind, 'Your photo') : ''}
        ${timeline(t)}`;
    }
    return `<p class="ph-h">Hi ${esc(ten.name.split(' ')[0])}</p><p class="tiny muted">${esc(doorLabel(d))}</p>
      <button class="btn block" data-t="new" id="t-new">+ Report a problem</button>
      <p class="small" style="margin:16px 0 8px"><b>My requests</b></p>
      ${mine.map((t) => `<button class="req" data-open="${t.id}"><div class="row between"><b class="small">${esc(t.title)}</b>${badge(t.status, true)}</div><span class="tiny muted">Opened ${when(t.openedAt)}</span></button>`).join('')}
      <p class="tiny muted">Rent ${money(ten.rent)} due the 1st. Balance ${money(ten.balance)}.</p>`;
  }
  function bindTenant(root) {
    $$('[data-t]', root).forEach((b) => b.addEventListener('click', () => { view.tScreen = b.dataset.t; phone(); }));
    $$('[data-open]', root).forEach((b) => b.addEventListener('click', () => { view.tScreen = 'detail'; view.tTicket = b.dataset.open; phone(); }));
    $$('[data-photo]', root).forEach((b) => b.addEventListener('click', () => { view.tPhoto = b.dataset.photo; view.tUpload = null; phone(); }));
    const f = $('#t-file', root);
    if (f) f.addEventListener('change', () => {
      const file = f.files[0]; if (!file) return;
      const r = new FileReader(); r.onload = () => { view.tUpload = r.result; phone(); }; r.readAsDataURL(file);
    });
    const send = $('#t-send', root);
    if (send) send.addEventListener('click', () => submitTicket($('#t-trade', root).value, $('#t-desc', root).value.trim(), $('#t-emerg', root).checked));
  }
  function submitTicket(trade, desc, emerg) {
    if (!desc) { toast('Add a short note so the vendor knows what to bring.', 'warn'); $('#t-desc').focus(); return; }
    const ten = by('tenants', TENANT), now = clock().toISOString();
    const n = Math.max(...S.tickets.map((t) => +t.id.split('-')[1])) + 1;
    const t = { id: 'HV-' + n, title: desc.length > 48 ? desc.slice(0, 46) + '…' : desc, trade, urgency: emerg ? 'emergency' : 'normal', status: 'new',
      doorId: ten.doorId, tenantId: TENANT, ownerId: by('doors', ten.doorId).ownerId, vendorId: null, description: desc,
      photos: view.tUpload ? [] : [{ kind: view.tPhoto, label: 'Tenant photo' }], upload: view.tUpload, aiUrgencyScore: emerg ? 91 : 42,
      openedAt: now, updatedAt: now, timeline: [{ at: now, who: ten.name, text: 'Opened request with photo' }] };
    S.tickets.push(t);
    view.fresh = t.id; view.tScreen = 'detail'; view.tTicket = t.id; view.tUpload = null;
    toast(`Sent. ${S.agent.name.split(' ')[0]} got a text from ${S.agent.twilioNumber}.`, 'ok');
    renderAll();
    return t;
  }

  /* ---------- vendor phone ---------- */
  function vendorView() {
    const v = by('vendors', view.vendorId);
    const jobs = S.tickets.filter((t) => t.vendorId === v.id && !['completed', 'closed'].includes(t.status)).sort((a, b) => (a.status === 'assigned' ? -1 : 1) - (b.status === 'assigned' ? -1 : 1));
    return `<label class="field"><span>Signed in as</span><select class="input" id="v-who">${S.vendors.map((x) => `<option value="${x.id}" ${x.id === v.id ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select></label>
      <p class="ph-h">Jobs from ${esc(S.agent.name)}</p>
      ${jobs.map((t) => { const d = by('doors', t.doorId); return `<div class="job ${t.status === 'assigned' ? 'offer' : ''}">
        <div class="row between"><b class="small">${esc(t.title)}</b>${badge(t.status)}</div>
        <p class="tiny muted">${t.id} · ${esc(doorLabel(d))} · sent ${when(t.updatedAt)}</p>
        ${t.upload ? `<img class="user-img" src="${t.upload}" alt="Tenant photo">` : t.photos[0] ? photo(t.photos[0].kind, 'Tenant photo') : ''}
        <p class="small" style="margin-top:8px">${esc(t.description)}</p>
        ${t.status === 'assigned' ? `<div class="row"><button class="btn" data-accept="${t.id}">Accept · visit tomorrow 9 AM</button><button class="btn ghost sm" data-decline="${t.id}">Can't take it</button></div>` : t.visitAt ? `<p class="small">Visit: <b>${when(t.visitAt)}</b></p>` : ''}
      </div>`; }).join('') || '<p class="small muted">No open jobs right now.</p>'}`;
  }
  function bindVendor(root) {
    $('#v-who', root).addEventListener('change', (e) => { view.vendorId = e.target.value; phone(); });
    $$('[data-accept]', root).forEach((b) => b.addEventListener('click', () => accept(b.dataset.accept)));
    $$('[data-decline]', root).forEach((b) => b.addEventListener('click', () => {
      const t = by('tickets', b.dataset.decline), v = by('vendors', t.vendorId), now = clock().toISOString();
      t.status = 'new'; t.vendorId = null; t.updatedAt = now; t.timeline.push({ at: now, who: v.name, text: 'Could not take this job. Back to the agent.' });
      toast('Declined. Jordan will pick someone else.', 'warn'); renderAll();
    }));
  }
  function accept(id) {
    const t = by('tickets', id), v = by('vendors', t.vendorId), now = clock();
    const visit = new Date(now); visit.setDate(visit.getDate() + 1); visit.setHours(9, 0, 0, 0);
    t.status = 'scheduled'; t.updatedAt = now.toISOString(); t.visitAt = visit.toISOString(); t.justChanged = true;
    t.timeline.push({ at: t.updatedAt, who: v.name, text: `Accepted the job. Visit set for ${when(visit)}.` });
    toast(`${v.name} accepted. ${by('tenants', t.tenantId).name.split(' ')[0]} was notified.`, 'ok');
    view.tTicket = id; view.tScreen = 'detail';
    renderAll();
    setTimeout(() => { t.justChanged = false; }, 1200);
  }

  /* ---------- shell ---------- */
  function phone() {
    const body = $('#phone-body');
    $('#phone-clock').textContent = fmtTime(clock());
    $('#phone-who').textContent = view.phone === 'vendor' ? 'Vendor app' : 'Tenant app';
    $('#phone-caption').textContent = view.phone === 'vendor' ? 'What the vendor sees on their phone' : 'What your tenant sees on their phone';
    body.innerHTML = view.phone === 'vendor' ? vendorView() : tenantView();
    (view.phone === 'vendor' ? bindVendor : bindTenant)(body);
  }
  function setRole(r) {
    view.role = r; view.phone = r === 'vendor' ? 'vendor' : 'tenant';
    $('#stage').dataset.role = r;
    $$('#roles button').forEach((b) => b.classList.toggle('on', b.dataset.role === r));
    phone();
  }
  function renderAll() { board(); doors(); phone(); }
  $$('#roles button').forEach((b) => b.addEventListener('click', () => setRole(b.dataset.role)));

  /* ---------- Run demo: the hero, step by step, with real clicks ---------- */
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let running = false;
  async function step(msg, ms = 1500) { const el = $('#demo-step'); el.classList.remove('hide'); el.textContent = msg; await wait(ms); }
  async function tap(sel, root = document) {
    const el = $(sel, root); if (!el) throw new Error('demo: missing ' + sel);
    el.scrollIntoView({ block: 'nearest', inline: 'nearest' }); el.classList.add('demo-target'); await wait(600);
    el.classList.remove('demo-target'); el.click(); await wait(300); return el;
  }
  async function runDemo() {
    if (running) return; running = true; const btn = $('#run-demo'); btn.disabled = true;
    try {
      $$('.modal-back').forEach((m) => m.remove());
      showTab('board'); setRole('tenant'); view.tScreen = 'home'; phone();
      await step('1 / 5 · Aaliyah, the tenant, reports a leak from her phone.');
      await tap('#t-new');
      await tap('[data-photo="leak"]');
      $('#t-trade').value = 'Plumbing'; $('#t-desc').value = 'Water dripping under the bathroom sink, cabinet floor is wet';
      await step('She picks a photo and writes one line. No texting the agent at midnight.', 1300);
      await tap('#t-send');
      const id = view.fresh;
      await step('2 / 5 · It lands in the agent’s board, flashing in the New column.');
      setRole('agent');
      $(`#board .tk[data-id="${id}"]`).scrollIntoView({ block: 'nearest', inline: 'nearest' });
      await step('3 / 5 · Jordan assigns a vendor in three taps: open, pick, confirm.', 1400);
      await tap(`#board .tk[data-id="${id}"]`);
      await tap('.modal .vopt[data-v="v1"]');
      await tap('.modal #confirm');
      await step('4 / 5 · Lone Star Plumbing gets the job and accepts it.');
      setRole('vendor'); await wait(500);
      await tap(`[data-accept="${id}"]`);
      await step('5 / 5 · Aaliyah sees the new status and a dated timeline entry.');
      view.tTicket = id; view.tScreen = 'detail'; setRole('tenant');
      await step('Done. No texts, no spreadsheet. Hive is ' + money(S.pricing.hive) + ' per agent per month.', 2600);
    } catch (e) { toast('Demo stopped: ' + e.message, 'warn'); }
    $('#demo-step').classList.add('hide'); btn.disabled = false; running = false;
  }
  $('#run-demo').addEventListener('click', runDemo);

  header(); renderAll(); ledger();
  showTab = tabs($('#console'));
  window.HIVE_DEMO = { runDemo, state: S, view };
})();
