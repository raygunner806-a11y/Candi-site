# BEELO + Hive: six pitch prototypes

These are clickable prototypes for pitching BEELO and Hive to real estate agents. Everything runs on mock data. No call goes to MLS, Stripe or Twilio. Every screen that shows listings or valuations carries a **Sample data** badge.

## Run

```bash
cd beelo
python3 -m http.server 8000
```

Open http://localhost:8000/ to get the pitch picker. Each version also has a **Run demo** button that plays its hero moment by itself.

## Which version for which agent

| # | Folder | Price | Best for |
|---|---|---|---|
| 1 | `v1-hive-solo` | Hive $25 | An agent running a few doors by text and spreadsheet. Shows: tenant photo ticket → board → vendor in 3 taps → tenant sees status. |
| 2 | `v2-beelo-voice` | BEELO $39 | A producer who misses calls while showing. Shows: "three bed under four-fifty in Frisco" → results with sources; a missed call → transcript → lead. |
| 3 | `v3-bundle` | Both $55 | An agent who manages and sells. Shows: a rental's "good time to sell or 1031" prompt → one tap → listing lead. |
| 4 | `v4-owner-portal` | Hive $25 | An agent competing for investor owners. Shows: agent toggles valuations "included" vs "add-on" and the owner's phone updates live. |
| 5 | `v5-after-hours` | Hive $25 | An agent tired of 2 am calls. Shows: burst pipe → repeating texts → 3-plumber race → timers → closeout. |
| 6 | `v6-switch` | Hive $25 / Both $55 | An agent on AppFolio or similar. Shows: sample CSV → 23 doors, 18 tenants, 12 owners imported → live console. Includes a savings calculator; no competitor prices are invented. |

## Layout

- `shared/` holds the frozen foundation: design tokens (the only place colors are defined), the UI kit, the helpers and one mock data set (agent Jordan Ellis, 23 DFW doors).
- `v1-…` to `v6-…` each contain `index.html`, `app.js` and `app.css`, and each file is under 400 lines.
- `qa/` holds Playwright screenshots of every version at 375 and 1440 px, taken at the start and after the hero moment.
- `BRIEF.md` is the brief the six builder agents worked from.

## QA results

- Every version at 375 and 1440 px: zero console errors, no horizontal scroll, no outside network calls (the only one is the Google font).
- A search for "GM Financial", "GMF" and "Genesys" finds nothing.
- There are no hard-coded colors outside `shared/tokens.css`.

## Changes from the original plan

- **Folder:** the prototypes live in `/beelo/`, not the repo root, because the root `index.html` is Candi Munguia's live site.
- **One branch:** this environment allows only one push branch, so each version is its own commit on `claude/gifted-rubin-lrbdd0` rather than its own branch. Builders shared one checkout, and no two of them touched the same folder.
- **Brand colors:** no existing BEELO or Hive tokens were found, so the stand-ins are used (ivory `#FAF6EC`, gold `#B8913A`, ink `#1E1B16`).

## Scope cut and assumptions

- **Cut:** no feature from the brief was cut. Buttons for call back, text, CSV export and PDF save show a confirmation toast instead of acting. Paying vendors or owners from the trust account appears only as a "Coming soon" badge.
- **V3:** the hero door is d12 (Prosper), the best-equity occupied door. Equity is the estimate minus the purchase price (the mock has no loans). Selling costs of 7% and a 3% listing side are labelled as estimates.
- **V4:** cap rate is 12-month net income, minus tax and insurance, divided by the estimate.
- **V5:** the clock runs fast (1 sim-minute = 0.3 s). Plumbers are texted before the agent acknowledges. Dollar amounts are mock.
- **V6:** the sample CSV is a rent-roll layout. A real CSV dropped in is parsed in the browser and starts with no tickets.
