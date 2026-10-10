(function() {
  var UI = window.NP_UI;
  if (!UI) return;

  var prev = {
    enemyHps: [],
    playerHp: 0,
    playerBlock: 0,
    faith: 0,
    handLen: 0
  };

  Object.assign(UI, {
    renderCombat: function() {
      var G = window.G;
      var combat = G.combat;
      if (!combat) return;

      var container = document.querySelector('.screen.combat');
      if (!container) return;

      // Enemy stage
      var enemyStage = container.querySelector('.enemy-stage');
      if (!enemyStage) return;

      enemyStage.innerHTML = '';
      combat.enemies.forEach(function(enemy, idx) {
        var enemyEl = document.createElement('div');
        enemyEl.className = 'enemy';
        enemyEl.dataset.uid = enemy.uid;
        enemyEl.dataset.action = 'enemy-click';

        var archFrame = document.createElement('div');
        archFrame.className = 'arch-frame';

        var img = document.createElement('img');
        img.src = 'assets/img/en_' + enemy.id + '.png';
        img.onerror = function() {
          img.style.display = 'none';
          var glyph = document.createElement('div');
          glyph.className = 'glyph-fallback';
          glyph.textContent = window.NP_ENEMIES[enemy.id].glyph || '?';
          archFrame.appendChild(glyph);
        };
        archFrame.appendChild(img);

        var hpBar = document.createElement('div');
        hpBar.className = 'hp-bar';
        var hpFill = document.createElement('div');
        hpFill.className = 'fill';
        hpFill.style.width = pct(enemy.hp, enemy.maxHp) + '%';
        hpBar.appendChild(hpFill);

        var hpText = document.createElement('div');
        hpText.className = 'hp-text';
        hpText.textContent = enemy.hp + '/' + enemy.maxHp;
        hpBar.appendChild(hpText);

        if (enemy.block > 0) {
          var blockBadge = document.createElement('div');
          blockBadge.className = 'hp-block';
          blockBadge.textContent = enemy.block;
          hpBar.appendChild(blockBadge);
        }

        var statusChips = document.createElement('div');
        statusChips.className = 'status-chips';
        Object.keys(enemy.statuses).forEach(function(status) {
          if (enemy.statuses[status] > 0) {
            var chip = document.createElement('div');
            chip.className = 'status-chip';
            chip.textContent = getStatusGlyph(status) + ' ' + enemy.statuses[status];
            statusChips.appendChild(chip);
          }
        });

        var intentBadge = document.createElement('div');
        intentBadge.className = 'intent';
        if (enemy.intent) {
          var intentText = '';
          if (enemy.intent.kind === 'attack') {
            intentText = '⚔' + enemy.intent.value + (enemy.intent.times > 1 ? '×' + enemy.intent.times : '');
          } else if (enemy.intent.kind === 'defend') {
            intentText = '🛡' + enemy.intent.block;
          } else if (enemy.intent.kind === 'buff') {
            intentText = '↑' + (enemy.intent.effect || '');
          } else if (enemy.intent.kind === 'debuff') {
            intentText = '☠' + (enemy.intent.effect || '');
          }
          intentBadge.textContent = intentText;
          if (enemy.intent.telegraph) {
            intentBadge.classList.add('intent-warn');
            intentBadge.addEventListener('mouseover', function(e) {
              UI.tooltip('Heavy hit incoming!', e);
            });
          }
        }

        enemyEl.appendChild(intentBadge);
        enemyEl.appendChild(archFrame);
        enemyEl.appendChild(hpBar);
        enemyEl.appendChild(statusChips);
        enemyStage.appendChild(enemyEl);
      });

      // Player HUD
      var playerHud = container.querySelector('.player-hud');
      if (!playerHud) return;

      var hpBar = playerHud.querySelector('.hp-bar .fill');
      if (hpBar) {
        hpBar.style.width = pct(G.run.hp, G.run.maxHp) + '%';
      }

      var hpText = playerHud.querySelector('.hp-text');
      if (hpText) {
        hpText.textContent = G.run.hp + '/' + G.run.maxHp;
      }

      var blockBadge = playerHud.querySelector('.hp-block');
      if (blockBadge) {
        if (combat.playerBlock > 0) {
          blockBadge.textContent = combat.playerBlock;
          blockBadge.style.display = 'block';
        } else {
          blockBadge.style.display = 'none';
        }
      }

      var faithBar = playerHud.querySelector('.faith-bar .fill');
      if (faithBar) {
        faithBar.style.width = G.run.faith + '%';
        if (G.run.faith > 70) {
          faithBar.classList.add('gold-glow');
        } else {
          faithBar.classList.remove('gold-glow');
        }
      }

      var energyOrb = playerHud.querySelector('.energy-orb');
      if (energyOrb) {
        energyOrb.textContent = combat.energy + '/' + combat.maxEnergy;
      }

      var playerStatusChips = playerHud.querySelector('.status-chips');
      if (playerStatusChips) {
        playerStatusChips.innerHTML = '';
        Object.keys(combat.playerStatuses).forEach(function(status) {
          if (combat.playerStatuses[status] > 0) {
            var chip = document.createElement('div');
            chip.className = 'status-chip';
            chip.textContent = getStatusGlyph(status) + ' ' + combat.playerStatuses[status];
            playerStatusChips.appendChild(chip);
          }
        });
      }

      var potionBelt = playerHud.querySelector('.potion-belt');
      if (potionBelt) {
        potionBelt.innerHTML = '';
        G.run.potions.forEach(function(potionId, idx) {
          var potionSlot = document.createElement('div');
          potionSlot.className = 'potion-slot';
          potionSlot.dataset.action = 'use-potion';
          potionSlot.dataset.id = potionId;

          if (combat.potionUsed) {
            potionSlot.classList.add('disabled');
          }

          var potionIcon = document.createElement('div');
          potionIcon.className = 'potion-icon';
          potionIcon.textContent = window.NP_POTIONS[potionId].icon;
          potionSlot.appendChild(potionIcon);

          potionSlot.addEventListener('mouseover', function(e) {
            var potionDef = window.NP_POTIONS[potionId];
            UI.tooltip(potionDef.name + ': ' + potionDef.text, e);
          });

          potionBelt.appendChild(potionSlot);
        });
      }

      var relicTray = playerHud.querySelector('.relic-tray');
      if (relicTray) {
        relicTray.innerHTML = '';
        G.run.relics.forEach(function(relicId) {
          var relicIcon = document.createElement('div');
          relicIcon.className = 'relic-icon';
          relicIcon.textContent = window.NP_RELICS[relicId].icon;

          relicIcon.addEventListener('mouseover', function(e) {
            var relicDef = window.NP_RELICS[relicId];
            UI.tooltip(relicDef.name + ': ' + relicDef.text, e);
          });

          relicTray.appendChild(relicIcon);
        });
      }

      // Hand
      var hand = container.querySelector('.hand');
      if (!hand) return;

      hand.innerHTML = '';
      combat.hand.forEach(function(inst) {
        var tpl = document.createElement('div');
        tpl.innerHTML = UI.renderCard(inst.id, {
          unplayable: !window.NP_COMBAT.canPlay(inst.uid, aliveCount() > 1 ? firstAliveUid() : null).ok,
          selected: combat.selectedCard === inst.uid,
          upgraded: inst.upgraded
        }).trim();
        var cardEl = tpl.firstElementChild;
        cardEl.dataset.action = 'hand-card';
        cardEl.dataset.uid = inst.uid;
        hand.appendChild(cardEl);
      });

      // Hand card hover effects
      var handCards = hand.querySelectorAll('.card');
      handCards.forEach(function(cardEl) {
        cardEl.addEventListener('mousemove', function(e) {
          var rect = cardEl.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width;
          var py = (e.clientY - rect.top) / rect.height;
          cardEl.style.setProperty('--tilt-x', (px - 0.5) * 14 + 'deg');
          cardEl.style.setProperty('--tilt-y', (0.5 - py) * 10 + 'deg');
          cardEl.style.setProperty('--fan', '1');
        });

        cardEl.addEventListener('mouseleave', function() {
          cardEl.style.setProperty('--tilt-x', '0deg');
          cardEl.style.setProperty('--tilt-y', '0deg');
          cardEl.style.setProperty('--fan', '0');
        });
      });

      // Damage/FX diffing
      try {
        if (window.NP_FX) {
          combat.enemies.forEach(function(enemy, idx) {
            if (prev.enemyHps[idx] !== undefined && prev.enemyHps[idx] > enemy.hp) {
              var amount = prev.enemyHps[idx] - enemy.hp;
              var enemyEl = enemyStage.querySelector('.enemy[data-uid="' + enemy.uid + '"]');
              if (enemyEl) {
                var rect = enemyEl.getBoundingClientRect();
                window.NP_FX.damageNumber(rect.left + rect.width / 2, rect.top + rect.height / 2, amount, 'white');
              }
            }
            if (prev.enemyHps[idx] !== undefined && prev.enemyHps[idx] < enemy.hp) {
              var amount = enemy.hp - prev.enemyHps[idx];
              var enemyEl = enemyStage.querySelector('.enemy[data-uid="' + enemy.uid + '"]');
              if (enemyEl) {
                var rect = enemyEl.getBoundingClientRect();
                window.NP_FX.damageNumber(rect.left + rect.width / 2, rect.top + rect.height / 2, amount, 'gold');
              }
            }
            if (prev.enemyHps[idx] !== undefined && prev.enemyHps[idx] > 0 && enemy.hp <= 0) {
              var enemyEl = enemyStage.querySelector('.enemy[data-uid="' + enemy.uid + '"]');
              if (enemyEl) {
                enemyEl.classList.add('dead');
                var rect = enemyEl.getBoundingClientRect();
                window.NP_FX.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, {color: '#8b1a1a', count: 20, spread: 30});
                window.NP_FX.shake(enemy.tier === 'boss' ? 9 : 4, 150);
              }
            }
          });

          if (prev.playerHp > G.run.hp) {
            var amount = prev.playerHp - G.run.hp;
            var playerPanel = playerHud.querySelector('.hp-bar');
            if (playerPanel) {
              var rect = playerPanel.getBoundingClientRect();
              window.NP_FX.damageNumber(rect.left + rect.width / 2, rect.top + rect.height / 2, amount, 'red');
              window.NP_FX.shake(4, 150);
            }
          }

          if (prev.playerBlock < combat.playerBlock) {
            var amount = combat.playerBlock - prev.playerBlock;
            var blockBadge = playerHud.querySelector('.hp-block');
            if (blockBadge) {
              var rect = blockBadge.getBoundingClientRect();
              window.NP_FX.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, {color: '#d4af37', count: 10, spread: 20});
            }
          }

          if (prev.faith < G.run.faith) {
            var amount = G.run.faith - prev.faith;
            var faithBar = playerHud.querySelector('.faith-bar');
            if (faithBar) {
              var rect = faithBar.getBoundingClientRect();
              window.NP_FX.sparkles(faithBar);
            }
          }
        }
      } catch (e) {
        console.error('FX error:', e);
      }

      // Update prev snapshot
      prev.enemyHps = combat.enemies.map(function(enemy) { return enemy.hp; });
      prev.playerHp = G.run.hp;
      prev.playerBlock = combat.playerBlock;
      prev.faith = G.run.faith;
      prev.handLen = combat.hand.length;

      // Turn banner
      if (combat.turn !== prev.turn) {
        UI.toast('Turn ' + combat.turn, 'info');
      }

      // Combat over
      if (combat.over) {
        var overlay = document.createElement('div');
        overlay.className = 'combat-overlay';
        overlay.textContent = combat.over === 'victory' ? 'VICTORY' : 'DEFEAT';
        overlay.style.backgroundColor = combat.over === 'victory' ? 'rgba(212,175,55,.25)' : 'rgba(139,26,26,.25)';
        container.appendChild(overlay);

        if (window.NP_FX) {
          window.NP_FX.flash(combat.over === 'victory' ? 'rgba(212,175,55,.25)' : 'rgba(139,26,26,.25)');
        }

        setTimeout(function() {
          overlay.remove();
        }, 1200);
      }

      prev.turn = combat.turn;
    }
  });

  function getStatusGlyph(status) {
    switch (status) {
      case 'strength': return '💪';
      case 'vulnerable': return '🎯';
      case 'weak': return '😵';
      case 'plague': return '☠️';
      default: return '';
    }
  }

  function aliveCount() {
    var G = window.G;
    var combat = G.combat;
    if (!combat) return 0;
    return combat.enemies.filter(function(enemy) { return enemy.hp > 0; }).length;
  }

  function firstAliveUid() {
    var G = window.G;
    var combat = G.combat;
    if (!combat) return null;
    var alive = combat.enemies.filter(function(enemy) { return enemy.hp > 0; });
    return alive.length > 0 ? alive[0].uid : null;
  }

  function pct(a, b) {
    return Math.floor((a / b) * 100);
  }

  function esc() {
    window.NP_COMBAT.cancelSelect();
  }
})();