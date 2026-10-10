window.NP_CARDS = {
  strike: {
    id: 'strike',
    name: 'Strike',
    type: 'attack',
    cost: 1,
    rarity: 'starter',
    target: 'enemy',
    glyph: '⚔️',
    effects: [
      { op: 'damage', base: 6, up: 9 }
    ]
  },
  defend: {
    id: 'defend',
    name: 'Defend',
    type: 'skill',
    cost: 1,
    rarity: 'starter',
    target: 'self',
    glyph: '🛡️',
    effects: [
      { op: 'block', base: 5, up: 8 }
    ]
  },
  inspiring_strike: {
    id: 'inspiring_strike',
    name: 'Inspiring Strike',
    type: 'attack',
    cost: 1,
    rarity: 'starter',
    target: 'enemy',
    glyph: '✨⚔️',
    effects: [
      { op: 'damage', base: 6, up: 9 },
      { op: 'faith', base: 1, up: 2 }
    ]
  },
  mending_prayer: {
    id: 'mending_prayer',
    name: 'Mending Prayer',
    type: 'skill',
    cost: 1,
    rarity: 'starter',
    target: 'self',
    glyph: '🙏',
    effects: [
      { op: 'block', base: 6, up: 9 },
      { op: 'faith', base: 3, up: 5 }
    ]
  },
  whirlwind_of_feathers: {
    id: 'whirlwind_of_feathers',
    name: 'Whirlwind of Feathers',
    type: 'attack',
    cost: 1,
    rarity: 'common',
    target: 'all',
    glyph: '🌪️',
    effects: [
      { op: 'damage', base: 4, up: 6, times: 2 }
    ]
  },
  shepherd_staff: {
    id: 'shepherd_staff',
    name: 'Shepherd Staff',
    type: 'attack',
    cost: 1,
    rarity: 'common',
    target: 'enemy',
    glyph: '👑',
    effects: [
      { op: 'damage', base: 5, up: 8 }
    ]
  },
  lions_mouth: {
    id: 'lions_mouth',
    name: "Lion's Mouth",
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🦁',
    effects: [
      { op: 'damage', base: 9, up: 13 },
      { op: 'weak', base: 1, up: 2 }
    ]
  },
  five_smooth_stones: {
    id: 'five_smooth_stones',
    name: 'Five Smooth Stones',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🪨',
    effects: [
      { op: 'damage', base: 3, up: 4, times: 3 }
    ]
  },
  red_sea_wave: {
    id: 'red_sea_wave',
    name: 'Red Sea Wave',
    type: 'attack',
    cost: 3,
    rarity: 'rare',
    target: 'all',
    glyph: '🌊',
    effects: [
      { op: 'damage', base: 13, up: 18 }
    ]
  },
  fire_from_heaven: {
    id: 'fire_from_heaven',
    name: 'Fire from Heaven',
    type: 'attack',
    cost: 3,
    rarity: 'rare',
    target: 'all',
    glyph: '🔥',
    effects: [
      { op: 'damage', base: 15, up: 21 },
      { op: 'plague', base: 2, up: 3 }
    ]
  },
  gideon_trumpet: {
    id: 'gideon_trumpet',
    name: "Gideon's Trumpet",
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'all',
    glyph: '📯',
    effects: [
      { op: 'damage', base: 7, up: 10 },
      { op: 'weak', base: 1, up: 2 }
    ]
  },
  samson_jawbone: {
    id: 'samson_jawbone',
    name: "Samson's Jawbone",
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🦷',
    effects: [
      { op: 'damage', base: 12, up: 16 }
    ]
  },
  david_sling: {
    id: 'david_sling',
    name: "David's Sling",
    type: 'attack',
    cost: 1,
    rarity: 'common',
    target: 'enemy',
    glyph: '🏹',
    effects: [
      { op: 'damage', base: 5, up: 7 },
      { op: 'vulnerable', base: 1, up: 2 }
    ]
  },
  elijah_rock: {
    id: 'elijah_rock',
    name: "Elijah's Rock",
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🪨',
    effects: [
      { op: 'damage', base: 9, up: 13 },
      { op: 'block', base: 3, up: 5 }
    ]
  },
  joshua_staff: {
    id: 'joshua_staff',
    name: "Joshua's Staff",
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🏺',
    effects: [
      { op: 'damage', base: 10, up: 14 },
      { op: 'strength', base: 1, up: 2 }
    ]
  },
  still_waters: {
    id: 'still_waters',
    name: 'Still Waters',
    type: 'skill',
    cost: 0,
    rarity: 'common',
    target: 'none',
    glyph: '🌊',
    effects: [
      { op: 'faith', base: 1, up: 2 }
    ]
  },
  rod_and_staff: {
    id: 'rod_and_staff',
    name: 'Rod and Staff',
    type: 'skill',
    cost: 0,
    rarity: 'common',
    target: 'none',
    glyph: '🎣',
    effects: [
      { op: 'faith', base: 1, up: 2 },
      { op: 'block', base: 2, up: 4 }
    ]
  },
  green_pastures: {
    id: 'green_pastures',
    name: 'Green Pastures',
    type: 'skill',
    cost: 0,
    rarity: 'common',
    target: 'none',
    glyph: '🌿',
    effects: [
      { op: 'faith', base: 1, up: 2 },
      { op: 'heal', base: 1, up: 2 }
    ]
  },
  word_as_lamp: {
    id: 'word_as_lamp',
    name: 'Word as Lamp',
    type: 'skill',
    cost: 0,
    rarity: 'common',
    target: 'none',
    glyph: '📖',
    effects: [
      { op: 'faith', base: 1, up: 2 },
      { op: 'draw', base: 1, up: 2 }
    ]
  },
  pray_without_ceasing: {
    id: 'pray_without_ceasing',
    name: 'Pray Without Ceasing',
    type: 'skill',
    cost: 1,
    rarity: 'uncommon',
    target: 'none',
    glyph: '🙏',
    effects: [
      { op: 'faith', base: 3, up: 5 },
      { op: 'draw', base: 1, up: 2 }
    ]
  },
  golden_censer: {
    id: 'golden_censer',
    name: 'Golden Censer',
    type: 'skill',
    cost: 1,
    rarity: 'uncommon',
    target: 'none',
    glyph: '🕎',
    effects: [
      { op: 'faith', base: 2, up: 4 }
    ]
  },
  four_horsemen: {
    id: 'four_horsemen',
    name: 'Four Horsemen',
    type: 'skill',
    cost: 2,
    rarity: 'rare',
    target: 'none',
    glyph: '🐎',
    effects: [
      { op: 'faith', base: 5, up: 8 },
      { op: 'draw', base: 2, up: 3 }
    ]
  }
};
