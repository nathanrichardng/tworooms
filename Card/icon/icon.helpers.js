if (Meteor.isClient) {
	Template.icon.helpers({
		iconClass: function() {
			switch(this.team) {
				case "Red":
					return "fa fa-bomb";
				case "Blue":
					return "fa fa-shield";
				case "Grey":
					return "fa fa-male";
				default:
					return "";
			}
		}
	});
}