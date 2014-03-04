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
