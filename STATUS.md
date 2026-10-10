# STATUS — The Narrow Path

**Last updated:** 2026-10-10
**Live:** https://aviel-bolatkhan-01.github.io/the-narrow-path/ (GitHub Pages, main branch)
**Repo:** https://github.com/aviel-bolatkhan-01/the-narrow-path
**Single-file bundle:** `dist/narrow-path.html` (CSS+JS inlined, 212KB — images load from `assets/img/` relative to it; for a fully standalone share, open it from inside the repo folder)

## What this is

A Christian roguelike deck-builder (Slay the Spire-style): 3 acts, procedurally generated map nodes (fight/elite/rest/shop/event/treasure/boss), ~100 cards, relics, enemies drawn from scripture themes, events with choices, act-transition cinematics, animated FX, procedural audio (faith-music modes), save/resume.

## Verified state

- **Harness: 49/49 PASS** — runs on local file, dist bundle, and the live production URL (`?test=1` → `data-test-result="TEST PASS: 49 assertions"`)
- **Playtested (P7):** act 1 traversed repeatedly; starter deck beats tuned Goliath (turn-by-turn diagnostic, won at 8hp); act transition verified live (boss win → act 2, fresh 15-floor map, save written); defeat/victory flows verified; save → reload → auto-resume verified (gold preserved)
- **Art:** 40 pollinations images generated + wired (title backdrop, parchment texture, cardback, act banners, 31 enemy portraits + 3 resource icons). Pollinations watermark bottom-right of images — acceptable for v1
- **Balance v1:** starting HP 72, Defend 7 block (upgraded 10), Goliath hp 78–86 with Strike 15 / Defend 12 / Power Strike 21 / Rally +2 str / Whirlwind 10×3
- **Screens verified by screenshot:** title (art + readable buttons), map (act banner + parchment), combat (portraits, cardback, pile counts, hand clear of LOG/CONCEDE)

## How to play

1. Open the live URL → **BEGIN THE JOURNEY** (or CONTINUE if a run is saved — the game auto-resumes saved runs on load)
2. Click a connected map node (you start at floor 0)
3. Combat: click cards to play (click again to target if needed), **END TURN** when done; block absorbs incoming damage; beat the intent telegraphed above each enemy
4. Wins → pick 1 of 3 card rewards; rest sites let you heal or upgrade (smith) a card; shops buy cards/relics/potions; events are choices with consequences
5. Reach the act boss, win 3 acts → victory screen

## Commits (chronological)

- `0a4a6b5` initial scaffold
- `e235972` card data + audio/fx
- `40f8096` map/combat/reward/shop/event flows
- `5e2a13c` title screen CSS
- `d00526a` event resolve/modal/victory-defeat fixes
- `5925c73` art (40 images) + wiring + balance pass + smith fix + pile/hand layout fixes
- `13df7c5` dist single-file bundle
- (credits fix + STATUS.md — see latest commit)

## What's next (backlog, not blocking)

- **P9 optional polish:** event card art (`events/<id>.png` paths in `ui.js` renderEvent 404 to a hidden img — out of P6 scope, not a bug); faith-music needs a human listen (procedural audio modes exist but nobody has judged them aurally)
- **Balance:** sim autoplay reached floor 9 consistently — deeper runs / act 2-3 tuning needs more human play
- Map node click for unavailable nodes is ignored by `onMapPick` (engine gates correctly) — cosmetic, low risk
- `G.run.floor` starts at 0 (cosmetic off-by-one in floor counter)
- Card art: cards use CSS-only styling (no per-card images planned yet)

## Working rules (for future sessions)

- Orchestration: delegate code writes to `~/.claude/bin/mistral`; harness-check after every splice
- Harness: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-first-run --user-data-dir=/tmp/np2/cpN --virtual-time-budget=40000 --dump-dom "file://$(pwd | sed 's/ /%20/g')/index.html?test=1"` → grep `data-test-result` → must be 49/49
- After editing `index.html`-referenced files, rebuild bundle (inline python re.sub of link/script tags) and re-run harness on `dist/narrow-path.html`
- Push to main only after harness passes; Pages redeploys automatically on push (~30-60s)
