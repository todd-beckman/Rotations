var Weather = [];
var Weather = {
    duration : 0,
    "None" : {
        getFlag : function () {
            return "None";
        },
        onStart : function () {},
        EOT_weatherContinues : function () {},
        onEnd : function () {},
    },
    "Rain" : {
        getFlag : function () {
            if (this.suppressed) {
                return "None";
            }
            return "Rain";
        },
        onStart : function () {
            game.write("It starts to rain.");
        },
        EOT_weatherContinues : function () {
            if (this.suppressed) {
                return;
            }
            game.write("Rain continues to fall.");
        }
        //  On countdown or other neutralizing effects.
        //  Does not fire when overridden by another type of weather
        onEnd : function () {
            game.write("The rain stops.");
        },
        getDamageMultiplier : function (user, move) {
            if (this.suppressed) {
                return 1;
            }
            if (move.type == Type.Water) {
                return 1.5;
            }
            else if (move.type == Type.Fire) {
                return 0.5;
            }
            return 1;
        }
    },
    "Sun" : {
        getFlag : function () {
            if (this.suppressed) {
                return "None";
            }
            return "Sun";
        },
        onStart : function () {
            game.write("The sunlight turns harsh.");
        },
        EOT_weatherContinues : function () {
            if (this.suppressed) {
                return;
            }
            game.write("The sunlight is strong.");
        }
        onEnd : function () {
            game.write("The sunlight fades.");
        },
        allowGetStatus : function (user, status) {
            return status != Status.Freeze;
        },
        getDamageMultiplier : function (user, move) {
            if (this.suppressed) {
                return 1;
            }
            if (move.type == Type.Fire) {
                return 1.5;
            }
            else if (move.type == Type.Water) {
                return 0.5;
            }
            return 1;
        }
    },
    "Sand" : {
        getFlag : function () {
            if (this.suppressed) {
                return "None";
            }
            return "Sand";
        },
        onStart : function () {
            game.write("A sandstorm kicks up.");
        },
        EOT_weatherContinues : function () {
            game.write("The sandstorm rages.");
        },
        onEnd : function () {
            game.write("The sandstorm subsides.");
        },
        statMultiplier : function(user, stat) {
            if (stat == Stat["SpecialDefense"]
            &&  user.allowSandBoost()) {
                return 1.5;
            }
            return 1;
        }
        EOT_weatherEffect : function (mon) {
            if (this.suppressed) {
                return;
            }
            if (mon.allowSandDamage()) {
                mon.onResidualDamage(mon.stats[Stat.HP] / 16,
                    mon.name() + " is buffeted by the sand.");
            }
        }
    },
    "Hail" : {
        getFlag : function () {
            if (this.suppressed) {
                return "None";
            }
            return "Hail";
        },
        onStart : function () {
            game.write("It starts to hail.");
        },
        EOT_weatherContinues : function () {
            if (this.suppressed) {
                return;
            }
            game.write("Hail continues to fall.");
        },
        onEnd : function () {
            game.write("The hail stops.");
        },
        EOT_weatherEffect : function (mon) {
            if (this.suppressed) {
                return;
            }
            if (mon.allowHailDamage()) {
                mon.onResidualDamage(mon.stats[Stat.HP] / 16,
                    mon.name() + " is buffeted by the Hail.");
            }
        }
    },
    "Heavy Rain" : {
        getFlag : function () {
            if (this.suppressed) {
                return "None";
            }
            return "Rain";
        },
        harsh : 1,
        onStart : function () {
            game.write("A heavy rain begins to fall!");
        },
        onEnd : function () {
            game.write("The heavy rain is lifting.");
        },
        allowWeatherChange : function (to) {
            //  harsh can be undefined
            if (to.harsh) {
                return true;
            }
            game.write("There is no relief from this heavy rain!");
            return false;
        },
        allowMove : function (move) {
            if (this.suppressed) {
                return true;
            }
            if (move.type == Type.Fire) {
                game.write("The Fire-type attack fizzled out in the heavy rain!");
                return false;
            }
            return true;
        }
    }
    "Harsh Sun" : {
        getFlag : function () {
            if (this.suppressed) {
                return "None";
            }
            return "Sun";
        },
        harsh : 1,
        onStart : function () {
            game.write("The sunlight turns extremely harsh!");
        },
        onEnd : function () {
            game.write("The harsh sunlight fades.");
        },
        allowWeatherChange : function (to) {
            //  harsh can be undefined
            if (to.harsh) {
                return true;
            }
            game.write("The extremely harsh sunlight was not lessened at all!");
            return false;
        },
        allowMove : function (move) {
            if (this.suppressed) {
                return true;
            }
            if (move.type == Type.Water) {
                game.write("The Water-type attak evaporated in the harsh sunlight!");
                return false;
            }
            return true;
        }
    }
    "Strong Wind" : {
        getFlag : function () {
            if (this.suppressed) {
                return "None";
            }
            return "Wind";
        },
        harsh : 1,
        onStart : function () {
            game.write("A mysterious air current is protecting Flying Pokemon!");
        },
        onEnd : function () {
            game.write("The mysterious air current dissipates.");
        },
        allowWeatherChange : function (to) {
            //  harsh can be undefined
            if (to.harsh) {
                return true;
            }
            game.write("The mysterious air current blows regardless");
            return false;
        },
        modifyTypeEffectiveness : function (movetype, deftype) {
            if (movetype == Type.Flying) {
                //  Remember 2 means neutral so 4 is super effective
                //  Apply move-specific table
                if (move.typetable
                &&  4 == move.typetable[move.type][types[i]]
                //  Apply mode-specific table (makes inverted not a mess)
                ||  4 == typetable[move.type][types[i]]) {
                    game.write("The mysterious air current weakens the attack!");
                    //  Halve the damage to negate the supereffective boost
                    return 0.5;
                }
            }
            return 1;
        }
    }
];
