var game = {
    //  Only turns true if loading completes
    gameon : false,
    //  This is probably going to stay 2 for a long time
    numteams : 2,
    //  Singles, Doubles, Rotations, Triples, Horde
    mode : "Singles",
    //  The list of teams; init() fills this
    team : [],
    //  Generate a random number [0,cap)
    rand : function(cap) {
        return Math.floor(Math.rand() * cap);
    },
    //  Print to the console
    write : function(line) {
        console.write(line);
    },
    //  Print error messages
    e : function (message) {
        console.write("<font color=\"red\"><b>" + message + "</b></font");
        //  Shouldn't continue the game if an error is reached
        this.gameon = false;
    }
};
