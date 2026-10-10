window.NP_EVENTS = {
  good_samaritan: {
    id: 'good_samaritan',
    title: 'The Good Samaritan',
    text: 'You come across a wounded traveler in need of help. Do you help them or continue on your journey?',
    art: 'assets/img/ev_good_samaritan.png',
    choices: [
      {
        label: 'Help the traveler',
        result: (G, api) => {
          api.loseHp(10);
          api.gainRelic('mantle_of_elijah');
          api.resolve('map');
        }
      },
      {
        label: 'Continue on your journey',
        result: (G, api) => {
          api.gainGold(30);
          api.loseMaxHp(1);
          api.resolve('map');
        }
      }
    ]
  },
  rich_young_ruler: {
    id: 'rich_young_ruler',
    title: 'The Rich Young Ruler',
    text: 'A rich young ruler comes to you and asks if he can follow you. Do you accept his offer or refuse?',
    art: 'assets/img/ev_rich_young_ruler.png',
    choices: [
      {
        label: 'Accept his offer',
        result: (G, api) => {
          api.removeCard('strike');
          api.removeCard('strike');
          api.heal(20);
          api.resolve('map');
        }
      },
      {
        label: 'Refuse his offer',
        result: (G, api) => {
          api.addCurse('mammon');
          api.resolve('map');
        }
      }
    ]
  },
  denial_of_peter: {
    id: 'denial_of_peter',
    title: 'Denial of Peter',
    text: 'You are asked to deny your faith. Do you deny or confess?',
    art: 'assets/img/ev_denial_of_peter.png',
    choices: [
      {
        label: 'Deny',
        result: (G, api) => {
          api.addCurse('fear');
          api.resolve('map');
        }
      },
      {
        label: 'Confess',
        result: (G, api) => {
          api.upgradeRandomCard();
          api.resolve('map');
        }
      }
    ]
  },
  doubting_thomas: {
    id: 'doubting_thomas',
    title: 'Doubting Thomas',
    text: 'You are asked to believe in the resurrection of Jesus. Do you doubt or believe?',
    art: 'assets/img/ev_doubting_thomas.png',
    choices: [
      {
        label: 'Doubt',
        result: (G, api) => {
          api.damage(8);
          api.resolve('map');
        }
      },
      {
        label: 'Believe',
        result: (G, api) => {
          api.heal(20);
          api.resolve('map');
        }
      }
    ]
  },
  feeding_five_thousand: {
    id: 'feeding_five_thousand',
    title: 'Feeding the Five Thousand',
    text: 'You have the opportunity to feed the five thousand. Do you share the meal or sell it?',
    art: 'assets/img/ev_feeding_five_thousand.png',
    choices: [
      {
        label: 'Share the meal',
        result: (G, api) => {
          api.heal(30);
          api.addCard('manna');
          api.resolve('map');
        }
      },
      {
        label: 'Sell the meal',
        result: (G, api) => {
          api.gainGold(60);
          api.resolve('map');
        }
      }
    ]
  },
  naboths_vineyard: {
    id: 'naboths_vineyard',
    title: 'Naboth\'s Vineyard',
    text: 'You are given the opportunity to steal Naboth\'s vineyard. Do you steal it or refuse?',
    art: 'assets/img/ev_naboths_vineyard.png',
    choices: [
      {
        label: 'Steal the vineyard',
        result: (G, api) => {
          api.gainRelic('vineyard');
          api.addCurse('guilt');
          api.resolve('map');
        }
      },
      {
        label: 'Refuse the vineyard',
        result: (G, api) => {
          api.gainGold(40);
          api.resolve('map');
        }
      }
    ]
  },
  jonas_call: {
    id: 'jonas_call',
    title: 'Jonah\'s Call',
    text: 'Jonah is called to preach to the people of Nineveh. Do you flee or obey?',
    art: 'assets/img/ev_jonas_call.png',
    choices: [
      {
        label: 'Flee',
        result: (G, api) => {
          api.addCurse('guilt');
          api.gainGold(40);
          api.resolve('map');
        }
      },
      {
        label: 'Obey',
        result: (G, api) => {
          api.loseHp(15);
          api.addCard('rare_card');
          api.resolve('map');
        }
      }
    ]
  },
  job_trial: {
    id: 'job_trial',
    title: 'Job\'s Trial',
    text: 'You are tested by Satan. Do you endure or refuse?',
    art: 'assets/img/ev_job_trial.png',
    choices: [
      {
        label: 'Endure',
        result: (G, api) => {
          api.loseMaxHp(30);
          api.gainRelic('rare_relic');
          api.resolve('map');
        }
      },
      {
        label: 'Refuse',
        result: (G, api) => {
          api.gainGold(25);
          api.resolve('map');
        }
      }
    ]
  },
  binding_of_isaac: {
    id: 'binding_of_isaac',
    title: 'Binding of Isaac',
    text: 'You are asked to sacrifice your firstborn. Do you sacrifice or walk away?',
    art: 'assets/img/ev_binding_of_isaac.png',
    choices: [
      {
        label: 'Sacrifice',
        result: (G, api) => {
          api.removeCard('strike');
          api.gainRelic('mantle_of_elijah');
          api.resolve('map');
        }
      },
      {
        label: 'Walk away',
        result: (G, api) => {
          api.heal(10);
          api.resolve('map');
        }
      }
    ]
  },
  samson_and_delilah: {
    id: 'samson_and_delilah',
    title: 'Samson and Delilah',
    text: 'Delilah offers to cut Samson\'s hair. Do you let her or refuse?',
    art: 'assets/img/ev_samson_and_delilah.png',
    choices: [
      {
        label: 'Let her cut your hair',
        result: (G, api) => {
          api.loseHp(5);
          if (api.hasRelic('samsons_hair')) {
            api.gainRelic('samsons_hair');
          } else {
            api.gainRelic('strength');
          }
          api.resolve('map');
        }
      },
      {
        label: 'Refuse',
        result: (G, api) => {
          api.heal(5);
          api.gainGold(25);
          api.resolve('map');
        }
      }
    ]
  },
  wisdom_of_solomon: {
    id: 'wisdom_of_solomon',
    title: 'Wisdom of Solomon',
    text: 'Solomon offers you wisdom. Do you pay or leave?',
    art: 'assets/img/ev_wisdom_of_solomon.png',
    choices: [
      {
        label: 'Pay',
        result: (G, api) => {
          api.loseGold(50);
          api.upgradeRandomCard();
          api.upgradeRandomCard();
          api.resolve('map');
        }
      },
      {
        label: 'Leave',
        result: (G, api) => {
          api.resolve('map');
        }
      }
    ]
  },
  royal_decree: {
    id: 'royal_decree',
    title: 'Royal Decree',
    text: 'You are given a royal decree. Do you accept or ignore?',
    art: 'assets/img/ev_royal_decree.png',
    choices: [
      {
        label: 'Accept',
        result: (G, api) => {
          api.gainGold(40);
          api.addCurse('guilt');
          api.resolve('map');
        }
      },
      {
        label: 'Ignore',
        result: (G, api) => {
          api.resolve('map');
        }
      }
    ]
  },
  martyrs_crown: {
    id: 'martyrs_crown',
    title: 'Martyrs Crown',
    text: 'You are offered a martyr\'s crown. Do you accept or leave?',
    art: 'assets/img/ev_martyrs_crown.png',
    choices: [
      {
        label: 'Accept',
        result: (G, api) => {
          api.damage(12);
          api.removeAllCurses();
          api.addCard('rare_card');
          api.resolve('map');
        }
      },
      {
        label: 'Leave',
        result: (G, api) => {
          api.resolve('map');
        }
      }
    ]
  },
  bethesda_pool: {
    id: 'bethesda_pool',
    title: 'Bethesda Pool',
    text: 'You are healed at the Bethesda Pool. Do you accept or leave?',
    art: 'assets/img/ev_bethesda_pool.png',
    choices: [
      {
        label: 'Accept',
        result: (G, api) => {
          api.healToFull();
          api.loseStartingRelic();
          api.resolve('map');
        }
      },
      {
        label: 'Leave',
        result: (G, api) => {
          api.resolve('map');
        }
      }
    ]
  }
};

window.NP_CURSES = {
  mammon: {
    id: 'mammon',
    name: 'Mammon',
    cost: 0,
    type: 'curse',
    unplayable: true,
    text: 'You are bound by the love of money. You cannot upgrade cards.',
    curse: true
  },
  guilt: {
    id: 'guilt',
    name: 'Guilt',
    cost: 0,
    type: 'curse',
    unplayable: true,
    text: 'You feel guilty for your actions. You cannot gain gold.',
    curse: true
  },
  fear: {
    id: 'fear',
    name: 'Fear',
    cost: 0,
    type: 'curse',
    unplayable: true,
    text: 'You are filled with fear. You cannot play attack cards.',
    curse: true
  },
  plague: {
    id: 'plague',
    name: 'Plague',
    cost: 0,
    type: 'curse',
    unplayable: true,
    text: 'You are afflicted with a plague. You take damage each turn.',
    curse: true
  }
};
