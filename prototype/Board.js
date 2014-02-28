var Board = (function () {
  "use strict";

  var board = {
    player:    null,
    available: {}, // {'Copper': 10,}
    trashed:   {},
    visible:   {},

    init: function (cards) {
      this.player = Player; // use single Player object
      this.cards  = Cards;

      if (!cards instanceof Array || cards.length !== 10) {
        throw "Not enough cards passed to the Board initializer";
      }

      //initialize the board collection with the treasure, victory and action cards
      //todo check the rules for more details
    },
    reset: function () {
      this.visible   = [];
      this.trashed   = [];
      this.available = [];
    },
    clear: function () {
      this.visible = [];
    },
    buy: function (card) {
      if (this.buyPossible(card)) {
        this.player.takeCoins(Cards[card].cost);
        this.player.takeBuyPoints();

        //take the card off the supply unless it's an infinite one - treasure
        return true;
      }

      return false;
    },
    buyPossible: function (card) {
      return this.cards[card].cost <= this.player.coins() && this.player.buys() > 0;
    }
  };

  return board;
}());
