//  Movelist
//  Only load relevant moves
var Move = {};

//  Declare all events
var DefaultEvents = {
    //  Called to unconditionally prepare move conditions
    onPrepare : function (user, foe) { return; },
    //  Returns whether the move's preconditions are met
    isAllowed : function (user, foe) { return true; },
    //  Returns whether the user is spending this turn charging
    isCharging : function (user) { return false; },
    //  Returns whether the user may hit the semi-invulnerable foe
    allowTargetSemiInvulnerable : function (user, foe) { return false; },
    //  Returns whether the user may evade a substitute
    allowTargetSubstitute : function (user, foe) { return false; },
    //  Returns the stat's temp value for this turn only
    getAtkModifier : function (user, atk, foe) {return atk; },
    getDefModifier : function (user, def, foe) {return def; },
    getSpAtkModifier : function (user, spatk, foe) {return spatk; },
    getSpDefModifier : function (user, spdef, foe) {return spdef; },
    getCritModifier : function (user, crit, foe) {return crit; },
    getEvaModifier : function (user, eva, foe) {return eva; },
    getAccModifier : function (user, acc, foe) {return acc; },
    //  Returns this move's effective base power for this turn only
    getPowModifier : function (user, foe) { return this.pow; },
    //  Called each time the move hits (place for secondary effects)
    onHit : function (user, foe, daamge) { return; },
    //  Called when the move is completed (place for secondary effects)
    onSuccess : function (user, foe, damage) { return; },
    //  Called when the user faints to this move's secondary effects (may set survive conditions)
    onUserFaint : function (user, foe) { return; },
    //  Called the instant before the foe faints (may set survive conditions) 
    onFoeFaint : function (user, foe) { return; },
    //  Called when the move fails after it is declared and PP is drained
    onFail : function (user, target) { return; }
}

var loadMove = function(move) {
    //  Move already exists
    if (Move.hasOwnProperty(move)) {
        return;
    }
    //  Load trivial data
    var data = MoveList[key];
    //  Enumerations
    Move[move].movetype = Type[data.Type];
    Move[move].cat = Category[data.cat];
    Move[move].tar = Target[data.tar];
    //  Direct copies
    Move[move].desc = data.desc;
    Move[move].pp = data.pp;
    Move[move].pow = data.pow;
    Move[move].acc = data.acc;
    Move[move].contact = data.contact;
    Move[move].protect = data.protect;
    Move[move].magic = data.magic;
    Move[move].snatch = data.snatch;
    Move[move].rock = data.rock;
    Move[move].usedef = data.usedef;
    //  Load the event data
    for (var e : DefaultEvents) {
        //  See if the move has events
        if (MoveEvents.hasOwnProperty(move)
        //  See if this is one of the move's events
        &&  MoveEvents[move].hasOwnProperty(e)) {
            Move[move][e] = MoveEvents[move][e];
        }
        else {
            Move[move][e] = DefaultEvents[move][e];
        }
    }
}

