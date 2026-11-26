/* V2 BEELO Voice: tap-to-talk MLS assistant, call capture, lead inbox, market alerts. */
(function () {
  const { $, $$, esc, money, timeAgo, fmtTime, toast, modal, tabs, photo, sampleBadge } = window.UI;
  const S = JSON.parse(JSON.stringify(window.MOCK));
  const HERO_CALL = S.calls.find((c) => c.id === 'C1');
  const HERO_LEAD = S.leads.find((l) => l.id === 'LD1');
  // Rachel's call is the hero moment, so she starts outside the inbox and call log.
  S.calls = S.calls.filter((c) => c.id !== 'C1').map((c) => ({ ...c, synced: true }));
  S.leads = S.leads.filter((l) => l.id !== 'LD1');
  const SIMS = [
    { call: HERO_CALL, lead: HERO_LEAD },
    {
      call: { from: '(972) 555-0433', name: 'Tyler Grant', durationSec: 61, missed: true,
        summary: 'Buyer, 4 bed in Plano up to $530K, relocating in January.',
        transcript: [['Caller', 'Hi, I’m looking at four bedrooms in Plano.'], ['BEELO', 'Happy to help. What price range are you working with?'], ['Caller', 'Up to about five-thirty. We move in January.'], ['BEELO', 'Thanks, Tyler. Jordan will call you today with options.']] },
      lead: { name: 'Tyler Grant', phone: '(972) 555-0433', source: 'Missed call', intent: 'Buyer', budget: 530000, area: 'Plano', status: 'new', note: 'Relocating in January, wants 4 bed.' },
    },
  ];
  let simIdx = 0, simBusy = false, leadFilter = 'all';
  const read = new Set();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- query parsing ---------- */
  const ONES = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
  const TENS = { ten: 10, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, 'twenty-five': 25, 'seventy-five': 75 };
  const CITIES = [...new Set(S.listings.map((l) => l.city))];

  function parseAmount(txt) {
    const t = txt.replace(/,/g, '').trim();
    if (/^half a million/.test(t)) return 500000;
    const m = t.match(/^\$?(\d+(?:\.\d+)?)\s*(k|m|thousand|million|grand)?\b/);
    if (m) {
      let n = parseFloat(m[1]); const u = m[2];
      if (u === 'm' || u === 'million') n *= 1e6; else if (u || n < 10000) n *= 1000;
      return Math.round(n);
    }
    const w = t.replace(/-/g, ' ').split(/\s+/);
    if (ONES[w[0]] == null) return null;
    let n = ONES[w[0]] * 100, i = 1;
    if (w[i] === 'hundred') i++;
    if (w[i] === 'and') i++;
    if (TENS[w[i]] != null) { n += TENS[w[i]]; i++; if (ONES[w[i]] != null) n += ONES[w[i]]; }
    return n * 1000;
  }

  function parse(q) {
    const t = ' ' + q.toLowerCase().replace(/[?.!]/g, '') + ' ';
    const out = {};
    const b = t.match(/(\d|one|two|three|four|five)[\s-]*(?:bed|br|bd|bedroom)/);
    if (b) out.beds = Number(b[1]) || ONES[b[1]];
    const mx = t.match(/(?:under|below|less than|max|up to|no more than)\s+(.+)/);
    if (mx) out.max = parseAmount(mx[1]);
    const mn = t.match(/(?:over|above|at least|more than)\s+(.+)/);
    if (mn) out.min = parseAmount(mn[1]);
    const c = CITIES.find((x) => t.includes(' ' + x.toLowerCase()));
    if (c) out.city = c;
    if (/price drop|reduced|price cut/.test(t)) out.status = 'Price drop';
    if (/\bnew\b|just listed/.test(t)) out.fresh = true;
    if (/pending/.test(t)) out.status = 'Pending';
    return out;
  }

  function search(p) {
    return S.listings.filter((l) =>
      (!p.beds || l.beds >= p.beds) && (!p.max || l.price <= p.max) && (!p.min || l.price >= p.min) &&
      (!p.city || l.city === p.city) && (!p.fresh || l.dom <= 7) &&
      (p.status ? l.status === p.status : l.status !== 'Pending'))
      .sort((a, b) => a.price - b.price);
  }

  function describe(p) {
    const bits = [];
    if (p.beds) bits.push(p.beds + '+ beds');
    if (p.max) bits.push('under ' + money(p.max));
    if (p.min) bits.push('over ' + money(p.min));
    if (p.city) bits.push('in ' + p.city);
    if (p.status) bits.push(p.status.toLowerCase());
    if (p.fresh) bits.push('listed in last 7 days');
    return bits;
  }

  function listingRow(l) {
    return `<div class="listing">${photo(l.photo, l.id)}<div>
      <div class="row between"><span class="price-l">${money(l.price)}</span><span class="badge ${l.status === 'Price drop' ? 'warn' : l.status === 'Pending' ? 'info' : 'ok'}">${esc(l.status)}</span></div>
      <h4>${esc(l.address)}, ${esc(l.city)} ${esc(l.zip)}</h4>
      <div class="small muted">${l.beds} bd · ${l.baths} ba · ${l.sqft.toLocaleString('en-US')} sqft · ${l.dom} days on market</div>
      <a class="src" href="${esc(l.sourceUrl)}" data-src="${esc(l.id)}">Source: ${esc(l.source)} · ${esc(l.id)} ↗</a>
    </div></div>`;
  }

  function answer(q) {
    const p = parse(q);
    const hits = search(p);
    const bits = describe(p);
    let html = `<div class="heard">“${esc(q)}”</div><div class="row parsed">${bits.map((b) => `<span class="badge info">${esc(b)}</span>`).join('') || '<span class="badge">all active listings</span>'}</div>`;
    if (hits.length) {
      html += `<p>I found <b>${hits.length}</b> listing${hits.length > 1 ? 's' : ''}${bits.length ? ' with ' + esc(bits.join(', ')) : ''}. Lowest is ${money(hits[0].price)}.</p>` + hits.map(listingRow).join('');
    } else {
      const near = S.listings.filter((l) => (!p.city || l.city === p.city) && l.status !== 'Pending').sort((a, b) => Math.abs(a.price - (p.max || 0)) - Math.abs(b.price - (p.max || 0))).slice(0, 2);
      html += `<p>Nothing matches exactly. Closest options${p.city ? ' in ' + esc(p.city) : ''}:</p>` + near.map(listingRow).join('');
    }
    html += '<p class="disclaimer">Answers come from a sample MLS feed for this demo, not live MLS.</p>';
    const el = $('#answer'); el.innerHTML = html; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    return hits;
  }

  /* ---------- assistant UI ---------- */
  const QUERIES = ['three bed under four-fifty in Frisco', 'price drops in McKinney', 'four bed under 500k in Frisco', 'new listings in Frisco'];
  let qIdx = 0, typing = false;
  $('#chips').innerHTML = QUERIES.map((q) => `<button class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join('');

  async function speak(q) {
    if (typing) return; typing = true;
    const mic = $('#mic'), inp = $('#ask-input'), hint = $('#mic-hint');
    showTab('ask'); mic.classList.add('listening'); hint.textContent = 'Listening…'; inp.value = ''; inp.classList.add('typing');
    await sleep(400);
    for (const ch of q) { inp.value += ch; await sleep(32); }
    inp.classList.remove('typing'); hint.textContent = 'Got it. Searching the sample MLS feed…';
    await sleep(350);
    mic.classList.remove('listening'); hint.textContent = 'Tap the mic and speak, or type below.';
    answer(q); typing = false;
  }

  $('#mic').addEventListener('click', () => { speak(QUERIES[qIdx % QUERIES.length]); qIdx++; });
  $('#ask-form').addEventListener('submit', (e) => {
    e.preventDefault(); const q = $('#ask-input').value.trim();
    if (!q) { toast('Type a question, or tap the mic.', 'warn'); return; }
    answer(q);
  });
  $('#chips').addEventListener('click', (e) => { const c = e.target.closest('[data-q]'); if (c) { $('#ask-input').value = c.dataset.q; answer(c.dataset.q); } });

  function openSource(id) {
    const l = S.listings.find((x) => x.id === id); if (!l) return;
    modal(`<div class="row between"><h3>${esc(l.address)}</h3>${sampleBadge()}</div>${photo(l.photo, l.address)}
      <p class="small" style="margin-top:var(--sp-3)">${money(l.price)} · ${l.beds} bd · ${l.baths} ba · ${l.sqft.toLocaleString('en-US')} sqft · ${esc(l.status)}</p>
      <p class="small muted">Source: ${esc(l.source)}<br>Record ${esc(l.id)} · checked ${fmtTime(new Date())} today</p>
      <p class="disclaimer">Sample record for this prototype. Not live MLS data.</p>
      <div class="row"><button class="btn" data-share="${esc(l.id)}">Text to a lead</button><button class="btn ghost" data-close>Close</button></div>`,
    { onOpen: (el, close) => { $('[data-share]', el).addEventListener('click', () => { close(); toast('Link to ' + l.address + ' queued to send from ' + S.agent.twilioNumber, 'ok'); }); } });
  }
  document.addEventListener('click', (e) => { const a = e.target.closest('[data-src]'); if (a) { e.preventDefault(); openSource(a.dataset.src); } });

  /* ---------- calls ---------- */
  const lineHtml = ([who, txt]) => `<div class="line ${who === 'BEELO' ? 'beelo' : ''}"><b>${esc(who)}</b><span>${esc(txt)}</span></div>`;
  const crmHtml = (ok) => ok ? '<span class="crm badge ok">✓ Synced to CRM</span>' : '<span class="crm"><span class="spinner"></span>Syncing to CRM…</span>';

  function renderCalls() {
    $('#call-list').innerHTML = S.calls.slice().sort((a, b) => new Date(b.at) - new Date(a.at)).map((c) => `
      <div class="card call" data-call="${esc(c.id)}">
        <div class="row between"><div><b>${esc(c.name)}</b> <span class="muted small">${esc(c.from)}</span></div>${crmHtml(c.synced)}</div>
        <div class="row meta small muted"><span class="badge ${c.missed ? 'warn' : 'info'}">${c.missed ? 'Missed, BEELO answered' : 'Answered by Jordan'}</span><span>${timeAgo(c.at)}</span><span>${Math.floor(c.durationSec / 60)}:${String(c.durationSec % 60).padStart(2, '0')}</span></div>
        <p class="small" style="margin:var(--sp-2) 0 0">${esc(c.summary)}</p>
        <div class="row" style="margin-top:var(--sp-2)"><button class="btn ghost sm" data-tx>Show transcript</button><button class="btn ghost sm" data-cb="${esc(c.from)}">Call back</button></div>
        <div class="transcript hide">${c.transcript.map(lineHtml).join('')}</div>
      </div>`).join('');
    $('#calls-count').textContent = S.calls.length;
  }
  $('#call-list').addEventListener('click', (e) => {
    const card = e.target.closest('.call'); if (!card) return;
    if (e.target.closest('[data-tx]')) { const tx = $('.transcript', card); tx.classList.toggle('hide'); e.target.textContent = tx.classList.contains('hide') ? 'Show transcript' : 'Hide transcript'; }
    const cb = e.target.closest('[data-cb]'); if (cb) toast('Calling ' + cb.dataset.cb + ' from your BEELO line…', 'ok');
  });

  async function simulateCall() {
    if (simBusy) { toast('A call is already in progress.', 'warn'); return; }
    simBusy = true; $('#sim-call').disabled = true;
    const sim = SIMS[simIdx % SIMS.length]; simIdx++;
    const at = new Date().toISOString();
    const call = { ...sim.call, id: 'C' + Date.now(), at, synced: false };
    showTab('calls');
    const live = $('#live-call'); live.classList.remove('hide');
    live.innerHTML = `<div class="card call live"><div class="row between"><div><b class="pulse">Incoming call</b> <span class="muted small">${esc(call.from)}</span></div><span class="badge warn">Missed · ${fmtTime(at)}</span></div>
      <p class="small muted" id="live-status">Jordan didn’t pick up. BEELO is answering…</p><div class="transcript" id="live-tx"></div><div id="live-foot"></div></div>`;
    await sleep(900);
    $('#live-status').textContent = 'Live transcript';
    for (const ln of call.transcript) { $('#live-tx').insertAdjacentHTML('beforeend', lineHtml(ln)); await sleep(1000); }
    $('#live-foot').innerHTML = `<p class="small" style="margin:var(--sp-3) 0 var(--sp-2)"><b>Summary:</b> ${esc(call.summary)}</p>${crmHtml(false)}`;
    await sleep(1200);
    $('#live-foot .crm').outerHTML = crmHtml(true);
    call.synced = true;
    const lead = { ...sim.lead, id: 'LD' + Date.now(), createdAt: at, status: 'new', source: 'Missed call', fresh: Date.now() };
    call.leadId = lead.id; S.calls.push(call); S.leads.push(lead);
    toast('New lead: ' + lead.name + '. Synced to CRM.', 'ok');
    await sleep(1100);
    live.classList.add('hide'); live.innerHTML = ''; renderCalls();
    leadFilter = 'all'; $$('#lead-filter button').forEach((b) => b.classList.toggle('on', b.dataset.f === 'all'));
    renderLeads(lead.id); renderAlerts(); showTab('leads');
    simBusy = false; $('#sim-call').disabled = false;
  }
  $('#sim-call').addEventListener('click', simulateCall);

  /* ---------- leads ---------- */
  const STATUS_BADGE = { new: 'ok', contacted: 'info', nurture: '' };
  function renderLeads(flashId) {
    const list = S.leads.slice().sort((a, b) => (b.fresh || 0) - (a.fresh || 0) || new Date(b.createdAt) - new Date(a.createdAt)).filter((l) => leadFilter === 'all' || l.status === leadFilter);
    $('#lead-list').innerHTML = list.map((l) => `
      <div class="card lead ${l.id === flashId ? 'landed' : ''}" data-lead="${esc(l.id)}">
        <div class="row between"><h3>${esc(l.name)}</h3><span class="badge ${STATUS_BADGE[l.status]}">${esc(l.status)}</span></div>
        <div class="row small muted" style="gap:var(--sp-2)"><span>${esc(l.phone)}</span><span>·</span><span>${timeAgo(l.createdAt)}</span></div>
        <div class="row" style="gap:var(--sp-1);margin-top:var(--sp-2)"><span class="badge">${esc(l.intent)}</span><span class="badge info">${esc(l.source)}</span><span class="badge">${esc(l.area)}</span>${l.budget ? `<span class="badge">up to ${money(l.budget)}</span>` : ''}</div>
        <p class="note small">${esc(l.note)}</p>
        ${l.source === 'Missed call' ? '<span class="badge ok">✓ Synced to CRM</span>' : ''}
        <div class="row lead-actions">${l.intent === 'Buyer' ? '<button class="btn sm" data-act="match">Find matches</button>' : ''}<button class="btn ghost sm" data-act="text">Text</button>${l.status !== 'contacted' ? '<button class="btn ghost sm" data-act="contacted">Mark contacted</button>' : ''}</div>
      </div>`).join('') || '<p class="muted lead-filter-empty">No leads in this view.</p>';
    $('#leads-count').textContent = S.leads.filter((l) => l.status === 'new').length + ' new';
    if (flashId) { const el = $(`[data-lead="${flashId}"]`); if (el) el.scrollIntoView({ block: 'nearest' }); }
  }
  $('#lead-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]'); if (!btn) return;
    const l = S.leads.find((x) => x.id === btn.closest('[data-lead]').dataset.lead);
    if (btn.dataset.act === 'contacted') { l.status = 'contacted'; renderLeads(); toast(l.name + ' marked contacted.', 'ok'); }
    if (btn.dataset.act === 'text') toast('Text to ' + l.name + ' sent from ' + S.agent.twilioNumber, 'ok');
    if (btn.dataset.act === 'match') {
      const beds = (l.note.match(/(\d) bed/) || [])[1];
      const q = `${beds ? beds + ' bed ' : ''}under ${Math.round(l.budget / 1000)}k in ${l.area}`;
      showTab('ask'); $('#ask-input').value = q; answer(q);
    }
  });
  $('#lead-filter').addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    leadFilter = b.dataset.f; $$('#lead-filter button').forEach((x) => x.classList.toggle('on', x === b)); renderLeads();
  });

  /* ---------- market alerts ---------- */
  function buildAlerts() {
    const out = [];
    S.listings.forEach((l) => {
      S.leads.forEach((p) => {
        if (p.area !== l.city) return;
        const fits = p.budget && l.price <= p.budget && l.price >= p.budget * 0.8;
        if (l.status === 'Price drop' && fits) out.push({ id: l.id + p.id, kind: 'drop', l, p, title: `Price drop matches ${p.name}`, body: `${l.address} in ${l.city} is now ${money(l.price)}, inside ${p.name.split(' ')[0]}’s budget of ${money(p.budget)}.` });
        else if (l.status === 'Active' && l.dom <= 7 && fits) out.push({ id: l.id + p.id, kind: 'new', l, p, title: `New listing for ${p.name}`, body: `${l.beds} bd at ${l.address}, ${money(l.price)}, listed ${l.dom} days ago. Matches ${p.area}, up to ${money(p.budget)}.` });
        else if (p.intent === 'Seller' && l.status === 'Active' && l.dom <= 7) out.push({ id: l.id + p.id, kind: 'comp', l, p, title: `New comp near ${p.name}’s rental`, body: `${l.address} listed at ${money(l.price)}. Useful context if ${p.name.split(' ')[0]} is weighing a sale.` });
      });
    });
    return out;
  }
  function renderAlerts() {
    const al = buildAlerts();
    $('#alert-list').innerHTML = al.map((a) => `
      <div class="card alert ${read.has(a.id) ? 'read' : ''}" data-alert="${esc(a.id)}">
        <div class="alert-icon ${a.kind === 'drop' ? 'drop' : ''}">${a.kind === 'drop' ? '↓' : a.kind === 'comp' ? '≈' : '+'}</div>
        <div><div class="row between"><b>${esc(a.title)}</b><span class="badge ${a.kind === 'drop' ? 'warn' : 'info'}">${a.kind === 'drop' ? 'Price drop' : a.kind === 'comp' ? 'Comp' : 'New listing'}</span></div>
          <p class="small">${esc(a.body)}</p>
          <div class="row"><button class="btn sm" data-send="${esc(a.id)}">${read.has(a.id) ? 'Sent ✓' : 'Send to ' + esc(a.p.name.split(' ')[0])}</button><a class="btn ghost sm" href="${esc(a.l.sourceUrl)}" data-src="${esc(a.l.id)}">View source</a></div></div>
      </div>`).join('') || '<p class="muted">No signals right now.</p>';
    $('#alerts-count').textContent = al.filter((a) => !read.has(a.id)).length;
    $('#alert-list').dataset.ids = al.map((a) => a.id).join(',');
    S._alerts = al;
  }
  $('#alert-list').addEventListener('click', (e) => {
    const b = e.target.closest('[data-send]'); if (!b) return;
    const a = S._alerts.find((x) => x.id === b.dataset.send);
    read.add(a.id); renderAlerts();
    toast(`Sent ${a.l.address} to ${a.p.name} from ${S.agent.twilioNumber}`, 'ok');
  });

  /* ---------- tabs, header, demo ---------- */
  const showTab = tabs($('main'));
  $('#agent-name').textContent = S.agent.name;
  $('#agent-brokerage').textContent = S.agent.brokerage;
  $('#twilio-num').textContent = S.agent.twilioNumber;
  ['#ask-sample', '#answer-sample', '#alerts-sample'].forEach((s) => { $(s).innerHTML = sampleBadge(); });

  $('#run-demo').addEventListener('click', async (e) => {
    const btn = e.currentTarget; if (btn.disabled) return;
    btn.disabled = true; btn.textContent = 'Demo running…';
    toast('Step 1: Ask BEELO out loud.');
    await sleep(600);
    await speak(QUERIES[0]); qIdx = Math.max(qIdx, 1);
    await sleep(2600);
    toast('Step 2: A buyer calls while Jordan is busy.');
    await sleep(800);
    await simulateCall();
    await sleep(1500);
    toast('Done. The lead is in your inbox and CRM.', 'ok');
    btn.disabled = false; btn.innerHTML = '▶ Run demo';
  });

  renderCalls(); renderLeads(); renderAlerts();
})();
