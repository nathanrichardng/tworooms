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

      return returnTime > 0 ? returnTime.format("m:ss") : "Times up!";
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
    }
  });
}