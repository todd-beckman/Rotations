var Stat = {
    "HP"                : 0,
    "Attack"            : 1,
    "Defense"           : 2,
    "Speed"             : 3,
    "Special Attack"    : 4,
    "Special Defense"   : 5,
    "Accuracy"          : 6,
    "Evasion"           : 7,
    "Critical"          : 8
}

var StatDisplay = [
    //  TODO: Translate these
    ["HP"],
    ["Attack"],
    ["Defense"],
    ["Speed"],
    ["Special Attack"],
    ["Special Defense"],
    ["Accuracy"],
    ["Evasion"],
    ["Critical"]
];

var calcStat = function (mon, stat) {
    return Math.floor(calcUnmodifiedStat(mon, stat) * calcStageMultiplier(mon, stat));
}

var calcUnmodifiedStat = function (mon, stat) {
    if (stat == Stat.HP) {
        //  Shedinja
        if (Pokedex[mon.id].stats[stat] == 1) {
            return 1;
        }
        return Math.floor((
                mon.ivs[stat]
                + Pokedex[mon.id].stats[stat] << 1
                + mon.evs[stat] >> 2
            ) * mon.level / 100
        ) + 10;
    }
    //  Anything except Accuracy, Evasion, Critical
    if (stat < 6) {
        var value = ((
                mon.ivs[stat]
                + Pokedex[mon.id].stats[stat] << 1
                + mon.evs[stat] >> 2
            ) * mon.level / 100
        ) + 5;
        var modifier = value / 10;
        if (natureRaises(mon.nature) == stat) {
            value += modifier;
        }
        if (natureLowers(mon.nature) == stat) {
            value -= modifier;
        }
        return Math.floor(stat);
    }
    //  No base value for Accuracy, Evasion, Critical
    //  Just skip to the multiplier
    return 1;
};

var calcStageMultiplier = function (mon, stat) {
    if (stat == Stat.HP) {
        return 1;
    }
    var stages = mon.temp.boosts[stat]
    if (stat == Stat.Critical) {
        //  Shouldn't happen
        if (stages < 0) {
            return 0;
        }
        switch (stages) {
            case 0 : return 1/16;
            case 1 : return 1/8;
            case 2 : return 1/2;
            default : return 1;
        }
    }
    var denom = stat < 6 ? 2 : 3;
    if (stages < 0) {
        return denom / (denom - stages);
    }
    return (denom + stages) / denom;
}