(function() {
  'use strict';

  window.NP_OPS = {
    applyCardEffects: function(G, inst, def, targetIdx) {
      if (def.type === 'power') {
        if (!G.combat.powers) G.combat.powers = [];
        G.combat.powers.push(inst);
        def.effects.forEach(function(eff) {
          var value = inst.upgraded ? eff.up : eff.base;
          if (eff.op === 'combatStartStrength') {
            window.NP_OPS.addStatus(G, 'player', 'strength', value);
          } else if (eff.op === 'combatStartBlock') {
            window.NP_OPS.gainBlock(G, 'player', value);
          }
        });
        return;
      }

      def.effects.forEach(function(eff) {
        var value = inst.upgraded ? eff.up : eff.base;
        switch (eff.op) {
          case 'damage':
            if (def.target === 'enemy') {
              for (var i = 0; i < (eff.times || 1); i++) {
                window.NP_OPS.hitEnemy(G, targetIdx, value, {fromAttack: true});
              }
            } else if (def.target === 'all') {
              G.combat.enemies.forEach(function(enemy, idx) {
                if (enemy.hp > 0) {
                  for (var i = 0; i < (eff.times || 1); i++) {
                    window.NP_OPS.hitEnemy(G, idx, value, {fromAttack: true});
                  }
                }
              });
            }
            break;
          case 'block':
            window.NP_OPS.gainBlock(G, 'player', value);
            break;
          case 'faith':
            G.run.faith = Math.min(100, G.run.faith + value);
            if (window.NP_AUDIO) window.NP_AUDIO.setFaithLevel(G.run.faith);
            break;
          case 'draw':
            window.NP_OPS.drawCards(G, value);
            break;
          case 'energy':
            G.combat.energy += value;
            break;
          case 'heal':
            G.run.hp = Math.min(G.run.maxHp, G.run.hp + value);
            break;
          case 'strength':
          case 'weak':
          case 'vulnerable':
          case 'plague':
            window.NP_OPS.addStatus(G, 'player', eff.op, value);
            break;
          case 'cleanse':
            G.combat.playerStatuses.vulnerable = 0;
            G.combat.playerStatuses.weak = 0;
            G.combat.playerStatuses.plague = 0;
            break;
        }
        G.combat.log.push({card: inst.id, effect: eff.op, value: value});
      });
    },

    hitEnemy: function(G, idx, base, opts) {
      opts = opts || {};
      var fromAttack = opts.fromAttack !== false;
      var enemy = G.combat.enemies[idx];
      if (!enemy || enemy.hp <= 0) return 0;

      var raw = base;
      if (fromAttack) {
        raw += G.combat.playerStatuses.strength;
        if (G.combat.playerStatuses.weak > 0) {
          raw = Math.floor(raw * 0.75);
        }
        if (enemy.statuses.vulnerable > 0) {
          raw = Math.floor(raw * 1.5);
        }
      }

      var absorbed = Math.min(enemy.block, raw);
      enemy.block -= absorbed;
      raw -= absorbed;

      if (raw > 0) {
        enemy.hp -= raw;
        if (enemy.hp <= 0) {
          enemy.hp = 0;
          enemy.dead = true;
          window.NP_OPS.fireRelic(G, 'faithOnKill');
          if (enemy.def.tier === 'elite') {
            window.NP_OPS.fireRelic(G, 'faithOnEliteKill');
          }
          G.combat.log.push({enemy: enemy.id, event: 'defeated'});
        }
      }

      return raw;
    },

    hitPlayer: function(G, amount, fromIdx) {
      var absorbed = Math.min(G.combat.playerBlock, amount);
      G.combat.playerBlock -= absorbed;
      amount -= absorbed;

      if (amount > 0) {
        G.run.hp -= amount;
        if (G.run.hp <= 0) {
          G.run.hp = 0;
        }
      }

      var retaliation = 0;
      if (G.run.relics) {
        G.run.relics.forEach(function(relicId) {
          var relic = window.NP_RELICS[relicId];
          if (relic && relic.hook === 'thorns') {
            retaliation += relic.value;
          }
        });
      }
      if (G.combat.powers) {
        G.combat.powers.forEach(function(power) {
          var def = window.NP_CARDS[power.id];
          if (def && def.type === 'power') {
            def.effects.forEach(function(eff) {
              if (eff.op === 'thorns') {
                retaliation += power.upgraded ? eff.up : eff.base;
              }
            });
          }
        });
      }

      if (retaliation > 0 && fromIdx != null && G.combat.enemies[fromIdx] && G.combat.enemies[fromIdx].hp > 0) {
        window.NP_OPS.hitEnemy(G, fromIdx, retaliation, {fromAttack: false});
      }

      return amount;
    },

    drawCards: function(G, n) {
      for (var i = 0; i < n; i++) {
        if (G.combat.draw.length === 0) {
          if (G.combat.discard.length === 0) break;
          G.combat.draw = G.combat.discard;
          G.combat.discard = [];
          for (var j = G.combat.draw.length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1));
            var temp = G.combat.draw[j];
            G.combat.draw[j] = G.combat.draw[k];
            G.combat.draw[k] = temp;
          }
        }
        if (G.combat.draw.length > 0) {
          G.combat.hand.push(G.combat.draw.pop());
        }
      }
    },

    gainBlock: function(G, side, n) {
      n = Math.max(0, Math.round(n));
      if (side === 'player') {
        if (G.combat.powers) {
          G.combat.powers.forEach(function(power) {
            var def = window.NP_CARDS[power.id];
            if (def && def.type === 'power') {
              def.effects.forEach(function(eff) {
                if (eff.op === 'blockPlus') {
                  n += power.upgraded ? eff.up : eff.base;
                }
              });
            }
          });
        }
        G.combat.playerBlock += n;
        G.combat.log.push({player: 'block', value: n});
      } else {
        G.combat.enemies[side].block += n;
      }
    },

    addStatus: function(G, side, status, n) {
      if (side === 'player') {
        G.combat.playerStatuses[status] = (G.combat.playerStatuses[status] || 0) + n;
        if (G.combat.playerStatuses[status] < 0) G.combat.playerStatuses[status] = 0;
      } else {
        G.combat.enemies[side].statuses[status] = (G.combat.enemies[side].statuses[status] || 0) + n;
        if (G.combat.enemies[side].statuses[status] < 0) G.combat.enemies[side].statuses[status] = 0;
      }
    },

    tickStatuses: function(G, side) {
      if (side === 'player') {
        if (G.combat.playerStatuses.vulnerable > 0) G.combat.playerStatuses.vulnerable--;
        if (G.combat.playerStatuses.weak > 0) G.combat.playerStatuses.weak--;
        if (G.combat.playerStatuses._statusTurns) {
          for (var status in G.combat.playerStatuses._statusTurns) {
            G.combat.playerStatuses._statusTurns[status]--;
            if (G.combat.playerStatuses._statusTurns[status] <= 0) {
              G.combat.playerStatuses[status] = 0;
              delete G.combat.playerStatuses._statusTurns[status];
            }
          }
        }
      } else {
        var enemy = G.combat.enemies[side];
        if (enemy.statuses.vulnerable > 0) enemy.statuses.vulnerable--;
        if (enemy.statuses.weak > 0) enemy.statuses.weak--;
        if (enemy.statuses._statusTurns) {
          for (var status in enemy.statuses._statusTurns) {
            enemy.statuses._statusTurns[status]--;
            if (enemy.statuses._statusTurns[status] <= 0) {
              enemy.statuses[status] = 0;
              delete enemy.statuses._statusTurns[status];
            }
          }
        }
      }
    },

    plagueTick: function(G, side) {
      var stacks;
      if (side === 'player') {
        stacks = G.combat.playerStatuses.plague;
        if (stacks > 0) {
          var damage = stacks;
          G.run.hp -= damage;
          G.combat.playerStatuses.plague--;
          if (G.combat.playerStatuses.plague < 0) G.combat.playerStatuses.plague = 0;
          G.combat.log.push({player: 'plague', value: damage});
          return damage;
        }
      } else {
        var enemy = G.combat.enemies[side];
        stacks = enemy.statuses.plague;
        if (stacks > 0) {
          var damage = stacks;
          enemy.hp -= damage;
          if (enemy.hp <= 0) {
            enemy.hp = 0;
            enemy.dead = true;
            window.NP_OPS.fireRelic(G, 'faithOnKill');
            if (enemy.def.tier === 'elite') {
              window.NP_OPS.fireRelic(G, 'faithOnEliteKill');
            }
            G.combat.log.push({enemy: enemy.id, event: 'defeated'});
          }
          enemy.statuses.plague--;
          if (enemy.statuses.plague < 0) enemy.statuses.plague = 0;
          G.combat.log.push({enemy: enemy.id, event: 'plague', value: damage});
          return damage;
        }
      }
      return 0;
    },

    enemyChooseMove: function(G, enemy) {
      var def = window.NP_ENEMIES[enemy.id];
      if (def.ai === 'random') {
        var totalWeight = 0;
        def.moves.forEach(function(move) {
          totalWeight += move.weight || 1;
        });
        var random = Math.random() * totalWeight;
        var weightSum = 0;
        for (var i = 0; i < def.moves.length; i++) {
          weightSum += def.moves[i].weight || 1;
          if (random <= weightSum) {
            enemy.intent = def.moves[i];
            break;
          }
        }
      } else if (def.ai === 'pattern') {
        if (!enemy._aiIdx) enemy._aiIdx = 0;
        enemy.intent = def.moves[enemy._aiIdx % def.moves.length];
        enemy._aiIdx++;
      }
      return enemy.intent;
    },

    enemyExecute: function(G, enemy, move) {
      enemy.block = 0;
      switch (move.kind) {
        case 'attack':
          var raw = move.value + (enemy.statuses.strength || 0);
          if (enemy.statuses.weak > 0) {
            raw = Math.floor(raw * 0.75);
          }
          for (var i = 0; i < (move.times || 1); i++) {
            window.NP_OPS.hitPlayer(G, raw, G.combat.enemies.indexOf(enemy));
          }
          break;
        case 'defend':
          enemy.block += move.block;
          break;
        case 'buff':
          window.NP_OPS.addStatus(G, G.combat.enemies.indexOf(enemy), move.effect, move.times);
          break;
        case 'debuff':
          window.NP_OPS.addStatus(G, 'player', move.effect, move.times);
          break;
      }
      G.combat.log.push({enemy: enemy.id, move: move.name});
    },

    applyPotion: function(G, potionDef) {
      if (G.combat.potionUsed) return false;

      var effect = function(eff, val) {
        switch (eff) {
          case 'heal':
            G.run.hp = Math.min(G.run.maxHp, G.run.hp + val);
            break;
          case 'block':
            window.NP_OPS.gainBlock(G, 'player', val);
            break;
          case 'strength':
            window.NP_OPS.addStatus(G, 'player', 'strength', val);
            if (!G.combat.playerStatuses._statusTurns) G.combat.playerStatuses._statusTurns = {};
            G.combat.playerStatuses._statusTurns.strength = potionDef.turns;
            break;
          case 'damage':
            if (potionDef.target === 'all') {
              G.combat.enemies.forEach(function(enemy, idx) {
                if (enemy.hp > 0) {
                  window.NP_OPS.hitEnemy(G, idx, val, {fromAttack: false});
                }
              });
            } else {
              var aliveEnemies = G.combat.enemies.filter(function(enemy) { return enemy.hp > 0; });
              if (aliveEnemies.length > 0) {
                var randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                window.NP_OPS.hitEnemy(G, G.combat.enemies.indexOf(randomEnemy), val, {fromAttack: false});
              }
            }
            break;
          case 'cure':
            G.combat.playerStatuses.vulnerable = 0;
            G.combat.playerStatuses.weak = 0;
            G.combat.playerStatuses.plague = 0;
            break;
          case 'faith':
            G.run.faith = Math.min(100, G.run.faith + val);
            if (window.NP_AUDIO) window.NP_AUDIO.setFaithLevel(G.run.faith);
            break;
          case 'energy':
            G.combat.energy += val;
            break;
        }
      };

      effect(potionDef.effect, potionDef.value);
      if (potionDef.effect2) effect(potionDef.effect2, potionDef.value2);

      G.combat.potionUsed = true;
      var potionIndex = G.run.potions.indexOf(potionDef.id);
      if (potionIndex > -1) {
        G.run.potions.splice(potionIndex, 1);
      }
      G.combat.log.push({potion: potionDef.id});

      return true;
    },

    fireRelic: function(G, hook, data) {
      if (!G.run.relics) return;
      G.run.relics.forEach(function(relicId) {
        var relic = window.NP_RELICS[relicId];
        if (relic) {
          if (relic.hook === hook) {
            switch (hook) {
              case 'startingFaith':
                G.run.faith = Math.min(100, G.run.faith + relic.value);
                break;
              case 'combatStartStrength':
                window.NP_OPS.addStatus(G, 'player', 'strength', relic.value);
                break;
              case 'combatStartBlock':
                window.NP_OPS.gainBlock(G, 'player', relic.value);
                break;
              case 'energyPerTurn':
                if (G.combat) G.combat.maxEnergy += relic.value;
                break;
              case 'faithOnKill':
              case 'faithOnEliteKill':
                G.run.faith = Math.min(100, G.run.faith + relic.value);
                if (window.NP_AUDIO) window.NP_AUDIO.setFaithLevel(G.run.faith);
                break;
              case 'faithPerTurnCombat':
                G.run.faith = Math.min(100, G.run.faith + relic.value);
                if (window.NP_AUDIO) window.NP_AUDIO.setFaithLevel(G.run.faith);
                break;
              case 'blockOnTurnStart':
                window.NP_OPS.gainBlock(G, 'player', relic.value);
                break;
              case 'strengthOnHurt':
                if (data && data.amount > 0) {
                  window.NP_OPS.addStatus(G, 'player', 'strength', relic.value);
                }
                break;
              case 'faithPerCardPlayed':
                G.run.faith = Math.min(100, G.run.faith + relic.value);
                if (window.NP_AUDIO) window.NP_AUDIO.setFaithLevel(G.run.faith);
                break;
              case 'goldOnVictory':
                G.run.gold += relic.value;
                break;
              case 'potionBonus':
                if (data && data.potionDef) {
                  if (data.potionDef.effect === 'heal' || data.potionDef.effect === 'block' ||
                      data.potionDef.effect === 'strength' || data.potionDef.effect === 'damage' ||
                      data.potionDef.effect === 'faith' || data.potionDef.effect === 'energy') {
                    data.potionDef.value += relic.value;
                  }
                  if (data.potionDef.effect2) {
                    if (data.potionDef.effect2 === 'heal' || data.potionDef.effect2 === 'block' ||
                        data.potionDef.effect2 === 'strength' || data.potionDef.effect2 === 'damage' ||
                        data.potionDef.effect2 === 'faith' || data.potionDef.effect2 === 'energy') {
                      data.potionDef.value2 += relic.value;
                    }
                  }
                }
                break;
            }
          }
          if (relic.hook2 === hook) {
            switch (hook) {
              case 'startingFaith':
                G.run.faith = Math.min(100, G.run.faith + relic.value2);
                break;
              case 'combatStartStrength':
                window.NP_OPS.addStatus(G, 'player', 'strength', relic.value2);
                break;
              case 'combatStartBlock':
                window.NP_OPS.gainBlock(G, 'player', relic.value2);
                break;
              case 'energyPerTurn':
                if (G.combat) G.combat.maxEnergy += relic.value2;
                break;
              case 'faithOnKill':
              case 'faithOnEliteKill':
                G.run.faith = Math.min(100, G.run.faith + relic.value2);
                if (window.NP_AUDIO) window.NP_AUDIO.setFaithLevel(G.run.faith);
                break;
              case 'faithPerTurnCombat':
                G.run.faith = Math.min(100, G.run.faith + relic.value2);
                if (window.NP_AUDIO) window.NP_AUDIO.setFaithLevel(G.run.faith);
                break;
              case 'blockOnTurnStart':
                window.NP_OPS.gainBlock(G, 'player', relic.value2);
                break;
              case 'strengthOnHurt':
                if (data && data.amount > 0) {
                  window.NP_OPS.addStatus(G, 'player', 'strength', relic.value2);
                }
                break;
              case 'faithPerCardPlayed':
                G.run.faith = Math.min(100, G.run.faith + relic.value2);
                if (window.NP_AUDIO) window.NP_AUDIO.setFaithLevel(G.run.faith);
                break;
              case 'goldOnVictory':
                G.run.gold += relic.value2;
                break;
              case 'potionBonus':
                if (data && data.potionDef) {
                  if (data.potionDef.effect === 'heal' || data.potionDef.effect === 'block' ||
                      data.potionDef.effect === 'strength' || data.potionDef.effect === 'damage' ||
                      data.potionDef.effect === 'faith' || data.potionDef.effect === 'energy') {
                    data.potionDef.value += relic.value2;
                  }
                  if (data.potionDef.effect2) {
                    if (data.potionDef.effect2 === 'heal' || data.potionDef.effect2 === 'block' ||
                        data.potionDef.effect2 === 'strength' || data.potionDef.effect2 === 'damage' ||
                        data.potionDef.effect2 === 'faith' || data.potionDef.effect2 === 'energy') {
                      data.potionDef.value2 += relic.value2;
                    }
                  }
                }
                break;
            }
          }
        }
      });
    }
  };
})();
