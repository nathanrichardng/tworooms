if (Meteor.isClient) {
  // This code only runs on the client
  Template.game.helpers({
    inLobby: function() {
      return this.stage === "Lobby";
    }
  });

  Template.lobby.helpers({
    playingGame: function() {
      var playerId = Session.get("playerId");
      var gameId = this._id;
      console.log("Session playerId", playerId);
      if (playerId === "" || playerId === null) {
        return false;
      }

      return Players.findOne({ _id: playerId, game: gameId });
    }
  });

  Template.game.events({
    "submit .add-player-form": function(event) {
      event.preventDefault();
      var gameId = this._id;
      var playerName = event.target.name.value;
      console.log("game id", gameId);
      console.log("player name", playerName);
      Meteor.call("joinGame", gameId, playerName, function(error, playerId) {
        if(error) {
          console.log("error joining game", error);
        }
        else {
          Session.setPersistent("playerId", playerId);
          console.log("Player Id", playerId);
        }
      });
    },
    "click .leave-game-button": function(event) {
      event.preventDefault();
      console.log("Leaving Game");
      console.log("current game", Games.findOne({ _id: this._id }));
      var playerId = Session.get("playerId");
      Meteor.call("leaveGame", playerId, function(error, success) {
        if(error) {
          console.log("error leaving game", error);
          Router.go("/");
        }
        else {
          console.log("successfully left game", success);
          Session.setPersistent("playerId", null);
          Router.go("/");
        }
      });
    },
    "click .start-game-button": function(event) {
      event.preventDefault();
      console.log("Starting Game");
      var gameId = this._id;
      Meteor.call("startGame", gameId, function(error, success) {
        if(error) {
          console.log("error starting game", error);
        }
        else {
          console.log("successfully started game", success);
        }
      })
    },
    "click #game-access-code": function(event) {
        var urlField = document.getElementById('game-access-code');
        // select the contents
        urlField.setSelectionRange(0,9999);
        if(document.queryCommandSupported("copy")) {
          document.execCommand("copy");
        }
    }
  });
}