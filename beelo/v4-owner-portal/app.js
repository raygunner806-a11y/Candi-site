/* V4 Owner Portal: agent controls on the left, owner's phone on the right. Mock data only. */
(function () {
  const { $, $$, esc, money, fmtDate, toast, modal, tabs, sampleBadge, estimateNote, soonBadge } = UI;
  const M = window.MOCK;
  const S = structuredClone({ owners: M.owners, doors: M.doors, ledger: M.ledger, ownerBills: M.ownerBills, agent: M.agent });
  const NOW = new Date(M.now);
  const owners = S.owners.filter((o) => o.doorIds.length >= 2);
  const st = { ownerId: 'o1', month: null, unlocked: {}, log: [] };
  let invSeq = 40;

  const owner = () => S.owners.find((o) => o.id === st.ownerId);
  const door = (id) => S.doors.find((d) => d.id === id);
  const first = (o) => o.name.split(/[ &]/)[0];
  const agentFirst = S.agent.name.split(' ')[0];
  const priceOf = (o) => (o.addonPrice == null ? 150 : o.addonPrice);
  const pct = (n) => (n > 0 ? '+' : '') + n.toFixed(2) + '%';
  const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);
  const r2 = (n) => Math.round(n * 100) / 100;

  function addLog(ownerId, text) { st.log.unshift({ ownerId, at: new Date(), text }); renderLog(); }

  /* ---------- money math ---------- */
  function twelveMo(doorId) {
    const since = new Date(NOW); since.setFullYear(since.getFullYear() - 1);
    const rows = S.ledger.filter((l) => l.doorId === doorId && new Date(l.date) > since);
    const by = (t) => r2(sum(rows.filter((l) => l.type === t), (l) => l.amount));
    const rent = by('rent'), fees = by('mgmt-fee'), repairs = by('repair');
    return { rent, fees, repairs, net: r2(rent + fees + repairs) };
  }
  function capRate(d, t) { return ((t.net - d.annualTax - d.annualInsurance) / d.valuation.estimate) * 100; }
  const billTotal = (b) => r2(sum(b.items, (i) => i.amount));
  const billPaid = (b) => r2(sum(b.payments, (p) => p.amount));
  function billStatus(b) {
    const bal = r2(billTotal(b) - billPaid(b));
    if (bal <= 0) return ['paid', 'ok'];
    if (billPaid(b) > 0) return ['partly paid', 'warn'];
    if (new Date(b.due) < NOW) return ['overdue', 'danger'];
    return ['open', 'info'];
  }

  /* ---------- agent panel ---------- */
  function renderAgent() {
    const o = owner();
    $$('#mode-toggle button').forEach((b) => b.classList.toggle('on', b.dataset.mode === o.feeMode));
    $('#price-row').classList.toggle('off', o.feeMode !== 'addon');
    $('#price-input').value = priceOf(o);
    $('#mode-note').textContent = o.feeMode === 'included'
      ? `${first(o)} sees every home value free, as part of your management fee.`
      : `${first(o)} sees a ${money(priceOf(o))}/quarter line item and unlocks values by paying you.`;
    $('#owner-first').textContent = first(o);
    renderLog();
  }
  function renderLog() {
    const rows = st.log.filter((l) => l.ownerId === st.ownerId);
    $('#log').innerHTML = rows.length ? rows.map((l) =>
      `<li>${esc(l.text)}<span class="tiny muted">${esc(fmtDate(l.at))}, ${esc(UI.fmtTime(l.at))}</span></li>`).join('')
      : '<li class="muted small">No activity yet for this owner.</li>';
  }

  /* ---------- owner phone: homes ---------- */
  function renderHomes() {
    const o = owner(), doors = o.doorIds.map(door);
    const locked = o.feeMode === 'addon' && !st.unlocked[o.id];
    const tot = sum(doors, (d) => d.valuation.estimate), lo = sum(doors, (d) => d.valuation.low), hi = sum(doors, (d) => d.valuation.high);
    const was = sum(doors, (d) => d.valuation.estimate / (1 + d.valuation.change12mo / 100));
    const chg = ((tot - was) / was) * 100;
    const blur = (s) => (locked ? `<span class="blur" aria-hidden="true">${s}</span>` : s);
    let top = '';
    if (o.feeMode === 'included') {
      top = `<div class="freebie" id="val-banner">Home values are included with your management. No extra charge from ${esc(agentFirst)}.</div>`;
    } else if (locked) {
      top = `<div class="lockbox" id="val-banner"><b>Portfolio analysis</b><p class="small muted">Quarterly home values, ranges and cap rates, prepared by ${esc(S.agent.name)}.</p>
        <div class="lineitem"><span>Portfolio analysis add-on</span><b>${money(priceOf(o))} / quarter</b></div>
        <button class="btn block" id="unlock">Unlock for ${money(priceOf(o))}</button>
        <p class="tiny muted">Billed by ${esc(S.agent.brokerage)}, not by BEELO.</p></div>`;
    } else {
      top = `<div class="freebie" id="val-banner">Portfolio analysis active · ${money(priceOf(o))} / quarter, billed by ${esc(agentFirst)}.</div>`;
    }
    const homes = doors.map((d) => {
      const v = d.valuation, t = twelveMo(d.id), c = capRate(d, t);
      return `<div class="home">
        <div class="row between"><span class="addr">${esc(M.doorLabel(d))}</span><span class="tiny muted">${d.beds} bd · ${d.baths} ba</span></div>
        <div class="${locked ? 'locked' : ''}">
          <div class="big">${blur(money(v.estimate))}</div>
          <div class="tiny muted">${blur(`Range ${money(v.low)} to ${money(v.high)}`)} · 12-mo <span class="${v.change12mo >= 0 ? 'up' : 'down'}">${blur(pct(v.change12mo))}</span></div>
        </div>
        <div class="stats">
          <div><span class="lbl">Rent</span>${money(d.rent)}/mo</div>
          <div><span class="lbl">Repairs, 12 mo</span>${money(-t.repairs)}</div>
          <div><span class="lbl">Net income, 12 mo</span>${money(t.net)}</div>
          <div><span class="lbl">Cap rate</span>${locked ? '<span class="blur">0.0%</span>' : c.toFixed(1) + '%'}</div>
        </div></div>`;
    }).join('');
    $('#p-homes').innerHTML = `${top}
      <div class="total ${locked ? 'locked' : ''}">
        <div class="row between"><span class="lbl">Total estimated value · ${doors.length} homes</span>${sampleBadge()}</div>
        <div class="val">${blur(money(tot))}</div>
        <div class="small">${blur(`${money(lo)} to ${money(hi)}`)} · 12-mo ${blur(pct(chg))}</div>
        ${estimateNote()}
      </div>${homes}
      <p class="tiny muted">Values as of ${esc(fmtDate(doors[0].valuation.asOf))}. ${estimateNote()}. Cap rate = net income less tax and insurance, divided by estimate. Net income is rent less management fees and repairs.</p>`;
    const u = $('#unlock'); if (u) u.onclick = unlock;
  }

  /* ---------- owner phone: statement ---------- */
  function renderStmt() {
    const o = owner();
    const months = [...new Set(S.ledger.filter((l) => l.ownerId === o.id).map((l) => l.date.slice(0, 7)))].sort().reverse();
    if (!st.month || !months.includes(st.month)) st.month = months[0];
    const rows = S.ledger.filter((l) => l.ownerId === o.id && l.date.startsWith(st.month));
    const mname = (m) => new Date(m + '-15').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const byDoor = o.doorIds.map((id) => {
      const r = rows.filter((l) => l.doorId === id).sort((a, b) => a.date.localeCompare(b.date));
      if (!r.length) return '';
      return `<div class="stmt-door"><b class="small">${esc(M.doorLabel(door(id)))}</b>
        ${r.map((l) => `<div class="stmt-row"><span>${esc(fmtDate(l.date + 'T12:00'))} · ${esc(l.memo)}</span><span>${money(l.amount)}</span></div>`).join('')}</div>`;
    }).join('');
    const t = (k) => r2(sum(rows.filter((l) => l.type === k), (l) => l.amount));
    $('#p-stmt').innerHTML = `
      <label class="field"><span>Month</span><select class="input" id="mpick">${months.map((m) => `<option value="${m}" ${m === st.month ? 'selected' : ''}>${mname(m)}</option>`).join('')}</select></label>
      <h3>${esc(mname(st.month))} statement</h3>
      <p class="tiny muted">For ${esc(o.name)} from ${esc(S.agent.brokerage)}.</p>
      ${byDoor}
      <div class="card flat">
        <div class="stmt-row"><span>Rent collected</span><span>${money(t('rent'))}</span></div>
        <div class="stmt-row"><span>Management fees</span><span>${money(t('mgmt-fee'))}</span></div>
        <div class="stmt-row"><span>Repairs</span><span>${money(t('repair'))}</span></div>
        <div class="stmt-row sum"><span>Net to you</span><span>${money(t('rent') + t('mgmt-fee') + t('repair'))}</span></div>
      </div>
      <p class="row small" style="margin-top:12px">Direct deposit of your net ${soonBadge()}</p>
      <button class="btn ghost sm block" id="dl-stmt">Save as PDF</button>`;
    $('#mpick').onchange = (e) => { st.month = e.target.value; renderStmt(); };
    $('#dl-stmt').onclick = () => toast(`${mname(st.month)} statement saved (mock PDF).`, 'ok');
  }

  /* ---------- owner phone: invoices ---------- */
  function renderBills() {
    const o = owner();
    const bills = S.ownerBills.filter((b) => b.ownerId === o.id).sort((a, b) => b.date.localeCompare(a.date));
    $('#p-bills').innerHTML = `<p class="tiny muted">Invoices from ${esc(S.agent.brokerage)}. Card payments go to ${esc(agentFirst)}'s own Stripe account; the card fee is shown before you pay.</p>` +
      (bills.length ? bills.map((b) => {
        const [s, k] = billStatus(b), bal = r2(billTotal(b) - billPaid(b));
        return `<div class="inv" id="inv-${b.id}">
          <div class="row between"><b class="small">${esc(b.id)}</b><span class="badge ${k}">${s}</span></div>
          <div class="tiny muted">Sent ${esc(fmtDate(b.date + 'T12:00'))} · due ${esc(fmtDate(b.due + 'T12:00'))}</div>
          ${b.items.map((i) => `<div class="lineitem"><span>${esc(i.desc)}</span><span>${money(i.amount)}</span></div>`).join('')}
          <div class="lineitem"><b>Balance</b><b>${money(bal)}</b></div>
          ${bal > 0 ? `<button class="btn sm block" data-pay="${b.id}">Pay ${money(bal)}</button>` : ''}
          <ul class="list pay-log">${b.payments.length ? b.payments.map((p) =>
            `<li>${esc(fmtDate(p.at))}: ${money(p.amount)} by ${esc(p.method)} + ${money(p.cardFee)} card fee · ref ${esc(p.stripeRef)}</li>`).join('') : '<li>No payments yet.</li>'}</ul>
        </div>`;
      }).join('') : '<p class="muted small">No invoices. You are all caught up.</p>');
    $$('[data-pay]', $('#p-bills')).forEach((b) => (b.onclick = () => openPay(b.dataset.pay)));
  }

  function openPay(id) {
    const b = S.ownerBills.find((x) => x.id === id);
    const bal = r2(billTotal(b) - billPaid(b));
    return modal(`<h3>Pay ${esc(b.id)}</h3>
      <p class="small muted">To ${esc(S.agent.brokerage)} through their own Stripe account (mock). BEELO does not charge you.</p>
      <label class="field"><span>Amount</span><input class="input" id="pay-amt" type="number" min="1" step="0.01" max="${bal}" value="${bal}"></label>
      <label class="field"><span>Card</span><input class="input" value="Visa •••• 4242" readonly></label>
      <div class="fee-line"><span>Invoice amount</span><span id="f-amt"></span></div>
      <div class="fee-line"><span>Card processing fee (${M.cardFee.pct}% + ${money(M.cardFee.fixed)})</span><span id="f-fee"></span></div>
      <div class="fee-line tot"><span>Total charged</span><span id="f-tot"></span></div>
      <div class="row" style="margin-top:12px"><button class="btn" id="pay-go"></button><button class="btn ghost" data-close>Cancel</button></div>`, {
      onOpen(el, close) {
        const inp = $('#pay-amt', el);
        const calc = () => {
          const a = Math.min(bal, Math.max(0, Number(inp.value) || 0)), f = a ? M.cardFeeFor(a) : 0;
          $('#f-amt', el).textContent = money(a); $('#f-fee', el).textContent = money(f); $('#f-tot', el).textContent = money(a + f);
          $('#pay-go', el).textContent = `Pay ${money(a + f)}`; $('#pay-go', el).disabled = !a;
          return [a, f];
        };
        inp.oninput = calc; calc();
        $('#pay-go', el).onclick = () => {
          const [a, f] = calc(); const o = owner();
          const p = { at: new Date().toISOString(), method: 'Card •••• 4242', amount: a, cardFee: f, stripeRef: 'pi_mock_' + Math.random().toString(36).slice(2, 7).toUpperCase() };
          b.payments.push(p); close();
          if (b.unlocks && billPaid(b) >= billTotal(b)) { st.unlocked[b.ownerId] = true; addLog(o.id, `${o.name} unlocked portfolio analysis.`); }
          addLog(o.id, `${o.name} paid ${money(a)} on ${b.id} (+${money(f)} card fee paid by owner). Stripe ${p.stripeRef}.`);
          toast(`Paid ${money(a + f)} to ${S.agent.brokerage}.`, 'ok');
          renderPhone(); flash('#inv-' + b.id);
        };
      },
    });
  }

  function unlock() {
    const o = owner();
    let b = S.ownerBills.find((x) => x.ownerId === o.id && x.unlocks && billPaid(x) < billTotal(x));
    if (!b) {
      const due = new Date(NOW); due.setDate(due.getDate() + 14);
      b = { id: 'INV-2026-0' + invSeq++, ownerId: o.id, date: M.now.slice(0, 10), due: due.toISOString().slice(0, 10), unlocks: true,
        items: [{ desc: 'Portfolio analysis, Q1 2027', amount: priceOf(o) }], status: 'open', payments: [] };
      S.ownerBills.push(b);
      addLog(o.id, `${o.name} requested portfolio analysis. Invoice ${b.id} for ${money(priceOf(o))} created.`);
    }
    renderBills(); return openPay(b.id);
  }

  function renderPhone() {
    $('#phone-brand').textContent = S.agent.brokerage;
    renderHomes(); renderStmt(); renderBills();
  }
  function flash(sel) { const e = $(sel); if (!e) return; e.classList.remove('flash'); void e.offsetWidth; e.classList.add('flash'); }
  function setMode(mode) {
    const o = owner(); if (o.feeMode === mode) return;
    o.feeMode = mode;
    addLog(o.id, mode === 'included' ? `Valuations set to included in fee for ${o.name}.` : `Valuations set to add-on at ${money(priceOf(o))}/quarter for ${o.name}.`);
    renderAgent(); renderPhone(); showTab('homes'); flash('#pb');
    toast(`${first(o)}'s portal updated.`, 'ok');
  }

  /* ---------- wire up ---------- */
  $('#agent-name').textContent = S.agent.name; $('#agent-brokerage').textContent = S.agent.brokerage;
  $('#agent-short').textContent = S.agent.name;
  $('#soon-slot').innerHTML = soonBadge();
  $('#owner-pick').innerHTML = owners.map((o) => `<option value="${o.id}">${esc(o.name)} · ${o.doorIds.length} homes</option>`).join('');
  $('#owner-pick').onchange = (e) => { st.ownerId = e.target.value; st.month = null; renderAgent(); renderPhone(); flash('#pb'); };
  $$('#mode-toggle button').forEach((b) => (b.onclick = () => setMode(b.dataset.mode)));
  $('#price-input').oninput = (e) => {
    const o = owner(); o.addonPrice = Math.max(0, Math.round(Number(e.target.value) || 0)); renderPhone(); $('#mode-note').textContent = `${first(o)} sees a ${money(o.addonPrice)}/quarter line item and unlocks values by paying you.`;
  };
  $('#price-input').onchange = () => { const o = owner(); addLog(o.id, `Portfolio analysis price set to ${money(priceOf(o))}/quarter.`); };
  $('#bill-btn').onclick = () => {
    const o = owner(), [amt, desc] = $('#svc-pick').value.split('|');
    const due = new Date(NOW); due.setDate(due.getDate() + 14);
    const b = { id: 'INV-2026-0' + invSeq++, ownerId: o.id, date: M.now.slice(0, 10), due: due.toISOString().slice(0, 10), items: [{ desc, amount: Number(amt) }], status: 'open', payments: [] };
    S.ownerBills.push(b);
    addLog(o.id, `Invoice ${b.id} sent to ${o.name}: ${desc}, ${money(Number(amt))}.`);
    renderBills(); showTab('bills'); flash('#inv-' + b.id); toast(`Invoice sent to ${o.name}.`, 'ok');
  };
  $('#send-stmt').onclick = () => { const o = owner(); addLog(o.id, `November 2026 statement emailed to ${o.email}.`); toast('Statement sent.', 'ok'); showTab('stmt'); };

  // seed activity from existing payment history
  S.ownerBills.forEach((b) => b.payments.forEach((p) => {
    const o = S.owners.find((x) => x.id === b.ownerId);
    st.log.push({ ownerId: b.ownerId, at: new Date(p.at), text: `${o.name} paid ${money(p.amount)} on ${b.id} (+${money(p.cardFee)} card fee). Stripe ${p.stripeRef}.` });
  }));
  st.log.sort((a, b) => b.at - a.at);

  $('#owner-pick').value = st.ownerId;
  const showTab = tabs($('#pb'));
  renderAgent(); renderPhone();

  /* ---------- Run demo ---------- */
  let demoOn = false;
  $('#run-demo').onclick = () => {
    if (demoOn) return; demoOn = true; $('#run-demo').disabled = true;
    const hl = (sel) => { $$('.hl').forEach((e) => e.classList.remove('hl')); const e = sel && $(sel); if (e) { e.classList.add('hl'); e.scrollIntoView({ behavior: 'smooth', block: 'center' }); } };
    const steps = [
      () => { st.ownerId = 'o1'; $('#owner-pick').value = 'o1'; owner().feeMode = 'included'; st.unlocked.o1 = false; S.ownerBills = S.ownerBills.filter((b) => !(b.ownerId === 'o1' && b.unlocks)); renderAgent(); renderPhone(); showTab('homes'); hl('#val-ctl'); toast('1. Marcus Bell owns 2 homes. Values are included in your fee.'); },
      () => { hl('#phone'); toast('2. Marcus sees every value free, with a low to high range.'); },
      () => { hl('#val-ctl'); setMode('addon'); toast('3. Switch to add-on: $150.00 per quarter for portfolio analysis.'); },
      () => { hl('#phone'); toast('4. Marcus now sees a line item, and values are locked.'); },
      () => { hl('#unlock'); toast('5. Marcus taps Unlock. The card fee shows before the total.'); unlock(); },
      () => { const g = $('#pay-go'); if (g) g.click(); hl('#phone'); showTab('homes'); toast('6. Paid through your Stripe. Values unlock and the payment is logged.', 'ok'); },
      () => { showTab('bills'); hl('#phone'); toast('7. Invoice history shows every payment and Stripe reference.'); },
      () => { hl('#log'); toast(`8. You see it in your activity log. Done.`, 'ok'); demoOn = false; $('#run-demo').disabled = false; setTimeout(() => hl(null), 2500); },
    ];
    steps.forEach((f, i) => setTimeout(() => { try { f(); } catch (e) { demoOn = false; $('#run-demo').disabled = false; } }, i * 2200));
  };
})();
