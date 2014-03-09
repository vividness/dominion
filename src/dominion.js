var Dominion = (function () {
  "use strict";

  var Cards = (function () {
    /**
     * IMPORTANT
     *
     * `play will be called with
     * `apply` against the Player object
     */
    var Cards =  {
      "Copper": {
        name: "Copper",
        type: "Treasure",
        cost: 0,
        play: function () {
          this.addCoins(1);
        }
      },
      "Silver": {
        name: "Silver",
        type: "Treasure",
        cost: 3,
        play: function () {
          this.addCoins(2);
        }
      },
      "Gold": {
        name: "Gold",
        type: "Treasure",
        cost: 6,
        play: function () {
          this.addCoins(3);
        }
      },
      "Estate": {
        name: "Estate",
        type: "Victory",
        cost: 2
      },
      "Duchy": {
        name: "Duchy",
        type: "Victory",
        cost: 5
      },
      "Province": {
        name: "Province",
        type: "Victory",
        cost: 8
      },
      "Curse": {
        name: "Curse",
        type: "Curse",
        cost: 0
      },
      "Cellar": {
        name: "Cellar",
        type: "Action",
        cost: 2,
        play: function () {
          this.addActions(1);
          this.discardAnyCardsAndReplace();
        }
      },
      "Chapel":  {
        name: "Chapel",
        type: "Action",
        cost: 2,
        play: function () {
          this.trash_up_to(4);
        }
      },
      "Moat": {
        name:   "Moat",
        type:   "Action - Reaction",
        cost:   2,
        immune: true,
        play:   function () {
          this.drawCard();
          this.drawCard();
        }
      },
      "Chancellor": {
        name: "Chancellor",
        type: "Action",
        cost: 3,
        play: function () {
          this.addCoins(2);
          this.discard_deck();
        }
      },
      "Village": {
        name: "Village",
        type: "Action",
        cost: 3,
        play: function () {
          this.drawcard();
          this.addActions(2);
        }
      },
      "Woodcutter": {
        name: "Woodcutter",
        type: "Action",
        cost: 3,
        play: function () {
          this.addBuys(1);
          this.addCoins(2);
        }
      },
      "Workshop": {
        name: "Workshop",
        type: "Action",
        cost: 3,
        play: function () {
          this.gain_card_costing_up_to(4);
        }
      },
      "Bureaucrat": {
        name: "Bureaucrat",
        type: "Action - Attack",
        cost: 4,
        play: function () {
          this.bureaucrat();
        }
      },
      "Feast": {
        name: "Feast",
        type: "Action",
        cost: 4,
        play: function () {
          this.trash_this_card();
          this.gain_card_costing_up_to(5);
        }
      },
      "Gardens": {
        name: "Gardens",
        type: "Victory",
        cost: 4
      },
      "Militia": {
        name: "Militia",
        type: "Action - Attack",
        cost: 4,
        play: function () {
          this.addCoins(2);
          this.other_players_discard_down_to(3);
        }
      },
      "Moneylender": {
        name: "Moneylender",
        type: "Action",
        cost: 4,
        play: function () {
          this.trash_copper_for_coins(3);
        }
      },
      "Remodel": {
        name: "Remodel",
        type: "Action",
        cost: 4,
        play: function () {
          this.trash_card_for_card_costing_more(3);
        }
      },
      "Smithy": {
        name: "Smithy",
        type: "Action",
        cost: 4,
        play: function () {
          this.drawCard();
          this.drawCard();
          this.drawCard();
        }
      },
      "Spy": {
        name: "Spy",
        type: "Action - Attack",
        cost: 4,
        play: function () {
          this.spy();
        }
      },
      "Thief": {
        name: "Thief",
        type: "Action - Attack",
        cost: 4,
        play: function () {
          this.thief();
        }
      },
      "ThroneRoom": {
        name: "ThroneRoom",
        type: "Action",
        cost: 4,
        play: function () {
          this.chose_card_play_it_twice();
        }
      },
      "CouncilRoom": {
        name: "CouncilRoom",
        type: "Action",
        cost: 5,
        play: function () {
          this.drawCards();
          this.drawCards();
          this.drawCards();
          this.drawCards();
          this.addBuys(1);
          // this.other_players_draw_cards(1);
        }
      },
      "Festival": {
        name: "Festival",
        type: "Action",
        cost: 5,
        play: function () {
          this.addActions(2);
          this.addBuys(1);
          this.addCoins(2);
        }
      },
      "Laboratory": {
        name: "Laboratory",
        type: "Action",
        cost: 5,
        play: function () {
          this.drawCard();
          this.drawCard();
          this.addActions(1);
        }
      },
      "Library": {
        name: "Library",
        type: "Action",
        cost: 5,
        play: function () {
          //this.library();
        }
      },
      "Market": {
        name: "Market",
        type: "Action",
        cost: 5,
        play: function () {
          this.drawCard();
          this.addActions(1);
          this.addBuys(1);
          this.addCoins(1);
        }
      },
      "Mine": {
        name: "Mine",
        type: "Action",
        cost: 5,
        play: function () {
          //this.mine();
        }
      },
      "Witch": {
        name: "Witch",
        type: "Action - Attack",
        cost: 5,
        play: function () {
          this.drawCard();
          this.drawCard();
          //this.other_players_get_curse_card();
        }
      },
      "Adventurer": {
        name: "Adventurer",
        type: "Action",
        cost: 6,
        play: function () {
          //this.adventurer();
        }
      }
    };

    return Cards;
  }());

  // TODO: Rename board to Table
  var Board = (function () {
    var Board =  {
      kingdom: {}, // kingdom cards aka available cards
      trashed: [], // cards that are trashed
      onBoard: [], // visible cards that are placed on the board

      init: function (gamePreset) {
        this.reset();

        if (gamePreset === undefined || gamePreset === "firstGame") {
          this.pickFirstGameKingdomCards();
        }

        this.pickVictoryAndTreasureCards();

        return this;
      },
      reset: function () {
        this.onBoard = [];
        this.trashed = [];
        this.kingdom = {};
      },
      clear: function () {
        this.onBoard = [];
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
      },
      pickFirstGameKingdomCards: function () {
        var firstGameCards = [
          "Cellar", "Market", "Militia", "Mine", "Moat", "Remodel",
          "Smithy", "Village", "Woodcutter", "Workshop"
        ];

        for (var i = 0; i < firstGameCards.length; i++) {
          this.kingdom[firstGameCards[i]] = 25;
        }
      }
    };

    return Board;
  }());

  var Player = (function () {
    var Player = {
      phase:       null, // can be action phase, buy phase
      drawPile:    [],
      discardPile: [],
      hand:        [],
      actions:     1,
      buys:        1,
      coins:       0,

      /**
       *  Initializers and resetters
       */
      init: function () {
        this.dealInitialHand();

        return this;
      },
      clearHand: function () {
        this.actions = 1;
        this.buys    = 1;
        this.coins   = 0;
        this.hand    = [];
      },
      clearBoard: function () {
        Board.clear();
      },
      dealInitialHand: function () {
        this.drawPile = [
          "Estate", "Estate", "Estate", "Copper", "Copper",
          "Copper", "Copper", "Copper", "Copper", "Copper"
        ];

        this.shuffleDrawPile();
        this.clearHand();
        this.drawNextHand();
      },

      /**
       *  Turn interactions
       */
      drawNextHand: function () {
        for (var i = 0; i < 5; i++) {
          this.drawCard();
        }
      },
      endOfTurn: function () {
        this.moveCardsToDiscardPile();
        this.drawNextHand();
      },
      shuffleDrawPile: function () {
        var counter = this.drawPile.length,
            temp,
            index;

        while (counter > 0) {
          index    = Math.floor(Math.random() * counter);
          counter -= 1;

          temp = this.drawPile[counter];

          this.drawPile[counter] = this.drawPile[index];
          this.drawPile[index]   = temp;
        }
      },
      moveDiscardPileToDrawPile: function () {
        this.drawPile    = this.discardPile;
        this.discardPile = [];

        this.shuffleDrawPile();
      },
      moveCardsToDiscardPile: function () {
        for (var i = 0; i < this.hand.length; i++) {
          this.discardPile.push(this.hand[i]);
        }

        this.clearHand();

        for (var i = 0; i < Board.onBoard.length; i++) {
          this.discardPile.push(Board.onBoard[i]);
        }

        this.clearBoard();
      },
      isDrawPileEmpty: function () {
        return this.drawPile.length === 0;
      },
      moveCardFromHandToBoard: function (cardIndex) {
        Board.onBoard.push(this.hand.splice(cardIndex, 1).pop());
      },
      moveCardFromHandToDiscardPile: function (cardIndex) {
        this.discardPile.push(this.hand.splice(cardIndex, 1).pop());
      },
      drawCard: function () {
        if (this.isDrawPileEmpty()) {
          this.moveDiscardPileToDrawPile();
        }

        var card = this.drawPile.shift();
        if (card) {
          this.hand.push(card);
        }
      },
      discardCard: function (card) {
        var cardIndex = this.hand.indexOf(card);

        if (cardIndex !== -1) {
          this.moveCardFromHandToDiscardPile(cardIndex);
        } else {
          throw card + " card cannot be discarded as it's not part of your hand";
        }
      },
      playCard: function (card) {
        // could be extracted to Player.holdsCard(card)
        var cardIndex = this.hand.indexOf(card);

        if (cardIndex !== -1) {
          this.moveCardFromHandToBoard(cardIndex);
          if (Cards[card].play) {
            Cards[card].play.apply(this);
          }
        } else {
          throw card + " card cannot be played as it's not part of your hand";
        }
      },
      buyCard: function (card) {
        if (this.buys < 1) {
          throw "Not enough buy points";
        }

        if (this.coins < Cards[card].cost) {
          throw "Not enough treasure points"
        }

        if (Board.kingdom[card] <= 0) {
          throw "Card out of supply"
        }

        this.buys           -= 1;
        this.coins          -= Cards[card].cost;
        Board.kingdom[card] -= 1;

        this.discardPile.push(card);
      },

      /**
       * Card interactions
       */
      addCoins: function (n) {
        this.coins += n;
      },
      addActions: function (n) {
        this.actions += n;
      },
      addBuys: function (n) {
        this.buys += n;
      },
      discardAnyCardsAndReplace: function () {
        var player = this;
        return function (cards) {
          if (!(cards instanceof Array)) {
            throw "Invalid list of cards";
          }

          for (var i = 0; i < cards.length; i++) {
            player.discardCard(cards[i]);
            player.drawCard();
          }
        };
      },

      /**
       * End game interactions
       */
      countVictoryPoints: function () {},

      /* Debug helpers */
      debug: function () {
        return {
          handCards:    Player.hand, //should be just hand = []
          drawPile:     Player.drawPile,
          discardPile:  Player.discardPile,
          kingdomCards: Board.kingdom,
          trashedCards: Board.trashed,
          onBoardCards: Board.onBoard
        };
      }
    };

    return Player;
  }());

  var Game = (function () {
    var lastInteraction = null;

    var context = function () {
      return {
        kingdom:     Board.kingdom,
        onBoard:     Board.onBoard,
        trashPile:   Board.trashed,
        drawPile:    Player.drawPile,
        discardPile: Player.discardPile,
        hand:        Player.hand
      };
    };

    var Game = {
      context: function () {
        return context();
      },
      start: function (cardListOrPresetName) {
        Board.init(cardListOrPresetName);
        Player.init();
      },
      // returns interaction if cards specifies such a rule
      play: function (card) {
        if (!lastInteraction) {
          lastInteraction = Player.playCard(card);
        }

        return lastInteraction;
      },
      buy: function (card) {
        Player.buyCard(card);
      },
      endOfTurn: function () {
        Player.endOfTurn();
      },
      quit: function () {
      },

      debug: Player.debug
    };

    return Game;
  }());

  return Game;
}());