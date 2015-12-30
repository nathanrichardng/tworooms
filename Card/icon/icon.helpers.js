if (Meteor.isClient) {
	Template.icon.helpers({
		iconClass: function() {
			switch(this.team) {
				case "Terrorists":
					return "fa fa-bomb";
				case "Counter-Terrorists":
					return "fa fa-shield";
				case "Individual":
					return "fa fa-male";
				default:
					return "";
			}
		}
	});
}