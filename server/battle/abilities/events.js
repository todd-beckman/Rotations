var MoveData = {
    "No Move" : {
        desc : "",
        typing : 18,    cat : 2,    pp : 0,     pow : 0,    acc : 0,
        priority : 0,
        effects : {
            recoil : 1,
            drain : 1,
            bind : false,
            crit : 1,
            holdback : false
        },
        flags : {
            contact : 0,    protect : 0,    magic : 0,  snatch : 0,
            kingsrock : 0,  usedef : 0,     jaw : 0,    punch : 0,
        },
        //  Determine if the move's usage is appropriate
        preConditions : function (self, foe) { return bool; },
        takeChargeTurn : function (self, foe) { return bool; },
        //  Determine if the self should be able to hit semi-invulnerable mons
        onTargetSemiInvulnerable : function (user, foe) { return bool; },
        //  Every time damage is dealt directly
        onDamageDealt : function (self, foe, damage) { return; },
        //  When the move is fully done
        onSuccess : function (self, foe) { return; }
    }
}

//  Abilities

//  Items
var ItemData = {
    mega : "Missingno",
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
    };
    //  Allow items to change move power
    onMovePowerMultiplier : function (self, foe, move) { return 1; },
    //  Allow items to change stats
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
    //  Give the item a last chance at letting the holder survive
    onLoseLastHP : function (self) { return true; },
    //  When the holder faints
    onFaint : function (self, foe) { return; }
    //  When the self loses HP to the foe; can be canceled
    onHPDrain : function (self, foe) { return bool; },
    //  When the self takes HP from the foe; not run from max health
    onHPStolen : function (self, foe) { return; }
    //  Source provided if needed; not necessarily used officially
    //  When the mon receives a stat boost/drop
    onStatChange : function (stat, change, source) { return; },
    //  When the mon gets confused
    onGetConfused : function (source) { return; },
    //  When the mon gets a volatile status condition
    onGetStatus : function (status, source) { return; },
};

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
    };
    crit : 0;   //  stage boosts
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


//  Mons
var MonData = {
    //  Properties about the mon right out of the Dex
    template : {
        name : "Missingno",
        basestats : {
            HP : 0, Attack : 0, Defense : 0, Speed : 0
            "Special Attack" : 0, "Special Defense" : 0
        }
        types : ["Normal", "???"],
        abilities : ["No Ability", "No Ability", "No Ability"],
        mega : false,   //  It is permanent
    },
    build : {
        nickname : "George Zip",
        nature : "Hardy",
        item : "No Item",
        ability : "No Ability",
        ivs : {
            HP : 0, Attack : 0, Defense : 0, Speed : 0
            "Special Attack" : 0, "Special Defense" : 0
        },
        evs : {
            HP : 0, Attack : 0, Defense : 0,SpecialAttack : 0,
            SpecialDefense : 0, Speed : 0
        }
    }
    //  Properties that stay until changed  
    nonvolatile : {
        nick : "George Zip",
        item : [object],
        ability : [object],
        types : [],
        stats : {
            HP : 0, Attack : 0, Defense : 0,SpecialAttack : 0,
            SpecialDefense : 0, Speed : 0
        },
        status : "Healthy",
        toxic : 0,
        movepp : [0, 0, 0, 0],
        hyper : false,      //  Unofficial (Shadow)
    },
    //  Properties that are dropped when switched out
    volatile : {
        statboosts : {
            HP : 0, Attack : 0, Defense : 0,SpecialAttack : 0,
            SpecialDefense : 0, Speed : 0,  Accuracy : 0,
            Evasion : 0
        }
        choicelock : false, //  Save the move
        lastmove : "No Move",
        attract : false,    //  Save the target
        substitute : 0,     //  Save the HP
        block : [],         //  Save the sources
        grounded : false,
        binding : [{        //  List of bindings
            move : "No Move",
            turns : 0,
            source : [object]
        }],
        //  2-turn moves, charge turn 1
        flying : false,
        bouncing : false,
        phantom : false,
        diving : false,
        //  1 charge turn is all that is needed
        countdown : {
            confuse : 0,
            yawn : 0,
            magnetrise : 0,
            telekinesis : 0,
            taunt : 0,
            torment : 0,
            encore : 0,
            recharging : 0,
            skydropping : 0,
            skydrop : 0,
            embargo : 0,
            healblock : 0
        },
    },
    //  Properties that only exist this turn
    thisturn : {
        endure : false,
        protection : {
            protect : false,
            spikyshield : false,
            kingshield : false
        }
    }
}


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
    trickroom : 0,      //  Turn count
    magicroom : 0,      //  Turn count
    wonderroom : 0,     //  Turn count
    weather : {
        type : "None",
        turns : 0
    },
    terrain : {
        type : "None",
        turns : 0
    }
}

