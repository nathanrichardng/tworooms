if (Meteor.isClient) {
  // This code only runs on the client
  Template.card.helpers({
    card: function() {
      var playerId = Session.get("playerId");
      var player = Players.findOne({ _id: playerId });
      var cardId = player.card;
      return Cards.findOne({ _id: cardId });
    }
  });
}