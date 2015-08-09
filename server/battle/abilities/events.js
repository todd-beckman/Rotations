var MoveData = {
    "No Move" : {
        desc : "",
        typing : 18,    cat : 2,    pp : 0,     pow : 0,    acc : 0,
        priority : 0,
        contest : "Clever",
        effects : {
            multihit : false,   //  hit 2-5
            dualhit : false,    //  hit 2
            recoil : 1,
            drain : 1,
            bind : false,
            crit : 1,
            alwayscrit : 1,
            holdback : false,
            weather : "None",
            terrain : "None",
            thaw : 1,
            nosky : 1,
            ohko : 1,
            retreat : "batonpass", "uturn",
            typeeff : {
                "Water" : 2;//freeze dry
            },
            dualtype : "Flying",
            usedef : false,
            ignoreboosts : false,
            usefoestats : false,
        },
        flags : {
            contact : 0,    protect : 0,    magic : 0,  snatch : 0,
            kingsrock : 0,  usedef : 0,     jaw : 0,    punch : 0,
        },
        //  Determine if the move's usage is appropriate
        preConditions : function (self, foe) { return bool; },
        takeChargeTurn : function (self, foe) { return bool; },
        //  Just leave acc undefined if it always hits. This is for
        //  special conditions such as Stomp
        //  true = run test, false means skip
        onAccuracyTest : function (user, foe) { return bool; },
        onTypeModified : function (user, foe) { return type; },
        //  For those times when a move's power varies
        onPowerModified : function (user, foe) { return 1; },
        //  Determine if the self should be able to hit semi-invulnerable mons
        onTargetSemiInvulnerable : function (user, foe) { return bool; },
        //  Manually provide the damage output of the move.
        getDamageOutput : function (self, foe, damage) { return 1; },
        //  When the move completes, once per foe
        onSuccess : function (self, foe) { return; },
        //  When the move completes, fired once
        onComplete : function (self) { return; },
        onFoeRetreat : function (self, foe) { return; }
    }
}

//  Abilities


var AbilityData = {
    extend : {
        "Rain" : 8,
        "Hail" : 8,
        "Sun" : 8,
        "Sand" : 8,
        "Shadow" : 8,       //  Unofficial
        "Trick Room", 8,    //  Unofficial
        "Magic Room", 8,    //  Unofficial
        "Wonder Room", 8,   //  Unofficial
        "Bind" : 5,
        "Multihit" : 5
    },
    //  Truant, Multitype or Stance Change.
    nosimple : false,   //  prevent simple beaming
    //  Trace, Truant, Multitype, Flower Gift, Imposter, Zen Mode, or Stance Change.
    persist : false,    //  prevent overwriting the abiilty
    //  Allow abilities to change move power
    onMovePowerMultiplier : function (self, foe, move) { return 1; },
    //  Allow abilities to change stats
    onAttackMultiplier : function (self foe, move) { return 1; },
    onDefenseMultiplier : function (self foe, move) { return 1; },
    onSpecialAttackMultiplier : function (self foe, move) { return 1; },
    onSpecialDefenseMultiplier : function (self foe, move) { return 1; },
    onSpeedMultiplier : function (self foe, move) { return 1; },
    //  When the self contacts the foe
    onTouch : function (self, foe) { return; },
    //  When the foe contacts the self
    onTouched : function (self, foe) { return; },
    //  When the self hurts the foe directly
    onDamageDealt : function (self, foe) { return; },
    //  When the foe hurts the self directly
    onDamageTaken : function (self, foe) { return; },
    //  When the self is hurt indirectly
    onResidualDamageTaken : function (self) { return; },
    //  When the self is hurt by recoil damage
    onRecoilDamageTaken : function (self) { return; },
    //  Give the ability a last chance at letting the mon survive
    onLoseLastHP : function (self) { return true; },
    //  When the mon faints
    onFaint : function (self, foe) { return; }
    //  When the self loses HP to the foe; can be canceled
    onHPDrain : function (self, foe) { return bool; },
    //  When the self takes HP from the foe; not run from max health
    onHPStolen : function (self, foe) { return; }
    //  Source provided if needed; not necessarily used officially
    //  When the mon receives a stat boost/drop
    onStatChange : function (stat, change, source) { return; },
    //  When the mon gets confused
    onGetConfused : function (source) { return; }
};



var TeamData = {
    mega : false;   //  Team-wide property
    countdown : {
        reflect : 0,
        lightscreen : 0,
        safeguard : 0,
        mist : 0,
        tailwind : 0,
        firegrasspledge : 0,
        grasswaterpledge : 0,
        watergrasspledge : 0,
    },
    passive : {
        stealthrock : false
        spikes : 0,
        toxicspikes : 0,
        stickyweb : false,
    }
    thisturn : {
        protection : {
            quickguard : false,
            matblock : false,
            wideguard : false
        }
    }
}


var FieldData = {
    echoedvoice : 0,
    trickroom : 0,      //  Turn count
    magicroom : 0,      //  Turn count
    wonderroom : 0,     //  Turn count
    lastmove : "No Move",
    weather : {
        type : "None",
        turns : 0
    },
    terrain : {
        type : "None",
        turns : 0
    }
    thisturn : {
        iondeluge : false
    }
}

