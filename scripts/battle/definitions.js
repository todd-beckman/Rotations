
//  BITWISE FLAGS

var
    MOVE_USES_CONTACT =          1,  //  0000000000000001
    MOVE_AFFECTED_BY_KINGSROCK = 2,  //  0000000000000010
    MOVE_AFFECTED_BY_PROTECT =   4,  //  0000000000000100
    MOVE_AFFECTED_BY_MAGICCOAT = 8,  //  0000000000001000
    MOVE_AFFECTED_BY_SNATCH =   16,  //  0000000000010000
    MOVE_USES_PHYSICAL_ATTACK = 32,  //  0000000000100000
    MOVE_HITS_PHYSICAL_DEFENSE =64,  //  0000000001000000
    MOVE_TARGETS_SELF =        128,  //  0000000010000000
    MOVE_TARGETS_FOE =         256,  //  0000000100000000
    MOVE_TARGETS_FOES =        512,  //  0000001000000000
    MOVE_TARGETS_PARTNER =    1024,  //  0000010000000000
    MOVE_TARGETS_FIELD =      2048,  //  0000100000000000
    MOVE_TARGETS_FOE_TEAM =   4098,  //  0001000000000000
    MOVE_TARGETS_TEAM =       8192;  //  0010000000000000

//  ENUMERATIONS
var Mode = {
    "Singles" : 0,
    "Doubles" : 1,
    "Triples" : 2,
    "Rotations" : 3,
    "Horde" : 4
};
var Weather = {
    "none" : 0,
    "Rain" : 1,
    "Sun" : 2,
    "Sand" : 3,
    "Hail" : 4
};
var Terrain = {
    "None" : 0
    "Misty Terrain" : 1,
    "Electric Terrain" : 2,
    "Grassy Terrain" : 3
};
var Stat = {
    "HP" : 0,
    "Attack" : 1,
    "Defense" : 2,
    "Special Attack" : 3,
    "Special Defense" : 4,
    "Speed" : 5,
    "Accuracy" : 6,
    "Evasion" : 7
};
var Status = {
    "Healthy" : 0,
    "Burned" : 1,
    "Paralyzed" : 2,
    "Poisoned" : 3,
    "Badly Poisoned" : 4,
    "Frozen" : 5,
    "Asleep" : 6,
    "Fainted" : 7
};
//  Nature: [Increased Stat, Decreased Stat]
var Nature = {
    "Hardy" :   [1, 1],
    "Bold" :    [2, 1],
    "Timid" :   [3, 1],
    "Modest" :  [4, 1],
    "Calm" :    [5, 1],
    "Lonely" :  [1, 2],
    "Docile" :  [2, 2],
    "Hasty" :   [3, 2],
    "Mild" :    [4, 2],
    "Gentle" :  [5, 2],
    "Brave" :   [1, 3],
    "Relaxed" : [2, 3],
    "Serious" : [3, 3],
    "Quiet" :   [4, 3],
    "Sassy" :   [5, 3],
    "Adamant" : [1, 4],
    "Impish" :  [2, 4],
    "Jolly" :   [3, 4],
    "Bashful" : [4, 4],
    "Careful" : [5, 4],
    "Naughty" : [1, 5],
    "Lax" :     [2, 5],
    "Naive" :   [3, 5],
    "Rash" :    [4, 5],
    "Quirky" :  [5, 5]
}
var Type = {
    "Normal" : 0,
    "Fighting" : 1,
    "Flying" : 2,
    "Poison" : 3,
    "Ground" : 4,
    "Rock" : 5,
    "Bug" : 6,
    "Ghost" : 7,
    "Steel" : 8,
    "Fire" : 9,
    "Water" : 10,
    "Grass" : 11,
    "Electric" : 12,
    "Psychic" : 13,
    "Ice" : 14,
    "Dragon" : 15,
    "Dark" : 16,
    "Fairy" : 17,
    "???" : 18,

    //  = [offender][defender] * 2
    //  Don't forget these are doubled
    effectiveness : [
        [2, 2, 2, 2, 2, 1, 2, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [4, 2, 1, 1, 2, 4, 1, 0, 4, 2, 2, 2, 2, 1, 4, 2, 4, 1, 2],
        [2, 4, 2, 2, 2, 1, 4, 2, 1, 2, 2, 4, 1, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 1, 1, 1, 2, 1, 0, 2, 2, 4, 2, 2, 2, 2, 2, 4, 2],
        [2, 2, 0, 4, 2, 4, 1, 2, 4, 4, 2, 1, 4, 2, 2, 2, 2, 2, 2],
        [2, 1, 4, 2, 1, 2, 4, 2, 1, 4, 2, 2, 2, 2, 4, 2, 2, 2, 2],
        [2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 4, 2, 4, 2, 2, 4, 1, 2],
        [0, 2, 2, 2, 2, 2, 2, 4, 1, 2, 2, 2, 2, 4, 2, 2, 1, 2, 2],
        [2, 2, 2, 2, 2, 4, 2, 2, 1, 1, 1, 2, 1, 2, 4, 2, 2, 4, 2],
        [2, 2, 2, 2, 2, 1, 4, 2, 4, 1, 1, 4, 2, 2, 4, 1, 2, 2, 2],
        [2, 2, 2, 2, 4, 4, 2, 2, 2, 4, 1, 1, 2, 2, 2, 1, 2, 2, 2],
        [2, 2, 1, 1, 4, 4, 1, 2, 1, 1, 4, 1, 2, 2, 2, 1, 2, 2, 2],
        [2, 2, 4, 2, 0, 2, 2, 2, 2, 2, 4, 1, 1, 2, 2, 1, 2, 2, 2],
        [2, 4, 2, 4, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 0, 2, 2],
        [2, 2, 4, 2, 4, 2, 2, 2, 1, 1, 1, 4, 2, 2, 1, 4, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 4, 2, 0, 2],
        [2, 1, 2, 2, 2, 2, 2, 4, 1, 2, 2, 2, 2, 4, 2, 2, 1, 1, 2],
        [2, 4, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 4, 4, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ],

    //  TODO: get some nice colors for these
    //  TODO: get some pictures for these might as well
    color : [],

    getEffectiveness : function (offendingType, defendingType) {
        return this.effectiveness[offendingType, defendignType] / 2.0;
    },

    packHtml : function (type, message) {
        return "<font color='" + color[type] + "'>" + message + "</font>";
    }
];

