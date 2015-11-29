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
}