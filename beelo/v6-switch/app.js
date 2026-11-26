/* V6 Switch: import wizard -> live mini console, 30-min setup, savings, features. */
(function () {
  const { $, $$, esc, money, toast, modal, fmtDate, timeAgo } = UI;
  const M = window.MOCK;
  const P = M.pricing;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let csv = null;        // {headers, rows, sample, name}
  let mapping = [];      // per column field key
  let state = null;      // imported data used by the console
  let demoRunning = false;

  $('#p-hive').textContent = money(P.hive);
  $('#p-bundle').textContent = money(P.bundle);
  const showTab = UI.tabs($('main'));

  /* ---------- CSV ---------- */
  const FIELDS = [
    ['door.address', 'Door: street address'], ['door.unit', 'Door: unit'], ['door.city', 'Door: city'], ['door.zip', 'Door: ZIP'],
    ['door.beds', 'Door: beds'], ['door.baths', 'Door: baths'], ['door.rent', 'Door: monthly rent'], ['door.status', 'Door: status'],
    ['tenant.name', 'Tenant: name'], ['tenant.phone', 'Tenant: phone'], ['tenant.email', 'Tenant: email'], ['tenant.leaseEnd', 'Tenant: lease end'],
    ['owner.name', 'Owner: name'], ['owner.email', 'Owner: email'], ['owner.phone', 'Owner: phone'],
  ];
  const GUESS = [
    [/owner.*mail/i, 'owner.email'], [/owner.*(phone|cell|mobile)/i, 'owner.phone'], [/owner|landlord/i, 'owner.name'],
    [/tenant.*mail|resident.*mail/i, 'tenant.email'], [/tenant.*(phone|cell|mobile)|resident.*phone/i, 'tenant.phone'],
    [/lease.*(to|end|exp)|move.?out/i, 'tenant.leaseEnd'], [/tenant|resident|occupant/i, 'tenant.name'],
    [/status/i, 'door.status'], [/addr|street|property/i, 'door.address'], [/unit|apt|suite/i, 'door.unit'], [/city/i, 'door.city'], [/zip|postal/i, 'door.zip'],
    [/^bd$|bed/i, 'door.beds'], [/^ba$|bath/i, 'door.baths'], [/rent/i, 'door.rent'],
  ];
  const guess = (h) => { const g = GUESS.find(([re]) => re.test(h)); return g ? g[1] : 'skip'; };

  function parseCSV(text) {
    const rows = []; let row = [], f = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(f); f = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(f); rows.push(row); row = []; f = ''; }
      else f += c;
    }
    if (f || row.length) { row.push(f); rows.push(row); }
    const clean = rows.filter((r) => r.some((x) => x.trim()));
    return { headers: (clean.shift() || []).map((h) => h.trim()), rows: clean.map((r) => r.map((x) => x.trim())) };
  }

  function sampleCSV() {
    const H = ['Property Street Address 1', 'Unit', 'City', 'Zip', 'Bd', 'Ba', 'Market Rent', 'Unit Status', 'Tenant', 'Tenant Phone', 'Tenant Email', 'Lease To', 'Owner', 'Owner Email', 'Owner Phone'];
    const q = (v) => (/[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v));
    const lines = [H.join(',')];
    M.doors.forEach((d) => {
      const o = M.byId('owners', d.ownerId) || {};
      const ts = d.tenantIds.length ? d.tenantIds.map((id) => M.byId('tenants', id)) : [{}];
      ts.forEach((t) => lines.push([d.address, d.unit, d.city, d.zip, d.beds, d.baths, d.rent.toFixed(2), d.status,
        t.name || '', t.phone || '', t.email || '', t.leaseEnd || '', o.name || '', o.email || '', o.phone || ''].map(q).join(',')));
    });
    return lines.join('\n');
  }

  /* ---------- wizard ---------- */
  function step(n) {
    [1, 2, 3, 4].forEach((i) => $('#st-' + i).classList.toggle('hide', i !== n));
    $$('#steps li').forEach((li) => { const s = +li.dataset.s; li.className = s === n ? 'on' : s < n ? 'past' : ''; });
  }

  function loadCSV(text, name, sample) {
    const p = parseCSV(text);
    if (!p.headers.length || !p.rows.length) { toast('That file has no rows we can read. Try a CSV export.', 'danger'); return false; }
    csv = { ...p, name, sample };
    mapping = p.headers.map(guess);
    $('#pv-title').textContent = name;
    $('#pv-badge').innerHTML = sample ? UI.sampleBadge() : '<span class="badge ok">Your file</span>';
    $('#pv-table').innerHTML = '<thead><tr>' + p.headers.map((h) => `<th>${esc(h)}</th>`).join('') + '</tr></thead><tbody>' +
      p.rows.slice(0, 8).map((r) => '<tr>' + p.headers.map((_, i) => `<td>${esc(r[i] || '')}</td>`).join('') + '</tr>').join('') + '</tbody>';
    $('#pv-more').textContent = `${p.rows.length} rows, ${p.headers.length} columns` + (p.rows.length > 8 ? `. Showing the first 8.` : '.');
    $('#preview').classList.remove('hide');
    $('#preview').classList.add('flash');
    setTimeout(() => $('#preview').classList.remove('flash'), 1000);
    return true;
  }

  function renderMap() {
    const opts = (sel) => '<option value="skip">Skip this column</option>' + ['Doors', 'Tenants', 'Owners'].map((g) =>
      `<optgroup label="${g}">` + FIELDS.filter(([k]) => k.startsWith(g.toLowerCase().slice(0, -1))).map(([k, l]) =>
        `<option value="${k}"${k === sel ? ' selected' : ''}>${esc(l)}</option>`).join('') + '</optgroup>').join('');
    $('#map').innerHTML = csv.headers.map((h, i) => `<div class="map-row${mapping[i] === 'skip' ? ' skip' : ''}">
      <div class="col">${esc(h)}</div><div class="eg">e.g. ${esc(csv.rows[0][i] || '(blank)')}</div>
      <select class="input" data-i="${i}" aria-label="Map ${esc(h)}">${opts(mapping[i])}</select></div>`).join('');
    updateMapCount();
  }
  function updateMapCount() {
    const n = mapping.filter((m) => m !== 'skip').length;
    $('#map-count').textContent = `(${n} of ${mapping.length} columns)`;
    $('#start-import').disabled = !mapping.includes('door.address');
  }
  $('#map').addEventListener('change', (e) => {
    const s = e.target.closest('select'); if (!s) return;
    mapping[+s.dataset.i] = s.value; s.parentNode.classList.toggle('skip', s.value === 'skip');
    updateMapCount(); toast('Mapped "' + csv.headers[+s.dataset.i] + '"');
  });

  function buildFromCSV() {
    const doors = new Map(), tenants = new Map(), owners = new Map();
    csv.rows.forEach((r) => {
      const v = {}; mapping.forEach((k, i) => { if (k !== 'skip') v[k] = r[i] || ''; });
      if (!v['door.address']) return;
      let oid = null;
      if (v['owner.name'] || v['owner.email']) {
        const ok = (v['owner.email'] || v['owner.name']).toLowerCase();
        if (!owners.has(ok)) owners.set(ok, { id: 'o' + (owners.size + 1), name: v['owner.name'] || v['owner.email'], email: v['owner.email'], phone: v['owner.phone'], doorIds: [] });
        oid = owners.get(ok).id;
      }
      const dk = (v['door.address'] + '|' + (v['door.unit'] || '')).toLowerCase();
      if (!doors.has(dk)) {
        const d = { id: 'd' + (doors.size + 1), address: v['door.address'], unit: v['door.unit'] || '', city: v['door.city'] || '', zip: v['door.zip'] || '',
          beds: v['door.beds'], baths: v['door.baths'], rent: parseFloat(String(v['door.rent'] || '').replace(/[$,]/g, '')) || 0,
          status: (v['door.status'] || '').toLowerCase() || 'occupied', ownerId: oid, tenantIds: [] };
        doors.set(dk, d);
        if (oid) [...owners.values()].find((o) => o.id === oid).doorIds.push(d.id);
      }
      const d = doors.get(dk);
      if (v['tenant.name']) {
        const tk = v['tenant.name'].toLowerCase() + '|' + d.id;
        if (!tenants.has(tk)) { const t = { id: 't' + (tenants.size + 1), name: v['tenant.name'], phone: v['tenant.phone'], email: v['tenant.email'], leaseEnd: v['tenant.leaseEnd'], doorId: d.id }; tenants.set(tk, t); d.tenantIds.push(t.id); }
      }
    });
    return { doors: [...doors.values()], tenants: [...tenants.values()], owners: [...owners.values()], tickets: [] };
  }

  async function runImport() {
    step(3);
    const built = buildFromCSV();
    state = csv.sample ? structuredClone({ doors: M.doors, tenants: M.tenants, owners: M.owners, tickets: M.tickets }) : built;
    const openT = state.tickets.filter(isOpen).length;
    const phases = [
      `Read ${csv.rows.length} rows from ${csv.name}`,
      `Created ${built.doors.length} doors`,
      `Linked ${built.tenants.length} tenants to their doors`,
      `Linked ${built.owners.length} owners to their doors`,
      openT ? `Carried over ${openT} open work orders` : 'No open work orders in this file',
    ];
    $('#imp-title').textContent = 'Importing…'; $('#imp-log').innerHTML = ''; $('#imp-done').classList.add('hide');
    $('#imp-fill').style.width = '0';
    for (let i = 0; i < phases.length; i++) {
      await sleep(450);
      $('#imp-fill').style.width = ((i + 1) / phases.length * 100) + '%';
      $('#imp-log').insertAdjacentHTML('beforeend', `<li><span class="badge ok">Done</span> ${esc(phases[i])}</li>`);
    }
    $('#imp-title').textContent = 'Import complete';
    const pl = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
    $('#imp-summary').textContent = `${pl(built.doors.length, 'door')}, ${pl(built.tenants.length, 'tenant')}, ${pl(built.owners.length, 'owner')} imported`;
    $('#imp-done').classList.remove('hide');
    setDone('import', true);
    toast($('#imp-summary').textContent, 'ok');
  }

  /* ---------- console ---------- */
  const isOpen = (t) => !['completed', 'closed'].includes(t.status);
  const byId = (col, id) => state[col].find((x) => x.id === id);
  const label = (d) => d ? d.address + (d.unit ? ', ' + d.unit : '') + (d.city ? ', ' + d.city : '') : 'Unknown door';
  const URG = { emergency: 'danger', high: 'warn', normal: 'info', low: '' };
  const STAT = M.ticketStatuses;

  function renderConsole() {
    const open = state.tickets.filter(isOpen);
    const occ = state.doors.filter((d) => d.tenantIds.length).length;
    const rent = state.doors.reduce((s, d) => s + (d.tenantIds.length ? d.rent : 0), 0);
    $('#cs-badge').innerHTML = csv && csv.sample ? UI.sampleBadge() : '<span class="badge ok">From your file</span>';
    $('#cs-kpis').innerHTML = [[state.doors.length, 'Doors'], [occ + ' / ' + state.doors.length, 'Occupied'], [open.length, 'Open tickets'], [money(rent), 'Monthly rent roll']]
      .map(([v, l]) => `<div class="kpi"><div class="val">${esc(v)}</div><div class="lbl">${l}</div></div>`).join('');
    const q = ($('#door-q').value || '').toLowerCase();
    const doors = state.doors.filter((d) => !q || (label(d) + ' ' + d.tenantIds.map((id) => byId('tenants', id).name).join(' ')).toLowerCase().includes(q));
    $('#door-list').innerHTML = doors.map((d) => {
      const n = open.filter((t) => t.doorId === d.id).length;
      const st = d.tenantIds.length ? 'ok' : 'warn';
      return `<li class="door" data-door="${d.id}"><div><div class="addr">${esc(label(d))}</div><div class="tiny muted">${esc(d.tenantIds.map((id) => byId('tenants', id).name).join(', ') || 'No tenant')} &middot; ${money(d.rent)}/mo</div></div>
        <div class="row"><span class="badge ${st}">${esc(d.status)}</span>${n ? `<span class="badge danger">${n} open</span>` : ''}</div></li>`;
    }).join('') || '<li class="muted small">No doors match.</li>';
    const rank = { emergency: 0, high: 1, normal: 2, low: 3 };
    $('#tix').innerHTML = open.sort((a, b) => rank[a.urgency] - rank[b.urgency]).map((t) => {
      const nx = STAT[STAT.indexOf(t.status) + 1];
      return `<li class="tk"><div class="row between"><span class="t">${esc(t.title)}</span><span class="badge ${URG[t.urgency]}">${esc(t.urgency)}</span></div>
        <div class="tiny muted">${esc(t.id)} &middot; ${esc(label(byId('doors', t.doorId)))} &middot; ${timeAgo(t.openedAt)}</div>
        <div class="row"><span class="badge info">${esc(t.status)}</span><button class="btn sm" data-adv="${t.id}">Move to ${esc(nx)}</button><button class="btn sm ghost" data-view="${t.id}">Details</button></div></li>`;
    }).join('') || '<li class="muted small">No open tickets. Tenants can text your Hive number to open one.</li>';
  }

  function openDoor(id) {
    const d = byId('doors', id), o = d.ownerId && byId('owners', d.ownerId);
    const ts = d.tenantIds.map((t) => byId('tenants', t));
    const tk = state.tickets.filter((t) => t.doorId === id && isOpen(t));
    modal(`<h3>${esc(label(d))}</h3>
      <p class="small">${esc(d.beds || '?')} bd / ${esc(d.baths || '?')} ba &middot; Rent ${money(d.rent)} &middot; <span class="badge">${esc(d.status)}</span></p>
      <p class="small"><strong>Tenant:</strong> ${ts.map((t) => esc(t.name) + (t.phone ? ' (' + esc(t.phone) + ')' : '')).join(', ') || 'Vacant'}</p>
      <p class="small"><strong>Owner:</strong> ${o ? esc(o.name) + (o.email ? ' &middot; ' + esc(o.email) : '') : 'Not set'}</p>
      <p class="small"><strong>Open tickets:</strong> ${tk.map((t) => esc(t.title)).join('; ') || 'None'}</p>
      <div class="row"><button class="btn" id="m-new">New ticket here</button><button class="btn ghost" data-close>Close</button></div>`,
    { onOpen: (el, close) => $('#m-new', el).addEventListener('click', () => { close(); newTicket(id); }) });
  }

  function viewTicket(id) {
    const t = byId('tickets', id);
    modal(`<div class="row between"><h3>${esc(t.title)}</h3><span class="badge ${URG[t.urgency]}">${esc(t.urgency)}</span></div>
      <p class="small muted">${esc(t.id)} &middot; ${esc(label(byId('doors', t.doorId)))} &middot; opened ${fmtDate(t.openedAt)}</p>
      <p class="small">${esc(t.description || '')}</p>
      ${(t.photos || []).slice(0, 1).map((p) => UI.photo(p.kind, p.label)).join('')}
      <ul class="list small">${(t.timeline || []).map((e) => `<li><strong>${esc(e.who)}</strong>: ${esc(e.text)} <span class="muted tiny">${timeAgo(e.at)}</span></li>`).join('')}</ul>
      <button class="btn block" data-close>Close</button>`);
  }

  function advance(id) {
    const t = byId('tickets', id); const nx = STAT[STAT.indexOf(t.status) + 1];
    t.status = nx; t.updatedAt = new Date().toISOString();
    (t.timeline = t.timeline || []).push({ at: t.updatedAt, who: M.agent.name, text: 'Moved to ' + nx });
    toast(`${t.id} moved to ${nx}` + (isOpen(t) ? '' : '. Off your open list.'), 'ok');
    renderConsole();
  }

  function newTicket(doorId) {
    modal(`<h3>New ticket</h3>
      <label class="field"><span>Door</span><select class="input" id="nt-door">${state.doors.map((d) => `<option value="${d.id}"${d.id === doorId ? ' selected' : ''}>${esc(label(d))}</option>`).join('')}</select></label>
      <label class="field"><span>What is wrong?</span><input class="input" id="nt-title" placeholder="e.g. AC not cooling upstairs"></label>
      <label class="field"><span>Urgency</span><select class="input" id="nt-urg"><option>low</option><option selected>normal</option><option>high</option><option>emergency</option></select></label>
      <div class="row"><button class="btn" id="nt-save">Open ticket</button><button class="btn ghost" data-close>Cancel</button></div>`, {
      onOpen: (el, close) => $('#nt-save', el).addEventListener('click', () => {
        const title = $('#nt-title', el).value.trim() || 'General maintenance request';
        const now = new Date().toISOString(); const d = byId('doors', $('#nt-door', el).value);
        const tid = 'HV-' + (2000 + state.tickets.length);
        state.tickets.unshift({ id: tid, title, urgency: $('#nt-urg', el).value, status: 'new', doorId: d.id, openedAt: now, updatedAt: now,
          description: title + '. Opened by ' + M.agent.name + '.', photos: [], timeline: [{ at: now, who: M.agent.name, text: 'Opened ticket' }] });
        close(); renderConsole(); toast(tid + ' opened for ' + label(d), 'ok');
      }),
    });
  }

  $('#door-list').addEventListener('click', (e) => { const li = e.target.closest('[data-door]'); if (li) openDoor(li.dataset.door); });
  $('#tix').addEventListener('click', (e) => {
    const a = e.target.closest('[data-adv]'), v = e.target.closest('[data-view]');
    if (a) advance(a.dataset.adv); if (v) viewTicket(v.dataset.view);
  });
  $('#door-q').addEventListener('input', renderConsole);
  $('#new-ticket').addEventListener('click', () => newTicket());

  /* ---------- wizard wiring ---------- */
  function useSample() { loadCSV(sampleCSV(), 'rent-roll-export.csv', true); toast('Loaded a sample rent roll: 23 rows', 'ok'); }
  function toMap() { if (!csv) return toast('Choose a file first', 'warn'); renderMap(); step(2); }
  function toConsole() { renderConsole(); step(4); }
  $('#use-sample').addEventListener('click', useSample);
  $('#to-map').addEventListener('click', toMap);
  $('#back-1').addEventListener('click', () => step(1));
  $('#start-import').addEventListener('click', () => runImport());
  $('#to-console').addEventListener('click', toConsole);
  $('#restart').addEventListener('click', () => { step(1); toast('Pick another file or the sample'); });
  const readFile = (f) => {
    if (!f) return;
    if (!/\.csv$/i.test(f.name) && f.type !== 'text/csv') return toast('Please use a .csv file', 'warn');
    const r = new FileReader();
    r.onload = () => { if (loadCSV(String(r.result), f.name, false)) toast('Read ' + f.name, 'ok'); };
    r.readAsText(f);
  };
  $('#file').addEventListener('change', (e) => readFile(e.target.files[0]));
  const drop = $('#drop');
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (e) => readFile(e.dataTransfer.files[0]));

  /* ---------- 30-minute setup ---------- */
  const SETUP = [
    { k: 'import', m: 5, t: 'Import doors, tenants and owners', d: 'Drop your rent-roll CSV in step 1.' },
    { k: 'stripe', m: 4, t: 'Connect your own Stripe account', d: 'Card payments run through your Stripe. BEELO is only the pipe.' },
    { k: 'twilio', m: 3, t: 'Claim your local Twilio number', d: 'One number for you, not one per door.' },
    { k: 'owners', m: 5, t: 'Invite owners', d: 'They approve repairs and see bills you send. No bill from us.' },
    { k: 'tenants', m: 4, t: 'Invite tenants', d: 'They text or tap to open tickets with photos.' },
    { k: 'vendors', m: 4, t: 'Add your vendors', d: 'Your plumber, HVAC and handyman list.' },
    { k: 'quiet', m: 2, t: 'Set quiet hours', d: '9 pm to 8 am. Emergencies still ring through.' },
    { k: 'emerg', m: 3, t: 'Review emergency rules', d: 'Broadcast to several vendors. First to accept wins.' },
  ];
  const done = new Set();
  function setDone(k, on) { on ? done.add(k) : done.delete(k); renderSetup(); }
  function renderSetup() {
    const total = SETUP.reduce((s, x) => s + x.m, 0), got = SETUP.filter((x) => done.has(x.k)).reduce((s, x) => s + x.m, 0);
    $('#mins').textContent = `${got} of ${total} min done`;
    $('#setup-fill').style.width = (got / total * 100) + '%';
    $('#checklist').innerHTML = SETUP.map((x) => `<li class="chk${done.has(x.k) ? ' done' : ''}">
      <input type="checkbox" data-k="${x.k}"${done.has(x.k) ? ' checked' : ''} aria-label="${esc(x.t)}">
      <div class="body"><div class="ttl">${esc(x.t)} <span class="badge">${x.m} min</span></div><div class="small muted">${esc(x.d)}</div></div>
      <button class="btn sm ${done.has(x.k) ? 'ghost' : ''}" data-do="${x.k}">${done.has(x.k) ? 'Review' : 'Do it'}</button></li>`).join('');
    if (got === total && !renderSetup.cheered) { renderSetup.cheered = true; toast('All set. You are live on Hive.', 'ok'); }
  }
  const owners = () => (state || M).owners;
  const SETUP_MODAL = {
    stripe: () => `<h3>Connect Stripe</h3><p class="small">Tenants and owners who pay by card pay through <strong>your</strong> Stripe account. The payer sees the card fee before the total, for example ${money(1000)} rent shows a ${money(M.cardFeeFor(1000))} card fee first.</p><p class="small">Paying vendors or owners from your trust account: ${UI.soonBadge()}</p>`,
    twilio: () => `<h3>Pick your local number</h3><p class="small">Alerts repeat until you check them. One number for all your doors.</p>` +
      ['(469) 555-0199', '(214) 555-0177', '(972) 555-0163'].map((n, i) => `<label class="row small"><input type="radio" name="num"${i ? '' : ' checked'}> ${n}</label>`).join(''),
    owners: () => `<h3>Invite owners</h3><p class="small">Each owner gets an email and a text with a link to their portal.</p><ul class="list small">${owners().map((o) => `<li>${esc(o.name)} <span class="muted">${esc(o.email || '')}</span></li>`).join('')}</ul>`,
    tenants: () => `<h3>Invite tenants</h3><p class="small">${(state || M).tenants.length} tenants get this text:</p><div class="sms out">Hi, this is ${esc(M.agent.name)}. Repairs now go through my Hive line ${esc(M.agent.twilioNumber)}. Text a photo any time.</div>`,
    vendors: () => `<h3>Your vendors</h3><ul class="list small">${M.vendors.map((v) => `<li>${esc(v.name)} <span class="muted">${esc(v.trade || '')}</span></li>`).join('')}</ul>`,
    quiet: () => `<h3>Quiet hours</h3><p class="small">No texts or calls from 9 pm to 8 am, except emergencies like flooding, no heat, or a gas smell.</p>`,
    emerg: () => `<h3>Emergency rules</h3><ul class="list small"><li>15 min for a vendor to respond</li><li>30 min to accept the job</li><li>24 h to fix</li></ul><p class="small">Emergencies go to several vendors at once. The first to accept gets the job.</p>`,
  };
  $('#checklist').addEventListener('click', (e) => {
    const c = e.target.closest('input[data-k]'), b = e.target.closest('[data-do]');
    if (c) { setDone(c.dataset.k, c.checked); toast(c.checked ? 'Checked off' : 'Unchecked'); }
    if (b) {
      const k = b.dataset.do;
      if (k === 'import') { showTab('import'); return; }
      modal(SETUP_MODAL[k]() + `<div class="row"><button class="btn" id="sm-ok">Mark done</button><button class="btn ghost" data-close>Later</button></div>`,
        { onOpen: (el, close) => $('#sm-ok', el).addEventListener('click', () => { close(); setDone(k, true); toast('Done: ' + SETUP.find((x) => x.k === k).t, 'ok'); }) });
    }
  });
  renderSetup();

  /* ---------- savings ---------- */
  function renderCalc() {
    const raw = $('#today').value, v = parseFloat(raw);
    if (raw === '' || isNaN(v) || v < 0) { $('#calc').innerHTML = '<p class="small muted">Type your monthly cost to compare.</p>'; return; }
    $('#calc').innerHTML = [['Hive', P.hive], ['BEELO + Hive', P.bundle]].map(([n, p]) => {
      const diff = v - p, cls = diff >= 0 ? 'save' : 'more';
      return `<div class="card flat"><div class="small muted">${n} at ${money(p)}/mo</div>
        <div class="val ${cls}">${diff >= 0 ? 'Save ' + money(diff) : money(-diff) + ' more'}<span class="small"> /mo</span></div>
        <div class="small ${cls}">${diff >= 0 ? 'Save ' + money(diff * 12) : money(-diff * 12) + ' more'} per year</div></div>`;
    }).join('');
  }
  $('#today').addEventListener('input', renderCalc); renderCalc();

  /* ---------- features ---------- */
  const Y = '<span class="yes">Yes</span>', N = '<span class="no">No</span>';
  $('#feat').innerHTML = `<thead><tr><th>Feature</th><th>Hive ${money(P.hive)}</th><th>Both ${money(P.bundle)}</th></tr></thead><tbody>` + [
    ['CSV import from your current software', Y, Y], ['Tenant tickets with photos', Y, Y], ['Owner approvals and spend limits', Y, Y],
    ['Emergency broadcast to vendors, first to accept wins', Y, Y], ['One local Twilio number, alerts repeat until checked', Y, Y],
    ['Bill owners through your own Stripe, with payment history', Y, Y], ['Property value estimates (not appraisals)', Y, Y],
    ['BEELO lead follow-up and listing tools (sample MLS data)', N, Y],
    ['Pay vendors or owners from trust account', UI.soonBadge(), UI.soonBadge()],
  ].map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('') + '</tbody>';

  /* ---------- run demo ---------- */
  $('#run-demo').addEventListener('click', async () => {
    if (demoRunning) return; demoRunning = true; const b = $('#run-demo'); b.disabled = true;
    try {
      showTab('import'); step(1); window.scrollTo({ top: $('#tabs').offsetTop - 70, behavior: 'smooth' });
      toast('Step 1: load a rent-roll export'); await sleep(900); useSample(); await sleep(1600);
      toast('Step 2: columns are pre-mapped'); toMap(); await sleep(1800);
      toast('Step 3: import'); await runImport(); await sleep(1200);
      toast('Step 4: your live console'); toConsole(); await sleep(1300);
      const first = $('[data-adv]'); if (first) { first.classList.add('pulse'); await sleep(900); first.click(); }
      await sleep(1200); showTab('setup'); toast('Next: finish your 30-minute setup', 'ok');
    } finally { demoRunning = false; b.disabled = false; }
  });
})();
