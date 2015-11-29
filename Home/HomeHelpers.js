if (Meteor.isClient) {
  // This code only runs on the client
  Template.home.events({
    "click .new-game-button": function(event) {
      Meteor.call("createGame" , function(error, gameId) {
        if(error) {
          //handle error
        }
        else {
          Router.go("/game/"+gameId);
        }
      }) 
    }
  });
}