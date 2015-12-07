if (Meteor.isClient) {
  // This code only runs on the client
  Template.card.helpers({
    card: function() {
      var playerId = Session.get("playerId");
      var player = Players.findOne({ _id: playerId });
      var cardId = player.card;
      return Cards.findOne({ _id: cardId });
    },
    cardVisibility: function() {
    	return Session.get("cardVisibility");
    }
  });

  Template.card.events({
  	"click .card": function(event) {
  		event.preventDefault();
  		if (Session.equals("cardVisibility", "hidden")) {
  			Session.set("cardVisibility", "shown")
  		}
  		else {
  			Session.set("cardVisibility", "hidden");
  		}
  	}
  });

  Template.cardsList.helpers({
  	cards: function() {
  		return Cards.find({ core: false });
  	},
    inDeckList: function(cardId) {
      var playerId = Session.get("playerId");
      var player = Players.findOne({ _id: playerId });
      var gameId = player.game;
      return Games.findOne({ _id: gameId, deckList: cardId });
    },
    slotsAvailable: function() {
      var playerId = Session.get("playerId")
      var player = Players.findOne({ _id: playerId });
      var gameId = player.game;
      var game = Games.findOne({ _id: gameId });
      var slotsAvailable = game.players.length - 2 - game.deckList.length;
      if (slotsAvailable < 0) {
        slotsAvailable = 0
      }
      return slotsAvailable;
    }
  });

  Template.cardsList.events({
    "change [type=checkbox]": function(event) {
      event.preventDefault();
      if(event.target.checked) {
        var playerId = Session.get("playerId");
        var cardId = this._id;
        Meteor.call("addCardToDeckList", playerId, cardId, function(error, result) {
          if(result === "Not enough players") {
            event.target.checked = false;
            console.log("Not enough players");
          }
        });
      }
      else if (!event.target.checked) {
        var playerId = Session.get("playerId");
        var cardId = this._id;
        Meteor.call("removeCardFromDeckList", playerId, cardId);
      }
    }
  })
}