Object.assign(window.NP_CARDS, {
  belt_of_truth: {
    id: 'belt_of_truth',
    name: 'Belt of Truth',
    type: 'power',
    cost: 1,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'blockPerTurn', base: 2, up: 3 }
    ]
  },
  breastplate_righteousness: {
    id: 'breastplate_righteousness',
    name: 'Breastplate of Righteousness',
    type: 'power',
    cost: 1,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'combatStartStrength', base: 1, up: 2 }
    ]
  },
  helmet_salvation: {
    id: 'helmet_salvation',
    name: 'Helmet of Salvation',
    type: 'power',
    cost: 1,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'blockPlus', base: 1, up: 2 }
    ]
  },
  boots_peace: {
    id: 'boots_peace',
    name: 'Boots of Peace',
    type: 'power',
    cost: 1,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'drawPerTurn', base: 1, up: 2 }
    ]
  },
  zeal: {
    id: 'zeal',
    name: 'Zeal',
    type: 'power',
    cost: 1,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🔥',
    effects: [
      { op: 'strengthPerTurn', base: 1, up: 2 }
    ]
  },
  iron_faith: {
    id: 'iron_faith',
    name: 'Iron Faith',
    type: 'power',
    cost: 2,
    rarity: 'rare',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'blockPerTurn', base: 3, up: 4 }
    ]
  },
  discernment: {
    id: 'discernment',
    name: 'Discernment',
    type: 'power',
    cost: 2,
    rarity: 'rare',
    target: 'self',
    glyph: '👁️',
    effects: [
      { op: 'weakOnAttack', base: 1, up: 2 }
    ]
  },
  faith_armor: {
    id: 'faith_armor',
    name: 'Faith Armor',
    type: 'power',
    cost: 2,
    rarity: 'rare',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'blockPerTurn', base: 3, up: 4 },
      { op: 'thorns', base: 1, up: 2 }
    ]
  },
  divine_insight: {
    id: 'divine_insight',
    name: 'Divine Insight',
    type: 'power',
    cost: 2,
    rarity: 'rare',
    target: 'self',
    glyph: '🔮',
    effects: [
      { op: 'drawPerTurn', base: 1, up: 2 },
      { op: 'faithPerTurn', base: 1, up: 2 }
    ]
  },
  holy_guard: {
    id: 'holy_guard',
    name: 'Holy Guard',
    type: 'power',
    cost: 3,
    rarity: 'rare',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'blockPlus', base: 3, up: 4 }
    ]
  },
  faith_shield: {
    id: 'faith_shield',
    name: 'Faith Shield',
    type: 'power',
    cost: 3,
    rarity: 'rare',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'blockPerTurn', base: 4, up: 5 }
    ]
  },
  divine_protection: {
    id: 'divine_protection',
    name: 'Divine Protection',
    type: 'power',
    cost: 3,
    rarity: 'rare',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'blockPlus', base: 4, up: 5 }
    ]
  },
  part_the_sea: {
    id: 'part_the_sea',
    name: 'Part the Sea',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'all',
    faithCost: 80,
    glyph: '🌊',
    effects: [
      { op: 'damage', base: 15, up: 20 }
    ]
  },
  still_the_storm: {
    id: 'still_the_storm',
    name: 'Still the Storm',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'self',
    faithCost: 50,
    glyph: '⛈️',
    effects: [
      { op: 'block', base: 8, up: 11 },
      { op: 'cleanse' }
    ]
  },
  multiply_loaves: {
    id: 'multiply_loaves',
    name: 'Multiply the Loaves',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'self',
    faithCost: 70,
    glyph: '🍞',
    effects: [
      { op: 'heal', base: 10, up: 14 },
      { op: 'block', base: 6, up: 9 }
    ]
  },
  tongues_of_fire: {
    id: 'tongues_of_fire',
    name: 'Tongues of Fire',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'all',
    faithCost: 60,
    glyph: '🔥',
    effects: [
      { op: 'damage', base: 8, up: 11 },
      { op: 'plague', base: 2, up: 3 }
    ]
  },
  judgement: {
    id: 'judgement',
    name: 'Judgement',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'enemy',
    faithCost: 100,
    glyph: '⚖️',
    effects: [
      { op: 'damage', base: 30, up: 40 }
    ]
  },
  raven_provision: {
    id: 'raven_provision',
    name: 'Raven Provision',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'self',
    faithCost: 55,
    glyph: '🐦',
    effects: [
      { op: 'draw', base: 3, up: 4 },
      { op: 'energy', base: 1, up: 2 }
    ]
  },
  pillar_of_fire: {
    id: 'pillar_of_fire',
    name: 'Pillar of Fire',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'all',
    faithCost: 65,
    glyph: '🔥',
    effects: [
      { op: 'damage', base: 10, up: 14 },
      { op: 'strength', base: 1, up: 2 }
    ]
  },
  golden_censer_area: {
    id: 'golden_censer_area',
    name: 'Golden Censer Area',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'all',
    faithCost: 75,
    glyph: '🕯️',
    effects: [
      { op: 'damage', base: 6, up: 9 },
      { op: 'faith', base: 6, up: 10 }
    ]
  },
  holy_light: {
    id: 'holy_light',
    name: 'Holy Light',
    type: 'miracle',
    cost: 0,
    rarity: 'rare',
    target: 'all',
    faithCost: 50,
    glyph: '💡',
    effects: [
      { op: 'damage', base: 6, up: 9 },
      { op: 'heal', base: 4, up: 7 }
    ]
  },
  faith_renewal: {
    id: 'faith_renewal',
    name: 'Faith Renewal',
    type: 'miracle',
    cost: 0,
    rarity: 'uncommon',
    target: 'self',
    faithCost: 40,
    glyph: '💫',
    effects: [
      { op: 'heal', base: 8, up: 11 },
      { op: 'cleanse' }
    ]
  },
  faith_energy: {
    id: 'faith_energy',
    name: 'Faith Energy',
    type: 'miracle',
    cost: 0,
    rarity: 'uncommon',
    target: 'self',
    faithCost: 45,
    glyph: '⚡',
    effects: [
      { op: 'energy', base: 2, up: 3 },
      { op: 'draw', base: 1, up: 2 }
    ]
  },
  holy_water: {
    id: 'holy_water',
    name: 'Holy Water',
    type: 'miracle',
    cost: 0,
    rarity: 'uncommon',
    target: 'enemy',
    faithCost: 50,
    glyph: '💧',
    effects: [
      { op: 'damage', base: 12, up: 16 },
      { op: 'cleanse' }
    ]
  }
});
