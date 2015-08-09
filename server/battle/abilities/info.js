//  Abilities
var AbilityData = {
    berry : 1,
    trigger : {
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
    message : "Breaks the mold";
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
    afterDamageTaken : function (self, foe) { return; },
    //  When the self is hurt indirectly
    cancelResidualDamage : function (self, source) { return; },
    //  When the self is hurt by recoil damage
    onRecoilDamageTaken : function (self) { return; },
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
