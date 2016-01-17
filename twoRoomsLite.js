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
      description: "You are the Bomber! End the game in the same room as the President, and the Red Team wins.",
      team: "Red",
      core: true
    }

    var president = {
      name: "President",
      description: "You are the President! End the game in a different room from the Bomber and the Blue Team wins.",
      team: "Blue",
      core: true
    }

    var agent = {
      name: "Blue Agent",
      description: "You are an agent of the Blue Team. Protect the president at all costs!",
      team: "Blue",
      core: true
    }

    var terrorist = {
      name: "Red Agent",
      description: "You are an agent of the Red Team. You should feel ashamed of your poor life choices.",
      team: "Red",
      core: true
    }

    var gambler = {
      name: "Gambler",
      description: "You must pick a side before the game is done. Better guess right!",
      team: "Grey",
      core: true
    }

    var terroristSpy = {
      name: "Red Spy",
      description: "Shhh...you're actually on the Red Team.",
      team: "Blue",
      core: false
    }

    var ctSpy = {
      name: "Blue Spy",
      description: "You are a highly trained spy in a deep cover operation. Gain the enemy's trust, gather intel, and most importantly: save the President.",
      team: "Red",
      core: false
    }

    var moby = {
      name: "Moby",
      description: "You are an elusive white whale that just wants to be left alone! You win the game if that pesky Captain Ahab winds up in the same room as the bomber.",
      team: "Grey",
      core: false
    }

    var ahab = {
      name: "Ahab",
      description: "You are Captain Ahab! Forever on the hunt for that darned white whale. You win the game if Moby winds up in the same room as the bomber. Let's see him swim away after that one!",
      team: "Grey",
      core: false
    }

    var terroristShyGuy = {
      name: "Shy Guy (Red Team)",
      description: "You tell everyone that you're shy, but really you just don't want to share anything about yourself.",
      team: "Red",
      core: false
    }

    var ctShyGuy = {
      name: "Shy Guy (Blue Team)",
      description: "It's not so much that you don't have anything to say, you just don't like to toot your own horn. In fact, you can't even tell anyone how proud you are for working with the president.",
      team: "Blue",
      core: false
    }

    var firstLady = {
      name: "Wife",
      description: "You've been with him through thick and thin; this crisis doesn't change any of that. End the game in the same room as the president and you win.",
      team: "Grey",
      core: false
    }

    var mistress = {
      name: "Mistress",
      description: "You've been working a lot of long hours together, and you can totally sense that there's a connection between you two. If only he wasn't married...End the game in the same room as the president (without his Wife) to win the game.",
      team: "Grey",
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
