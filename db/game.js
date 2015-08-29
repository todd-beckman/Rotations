var game = {
    language : Language.English,
    teams : [],
    mode : Mode.Rotation,
    numteams : 2,
    playerlose: function (team) {
        this.teams.splice(this.teams.indexOf(this), 1);
        this.numteams--;
        if (this.numteams == 1) {
            this.endGame();
        }
    },
    endGame : function () {
        game.write(teams[0].name + " is the winner!");
    }
};

var Mode = {
    Single : {
        activeslots:1,
        benchslots:0,
        allowitems : false
    },
    Double : {
        activeslots:2,
        benchslots:0
        allowitems : false
    },
    Triple : {
        activeslots:3,
        benchslots:0
        allowitems : false
    },
    Rotation : {
        activeslots:1,
        benchslots:2
        allowitems : false
    },
    /*  Potential use
    TCG : {
        activeslots:1,
        benchslots:5
        allowitems : true
    },*/
    /*  Potential use
    Defender : {
        activeslots:2,
        benchslots:1
        allowitems : false
    }*/
};
