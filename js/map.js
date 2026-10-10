(function() {
  const ACT_ENCOUNTERS = {
    1: {
      early: [['tempter'], ['whisperer'], ['horned_imp'], ['horned_imp', 'horned_imp'],
              ['wild_beast'], ['whisperer', 'horned_imp']],
      mid: [['grave_robber'], ['pharisee'], ['tempter', 'horned_imp'],
            ['wild_beast', 'whisperer'], ['money_changer'], ['horned_imp', 'horned_imp', 'horned_imp']],
      late: [['zealot'], ['pharisee', 'grave_robber'], ['zealot', 'wild_beast'],
            ['money_changer', 'horned_imp'], ['grave_robber', 'pharisee'], ['wild_beast', 'wild_beast']],
      elite: (floor) => floor % 2 === 0 ? ['legion_sergeant'] : ['abaddons_hound'],
      boss: ['goliath']
    },
    2: {
      early: [['shadow_of_doubt'], ['valley_shade'], ['famine_spirit'],
              ['shadow_of_doubt', 'valley_shade'], ['wasteland_stalker']],
      mid: [['siren_of_babylon'], ['baal_priest'], ['iron_host'],
            ['famine_spirit', 'shadow_of_doubt'], ['valley_shade', 'valley_shade']],
      late: [['iron_host', 'iron_host'], ['wasteland_stalker', 'valley_shade'],
             ['siren_of_babylon', 'famine_spirit'], ['baal_priest', 'shadow_of_doubt'],
             ['wasteland_stalker', 'wasteland_stalker']],
      elite: (floor) => floor % 2 === 0 ? ['jezebels_guard'] : ['moloch_colossus'],
      boss: ['the_beast']
    },
    3: {
      early: [['locust_of_abyss'], ['void_walker'], ['locust_of_abyss', 'void_walker'],
              ['false_prophet'], ['void_walker', 'false_prophet']],
      mid: [['throne_guard'], ['bottomless_pit_fiend'], ['pale_rider'],
            ['throne_guard', 'locust_of_abyss'], ['false_prophet', 'pale_rider']],
      late: [['throne_guard', 'pale_rider'], ['bottomless_pit_fiend', 'pale_rider'],
             ['throne_guard', 'false_prophet'], ['locust_of_abyss', 'locust_of_abyss', 'void_walker'],
             ['throne_guard', 'throne_guard']],
      elite: (floor) => floor % 2 === 0 ? ['nephilim'] : ['apollyon'],
      boss: ['the_dragon']
    }
  };

  const NODE_TYPES = ['combat', 'elite', 'event', 'shop', 'rest', 'treasure', 'boss'];
  const TYPE_GLYPHS = {
    combat: '⚔', elite: '♛', event: '?', shop: '⚖', rest: '🔥', treasure: '▣', boss: '☠'
  };

  const FLOOR_TYPE_POOLS = {
    0: ['combat'],
    1: ['combat', 'event'],
    2: ['combat', 'event', 'shop'],
    3: ['combat', 'rest', 'event'],
    4: ['treasure', 'event', 'combat'],
    5: ['combat', 'elite', 'event'],
    6: ['combat', 'shop', 'event'],
    7: ['combat', 'rest', 'event'],
    8: ['combat', 'elite', 'event'],
    9: ['treasure', 'event', 'combat'],
    10: ['combat', 'elite', 'shop'],
    11: ['combat', 'rest', 'event'],
    12: ['combat', 'elite', 'event'],
    13: ['rest', 'treasure', 'shop'],
    14: ['combat', 'elite']
  };

  function hash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    return function() {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function shuffle(array, rng) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function generate(act, floorCount = 15, seed) {
    const rng = mulberry32(hash(String(seed)));
    const floors = [];
    const edges = [];
    const nodes = [];
    const bossFloor = floorCount - 1;

    for (let floor = 0; floor < floorCount; floor++) {
      const count = (floor === 0 || floor === bossFloor) ? 1 : 2 + (rng() < 0.5 ? 0 : 1);
      const floorNodes = [];

      for (let i = 0; i < count; i++) {
        const y = 92 - floor * (82 / (floorCount - 1));
        let x = 10 + (i + 1) * (80 / (count + 1)) + (rng() * 6 - 3);
        x = Math.max(8, Math.min(92, x));

        const node = {
          uid: `f${floor}n${i}`,
          floor,
          type: 'event',
          encounter: null,
          taken: false,
          x,
          y
        };
        floorNodes.push(node);
        nodes.push(node);
      }

      floors.push(floorNodes);
    }

    floors[0][0].type = 'combat';

    const shopFloor = [2, 6, 10][Math.floor(rng() * 3)];
    let shopIndex = Math.floor(rng() * floors[shopFloor].length);
    while (floors[shopFloor][shopIndex].type !== 'event') {
      shopIndex = (shopIndex + 1) % floors[shopFloor].length;
    }
    floors[shopFloor][shopIndex].type = 'shop';

    const treasureFloors = [4, 9];
    for (const floor of treasureFloors) {
      let treasureIndex = Math.floor(rng() * floors[floor].length);
      while (floors[floor][treasureIndex].type !== 'event') {
        treasureIndex = (treasureIndex + 1) % floors[floor].length;
      }
      floors[floor][treasureIndex].type = 'treasure';
    }

    const restFloors = [7, 13, rng() < 0.5 ? 3 : 11];
    for (const floor of restFloors) {
      let restIndex = Math.floor(rng() * floors[floor].length);
      while (floors[floor][restIndex].type !== 'event') {
        restIndex = (restIndex + 1) % floors[floor].length;
      }
      floors[floor][restIndex].type = 'rest';
    }

    const eliteFloors = shuffle([5, 8, 10, 12], rng).slice(0, 2);
    for (const floor of eliteFloors) {
      let eliteIndex = Math.floor(rng() * floors[floor].length);
      while (floors[floor][eliteIndex].type !== 'event') {
        eliteIndex = (eliteIndex + 1) % floors[floor].length;
      }
      floors[floor][eliteIndex].type = 'elite';
    }

    floors[bossFloor][0].type = 'boss';

    for (const node of nodes) {
      if (node.type === 'event' && rng() >= 0.45) {
        node.type = 'combat';
      }
    }

    for (const node of nodes) {
      if (node.type === 'combat') {
        let band;
        if (node.floor <= 5) band = 'early';
        else if (node.floor <= 10) band = 'mid';
        else band = 'late';
        const encounters = ACT_ENCOUNTERS[act][band];
        node.encounter = encounters[Math.floor(rng() * encounters.length)].slice();
      } else if (node.type === 'elite') {
        node.encounter = ACT_ENCOUNTERS[act].elite(node.floor).slice();
      } else if (node.type === 'boss') {
        node.encounter = ACT_ENCOUNTERS[act].boss.slice();
      }
    }

    for (let f = 1; f <= bossFloor; f++) {
      const prev = floors[f - 1];
      const next = floors[f];
      const seen = new Set();

      for (const n of next) {
        const p = prev[Math.floor(rng() * prev.length)];
        edges.push([p.uid, n.uid]);
        seen.add(p.uid + '>' + n.uid);
      }

      for (const p of prev) {
        if (edges.some(([a]) => a === p.uid)) continue;
        const n = next[Math.floor(rng() * next.length)];
        if (!seen.has(p.uid + '>' + n.uid)) {
          edges.push([p.uid, n.uid]);
          seen.add(p.uid + '>' + n.uid);
        }
      }

      if (rng() < 0.7 && next.length > 1) {
        const p = prev[Math.floor(rng() * prev.length)];
        const n = next[Math.floor(rng() * next.length)];
        if (!seen.has(p.uid + '>' + n.uid)) edges.push([p.uid, n.uid]);
      }
    }

    G.run.map = { floors, edges, current: null, done: [] };
}

  function render(container, onPick) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('map-svg');
    container.innerHTML = '';
    container.appendChild(svg);

    const map = G.run.map;
    const nodes = map.floors.flat();
    const edges = map.edges;

    for (const [fromUid, toUid] of edges) {
      const fromNode = nodes.find(n => n.uid === fromUid);
      const toNode = nodes.find(n => n.uid === toUid);

      if (!fromNode || !toNode) continue;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${fromNode.x}%`);
      line.setAttribute('y1', `${fromNode.y}%`);
      line.setAttribute('x2', `${toNode.x}%`);
      line.setAttribute('y2', `${toNode.y}%`);
      line.setAttribute('stroke', '#d4af37');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-opacity', '0.55');
      svg.appendChild(line);
    }

    for (const node of nodes) {
      const btn = document.createElement('button');
      btn.classList.add('node');
      btn.dataset.uid = node.uid;
      btn.textContent = TYPE_GLYPHS[node.type];

      if (node.taken) {
        btn.classList.add('chosen');
      } else if (map.done.includes(node.uid)) {
        btn.classList.add('passed');
      } else if (map.current === node.uid) {
        btn.classList.add('pulse');
      }

      if (node.type === 'boss') {
        btn.classList.add('boss');
      }

      btn.style.left = `${node.x}%`;
      btn.style.top = `${node.y}%`;

      btn.addEventListener('click', () => {
        if (availableNodes().some(n => n.uid === node.uid)) {
          onPick(node);
        }
      });

      container.appendChild(btn);
    }
  }

  function availableNodes() {
    const map = G.run.map;
    if (!map.current) {
      return map.floors[0].filter(n => !map.done.includes(n.uid));
    }
    const curIdx = map.floors.findIndex(floor => floor.some(n => n.uid === map.current));
    const next = map.floors[curIdx + 1];
    if (!next) return [];
    const connected = next.filter(n => map.edges.some(([fromUid, toUid]) => fromUid === map.current && toUid === n.uid));
    return connected.length > 0 ? connected : next.filter(n => !map.done.includes(n.uid));
  }

  function nodeInfo(node) {
    const info = {
      floor: node.floor + 1,
      type: node.type,
      label: node.type.charAt(0).toUpperCase() + node.type.slice(1),
      encounter: null
    };

    if (node.encounter) {
      const enemyNames = node.encounter.map(id => {
        const enemy = NP_ENEMIES[id];
        return enemy ? enemy.name : id;
      });

      const counts = {};
      for (const name of enemyNames) {
        counts[name] = (counts[name] || 0) + 1;
      }

      info.encounter = Object.entries(counts)
        .map(([name, count]) => count > 1 ? `${name} × ${count}` : name)
        .join(', ');
    }

    return info;
  }

  function advanceTo(node) {
    if (!availableNodes().some(n => n.uid === node.uid)) {
      return null;
    }

    const map = G.run.map;
    node.taken = true;
    map.done.push(node.uid);
    map.current = node.uid;
    G.run.floor = node.floor + 1;
    G.run.currentNode = node.uid;
    return node;
  }

  window.NP_MAP = { generate, render, availableNodes, nodeInfo, advanceTo };
})();