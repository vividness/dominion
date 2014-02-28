var Cards = (function () {
  "use strict";

  var cards = {
    "Copper": {
      name: "Copper",
      type: "Treasure",
      cost: 0,
      play: function () {
        CardRules.add_coins(1);
      }
    },
    "Silver": {
      name: "Silver",
      type: "Treasure",
      cost: 3,
      play: function () {
        CardRules.add_coins(2);
      }
    },
    "Gold": {
      name: "Gold",
      type: "Treasure",
      cost: 6,
      play: function () {
        CardRules.add_coins(3);
      }
    },
    "Estate": {
      name: "Estate",
      type: "Victory",
      cost: 2,
      end:  function () {
        CardRules.add_victory(1);
      }
    },
    "Duchy": {
      name: "Duchy",
      type: "Victory",
      cost: 5,
      end:  function () {
        CardRules.add_victory(3);
      }
    },
    "Province": {
      name: "Province",
      type: "Victory",
      cost: 8,
      end:  function () {
        CardRules.add_victory(6);
      }
    },
    "Curse": {
      name: "Curse",
      type: "Curse",
      cost: 0,
      end:  function () {
        CardRules.add_victory(-1);
      }
    },
    "Cellar": {
      name: "Cellar",
      type: "Action",
      cost: 2,
      play: function () {
        CardRules.add_actions(1);
        CardRules.discard_any_cards();
        CardRules.replace_discarded_cards();
      }
    },
    "Chapel":  {
      name: "Chapel",
      type: "Action",
      cost: 2,
      play: function () {
        CardRules.trash_up_to(4);
      }
    },
    "Moat": {
      name:   "Moat",
      type:   "Action - Reaction",
      cost:   2,
      immune: true,
      play:   function () {
        CardRules.draw_cards(2);
      }
    },
    "Chancellor": {
      name: "Chancellor",
      type: "Action",
      cost: 3,
      play: function () {
        CardRules.add_coins(2);
        CardRules.discard_deck();
      }
    },
    "Village": {
      name: "Village",
      type: "Action",
      cost: 3,
      play: function () {
        CardRules.draw_cards(1);
        CardRules.add_actions(2);
      }
    },
    "Woodcutter": {
      name: "Woodcutter",
      type: "Action",
      cost: 3,
      play: function () {
        CardRules.add_buys(1);
        CardRules.add_coins(2);
      }
    },
    "Workshop": {
      name: "Workshop",
      type: "Action",
      cost: 3,
      play: function () {
        CardRules.gain_card_costing_up_to(4);
      }
    },
    "Bureaucrat": {
      name: "Bureaucrat",
      type: "Action - Attack",
      cost: 4,
      play: function () {
        CardRules.bureaucrat();
      }
    },
    "Feast": {
      name: "Feast",
      type: "Action",
      cost: 4,
      play: function () {
        CardRules.trash_this_card();
        CardRules.gain_card_costing_up_to(5);
      }
    },
    "Gardens": {
      name: "Gardens",
      type: "Victory",
      cost: 4,
      end:  function () {
        CardRules.gardens();
      }
    },
    "Militia": {
      name: "Militia",
      type: "Action - Attack",
      cost: 4,
      play: function () {
        CardRules.add_coins(2);
        CardRules.other_players_discard_down_to(3);
      }
    },
    "Moneylender": {
      name: "Moneylender",
      type: "Action",
      cost: 4,
      play: function () {
        CardRules.trash_copper_for_coins(3);
      }
    },
    "Remodel": {
      name: "Remodel",
      type: "Action",
      cost: 4,
      play: function () {
        CardRules.trash_card_for_card_costing_more(3);
      }
    },
    "Smithy": {
      name: "Smithy",
      type: "Action",
      cost: 4,
      play: function () {
        CardRules.draw_cards(3);
      }
    },
    "Spy": {
      name: "Spy",
      type: "Action - Attack",
      cost: 4,
      play: function () {
        CardRules.spy();
      }
    },
    "Thief": {
      name: "Thief",
      type: "Action - Attack",
      cost: 4,
      play: function () {
        CardRules.thief();
      }
    },
    "ThroneRoom": {
      name: "ThroneRoom",
      type: "Action",
      cost: 4,
      play: function () {
        CardRules.chose_card_play_it_twice();
      }
    },
    "CouncilRoom": {
      name: "CouncilRoom",
      type: "Action",
      cost: 5,
      play: function () {
        CardRules.draw_cards(4);
        CardRules.buy_points(1);
        CardRules.other_players_draw_cards(1);
      }
    },
    "Festival": {
      name: "Festival",
      type: "Action",
      cost: 5,
      play: function () {
        CardRules.add_actions(2);
        CardRules.add_buys(1);
        CardRules.add_coins(2);
      }
    },
    "Laboratory": {
      name: "Laboratory",
      type: "Action",
      cost: 5,
      play: function () {
        CardRules.draw_cards(2);
        CardRules.add_actions(1);
      }
    },
    "Library": {
      name: "Library",
      type: "Action",
      cost: 5,
      play: function () {
        CardRules.library();
      }
    },
    "Market": {
      name: "Market",
      type: "Action",
      cost: 5,
      play: function () {
        CardRules.draw_cards(1);
        CardRules.add_actions(1);
        CardRules.add_buys(1);
        CardRules.add_coins(1);
      }
    },
    "Mine": {
      name: "Mine",
      type: "Action",
      cost: 5,
      play: function () {
        CardRules.mine();
      }
    },
    "Witch": {
      name: "Witch",
      type: "Action - Attack",
      cost: 5,
      play: function () {
        CardRules.draw_cards(2);
        CardRules.other_players_get_curse_card();
      }
    },
    "Adventurer": {
      name: "Adventurer",
      type: "Action",
      cost: 6,
      play: function () {
        CardRules.adventurer();
      }
    }
  };

  return cards;
}());