(function() {
  'use strict';

  // Initialize global state
  window.G = {
    screen: 'title',
    settings: { master: 100, music: 100, sfx: 100 },
    meta: { runs: 0, wins: 0, bestFloor: 0, trialsUnlocked: 0, lastRun: null },
    run: null,
    combat: null,
    reward: null,
    shop: null,
    activeEvent: null,
    deckFilter: null,
    logOpen: false,
    _modalButtons: null,
    _eventResolved: false,
    _finishing: false
  };

  // Normalize data
  function normalizeData() {
    for (const k in NP_CARDS) {
      NP_CARDS[k].id = k;
    }
    for (const k in NP_CURSES) {
      NP_CARDS[k] = Object.assign(
        { type: 'curse', unplayable: true, rarity: 'curse' },
        NP_CURSES[k],
        { id: k }
      );
    }
  }

  // Load settings
  function loadSettings() {
    const saved = localStorage.getItem('np_settings');
    if (saved) {
      try {
        G.settings = JSON.parse(saved);
        if (window.NP_AUDIO && NP_AUDIO.setVol) {
          NP_AUDIO.setVol(G.settings.master / 100, G.settings.music / 100, G.settings.sfx / 100);
        }
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
  }

  // Save settings
  function saveSettings() {
    localStorage.setItem('np_settings', JSON.stringify(G.settings));
  }

  // Initialize FX canvas
  function initFX() {
    const canvas = document.getElementById('fx-canvas');
    if (canvas && window.NP_FX && NP_FX.setCanvas) {
      NP_FX.setCanvas(canvas);
    }
  }

  // Initialize audio on first gesture
  function initAudioOnGesture() {
    document.addEventListener('click', function onFirstGesture() {
      if (window.NP_AUDIO && NP_AUDIO.init) {
        NP_AUDIO.init();
      }
      document.removeEventListener('click', onFirstGesture);
    }, { once: true });
  }

// Run test harness
  async function runTestHarness() {
    const results = [];
    let assertions = 0;
    let eventApi = null;

    function assert(cond, label) {
      assertions++;
      if (cond) {
        results.push(`✓ ${label}`);
      } else {
        results.push(`✗ ${label}`);
      }
    }

    try {
      try {
        // Test 1: Data counts
        assert(Object.keys(NP_CARDS).length >= 88, 'NP_CARDS count >= 88');
        assert(Object.keys(NP_ENEMIES).length === 31, 'NP_ENEMIES count === 31');
        assert(Object.keys(NP_RELICS).length >= 30, 'NP_RELICS count >= 30');
        assert(Object.keys(NP_EVENTS).length === 14, 'NP_EVENTS count === 14');
        assert(Object.keys(NP_POTIONS).length === 10, 'NP_POTIONS count === 10');
      } catch (e) {
        results.push(`✗ step 1: ${e.message}`);
      }

      try {
        // Test 2: New run and map generation
        newRun('seed-test');
        assert(G.run.deck.length === 10, 'Starter deck has 10 cards');
        assert(G.run.map.floors.length === 15, 'Map has 15 floors');
        assert(G.run.map.floors[14].length === 1 && G.run.map.floors[14][0].type === 'boss', 'Last floor is boss');
        assert(G.run.map.floors[0].length === 1 && G.run.map.floors[0][0].type === 'combat', 'First floor is combat');
        const flat = G.run.map.floors.flat();
        assert(flat.some(node => node.type === 'shop'), 'Map has at least one shop node');
        assert(flat.filter(node => node.type === 'rest').length >= 2, 'Map has at least two rest nodes');
        assert(flat.some(node => node.type === 'treasure'), 'Map has at least one treasure node');
        assert(flat.filter(node => node.type === 'elite').length === 2, 'Map has exactly two elite nodes');
        assert(G.run.map.edges.length > 0, 'Map has edges');
        assert(G.run.map.edges.every(edge => flat.some(node => node.uid === edge[0]) && flat.some(node => node.uid === edge[1])), 'All edges have valid endpoints');

        NP_MAP.generate(2, 15, 'test-act2');
        assert(G.run.deck.length === 10, 'Starter deck has 10 cards (act 2)');
        assert(G.run.map.floors.length === 15, 'Map has 15 floors (act 2)');
        assert(G.run.map.floors[14].length === 1 && G.run.map.floors[14][0].type === 'boss', 'Last floor is boss (act 2)');
        assert(G.run.map.floors[0].length === 1 && G.run.map.floors[0][0].type === 'combat', 'First floor is combat (act 2)');
        const flat2 = G.run.map.floors.flat();
        assert(flat2.some(node => node.type === 'shop'), 'Map has at least one shop node (act 2)');
        assert(flat2.filter(node => node.type === 'rest').length >= 2, 'Map has at least two rest nodes (act 2)');
        assert(flat2.some(node => node.type === 'treasure'), 'Map has at least one treasure node (act 2)');
        assert(flat2.filter(node => node.type === 'elite').length === 2, 'Map has exactly two elite nodes (act 2)');
        assert(G.run.map.edges.length > 0, 'Map has edges (act 2)');
        assert(G.run.map.edges.every(edge => flat2.some(node => node.uid === edge[0]) && flat2.some(node => node.uid === edge[1])), 'All edges have valid endpoints (act 2)');

        NP_MAP.generate(3, 15, 'test-act3');
        assert(G.run.deck.length === 10, 'Starter deck has 10 cards (act 3)');
        assert(G.run.map.floors.length === 15, 'Map has 15 floors (act 3)');
        assert(G.run.map.floors[14].length === 1 && G.run.map.floors[14][0].type === 'boss', 'Last floor is boss (act 3)');
        assert(G.run.map.floors[0].length === 1 && G.run.map.floors[0][0].type === 'combat', 'First floor is combat (act 3)');
        const flat3 = G.run.map.floors.flat();
        assert(flat3.some(node => node.type === 'shop'), 'Map has at least one shop node (act 3)');
        assert(flat3.filter(node => node.type === 'rest').length >= 2, 'Map has at least two rest nodes (act 3)');
        assert(flat3.some(node => node.type === 'treasure'), 'Map has at least one treasure node (act 3)');
        assert(flat3.filter(node => node.type === 'elite').length === 2, 'Map has exactly two elite nodes (act 3)');
        assert(G.run.map.edges.length > 0, 'Map has edges (act 3)');
        assert(G.run.map.edges.every(edge => flat3.some(node => node.uid === edge[0]) && flat3.some(node => node.uid === edge[1])), 'All edges have valid endpoints (act 3)');
      } catch (e) {
        results.push(`✗ step 2: ${e.message}`);
      }

      try {
        // Test 3: Scripted combats
        const testCombats = [
          ['tempter'],
          ['horned_imp', 'horned_imp'],
          ['pharisee']
        ];

        for (const enemies of testCombats) {
          let attempts = 0;
          let result;

          while (attempts < 3) {
            attempts++;
            G.run.hp = G.run.maxHp;
            NP_COMBAT.start(G.run, enemies);

            let iterations = 0;
            while (!NP_COMBAT.isOver() && iterations < 200) {
              iterations++;
              let played = false;
              for (const inst of [...G.combat.hand]) {
                const def = NP_CARDS[inst.id];
                if (!def) continue;
                const alive = G.combat.enemies.filter(e => e.hp > 0);
                if (!alive.length) break;
                const target = def.target === 'enemy' ? alive[0].uid : null;
                if (NP_COMBAT.canPlay(inst.uid, target).ok) {
                  NP_COMBAT.playCard(inst.uid, target);
                  played = true;
                }
              }
              if (!played) {
                NP_COMBAT.endTurn();
              }
              if (NP_COMBAT.isOver()) break;
            }

            result = NP_COMBAT.result();
            if (result && result.win) break;
          }

          assert(result && result.win, `Combat vs ${enemies.join(', ')} wins`);
        }
      } catch (e) {
        results.push(`✗ step 3: ${e.message}`);
      }

      try {
        // Test 4: NP_OPS math
        const testEnemy = { uid:'test_enemy', id:'test_enemy', def:{tier:'normal'},
          hp:20, maxHp:20, block:0, statuses:{} };
        const G2 = { run:{ hp:60, maxHp:60, relics:[], deck:[] },
          combat:{ enemies:[testEnemy], playerStatuses:{ strength:0, weak:0, vulnerable:0,
          plague:0 }, playerBlock:0, log:[] } };

        // Test vulnerable ×1.5
        testEnemy.statuses.vulnerable = 2;
        const strikeDamage = NP_OPS.hitEnemy(G2, 0, NP_CARDS['strike'].effects[0].base, { fromAttack: true });
        assert(strikeDamage === 9, 'Strike damage with vulnerable ×1.5');

        // Test upgraded strike
        testEnemy.statuses.vulnerable = 2;
        testEnemy.hp = 20;
        const upgradedStrikeDamage = NP_OPS.hitEnemy(G2, 0, NP_CARDS['strike'].effects[0].up, { fromAttack: true });
        assert(upgradedStrikeDamage === 13, 'Upgraded strike damage with vulnerable ×1.5');

        // Test plague tick
        testEnemy.statuses.plague = 3;
        testEnemy.hp = 20;
        NP_OPS.plagueTick(G2, 0);
        assert(testEnemy.statuses.plague === 2 && testEnemy.hp === 17, 'Plague tick reduces stack and HP');
      } catch (e) {
        results.push(`✗ step 4: ${e.message}`);
      }

      try {
        // Test 5: Event API
        eventApi = buildEventApi();
        const goldBefore = G.run.gold;
        eventApi.gainGold(50);
        assert(G.run.gold === goldBefore + 50, 'gainGold(50) adds 50 gold');
        eventApi.loseGold(99999);
        assert(G.run.gold === 0, 'loseGold(99999) sets gold to 0');
        eventApi.addCurse('fear');
        assert(G.run.deck.some(card => card.id === 'fear'), 'addCurse adds curse to deck');
        eventApi.removeAllCurses();
        assert(!G.run.deck.some(card => card.id === 'fear'), 'removeAllCurses removes all curses');
        eventApi.gainRelic('rare_relic');
        assert(G.run.relics.length > 0, 'gainRelic adds relic');
        assert(eventApi.hasRelic(G.run.relics[0]), 'hasRelic returns true for owned relic');
      } catch (e) {
        results.push(`✗ step 5: ${e.message}`);
      }

      try {
        // Test 6: Save/load
        const saveSnapshot = JSON.stringify(G.run);
        save();
        G.run.gold = 12345;
        load();
        assert(JSON.stringify(G.run) === saveSnapshot, 'Save/load roundtrip preserves state');
      } catch (e) {
        results.push(`✗ step 6: ${e.message}`);
      }

      try {
        // Test 7: Upgrade random card
        const api7 = eventApi || buildEventApi();
        const upgradedBefore = G.run.deck.filter(card => card.upgraded).length;
        api7.upgradeRandomCard();
        const upgradedAfter = G.run.deck.filter(card => card.upgraded).length;
        assert(upgradedAfter === upgradedBefore + 1, 'upgradeRandomCard upgrades exactly one card');
      } catch (e) {
        results.push(`✗ step 7: ${e.message}`);
      }
    } catch (e) {
      results.push(`✗ harness exception: ${e.message}`);
    }

    // Display results
    const passCount = results.filter(r => r.startsWith('✓')).length;
    const failCount = results.filter(r => r.startsWith('✗')).length;
    const testResult = failCount === 0 && passCount >= 20 ? `TEST PASS: ${passCount} assertions` :
                       failCount === 0 ? `TEST FAIL: aborted early (${passCount} assertions)` :
                       `TEST FAIL: ${failCount} failed of ${passCount + failCount}`;

    document.body.dataset.testResult = testResult;
    const testResultsDiv = document.getElementById('test-results');
    if (testResultsDiv) {
      testResultsDiv.innerHTML = results.map(r => `<div>${r}</div>`).join('');
      testResultsDiv.style.display = 'block';
    }
    console.log(testResult);
    console.log(results.join('\n'));

    // Reset G for normal play
    newRun();
    NP_UI.show('title');
  }

  // Build event API
  function buildEventApi() {
    return {
      resolve(screen = 'map') {
        G._eventResolved = true;
        G.activeEvent = null;
        save();
        NP_UI.show(screen);
      },
      addCard(id) {
        if (id === 'rare_card') {
          id = getRandomRareCard();
        } else if (id === 'manna' && !NP_CARDS['manna']) {
          id = 'prayer_of_healing';
        }
        if (!NP_CARDS[id] || NP_CARDS[id].type === 'curse') return;
        addCardInstance(id);
      },
      addCurse(id) {
        if (!NP_CARDS[id] || NP_CARDS[id].type !== 'curse') return;
        addCardInstance(id);
      },
      removeCard(id) {
        const index = G.run.deck.findIndex(card => card.id === id && !card.upgraded);
        if (index === -1) {
          const anyIndex = G.run.deck.findIndex(card => card.id === id);
          if (anyIndex === -1) return;
          G.run.deck.splice(anyIndex, 1);
        } else {
          G.run.deck.splice(index, 1);
        }
      },
      upgradeRandomCard() {
        const upgradable = G.run.deck.filter(card => !card.upgraded && card.type !== 'curse');
        if (upgradable.length === 0) return;
        const randomCard = upgradable[Math.floor(Math.random() * upgradable.length)];
        randomCard.upgraded = true;
      },
      removeAllCurses() {
        G.run.deck = G.run.deck.filter(card => card.type !== 'curse');
      },
      heal(n) {
        G.run.hp = Math.min(G.run.hp + n, G.run.maxHp);
      },
      healToFull() {
        G.run.hp = G.run.maxHp;
      },
      loseHp(n) {
        G.run.hp = Math.max(G.run.hp - n, 0);
        if (G.run.hp === 0) {
          finishCombat(true);
        }
      },
      loseMaxHp(n) {
        G.run.maxHp = Math.max(1, G.run.maxHp - n);
        G.run.hp = Math.min(G.run.hp, G.run.maxHp);
      },
      damage(n) {
        this.loseHp(n);
      },
      gainGold(n) {
        G.run.gold += n;
      },
      loseGold(n) {
        G.run.gold = Math.max(0, G.run.gold - n);
      },
      gainRelic(id) {
        if (id === 'rare_relic') {
          id = getRandomRareRelic();
        }
        if (G.run.relics.includes(id)) {
          NP_UI.toast('Already owned', 'error');
          return;
        }
        G.run.relics.push(id);
      },
      loseStartingRelic() {
        if (G.run.relics.length > 0) {
          G.run.relics.shift();
        }
      },
      hasRelic(id) {
        return G.run.relics.includes(id);
      },
      gainPotion(id) {
        if (G.run.potions.length < 3) {
          G.run.potions.push(id);
        } else {
          NP_UI.toast('Potion belt full', 'error');
        }
      },
      maxHp(n) {
        G.run.maxHp += n;
        G.run.hp = Math.min(G.run.hp, G.run.maxHp);
      }
    };
  }

  // Helper: Add card instance to deck
  function addCardInstance(id) {
    const uid = id + '_' + (G.run.uidc = (G.run.uidc || 0) + 1);
    G.run.deck.push({ uid, id, upgraded: false, type: (NP_CARDS[id] || {}).type });
  }

  // Helper: Get random rare card
  function getRandomRareCard() {
    const rareCards = Object.keys(NP_CARDS).filter(id =>
      NP_CARDS[id].rarity === 'rare' && NP_CARDS[id].type !== 'curse'
    );
    return rareCards[Math.floor(Math.random() * rareCards.length)];
  }

  // Helper: Get random rare relic
  function getRandomRareRelic() {
    const unownedRelics = Object.keys(NP_RELICS).filter(id =>
      !G.run.relics.includes(id) &&
      (NP_RELICS[id].rarity === 'rare' || Math.random() < 0.3)
    );
    return unownedRelics[Math.floor(Math.random() * unownedRelics.length)];
  }

  // Save game state
  function save() {
    if (G.run) {
      localStorage.setItem('np_save', JSON.stringify(G.run));
    }
  }

  // Load game state
  function load() {
    const saved = localStorage.getItem('np_save');
    if (saved) {
      try {
        G.run = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load save:', e);
      }
    }
  }

  // New run
  function newRun(seed) {
    delete localStorage.np_save;
    G.run = {
      act: 1,
      floor: 0,
      seed: seed || String(Date.now()),
      hp: 72,
      maxHp: 72,
      gold: 99,
      potions: [],
      relics: ['prayer_beads'],
      deck: [
        { uid: 'strike_1', id: 'strike', upgraded: false },
        { uid: 'strike_2', id: 'strike', upgraded: false },
        { uid: 'strike_3', id: 'strike', upgraded: false },
        { uid: 'strike_4', id: 'strike', upgraded: false },
        { uid: 'strike_5', id: 'strike', upgraded: false },
        { uid: 'defend_6', id: 'defend', upgraded: false },
        { uid: 'defend_7', id: 'defend', upgraded: false },
        { uid: 'defend_8', id: 'defend', upgraded: false },
        { uid: 'defend_9', id: 'defend', upgraded: false },
        { uid: 'mending_prayer_10', id: 'mending_prayer', upgraded: false }
      ],
      faith: 0,
      usedEvents: [],
      removeCount: 0,
      trials: G.meta.trials || 0,
      uidc: 100
    };
    NP_MAP.generate(1, 15, G.run.seed);
    G.reward = null;
    G.screen = 'map';
    G.meta.runs++;
    localStorage.setItem('np_meta', JSON.stringify(G.meta));
  }

  // Finish combat
  function finishCombat(forceDefeat) {
    if (G._finishing) return;
    G._finishing = true;

    setTimeout(() => {
      const result = NP_COMBAT.result();
      if (!result.win || forceDefeat) {
        // Game over
        G.meta.bestFloor = Math.max(G.meta.bestFloor, G.run.floor);
        G.score = { floor: G.run.floor, hp: 0, gold: G.run.gold, trials: G.run.trials };
        G.meta.lastRun = G.score;
        save();
        delete localStorage.np_save;
        G.screen = 'gameover';
        if (window.NP_AUDIO && NP_AUDIO.playScene) {
          NP_AUDIO.playScene('defeat');
        }
      } else {
        // Victory
        let baseGold;
        const currentNode = G.run.map.floors.flat().find(n => n.uid === G.run.currentNode) || { type: 'combat', floor: (G.run.floor || 1) - 1 };
        const node = NP_MAP.nodeInfo(currentNode);
        if (node.type === 'boss') {
          baseGold = 75 + G.run.floor * 4;
        } else if (node.type === 'elite') {
          baseGold = 40 + G.run.floor * 3;
        } else {
          baseGold = 15 + G.run.floor * 2;
        }

        const gold = Math.round(baseGold * (1 - 0.05 * G.run.trials));
        G.run.gold += gold;
        NP_UI.toast(`+${gold} gold`);

        if (node.type === 'boss' && G.run.act < 3) {
          // Advance act
          G.run.act++;
          if (window.NP_FX && NP_FX.flash) {
            const colors = ['rgba(122,92,168,.35)', 'rgba(191,64,191,.35)', 'rgba(191,64,64,.35)'];
            NP_FX.flash(colors[G.run.act - 1]);
          }
          const actNames = ['ACT II — The Valley of Shadows', 'ACT III — The Celestial War'];
          NP_UI.toast(actNames[G.run.act - 2]);
          NP_MAP.generate(G.run.act, 15, G.run.seed + 'a' + G.run.act);
          G.run.floor = 0;
          save();
          NP_UI.show('map');
        } else if (node.type === 'boss' && G.run.act === 3 && node.id === 'the_dragon') {
          // Final boss
          G.reward = {
            cards: rareCardPool(3),
            pendingRelic: getRandomRareRelic()
          };
          G._finalVictory = true;
          G.screen = 'reward';
          G._finishing = false;
          NP_UI.renderAll();
          return;
        } else {
          // Normal combat reward
          if (node.type === 'elite') {
            G.reward = {
              cards: rareCardPool(3),
              pendingRelic: getRandomRareRelic()
            };
          } else if (node.type === 'boss') {
            G.reward = {
              cards: rareCardPool(3),
              pendingRelic: getRandomRareRelic()
            };
          } else {
            G.reward = {
              cards: rareCardPool(3)
            };
          }
          G.screen = 'reward';
        }
      }

      G._finishing = false;
      NP_UI.renderAll();
    }, 1000);
  }

  function finishReward() {
    function goForward() {
      if (G._finalVictory) {
        G._finalVictory = false;
        G.score = { floor: G.run.floor, hp: G.run.hp, gold: G.run.gold, trials: G.run.trials };
        G.meta.lastRun = G.score;
        G.meta.bestFloor = Math.max(G.meta.bestFloor, G.run.floor);
        save();
        delete localStorage.np_save;
        G.screen = 'victory';
      } else {
        G.screen = 'map';
        save();
      }
      NP_UI.renderAll();
    }

    if (G.reward && G.reward.pendingRelic) {
      const relicId = G.reward.pendingRelic;
      G.reward.pendingRelic = null;
      NP_UI.modal({
        title: 'Relic Found',
        body: NP_RELICS[relicId].name + ' - ' + NP_RELICS[relicId].text,
        buttons: [{
          label: 'TAKE IT',
          fn: () => {
            G.run.relics.push(relicId);
            NP_UI.modal(null);
            G.reward = null;
            goForward();
          }
        }]
      });
      return;
    }
    G.reward = null;
    goForward();
  }

  // Rare card pool
  function rareCardPool(count) {
    const pool = [];
    const rareCards = Object.keys(NP_CARDS).filter(id =>
      NP_CARDS[id].rarity === 'rare' && NP_CARDS[id].type !== 'curse'
    );
    const uncommonCards = Object.keys(NP_CARDS).filter(id =>
      NP_CARDS[id].rarity === 'uncommon' && NP_CARDS[id].type !== 'curse'
    );
    const commonCards = Object.keys(NP_CARDS).filter(id =>
      NP_CARDS[id].rarity === 'common' && NP_CARDS[id].type !== 'curse'
    );

    while (pool.length < count) {
      const rarityRoll = Math.random();
      let cardId;

      if (rarityRoll < 0.12) {
        cardId = rareCards[Math.floor(Math.random() * rareCards.length)];
      } else if (rarityRoll < 0.45) {
        cardId = uncommonCards[Math.floor(Math.random() * uncommonCards.length)];
      } else {
        cardId = commonCards[Math.floor(Math.random() * commonCards.length)];
      }

      if (!pool.includes(cardId)) {
        pool.push(cardId);
      }
    }

    return pool;
  }

  // Handle map pick
  NP_UI.onMapPick = function(node) {
    NP_MAP.advanceTo(node);
    const nodeInfo = NP_MAP.nodeInfo(node);

    switch (nodeInfo.type) {
      case 'combat':
      case 'elite':
      case 'boss':
        NP_COMBAT.start(G.run, node.encounter);
        if (window.NP_AUDIO && NP_AUDIO.playScene) {
          if (nodeInfo.type === 'boss') {
            NP_AUDIO.playScene('boss');
          } else if (nodeInfo.type === 'elite') {
            NP_AUDIO.playScene('elite');
          } else {
            NP_AUDIO.playScene('combat');
          }
        }
        G.screen = 'combat';
        break;
      case 'event':
        const unusedEvents = Object.keys(NP_EVENTS).filter(id => !G.run.usedEvents.includes(id));
        if (unusedEvents.length === 0) {
          G.run.usedEvents = [];
          unusedEvents = Object.keys(NP_EVENTS);
        }
        const eventId = unusedEvents[Math.floor(Math.random() * unusedEvents.length)];
        G.run.usedEvents.push(eventId);
        G.activeEvent = { def: NP_EVENTS[eventId] };
        G.screen = 'event';
        break;
      case 'shop':
        G.shop = {
          items: [
            { type: 'card', id: getRandomCard('common'), price: 50 },
            { type: 'card', id: getRandomCard('uncommon'), price: 75 },
            { type: 'card', id: getRandomCard('rare'), price: 125 },
            { type: 'potion', id: getRandomPotion(), price: 45 },
            { type: 'potion', id: getRandomPotion(), price: 45 },
            { type: 'relic', id: getRandomRelic(), price: 140 },
            { type: 'relic', id: getRandomRelic(), price: 140 }
          ],
          removePrice: 75 + 25 * (G.run.removeCount || 0)
        };
        G.screen = 'shop';
        break;
      case 'rest':
        G.screen = 'rest';
        break;
      case 'treasure':
        const unownedRelics = Object.keys(NP_RELICS).filter(id => !G.run.relics.includes(id));
        if (unownedRelics.length > 0) {
          const relicId = unownedRelics[Math.floor(Math.random() * unownedRelics.length)];
          NP_UI.modal({
            title: 'Treasure',
            body: `You found a ${NP_RELICS[relicId].name}!`,
            buttons: [
              {
                label: 'Take',
                fn: () => {
                  G.run.relics.push(relicId);
                  save();
                  NP_UI.show('map');
                }
              }
            ]
          });
        } else {
          NP_UI.toast('No more treasures available', 'info');
          NP_UI.show('map');
        }
        break;
    }

    NP_UI.renderAll();
  };

  // Helper: Get random card by rarity
  function getRandomCard(rarity) {
    const cards = Object.keys(NP_CARDS).filter(id =>
      NP_CARDS[id].rarity === rarity &&
      NP_CARDS[id].type !== 'curse' &&
      NP_CARDS[id].rarity !== 'starter'
    );
    return cards[Math.floor(Math.random() * cards.length)];
  }

  // Helper: Get random potion
  function getRandomPotion() {
    const potions = Object.keys(NP_POTIONS);
    return potions[Math.floor(Math.random() * potions.length)];
  }

  // Helper: Get random relic
  function getRandomRelic() {
    const relics = Object.keys(NP_RELICS).filter(id => !G.run.relics.includes(id));
    return relics[Math.floor(Math.random() * relics.length)];
  }

  // Initialize everything
  function init() {
    normalizeData();
    loadSettings();
    initFX();
    initAudioOnGesture();

    if (location.search.includes('?test=1')) {
      runTestHarness();
    } else {
      if (localStorage.getItem('np_save')) {
        load();
        NP_UI.show('map');
      } else {
        NP_UI.show('title');
      }
    }

    // Event handlers
    document.addEventListener('click', function(e) {
      const actionEl = e.target.closest('[data-action]');
      if (actionEl) {
        const action = actionEl.dataset.action;

        switch (action) {
          case 'new-run':
            newRun();
            NP_UI.show('map');
            break;
          case 'continue':
            load();
            NP_UI.show('map');
            break;
          case 'settings':
            NP_UI.show('settings');
            break;
          case 'credits':
            NP_UI.modal({
              title: 'Credits',
              body: 'Game created by [Your Name]',
              buttons: [{ label: 'Close' }]
            });
            break;
          case 'modal-btn':
          case 'modal-close':
            if (G._modalButtons && actionEl.dataset.index) {
              const index = parseInt(actionEl.dataset.index);
              const btn = G._modalButtons[index];
              NP_UI.modal(null);
              if (btn && btn.fn) {
                btn.fn();
              }
            } else {
              NP_UI.modal(null);
            }
            break;
          case 'event-choice':
            if (G.activeEvent && actionEl.dataset.index) {
              const index = parseInt(actionEl.dataset.index);
              G._eventResolved = false;
              G.activeEvent.def.choices[index].result(G, buildEventApi());
              if (!G._eventResolved) {
                buildEventApi().resolve();
              }
              G._eventResolved = false;
            }
            break;
          case 'reward-card':
            if (G.reward && G.reward.cards && actionEl.dataset.index) {
              const index = parseInt(actionEl.dataset.index);
              addCardInstance(G.reward.cards[index]);
              G.reward.cards = null;
              finishReward();
            }
            break;
          case 'reward-skip':
            if (G.reward) {
              G.reward.cards = null;
              finishReward();
            }
            break;
          case 'reward-relic':
            if (G.reward && G.reward.pendingRelic) {
              G.run.relics.push(G.reward.pendingRelic);
              G.reward.pendingRelic = null;
              save();
              NP_UI.show('map');
            }
            break;
          case 'buy':
            if (G.shop && actionEl.dataset.index) {
              const index = parseInt(actionEl.dataset.index);
              const item = G.shop.items[index];
              if (item.sold || G.run.gold < item.price) {
                NP_UI.toast('Not enough gold', 'error');
              } else {
                G.run.gold -= item.price;
                item.sold = true;
                if (item.type === 'card') {
                  addCardInstance(item.id);
                } else if (item.type === 'potion') {
                  if (G.run.potions.length < 3) {
                    G.run.potions.push(item.id);
                  } else {
                    G.run.gold += item.price;
                    NP_UI.toast('Potion belt full', 'error');
                  }
                } else if (item.type === 'relic') {
                  G.run.relics.push(item.id);
                }
                NP_UI.renderAll();
              }
            }
            break;
          case 'buy-remove':
            if (G.shop && G.run.gold >= G.shop.removePrice) {
              G.run.gold -= G.shop.removePrice;
              G.run.removeCount = (G.run.removeCount || 0) + 1;
              G.screen = 'deck';
              G.deckMode = 'remove';
              NP_UI.renderAll();
            } else {
              NP_UI.toast('Not enough gold', 'error');
            }
            break;
          case 'leave-shop':
            G.shop = null;
            save();
            NP_UI.show('map');
            break;
          case 'rest-heal':
            const healAmount = Math.floor(G.run.maxHp * 0.3);
            G.run.hp = Math.min(G.run.hp + healAmount, G.run.maxHp);
            NP_UI.toast(`Healed for ${healAmount} HP`);
            save();
            NP_UI.show('map');
            break;
          case 'rest-smith':
            G.prevScreen = 'map';
            G.screen = 'deck';
            G.deckMode = 'smith';
            NP_UI.renderAll();
            break;
          case 'smith-pick':
            if (G.deckMode === 'smith' && actionEl.dataset.uid) {
              const uid = actionEl.dataset.uid;
              const card = G.run.deck.find(c => c.uid === uid);
              if (card) {
                card.upgraded = true;
                G.screen = 'rest-done';
                save();
                NP_UI.show('map');
              }
            }
            break;
          case 'deck-open':
            G.prevScreen = G.screen;
            G.screen = 'deck';
            G.deckMode = 'view';
            NP_UI.renderAll();
            break;
          case 'deck-close':
            if (G.prevScreen) {
              G.screen = G.prevScreen;
              NP_UI.renderAll();
            }
            break;
          case 'filter':
            if (actionEl.dataset.type) {
              G.deckFilter = actionEl.dataset.type;
              NP_UI.renderAll();
            }
            break;
          case 'inspect':
            if (actionEl.dataset.uid) {
              const uid = actionEl.dataset.uid;
              const card = G.run.deck.find(c => c.uid === uid);
              if (card) {
                NP_UI.modal({
                  title: NP_CARDS[card.id].name,
                  body: NP_UI.renderCardText(card),
                  buttons: [{ label: 'Close' }]
                });
              }
            }
            break;
          case 'hand-card':
            if (G.screen === 'combat' && actionEl.dataset.uid) {
              const uid = actionEl.dataset.uid;
              if (G.combat.selectedCard) {
                NP_COMBAT.playCard(G.combat.selectedCard, uid);
              } else {
                NP_COMBAT.selectCard(uid);
              }
              NP_UI.renderAll();
            }
            break;
          case 'enemy-click':
            if (G.screen === 'combat' && G.combat.selectedCard && actionEl.dataset.uid) {
              const uid = actionEl.dataset.uid;
              NP_COMBAT.playCard(G.combat.selectedCard, uid);
              NP_UI.renderAll();
            }
            break;
          case 'end-turn':
            if (G.screen === 'combat') {
              NP_COMBAT.endTurn();
              NP_UI.renderAll();
            }
            break;
          case 'use-potion':
            if (G.screen === 'combat' && actionEl.dataset.id) {
              const id = actionEl.dataset.id;
              NP_COMBAT.usePotion(id);
              NP_UI.renderAll();
            }
            break;
          case 'toggle-log':
            G.logOpen = !G.logOpen;
            NP_UI.renderAll();
            break;
          case 'concede':
            finishCombat(true);
            break;
          case 'mute':
            G.settings.muted = !G.settings.muted;
            if (G.settings.muted) {
              if (window.NP_AUDIO && NP_AUDIO.setVol) {
                NP_AUDIO.setVol(0, 0, 0);
              }
            } else {
              if (window.NP_AUDIO && NP_AUDIO.setVol) {
                NP_AUDIO.setVol(
                  G.settings.master / 100,
                  G.settings.music / 100,
                  G.settings.sfx / 100
                );
              }
            }
            saveSettings();
            NP_UI.renderAll();
            break;
          case 'to-title':
            NP_UI.show('title');
            break;
        }

        // After any action that changes state
        NP_UI.renderAll();
        if (G.screen === 'combat' && NP_COMBAT.isOver()) {
          if (!G._finishing) {
            setTimeout(finishCombat, 1000);
          }
        }
      }
    });

    document.addEventListener('input', function(e) {
      if (e.target.dataset.slider) {
        const slider = e.target.dataset.slider;
        G.settings[slider] = parseInt(e.target.value);
        if (window.NP_AUDIO && NP_AUDIO.setVol) {
          NP_AUDIO.setVol(
            G.settings.master / 100,
            G.settings.music / 100,
            G.settings.sfx / 100
          );
        }
        saveSettings();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const modalWrap = document.getElementById('modal-wrap');
        if (modalWrap && modalWrap.style.display !== 'none') {
          NP_UI.modal(null);
        } else if (G.screen === 'combat' && G.combat.selectedCard) {
          NP_COMBAT.cancelSelect();
          NP_UI.renderAll();
        } else if (!['title', 'map'].includes(G.screen)) {
          NP_UI.modal({
            title: 'Pause',
            body: 'Game paused',
            buttons: [
              { label: 'Resume' },
              { label: 'Concede', fn: () => finishCombat(true) },
              { label: 'Title', fn: () => NP_UI.show('title') }
            ]
          });
        }
      }
    });

    document.addEventListener('contextmenu', function(e) {
      if (e.target.closest('[data-action="inspect"]')) {
        e.preventDefault();
      }
    });

    window.addEventListener('error', function(e) {
      if (location.search.includes('?test=1')) {
        const testResult = document.body.dataset.testResult || '';
        document.body.dataset.testResult = testResult + `; ERROR: ${e.message}`;
        const testResultsDiv = document.getElementById('test-results');
        if (testResultsDiv) {
          testResultsDiv.innerHTML += `<div>✗ ERROR: ${e.message}</div>`;
        }
      }
    });
  }

  // Start initialization
  document.addEventListener('DOMContentLoaded', init);
})();