//  ENUMERATIONS
var Options = {
    Fight : 0,
    Switch : 1,
    Rampage : 2,
    Recharge : 3
}
var GameMode = {
    Singles : 0,
    Doubles : 1,
    Triples : 2,
    Rotations : 3,
    Horde : 4
};
var Weather = {
    none : 0,
    Rain : 1,
    Sun : 2,
    Sand : 3,
    Hail : 4
};
var Terrain = {
    None : 0
    Misty : 1,
    Electric : 2,
    Grassy : 3
};
var Stat = {
    HP : 0,
    Attack : 1,
    Defense : 2,
    SpecialAttack : 3,
    SpecialDefense : 4,
    Speed : 5,
    Critical : 6
    Accuracy : 7,
    Evasion : 8
};
var Status = {
    Healthy : 0,
    Burn : 1,
    Paralyze : 2,
    Poison : 3,
    BadPoison : 4,
    Freeze : 5,
    Sleep : 6,
    Faint : 7
};
//  Nature: [Raised Stat, Dropped Stat]
var Nature = {
    Hardy :   [1, 1],
    Bold :    [2, 1],
    Timid :   [3, 1],
    Modest :  [4, 1],
    Calm :    [5, 1],
    Lonely :  [1, 2],
    Docile :  [2, 2],
    Hasty :   [3, 2],
    Mild :    [4, 2],
    Gentle :  [5, 2],
    Brave :   [1, 3],
    Relaxed : [2, 3],
    Serious : [3, 3],
    Quiet :   [4, 3],
    Sassy :   [5, 3],
    Adamant : [1, 4],
    Impish :  [2, 4],
    Jolly :   [3, 4],
    Bashful : [4, 4],
    Careful : [5, 4],
    Naughty : [1, 5],
    Lax :     [2, 5],
    Naive :   [3, 5],
    Rash :    [4, 5],
    Quirky :  [5, 5]
}


var Target = {
    AnySingle : 0,
    FoeSingle : 1,
    Self : 2,
    Spread : 3,
    All : 4,
    FoeTeam : 5,    //  Targets the mons
    SelfTeam : 6,   //  Targets the mons
    FoeField : 7,   //  Targets the player
    SelfField : 8,  //  Targets the player
    Field : 9       //  Targets the game field
};

var Type = {
    Normal : 0,
    Fighting : 1,
    Flying : 2,
    Poison : 3,
    Ground : 4,
    Rock : 5,
    Bug : 6,
    Ghost : 7,
    Steel : 8,
    Fire : 9,
    Water : 10,
    Grass : 11,
    Electric : 12,
    Psychic : 13,
    Ice : 14,
    Dragon : 15,
    Dark : 16,
    Fairy : 17,
    ??? : 18
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
    color : []
};
