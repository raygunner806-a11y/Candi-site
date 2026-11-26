/* V5 After-Hours Emergency: burst pipe at 2:14 am, played on an accelerated clock. */
(function () {
  const { $, $$, esc, money, toast, photo } = UI;
  const M = Object.fromEntries(Object.entries(window.MOCK).filter(([, v]) => typeof v !== 'function').map(([k, v]) => [k, structuredClone(v)]));
  const byId = (col, id) => M[col].find((x) => x.id === id);
  const agent = M.agent;
  const ticket = M.tickets.find((t) => t.id === 'HV-1042');
  const door = byId('doors', ticket.doorId);
  const tenant = byId('tenants', ticket.tenantId);
  const owner = byId('owners', ticket.ownerId);
  const plumbers = M.vendors.filter((v) => v.trade === 'Plumbing' && v.emergency).slice(0, 3);
  const T = M.emergencyTimers; // {responseMin, acceptMin, fixHours}
  const REPEAT = M.alertRules.repeatEveryMin;
  const START_MIN = 2 * 60 + 14; // 2:14 am
  const MS_PER_MIN = 300; // 1 sim-minute = 0.3 s
  const MAKE_SAFE = 285, REPAIR = 740;
  const addr = window.MOCK.doorLabel(door);
  const held = M.tickets.filter((t) => t.status === 'new' && t.urgency !== 'emergency').length;

  let S, timer = null, speed = 1, thread = 'agent';

  function fresh() {
    return {
      t: 0, started: false, done: false, fired: new Set(), ack: false, alerts: 0,
      threads: { agent: [], vendors: [], tenant: [], owner: [] }, unread: new Set(),
      vendors: plumbers.map((v) => ({ id: v.id, name: v.name, rating: v.rating, state: 'idle', note: '' })),
      winner: null, broadcastAt: null, acceptedAt: null, fixedAt: null,
      status: 'none', score: 0, ownerState: 'idle', closeState: 'idle', log: [], ff: false,
    };
  }

  /* ---------- time helpers ---------- */
  const clockOf = (t) => {
    const m = Math.floor(START_MIN + t), h = Math.floor(m / 60) % 24, mm = String(m % 60).padStart(2, '0');
    return `${h % 12 || 12}:${mm} ${h < 12 ? 'am' : 'pm'}`;
  };
  const mmss = (mins) => { const s = Math.max(0, Math.round(mins * 60)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const hms = (mins) => { const s = Math.max(0, Math.round(mins * 60)); return `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

  /* ---------- actions ---------- */
  function sms(th, dir, text, extra = '') {
    S.threads[th].push({ dir, text, at: clockOf(S.t), extra });
    if (th !== thread) S.unread.add(th);
  }
  function log(text) { S.log.unshift({ at: clockOf(S.t), text }); }

  function alertAgent() {
    S.alerts++;
    const n = S.alerts;
    sms('agent', 'in', `EMERGENCY ${n > 1 ? `(repeat ${n - 1}) ` : ''}${ticket.id}: burst pipe at ${addr}. Tenant ${tenant.name} sent 2 photos. AI urgency ${ticket.aiUrgencyScore}/100. Plumbers are being called now. Reply OK to acknowledge.`, 'alarm');
    log(n === 1 ? `Texted Jordan from ${agent.twilioNumber} (quiet hours bypassed: emergency)` : `No reply yet. Repeated alert to Jordan (#${n})`);
    toast(n === 1 ? 'Emergency alert sent to Jordan' : `Alert repeated (#${n}): still not acknowledged`, 'danger');
  }

  function acknowledge(auto) {
    if (S.ack || !S.started) return;
    S.ack = true;
    sms('agent', 'out', 'OK');
    const w = S.winner ? `${vName(S.winner)} accepted at ${clockOf(S.acceptedAt)} and is on the way.` : 'Plumbers are still being called.';
    sms('agent', 'in', `Thanks, Jordan. ${w} Nothing else needed from you tonight. We'll text the owner and tenant.`);
    log(`Jordan acknowledged${auto ? ' (auto in demo after 2 repeats)' : ''}. Repeats stopped.`);
    toast('Acknowledged. Repeats stopped.', 'ok');
    render();
  }

  function vName(id) { return S.vendors.find((v) => v.id === id).name; }
  function setV(id, state, note) { const v = S.vendors.find((x) => x.id === id); v.state = state; v.note = note; }

  function accept(id) {
    if (id === S.winner) return;
    if (S.winner) {
      setV(id, 'released', 'Replied after job filled, released');
      sms('vendors', 'out', `${vName(id)}: YES`);
      sms('vendors', 'in', `To ${vName(id)}: Thanks, this job was already taken. You're released, no charge.`);
      log(`${vName(id)} replied late. Told the job is filled.`);
      return;
    }
    S.winner = id; S.acceptedAt = S.t; S.status = 'assigned';
    setV(id, 'won', `Accepted at ${clockOf(S.t)}`);
    sms('vendors', 'out', `${vName(id)}: YES, 20 min out`);
    sms('vendors', 'in', `To ${vName(id)}: It's yours. ${addr}. Tenant ${tenant.name} ${tenant.phone}. Main shutoff is at the curb box. 24 h fix clock starts now.`);
    S.vendors.filter((v) => v.id !== id && v.state !== 'released').forEach((v) => {
      setV(v.id, 'released', 'Released');
      sms('vendors', 'in', `To ${v.name}: Job ${ticket.id} was taken. You're released. Thanks for standing by.`);
    });
    sms('tenant', 'in', `${vName(id)} accepted your emergency and should arrive around ${clockOf(S.t + 20)}. If you can, turn off water at the curb box.`);
    log(`${vName(id)} accepted first and won the job. Other plumbers released.`);
    toast(`${vName(id)} accepted. Others released.`, 'ok');
  }

  function ownerApprove(auto) {
    if (S.ownerState !== 'pending') return;
    S.ownerState = 'approved';
    sms('owner', 'out', 'Approved. Thanks for handling it.');
    sms('owner', 'in', `Thanks. Full repair of ${money(REPAIR)} approved. We'll send before/after photos when done.`);
    log(`${owner.name} approved ${money(REPAIR)}${auto ? ' (auto in demo)' : ''}`);
    toast('Owner approved the repair', 'ok');
    render();
  }

  function tenantConfirm(auto) {
    if (S.closeState !== 'asked') return;
    S.closeState = 'confirmed'; S.status = 'completed'; S.done = true;
    sms('tenant', 'out', 'YES all good, floor is drying. Thank you!!');
    sms('tenant', 'in', 'Glad to hear it. Ticket closed. Reply anytime if anything changes.');
    sms('agent', 'in', `Morning summary: ${ticket.id} fixed at ${clockOf(S.fixedAt)} by ${vName(S.winner)}. Tenant confirmed. Owner approved ${money(REPAIR)}. You slept through it.`);
    log(`${tenant.name} confirmed the fix${auto ? ' (auto in demo)' : ''}. Ticket completed.`);
    toast('Tenant confirmed. Ticket complete.', 'ok');
    stop(); render();
  }

  /* ---------- script (sim minutes after 2:14 am) ---------- */
  const [V1, V2, V3] = plumbers.map((v) => v.id);
  const SCRIPT = [
    [0, () => {
      S.status = 'new'; S.score = ticket.aiUrgencyScore;
      sms('tenant', 'out', 'pipe burst in the laundry room, water everywhere. photos attached');
      sms('tenant', 'in', `Got it, ${tenant.name.split(' ')[0]}. This is an emergency and we're calling plumbers now. You'll get a text when one accepts.`);
      log(`${tenant.name} opened ${ticket.id} with 2 photos. AI urgency ${ticket.aiUrgencyScore}/100: emergency.`);
      alertAgent();
    }],
    [1, () => {
      S.broadcastAt = S.t;
      S.vendors.forEach((v) => { v.state = 'pinged'; v.note = 'Pinged'; });
      sms('vendors', 'in', `EMERGENCY plumbing job (${ticket.id}), Frisco 75034: burst pipe, water on floor. Broadcast to 3 plumbers. First to reply YES gets it.`);
      log(`Broadcast to ${plumbers.map((p) => p.name).join(', ')}. 15 min response clock running.`);
    }],
    [3, () => { if (S.vendors.find((v) => v.id === V3).state !== 'pinged') return; setV(V3, 'viewed', 'Opened text'); log(`${vName(V3)} opened the text`); }],
    [REPEAT, () => { if (!S.ack) alertAgent(); }],
    [7, () => accept(V1)], // wins unless a vendor was tapped manually first
    [9, () => accept(V2)],
    [REPEAT * 2, () => { if (!S.ack) alertAgent(); }],
    [REPEAT * 2 + 1, () => { if (!S.ack) acknowledge(true); }],
    [27, () => {
      S.status = 'in-progress';
      sms('vendors', 'out', `${vName(S.winner)}: On site. Water shut off at curb. Before photo uploaded.`);
      log(`${vName(S.winner)} on site. Before photo added.`);
    }],
    [38, () => {
      S.ownerState = 'pending';
      sms('owner', 'in', `Hive for ${agent.name}: Emergency at ${door.address}. Burst pipe, plumber on site. Make-safe ${money(MAKE_SAFE)} is under your ${money(owner.spendLimit)} limit and was done. Full repair quote ${money(REPAIR)} is over your limit. Reply YES to approve.`);
      log(`Make-safe ${money(MAKE_SAFE)} within ${owner.name}'s limit. Repair quote ${money(REPAIR)} exceeds ${money(owner.spendLimit)}: owner notified.`);
      toast('Owner notified: quote over spend limit', 'warn');
    }],
    [46, () => ownerApprove(true)],
    [128, () => {
      S.fixedAt = S.t; S.closeState = 'asked';
      sms('vendors', 'out', `${vName(S.winner)}: Repair done. Replaced 3 ft of burst copper line, pressure tested. After photo uploaded.`);
      sms('tenant', 'in', `${vName(S.winner)} says the repair is done. Reply YES if water is working and the leak has stopped.`);
      log(`Repair finished with after photo. Fix clock met in ${hms(S.t - S.acceptedAt)} of 24 h.`);
    }],
    [131, () => tenantConfirm(true)],
  ];

  /* ---------- clock ---------- */
  function tick() {
    const next = SCRIPT.find((e, i) => !S.fired.has(i));
    S.ff = !!next && next[0] - S.t > 8 && S.ownerState !== 'pending';
    S.t += (100 / MS_PER_MIN) * speed * (S.ff ? 8 : 1);
    let changed = false;
    SCRIPT.forEach((e, i) => { if (!S.fired.has(i) && e[0] <= S.t) { S.fired.add(i); e[1](); changed = true; } });
    if (changed) render(); else renderLive();
  }
  function start() {
    if (S.started) { toast('Already running. Press Reset to start over.', 'warn'); return; }
    S.started = true; render();
    timer = setInterval(tick, 100);
  }
  function stop() { clearInterval(timer); timer = null; }
  function reset() { stop(); S = fresh(); render(); }

  /* ---------- render ---------- */
  function renderLive() {
    $('#clock').textContent = clockOf(S.t);
    $('#ph-time').textContent = clockOf(S.t).replace(/ (am|pm)/, '');
    $('#speednote').innerHTML = `Accelerated clock: 1 sim-minute = ${(0.3 / speed).toFixed(2).replace(/0$/, '')} s.` + (S.ff && S.started && !S.done ? ' <span class="ff">⏩ Fast-forwarding a quiet stretch</span>' : ' Long quiet stretches fast-forward.');
    const tm = $('#timers'); if (tm) tm.innerHTML = timersHTML();
  }

  function timerBox(label, total, startAt, endAt, fmt) {
    if (startAt == null) return `<div class="timer"><div class="tiny muted">${label}</div><div class="t">${fmt(total)}</div><div class="bar"><i style="width:100%"></i></div><div class="tiny muted">Not started</div></div>`;
    const used = (endAt ?? S.t) - startAt, left = total - used, met = endAt != null;
    return `<div class="timer ${met ? 'met' : ''}"><div class="tiny muted">${label}</div><div class="t">${fmt(met ? total - used : left)}</div>
      <div class="bar"><i style="width:${Math.max(0, (left / total) * 100)}%"></i></div>
      <div class="tiny">${met ? `<span class="badge ok">Met in ${used < 60 ? Math.round(used) + ' min' : hms(used)}</span>` : '<span class="muted">Counting down</span>'}</div></div>`;
  }
  function timersHTML() {
    return timerBox(`Response · ${T.responseMin} min`, T.responseMin, S.broadcastAt, S.acceptedAt, mmss)
      + timerBox(`Accept · ${T.acceptMin} min`, T.acceptMin, S.broadcastAt, S.acceptedAt, mmss)
      + timerBox(`Fix · ${T.fixHours} h`, T.fixHours * 60, S.acceptedAt, S.fixedAt, hms);
  }

  function renderTicket() {
    const el = $('#ticket-card');
    if (!S.started) {
      el.innerHTML = `<h3>Tonight, so far</h3><p class="idle">All quiet at ${esc(door.address)}. It's 2:14 am.</p>
        <div class="quiet">Quiet hours (9 pm–8 am) are on. ${held} non-urgent tickets are held until 8:00 am. Emergencies always break through.</div>`;
      return;
    }
    el.innerHTML = `<div class="row between"><h3>${ticket.id} · ${esc(ticket.title)}</h3><span class="badge danger">Emergency</span></div>
      <p class="small muted">${esc(addr)} · Tenant ${esc(tenant.name)} · Opened ${clockOf(0)} · Status: <b>${S.status}</b></p>
      <div class="photos">${photo('pipe', 'Tenant photo 2:13 am')}${photo('leak', 'Laundry floor 2:13 am')}</div>
      <div class="row" style="margin-top:var(--sp-3)"><div class="score">${S.score}</div><div style="flex:1;min-width:160px">
        <div class="tiny muted">AI urgency score (out of 100)</div><div class="meter"><i style="width:${S.score}%"></i></div>
        <div class="tiny muted">Why: "burst" + "water everywhere", standing water in photo, occupied unit at night.</div></div></div>
      <div class="quiet" style="margin-top:var(--sp-3)">Quiet hours 9 pm–8 am apply to everything except emergencies. This one broke through. ${held} non-urgent tickets still wait for 8:00 am.</div>
      <div class="row" style="margin-top:var(--sp-3)">${S.ack ? '<span class="badge ok">Acknowledged by Jordan</span>'
        : `<span class="badge danger pulse">Repeating every ${REPEAT} min until acknowledged (${S.alerts} sent)</span><button class="btn sm danger" data-act="ack">Acknowledge</button>`}</div>`;
  }

  function renderRace() {
    const el = $('#race-card');
    const badge = { idle: '<span class="badge soon">Standing by</span>', pinged: '<span class="badge info pulse">Pinged</span>', viewed: '<span class="badge warn">Viewed</span>', won: '<span class="badge ok">Won the job</span>', released: '<span class="badge soon">Released</span>' };
    el.innerHTML = `<div class="row between"><h3>Vendor broadcast race</h3><span class="tiny muted">First to accept wins</span></div>
      <ul class="vendors">${S.vendors.map((v) => `<li class="${v.state === 'won' ? 'won' : v.state === 'released' ? 'rel' : ''}">
        <span><b>${esc(v.name)}</b> <span class="tiny muted">★ ${v.rating} · ${esc(v.note || 'Emergency plumber')}</span></span>
        <span class="row">${badge[v.state]}${v.state === 'pinged' || v.state === 'viewed' ? `<button class="btn sm" data-act="accept" data-id="${v.id}">Accept as vendor</button>` : ''}</span></li>`).join('')}</ul>
      <div class="timers" id="timers">${timersHTML()}</div>`;
  }

  function renderOwner() {
    const el = $('#owner-card');
    const head = `<div class="row between"><h3>Owner spend limit</h3><span class="tiny muted">${esc(owner.name)}</span></div>`;
    if (S.ownerState === 'idle') { el.innerHTML = head + `<p class="idle">Spend limit on file: ${money(owner.spendLimit)} per job. Anything over waits for the owner's yes, except make-safe work in an emergency.</p>`; return; }
    el.innerHTML = head + `<div class="notice">
      <div class="money-row"><span>Spend limit (owner.spendLimit)</span><b>${money(owner.spendLimit)}</b></div>
      <div class="money-row"><span>Make-safe: shut off, cap line, wet-vac</span><span>${money(MAKE_SAFE)} <span class="badge ok">Within limit</span></span></div>
      <div class="money-row"><span>Full repair quote</span><span>${money(REPAIR)} <span class="badge warn">Over by ${money(REPAIR - owner.spendLimit)}</span></span></div>
      <p class="tiny muted" style="margin-top:var(--sp-2)">Texted to ${esc(owner.phone)} at ${clockOf(38)} as part of the emergency.</p></div>
      <div class="row">${S.ownerState === 'pending' ? `<span class="badge warn pulse">Waiting on owner</span><button class="btn sm" data-act="owner">Approve as owner</button>` : '<span class="badge ok">Owner approved</span>'}</div>`;
  }

  function renderClose() {
    const el = $('#close-card');
    if (S.status === 'none' || S.status === 'new' || S.status === 'assigned') { el.innerHTML = `<h3>Closeout</h3><p class="idle">Before/after photos and the tenant's confirmation land here.</p>`; return; }
    el.innerHTML = `<div class="row between"><h3>Closeout</h3>${S.done ? '<span class="badge ok">Completed</span>' : '<span class="badge info">In progress</span>'}</div>
      <div class="photos">${photo('pipe', 'Before · ' + clockOf(27))}${S.fixedAt != null ? photo('fixed', 'After · ' + clockOf(S.fixedAt)) : '<span class="photo empty">After photo pending</span>'}</div>
      ${S.fixedAt != null ? `<div class="money-row" style="margin-top:var(--sp-3)"><span>Total billed to owner</span><b>${money(MAKE_SAFE + REPAIR)}</b></div>` : ''}
      <div class="row" style="margin-top:var(--sp-2)">${S.closeState === 'asked' ? `<span class="badge warn pulse">Asked tenant to confirm</span><button class="btn sm" data-act="tenant">Confirm as tenant</button>`
        : S.closeState === 'confirmed' ? `<span class="badge ok">Tenant confirmed: "all good"</span>` : ''}</div>`;
  }

  const WHO = { agent: ['Hive Alerts', `To Jordan · from ${agent.twilioNumber}`], vendors: ['Emergency broadcast', `To 3 plumbers · from ${agent.twilioNumber}`], tenant: [tenant.name, `To tenant · from ${agent.twilioNumber}`], owner: [owner.name, `To owner · from ${agent.twilioNumber}`] };
  function renderPhone() {
    S.unread.delete(thread);
    $$('#threads button').forEach((b) => { b.classList.toggle('on', b.dataset.th === thread); b.classList.toggle('ping', S.unread.has(b.dataset.th)); });
    $('#ph-who').textContent = WHO[thread][0];
    $('#ph-sub').textContent = WHO[thread][1] + ' (the agent\'s one Hive number)';
    const msgs = S.threads[thread];
    const body = $('#phone-body');
    body.innerHTML = msgs.length ? msgs.map((m) => `<div class="sms ${m.dir} ${m.extra}">${esc(m.text)}<span class="meta">${m.at}</span></div>`).join('')
      : `<div class="empty">No texts yet. ${S.started ? '' : 'Press "Simulate burst pipe".'}</div>`;
    body.scrollTop = body.scrollHeight;
    const foot = $('#phone-foot');
    foot.innerHTML = thread === 'agent' && S.started && !S.ack ? '<button class="btn danger block" data-act="ack">Acknowledge (reply OK)</button>'
      : thread === 'owner' && S.ownerState === 'pending' ? '<button class="btn block" data-act="owner">Reply YES to approve</button>'
      : thread === 'tenant' && S.closeState === 'asked' ? '<button class="btn block" data-act="tenant">Reply YES, it\'s fixed</button>' : '';
  }

  function render() {
    renderTicket(); renderRace(); renderOwner(); renderClose(); renderPhone();
    $('#log').innerHTML = S.log.length ? S.log.map((l) => `<li><span class="when">${l.at}</span><span>${esc(l.text)}</span></li>`).join('') : '<li class="muted">Nothing yet tonight.</li>';
    $('#btn-sim').disabled = S.started;
    renderLive();
  }

  /* ---------- wiring ---------- */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act;
    if (a === 'ack') acknowledge(false);
    else if (a === 'accept') { accept(b.dataset.id); render(); }
    else if (a === 'owner') ownerApprove(false);
    else if (a === 'tenant') tenantConfirm(false);
  });
  $('#btn-sim').addEventListener('click', start);
  $('#btn-reset').addEventListener('click', () => { reset(); toast('Reset to 2:14 am'); });
  $('#btn-demo').addEventListener('click', () => { reset(); thread = 'agent'; start(); toast('Demo running: watch the texts and timers', 'ok'); });
  $$('#speed button').forEach((b) => b.addEventListener('click', () => {
    speed = Number(b.dataset.speed);
    $$('#speed button').forEach((x) => x.classList.toggle('on', x === b));
    renderLive(); toast(`Demo speed ${speed}×`);
  }));
  $$('#threads button').forEach((b) => b.addEventListener('click', () => { thread = b.dataset.th; renderPhone(); }));

  reset();
})();
