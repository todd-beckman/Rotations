//  UI LOGIC

var print = function(message) {
    //  TODO: Set up print system
}

var print_e = function(message) {
    print("<b><font color='red'>" + message + "</font></b>");
}

var print_passive = function(message) {
    print("<i><font color='D0D0D0'>" + message + "</font></i>");
}

var animate = function (key) {
    //  Major TODO
}

//  INITIALIZING GAME

var numPlayers = 2;

var mode = Mode.Singles;

//  The associations to all players and mons
var Field = {
    //  One mon per slot or -1 for empty
    slots : [],

    //  Weather conditions
    weather : {
        duration : 0,
        type : 0,
    },
    //  Terrain conditions
    terrain : {
        duration : 0,
        type : 0
    },
    
    //  The duration of Magic Room
    magic_room : 0,

    //  The duration of Trick Room
    trick_room : 0,

    //  The duration of Wonder Room
    wonder_room : 0,

    /* HAZARDS: Rocks, Spikes, and Toxic Spikes.
        The game applies them in order of application,
        but it is more efficient to apply a strict order.
        Imitating the game's behavior will cause higher
        overhead and will not affect the game.
    */
    //  The presence of rocks set up on each team
    rocks : [false, false],

    //  The presence of spikes set up on each team
    spikes : [0, 0],

    toxic_spikes : [0, 0],

    //  The duration of Reflect for each team
    reflect : [0, 0];

    //  The duration of Light Screen for each team
    light_screen : [0, 0];

    //  The duration of Safeguard for each team
    safeguard : [0, 0];

    //  The duration of Mist for each team
    mist : [0, 0];

    //  The duration of Lucky Chant for each team
    lucky_chant : [0, 0];

    //  The queue for Future Sight and Doom Desire
    futuresight : [],

    //  The queue for Wish
    wish : [],

    //  The duration of Fire/Grass Pledge against each team
    fire_grass_pledge : [0, 0];

    //  The duration of Grass/Water Pledge against each team
    grass_water_pledge : [0, 0];

    //  The duration of Water/Fire Pledge against each team
    water_fire_pledge : [0, 0];
};

function FutureSight(mon, spatk, slot, isFutureSight) {
    this.name = mon;
    this.specialAttack = spatk;
    this.slot = slot;
    this.counter = 2;
    //  Allows Doom Desire and Future Sight to run on the same counter
    this.isFutureSight = isFutureSight;
    Field.futuresight.push(this)
}

function Wish(name, hp, slot) {
    this.name = name;
    this.hp = hp;
    this.slot = slot;
    this.counter = 1;
    Field.wish.push(this);
}

//  Define the field's slots
switch (mode) {
    //  One mon per slot
    case Mode.Singles:
        Field.slots = [[-1], [-1]];
        break;
    //  Two mons per slot
    case Mode.Doubles:
        Field.slots = [[-1, -1], [-1, -1]];
        break;
    //  Three mons per slot on both modes
    case Mode.Triples:
    case Mode.Rotations:
        Field.slots = [[-1, -1, -1], [-1, -1, -1]];
        break;
    //  One vs Five
    case Mode.Horde:
        Field.slots = [[-1], [-1, -1, -1, -1, -1]]
        break;
}

//  The associations to each player
function Player (name, color) {
    this.name = name;
    this.color = color;

    //  The mons on the full team including those dropped
    this.fullteam = [];

    //  The mons brought to the battle
    this.team = [];
};

//  Packs the player's name to the right color
Player.prototype.packName = function() {
    return "<b><font color='" + this.color + "'>"
        + this.name + "</font></b>";
}

//  TODO: Get Player names
var players = [new Player("Player 1", "red"),
               new Player("Player 2", "blue")];

// data should ideally come from JSON
function Mon(data) {
    this.stats = [0, 0, 0, 0, 0, 0];
    this.ability = Pokemon[data.id].ability[data.ability];
    this.type1 = Pokemon[data.id].type1;
    this.type2 = Pokemon[data.id].type2;

    var calc_stats = function(stats) {
        //  Good ol Math
        stats[Stat.HP] = Math.floor(
            (data.ivs[Stat.HP]
                + (2.0 * Pokemon[data.id].basestats[Stat.HP])
                + (data.evs[Stat.HP] / 4.0)
                + 100.0
            )
            * data.level / 100.0
            + 10.0
        );

        //  Map others for usage
        for (var i = 1; i < 6; i++) {
            stats[i] = Math.floor(
                (data.ivs[i]
                    + (2.0 * Pokemon[data.id].basestats[i])
                    + (data.evs.[i] / 4.0)
                )
                * data.level / 100.0
                + 5.0
            );
            //  Apply nature effects
            if (i == Nature[data.nature][0]) {
                stats[i] *= 1.1;
            }
            else if (i == nature[data.nature][1]) {
                stats[i] *= 0.9;
            }
        }
    };

    calcBaseStats(this.base_stats);

    this.hpleft = this.base_stats[Stat.HP];

    //  Duration affects Toxic and Sleep
    this.status = {
        type : 0,
        duration : 0
    };

    //  Apply things that will be changing
    this.resetTemporary();
};
Mon.prototype.copyTemporary = function(temp) {
    this.temp = temp;
}
Mon.prototype.resetTemporary = function() {
    this.temp = {
        stat_boosts : [0, 0, 0, 0, 0, 0, 0, 0],
        bind : {
            duration : 0,
            move : '(No Move)'
        },
        roosting : false,
        aqua_ring : false,
        ingrain : false,
        leechseed : -1, //  slot
        taunt : 0,      //  counter
        encore : 0,     //  counter
        disable : {
            duration : 0,
            slot : -1
        }
        magnet_rise : 0,//  counter
        telekinesis : 0,//  counter
        yawn : 0,       //  counter
        gravity : 0,    //  counter
        uproar : 0,     //  counter
        confused : 0,   //  counter
        attraction : {
            target : -1 //  slot
        },
        slow_start : 0, //  counter
        roosting : false,
        nightmare : false
    };
}
Mon.prototype.unboostedStat = function(stat) {
    switch (stat) {
        case 0:
            return hpleft;
        case 1: case 2: case 3: case 4: case 5: 
            return this.temp.stat_boosts[stat];
        default:
            print_e("Illegal Parameter Exception: Requesting unboosted stat " + stat);
            //  Return 1 because divisions by 0 cause problems
            return 1;
    }
}
//  Returns the calculated stat with boosts in mind
Mon.prototype.effectiveStat = function(stat) {
    switch (stat) {
        //  Nothing affects HP after game has started
        case 0:
            return this.stats[stat];

        //  Main stats are calculated based on 2
        case 1: case 2: case 3: case 4: case 5: 
            var value = this.temp.stat_boosts[stat];
            if (value < 1) {
                return this.stats[stat]
                    * (2.0 / (2 - value));// -(-v) means no /0
            }
            else if (value > 1) {
                return this.stats[stat]
                    * ((2 + value) / 2.0);
            }
            return this.stats[stat];

        //  Accuracy is calculated based on 3 instead of 2
        case 6:
            var value = this.temp.stat_boosts[stat];
            if (value < 1) {
                return 3.0 / (3 - value);// -(-v) means no /0
            }
            else if (value > 1{
                return (3 + value) / 3.0;
            }
            return 1;

        //  Evasion is the recipricol of Accuracy
        case 7:
            var value = this.temp.stat_boosts[stat];

            //  Some abilities increase evasion
            if (Field.weather.type == Weather["Sand"]
                && this.ability == Ability["Sand Veil"]
            ||  Field.weather.type == Weather["Ice"]
                && this.ability == Ability["Snow Cloak"]) {
                value++;
            }
            if (value < 1) {
                return (3 - value) / 3.0;
            }
            else if (value > 1{
                return 3.0 / (3 + value);// 3+v>0 always
            }
            return 1;

        default:
            print_e("Illegal Parameter Exception: Requesting effective stat " + stat);
            //  Return 1 because divisions by 0 cause problems
            return 1;
    }
}
//  Returns the damage dealt even if the mon faints early
Mon.prototype.hurt = function(damage) {
    if (this.hpleft == 0) {
        print_e("Illegal State Exception: Hurting a Mon at 0 HP.");
        return 0;
    }
    damage = Math.floor(damage);
    animate("hurt", this.getSlot());
    var soFar = 0;
    while (soFar < damage) {
        if (this.hpleft == 0) {
            animate("faint", this.getSlot());
            return soFar;
        }
        animate("hp bar", this.getSlot());
        soFar++;
        this.hpleft--;
    }
    return soFar;
}
//  Returns the HP healed even if the mon hits max
Mon.prototype.heal = function(health) {
    if (this.hpleft == this.stats[Stat.HP]) {
        print_passive(this.packName() + "'s HP is full.");
        return 0;
    }
    health = Math.floor(health);
    animate("heal", this.getSlot());
    var soFar = 0;
    while (soFar < health) {
        if (this.hpleft == this.stats[Stat.HP]) {
            return soFar;
        }
        animate("hp bar", this.getSlot());
        soFar++;
        this.hpleft++;
    }
    return soFar;
}

//  The mons sorted out by speed
var mons_turn_order = [];
var mons_by_speed = [];

var sortMonsBySpeed = function() {
    //  TODO: Populate this based on only speed
}

var findMonTurnOrder = function() {
    //  TODO: Populate this based on priority bracket and speed
}

var win = function(player) {
    print_passive(player.packName() + " won the battle!");
}

var endWeather = function () {
    if (Field.weather.duration < 0) {
        print_e("Illegal State Exception: Weather countdown below 0.");
        return;
    }
    if (Field.weather.duration > 0) {
        if (0 == --Field.weather.duration) {
            animate("weather_end", Weather[Field.weather.type]);
            switch (Weather[Field.weather.type]) {
                case "Rain":
                    print("The rain stopped.");
                    break;
                case "Sun":
                    print("The sun stopped.");
                    break;
                case "Sand":
                    print("The sand stopped.");
                    break;
                case "Hail":
                    print("The hail stopped.");
                    break;
                default:
                    print_e("Illegal State Exception: Nonstandard weather ending: " + Field.weather.type);
                    break;
            }
        }
    }
};

var weatherEffects = function() {
    //  No weather effects
    if (Field.weather.duration == 0) {
        return;
    }
    //  Pokemon are affected in order of speed
    for (var i = 0; i < mons_by_speed.length; i++) {
        var mon = mons_by_speed[i];
        switch (Weather[Field.weather.type]) {
            case "Rain":
                //  These heal by different percentages
                if (Ability["Rain Dish"] == mon.ability) {
                    animate("showability", mon.getSlot());
                    mon.heal(mon.stats[0] / 16.0);
                    break;
                }
                if (Ability["Dry Skin"] == mon.ability) {
                    animate("showability", mon.getSlot());
                    mon.heal(mon.stats[0] / 8.0);
                    break;
                }
                break;
            case "Sun":
                if (Ability["Dry Skin"] == mon.ability) {
                    animate("showability", mon.getSlot());
                    print_passive(mon.packName() + " is hurt by Dry Skin.");
                    mon.hurt(mon.stats[0] / 8.0);
                    break;
                }
                break;
            case "Sand":
                //  Ground, Rock, Steel are immune to sand damage
                if (-1 < [4, 5, 8].indexOf(mon.type1)
                ||  -1 < [4, 5, 8].indexOf(mon.type2)

                //  Safety Goggles prevents sand damage
                ||  Item["Safety Goggles"] == mon.item

                //  Some abilities provide immunity from sand damage
                ||  -1 < [
                    Ability["Magic Guard"],
                    Ability["Overcoat"],
                    Ability["Sand Veil"],
                    Ability["Sand Force"],
                    Ability["Sand Rush"]].indexOf(mon.ability)) {
                    break;
                }
                print_passive(mon.packName() + " is buffeted by the sand.");
                mon.hurt(mon.stats[0] / 16.0);
                break;
            case "Hail":
                //  Ice Body heals the mon
                if (Ability["Ice Body"] == mon.ability) {
                    animate("showability", mon.getSlot());
                    mon.heal(mon.stats[0] / 16.0);
                    break;
                }
                //  Ice mons don't take damage
                if (mon.type1 == Type["Ice"] || mon.type2 == Type["Ice"]

                //  Safety Googles prevents hail damage
                ||  Item["Safety Goggles"] == mon.item

                //  Some abilities provide immunity from hail damage
                ||  -1 < [
                    Ability["Snow Cloak"],
                    Ability["Magic Guard"],
                    Ability["Overcoat"]].indexOf(mon.ability)) {
                    break;
                }
                print_passive(mon.packName() + " is buffeted by the hail.");
                mon.hurt(mon.stats[0] / 16.0);
                break;
            default:
                print_e("Illegal State Exception: Weather aftereffects of illegal weather condition " + Field.weather.type);
                break;
        }
    }
};

var futureSightEnd = function() {
    for (var i = 0; i < Field.futuresight.length; i++) {
        if (Field.futuresight[i].counter == 0) {

            //  Apply wish's effect
            var fs = Field.futuresight[i];
            var slot = fs.slot;
            var mon = Field.slots[slot[0]][slot[1]];
            var move = Move[
                (fs.isFutureSight ? "Future Sight" : "Doom Desire")];
            if (fs.isFutureSight) {
                print_passive(mon.name + " took the Future Sight attack!");
            }
            else {
                print_passive(mon.name + " took the Doom Desire attack!");   
            }
            animate("move", move, slot);
            mon.hurt(damageCalc(Field.futuresight.mon, move, mon));

            //  Remove this wish
            Field.futureSight.splice(i, 1);
            i--;
        }
        //  Countdown
        else {
            Field.futuresight[i].counter--;
        }
    }
}

var wishEnd = function() {
    for (var i = 0; i < Field.wish.length; i++) {
        if (Field.wish[i].counter == 0) {

            //  Apply wish's effect
            var slot = Field.futureSight.slot;
            var mon = Field.slots[slot[0]][slot[1]];
            print_passive(Field.wish[i].name + "'s wish came true!");
            mon.heal(wish[i].hp);

            //  Remove this wish
            Field.wish.splice(i, 1);
            i--;
        }
        //  Countdown
        else {
            Field.wish[i].counter--;
        }
    }
};



var roostEnd = function() {
    //  Order is arbitrary because it doesn't matter
    for (var i = 0; i < mons_by_speed.length; i++) {
        //  Just deactivate roost
        mons_by_speed.roost = false;
    }
};

var endOfTurn = function() {
    //  Weather ends
    endWeather();

    //  Sandstorm, Hail, Rain Dish, Dry Skin, Ice Body
    weatherEffects();

    //  Future Sight, Doom Desire
    futureSightEnd();

    //  Wish
    wishEnd();
    
    //  Fire/Grass Pledge Damage

    //  Shed Skin, Hydration, Healer

    //  Leftovers, Black Sludge

    //  Aqua Ring

    //  Ingrain

    //  Leech Seed

    //  Poison, Burn, Poison Heal

    //  Nightmare

    //  Ghost Curse

    //  Bind, Wrap, Fire Spin, Clamp, Whirlpool, Sand Tomb, Magma Storm

    //  Taunt

    //  Encore

    //  Disable, Cursed Body

    //  Magnet Rise

    //  Telekinesis

    //  Heal Block

    //  Embargo

    //  Yawn

    //  Perish Song

    //  Reflect

    //  Light Screen

    //  Safeguard

    //  Mist

    //  Tailwind

    //  Lucky Chant

    //  Pledges

    //  Gravity

    //  Trick Room

    //  Wonder Room

    //  Magic Room

    //  Uproar

    //  Speed Boost, Bad Dreams, Harvest, Moody

    //  Orb Activation, Sticky barb

    //  Zen Mode

    //  Pokemon switched in upon faint

    //  Healing Wish, Lunar Dance

    //  Spikes, Toxic Spikes, Stealth Rock (hurt in order applied)

    //  Slow Start

    //  Roost returns
    roostEnd();
}

var loop = function () {
    
}

var start = function () {
    onfield1 = sendOutPokemon(0);
    loop();
}

var getTeamFrom = function(player) {
    //  TODO: Load the team
}

var teampreview = function () {
    team1 = getTeamFrom(players[0]);
    team2 = getTeamFrom(players[1]);
    start();
}

