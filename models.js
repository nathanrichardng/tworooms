Cards = new Mongo.Collection("Cards");
Players = new Mongo.Collection("Players");
Games = new Mongo.Collection("Games");



var Schema = {};

Schema.Card = new SimpleSchema({
    name: {
        type: String,
        optional: false
    },
    description: {
        type: String,
        optional: true
    },
    team: {
        type: String,
        optional: false
    }
});

Schema.Player = new SimpleSchema({
    name: {
        type: String,
        optional: false
    },
    game: {
        type: SimpleSchema.Game,
        optional: false
    },
    card: {
        type: SimpleSchema.Card,
        optional: true
    }
});

Schema.Game = new SimpleSchema({
    players: {
        type: [String],
        autoValue: function() {
            if(this.isInsert) {
                return [];
            }
        }
    },
    stage: {
        type: String,
        optional: false,
        allowedValues: ['Lobby', 'Round 1', 'Round 2', 'Round 3', 'Game Over']
    },
    createdOn: {
        type: Date,
        autoValue: function() {
            if(this.isInsert) {
                var createdOn = new Date();
                return createdOn;
            }
        }
    }
});

Cards.attachSchema(Schema.Card);
Players.attachSchema(Schema.Player);
Games.attachSchema(Schema.Game);