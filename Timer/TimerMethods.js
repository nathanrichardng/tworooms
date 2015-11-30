if (Meteor.isServer) {
  Meteor.methods({
  	'getTimeRemaining': function(playerId) {
  		var player = Players.findOne({ _id: playerId });
  		var gameId = player.game;
  		var game = Games.findOne({ _id: gameId });
  		var endTime = game.timerEndTime;
  		if(endTime === undefined || endTime === null) {
  			return game.timerLength + ":00";
  		}
  		var endTime = moment(game.timerEndTime);

  		var currentTime = game.timerPaused ? moment(game.timerPausedTime) : moment();
  		var timeRemaining = endTime.diff(currentTime);
  			timeRemaining = timeRemaining > 0 ? moment(timeRemaining).format("m:ss") : "Times up!";
  		return timeRemaining;
  	},
  	'startTimer': function(gameId) {
  		var game = Games.findOne({ _id: gameId });
  		var endTime = moment().add(game.timerLength, "minutes").toDate();
  		Games.update({ _id: gameId }, {
  			$set: { timerEndTime: endTime }
  		});
  		return endTime;
  	},
  	'pauseTimer': function(gameId) {
  		var pausedTime = moment().toDate();
  		Games.update({ _id: gameId }, {
  			$set: { timerPaused: true, timerPausedTime: pausedTime }
  		});
  	}
  });
}