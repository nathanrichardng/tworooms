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
  		var endTime;
  		if (game.timerEndTime) {
  			endTime = moment(game.timerEndTime);
  		}
  		else {
  			endTime = moment().add(game.timerLength, "minutes").toDate();
  		} 
  		if (game.timerPaused) {
  			var pausedTime = moment(game.timerPausedTime);
  			var timePaused = moment().diff(pausedTime);
  				endTime = endTime.add(timePaused).toDate();
  		}
  		Games.update({ _id: gameId }, {
  			$set: { timerEndTime: endTime, timerPaused: false, timerPausedTime: null }
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