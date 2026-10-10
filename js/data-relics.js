window.NP_RELICS = {
  prayer_beads: {
    id: 'prayer-beads',
    name: 'Prayer Beads',
    rarity: 'starter',
    text: 'Gain 5 Faith at the start of combat.',
    icon: '📿',
    hook: 'startingFaith',
    value: 5
  },
  mantle_of_elijah: {
    id: 'mantle-of-elijah',
    name: 'Mantle of Elijah',
    rarity: 'common',
    text: 'Start combat with 2 Strength.',
    icon: '🧥',
    hook: 'combatStartStrength',
    value: 2
  },
  harp_of_david: {
    id: 'harp-of-david',
    name: 'Harp of David',
    rarity: 'common',
    text: 'Gain 1 Energy on turn 1.',
    icon: '🎶',
    hook: 'energyPerTurn',
    value: 1
  },
  crown_of_thorns: {
    id: 'crown-of-thorns',
    name: 'Crown of Thorns',
    rarity: 'uncommon',
    text: 'Reflect 3 damage when hit.',
    icon: '👑',
    hook: 'thorns',
    value: 3
  },
  golden_censer: {
    id: 'golden-censer',
    name: 'Golden Censer',
    rarity: 'uncommon',
    text: 'Gain 2 Faith on kill.',
    icon: '🕯️',
    hook: 'faithOnKill',
    value: 2
  },
  ark_fragment: {
    id: 'ark-fragment',
    name: 'Ark Fragment',
    rarity: 'rare',
    text: 'Gain 1 Faith per turn in combat.',
    icon: '📦',
    hook: 'faithPerTurnCombat',
    value: 1
  },
  moses_staff: {
    id: 'moses-staff',
    name: 'Moses\' Staff',
    rarity: 'rare',
    text: 'Gain 5 Block on turn start.',
    icon: '🏺',
    hook: 'blockOnTurnStart',
    value: 5
  },
  aarons_budded_rod: {
    id: 'aarons-budded-rod',
    name: 'Aaron\'s Budded Rod',
    rarity: 'rare',
    text: 'Gain 1 Strength when hit.',
    icon: '🏺',
    hook: 'strengthOnHurt',
    value: 1
  },
  samuels_horn: {
    id: 'samuels-horn',
    name: 'Samuel\'s Horn',
    rarity: 'rare',
    text: 'Gain 1 Energy per turn.',
    icon: '📯',
    hook: 'energyPerTurn',
    value: 1
  },
  davids_covenant: {
    id: 'davids-covenant',
    name: 'David\'s Covenant',
    rarity: 'rare',
    text: 'Gain 1 Faith per Elite defeated.',
    icon: '📜',
    hook: 'faithOnEliteKill',
    value: 1
  },
  solomons_seal: {
    id: 'solomons-seal',
    name: 'Solomon\'s Seal',
    rarity: 'rare',
    text: 'Gain 1 Faith per card played.',
    icon: '🔑',
    hook: 'faithPerCardPlayed',
    value: 1
  },
  brook_cherith: {
    id: 'brook-cherith',
    name: 'Brook Cherith',
    rarity: 'rare',
    text: 'Gain 1 Faith per turn in combat.',
    icon: '💧',
    hook: 'faithPerTurnCombat',
    value: 1
  },
  war_trumpet: {
    id: 'war-trumpet',
    name: 'War Trumpet',
    rarity: 'boss',
    text: 'Gain 1 Energy per turn. Lose 1 max HP per card reward choice.',
    icon: '📢',
    hook: 'energyPerTurn',
    value: 1,
    hook2: 'maxHpOnCardReward',
    value2: -1
  },
  shofar: {
    id: 'shofar',
    name: 'Shofar',
    rarity: 'boss',
    text: 'Gain 1 Energy per turn. Enemies have 10% more HP.',
    icon: '📢',
    hook: 'energyPerTurn',
    value: 1,
    hook2: 'enemyHpBonus',
    value2: 0.1
  },
  cross_of_christ: {
    id: 'cross-of-christ',
    name: 'Cross of Christ',
    rarity: 'boss',
    text: 'Gain 1 Faith per turn in combat. Enemies have 10% less HP.',
    icon: '✝️',
    hook: 'faithPerTurnCombat',
    value: 1,
    hook2: 'enemyHpBonus',
    value2: -0.1
  },
  book_of_life: {
    id: 'book-of-life',
    name: 'Book of Life',
    rarity: 'boss',
    text: 'Gain 1 Faith per turn in combat. Gain 1 max HP per card reward choice.',
    icon: '📖',
    hook: 'faithPerTurnCombat',
    value: 1,
    hook2: 'maxHpOnCardReward',
    value2: 1
  }
};

window.NP_POTIONS = {
  living_water: {
    id: 'living-water',
    name: 'Living Water',
    text: 'Heal 15 HP.',
    icon: '💧',
    effect: 'heal',
    value: 15
  },
  oil_of_joy: {
    id: 'oil-of-joy',
    name: 'Oil of Joy',
    text: 'Gain 10 Block.',
    icon: '🛢️',
    effect: 'block',
    value: 10
  },
  wine_of_the_covenant: {
    id: 'wine-of-the-covenant',
    name: 'Wine of the Covenant',
    text: 'Gain 3 Strength for 3 turns.',
    icon: '🍷',
    effect: 'strength',
    value: 3,
    turns: 3
  },
  gall: {
    id: 'gall',
    name: 'Gall',
    text: 'Deal 15 damage to a random enemy.',
    icon: '💀',
    effect: 'damage',
    value: 15,
    target: 'random'
  },
  hyssop: {
    id: 'hyssop',
    name: 'Hyssop',
    text: 'Cure all debuffs. Gain 8 Block.',
    icon: '🌿',
    effect: 'cure',
    value: 8
  },
  myrrh: {
    id: 'myrrh',
    name: 'Myrrh',
    text: 'Heal 8 HP. Cure all debuffs.',
    icon: '🧪',
    effect: 'heal',
    value: 8,
    effect2: 'cure'
  },
  spikenard: {
    id: 'spikenard',
    name: 'Spikenard',
    text: 'Gain 30 Faith.',
    icon: '🌸',
    effect: 'faith',
    value: 30
  },
  dew_of_herman: {
    id: 'dew-of-herman',
    name: 'Dew of Herman',
    text: 'Gain 2 Energy.',
    icon: '💧',
    effect: 'energy',
    value: 2
  },
  brimstone: {
    id: 'brimstone',
    name: 'Brimstone',
    text: 'Deal 8 damage to ALL enemies.',
    icon: '🔥',
    effect: 'damage',
    value: 8,
    target: 'all'
  },
  bandage_of_samaritan: {
    id: 'bandage-of-samaritan',
    name: 'Bandage of Samaritan',
    text: 'Heal 10 HP. Gain 5 Block.',
    icon: '🩹',
    effect: 'heal',
    value: 10,
    effect2: 'block',
    value2: 5
  }
};
