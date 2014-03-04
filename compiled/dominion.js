var Dominion = function () {
	"use strict";

	// tbd
	var GameRules = {};

	// still designing
	// todo: use camel case
	var CardRules = {
		add_coins: function () {},
		add_victory: function () {},
		discard_any_cards: function () {},
		replace_discarded_cards: function () {},
		trash_up_to: function () {},
		draw_cards: function () {},
		discard_deck: function () {},
		add_actions: function () {},
		add_buys: function () {},
		bureaucrat: function () {},
		trash_this_card: function () {},
		gain_card_costing_up_to: function () {},
		gardens: function () {},
		other_players_discard_down_to: function () {},
		trash_copper_for_coins: function () {},
		trash_card_for_card_costing_more: function () {},
		spy: function () {},
		thief: function () {},
		chose_card_play_it_twice: function () {},
		other_players_draw_cards: function () {},
		library: function () {},
		mine: function () {},
		other_players_get_curse_card: function () {},
		adventurer: function () {}
	};

	var Cards = (function () {
		return {
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
	}());

	var Board = (function () {
		return {
			player:  null,
			kingdom: {}, // kingdom cards aka available cards
			trashed: {}, // cards that are trashed
			onBoard: {}, // visible cards that are placed on the board

			init: function (gameName) {
				this.reset();

				this.player = Player;
				this.cards  = Cards;

				if (gameName === undefined || gameName === "firstGame") {
					this.pickFirstGameKingdomCards();
				}

				this.pickVictoryAndTreasureCards();

				return this;
			},
			reset: function () {
				this.onBoard = {};
				this.trashed = {};
				this.kingdom = {};
			},
			clear: function () {
				this.onBoard = {};
			},
			pickVictoryAndTreasureCards: function () {
				var infinity = 1.0/0;

				this.kingdom["Estate"]   = 8;
				this.kingdom["Duchy"]    = 8;
				this.kingdom["Province"] = 8;
				this.kingdom["Curse"]    = 10;

				this.kingdom["Copper"] = infinity;
				this.kingdom["Silver"] = infinity;
				this.kingdom["Gold"]   = infinity;

				return this;
			},
			pickFirstGameKingdomCards: function () {
				var firstGameCards = [
					"Cellar", "Market", "Militia", "Mine", "Moat", "Remodel",
					"Smithy", "Village", "Woodcutter", "Workshop"
				];

				for (var i = 0; i < firstGameCards.length; i++) {
					this.kingdom[firstGameCards[i]] = 25;
				}

				return this;
			},
			buy: function (card) {
				if (this.isBuyingPossible(card)) {
					this.player.takeCoins(Cards[card].cost);
					this.player.takeBuyPoints();

					//take the card off the supply unless it's an infinite one - treasure
					return true;
				}

				return false;
			},
			isBuyingPossible: function (card) {
				return this.cards[card].cost <= this.player.coins() && this.player.buys() > 0;
			}
		};
	}());

	var Player = (function () {
		var Hand = {
			reset: function () {
				this.actions = 1;
				this.buys    = 1;
				this.coins   = 0;
				this.cards   = [];
			}
		};

		return {
			hand:         null,
			board:        null, // in conflict with Board.onBoard object
			draw_pile:    [],
			discard_pile: [],

			init: function () {
				this.hand  = Hand;  // one of kind object, global like Window in browsers
				this.board = Board; // one of kind object, global like Window in browsers

				this.firstHand();
				this.board.init();

				return this;
			},
			firstHand: function () {
				this.draw_pile = [
					"Estate",
					"Estate",
					"Estate",
					"Copper",
					"Copper",
					"Copper",
					"Copper",
					"Copper",
					"Copper",
					"Copper"
				];
				this.shuffleDrawPile();

				this.resetHand();
				this.nextHand();
			},
			nextHand: function () {
				for (var i = 0; i < 5; i++) {
					this.drawCard();
				}

				return this;
			},
			endOfTurn: function () {
				this.moveHandToDiscardPile();
				this.resetHand();
				this.nextHand();

				return this;
			},
			shuffleDrawPile: function () {
				var counter = this.draw_pile.length, temp, index;

				while (counter > 0) {
					index    = Math.floor(Math.random() * counter);
					counter -= 1;

					temp = this.draw_pile[counter];

					this.draw_pile[counter] = this.draw_pile[index];
					this.draw_pile[index]   = temp;
				}
			},
			moveDiscardPileToDrawPile: function () {
				this.draw_pile    = this.discard_pile;
				this.discard_pile = [];

				this.shuffleDrawPile(this.draw_pile);
			},
			moveHandToDiscardPile: function () {
				for (var i in this.hand.cards) {
					this.discard_pile.push(this.hand.cards[i]);
				}
			},
			drawPileEmpty: function () {
				return this.draw_pile.length === 0;
			},
			drawCard: function () {
				var card;

				if (this.drawPileEmpty()) {
					this.moveDiscardPileToDrawPile();
				}

				card = this.draw_pile.shift();

				if (card) {
					this.hand.cards.push(card);
				}

				return this;
			},
			playCard: function (card) {
				if (this.hand.cards[card]) {
					this.hand.cards[card].play();
				} else {
					throw "Card cannot be played";
				}

				return this;
			},
			buyCard: function (card) {

			},
			resetHand: function () {
				this.hand.reset();
			},

			// debug
			debug: function () {
				return {
					draw:    this.draw_pile,
					hand:    this.hand.cards,
					discard: this.discard_pile
				};
			}
		};
	}());

	//test
  //Player.init();
  //Player.endOfTurn().nextHand().endOfTurn().nextHand();
  //Player.debug();

	return Player;
};