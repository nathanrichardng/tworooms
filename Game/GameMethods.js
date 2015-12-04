if (Meteor.isServer) {
  Meteor.methods({
    'joinGame': function(gameId, playerName) {
      var playerId = Players.insert({ game: gameId, name: playerName});
      Games.update({ _id: gameId, stage: "Lobby" }, {
        $addToSet: { players: playerId }
      });
      return playerId;
    },
    'leaveGame': function(playerId) {
      var player = Players.findOne({ _id: playerId });
      var gameId = player.game;

      Players.remove({ _id: playerId });

      Games.update({ _id: gameId }, {
        $pull: { players: playerId }
      });

      //remove all games that are at least a day old
      var cutoffTime = moment().subtract(1, "days").toDate();
      Games.remove({ createdOn: { $lte: cutoffTime } });

      return "Left Game";
    },
    'startGame': function(gameId) {
      var players = Players.find({ game: gameId }).fetch();
      var remainingCards = players.length;

      var deck = [];

      //add president and bomber
      deck.push("President");
      deck.push("Bomber");
      remainingCards -= 2;

      //if there will be an odd number of players left
      //add a Gambler to fill the gap
      if (remainingCards % 2 > 0) {
        remainingCards -= 1;
        deck.push("Gambler");
      }

      //divide the remaining cards into Agent or Terrorist
      for (var i = 0; i < remainingCards/2; i++) {
        deck.push("Agent");
        deck.push("Terrorist");
      }

      //shuffle the deck
      shuffle(deck);

      //deal out the cards
      for(var j = 0; j < players.length; j++) {
        var playerId = players[j]._id;
        var cardName = deck[j];
        var cardId = Cards.findOne({ name: cardName })._id;
        Players.update({ _id: playerId }, {
          $set: { card: cardId }
        });
      }

      //start the game
      Games.update({ _id: gameId }, {
        $set: { stage: "Round 1" }
      });

      var updatedPlayers = Players.find({ game: gameId }).fetch();

      return "Cards dealt";


      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

    }
  });
}