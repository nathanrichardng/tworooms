if (Meteor.isClient) {
  Template.timer.helpers({
    timeRemaining: function() {
      var playerId = Session.get("playerId");
      var player = Players.findOne({ _id: playerId });
      var game = Games.findOne({ _id: player.game });
      var endTime = game.timerEndTime;
      var returnTime;
      if(game.timerPaused) {
        returnTime = moment(endTime - game.timerPausedTime);
      }
      else if (endTime) {
        returnTime = moment(endTime - TimeSync.serverTime(null, 500));
      }
      else {
        returnTime = moment(game.timerLength * 60000);
      }
      if (returnTime < 0 && returnTime > -1000) {
        var Airhorn = new Howl({
          src: ['/sounds/airhorn.mp3']
        });
        Airhorn.play(); 
      }
      return returnTime > 0 ? returnTime.format("m:ss") : "Times up!";
    },
    timerRunning: function() {
      var playerId = Session.get("playerId");
      var player = Players.findOne({ _id: playerId });
      var game = Games.findOne({ _id: player.game });
      return (!game.timerPaused && game.timerEndTime);
    }
  });

  Template.timer.events({
  	"click .start-timer": function(event) {
  		event.preventDefault();
  		Meteor.call("startTimer", this._id, function(error, time) {
        console.log("start time", time);
      });
  	},
    "click .pause-timer": function(event) {
      event.preventDefault();
      Meteor.call("pauseTimer", this._id, function(error, time) {
        console.log("pause time", time);
      });
    },
    "click .reset-timer": function(event) {
      event.preventDefault();

      Meteor.call("resetTimer", this._id, function(error, time) {
        console.log("reset time", time);
      });
    },
    "submit .set-timer-length": function(event) {
      event.preventDefault();
      console.log(event.target.timerLength.value);
      Meteor.call("setTimerLength", this._id, event.target.timerLength.value, function(error, success) {
        console.log("set timer length", success);
      });
      $('#set-timer-modal').modal('toggle')
    }
  });
}