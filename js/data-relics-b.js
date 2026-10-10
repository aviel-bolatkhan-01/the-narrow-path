Object.assign(window.NP_RELICS, {
  ravens_provision: {
    id: 'ravens-provision',
    name: 'Raven\'s Provision',
    rarity: 'common',
    text: 'Gain 3 Gold at the start of each combat.',
    icon: '🐦',
    hook: 'goldOnVictory',
    value: 3
  },
  daniels_portion: {
    id: 'daniels-portion',
    name: 'Daniel\'s Portion',
    rarity: 'uncommon',
    text: 'Gain 5 Block at the start of each combat.',
    icon: '📜',
    hook: 'combatStartBlock',
    value: 5
  },
  pauls_shipwreck: {
    id: 'pauls-shipwreck',
    name: 'Paul\'s Shipwreck',
    rarity: 'rare',
    text: 'Gain 1 additional Energy each turn.',
    icon: '⚓',
    hook: 'energyPerTurn',
    value: 1
  },
  angels_host: {
    id: 'angels-host',
    name: 'Angels\' Host',
    rarity: 'common',
    text: 'Gain 1 Faith on killing an enemy.',
    icon: '👼',
    hook: 'faithOnKill',
    value: 1
  },
  scrolls_of_truth: {
    id: 'scrolls-of-truth',
    name: 'Scrolls of Truth',
    rarity: 'uncommon',
    text: 'Gain 1 additional card reward each combat.',
    icon: '📜',
    hook: 'cardRewardPlus',
    value: 1
  },
  tears_bottle: {
    id: 'tears-bottle',
    name: 'Tears Bottle',
    rarity: 'rare',
    text: 'Gain 1 additional potion slot.',
    icon: '💧',
    hook: 'potionBonus',
    value: 1
  },
  jasper_stone: {
    id: 'jasper-stone',
    name: 'Jasper Stone',
    rarity: 'common',
    text: 'Draw 1 additional card at the start of each turn.',
    icon: '💎',
    hook: 'drawTurn1',
    value: 1
  },
  ewers_of_worship: {
    id: 'ewers-of-worship',
    name: 'Ewers of Worship',
    rarity: 'uncommon',
    text: 'Gain 3 Block at the start of each turn.',
    icon: '🏺',
    hook: 'blockOnTurnStart',
    value: 3
  },
  morning_star: {
    id: 'morning-star',
    name: 'Morning Star',
    rarity: 'rare',
    text: 'Gain 1 Strength when you lose HP.',
    icon: '⭐',
    hook: 'strengthOnHurt',
    value: 1
  },
  hidden_manna: {
    id: 'hidden-manna',
    name: 'Hidden Manna',
    rarity: 'common',
    text: 'Gain 5 Faith at the start of each combat.',
    icon: '🌾',
    hook: 'startingFaith',
    value: 5
  },
  seven_lampstands: {
    id: 'seven-lampstands',
    name: 'Seven Lampstands',
    rarity: 'uncommon',
    text: 'Gain 10% more Gold from enemies.',
    icon: '🕯️',
    hook: 'goldOnVictory',
    value: 10
  },
  table_before_me: {
    id: 'table-before-me',
    name: 'Table Before Me',
    rarity: 'rare',
    text: 'Gain 1 additional Max HP when you pick up a relic.',
    icon: '🍽️',
    hook: 'maxHpOnPickup',
    value: 1
  },
  rods_of_judgment: {
    id: 'rods-of-judgment',
    name: 'Rods of Judgment',
    rarity: 'common',
    text: 'Gain 1 additional Miracle card reward each combat.',
    icon: '⚡',
    hook: 'miracleDiscount',
    value: 1
  },
  seal_of_god: {
    id: 'seal-of-god',
    name: 'Seal of God',
    rarity: 'uncommon',
    text: 'Gain 1 Faith per turn during combat.',
    icon: '🔒',
    hook: 'faithPerTurnCombat',
    value: 1
  },
  vineyard: {id: 'vineyard', name: "Naboth's Vineyard", rarity: 'common', text: 'Gain 20 gold on combat victory.', icon: '🍇', hook: 'goldOnVictory', value: 20},
  samsons_hair: {id: 'samsons_hair', name: "Samson's Locks", rarity: 'rare', text: 'Start each combat with 3 Strength.', icon: '✂️', hook: 'combatStartStrength', value: 3}
});