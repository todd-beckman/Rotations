
var Terrain = {
    "None"          : 0,
    "Misty"         : 1,
    "Grassy"        : 2,
    "Electric"      : 3
];
for (var i in Terrain) {
    Terrain[Terrain[i]] = Terrain[i];
}

var Mode = {
    "Single"        : 0,
    "Double"        : 1,
    "Triple"        : 2,
    "Rotation"      : 3
];
for (var i in Mode) {
    Mode[Mode[i]] = Mode[i];
}

var Status = {
    "Healthy"       : 0,
    "Burn"          : 1,
    "Paralyze"      : 2,
    "Poison"        : 3,
    "BadPoison"     : 4,
    "Freeze"        : 5,
    "Sleep"         : 6,
    "Faint"         : 7
];
for (var i in Status) {
    Status[Status[i]] = Status[i];
}

var Gender = {
    "Male"          : 0,
    "Female"        : 1,
    "Neutral"       : 2
};
for (var i in Gender) {
    Gender[Gender[i]] = Gender[i];
}

var Nature = {
    {name : "Hardy",    raise : 1, drop : 1},
    {name : "Bold",     raise : 2, drop : 1},
    {name : "Timid",    raise : 3, drop : 1},
    {name : "Modest",   raise : 4, drop : 1},
    {name : "Calm",     raise : 5, drop : 1},
    {name : "Lonely",   raise : 1, drop : 2},
    {name : "Docile",   raise : 2, drop : 2},
    {name : "Hasty",    raise : 3, drop : 2},
    {name : "Mild",     raise : 4, drop : 2},
    {name : "Gentle",   raise : 5, drop : 2},
    {name : "Brave",    raise : 1, drop : 3},
    {name : "Relaxed",  raise : 2, drop : 3},
    {name : "Serious",  raise : 3, drop : 3},
    {name : "Quiet",    raise : 4, drop : 3},
    {name : "Sassy",    raise : 5, drop : 3},
    {name : "Adamant",  raise : 1, drop : 4},
    {name : "Impish",   raise : 2, drop : 4},
    {name : "Jolly",    raise : 3, drop : 4},
    {name : "Bashful",  raise : 4, drop : 4},
    {name : "Careful",  raise : 5, drop : 4},
    {name : "Naughty",  raise : 1, drop : 5},
    {name : "Lax",      raise : 2, drop : 5},
    {name : "Naive",    raise : 3, drop : 5},
    {name : "Rash",     raise : 4, drop : 5},
    {name : "Quirky",   raise : 5, drop : 5}
];

var Type = {
    "Normal"        : 0,
    "Fighting"      : 1,
    "Flying"        : 2,
    "Poison"        : 3,
    "Ground"        : 4,
    "Rock"          : 5,
    "Bug"           : 6,
    "Ghost"         : 7,
    "Steel"         : 8,
    "Fire"          : 9,
    "Water"         : 10,
    "Grass"         : 11,
    "Electric"      : 12,
    "Psychic"       : 13,
    "Ice"           : 14,
    "Dragon"        : 15,
    "Dark"          : 16,
    "Fairy"         : 17,
    "???"           : 18,
};
for (var i in Type) {
    Type[Type[i]] = Type[i];
}
//  These are double what they should be. Halve the result every lookup
var typetable = [
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
];
//  Get the type effectiveness of the attack, 
var typeEffectiveness = function (user, move, foe) {
    if (!move.noeff) {
    var typeeff = 1, types = foe.getTypes();
    for (var i = 0; i < types.length; i++) {
        //  Flying Press, Freeze Dry
        if (move.typetable) {
            typeeff *= move.typetable(move.type, types[i]);
        }
        //  Levitate
        else if (foe.ability.typetable && foe.ability.usingtype(move.type)) {
            typeeff *= foe.ability.typetable(move.type, types[i]);
        }
        //  Standard table
        else {
            typeeff *= typetable[move.type][types[i]] >> 1;
        }
        //  Strong Winds
        if (field.weather.modifyTypeEffectiveness) {
            typeeff *= field.weather.modifyTypeEffectiveness(move.type, types[i]);
        }
    }
    return typeeff;
}

var Category = {
    "Status"        : 0,
    "Physical"      : 1,
    "Special"       : 2
];
for (var i in Category) {
    Category[Category[i]] = Category[i];
}

var Stat = {
    "HP"            : 0,
    "Attack"        : 1,
    "Defense"       : 2,
    "Special Attack": 3,
    "Special Defense":4,
    "Speed"         : 5,
    "Evasion"       : 6,
    "Accuracy"      : 7,
    "Critical"      : 8
];
for (var i in Stat) {
    Stat[Stat[i]] = Stat[i];
}

var Target = {
    "Self"          : 0,
    "Adjacent"      : 1,
    "Adjacent Ally" : 2,
    "Adjacent Foes" : 3,
    "All Adjacent"  : 4,
    "All"           : 5,
    "Ally Team"     : 6,
    "Foe Team"      : 7
];
for (var i in Target) {
    Target[Target[i]] = Target[i];
}


var Color = {
    "Red"           : 0,
    "Blue"          : 1,
    "Yellow"        : 2,
    "Green"         : 3,
    "Black"         : 4,
    "Brown"         : 5,
    "Purple"        : 6,
    "Gray"          : 7,
    "White"         : 8,
    "Pink"          : 9
];
for (var i in Color) {
    Color[Color[i]] = Color[i];
}

var LevelingRate = {
    "Erratic"       : 0,
    "Fast"          : 1,
    "Medium Fast"   : 2,
    "Medium Slow"   : 3,
    "Slow"          : 4,
    "Fluctuating"   : 5
];
for (var i in LevelingRate) {
    LevelingRate[LevelingRate[i]] = LevelingRate[i];
}

var EggGroup = {
    "Monster"       : 0,
    "Water 1"       : 1,
    "Bug"           : 2,
    "Flying"        : 3,
    "Field"         : 4,
    "Fairy"         : 5,
    "Grass"         : 6,
    "Human-Like"    : 7,
    "Water 3"       : 8,
    "Mineral"       : 9,
    "Amorphous"     : 10,
    "Water 2"       : 11,
    "Ditto"         : 12,
    "Dragon"        : 13,
    "Undiscovered"  : 14
];

for (var i in EggGroup) {
    EggGroup[EggGroup[i]] = EggGroup[i];
}

