if (Meteor.isServer) {
  Meteor.methods({
    'createGame': function() {
        var gameId = Games.insert({
          stage: 'Lobby'
        });

        return gameId;
    }
  });
}