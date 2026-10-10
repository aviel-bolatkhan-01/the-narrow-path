Object.assign(window.NP_CARDS, {
  shield_of_faith: {
    id: 'shield_of_faith',
    name: 'Shield of Faith',
    type: 'skill',
    cost: 1,
    rarity: 'common',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'block', base: 7, up: 10 }
    ]
  },
  divine_shield: {
    id: 'divine_shield',
    name: 'Divine Shield',
    type: 'skill',
    cost: 1,
    rarity: 'common',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'block', base: 7, up: 10 }
    ],
    ethereal: true
  },
  wall_of_protection: {
    id: 'wall_of_protection',
    name: 'Wall of Protection',
    type: 'skill',
    cost: 2,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'block', base: 12, up: 16 },
      { op: 'draw', base: 1, up: 2 }
    ]
  },
  divine_barrier: {
    id: 'divine_barrier',
    name: 'Divine Barrier',
    type: 'skill',
    cost: 1,
    rarity: 'rare',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'block', base: 8, up: 11 }
    ],
    retain: true
  },
  sanctuary: {
    id: 'sanctuary',
    name: 'Sanctuary',
    type: 'skill',
    cost: 2,
    rarity: 'common',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'block', base: 10, up: 14 }
    ]
  },
  fortify: {
    id: 'fortify',
    name: 'Fortify',
    type: 'skill',
    cost: 1,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'block', base: 6, up: 9 }
    ],
    exhaust: true
  },
  bulwark: {
    id: 'bulwark',
    name: 'Bulwark',
    type: 'skill',
    cost: 2,
    rarity: 'rare',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'block', base: 10, up: 14 }
    ],
    innate: true
  },
  psalm_of_strength: {
    id: 'psalm_of_strength',
    name: 'Psalm of Strength',
    type: 'skill',
    cost: 0,
    rarity: 'common',
    target: 'self',
    glyph: '📖',
    effects: [
      { op: 'strength', base: 1, up: 2 },
      { op: 'faith', base: 1, up: 2 }
    ],
    exhaust: true
  },
  prayer_of_healing: {
    id: 'prayer_of_healing',
    name: 'Prayer of Healing',
    type: 'skill',
    cost: 1,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🙏',
    effects: [
      { op: 'faith', base: 7, up: 10 },
      { op: 'heal', base: 3, up: 5 }
    ]
  },
  divine_intervention: {
    id: 'divine_intervention',
    name: 'Divine Intervention',
    type: 'skill',
    cost: 2,
    rarity: 'rare',
    target: 'self',
    glyph: '🙏',
    effects: [
      { op: 'faith', base: 10, up: 15 }
    ],
    retain: true
  },
  hymn_of_praise: {
    id: 'hymn_of_praise',
    name: 'Hymn of Praise',
    type: 'skill',
    cost: 1,
    rarity: 'common',
    target: 'self',
    glyph: '🎵',
    effects: [
      { op: 'faith', base: 5, up: 8 },
      { op: 'draw', base: 1, up: 2 }
    ]
  },
  prayer_of_protection: {
    id: 'prayer_of_protection',
    name: 'Prayer of Protection',
    type: 'skill',
    cost: 2,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🙏',
    effects: [
      { op: 'faith', base: 7, up: 10 },
      { op: 'block', base: 7, up: 10 }
    ]
  },
  prayer_of_purification: {
    id: 'prayer_of_purification',
    name: 'Prayer of Purification',
    type: 'skill',
    cost: 1,
    rarity: 'rare',
    target: 'self',
    glyph: '🙏',
    effects: [
      { op: 'faith', base: 10, up: 15 },
      { op: 'cleanse' }
    ]
  },
  prayer_of_renewal: {
    id: 'prayer_of_renewal',
    name: 'Prayer of Renewal',
    type: 'skill',
    cost: 0,
    rarity: 'common',
    target: 'self',
    glyph: '🙏',
    effects: [
      { op: 'faith', base: 5, up: 8 }
    ],
    exhaust: true
  },
  word_of_comfort: {
    id: 'word_of_comfort',
    name: 'Word of Comfort',
    type: 'skill',
    cost: 1,
    rarity: 'common',
    target: 'self',
    glyph: '🗣️',
    effects: [
      { op: 'draw', base: 2, up: 3 }
    ]
  },
  divine_inspiration: {
    id: 'divine_inspiration',
    name: 'Divine Inspiration',
    type: 'skill',
    cost: 0,
    rarity: 'uncommon',
    target: 'self',
    glyph: '🗣️',
    effects: [
      { op: 'draw', base: 1, up: 2 },
      { op: 'energy', base: 1, up: 1 }
    ]
  },
  word_of_power: {
    id: 'word_of_power',
    name: 'Word of Power',
    type: 'skill',
    cost: 1,
    rarity: 'rare',
    target: 'self',
    glyph: '🗣️',
    effects: [
      { op: 'strength', base: 2, up: 3 }
    ]
  },
  word_of_weakness: {
    id: 'word_of_weakness',
    name: 'Word of Weakness',
    type: 'skill',
    cost: 0,
    rarity: 'common',
    target: 'enemy',
    glyph: '🗣️',
    effects: [
      { op: 'weak', base: 1, up: 2 }
    ]
  },
  word_of_vulnerability: {
    id: 'word_of_vulnerability',
    name: 'Word of Vulnerability',
    type: 'skill',
    cost: 1,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🗣️',
    effects: [
      { op: 'vulnerable', base: 1, up: 2 }
    ]
  }
});
