# THE NARROW PATH — Master Build Prompt v1
"You are building THE NARROW PATH, a Christian roguelike deck-building game with
Slay the Spire 2 depth, playable by opening index.html in a browser.

## 1. NON-NEGOTIABLE TECH RULES
- Vanilla HTML/CSS/JS only. No frameworks, no npm, no build step, no external JS.
- Classic <script src="js/..."> tags. NO ES modules, NO import/export, NO fetch of
  local files — the game must run from file:// by double-clicking index.html.
- Only network requests allowed at runtime: Google Fonts CSS link, local relative
  image paths (assets/img/*.png).
- Each JS file is an IIFE that assigns exactly ONE global: window.NP_CARDS,
  window.NP_AUDIO, window.NP_FX, window.NP_COMBAT, window.NP_MAP, window.NP_UI, or
  window.G (state, created in main.js). Never leak other globals.
- No comments in code unless logic is truly non-obvious. No placeholder/TODO code —
  every function fully implemented.
- All numbers in card text must exactly match the effect code (no lying cards).
- Works at 1280×800 and 1024×768. 60fps particle layer. Respect theme colors below.

## 2. GLOBAL STATE (owned by main.js, mutated by engines)
window.G = {
  screen: 'title'|'map'|'combat'|'reward'|'shop'|'rest'|'event'|'deck'|'gameover'|'victory'|'settings',
  settings: { master, music, sfx } (persisted localStorage 'np_settings'),
  meta: { runs, wins, bestFloor, trialsUnlocked, lastRun } (localStorage 'np_meta'),
  run: {
    act: 1|2|3, floor, seed,
    hp, maxHp, gold, potions: [ids], relics: [ids],
    deck: [{uid, id, upgraded}], map: {...}, currentNode,
    faith: 0..100
  },
  combat: null | {
    enemies: [{uid, id, hp, maxHp, block, statuses:{}, intent}],
    draw, hand, discard, exhaust: [[uid,id,upgraded]],
    energy, maxEnergy, turn, selectedCard, targetMode,
    playerBlock, playerStatuses: {strength, vulnerable, weak, faithBonus...},
    log: []
  }
}
Each deck card instance: {uid: unique, id: cardId, upgraded: bool}.
IDs are stable kebab-case strings. Instance uid = id + counter.

## 3. GAME DESIGN DEPTH (target: Slay the Spire 2)
### 3.1 Runs
- 3 acts: I "The Wilderness", II "The Valley of Shadows", III "The Celestial War".
- Each act = 15 floors of a branching node map (StS layout: 2-3 paths converging).
  Node types: combat, elite, event, shop, rest, treasure, boss(floor 15).
- Rest node: Rest (heal 30% maxHp) OR Smith (upgrade a card).
- Shop: buy cards/potions/relics, remove a card for gold (escalating price).
- Treasure: relic chest. Elites: hard fight + relic. Boss: rare relic + card reward.
- Win act 3 final boss = victory screen with score. Death = game over + score.
- Trials (ascension) 0–10 unlocked progressively (extra enemy HP/damage, less gold,
  curses in deck, boss heals, etc. — one modifier per Trial).

### 3.2 Resources — THE DUAL LOOP (signature)
- Energy: 3/turn (relics can modify), refreshed at turn start.
- Faith: 0–100. Prayer/skill cards GENERATE Faith. Miracle cards COST Faith instead
  of (or in addition to) Energy — powerful effects gated behind building Faith first.
  Faith persists during combat, resets to 0 at combat start, small carry-over bonus
  at combat end (= ceiling(faith/25) bonus gold, thematically "reward of faith").

### 3.3 Card system
- Types: attack (red ink), skill (blue ink), power (green ink), miracle (gold, costs Faith).
- Rarities: starter, common, uncommon, rare. Card rewards: choose 1 of 3 (bias to deck archetype).
- Upgrade: per-instance flag. Upgraded cards use effects[].up numbers instead of
  base (replacement, never addition). Data must NEVER contain text functions.
- Keywords (implement ALL): Exhaust, Ethereal, Vulnerable (take +50% attack dmg, 2 turns),
  Weak (-25% attack dmg, 2 turns), Strength (+dmg), Block (absorbs dmg, resets each turn),
  Draw, Energy, Faith, Retain, Inate (start in hand), Vulnerable-on-self, Poison-style
  "Plague" (take dmg each turn, decreases).
- Statuses implemented as a generic map with per-turn tick logic in combat.js.
- ~85 cards across 4 types. Starter deck: 5× strike + 4× defend + 1× mending_prayer.

### 3.4 Relics / Potions
- 30 relics: combat-start effects, turn triggers, on-kill, on-Shop, Faith-scaling.
  (e.g. "Mantle of Elijah": start combat with +2 Strength; "Harp of David": +1 Energy turn 1;
   "Crown of Thorns": reflect 3 dmg when hit.)
- 10 potions ("Living Water", "Oil of Joy"...): usable 1 per turn from belt (3 slots).

### 3.5 Enemies (~30) — Christian-themed, NOT cartoon
Act I: Tempter, Whisperer, Horned Imp, Grave Robber, Pharisee, Zealot, Wild Beast,
  elite: Legion Sergeant, elite: Abaddon's Hound, boss: GOLIATH.
Act II: Shadow of Doubt, Famine Spirit, Siren of Babylon, Iron Host, Wasteland Stalker,
  elite: Jezebel's Guard, elite: Moloch Colossus, boss: THE BEAST (Babylon).
Act III: Void Walker, Throne Guard, Locust of the Abyss, False Prophet,
  elite: Nephilim, elite: Apollyon, boss: THE DRAGON.
Final: after Act III boss → true-final boss node: DEATH & HADES (only if Trials ≥ 1? No — always).
- Every enemy: portrait image, HP bar, status chips, INTENT system (attack X / defend /
  buff / debuff) shown as icon with hover tooltip, 2-4 move patterns, elite/boss have
  telegraphed big attacks (Skull icon = heavy hit next turn).
- 14 events: binary/multi-choice biblical dilemmas (Good Samaritan, Rich Young Ruler,
  Denial of Peter...) with real consequences: cards, gold, HP, relic, curse, faith.

### 3.6 UI SCREENS (all must exist and work)
Title (NEW RUN / CONTINUE / SETTINGS / CREDITS) → Map → Combat → Reward (card choice,
gold, relic popup) → Shop → Rest → Event → Deck viewer (grid, right-click inspect,
filter by type) → Game Over → Victory. Plus: settings (3 volume sliders + mute),
pause menu (Esc) with concede, potion belt, relic tray with hover tooltips,
floating damage numbers, combat log toggle.

## 4. VISUAL IDENTITY — "Illuminated Manuscript"
- Palette (exact): parchment #f4e4bc, deep ink #2c2c2c, gold #d4af37, gold-glow #ffd700,
  blood #8b1a1a, faith-blue #4a90e2, miracle-gold #ffb300, shadow #1a120b, act-tint overlays
  (I: dawn amber, II: violet dusk, III: crimson).
- Fonts: 'Cinzel Decorative' (titles), 'Cinzel' (UI/labels), 'EB Garamond' (card body text).
- Parchment background with subtle animated grain; vignette; double gold rules as dividers.
- Cards: physical feel — CSS 3D perspective, hover = lift + tilt toward cursor,
  selected = raise + gold glow, unplayable = desaturate + shake on attempt.
  Layout: cost gem (top-left), type ribbon (top-right), art window (image or ink glyph),
  name plate, rule line, text box (bold numbers), keyword chips colored.
- Enemies: full portrait image in arched frame (manuscript arch), ink-bleed dissolve on death,
  hit flash white → red shake, intent icon above head.
- FX: ink splatter particles on hits, gold shimmer burst on miracles, parchment-tear
  particles on exhaust, screen shake on heavy hits (boss = bigger), floating damage numbers
  (white=player dmg, red=received, gold=heal), full-screen flash on act transition.
- Card reward: cards flip in with 3D rotation. Map nodes: illuminated dots + gold path lines,
  current node pulsing, boss node skull seal.

## 5. AUDIO IDENTITY — 100% Web Audio synthesis (no files)
- Init AudioContext on FIRST user gesture (click). If suspended → resume. Never autoplay-error.
- Graph: master gain → [musicGain, sfxGain]. Persist volumes in localStorage.
- MUSIC scenes: title, map, combat, elite, boss, victory, defeat, shop — each = layered loop:
  * pad: 2-3 detuned saw/sine oscillators through lowpass (chord per scene, slow LFO)
  * arp: triangle-wave harp arpeggio, 8-note pattern (D dorian for map, darker for boss)
  * percussion (combat only): noise-burst kick/hat via gain envelopes
  * FAITH MODULATION: run.faith < 30 → sparse wind (filtered noise) only;
    30–70 → add arp; >70 → add choral stack (3 sine voices, slow vibrato). Faith bar
    visibly drives the music.
- Crossfade scenes over ~1.2s. Sequencer via lookahead scheduler (setInterval 25ms +
  AudioContext.currentTime), NOT setTimeout-per-note.
- SFX (synthesize each): card_draw (short noise flick), card_play (quill scratch = bandpassed
  noise burst), card_exhaust (paper tear = descending filtered noise), hit (thump + crack),
  block (wood knock), heal (rising sine shimmer), gold (2 coin clinks), potion (bubble),
  relic (deep bell), miracle (3-voice choir chord + shimmer), turn_start (soft chime),
  victory (major chord arpeggio), defeat (low drone fall), menu_hover (tick), menu_click,
  error (deny buzz), intent_warn (low thud before big enemy hit).
- SFX throttling: same sound ≤ 6 concurrent voices (stack via voice counter).

## 6. CONTENT SCHEMA (exact — all data files must conform)
Card (NO text functions, NO v1/v2/upgradeV1 fields, NO keywords arrays):
  { id:'snake_case', name, type:'attack'|'skill'|'power'|'miracle',
    cost:0..3, faithCost?:40..100 (miracles ONLY, cost must be 0),
    rarity:'starter'|'common'|'uncommon'|'rare',
    target:'enemy'|'all'|'self'|'none',
    glyph:'ONE emoji/unicode character',
    effects:[ ...1..3 effects... ],
    exhaust?:true, ethereal?:true, innate?:true, retain?:true }
  Effect = { op:'name', base:<number>, up:<number> } — every effect: up >= base, AND
  each card must contain at least one effect with up > base.
  Exception: { op:'cleanse' } has no numbers.
  damage effect may carry times:N: { op:'damage', base, up, times:2 }.
  ALLOWED ops (use only these):
    damage, block, faith, draw, energy, heal, strength,
    weak, vulnerable, plague, cleanse,
    blockPerTurn, strengthPerTurn, faithPerTurn, drawPerTurn,
    blockPlus, weakOnAttack, thorns, combatStartStrength, combatStartBlock
  Semantics: block/faith/draw/energy/heal/strength/cleanse/*PerTurn/blockPlus/
    combatStart* = self. damage/weak/vulnerable/plague target enemies per card.target
    ('enemy' = one, 'all' = every enemy). thorns/weakOnAttack are passive — no target.
  UI auto-generates the description text from effects + flags (numbers can never lie).
  Upgrade replaces base with up. Card instance: {uid, id, upgraded}.
Relic:  { id, name, rarity, text, icon, hook, value, hook2?, value2? }
  hook values (EXACT — combat.js/fireRelic dispatches by these strings):
    startingFaith, combatStartStrength, combatStartBlock, energyPerTurn, thorns,
    faithOnKill, faithOnEliteKill, faithPerTurnCombat, blockOnTurnStart,
    strengthOnHurt, faithPerCardPlayed, goldOnVictory, cardRewardPlus, potionBonus,
    drawTurn1, maxHpOnPickup, miracleDiscount
  hook2/value2 = optional second effect on the same relic.
  maxHpOnPickup and cardRewardPlus and goldOnVictory are handled by main.js/reward
  screens, not combat.
Potion: { id, name, text, icon, effect, value, turns?, target?, effect2?, value2? }
  potion effect values: heal, block, strength (duration = turns), damage (random enemy
  if target 'random', all if 'all'), cure (=cleanse), faith, energy.
Enemy:  { id, name, hp:[min,max], tier:'normal'|'elite'|'boss',
          art:'assets/img/en_<id>.png',
          moves:[{name, kind:'attack'|'defend'|'buff'|'debuff',
                  value?, block?, effect?, times?, weight, telegraph?}],
          ai:'random'|'pattern' }
  Move effect values: 'vulnerable'|'weak'|'strength'|'plague'. Multi-enemy fights are
  built by map.js encounter tables repeating ids (['horned_imp','horned_imp']) — no count field.
Event:  { id, title, text, choices:[{ label, result:(G,api)=>void }] }
  After applying effects, result MUST call api.resolve('map'|'combat'|'reward'|...).
  api methods (all implemented in main.js): addCard(id), removeCard(uidOrId),
  upgradeRandomCard(), addCurse(id), removeAllCurses(), heal(n), healToFull(), loseHp(n),
  loseMaxHp(n), damage(n) (combat-less HP loss with fx), gainGold(n), loseGold(n),
  gainRelic(id), loseStartingRelic(), hasRelic(id)→bool, gainPotion(id),
  maxHp(n) (raises maxHp), resolve(screen)
  Curses live in window.NP_CURSES: { id, name, cost:0, type:'curse', unplayable:true,
  text:<static string>, curse:true } — curses MAY have static text strings.

## 7. MODULE INTERFACES (contracts — do not deviate)
NP_AUDIO: { init(), sfx(name, opts?), playScene(name), setFaithLevel(f),
            setVol(master,music,sfx), getVol(), suspend(), resume() }
NP_FX:    { burst(x,y,{color,count,spread}), damageNumber(x,y,amount,kind),
            shake(mag,dur), flash(color), sparkles(el), setCanvas(zIndex) }
NP_OPS:   { applyCardEffects(G, inst, def, targetIdx), hitEnemy(G, idx, base, opts?),
            hitPlayer(G, amount, fromIdx), drawCards(G, n),
            gainBlock(G, side, n), addStatus(G, side, status, n), tickStatuses(G, side),
            plagueTick(G, side), enemyChooseMove(G, enemy), enemyExecute(G, enemy, move),
            applyPotion(G, potionDef), fireRelic(G, hook, data?) }
            side = 'player' | enemy index (number). All mutate G, no DOM access.
            hitEnemy(G, idx, base, {fromAttack=true}): adds player strength, applies
            player weak ×0.75 and enemy vulnerable ×1.5 (floor) when fromAttack, then
            enemy block, returns HP lost. hitPlayer(G, amount, fromIdx): amount is
            already modified; absorbs into playerBlock, damages hp, then thorns
            retaliation to fromIdx (if given). enemyChooseMove picks by ai mode
            ('random' weighted by move.weight, 'pattern' cycles moves in order),
            writes enemy.intent for the UI. fireRelic runs every relic whose hook
            matches (value/value2, incl. hook2).
NP_COMBAT: { start(run,enemyIds), playCard(uid,targetUid|null), endTurn(),
             selectCard(uid), cancelSelect(), usePotion(id),
             canPlay(uid)→{ok,reason}, isOver(), result() }
NP_MAP:   { generate(act,floorCount,seed), render(container,onPick), availableNodes(),
             nodeInfo(node), advanceTo(node) }
NP_UI:    { show(screen), renderAll(), renderHand(), renderMap(), renderDeck(cards,mode),
            tooltip(html,ev), toast(msg,type), modal({title,body,buttons}) }
main.js:  boots everything, owns G, wires DOM events, save/load after every node,
          exposes window.G and NP_* only.

## 8. QUALITY BAR (acceptance criteria)
1. Zero console errors on load, title, full 3-act playthrough, defeat, victory.
2. ?test=1 runs an automated harness: starts a run, auto-plays 3 scripted combats
   using NP_COMBAT APIs, prints "TEST PASS: <n> assertions" or "TEST FAIL: <details>"
   into document.body.dataset.testResult AND a visible #test-results div.
3. Every card in data-cards.js is obtainable in-game and playable (no dead data).
4. All 14 events reachable via map generation; all 30 enemies used in their act.
5. Balanced enough that a decent player can win Act I on first run with starter+rewards.
6. jank-free: particle canvas uses requestAnimationFrame single loop with delta time;
   DOM updates batched (render on state change, not per frame).

DELIVERABLE RULE: when given a file task, output ONLY that file's complete content,
no markdown fences, no explanation. Build it right the first time."
