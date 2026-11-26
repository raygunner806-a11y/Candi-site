# Builder brief (all six builders read this)

Clickable, mock-data pitch prototypes of BEELO (AI assistant for real estate agents: MLS + leads) and Hive (its property-management module). Target: DFW agent managing under 50 doors. Finish in ~25 minutes. Don't ask questions; note assumptions in your final report.

## Ownership
Repo /home/user/Candi-site. You own ONLY your folder under /home/user/Candi-site/beelo/. Deliver index.html + at most one app.js + one app.css, each under ~400 lines. Do NOT edit beelo/shared/, other folders, or the repo-root index.html (a different live site). Do NOT run git add/commit; Main commits.

## Shared foundation (frozen)
- shared/tokens.css: CSS variables. Use ONLY these for color; no hex/rgb literals in your files. Headings use var(--font-head) (Cormorant Garamond).
- shared/ui.css: classes .topbar .brand(.hex span inside) .btn(.ghost .ink .danger .sm .block) .card(.flat) .kpi(.val .lbl) .badge(.ok .warn .danger .info .sample .soon) .tabs .tab .tab-panel(.active) .list .table(.num) .scroll-x .field(span label) .input .toggle(button.on) .phone .phone-bar .phone-body .sms(.in .out) .photo .grid .row .between .stack .wrap .muted .small .tiny .hide .pulse .flash .disclaimer .honey-bg
- shared/ui.js -> window.UI: $, $$, esc, money(n) (always cents), timeAgo, fmtDate, fmtTime, toast(msg,kind), modal(html,{onOpen(el,close)}) ([data-close] closes), tabs(root,onChange)->show(name), photo(kind,label) inline SVG (leak pipe ac door house fixed generic), sampleBadge(), estimateNote(), soonBadge(text).
- shared/mock.js -> window.MOCK: agent (Jordan Ellis, 23 doors, twilioNumber), owners[12], doors[23] (valuation{estimate,low,high,change12mo,label}), tenants[18], vendors[8], tickets[24] (statuses in MOCK.ticketStatuses; urgency low|normal|high|emergency; photos; aiUrgencyScore; timeline), ledger[], ownerBills[6] (payments with cardFee, stripeRef), listings[5], leads[4], calls[3] (transcript pairs), pricing, alertRules, emergencyTimers, cardFee. Helpers MOCK.byId(col,id), MOCK.doorLabel(d), MOCK.cardFeeFor(amt).
  Inspect: node -e "global.window={};require('/home/user/Candi-site/beelo/shared/mock.js');console.log(window.MOCK.doors[0])"

index.html load order: `<link rel="stylesheet" href="../shared/ui.css">`, app.css, then `<script src="../shared/mock.js"></script><script src="../shared/ui.js"></script><script src="app.js"></script>`. structuredClone(MOCK) into local state and mutate it. Topbar with brand + "← All pitches" link to ../index.html. Show the pitch line and price tier visibly.

## Product facts (never contradict)
- Roles: tenant, property manager (the agent), owner, vendor. Tenants attach photos to tickets.
- Pricing per agent/month: Hive $25, BEELO $39, both $55. Owners get no bill from BEELO.
- Card payments run through the agent's OWN connected Stripe account; BEELO is only the conduit. Payer pays card fee, shown before the total. Agent-bills-owner has a logged payment history.
- Paying vendors/owners in-app from trust account: show "Coming soon" badge only; do not build.
- Alerts: Twilio, one local number per agent (not per door). Repeat until checked. Quiet hours 9 pm–8 am except emergencies.
- Emergency jobs broadcast to multiple vendors; first to accept wins. Timers: 15 min response, 30 min accept, 24 h fix.
- Valuations always labelled "Estimate, not an appraisal" with low–high range. Agents include valuations free or add a charge for portfolio analysis.
- MLS data is mock. UI.sampleBadge() on every screen showing listings or valuations. Never claim live MLS.
- ZERO mentions of "GM Financial", "GMF", or "Genesys" anywhere.

## Rules
Every button does something visible. No console errors. Money via UI.money. Phone-first; works at 375px and 1440px with no horizontal page scroll at 375. Plain, dated, human copy on tenant/owner/vendor screens. No network calls (font already handled). No frameworks, no build step. Add a "Run demo" button that auto-plays the hero moment step by step.

## Verify before reporting
`cd /home/user/Candi-site/beelo && python3 -m http.server <your port>` in background. Playwright (`require('playwright')`, chromium.launch() no options; scripts in /tmp/claude-0/-home-user-Candi-site/96f98c06-ae64-5861-9351-7ff2f5f766a6/scratchpad/<you>/) loads your page at 375 and 1440, clicks through the hero, asserts zero console errors/pageerrors and no horizontal overflow at 375. grep your css/js for `#[0-9a-fA-F]{3,6}` / `rgb` literals and fix. Stop your server when done.

Final report (short): files, line counts, hero test result, anything cut.
