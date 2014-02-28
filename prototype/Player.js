var Player = (function () {
  "use strict";

  var Hand = {
    reset: function () {
      this.actions = 1;
      this.buys    = 1;
      this.coins   = 0;
      this.cards   = [];
    }
  };

  var player = {
    hand:         null,
    board:        null,
    draw_pile:    [],
    discard_pile: [],

    init: function () {
      this.hand  = Hand;  // one of kind object, global like Window in browsers
      this.board = Board; // one of kind object, global like Window in browsers

      this.firstHand();

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

  return player;
}());

//test
//Player.init();
//Player.endOfTurn().nextHand().endOfTurn().nextHand();
//Player.debug();