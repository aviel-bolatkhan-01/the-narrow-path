window.NP_ENEMIES = {
  // Act I
  tempter: {
    id: 'tempter',
    name: 'Tempter',
    hp: [18, 22],
    tier: 'normal',
    art: 'assets/img/en_tempter.png',
    moves: [
      { name: 'Temptation', kind: 'attack', value: 6, weight: 0.6 },
      { name: 'Whisper', kind: 'debuff', effect: 'vulnerable', times: 1, weight: 0.3 },
      { name: 'Seduce', kind: 'attack', value: 9, weight: 0.1 }
    ],
    ai: 'random'
  },
  whisperer: {
    id: 'whisperer',
    name: 'Whisperer',
    hp: [14, 18],
    tier: 'normal',
    art: 'assets/img/en_whisperer.png',
    moves: [
      { name: 'Whisper', kind: 'debuff', effect: 'weak', times: 1, weight: 0.5 },
      { name: 'Echo', kind: 'attack', value: 5, weight: 0.3 },
      { name: 'Scream', kind: 'attack', value: 8, weight: 0.2 }
    ],
    ai: 'random'
  },
  horned_imp: {
    id: 'horned_imp',
    name: 'Horned Imp',
    hp: [16, 20],
    tier: 'normal',
    art: 'assets/img/en_horned_imp.png',
    moves: [
      { name: 'Ram', kind: 'attack', value: 7, weight: 0.4 },
      { name: 'Horn Strike', kind: 'attack', value: 10, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 8, weight: 0.3 }
    ],
    ai: 'random'
  },
  grave_robber: {
    id: 'grave_robber',
    name: 'Grave Robber',
    hp: [24, 28],
    tier: 'normal',
    art: 'assets/img/en_grave_robber.png',
    moves: [
      { name: 'Steal', kind: 'attack', value: 8, weight: 0.4 },
      { name: 'Plunder', kind: 'attack', value: 12, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 10, weight: 0.3 }
    ],
    ai: 'random'
  },
  pharisee: {
    id: 'pharisee',
    name: 'Pharisee',
    hp: [26, 30],
    tier: 'normal',
    art: 'assets/img/en_pharisee.png',
    moves: [
      { name: 'Criticize', kind: 'debuff', effect: 'weak', times: 1, weight: 0.4 },
      { name: 'Condemn', kind: 'attack', value: 10, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 12, weight: 0.3 }
    ],
    ai: 'random'
  },
  zealot: {
    id: 'zealot',
    name: 'Zealot',
    hp: [30, 34],
    tier: 'normal',
    art: 'assets/img/en_zealot.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 12, weight: 0.4 },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 1, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 14, weight: 0.3 }
    ],
    ai: 'random'
  },
  wild_beast: {
    id: 'wild_beast',
    name: 'Wild Beast',
    hp: [22, 26],
    tier: 'normal',
    art: 'assets/img/en_wild_beast.png',
    moves: [
      { name: 'Bite', kind: 'attack', value: 9, weight: 0.4 },
      { name: 'Claw', kind: 'attack', value: 11, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 10, weight: 0.3 }
    ],
    ai: 'random'
  },
  money_changer: {
    id: 'money_changer',
    name: 'Money Changer',
    hp: [20, 24],
    tier: 'normal',
    art: 'assets/img/en_money_changer.png',
    moves: [
      { name: 'Exploit', kind: 'attack', value: 7, weight: 0.4 },
      { name: 'Swindle', kind: 'attack', value: 10, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 8, weight: 0.3 }
    ],
    ai: 'random'
  },
  legion_sergeant: {
    id: 'legion_sergeant',
    name: 'Legion Sergeant',
    hp: [55, 60],
    tier: 'elite',
    art: 'assets/img/en_legion_sergeant.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 14, weight: 0.3, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 2, weight: 0.2 },
      { name: 'Defend', kind: 'defend', block: 16, weight: 0.3 },
      { name: 'Heavy Strike', kind: 'attack', value: 20, weight: 0.2, telegraph: true }
    ],
    ai: 'random'
  },
  abaddons_hound: {
    id: 'abaddons_hound',
    name: "Abaddon's Hound",
    hp: [50, 55],
    tier: 'elite',
    art: 'assets/img/en_abaddons_hound.png',
    moves: [
      { name: 'Bite', kind: 'attack', value: 12, weight: 0.3 },
      { name: 'Claw', kind: 'attack', value: 15, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 14, weight: 0.3 },
      { name: 'Furious Bite', kind: 'attack', value: 18, weight: 0.2, telegraph: true }
    ],
    ai: 'random'
  },
  goliath: {
    id: 'goliath',
    name: 'Goliath',
    hp: [100, 110],
    tier: 'boss',
    art: 'assets/img/en_goliath.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 18, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 20, weight: 0.2 },
      { name: 'Power Strike', kind: 'attack', value: 25, weight: 0.1, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 3, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 12, times: 3, weight: 0.3 }
    ],
    ai: 'pattern'
  },

  // Act II
  shadow_of_doubt: {
    id: 'shadow_of_doubt',
    name: 'Shadow of Doubt',
    hp: [34, 40],
    tier: 'normal',
    art: 'assets/img/en_shadow_of_doubt.png',
    moves: [
      { name: 'Doubt', kind: 'debuff', effect: 'weak', times: 2, weight: 0.3 },
      { name: 'Shadow Strike', kind: 'attack', value: 10, weight: 0.4 },
      { name: 'Defend', kind: 'defend', block: 12, weight: 0.3 }
    ],
    ai: 'random'
  },
  famine_spirit: {
    id: 'famine_spirit',
    name: 'Famine Spirit',
    hp: [40, 46],
    tier: 'normal',
    art: 'assets/img/en_famine_spirit.png',
    moves: [
      { name: 'Hunger', kind: 'debuff', effect: 'vulnerable', times: 1, weight: 0.3 },
      { name: 'Starve', kind: 'attack', value: 12, weight: 0.4 },
      { name: 'Defend', kind: 'defend', block: 14, weight: 0.3 }
    ],
    ai: 'random'
  },
  siren_of_babylon: {
    id: 'siren_of_babylon',
    name: 'Siren of Babylon',
    hp: [38, 44],
    tier: 'normal',
    art: 'assets/img/en_siren_of_babylon.png',
    moves: [
      { name: 'Seduce', kind: 'debuff', effect: 'weak', times: 1, weight: 0.3 },
      { name: 'Sing', kind: 'attack', value: 10, weight: 0.4 },
      { name: 'Defend', kind: 'defend', block: 12, weight: 0.3 }
    ],
    ai: 'random'
  },
  iron_host: {
    id: 'iron_host',
    name: 'Iron Host',
    hp: [46, 52],
    tier: 'normal',
    art: 'assets/img/en_iron_host.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 14, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 16, weight: 0.3 },
      { name: 'Power Strike', kind: 'attack', value: 18, weight: 0.2, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 1, weight: 0.2 }
    ],
    ai: 'random'
  },
  wasteland_stalker: {
    id: 'wasteland_stalker',
    name: 'Wasteland Stalker',
    hp: [42, 48],
    tier: 'normal',
    art: 'assets/img/en_wasteland_stalker.png',
    moves: [
      { name: 'Stalk', kind: 'attack', value: 12, weight: 0.3 },
      { name: 'Ambush', kind: 'attack', value: 16, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 14, weight: 0.3 },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 1, weight: 0.2 }
    ],
    ai: 'random'
  },
  baal_priest: {
    id: 'baal_priest',
    name: 'Baal Priest',
    hp: [44, 50],
    tier: 'normal',
    art: 'assets/img/en_baal_priest.png',
    moves: [
      { name: 'Curse', kind: 'debuff', effect: 'vulnerable', times: 1, weight: 0.3 },
      { name: 'Bless', kind: 'buff', effect: 'strength', times: 1, weight: 0.2 },
      { name: 'Strike', kind: 'attack', value: 12, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 14, weight: 0.2 }
    ],
    ai: 'random'
  },
  valley_shade: {
    id: 'valley_shade',
    name: 'Valley Shade',
    hp: [36, 40],
    tier: 'normal',
    art: 'assets/img/en_valley_shade.png',
    moves: [
      { name: 'Shadow Strike', kind: 'attack', value: 10, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 12, weight: 0.3 },
      { name: 'Plague', kind: 'debuff', effect: 'plague', times: 3, weight: 0.2 },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 1, weight: 0.2 }
    ],
    ai: 'random'
  },
  jezebels_guard: {
    id: 'jezebels_guard',
    name: "Jezebel's Guard",
    hp: [85, 95],
    tier: 'elite',
    art: 'assets/img/en_jezebels_guard.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 18, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 20, weight: 0.2 },
      { name: 'Power Strike', kind: 'attack', value: 24, weight: 0.1, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 2, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 14, times: 2, weight: 0.3 }
    ],
    ai: 'pattern'
  },
  moloch_colossus: {
    id: 'moloch_colossus',
    name: 'Moloch Colossus',
    hp: [90, 100],
    tier: 'elite',
    art: 'assets/img/en_moloch_colossus.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 20, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 22, weight: 0.2 },
      { name: 'Power Strike', kind: 'attack', value: 28, weight: 0.1, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 3, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 16, times: 3, weight: 0.3 }
    ],
    ai: 'pattern'
  },
  the_beast: {
    id: 'the_beast',
    name: 'The Beast',
    hp: [150, 165],
    tier: 'boss',
    art: 'assets/img/en_the_beast.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 22, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 24, weight: 0.2 },
      { name: 'Power Strike', kind: 'attack', value: 30, weight: 0.1, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 4, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 18, times: 4, weight: 0.3 }
    ],
    ai: 'pattern'
  },

  // Act III
  void_walker: {
    id: 'void_walker',
    name: 'Void Walker',
    hp: [55, 60],
    tier: 'normal',
    art: 'assets/img/en_void_walker.png',
    moves: [
      { name: 'Void Strike', kind: 'attack', value: 16, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 18, weight: 0.3 },
      { name: 'Plague', kind: 'debuff', effect: 'plague', times: 4, weight: 0.2 },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 2, weight: 0.2 }
    ],
    ai: 'random'
  },
  throne_guard: {
    id: 'throne_guard',
    name: 'Throne Guard',
    hp: [65, 72],
    tier: 'normal',
    art: 'assets/img/en_throne_guard.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 18, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 20, weight: 0.2 },
      { name: 'Power Strike', kind: 'attack', value: 22, weight: 0.1, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 2, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 14, times: 2, weight: 0.3 }
    ],
    ai: 'pattern'
  },
  locust_of_abyss: {
    id: 'locust_of_abyss',
    name: 'Locust of Abyss',
    hp: [50, 56],
    tier: 'normal',
    art: 'assets/img/en_locust_of_abyss.png',
    moves: [
      { name: 'Swarm', kind: 'attack', value: 12, times: 3, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 14, weight: 0.3 },
      { name: 'Plague', kind: 'debuff', effect: 'plague', times: 3, weight: 0.2 },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 1, weight: 0.2 }
    ],
    ai: 'random'
  },
  false_prophet: {
    id: 'false_prophet',
    name: 'False Prophet',
    hp: [60, 68],
    tier: 'normal',
    art: 'assets/img/en_false_prophet.png',
    moves: [
      { name: 'Deceive', kind: 'debuff', effect: 'weak', times: 2, weight: 0.3 },
      { name: 'Strike', kind: 'attack', value: 16, weight: 0.3 },
      { name: 'Defend', kind: 'defend', block: 18, weight: 0.2 },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 1, weight: 0.2 }
    ],
    ai: 'random'
  },
  bottomless_pit_fiend: {
    id: 'bottomless_pit_fiend',
    name: 'Bottomless Pit Fiend',
    hp: [70, 78],
    tier: 'normal',
    art: 'assets/img/en_bottomless_pit_fiend.png',
    moves: [
      { name: 'Pit Strike', kind: 'attack', value: 20, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 22, weight: 0.2 },
      { name: 'Plague', kind: 'debuff', effect: 'plague', times: 5, weight: 0.2 },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 2, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 12, times: 2, weight: 0.2 }
    ],
    ai: 'pattern'
  },
  pale_rider: {
    id: 'pale_rider',
    name: 'Pale Rider',
    hp: [72, 80],
    tier: 'normal',
    art: 'assets/img/en_pale_rider.png',
    moves: [
      { name: 'Ride', kind: 'attack', value: 22, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 24, weight: 0.2 },
      { name: 'Plague', kind: 'debuff', effect: 'plague', times: 4, weight: 0.2 },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 2, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 14, times: 2, weight: 0.2 }
    ],
    ai: 'pattern'
  },
  nephilim: {
    id: 'nephilim',
    name: 'Nephilim',
    hp: [120, 135],
    tier: 'elite',
    art: 'assets/img/en_nephilim.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 26, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 28, weight: 0.2 },
      { name: 'Power Strike', kind: 'attack', value: 34, weight: 0.1, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 4, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 20, times: 3, weight: 0.3 }
    ],
    ai: 'pattern'
  },
  apollyon: {
    id: 'apollyon',
    name: 'Apollyon',
    hp: [130, 145],
    tier: 'elite',
    art: 'assets/img/en_apollyon.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 28, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 30, weight: 0.2 },
      { name: 'Power Strike', kind: 'attack', value: 36, weight: 0.1, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 4, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 22, times: 3, weight: 0.3 }
    ],
    ai: 'pattern'
  },
  the_dragon: {
    id: 'the_dragon',
    name: 'The Dragon',
    hp: [220, 240],
    tier: 'boss',
    art: 'assets/img/en_the_dragon.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 30, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 32, weight: 0.2 },
      { name: 'Power Strike', kind: 'attack', value: 40, weight: 0.1, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 5, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 24, times: 4, weight: 0.3 }
    ],
    ai: 'pattern'
  },

  // Final
  death_and_hades: {
    id: 'death_and_hades',
    name: 'Death and Hades',
    hp: [280, 300],
    tier: 'boss',
    art: 'assets/img/en_death_and_hades.png',
    moves: [
      { name: 'Strike', kind: 'attack', value: 32, weight: 0.2, telegraph: true },
      { name: 'Defend', kind: 'defend', block: 34, weight: 0.2 },
      { name: 'Power Strike', kind: 'attack', value: 44, weight: 0.1, telegraph: true },
      { name: 'Rally', kind: 'buff', effect: 'strength', times: 6, weight: 0.2 },
      { name: 'Whirlwind', kind: 'attack', value: 26, times: 5, weight: 0.3 }
    ],
    ai: 'pattern',
    final: true
  }
};
