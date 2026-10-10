Object.assign(window.NP_CARDS, {
  shepherd_call: {
    id: 'shepherd_call',
    name: 'Shepherd\'s Call',
    type: 'power',
    cost: 1,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🐑',
    effects: [
      { op: 'faithPerTurn', base: 3, up: 4 }
    ]
  },
  new_covenant: {
    id: 'new_covenant',
    name: 'New Covenant',
    type: 'power',
    cost: 2,
    rarity: 'rare',
    target: 'self',
    glyph: '📜',
    effects: [
      { op: 'faithPerTurn', base: 6, up: 9 }
    ]
  },
  captain_of_hosts: {
    id: 'captain_of_hosts',
    name: 'Captain of Hosts',
    type: 'power',
    cost: 2,
    rarity: 'rare',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'strengthPerTurn', base: 2, up: 3 }
    ]
  },
  dawn_rising: {
    id: 'dawn_rising',
    name: 'Dawn Rising',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'self',
    faithCost: 65,
    glyph: '🌅',
    effects: [
      { op: 'strength', base: 3, up: 4 },
      { op: 'block', base: 8, up: 11 }
    ]
  },
  second_coming: {
    id: 'second_coming',
    name: 'Second Coming',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'all',
    faithCost: 90,
    glyph: '🌪️',
    effects: [
      { op: 'damage', base: 22, up: 30 },
      { op: 'draw', base: 1, up: 2 }
    ]
  },
  manna: {id: 'manna', name: 'Manna', type: 'skill', cost: 1, rarity: 'common', target: 'self', glyph: '🫓', effects: [{op:'heal', base:7, up:10}, {op:'draw', base:1, up:1}]}
});