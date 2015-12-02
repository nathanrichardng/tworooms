if (Meteor.isClient) {

  function getTimeRemaining() {
    var playerId = Session.get("playerId");
    //dont call if not in a game
    if (playerId === null || playerId === undefined || playerId ==="") {
      console.log("no player at get time remaining");
      return;
    }
    else {
      Meteor.call("getTimeRemaining", playerId, function(error, time) {
        Session.set("timer", time);
        console.log("returned time", time);
      });
    }
    
  }

  Template.timer.helpers({
    timeRemaining: function() {
      Meteor.setInterval(getTimeRemaining, 500);
      return Session.get("timer");
      /*var endTime = moment(this.timerEndTime);
      Meteor.setInterval(function() {
        var timeRemaining = endTime.diff(moment());
        timeRemaining = moment(timeRemaining).format("m:ss");
        Session.set("timer", timeRemaining);
        console.log("time remaining", timeRemaining);
      }, 1000);
      
      return Session.get("timer");*/
    }
  });

  Template.timer.events({
  	"click .start-timer": function(event) {
  		event.preventDefault();
  		Meteor.call("startTimer", this._id, function(error, time) {
        console.log("time", time);
      });
  	},
    "click .pause-timer": function(event) {
      event.preventDefault();
      Meteor.call("pauseTimer", this._id, function(error, time) {
        console.log("time", time);
      });
    }
  });
}