(function() {
  'use strict';

  if (!window.NP_OPS) {
    window.NP_OPS = {
      applyCardEffects: function() {},
      hitEnemy: function() { return 0; },
      hitPlayer: function() {},
      drawCards: function() {},
      gainBlock: function() {},
      addStatus: function() {},
      tickStatuses: function() {},
      plagueTick: function() {},
      enemyChooseMove: function() {},
      enemyExecute: function() {},
      applyPotion: function() { return false; },
      fireRelic: function() {}
    };
  }

  if (!window.NP_AUDIO) {
    window.NP_AUDIO = {
      sfx: function() {},
      setFaithLevel: function() {}
    };
  }

  if (!window.NP_CARDS) window.NP_CARDS = {};
  if (!window.NP_ENEMIES) window.NP_ENEMIES = {};
  if (!window.NP_POTIONS) window.NP_POTIONS = {};

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function findAliveEnemies(G) {
    return G.combat.enemies.filter(enemy => enemy.hp > 0);
  }

  function findAliveEnemyIndex(G, uid) {
    return G.combat.enemies.findIndex(enemy => enemy.uid === uid && enemy.hp > 0);
  }

  function findCardInHand(G, uid) {
    return G.combat.hand.find(card => card.uid === uid);
  }

  function findCardInPowers(G, uid) {
    return G.combat.powers.find(card => card.uid === uid);
  }

  function findCardInDeck(G, uid) {
    return G.run.deck.find(card => card.uid === uid);
  }

  function findCardInDraw(G, uid) {
    return G.combat.draw.find(card => card.uid === uid);
  }

  function findCardInDiscard(G, uid) {
    return G.combat.discard.find(card => card.uid === uid);
  }

  function findCardInExhaust(G, uid) {
    return G.combat.exhaust.find(card => card.uid === uid);
  }

  function findCardInAnyPile(G, uid) {
    return findCardInHand(G, uid) || findCardInPowers(G, uid) || findCardInDeck(G, uid) ||
           findCardInDraw(G, uid) || findCardInDiscard(G, uid) || findCardInExhaust(G, uid);
  }

  function findCardIndexInHand(G, uid) {
    return G.combat.hand.findIndex(card => card.uid === uid);
  }

  function findCardIndexInPowers(G, uid) {
    return G.combat.powers.findIndex(card => card.uid === uid);
  }

  function findCardIndexInDeck(G, uid) {
    return G.run.deck.findIndex(card => card.uid === uid);
  }

  function findCardIndexInDraw(G, uid) {
    return G.combat.draw.findIndex(card => card.uid === uid);
  }

  function findCardIndexInDiscard(G, uid) {
    return G.combat.discard.findIndex(card => card.uid === uid);
  }

  function findCardIndexInExhaust(G, uid) {
    return G.combat.exhaust.findIndex(card => card.uid === uid);
  }

  function findCardIndexInAnyPile(G, uid) {
    let index = findCardIndexInHand(G, uid);
    if (index !== -1) return { pile: 'hand', index };
    index = findCardIndexInPowers(G, uid);
    if (index !== -1) return { pile: 'powers', index };
    index = findCardIndexInDeck(G, uid);
    if (index !== -1) return { pile: 'deck', index };
    index = findCardIndexInDraw(G, uid);
    if (index !== -1) return { pile: 'draw', index };
    index = findCardIndexInDiscard(G, uid);
    if (index !== -1) return { pile: 'discard', index };
    index = findCardIndexInExhaust(G, uid);
    if (index !== -1) return { pile: 'exhaust', index };
    return null;
  }

  function removeCardFromPile(G, pile, index) {
    if (pile === 'hand') {
      G.combat.hand.splice(index, 1);
    } else if (pile === 'powers') {
      G.combat.powers.splice(index, 1);
    } else if (pile === 'deck') {
      G.run.deck.splice(index, 1);
    } else if (pile === 'draw') {
      G.combat.draw.splice(index, 1);
    } else if (pile === 'discard') {
      G.combat.discard.splice(index, 1);
    } else if (pile === 'exhaust') {
      G.combat.exhaust.splice(index, 1);
    }
  }

  function applyCardEffects(G, inst, def, targetIdx) {
    if (def.type === 'power') {
      G.combat.powers.push(inst);
    } else if (def.exhaust) {
      G.combat.exhaust.push(inst);
      if (window.NP_AUDIO) NP_AUDIO.sfx('card_exhaust');
    } else {
      G.combat.discard.push(inst);
    }
    NP_OPS.applyCardEffects(G, inst, def, targetIdx);
  }

  function playCard(G, uid, targetUid) {
    const inst = findCardInHand(G, uid);
    if (!inst) return false;
    const def = NP_CARDS[inst.id];
    if (!def) return false;

    const canPlayResult = canPlay(G, uid, targetUid);
    if (!canPlayResult.ok) return false;

    let targetIdx = null;
    if (def.target === 'enemy') {
      if (targetUid) {
        targetIdx = findAliveEnemyIndex(G, targetUid);
        if (targetIdx === -1) return false;
      } else {
        const aliveEnemies = findAliveEnemies(G);
        if (aliveEnemies.length === 1) {
          targetIdx = G.combat.enemies.indexOf(aliveEnemies[0]);
        } else if (aliveEnemies.length === 0) {
          return false;
        } else {
          return false;
        }
      }
    }

    G.combat.energy -= def.cost;
    if (def.type === 'miracle') {
      G.run.faith -= def.faithCost;
      if (window.NP_AUDIO) NP_AUDIO.setFaithLevel(G.run.faith);
    }

    const cardIndex = findCardIndexInHand(G, uid);
    if (cardIndex !== -1) {
      G.combat.hand.splice(cardIndex, 1);
    }

    applyCardEffects(G, inst, def, targetIdx);

    if (def.type === 'attack') {
      const weakOnAttackPowers = G.combat.powers.filter(power => {
        const powerDef = NP_CARDS[power.id];
        return powerDef && powerDef.effects.some(effect => effect.op === 'weakOnAttack');
      });

      weakOnAttackPowers.forEach(power => {
        const powerDef = NP_CARDS[power.id];
        const effect = powerDef.effects.find(effect => effect.op === 'weakOnAttack');
        if (effect) {
          const value = power.upgraded ? effect.up : effect.base;
          const aliveEnemies = findAliveEnemies(G);
          if (aliveEnemies.length > 0) {
            const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
            const enemyIdx = G.combat.enemies.indexOf(randomEnemy);
            NP_OPS.addStatus(G, enemyIdx, 'weak', value);
          }
        }
      });
    }

    if (window.NP_AUDIO) NP_AUDIO.sfx('card_play');
    G.combat.selectedCard = null;
    G.combat.targetMode = null;
    G.combat.log.push(`Played ${def.name}`);

    if (findAliveEnemies(G).length === 0) {
      finish(G, 'victory');
    } else if (G.run.hp <= 0) {
      finish(G, 'defeat');
    }

    return true;
  }

  function endTurn(G) {
    if (G.combat.over) return;

    G.combat.hand.forEach(inst => {
      const def = NP_CARDS[inst.id];
      if (def && def.ethereal && !def.retain) {
        G.combat.exhaust.push(inst);
        if (window.NP_AUDIO) NP_AUDIO.sfx('card_exhaust');
      } else if (def && def.retain) {
        // Keep in hand
      } else {
        G.combat.discard.push(inst);
      }
    });

    G.combat.hand = G.combat.hand.filter(inst => {
      const def = NP_CARDS[inst.id];
      return def && def.retain;
    });

    NP_OPS.tickStatuses(G, 'player');

    G.combat.enemies.forEach((enemy, idx) => {
      if (enemy.hp > 0 && enemy.intent) {
        const prevPlayerHp = G.run.hp;
        NP_OPS.enemyExecute(G, enemy, enemy.intent);
        if (prevPlayerHp > G.run.hp && G.run.relics.some(relic => relic.hook === 'strengthOnHurt')) {
          NP_OPS.fireRelic(G, 'strengthOnHurt');
        }
        NP_OPS.enemyChooseMove(G, enemy);
      }
    });

    if (G.run.hp <= 0) {
      finish(G, 'defeat');
      return;
    }

    G.combat.turn++;
    G.combat.playerBlock = 0;
    G.combat.potionUsed = false;

    NP_OPS.fireRelic(G, 'blockOnTurnStart');

    NP_OPS.plagueTick(G, 'player');
    if (G.run.hp <= 0) {
      finish(G, 'defeat');
      return;
    }

    G.combat.energy = G.combat.maxEnergy;

    const drawPerTurnPowers = G.combat.powers.filter(power => {
      const powerDef = NP_CARDS[power.id];
      return powerDef && powerDef.effects.some(effect => effect.op === 'drawPerTurn');
    });

    let extraDraws = 0;
    drawPerTurnPowers.forEach(power => {
      const powerDef = NP_CARDS[power.id];
      const effect = powerDef.effects.find(effect => effect.op === 'drawPerTurn');
      if (effect) {
        extraDraws += power.upgraded ? effect.up : effect.base;
      }
    });

    NP_OPS.drawCards(G, 5 + extraDraws);

    if (window.NP_AUDIO) NP_AUDIO.sfx('turn_start');

    G.combat.enemies.forEach((enemy, idx) => {
      if (enemy.hp > 0) {
        NP_OPS.tickStatuses(G, idx);
      }
    });

    const blockPerTurnPowers = G.combat.powers.filter(power => {
      const powerDef = NP_CARDS[power.id];
      return powerDef && powerDef.effects.some(effect => effect.op === 'blockPerTurn');
    });

    blockPerTurnPowers.forEach(power => {
      const powerDef = NP_CARDS[power.id];
      const effect = powerDef.effects.find(effect => effect.op === 'blockPerTurn');
      if (effect) {
        const value = power.upgraded ? effect.up : effect.base;
        NP_OPS.gainBlock(G, 'player', value);
      }
    });

    const strengthPerTurnPowers = G.combat.powers.filter(power => {
      const powerDef = NP_CARDS[power.id];
      return powerDef && powerDef.effects.some(effect => effect.op === 'strengthPerTurn');
    });

    strengthPerTurnPowers.forEach(power => {
      const powerDef = NP_CARDS[power.id];
      const effect = powerDef.effects.find(effect => effect.op === 'strengthPerTurn');
      if (effect) {
        const value = power.upgraded ? effect.up : effect.base;
        NP_OPS.addStatus(G, 'player', 'strength', value);
      }
    });

    const faithPerTurnPowers = G.combat.powers.filter(power => {
      const powerDef = NP_CARDS[power.id];
      return powerDef && powerDef.effects.some(effect => effect.op === 'faithPerTurn');
    });

    faithPerTurnPowers.forEach(power => {
      const powerDef = NP_CARDS[power.id];
      const effect = powerDef.effects.find(effect => effect.op === 'faithPerTurn');
      if (effect) {
        const value = power.upgraded ? effect.up : effect.base;
        G.run.faith += value;
        if (window.NP_AUDIO) NP_AUDIO.setFaithLevel(G.run.faith);
      }
    });

    NP_OPS.fireRelic(G, 'faithPerTurnCombat');

    if (findAliveEnemies(G).length === 0) {
      finish(G, 'victory');
    }
  }

  function selectCard(G, uid) {
    const inst = findCardInHand(G, uid);
    if (!inst) return;
    const def = NP_CARDS[inst.id];
    if (!def) return;

    if (def.target === 'enemy' && findAliveEnemies(G).length > 1) {
      G.combat.selectedCard = uid;
      G.combat.targetMode = 'enemy';
    } else {
      G.combat.selectedCard = uid;
      G.combat.targetMode = null;
    }
  }

  function cancelSelect(G) {
    G.combat.selectedCard = null;
    G.combat.targetMode = null;
  }

  function usePotion(G, id) {
    if (G.combat.over || G.combat.potionUsed) return false;
    const def = NP_POTIONS[id];
    if (!def) return false;
    const ok = NP_OPS.applyPotion(G, def);
    if (ok) {
      G.combat.potionUsed = true;
    }
    return ok;
  }

  function canPlay(G, uid, targetUid) {
    const inst = findCardInHand(G, uid);
    if (!inst) return { ok: false, reason: 'Not in hand' };
    const def = NP_CARDS[inst.id];
    if (!def) return { ok: false, reason: 'Invalid card' };

    if (G.combat.over) return { ok: false, reason: 'Combat over' };

    if (G.combat.energy < def.cost) return { ok: false, reason: 'Not enough Energy' };

    if (def.type === 'miracle' && G.run.faith < def.faithCost) {
      return { ok: false, reason: `Need ${def.faithCost} Faith` };
    }

    if (def.type === 'curse' || def.unplayable) return { ok: false, reason: 'Unplayable' };

    if (def.target === 'enemy') {
      const aliveEnemies = findAliveEnemies(G);
      if (aliveEnemies.length === 0) return { ok: false, reason: 'No targets' };
      if (aliveEnemies.length > 1 && !targetUid) return { ok: false, reason: 'Choose a target' };
    }

    return { ok: true, reason: '' };
  }

  function isOver(G) {
    return !!G.combat && G.combat.over !== null;
  }

  function result(G) {
    return { win: G.combat.over === 'victory', hp: G.run.hp };
  }

  function finish(G, outcome) {
    G.combat.over = outcome;
    if (outcome === 'victory') {
      NP_OPS.fireRelic(G, 'goldOnVictory');
      G.run.gold += Math.ceil(G.run.faith / 25);
      G.combat.log.push(`Gained ${Math.ceil(G.run.faith / 25)} gold from Faith`);
    }
  }

  function start(G, run, enemyIds) {
    G.combat = {
      enemies: [],
      draw: [],
      hand: [],
      discard: [],
      exhaust: [],
      powers: [],
      energy: 0,
      maxEnergy: 3,
      turn: 1,
      selectedCard: null,
      targetMode: null,
      playerBlock: 0,
      playerStatuses: { strength: 0, vulnerable: 0, weak: 0, plague: 0 },
      potionUsed: false,
      log: [],
      over: null
    };

    G.run.faith = 0;
    NP_OPS.fireRelic(G, 'startingFaith');

    G.run.deck.forEach(inst => {
      G.combat.draw.push({ uid: inst.uid, id: inst.id, upgraded: inst.upgraded });
    });

    shuffle(G.combat.draw);

    enemyIds.forEach((id, i) => {
      const def = NP_ENEMIES[id];
      if (def) {
        const hp = def.hp[0] + Math.floor(Math.random() * (def.hp[1] - def.hp[0] + 1));
        const enemy = {
          uid: `${id}_${i}`,
          id,
          def,
          hp,
          maxHp: hp,
          block: 0,
          statuses: { strength: 0, vulnerable: 0, weak: 0, plague: 0 },
          intent: null,
          _aiIdx: 0
        };
        G.combat.enemies.push(enemy);
        NP_OPS.enemyChooseMove(G, enemy);
      }
    });

    const energyPerTurnRelics = G.run.relics.filter(relic => relic.hook === 'energyPerTurn');
    G.combat.maxEnergy += energyPerTurnRelics.reduce((sum, relic) => sum + relic.value, 0);

    const innateCards = G.combat.draw.filter(inst => {
      const def = NP_CARDS[inst.id];
      return def && def.innate;
    });

    innateCards.forEach(inst => {
      const index = G.combat.draw.indexOf(inst);
      if (index !== -1) {
        G.combat.draw.splice(index, 1);
        G.combat.hand.push(inst);
      }
    });

    const drawTurn1Relic = G.run.relics.find(relic => relic.hook === 'drawTurn1');
    const extraDraws = drawTurn1Relic ? 1 : 0;
    NP_OPS.drawCards(G, 5 + extraDraws);

    G.combat.energy = G.combat.maxEnergy;

    NP_OPS.fireRelic(G, 'combatStartStrength');
    NP_OPS.fireRelic(G, 'combatStartBlock');

    if (window.NP_AUDIO) NP_AUDIO.sfx('turn_start');
    G.combat.log.push('Combat start');
  }

  window.NP_COMBAT = {
    start: function(run, enemyIds) { start(window.G, run, enemyIds); },
    playCard: function(uid, targetUid) { return playCard(window.G, uid, targetUid); },
    endTurn: function() { endTurn(window.G); },
    selectCard: function(uid) { selectCard(window.G, uid); },
    cancelSelect: function() { cancelSelect(window.G); },
    usePotion: function(id) { return usePotion(window.G, id); },
    canPlay: function(uid, targetUid) { return canPlay(window.G, uid, targetUid); },
    isOver: function() { return isOver(window.G); },
    result: function() { return result(window.G); }
  };
})();
