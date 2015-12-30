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
      team: "Terrorists",
      core: true
    }

    var president = {
      name: "President",
      description: "You are the President! End the game in a different room from the Bomber and the Counter-Terrorists win.",
      team: "Counter-Terrorists",
      core: true
    }

    var agent = {
      name: "Agent",
      description: "You are an agent of the secret service. Protect the president at all costs!",
      team: "Counter-Terrorists",
      core: true
    }

    var terrorist = {
      name: "Terrorist",
      description: "You are a terrorist. You should feel ashamed of your poor life choices.",
      team: "Terrorists",
      core: true
    }

    var gambler = {
      name: "Gambler",
      description: "You must pick a side before the game is done. Better guess right!",
      team: "Individual",
      core: true
    }

    var terroristSpy = {
      name: "Terrorist Spy",
      description: "Shhh...you're actually a terrorist.",
      team: "Counter-Terrorists",
      core: false
    }

    var ctSpy = {
      name: "Counter-Terrorist Spy",
      description: "You are a highly trained spy in a deep cover operation. Gain the enemy's trust, gather intel, and most importantly: save the President.",
      team: "Terrorists",
      core: false
    }

    var moby = {
      name: "Moby",
      description: "You are an elusive white whale that just wants to be left alone! You win the game if that pesky Captain Ahab winds up in the same room as the bomber.",
      team: "Individual",
      core: false
    }

    var ahab = {
      name: "Ahab",
      description: "You are Captain Ahab! Forever on the hunt for that darned white whale. You win the game if Moby winds up in the same room as the bomber. Let's see him swim away after that one!",
      team: "Individual",
      core: false
    }

    var terroristShyGuy = {
      name: "Shy Guy (Terrorist)",
      description: "You tell everyone that you're shy, but really you just don't want to share anything about yourself.",
      team: "Terrorists",
      core: false
    }

    var ctShyGuy = {
      name: "Shy Guy (Counter-Terrorist)",
      description: "It's not so much that you don't have anything to say, you just don't like to toot your own horn. In fact, you can't even tell anyone that you're part of the secret service.",
      team: "Counter-Terrorists",
      core: false
    }

    var firstLady = {
      name: "First Lady",
      description: "You've been with him through thick and thin; this crisis doesn't change any of that. End the game in the same room as the president and you win.",
      team: "Individual",
      core: false
    }

    var mistress = {
      name: "The other woman",
      description: "You've been working a lot of long hours together, and you can totally sense that there's a connection between you two. If only he wasn't married...End the game in the same room as the president (without the First Lady) to win the game.",
      team: "Individual",
      core: false
    }

    Cards.insert(bomber);
    Cards.insert(president);
    Cards.insert(agent);
    Cards.insert(terrorist);
    Cards.insert(gambler);
    Cards.insert(terroristSpy);
    Cards.insert(ctSpy);
    Cards.insert(moby);
    Cards.insert(ahab);
    Cards.insert(terroristShyGuy);
    Cards.insert(ctShyGuy);
    Cards.insert(firstLady);
    Cards.insert(mistress);
  }
}
