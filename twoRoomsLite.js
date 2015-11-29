if (Meteor.isClient) {
  Meteor.subscribe("Cards");
  Meteor.subscribe("Players");
  Meteor.subscribe("Games");
}

if (Meteor.isServer) {
  Meteor.publish("Cards", function() {
    return Cards.find({});
  });
  Meteor.publish("Players", function() {
    return Players.find({});
  });
  Meteor.publish("Games", function() {
    return Games.find({});
  });

  if (Cards.find({}).count() === 0) {
    var bomber = {
      name: "Bomber",
      description: "You are the Bomber! End the game in the same room as the President, and the Terrorists win.",
      team: "Terrorists"
    }

    var president = {
      name: "President",
      description: "You are the President! End the game in a different room from the Bomber and the Counter-Terrorists win.",
      team: "Counter-Terrorists"
    }

    var agent = {
      name: "Agent",
      description: "You are an agent of the secret service. Protect the president at all costs!",
      team: "Counter-Terrorists"
    }

    var terrorist = {
      name: "Terrorist",
      description: "You are a terrorist. You should feel ashamed of your poor life choices.",
      team: "Terrorists"
    }

    var gambler = {
      name: "Gambler",
      description: "You must pick a side before the game is done. Better guess right!",
      team: "Individual"
    }

    Cards.insert(bomber);
    Cards.insert(president);
    Cards.insert(agent);
    Cards.insert(terrorist);
    Cards.insert(gambler);
  }
}
