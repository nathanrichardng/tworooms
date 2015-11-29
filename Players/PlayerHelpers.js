if (Meteor.isClient) {
  // This code only runs on the client
  Template.players.helpers({
    players: function() {
    	console.log(Games.findOne({ _id: this._id }));
      	return Players.find({ game: this._id });
    }
  });
}