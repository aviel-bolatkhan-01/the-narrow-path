Object.assign(window.NP_CARDS, {
  divine_healing: {
    id: 'divine_healing',
    name: 'Divine Healing',
    type: 'attack',
    cost: 1,
    rarity: 'common',
    target: 'enemy',
    glyph: '✝',
    effects: [
      { op: 'damage', base: 5, up: 8 },
      { op: 'heal', base: 3, up: 5 }
    ]
  },
  flaming_sword: {
    id: 'flaming_sword',
    name: 'Flaming Sword',
    type: 'attack',
    cost: 1,
    rarity: 'common',
    target: 'enemy',
    glyph: '🔥',
    effects: [
      { op: 'damage', base: 6, up: 9 },
      { op: 'plague', base: 1, up: 2 }
    ]
  },
  judgment_day: {
    id: 'judgment_day',
    name: 'Judgment Day',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'all',
    glyph: '⚔',
    effects: [
      { op: 'damage', base: 11, up: 15 }
    ]
  },
  divine_wrath: {
    id: 'divine_wrath',
    name: 'Divine Wrath',
    type: 'attack',
    cost: 1,
    rarity: 'common',
    target: 'enemy',
    glyph: '💥',
    effects: [
      { op: 'damage', base: 6, up: 9 },
      { op: 'vulnerable', base: 1, up: 2 }
    ]
  },
  holy_lance: {
    id: 'holy_lance',
    name: 'Holy Lance',
    type: 'attack',
    cost: 1,
    rarity: 'common',
    target: 'enemy',
    glyph: '⚡',
    effects: [
      { op: 'damage', base: 6, up: 9 },
      { op: 'block', base: 3, up: 5 }
    ]
  },
  sword_of_justice: {
    id: 'sword_of_justice',
    name: 'Sword of Justice',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '⚖',
    effects: [
      { op: 'damage', base: 10, up: 14 },
      { op: 'vulnerable', base: 1, up: 2 }
    ]
  },
  celestial_strike: {
    id: 'celestial_strike',
    name: 'Celestial Strike',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '✨',
    effects: [
      { op: 'damage', base: 10, up: 14 },
      { op: 'faith', base: 2, up: 4 }
    ]
  },
  rain_of_fire: {
    id: 'rain_of_fire',
    name: 'Rain of Fire',
    type: 'attack',
    cost: 3,
    rarity: 'rare',
    target: 'all',
    glyph: '🌪',
    effects: [
      { op: 'damage', base: 13, up: 18 },
      { op: 'plague', base: 2, up: 3 }
    ]
  },
  divine_judgment: {
    id: 'divine_judgment',
    name: 'Divine Judgment',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🌟',
    effects: [
      { op: 'damage', base: 11, up: 15 },
      { op: 'weak', base: 1, up: 2 }
    ]
  },
  heavenly_blade: {
    id: 'heavenly_blade',
    name: 'Heavenly Blade',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '⚔',
    effects: [
      { op: 'damage', base: 11, up: 15 }
    ]
  },
  sacred_spear: {
    id: 'sacred_spear',
    name: 'Sacred Spear',
    type: 'attack',
    cost: 1,
    rarity: 'common',
    target: 'enemy',
    glyph: '⚔',
    effects: [
      { op: 'damage', base: 6, up: 9 },
      { op: 'draw', base: 1, up: 2 }
    ]
  },
  angelic_slash: {
    id: 'angelic_slash',
    name: 'Angelic Slash',
    type: 'attack',
    cost: 1,
    rarity: 'common',
    target: 'enemy',
    glyph: '✨',
    effects: [
      { op: 'damage', base: 5, up: 8 },
      { op: 'faith', base: 1, up: 2 }
    ]
  },
  divine_punishment: {
    id: 'divine_punishment',
    name: 'Divine Punishment',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '💥',
    effects: [
      { op: 'damage', base: 10, up: 14 },
      { op: 'vulnerable', base: 2, up: 3 }
    ]
  },
  holy_avenger: {
    id: 'holy_avenger',
    name: 'Holy Avenger',
    type: 'attack',
    cost: 3,
    rarity: 'rare',
    target: 'enemy',
    glyph: '⚔',
    effects: [
      { op: 'damage', base: 18, up: 24 },
      { op: 'block', base: 5, up: 8 }
    ]
  },
  celestial_hammer: {
    id: 'celestial_hammer',
    name: 'Celestial Hammer',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🔨',
    effects: [
      { op: 'damage', base: 5, up: 7, times: 2 },
      { op: 'block', base: 4, up: 6 }
    ]
  },
  heavenly_guard: {
    id: 'heavenly_guard',
    name: 'Heavenly Guard',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🛡',
    effects: [
      { op: 'damage', base: 9, up: 13 },
      { op: 'block', base: 6, up: 9 }
    ]
  },
  angelic_barrier: {
    id: 'angelic_barrier',
    name: 'Angelic Barrier',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '🛡',
    effects: [
      { op: 'damage', base: 8, up: 12 },
      { op: 'block', base: 8, up: 11 }
    ]
  },
  celestial_restoration: {
    id: 'celestial_restoration',
    name: 'Celestial Restoration',
    type: 'attack',
    cost: 2,
    rarity: 'uncommon',
    target: 'enemy',
    glyph: '✨',
    effects: [
      { op: 'damage', base: 9, up: 13 },
      { op: 'heal', base: 5, up: 8 }
    ]
  }
});
