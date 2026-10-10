(function() {
  const UI = {
    onMapPick: null,
    show(screen) {
      G.screen = screen;
      this.renderAll();
      NP_AUDIO.playScene(screen === 'title' ? 'title' : screen === 'combat' ? 'combat' : 'map');
    },
    renderAll() {
      const app = document.getElementById('app');
      app.innerHTML = '';
      switch (G.screen) {
        case 'title': this.renderTitle(app); break;
        case 'map': this.renderMapWrapper(app); break;
        case 'combat': this.renderCombatShell(app); if (this.renderCombat) this.renderCombat(); break;
        case 'reward': this.renderReward(app); break;
        case 'shop': this.renderShop(app); break;
        case 'rest': this.renderRest(app); break;
        case 'event': this.renderEvent(app); break;
        case 'deck': this.renderDeckScreen(app); break;
        case 'gameover': this.renderGameOver(app); break;
        case 'victory': this.renderVictory(app); break;
        case 'settings': this.renderSettings(app); break;
      }
    },
    renderTitle(container) {
      container.innerHTML = `
        <div class="title-screen">
          <img class="title-bg" src="assets/img/title.png" alt="" onerror="this.style.display='none'">
          <h1>THE NARROW PATH</h1>
          <p class="subtitle">A Christian Roguelike Deck-Building Game</p>
          <div class="btn-wrap">
            <button class="btn-primary" data-action="new-run">NEW RUN</button>
            ${localStorage.getItem('np_save') ? '<button class="btn-primary" data-action="continue">CONTINUE</button>' : ''}
            <button class="btn-primary" data-action="settings">SETTINGS</button>
            <button class="btn-primary" data-action="credits">CREDITS</button>
          </div>
          <div class="footer">Trials: ${G.meta.trialsUnlocked}/10</div>
        </div>
      `;
    },
    renderMapWrapper(container) {
      container.innerHTML = `
        <div class="map-screen">
          <div class="map-header">
            <img class="act-banner" src="assets/img/act${G.run.act}.png" alt="" onerror="this.style.display='none'">
            <div class="floor-info">Act ${G.run.act} - Floor ${G.run.floor}</div>
            <div class="resources">
              <div class="resource gold">${G.run.gold} <img src="assets/img/gold.png" alt="Gold"></div>
              <div class="resource hp">${G.run.hp}/${G.run.maxHp} <img src="assets/img/hp.png" alt="HP"></div>
              <div class="resource faith">${G.run.faith} <img src="assets/img/faith.png" alt="Faith"></div>
            </div>
          </div>
          <div class="map-wrap"></div>
        </div>
      `;
      NP_MAP.render(document.querySelector('.map-wrap'), (node) => {
        if (this.onMapPick) this.onMapPick(node);
      });
    },
    renderCombatShell(container) {
      if (!G.combat) {
        container.innerHTML = '<div class="combat-placeholder">Combat loading...</div>';
        return;
      }
      const logHtml = G.combat.log.map(entry => {
        if (typeof entry === 'string') return entry;
        if (entry.card) return `${NP_CARDS[entry.card] ? NP_CARDS[entry.card].name : entry.card} ${entry.effect} ${entry.value}`;
        if (entry.enemy || entry.event || entry.move) return `${entry.enemy || ''} ${entry.event || entry.move || ''}`;
        if (entry.player === 'block') return `+${entry.value} block`;
        return '';
      }).join('<br>');
      container.innerHTML = `<div class="screen combat">
        <div class="combat-top">
          <div class="enemy-stage"></div>
          <div class="log-panel${G.logOpen ? '' : ' log-hidden'}">${logHtml}</div>
        </div>
        <div class="player-hud">
          <div class="hp-bar player-hp"><div class="fill"></div><span class="hp-text"></span><div class="hp-block" style="display:none"></div></div>
          <div class="status-chips"></div>
          <div class="faith-bar"><div class="fill"></div></div>
          <div class="energy-orb"></div>
          <div class="potion-belt"></div>
          <div class="relic-tray"></div>
        </div>
        <div class="hand"></div>
        <div class="combat-controls">
          <div class="pile-info"><span class="draw-pile"><img src="assets/img/cardback.png" alt="Draw pile"> Draw: ${G.combat.draw.length}</span><span>Discard: ${G.combat.discard.length}</span><span>Exhaust: ${G.combat.exhaust.length}</span></div>
          <button class="btn btn-ghost" data-action="toggle-log">LOG</button>
          <button class="btn btn-ghost" data-action="concede">CONCEDE</button>
          <button class="btn btn-primary" data-action="end-turn">END TURN</button>
        </div>
      </div>`;
    },
    renderPlaceholder(container) {
      container.innerHTML = '<div class="combat-placeholder">Combat screen loading...</div>';
    },
    renderReward(container) {
      container.innerHTML = `
        <div class="reward-screen">
          <h2>Victory!</h2>
          ${G.reward.gold ? `<button class="btn-primary" data-action="claim-gold">Claim ${G.reward.gold} Gold</button>` : ''}
          <div class="reward-cards">
            ${G.reward.cards.map((card, i) => `
              <div class="reward-card" data-action="reward-card" data-index="${i}">
                ${this.renderCard(card)}
              </div>
            `).join('')}
          </div>
          <button class="btn-primary" data-action="reward-skip">SKIP</button>
        </div>
      `;
      if (G.reward.relic) {
        this.modal({
          title: 'You found a relic!',
          body: `You found a relic: ${G.reward.relic.name}`,
          buttons: [{ label: 'TAKE', action: 'reward-relic' }]
        });
      }
    },
    renderShop(container) {
      container.innerHTML = `
        <div class="shop-screen">
          <h2>Shop</h2>
          <div class="shop-items">
            ${G.shop.items.map((item, i) => `
              <div class="shop-item">
                ${item.type === 'card' ? this.renderCard(item.id) : `
                  <div class="item-icon">${item.type === 'potion' ? NP_POTIONS[item.id].icon : NP_RELICS[item.id].icon}</div>
                  <div class="item-name">${item.type === 'potion' ? NP_POTIONS[item.id].name : NP_RELICS[item.id].name}</div>
                `}
                <div class="item-price">${item.price} Gold</div>
                <button class="btn-primary ${item.sold || G.run.gold < item.price ? 'disabled' : ''}" data-action="buy" data-index="${i}">${item.sold ? 'SOLD' : 'BUY'}</button>
              </div>
            `).join('')}
          </div>
          <div class="remove-card">
            <button class="btn-primary" data-action="buy-remove">Remove a Card (${G.shop.removePrice} Gold)</button>
          </div>
          <button class="btn-primary" data-action="leave-shop">LEAVE</button>
        </div>
      `;
    },
    renderRest(container) {
      container.innerHTML = `
        <div class="rest-screen">
          <h2>Rest</h2>
          <div class="rest-options">
            <div class="rest-option" data-action="rest-heal">
              <h3>REST</h3>
              <p>Heal 30% of your max HP</p>
            </div>
            <div class="rest-option" data-action="rest-smith">
              <h3>SMITH</h3>
              <p>Upgrade a card in your deck</p>
            </div>
          </div>
        </div>
      `;
    },
    renderEvent(container) {
      container.innerHTML = `
        <div class="event-screen">
          <img src="assets/img/events/${G.activeEvent.def.id}.png" alt="${G.activeEvent.def.title}" onerror="this.style.display='none'">
          <h2>${this.esc(G.activeEvent.def.title)}</h2>
          <p>${this.esc(G.activeEvent.def.text)}</p>
          <div class="event-choices">
            ${G.activeEvent.def.choices.map((choice, i) => `
              <button class="btn-primary" data-action="event-choice" data-index="${i}">${this.esc(choice.label)}</button>
            `).join('')}
          </div>
        </div>
      `;
    },
    renderDeckScreen(container) {
      container.innerHTML = `
        <div class="deck-screen">
          <button class="btn-close" data-action="deck-close">×</button>
          ${this.renderDeck(G.run.deck, G.deckMode === 'smith' ? 'smith' : 'view')}
        </div>
      `;
    },
    renderGameOver(container) {
      container.innerHTML = `
        <div class="gameover-screen">
          <h1>DEFEAT</h1>
          <div class="score-breakdown">
            <p>Floor: ${G.score.floor}</p>
            <p>HP: ${G.score.hp}</p>
            <p>Gold: ${G.score.gold}</p>
            <p>Trials: ${G.score.trials}</p>
          </div>
          <div class="btn-wrap">
            <button class="btn-primary" data-action="new-run">NEW RUN</button>
            <button class="btn-primary" data-action="to-title">TITLE</button>
          </div>
        </div>
      `;
    },
    renderVictory(container) {
      container.innerHTML = `
        <div class="victory-screen">
          <h1>VICTORY</h1>
          <div class="score-breakdown">
            <p>Floor: ${G.score.floor}</p>
            <p>HP: ${G.score.hp}</p>
            <p>Gold: ${G.score.gold}</p>
            <p>Trials: ${G.score.trials}</p>
          </div>
          <div class="btn-wrap">
            <button class="btn-primary" data-action="new-run">NEW RUN</button>
            <button class="btn-primary" data-action="to-title">TITLE</button>
          </div>
        </div>
      `;
    },
    renderSettings(container) {
      container.innerHTML = `
        <div class="settings-screen">
          <h2>SETTINGS</h2>
          <div class="volume-controls">
            <label>Master Volume: <input type="range" min="0" max="100" data-slider="master"></label>
            <label>Music Volume: <input type="range" min="0" max="100" data-slider="music"></label>
            <label>SFX Volume: <input type="range" min="0" max="100" data-slider="sfx"></label>
          </div>
          <button class="btn-primary" data-action="mute">MUTE</button>
          <button class="btn-primary" data-action="settings-back">BACK</button>
        </div>
      `;
      const [master, music, sfx] = NP_AUDIO.getVol();
      document.querySelector('[data-slider="master"]').value = master * 100;
      document.querySelector('[data-slider="music"]').value = music * 100;
      document.querySelector('[data-slider="sfx"]').value = sfx * 100;
      try { NP_FX.sparkles(document.querySelector('.btn-primary')); } catch (e) {}
    },
    renderMap() {
      const container = document.querySelector('.map-wrap');
      if (container) {
        NP_MAP.render(container, (node) => {
          if (this.onMapPick) this.onMapPick(node);
        });
      }
    },
    renderDeck(cards, mode) {
      return `
        <div class="deck-view ${mode}">
          <div class="deck-filters">
            <button class="filter-chip" data-action="filter" data-type="all">All</button>
            <button class="filter-chip" data-action="filter" data-type="attack">Attack</button>
            <button class="filter-chip" data-action="filter" data-type="skill">Skill</button>
            <button class="filter-chip" data-action="filter" data-type="power">Power</button>
            <button class="filter-chip" data-action="filter" data-type="miracle">Miracle</button>
            <button class="filter-chip" data-action="filter" data-type="curse">Curse</button>
          </div>
          <div class="deck-grid">
            ${cards.map(card => `
              <div class="deck-card ${mode}" data-action="${mode}-pick" data-uid="${card.uid}" data-id="${card.id}">
                ${this.renderCard(card, { upgraded: card.upgraded })}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },
    tooltip(html, ev) {
      const tooltip = document.getElementById('tooltip');
      if (!html) {
        tooltip.style.display = 'none';
        return;
      }
      tooltip.innerHTML = html;
      tooltip.style.display = 'block';
      const x = ev.clientX + 14;
      const y = ev.clientY + 14;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    },
    toast(msg, type = 'info') {
      const toastWrap = document.getElementById('toast-wrap');
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.textContent = msg;
      toastWrap.appendChild(toast);
      setTimeout(() => toast.remove(), 2600);
    },
    modal(opts) {
      if (!opts) {
        const modalWrap = document.getElementById('modal-wrap');
        modalWrap.innerHTML = '';
        modalWrap.style.display = 'none';
        G._modalButtons = null;
        return false;
      }
      const { title, body, buttons } = opts;
      G._modalButtons = buttons || [];
      const modalWrap = document.getElementById('modal-wrap');
      modalWrap.innerHTML = `
        <div class="modal">
          <div class="modal-header">
            <h3>${this.esc(title)}</h3>
            <button class="btn-close" data-action="modal-close">×</button>
          </div>
          <div class="modal-body">${this.esc(body)}</div>
          <div class="modal-footer">
            ${buttons.map((btn, i) => `
              <button class="btn-primary ${btn.style || ''}" data-action="modal-btn" data-index="${i}">${this.esc(btn.label)}</button>
            `).join('')}
          </div>
        </div>
      `;
      modalWrap.style.display = 'flex';
      return true;
    },
    renderCardText(def, upgraded) {
      if (def.type === 'curse' && def.text) {
        return this.esc(def.text);
      }
      const effectTexts = def.effects.map(eff => {
        let text = '';
        switch (eff.op) {
          case 'damage':
            text = `Deal <b>${upgraded ? eff.up : eff.base}</b> damage`;
            if (def.target === 'all') text += ' <span class="kw">to ALL enemies</span>';
            if (eff.times) text += ` <b>${eff.times}</b> times`;
            break;
          case 'block': text = `Gain <b>${upgraded ? eff.up : eff.base}</b> Block`; break;
          case 'faith': text = `Gain <b>${upgraded ? eff.up : eff.base}</b> Faith`; break;
          case 'draw': text = `Draw <b>${upgraded ? eff.up : eff.base}</b> card(s)`; break;
          case 'energy': text = `Gain <b>${upgraded ? eff.up : eff.base}</b> Energy`; break;
          case 'heal': text = `Heal <b>${upgraded ? eff.up : eff.base}</b> HP`; break;
          case 'strength': text = `Gain <b>${upgraded ? eff.up : eff.base}</b> Strength`; break;
          case 'weak': text = `Apply <b>${upgraded ? eff.up : eff.base}</b> Weak`; break;
          case 'vulnerable': text = `Apply <b>${upgraded ? eff.up : eff.base}</b> Vulnerable`; break;
          case 'plague': text = `Apply <b>${upgraded ? eff.up : eff.base}</b> Plague`; break;
          case 'cleanse': text = 'Cleanse Weak, Vulnerable, Plague'; break;
          case 'blockPerTurn': text = `Each turn, gain <b>${upgraded ? eff.up : eff.base}</b> Block`; break;
          case 'strengthPerTurn': text = `Each turn, gain <b>${upgraded ? eff.up : eff.base}</b> Strength`; break;
          case 'faithPerTurn': text = `Each turn, gain <b>${upgraded ? eff.up : eff.base}</b> Faith`; break;
          case 'drawPerTurn': text = `Each turn, draw <b>${upgraded ? eff.up : eff.base}</b> extra card(s)`; break;
          case 'blockPlus': text = `Whenever you gain Block, +<b>${upgraded ? eff.up : eff.base}</b> more`; break;
          case 'weakOnAttack': text = `Attacks apply <b>${upgraded ? eff.up : eff.base}</b> Weak`; break;
          case 'thorns': text = `Reflect <b>${upgraded ? eff.up : eff.base}</b> damage when attacked`; break;
          case 'combatStartStrength': text = `At combat start, gain <b>${upgraded ? eff.up : eff.base}</b> Strength`; break;
          case 'combatStartBlock': text = `At combat start, gain <b>${upgraded ? eff.up : eff.base}</b> Block`; break;
        }
        return text;
      }).join(' ');
      const flags = [];
      if (def.exhaust) flags.push('Exhaust');
      if (def.ethereal) flags.push('Ethereal');
      if (def.innate) flags.push('Innate');
      if (def.retain) flags.push('Retain');
      if (flags.length > 0) {
        return `${effectTexts} <span class="kw">${flags.join(', ')}</span>`;
      }
      return effectTexts;
    },
    renderCard(defOrInst, opts = {}) {
      const def = typeof defOrInst === 'string' ? NP_CARDS[defOrInst] : NP_CARDS[defOrInst.id];
      const upgraded = opts.upgraded || (defOrInst.upgraded !== undefined ? defOrInst.upgraded : false);
      const cardId = typeof defOrInst === 'string' ? defOrInst : defOrInst.id;
      const typeLabel = def.type === 'attack' ? 'ATK' : def.type === 'skill' ? 'SKL' : def.type === 'power' ? 'PWR' : def.type === 'miracle' ? 'MIR' : def.type.substring(0, 3).toUpperCase();
      const cost = def.faithCost ? `<div class="cost-gem miracle">${def.faithCost}</div>` : `<div class="cost-gem">${def.cost}</div>`;
      return `
        <div class="card ${opts.selected ? 'selected' : ''} ${opts.unplayable ? 'unplayable' : ''} ${opts.tilt ? 'tilt' : ''}">
          <div class="card-inner rarity-${def.rarity}">
            ${cost}
            <div class="type-ribbon ${def.type}">${typeLabel}</div>
            <div class="card-art"><img src="assets/img/card_${cardId}.png" onerror="this.remove()" onload="this.nextElementSibling.style.display='none'"><span>${def.glyph}</span></div>
            <div class="card-name">${def.name}${upgraded ? '+' : ''}</div>
            <div class="rule"></div>
            <div class="card-text">${this.renderCardText(def, upgraded)}</div>
            ${upgraded ? '<div class="card-up">Upgraded</div>' : ''}
          </div>
        </div>
      `;
    },
    esc(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
  };
  window.NP_UI = UI;
})();