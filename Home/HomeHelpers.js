if (Meteor.isClient) {
  // This code only runs on the client

  Template.home.onCreated(function(){
    this.buttonText = new ReactiveVar("New Game");
    this.buttonClass = new ReactiveVar("new-game-button");
    this.errorText = new ReactiveVar(false);
  });

  Template.home.helpers({
    buttonText: function() {
      return  Template.instance().buttonText.get();
    },
    buttonClass: function() {
      return Template.instance().buttonClass.get();
    },
    errorText: function() {
      return Template.instance().errorText.get();
    }
  });

  Template.home.events({
    "click .new-game-button": function(event) {
      Meteor.call("createGame" , function(error, gameId) {
        if(error) {
          console.log("error creating game");
        }
        else {
          Router.go("/game/"+gameId);
          var Airhorn = new Howl({
            src: ['/sounds/airhorn.mp3'],
            volume: 0.0
          });
          Airhorn.mute();
          Airhorn.play(); 
        }
      }) 
    },
    "submit .join-game-form": function(event, template) {
      event.preventDefault();
      var accessCode = document.getElementById("enter-access-code").value.trim().toUpperCase();
      var game = Games.findOne({ accessCode: accessCode });
      console.log(game);
      if(game) {
        var gameId = game._id;
        Router.go("/game/"+gameId);
        var Airhorn = new Howl({
          src: ['/sounds/airhorn.mp3'],
          volume: 0.0
        });
        Airhorn.play(); 
      }
      else {
        template.errorText.set("No game found for that Access Code");
      }
    },
    "click .join-game-button": function(event, template) {
      event.preventDefault();
      var accessCode = document.getElementById("enter-access-code").value.trim().toUpperCase();
      var game = Games.findOne({ accessCode: accessCode });
      console.log(game);
      if(game) {
        var gameId = game._id;
        Router.go("/game/"+gameId);
        var Airhorn = new Howl({
          src: ['/sounds/airhorn.mp3'],
          volume: 0.0
        });
        Airhorn.play(); 
      }
      else {
        template.errorText.set("No game found for that Access Code");
      }
    },
    "input #enter-access-code": function(event, template) {
      var textEntered = event.target.value.trim();
      if(textEntered.length > 0) {
        template.buttonText.set("Join Game");
        template.buttonClass.set("join-game-button");
        template.errorText.set(false);
      }
      else {
        template.buttonText.set("New Game");
        template.buttonClass.set("new-game-button");
        template.errorText.set(false);
      }
    }
  });
}