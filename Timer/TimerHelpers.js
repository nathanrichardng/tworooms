if (Meteor.isClient) {
  Meteor.setInterval(getTimeRemaining, 500);

  function getTimeRemaining() {
    var playerId = Session.get("playerId");
    //dont call if not in a game
    if (playerId === null || playerId === undefined || playerId ==="") {
      return;
    }
    Meteor.call("getTimeRemaining", playerId, function(error, time) {
      Session.set("timer", time);
    })
  }

  Template.timer.helpers({
    timeRemaining: function() {
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
  	}
  });
}