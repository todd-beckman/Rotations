var game = {
    //  Only turns true if loading completes
    gameon : false,
    //  This is probably going to stay 2 for a long time
    numteams : 2,
    //  Singles, Doubles, Rotations, Triples, Horde
    mode : "Singles",
    //  The end result of the game
    result : "It's a tie!",
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
    },
    //  Events that run once at the beginning
    start : function () {
        for (var e in this.startevents) {
            this.startevents[e]();
        }
    },
    //  Events that run repeatedly until the game ends
    loop : function (){
        while (this.gameon) {
            for (var e in this.loopevents) {
                this.loopevents[e].run();
            }
        }
    },
    //  Events that run once at the end
    end : function() {
        for (var e in this.endevents) {
            this.endevents[e].run();
        }
    }
    startevents : [],
    loopevents : [],
    endevents : [],
};
