Router.route('/game/:gameId', {
	template: 'game',
	waitOn: function() {
		return Meteor.subscribe('Games');
	},
	data: function() {
		var gameId = this.params.gameId
		return Games.findOne({ _id:gameId });
	}
});