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
    'addCardToDeckList': function(playerId, cardId) {
      var player = Players.findOne({ _id: playerId });
      var gameId = player.game;
      var game = Games.findOne({ _id: gameId });
      if (game.deckList.length + 2 >= game.players.length) {
        return "Not enough players";
      }
      Games.update({ _id: gameId }, {
        $addToSet: { deckList: cardId }
      });
      return cardId + " was added to DeckList by " + playerId;
    },
    'removeCardFromDeckList': function(playerId, cardId) {
      var player = Players.findOne({ _id: playerId });
      var gameId = player.game;
      Games.update({ _id: gameId }, {
        $pull: { deckList: cardId }
      });
      return cardId + " was removed from DeckList by " + playerId;
    },
    'startGame': function(gameId) {
      var game = Games.findOne({ _id: gameId });
      var players = Players.find({ game: gameId }).fetch();
      var playerSelectedCards = game.deckList;
      var remainingCards = players.length;

      var deck = [];

      //add president and bomber
      var president = Cards.findOne({ name: "President" })._id;
      var bomber = Cards.findOne({ name: "Bomber" })._id;
      deck.push(president);
      deck.push(bomber);
      remainingCards -= 2;

      //add the player selected cards
      if (playerSelectedCards.length > 0) {
        for(var k = 0; k < remainingCards; k++) {
          deck.push(playerSelectedCards[k]);
        }
      }

      //update the number of remaining cards
      remainingCards -= playerSelectedCards.length;
      //if there will be an odd number of players left
      //add a Gambler to fill the gap
      if (remainingCards % 2 > 0) {
        var gambler = Cards.findOne({ name: "Gambler" })._id;
        deck.push(gambler);
        remainingCards -= 1;
      }


      //divide the remaining cards into Agent or Terrorist
      for (var i = 0; i < remainingCards/2; i++) {
        var agent = Cards.findOne({ name: "Agent" })._id;
        var terrorist = Cards.findOne({ name: "Terrorist" })._id;
        deck.push(agent);
        deck.push(terrorist);
      }

      //shuffle the deck
      shuffle(deck);

      //deal out the cards
      for(var j = 0; j < players.length; j++) {
        var playerId = players[j]._id;
        var cardId = deck[j];
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