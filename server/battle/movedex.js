
/*
Move event list

SI- Switch-in
1- SI_onSwitchIn
2- SI_onEntryEffect

EOT- End of Turn
3.1- EOT_onSlotCountdownAttack
8.1- EOT_onDrainToSlot (leech seed)
9.1- EOT_onGradualDamage (nightmare, curse)
10.1- EOT_onTrappingCountdown
11.1- EOT_onVolatileCountdown

effects : {
    flinch : 0,
    crit : 0,
    ohko : 0,
    recharge : 0,
    status : {type: percent,etc},
    confuse : percent,
    userboost : {stat: [stages,odds],etc}, //  used for + and -
    foeboost : {stat: [stages,odds],etc},  //  used for + and -
}

*/

var Movedex = [
    {
        name:"No Move",
        desc:"",
        category:0,
        pp:1,
        power:0,
        accuracy:0,
        type:18,
        target:1,
        flags:{}
    },
    {
        name:"Pound",
        desc:"Deals damage.",
        category:1,
        pp:35,
        power:40,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Karate Chop",
        desc:"Deals damage. High chance of critical hits.",
        category:1,
        pp:25,
        power:50,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{crit:1}
    },
    {
        name:"Double Slap",
        desc:"Deals damage 2-5 times.",
        category:1,
        pp:10,
        power:15,
        accuracy:85,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        getHitCount : multihit
    },
    {
        name:"Comet Punch",
        desc:"Deals damage 2-5 times.",
        category:1,
        pp:15,
        power:18,
        accuracy:85,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1},
        getHitCount : multihit
    },
    {
        name:"Mega Punch",
        desc:"Deals damage.",
        category:1,
        pp:20,
        power:80,
        accuracy:85,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1}
    },
    {
        name:"Pay Day",
        desc:"Deals damage and increases payment output.",
        category:1,
        pp:20,
        power:40,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1},
        onSuccess : function () {
            game.write("Coins scatter around!");
        }
    },
    {
        name:"Fire Punch",
        desc:"Deals damage and may cause a burn (10%).",
        category:1,
        pp:15,
        power:75,
        accuracy:100,
        type:9,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1},
        effects:{status:{Status.Burn:10}}
    },
    {
        name:"Ice Punch",
        desc:"Deals damage and may cause a freeze (10%).",
        category:1,
        pp:15,
        power:75,
        accuracy:100,
        type:14,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1},
        effects:{status:{Status.Freeze:10}}
    },
    {
        name:"Thunder Punch",
        desc:"Deals damage and may cause paralysis (10%).",
        category:1,
        pp:15,
        power:75,
        accuracy:100,
        type:12,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1},
        effects:{status:{Status.Paralyze:10}}
    },
    {
        name:"Scratch",
        desc:"Deals damage.",
        category:1,
        pp:35,
        power:40,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Vice Grip",
        desc:"Deals damage.",
        category:1,
        pp:30,
        power:55,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Guillotine",
        desc:"Knocks out the target in one hit.",
        category:1,
        pp:5,
        power:0,
        accuracy:30,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{ohko:1}
    },
    {
        name:"Razor Wind",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:0,
        target:31,
        flags:{protect:1,mirror:1},
        takeChargeTurn : function (user) {
            if (user.nocopy.chargingg) {
                return user.nocopy.chargingg = false;
            }
            game.write(user.name() + " is stirring a whirlwind.");
            return user.nocopy.chargingg = true;
        }
    },
    {
        name:"Swords Dance",
        desc:"Sharply raises the user's Attack.",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Attack:[2]}}
    },
    {
        name:"Cut",
        desc:"Deals damage.",
        category:1,
        pp:30,
        power:50,
        accuracy:95,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Gust",
        desc:"Deals damage. Doubles power if the foe is up high.",
        category:2,
        pp:35,
        power:40,
        accuracy:100,
        type:2,
        target:1,
        flags:{protect:1,mirror:1,distance:1,hitflying:2}
    },
    {
        name:"Wing Attack",
        desc:"Deals damage.",
        category:1,
        pp:35,
        power:60,
        accuracy:100,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,distance:1}
    },
    {
        name:"Whirlwind",
        desc:"Forces the target to switch.",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{magic:1,mirror:1,skipsub:1},
        priority:-6,
        effects:{forceswitch:1}
    },
    {
        name:"Fly",
        desc:"Evades most moves first turn, deals damage the second.",
        category:1,
        pp:15,
        power:90,
        accuracy:95,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,gravity:1,distance:1},
        takeChargeTurn : function (user) {
            if (user.nocopy.chargingg) {
                return user.nocopy.flying = user.nocopy.chargingg = false;
            }
            game.write(user.name() + " flies up high.");
            return user.nocopy.flying = user.nocopy.chargingg = true;
        }
    },
    {
        name:"Bind",
        desc:"Damages the foe, traps it, and hurts it for 4-5 turns.",
        category:1,
        pp:20,
        power:15,
        accuracy:85,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        onSuccess : function (user, foe) {
            foe.temp.trapping.push({
                move:this,
                run:"EOT_onTrappingCountdown",
                params:[user, foe],
                duration:bindduration(user, foe)
            });
        },
        EOT_onTrappingCountdown : function (user, foe) {
            bind(user, foe, foe.name() + " is wrapped by " + user.name());
        }
    },
    {
        name:"Slam",
        desc:"Deals damage.",
        category:1,
        pp:20,
        power:80,
        accuracy:75,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Vine Whip",
        desc:"Deals damage.",
        category:1,
        pp:25,
        power:45,
        accuracy:100,
        type:11,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Stomp",
        desc:"Deals damage. Doubles in power if the foe has used Minimize."category:1,
        pp:20,
        power:65,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1,nonsky:1},
        getPower : function (user, foe) {
            return this.power * (foe.temp.minimize ? 2 : 1);
        }
    },
    {
        name:"Double Kick",
        category:1,
        pp:30,
        power:30,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        getHitCount : function () { return 2; }
    },
    {
        name:"Mega Kick",
        desc:"Deals damage.",
        category:1,
        pp:5,
        power:120,
        accuracy:75,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Jump Kick",
        category:1,
        pp:10,
        power:100,
        accuracy:95,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,gravity:1}
    },
    {
        name:"Rolling Kick",
        desc:"Deals damage and may cause flinching.",
        category:1,
        pp:15,
        power:60,
        accuracy:85,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{flinch:30}
    },
    {
        name:"Sand Attack",
        desc:"Lowers the foe's Accuracy.",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:4,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{foeboost:{Stat.Accuracy:[-1]}
    },
    {
        name:"Headbutt",
        desc:"Deals damage and may cause flinching.",
        category:1,
        pp:15,
        power:70,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{flinch:30}
    },
    {
        name:"Horn Attack",
        desc:"Deals damage.",
        category:1,
        pp:25,
        power:65,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Fury Attack",
        desc:"Deals damage 2-5 times.",
        category:1,
        pp:20,
        power:15,
        accuracy:85,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        getHitCount : multihit
    },
    {
        name:"Horn Drill",
        desc:"Knocks out the target in one hit.",
        category:1,
        pp:5,
        power:0,
        accuracy:30,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{ohko:1}
    },
    {
        name:"Tackle",
        desc:"Deals damage.",
        category:1,
        pp:35,
        power:50,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Body Slam",
        desc:"Deals damage, may paralyze (30%), and doubles power against Minimize users.",
        category:1,
        pp:15,
        power:85,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1,nonsky:1},
        effects:{status:{Status.Paralyze,30}},
        getPower : function (user, foe) {
            return this.power * (foe.temp.minimize ? 2 : 1);
        }
    },
    {
        name:"Wrap",
        desc:"Damages the foe, traps it, and hurts it for 4-5 turns.",
        category:1,
        pp:20,
        power:15,
        accuracy:90,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        onSuccess : function (user, foe) {
            foe.temp.trapping.push({
                move:this,
                run:"EOT_onTrappingCountdown",
                params:[user, foe],
                duration:bindduration(user, foe)
            });
        },
        EOT_onTrappingCountdown : function (user, foe) {
            bind(user, foe, foe.name() + " is wrapped by " + user.name());
        }
    },
    {
        name:"Take Down",
        desc:"Deals damage and causes 1/4 recoil.",
        category:1,
        pp:20,
        power:90,
        accuracy:85,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        recoil:0.25
    },
    {
        name:"Thrash",
        desc:"User rampages for 2-3 turns, and then calms with confusion.",
        category:1,
        pp:10,
        power:120,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        onSuccess : function (user) {
            rampage(user, this);
        }
    },
    {
        name:"Double-Edge",
        desc:"Deals damage and causes 1/3 recoil.",
        category:1,
        pp:15,
        power:120,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        recoil:1/3}
    },
    {
        name:"Tail Whip",
        desc:"Lowers the target's Defense.",
        category:0,
        pp:30,
        power:0,
        accuracy:100,
        type:0,
        target:3,
        flags:{protect:1,magic:1,mirror:1},
        effects:{foeboost:{Stat.Defense:[-1]}}
    },
    {
        name:"Poison Sting",
        desc:"Deals damage and may cause poisoning (30%).",
        category:1,
        pp:35,
        power:15,
        accuracy:100,
        type:3,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Poison:30}}
    },
    {
        name:"Twineedle",
        category:1,
        pp:20,
        power:25,
        accuracy:100,
        type:6,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Poison:20}},
        getHitCount : function() { return 2;}
    },
    {
        name:"Pin Missile",
        desc:"Deals damage 2-5 times.",
        category:1,
        pp:20,
        power:25,
        accuracy:95,
        type:6,
        target:1,
        flags:{protect:1,mirror:1},
        getHitCount:multihit
    },
    {
        name:"Leer",
        desc:"Lowers the Defense of the opposing Pokemon.",
        category:0,
        pp:30,
        power:0,
        accuracy:100,
        type:0,
        target:3,
        flags:{protect:1,magic:1,mirror:1},
        effects:{foeboost:{Stat.Defense:[-1]}}
    },
    {
        name:"Bite",
        desc:"Deals damage and may cause flinching.",
        category:1,
        pp:25,
        power:60,
        accuracy:100,
        type:16,
        target:1,
        flags:{jaw:1,contact:1,protect:1,mirror:1},
        effects:{flinch:30}
    },
    {
        name:"Growl",
        desc:"Lowers the Defense of the opposing Pokemon.",
        category:0,
        pp:40,
        power:0,
        accuracy:100,
        type:0,
        target:3,
        flags:{protect:1,magic:1,mirror:1,sound:1,skipsub:1},
        effects:{foeboost:{Stat.Attack:[-1]}
    },
    {
        name:"Roar",
        desc:"Forces the target to switch.",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{magic:1,mirror:1,sound:1,skipsub:1},
        priority:-6,
        effects:{forceswitch:1}
    },
    {
        name:"Sing",
        desc:"Puts the target to sleep.",
        category:0,
        pp:15,
        power:0,
        accuracy:55,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1,sound:1,skipsub:1},
        effects:{status{Status.Sleep,100}}
    },
    {
        name:"Supersonic",
        desc:"Confuses the target.",
        category:0,
        pp:20,
        power:0,
        accuracy:55,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1,sound:1,skipsub:1},
        effects:{confuse:100}
    },
    {
        name:"Sonic Boom",
        desc:"Deals 20 damage to the target.",
        category:2,
        pp:20,
        power:0,
        accuracy:90,
        type:0,
        target:1,
        flags:{protect:1,mirror:1},
        getExactDamage : function () { return 20; }
    },
    {
        name:"Disable",
        desc:"Prevents the foe from using its last move.",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1,flowerveil:1},
        preCondition : function (user, foe) {
            return (foe.nocopy.lastmove != -1);
        },
        onSuccess : function (user, foe) {
            disable(user, foe);
        }
    },
    {
        name:"Acid",
        desc:"Deals damage and may lower the target's Special Defense (10%).",
        category:2,
        pp:30,
        power:40,
        accuracy:100,
        type:3,
        target:3,
        flags:{protect:1,mirror:1},
        effects:{foeboost:{Stat["Special Defense"]:[-1,10]}}
    },
    {
        name:"Ember",
        desc:"Deals damage and may burn the target (10%).",
        category:2,
        pp:25,
        power:40,
        accuracy:100,
        type:9,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Burn:10}}
    },
    {
        name:"Flamethrower",
        desc:"Deals damage and may burn the target (10%).",
        category:2,
        pp:15,
        power:90,
        accuracy:100,
        type:9,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Burn:10}}
    },
    {
        name:"Mist",
        desc:"Protects the user's team from stat drops for 5 turns.",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:14,
        target:6,
        flags:{snatch:1},
        onSuccess : function (user) {
            game.write(user.name() + "'s team is shrouded in mist.");
            user.team.mist = 5;
        }
    },
    {
        name:"Water Gun",
        desc:"Deals damage.",
        category:2,
        pp:25,
        power:40,
        accuracy:100,
        type:10,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Hydro Pump",
        desc:"Deals damage.",
        category:2,
        pp:5,
        power:110,
        accuracy:80,
        type:10,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Surf",
        desc:"Deals damage. Doubles power against Dive users.",
        category:2,
        pp:15,
        power:90,
        accuracy:100,
        type:10,
        target:4,
        flags:{protect:1,mirror:1,nonsky:1,hitdive:2}
    },
    {
        name:"Ice Beam",
        desc:"Deals damage and may freeze the target (10%).",
        category:2,
        pp:10,
        power:90,
        accuracy:100,
        type:14,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Freeze:10}}
    },
    {
        name:"Blizzard",
        desc:"Deals damage and may freeze the opposing Pokemon(10%).",
        category:2,
        pp:5,
        power:110,
        accuracy:70,
        type:14,
        target:3,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Freeze:10}},
        getAccuracy : function () {
            if (field.weather.type == Weather.Hail) {
                return true;
            }
            if (field.weather.type == Weather.None) {
                return 50;
            }
            return this.accuracy;
        }
    },
    {
        name:"Psybeam",
        desc:"Deals damage and may confuse the target (10%).",
        category:2,
        pp:20,
        power:65,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{confuse:10}
    },
    {
        name:"Bubble Beam",
        desc:"Deals damage and may lower the target's Speed (10%).",
        category:2,
        pp:20,
        power:65,
        accuracy:100,
        type:10,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{foeboost:{Stat.Speed:[-1,10]}}
    },
    {
        name:"Aurora Beam",
        desc:"Deals damage and may lower the target's Attack.",
        category:2,
        pp:20,
        power:65,
        accuracy:100,
        type:14,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{foeboost:{Stat.Attack:[-1,10]}}
    },
    {
        name:"Hyper Beam",
        desc:"Deals damage. The user must then recharge.",
        category:2,
        pp:5,
        power:150,
        accuracy:90,
        type:0,
        target:1,
        flags:{reprotect:1,mirror:1},
        effects:{recharge:1}
    },
    {
        name:"Peck",
        desc:"Deals damage.",
        category:1,
        pp:35,
        power:35,
        accuracy:100,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,distance:1}
    },
    {
        name:"Drill Peck",
        desc:"Deals damage.",
        category:1,
        pp:20,
        power:80,
        accuracy:100,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,distance:1}
    },
    {
        name:"Submission",
        desc:"Deals damage and causes 1/4 recoil.",
        category:1,
        pp:20,
        power:80,
        accuracy:80,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        recoil:0.25
    },
    {
        name:"Low Kick",
        desc:"The heavier the target, the more damage this move does.",
        category:1,
        pp:20,
        power:0,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        getPower : function (user, foe) {
            var w = foe.template.weight;
            if (w < 10) return 20;
            if (w < 25) return 40;
            if (w < 50) return 60;
            if (w < 100) return 80;
            if (w < 200) return 100;
            return 120;
        }
    },
    {
        name:"Counter",
        desc:"User waits, and then ",
        category:1,
        pp:20,
        power:0,
        accuracy:100,
        type:1,
        target:0,
        flags:{contact:1,protect:1},
        priority:-5,
        preCondition : function (user) {
            return user.thisturn.damage.physical != undefined;
        },
        getTarget : function (user) {
            return user.thisturn.damage.lastattacker;
        }
        getExactDamage : function(user) {
            //  Always does 1 damage, in case of tricks like False Swipe.
            return use.thisturn.damage.physical * 2 || 1;
        }
    },
    {
        name:"Seismic Toss",
        desc:"Deals damage equal to the user's level.",
        category:1,
        pp:20,
        power:0,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,nonsky:1},
        getExactDamage : function (user, foe) {
            return user.build.level;
        }
    },
    {
        name:"Strength",
        desc:"Deals damage.",
        category:1,
        pp:15,
        power:80,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Absorb",
        desc:"Deals damage and drains 1/2.",
        category:2,
        pp:25,
        power:20,
        accuracy:100,
        type:11,
        target:1,
        flags:{protect:1,mirror:1,heal:1},
        drain:0.5
    },
    {
        name:"Mega Drain",
        desc:"Deals damage and drains 1/2.",
        category:2,
        pp:15,
        power:40,
        accuracy:100,
        type:11,
        target:1,
        flags:{protect:1,mirror:1,heal:1},
        drain:0.5
    },
    {
        name:"Leech Seed",
        desc:"Drains 1/8 of the target's health per turn to the user's slot.",
        category:0,
        pp:10,
        power:0,
        accuracy:90,
        type:11,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        onSuccess : function (user, foe) {
            foe.gradualdrain.push({
                move:this,
                run:"EOT_onDrainToSlot",
                params:[foe, user.slot]
            });
        }
        EOT_onDrainToSlot : function (from, to) {
            drain(from, from.stats[Stat.HP]/8, field.slots[to], 1);
        }
    },
    {
        name:"Growth",
        desc:"Raises Attack and Special Attack; sharply in the Sun.",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1},
        onSuccess : function (user) {
            if (field.weather.type == Weather.Sun) {
                user.onStatChange(Stat["Attack"], 2);
                user.onStatChange(Stat["Special Attack"], 2);
            }
            else {
                user.onStatChange(Stat["Attack"], 1);
                user.onStatChange(Stat["Special Attack"], 1);
            }
        }
    },
    {
        name:"Razor Leaf",
        desc:"Deals damage. High chance of Critical Hits.",
        category:1,
        pp:25,
        power:55,
        accuracy:95,
        type:11,
        target:3,
        flags:{protect:1,mirror:1},
        effects:{crit:1}
    },
    {
        name:"Solar Beam",
        desc:"Absorb sunlight and then attack. No charge needed in the sunlight.",
        category:2,
        pp:10,
        power:120,
        accuracy:100,
        type:11,
        target:1,
        flags:{protect:1,mirror:1},
        takeChargeTurn : function (user) {
            if (user.charging) {
                return user.charging = false;
            }
            game.write(user.name() + " is absorbing sunlight.");
            if (field.weather.type == Weather.Sun) {
                return false;
            }
            return user.charging = true;
        }
    },
    {
        name:"Poison Powder",
        desc:"Poisons the target.",
        category:0,
        pp:35,
        power:0,
        accuracy:75,
        type:3,
        target:1,
        flags:{powder:1,protect:1,magic:1,mirror:1},
        effects:{status:{Status.Poison:100}}
    },
    {
        name:"Stun Spore",
        desc:"Poisons the target.",
        category:0,
        pp:30,
        power:0,
        accuracy:75,
        type:11,
        target:1,
        flags:{powder:1,protect:1,magic:1,mirror:1},
        effects:{status:{Status.Paralyze:100}}
    },
    {
        name:"Sleep Powder",
        desc:"Poisons the target.",
        category:0,
        pp:15,
        power:0,
        accuracy:75,
        type:11,
        target:1,
        flags:{powder:1,protect:1,magic:1,mirror:1},
        effects:{status:{Status.Sleep:100}}
    },
    {
        name:"Petal Dance",
        desc:"User rampages for 2-3 turns, and then calms down with confusion.",
        category:2,
        pp:10,
        power:120,
        accuracy:100,
        type:11,
        target:0,
        flags:{contact:1,protect:1,mirror:1},
        onSuccess : function (user, foe) {
            rampage(user, foe);
        }
    },
    {
        name:"String Shot",
        desc:"Lowers the Speed of the opposing Pokemon.",
        category:0,
        pp:40,
        power:0,
        accuracy:95,
        type:6,
        target:3,
        flags:{protect:1,magic:1,mirror:1},
        effects:{foeboost:{Stat.Speed:[-1]}}
    },
    {
        name:"Dragon Rage",
        desc:"Deals 40 damage to the target.",
        category:2,
        pp:10,
        power:0,
        accuracy:100,
        type:15,
        target:1,
        flags:{protect:1,mirror:1},
        getExactDamage : function () { return 40; }
    },
    {
        name:"Fire Spin",
        desc:"Damages the foe, traps it, and hurts it for 4-5 turns.",
        category:2,
        pp:15,
        power:35,
        accuracy:85,
        type:9,
        target:1,
        flags:{protect:1,mirror:1},
        onSuccess : function (user, foe) {
            foe.temp.trapping.push({
                move:this,
                run:"EOT_onTrappingCountdown",
                params:[user, foe],
                duration:bindduration(user, foe)
            });
        },
        EOT_onTrappingCountdown : function (user, foe) {
            bind(user, foe, foe.name() + " is hurt by " + user.name());
        }
    },
    {
        name:"Thunder Shock",
        desc:"Deals damage and may paralyze the target (10%).",
        category:2,
        pp:30,
        power:40,
        accuracy:100,
        type:12,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Paralyze:10}}
    },
    {
        name:"Thunderbolt",
        desc:"Deals damage and may paralyze the target (10%).",
        category:2,
        pp:15,
        power:90,
        accuracy:100,
        type:12,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Paralyze:10}}
    },
    {
        name:"Thunder Wave",
        desc:"Paralyzes the target.",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:12,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{status:{Status.Paralyze:100}}
    },
    {
        name:"Thunder",
        desc:"Deals damage, may paralyze the target (30%), and always hits in the rain.",
        category:2,
        pp:10,
        power:110,
        accuracy:70,
        type:12,
        target:1,
        flags:{protect:1,mirror:1,hitfly:1},
        effects:{status:{Status.Paralyze:30}},
        getAccuracy : function () {
            if (field.weather.type == Weather.Rain) {
                return true;
            }
            if (field.weather.type == Weather.None) {
                return 50;
            }
            return this.accuracy;
        }
    },
    {
        name:"Rock Throw",
        desc:"Deals daamge.",
        category:1,
        pp:15,
        power:50,
        accuracy:90,
        type:5,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Earthquake",
        desc:"Deals damage.",
        category:1,
        pp:10,
        power:100,
        accuracy:100,
        type:4,
        target:4,
        flags:{protect:1,mirror:1,nonsky:1,hitdigging:2}
    },
    {
        name:"Fissure",
        desc:"Knocks out the target in one it.",
        category:1,
        pp:5,
        power:0,
        accuracy:30,
        type:4,
        target:1,
        flags:{protect:1,mirror:1,nonsky:1},
        effects:{ohko:1}
    },
    {
        name:"Dig",
        category:1,
        pp:10,
        power:80,
        accuracy:100,
        type:4,
        target:1,
        flags:{contact:1,protect:1,mirror:1,nonsky:1},
        takeChargeTurn : function (user) {
            if (user.nocopy.chargingg) {
                return user.nocopy.digging = user.nocopy.chargingg = false;
            }
            game.write(user.name() + " flies up high.");
            return user.nocopy.digging = user.nocopy.chargingg = true;
        }
    },
    {
        name:"Toxic",
        desc:"Badly poisons the target.",
        category:0,
        pp:10,
        power:0,
        accuracy:90,
        type:3,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{status:{Status.BadPoison:100}}
    },
    {
        name:"Confusion",
        desc:"Deals damage and may confuse the target (10%).",
        category:2,
        pp:25,
        power:50,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{confuse:10}
    },
    {
        name:"Psychic",
        desc:"Deals damage and may lower the target's Special Defense.",
        category:2,
        pp:10,
        power:90,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{foeboost:{Stat["Special Defense"]:[-1,10]}}
    },
    {
        name:"Hypnosis",
        desc:"Puts the target to sleep.",
        category:0,
        pp:20,
        power:0,
        accuracy:60,
        type:13,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{status:{Status.Sleep:100}}
    },
    {
        name:"Meditate",
        desc:"Raises the user's Attack.",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Attack:[1]}
    },
    {
        name:"Agility",
        desc:"Sharply raises the user's Speed.",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Speed:[2]}
    },
    {
        name:"Quick Attack",
        desc:"Deals damage with priority.",
        category:1,
        pp:30,
        power:40,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:1
    },
    {
        name:"Rage",
        desc:"Deals damage. Raises the user's Attack when hit.",
        category:1,
        pp:20,
        power:20,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        extraAttackStage : function (user) {
            return user.temp.rage;
        }
    },
    {
        name:"Teleport",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{},
        preConditions : function () {return false;}
    },
    {
        name:"Night Shade",
        category:2,
        pp:15,
        power:0,
        accuracy:100,
        type:7,
        target:1,
        flags:{protect:1,mirror:1},
        getExactDamage : function (user, foe) { return user.build.level; }
    },
    {
        name:"Mimic",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{protect:1,skipsub:1},
        preConditions : function (user, foe) {
            //  Must have made a move
            if (foe.nocopy.lastmove == -1) {
                return false;
            }
            var move = foe.nocopy.lastmove;
            //  Can't copy certain moves
            if (Movedex[move].nomimic) {
                return false;
            }
            //  Must not know the move
            if (-1 < user.moves.indexOf(move)) {
                return false;
            }
            return true;
        },
        onSuccess : function (user, foe) {
            var move = foe.nocopy.lastmove;
            var i = user.thisturn.decision.move;
            user.moves[i] = move.num;
            user.pp[i] = 5;
            game.write(user.name() + " learns " + move.name + ".");
        }
    },
    {
        name:"Screech",
        desc:"Sharply lowers the target's Defense.",
        category:0,
        pp:40,
        power:0,
        accuracy:85,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1,sound:1,skipsub:1},
        effects:{foeboost:{Stat.Defense:[-2]}}
    },
    {
        name:"Double Team",
        desc:"Raises the user's Evasion.",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Evasion:[1]}}
    },
    {
        name:"Recover",
        desc:"Restores up to half of the user's maximum HP.",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1,heal:1},
        onSuccess : function (user) {
            user.onHeal(user.stats[Stat.HP] / 2);
        }
    },
    {
        name:"Harden",
        desc:"Raises the user's Defense.",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Defense:[1]}}
    },
    {
        name:"Minimize",
        desc:"Sharply raises the user's Evasion.",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Evasion:[2]}},
        onSuccess : function (user) {
            user.temp.minimize = true;
        }
    },
    {
        name:"Smokescreen",
        desc:"Lowers the target's Accuracy.",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{foeboost:{Stat.Accuracy:[-1]}}
    },
    {
        name:"Confuse Ray",
        desc:"Confuses the target.",
        category:0,
        pp:10,
        power:0,
        accuracy:100,
        type:7,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{confuse:100}
    },
    {
        name:"Withdraw",
        desc:"Raises the user's Defense.",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:10,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Defense:[1]}}
    },
    {
        name:"Defense Curl",
        desc:"Raises the user's Defense.",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Defense:[1]}},
        onSuccess : function (user) {
            user.temp.rollout = 1;
        }
    },
    {
        name:"Barrier",
        desc:"Sharply raises the user's Defense.",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Defense:[2]}}
    },
    {
        name:"Light Screen",
        desc:"Halves the power of Special attacks against the team for 5 turns.",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:13,
        target:6,
        flags:{snatch:1},
        onSuccess : function (user) {
            user.team.lightscreen = (user.item && user.item.extend.lightscreen) ? 8 : 5;
        }
    },
    {
        name:"Haze",
        desc:"Eliminates all stat changes.",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:14,
        target:5,
        flags:{skipsub:1},
        onSuccess : function (user, foe) {
            foe.temp.boosts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        },
        onComplete : function () {
            game.write("All stat changes were eliminiated.");
        }
    },
    {
        name:"Reflect",
        desc:"Halves the power of Physical attacks against the ateam for 5 turns.",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:13,
        target:6,
        flags:{snatch:1},
        onSuccess : function (user) {
            user.team.reflect = (user.item && user.item.extend.reflect) ? 8 : 5;
        }
    },
    {
        name:"Focus Energy",
        desc:"Sharply raises the user's Critical Hit ratio.",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Critical:[2]}}
    },
    {
        name:"Bide","The user waits for two turns and attacks the third, doubling the damage it took.",
        category:1,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{contact:1,protect:1},
        priority:1,
        takeChargeTurn : function (user) {
            if (!user.temp.bide) {
                user.temp.bide = {countdown : 3, damage : 0, target : 0}
            }
            switch (user.temp.bide.countdown--) {
                case 2:
                    game.write(user.name() + " is biding its time.");
                    return true;
                case 1:
                    game.write(user.name() + " is storing energy!");
                    return true;
                case 0:
                    game.write(user.name() + " unleashed energy!");
                    if (user.temp.bide.target && user.temp.bide.damage) {
                        user.temp.bide.target.onDamage(user, this,
                            user.temp.bide.damage * 2);
                    }
                    return false;
            }
        }
    },
    {
        name:"Metronome",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{nomimic:1}
    },
    {
        name:"Mirror Move",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:2,
        target:1,
        flags:{}
    },
    {
        name:"Self-Destruct",
        desc:"The user faints, dealing massive damage.",
        category:1,
        pp:5,
        power:200,
        accuracy:100,
        type:0,
        target:4,
        flags:{protect:1,mirror:1},
        preCondition : function (user) {
            user.health = 0;
            return true;
        }
    },
    {
        name:"Egg Bomb",
        desc:"Deals damage.",
        category:1,
        pp:10,
        power:100,
        accuracy:75,
        type:0,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Lick",
        desc:"Deals damage and may paralyze the target (30%).",
        category:1,
        pp:30,
        power:30,
        accuracy:100,
        type:7,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{status:{Status.Paralyze:30}}
    },
    {
        name:"Smog",
        desc:"Deals damage and may poison the target (40%).",
        category:2,
        pp:20,
        power:30,
        accuracy:70,
        type:3,
        target:1,
        flags:{protect:1,mirror:1}
        effects:{status:{Status.Poison:40}}
    },
    {
        name:"Sludge",
        desc:"Deals damage and may poison the target (30%).",
        category:2,
        pp:20,
        power:65,
        accuracy:100,
        type:3,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Poison:30}}
    },
    {
        name:"Bone Club",
        desc:"Deals damage. High chance of critical hits.",
        category:1,
        pp:20,
        power:65,
        accuracy:85,
        type:4,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{flinch:10}
    },
    {
        name:"Fire Blast",
        desc:"Deals damage and may cause a burn (10%).",
        category:2,
        pp:5,
        power:110,
        accuracy:85,
        type:9,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{status:{Status.Burn:10}}
    },
    {
        name:"Waterfall",
        desc:"Deals damage and may cause a flinch.",
        category:1,
        pp:15,
        power:80,
        accuracy:100,
        type:10,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{flinch:20}
    },
    {
        name:"Clamp",
        desc:"Damages the foe, traps it, and hurts it for 4-5 turns.",
        category:1,
        pp:15,
        power:35,
        accuracy:85,
        type:10,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        onSuccess : function (user, foe) {
            foe.temp.trapping.push({
                move:this,
                run:"EOT_onTrappingCountdown",
                params:[user, foe],
                duration:bindduration(user, foe)
            });
        },
        EOT_onTrappingCountdown : function (user, foe) {
            bind(user, foe, foe.name() + " is clamped by " + user.name());
        }
    },
    {
        name:"Swift",
        desc:"Always hits, even when the opposing Pokemon are Flying and Digging.",
        category:2,
        pp:20,
        power:60,
        accuracy:true,
        type:0,
        target:3,
        flags:{protect:1,mirror:1,hitflying:1,hitdigging:1,hitdiving:1}
    },
    {
        name:"Skull Bash",
        desc:"The user lowers its head, raising its Defense. Next turn, it attacks.",
        category:1,
        pp:10,
        power:130,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        takeChargeTurn : function (user) {
            if (user.nocopy.chargingg) {
                return user.nocopy.chargingg = false;            
            }
            game.write(user.name() + " is lowering its head.");
            user.onStatChange(Stat.Defense, 1);
            return user.nocopy.chargingg = true;
        }
    },
    {
        name:"Spike Cannon",
        desc:"Deals damage 2-5 times.",
        category:1,
        pp:15,
        power:20,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1},
        getHitCount : multihit;
    },
    {
        name:"Constrict",
        desc:"Deals damage and may lower the target's Speed (10%).",
        category:1,
        pp:35,
        power:10,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{foeboost:{Stat.Speed:[10]}}
    },
    {
        name:"Amnesia",
        desc:"Sharply raises the user's Special Defense.",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat["Special Defense"]:[2]}}
    },
    {
        name:"Kinesis",
        desc:"Lowers the target's Accuracy.",
        category:0,
        pp:15,
        power:0,
        accuracy:80,
        type:13,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{foeboost:{Stat.Accuracy:[-1]}}
    },
    {
        name:"Soft-Boiled",
        desc:"Restores up to half of the user's maximum HP.",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1,heal:1},
        onSuccess : function (user) {
            user.onHeal(user.stats[Stat.HP] / 2);
        }
    },
    {
        name:"High Jump Kick",
        category:1,
        pp:10,
        power:130,
        accuracy:90,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,gravity:1}
    },
    {
        name:"Glare",
        desc:"Paralyzes the foe.",
        category:0,
        pp:30,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{status:{Status.Paralyze:100}}
    },
    {
        name:"Dream Eater",
        desc:"If the target is asleep, deals damage and drains 1/2.",
        category:2,
        pp:15,
        power:100,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1,heal:1},
        drain:0.5,
        preCondition : function (user, foe) {
            return foe.status == Status.Sleep;
        }
    },
    {
        name:"Poison Gas",
        desc:"Poisons the target.",
        category:0,
        pp:40,
        power:0,
        accuracy:90,
        type:3,
        target:3,
        flags:{protect:1,magic:1,mirror:1},
        effects:{status:{Status.Poison:100}}
    },
    {
        name:"Barrage",
        desc:"Deals damagge 2-5 times.",
        category:1,
        pp:20,
        power:15,
        accuracy:85,
        type:0,
        target:1,
        flags:{bullet:1,protect:1,mirror:1},
        getHitCount : multihit
    },
    {
        name:"Leech Life",
        desc:"Deals damage and drains 1/2.",
        category:1,
        pp:15,
        power:20,
        accuracy:100,
        type:6,
        target:1,
        flags:{contact:1,protect:1,mirror:1,heal:1},
        drain:0.5
    },
    {
        name:"Lovely Kiss",
        desc:"Puts the target to sleep.",
        category:0,
        pp:10,
        power:0,
        accuracy:75,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{status:{Status.Sleep:100}}
    },
    {
        name:"Sky Attack",
        category:1,
        pp:5,
        power:140,
        accuracy:90,
        type:2,
        target:1,
        flags:{protect:1,mirror:1,distance:1},
        takeChargeTurn : function (user) {
            if (user.charging) {
                return user.charging = false;
            }
            game.write(user.name() + " starts to glow!");
            return user.charging = true;
        }
    },
    {
        name:"Transform",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{},
        onSuccess : function (user, foe) {
            transform(user, foe);
        }
    },
    {
        name:"Bubble",
        desc:"Deals damage and may lower the Speed of the opposing Pokemon (10%).",
        category:2,
        pp:30,
        power:40,
        accuracy:100,
        type:10,
        target:3,
        flags:{protect:1,mirror:1},
        effects:{foeboost:{Stat.Speed:[-1,10]}}
    },
    {
        name:"Dizzy Punch",
        desc:"Deals damage and may confuse the target (20%).",
        category:1,
        pp:10,
        power:70,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1},
        effects:{confuse:1}
    },
    {
        name:"Spore",
        desc:"Puts the target to sleep.",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:11,
        target:1,
        flags:{powder:1,protect:1,magic:1,mirrors:1},
        effects:{status:{Status.Sleep:100}}
    },
    {
        name:"Flash",
        desc:"Lowers the target's Accuracy.",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        effects:{foeboost:{Stat.Accuracy:[-1]}}
    },
    {
        name:"Psywave",
        desc:"Deals typeless damage ranging 50%-150% of the user's level in power.",
        category:2,
        pp:15,
        power:0,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1},
        effects:{ignoretype:1},
        getPower : function (user) {
            return user.level * (Math.random() + 0.5);
        }
    },
    {
        name:"Splash",
        desc:"Always crits, boosts all stats, and causes both Burn and Paralysis. Just kidding."category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{gravity:1}
    },
    {
        name:"Acid Armor",
        desc:"Sharply raises the user's Defense.",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:3,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Defense:[2,100]}}
    },
    {
        name:"Crabhammer","Deals damage. Higher chance of critical hits.",
        category:1,
        pp:10,
        power:100,
        accuracy:90,
        type:10,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{crit:1}
    },
    {
        name:"Explosion",
        desc:"Deals massive damage to everything, causing the user to faint.",
        category:1,
        pp:5,
        power:250,
        accuracy:100,
        type:0,
        target:4,
        flags:{protect:1,mirror:1},
        preCondition : function (user) {
            user.health = 0;
            return true;
        }
    },
    {
        name:"Fury Swipes",
        desc:"Deals damage 2-5 times."category:1,
        pp:15,
        power:18,
        accuracy:80,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        getHitCount : multihit
    },
    {
        name:"Bonemerang",
        desc:"Deals damage two times.",
        category:1,
        pp:10,
        power:50,
        accuracy:90,
        type:4,
        target:1,
        flags:{protect:1,mirror:1},
        getHitCount : function () { return 2;}
    },
    {
        name:"Rest",
        desc:"User goes to sleep, restoring all HP and healing status conditions.",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1,heal:1},
        preCondition : function (user) {
            return user.health != user.stats[Stat.HP]
                && user.status != Status.Sleep;
        }
        onSuccess : function (user) {
            game.write(user.name() + " went to sleep and became healthy!")
            user.status = Status.Sleep;
            user.statuscounter = 2;
            user.health = user.stats[Stat.HP];
        }
    },
    {
        name:"Rock Slide",
        desc:"Damages the opposing Pokemon and may make them flinch.",
        category:1,
        pp:10,
        power:75,
        accuracy:90,
        type:5,
        target:3,
        flags:{protect:1,mirror:1},
        effects:{flinch:30}
    },
    {
        name:"Hyper Fang",
        desc:"Damages the target and may cause flinching.",
        category:1,
        pp:15,
        power:80,
        accuracy:90,
        type:0,
        target:1,
        flags:{jaw:1,contact:1,protect:1,mirror:1},
        effects:{flinch:10}
    },
    {
        name:"Sharpen",
        desc:"Raises the user's Attack.",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1},
        effects:{userboost:{Stat.Attack:[1,100]}}
    },
    {
        name:"Conversion",
        desc:"Changes the user's type to match its first move.",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1},
        onSuccess : function (user) {
            var type = Movedex[user.moves[0]].type;
            user.temp.types = [
                type,
                Type["???"]
            ];
            game.write(user.name() + " is now " + Type[type] + "-type!");
        }
    },
    {
        name:"Tri Attack",
        desc:"Deals damage. May burn (10%), paralyze (10%), or freeze (10%) the target.",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1},
        effects:status:{
        Status.Burn:10,
        Status.Paralyze:10,
        Status.Freeze:10
    }
    },
    {
        name:"Super Fang",
        desc:"Halves the target's HP.",
        category:1,
        pp:10,
        power:0,
        accuracy:90,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        getExactDamage : function (user, foe) {
        return Math.floor(foe.health / 2);
    }
    },
    {
        name:"Slash",
        desc:"Deals damage. Higher chance of critical hit.",
        category:1,
        pp:20,
        power:70,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        effects:{crit:1}
    },
    {
        name:"Substitute",
        desc:"User sends out a substitute, putting a quarter of its maximum health into it, to evade damage.",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1,nonsky:1},
        preCondition : function (user) {
            return !(user.temp.substitute
            ||  user.health < user.stats[Stat.HP] / 4);
        },
        onSuccess : function (user) {
            var hp = user.stats[Stat.HP] / 4;
            user.health -= hp;
            user.temp.substitute = hp;
        }
    },
    {
        name:"Struggle",
        category:1,
        pp:1,
        power:50,
        accuracy:true,
        type:0,
        target:1,
        flags:{contact:1,protect:1,nomimic:1},
        onDamageDealt : function (user) {
            game.write(user.name() + " is hurt with recoil.");
            user.health -= user.stats[Stat.HP] / 4;
        }
    },
//  Generation 2
    {
        name:"Sketch",
        category:0,
        pp:1,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{skipsub:1,nomimic:1},
        preConditions : function (user, foe) {
            //  Must have made a move
            if (foe.nocopy.lastmove == -1) {
                return false;
            }
            var move = foe.nocopy.lastmove;
            //  Can't copy certain moves
            if (Movedex[move].nomimic) {
                return false;
            }
            //  Must not know the move
            if (-1 < user.moves.indexOf(move)) {
                return false;
            }
            return true;
        },
        onSuccess : function (user, foe) {
            var move = foe.nocopy.lastmove;
            user.moves[user.thisturn.decision.move] = move.num;
            game.write(user.name() + " learns " + move.name + ".");
        }
    },
    {
        name:"Triple Kick",
        category:1,
        pp:10,
        power:10,
        accuracy:90,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
    },
    {
        name:"Thief",
        category:1,
        pp:25,
        power:60,
        accuracy:100,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        onSuccess : function (user, foe) {
            stealItem(user, foe);
        }
    },
    {
        name:"Spider Web",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:6,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        onSuccess : function (user, foe) {
            foe.temp.block.push(user);
            game.write(foe.name() + " can't escape!");
        }
    },
    {
        name:"Mind Reader",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Nightmare",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:7,
        target:1,
        flags:{protect:1,mirror:1},
        preCondition : function (user, foe) {
            return foe.status == Status.Sleep;
        },
        onSuccess : function (user, foe) {
            foe.temp.nightmare = true;
        }
    },
    {
        name:"Flame Wheel",
        category:1,
        pp:25,
        power:60,
        accuracy:100,
        type:9,
        target:1,
        flags:{contact:1,protect:1,mirror:1,"thaw":1},
        effects:{status:{Status.Burn:10}}
    },
    {
        name:"Snore",
        category:2,
        pp:15,
        power:50,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1,sound:1,skipsub:1},
        effects:{flinch:30}
        preCondition : function (user) {
            return user.status == Status.Sleep;
        }
    },
    {
        name:"Curse",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:7,
        target:1,
        flags:{skipsub:1},
        preCondition: function (user, foe) {
            if (user.hasType(Type.Ghost)) {
                this.effects = false;
                return undefined == foe.temp.moveeffects.;
            }
            else {
                this.effects = {
                    userboost:{
                        Stat.Speed:[-1]
                        Stat.Attack:[1]
                        Stat.Defense:[1]
                    }
                };
                return true;
            }
        },
        onSuccess : function (user, foe) {
            if (user.hasType(Type.Ghost)) {
                foe.temp.moveeffects.curse = {
                    run: "onSleepDamage",
                    params:[foe]
                }
            }
        },
        onSleepDamage : function (foe) {
            foe.takeResidualDamage(foe.stats[Stat.HP] / 4);
        }
    },
    {
        name:"Flail",
        category:1,
        pp:15,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Conversion 2",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{skipsub:1}
    },
    {
        name:"Aeroblast",
        category:2,
        pp:5,
        power:100,
        accuracy:95,
        type:2,
        target:1,
        flags:{protect:1,mirror:1,distance:1}
    },
    {
        name:"Cotton Spore",
        category:0,
        pp:40,
        power:0,
        accuracy:100,
        type:11,
        target:3,
        flags:{powder:1,protect:1,magic:1,mirror:1}
    },
    {
        name:"Reversal",
        category:1,
        pp:15,
        power:0,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Spite",
        category:0,
        pp:10,
        power:0,
        accuracy:100,
        type:7,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Powder Snow",
        category:2,
        pp:25,
        power:40,
        accuracy:100,
        type:14,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Protect",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{},
        priority:4
    },
    {
        name:"Mach Punch",
        category:1,
        pp:30,
        power:40,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1},
        priority:1
    },
    {
        name:"Scary Face",
        category:0,
        pp:10,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Feint Attack",
        category:1,
        pp:20,
        power:60,
        accuracy:true,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Sweet Kiss",
        category:0,
        pp:10,
        power:0,
        accuracy:75,
        type:17,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Belly Drum",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Sludge Bomb",
        category:2,
        pp:10,
        power:90,
        accuracy:100,
        type:3,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Mud-Slap",
        category:2,
        pp:10,
        power:20,
        accuracy:100,
        type:4,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Octazooka",
        category:2,
        pp:10,
        power:65,
        accuracy:85,
        type:10,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Spikes",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:4,
        target:7,
        flags:{magic:1,nonsky:1}
    },
    {
        name:"Zap Cannon",
        category:2,
        pp:5,
        power:120,
        accuracy:50,
        type:12,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Foresight",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Destiny Bond",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:7,
        target:0,
        flags:{skipsub:1}
    },
    {
        name:"Perish Song",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:0,
        target:5,
        flags:{sound:1,distance:1,skipsub:1}
    },
    {
        name:"Icy Wind",
        category:2,
        pp:15,
        power:55,
        accuracy:95,
        type:14,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Detect",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:1,
        target:0,
        flags:{},
        priority:4
    },
    {
        name:"Bone Rush",
        category:1,
        pp:10,
        power:25,
        accuracy:90,
        type:4,
        target:1,
        flags:{protect:1,mirror:1},
        getHitCount : multihit
    },
    {
        name:"Lock-On",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Outrage",
        category:1,
        pp:10,
        power:120,
        accuracy:100,
        type:15,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Sandstorm",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:5,
        target:5,
        flags:{}
    },
    {
        name:"Giga Drain",
        category:2,
        pp:10,
        power:75,
        accuracy:100,
        type:11,
        target:1,
        flags:{protect:1,mirror:1,heal:1},
        drain:0.5
    },
    {
        name:"Endure",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{},
        priority:4
    },
    {
        name:"Charm",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:17,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Rollout",
        category:1,
        pp:20,
        power:30,
        accuracy:90,
        type:5,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"False Swipe",
        category:1,
        pp:40,
        power:40,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Swagger",
        category:0,
        pp:15,
        power:0,
        accuracy:90,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Milk Drink",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Spark",
        category:1,
        pp:20,
        power:65,
        accuracy:100,
        type:12,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Fury Cutter",
        category:1,
        pp:20,
        power:40,
        accuracy:95,
        type:6,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Steel Wing",
        category:1,
        pp:25,
        power:70,
        accuracy:90,
        type:8,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Mean Look",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{magic:1,mirror:1}
    },
    {
        name:"Attract",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Sleep Talk",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{}
    },
    {
        name:"Heal Bell",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{snatch:1,sound:1,distance:1,skipsub:1}
    },
    {
        name:"Return",
        category:1,
        pp:20,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Present",
        category:1,
        pp:15,
        power:0,
        accuracy:90,
        type:0,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Frustration",
        category:1,
        pp:20,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Safeguard",
        category:0,
        pp:25,
        power:0,
        accuracy:true,
        type:0,
        target:6,
        flags:{snatch:1}
    },
    {
        name:"Pain Split",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Sacred Fire",
        category:1,
        pp:5,
        power:100,
        accuracy:95,
        type:9,
        target:1,
        flags:{protect:1,mirror:1,"thaw":1}
    },
    {
        name:"Magnitude",
        category:1,
        pp:30,
        power:0,
        accuracy:100,
        type:4,
        target:4,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Dynamic Punch",
        category:1,
        pp:5,
        power:100,
        accuracy:50,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1}
    },
    {
        name:"Megahorn",
        category:1,
        pp:10,
        power:120,
        accuracy:85,
        type:6,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Dragon Breath",
        category:2,
        pp:20,
        power:60,
        accuracy:100,
        type:15,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Baton Pass",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{}
    },
    {
        name:"Encore",
        category:0,
        pp:5,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Pursuit",
        category:1,
        pp:20,
        power:40,
        accuracy:100,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Rapid Spin",
        category:1,
        pp:40,
        power:20,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Sweet Scent",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:0,
        target:3,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Iron Tail",
        category:1,
        pp:15,
        power:100,
        accuracy:75,
        type:8,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Metal Claw",
        category:1,
        pp:35,
        power:50,
        accuracy:95,
        type:8,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Vital Throw",
        category:1,
        pp:10,
        power:70,
        accuracy:true,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:-1
    },
    {
        name:"Morning Sun",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Synthesis",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:11,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Moonlight",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:17,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Hidden Power",
        category:2,
        pp:15,
        power:60,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Cross Chop",
        category:1,
        pp:5,
        power:100,
        accuracy:80,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Twister",
        category:2,
        pp:20,
        power:40,
        accuracy:100,
        type:15,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Rain Dance",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:10,
        target:5,
        flags:{}
    },
    {
        name:"Sunny Day",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:9,
        target:5,
        flags:{}
    },
    {
        name:"Crunch",
        category:1,
        pp:15,
        power:80,
        accuracy:100,
        type:16,
        target:1,
        flags:{jaw:1,contact:1,protect:1,mirror:1}
    },
    {
        name:"Mirror Coat",
        category:2,
        pp:20,
        power:0,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1},
        priority:-5
    },
    {
        name:"Psych Up",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{skipsub:1}
    },
    {
        name:"Extreme Speed",
        category:1,
        pp:5,
        power:80,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:2
    },
    {
        name:"Ancient Power",
        category:2,
        pp:5,
        power:60,
        accuracy:100,
        type:5,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Shadow Ball",
        category:2,
        pp:15,
        power:80,
        accuracy:100,
        type:7,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Future Sight",
        category:2,
        pp:10,
        power:120,
        accuracy:100,
        type:13,
        target:1,
        flags:{}
    },
    {
        name:"Rock Smash",
        category:1,
        pp:15,
        power:40,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Whirlpool",
        category:2,
        pp:15,
        power:35,
        accuracy:85,
        type:10,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Beat Up",
        category:1,
        pp:10,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,mirror:1}
    },
//  Generation 3
    {
        name:"Fake Out",
        category:1,
        pp:10,
        power:40,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:3
    },
    {
        name:"Uproar",
        category:2,
        pp:10,
        power:90,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Stockpile",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Spit Up",
        category:2,
        pp:10,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1}
    },
    {
        name:"Swallow",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Heat Wave",
        category:2,
        pp:10,
        power:95,
        accuracy:90,
        type:9,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Hail",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:14,
        target:5,
        flags:{}
    },
    {
        name:"Torment",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Flatter",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Will-O-Wisp",
        category:0,
        pp:15,
        power:0,
        accuracy:85,
        type:9,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Memento",
        category:0,
        pp:10,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Facade",
        category:1,
        pp:20,
        power:70,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Focus Punch",
        category:1,
        pp:20,
        power:150,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,fist:1},
        priority:-3
    },
    {
        name:"Smelling Salts",
        category:1,
        pp:10,
        power:70,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Follow Me",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{},
        priority:2
    },
    {
        name:"Nature Power",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{}
    },
    {
        name:"Charge",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:12,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Taunt",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Helping Hand",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:2,
        flags:{skipsub:1},
        priority:5
    },
    {
        name:"Trick",
        category:0,
        pp:10,
        power:0,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Role Play",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{skipsub:1}
    },
    {
        name:"Wish",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Assist",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{}
    },
    {
        name:"Ingrain",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:11,
        target:0,
        flags:{snatch:1,nonsky:1}
    },
    {
        name:"Superpower",
        category:1,
        pp:5,
        power:120,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Magic Coat",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{},
        priority:4
    },
    {
        name:"Recycle",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Revenge",
        category:1,
        pp:10,
        power:60,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:-4
    },
    {
        name:"Brick Break",
        category:1,
        pp:15,
        power:75,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Yawn",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Knock Off",
        category:1,
        pp:20,
        power:65,
        accuracy:100,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Endeavor",
        category:1,
        pp:5,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Eruption",
        category:2,
        pp:5,
        power:150,
        accuracy:100,
        type:9,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Skill Swap",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{protect:1,mirror:1,skipsub:1}
    },
    {
        name:"Imprison",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1,skipsub:1}
    },
    {
        name:"Refresh",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Grudge",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:7,
        target:0,
        flags:{skipsub:1}
    },
    {
        name:"Snatch",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:16,
        target:0,
        flags:{skipsub:1},
        priority:4
    },
    {
        name:"Secret Power",
        category:1,
        pp:20,
        power:70,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Dive",
        category:1,
        pp:10,
        power:80,
        accuracy:100,
        type:10,
        target:1,
        flags:{contact:1,protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Arm Thrust",
        category:1,
        pp:20,
        power:15,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        getHitCount : multihit},
    {
        name:"Camouflage",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Tail Glow",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:6,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Luster Purge",
        category:2,
        pp:5,
        power:70,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Mist Ball",
        category:2,
        pp:5,
        power:70,
        accuracy:100,
        type:13,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Feather Dance",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:2,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Teeter Dance",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:0,
        target:4,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Blaze Kick",
        category:1,
        pp:10,
        power:85,
        accuracy:90,
        type:9,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Mud Sport",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:4,
        target:5,
        flags:{nonsky:1}
    },
    {
        name:"Ice Ball",
        category:1,
        pp:20,
        power:30,
        accuracy:90,
        type:14,
        target:1,
        flags:{bullet:1,contact:1,protect:1,mirror:1}
    },
    {
        name:"Needle Arm",
        category:1,
        pp:15,
        power:60,
        accuracy:100,
        type:11,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Slack Off",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Hyper Voice",
        category:2,
        pp:10,
        power:90,
        accuracy:100,
        type:0,
        target:3,
        flags:{protect:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Poison Fang",
        category:1,
        pp:15,
        power:50,
        accuracy:100,
        type:3,
        target:1,
        flags:{jaw:1,contact:1,protect:1,mirror:1}
    },
    {
        name:"Crush Claw",
        category:1,
        pp:10,
        power:75,
        accuracy:95,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Blast Burn",
        category:2,
        pp:5,
        power:150,
        accuracy:90,
        type:9,
        target:1,
        flags:{reprotect:1,mirror:1}
    },
    {
        name:"Hydro Cannon",
        category:2,
        pp:5,
        power:150,
        accuracy:90,
        type:10,
        target:1,
        flags:{reprotect:1,mirror:1}
    },
    {
        name:"Meteor Mash",
        category:1,
        pp:10,
        power:90,
        accuracy:90,
        type:8,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1}
    },
    {
        name:"Astonish",
        category:1,
        pp:15,
        power:30,
        accuracy:100,
        type:7,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Weather Ball",
        category:2,
        pp:10,
        power:50,
        accuracy:100,
        type:0,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Aromatherapy",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:11,
        target:1,
        flags:{snatch:1,distance:1}
    },
    {
        name:"Fake Tears",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Air Cutter",
        category:2,
        pp:25,
        power:60,
        accuracy:95,
        type:2,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Overheat",
        category:2,
        pp:5,
        power:130,
        accuracy:90,
        type:9,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Odor Sleuth",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Rock Tomb",
        category:1,
        pp:15,
        power:60,
        accuracy:95,
        type:5,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Silver Wind",
        category:2,
        pp:5,
        power:60,
        accuracy:100,
        type:6,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Metal Sound",
        category:0,
        pp:40,
        power:0,
        accuracy:85,
        type:8,
        target:1,
        flags:{protect:1,magic:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Grass Whistle",
        category:0,
        pp:15,
        power:0,
        accuracy:55,
        type:11,
        target:1,
        flags:{protect:1,magic:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Tickle",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Cosmic Power",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Water Spout",
        category:2,
        pp:5,
        power:150,
        accuracy:100,
        type:10,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Signal Beam",
        category:2,
        pp:15,
        power:75,
        accuracy:100,
        type:6,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Shadow Punch",
        category:1,
        pp:20,
        power:60,
        accuracy:true,
        type:7,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1}
    },
    {
        name:"Extrasensory",
        category:2,
        pp:20,
        power:80,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Sky Uppercut",
        category:1,
        pp:15,
        power:85,
        accuracy:90,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1}
    },
    {
        name:"Sand Tomb",
        category:1,
        pp:15,
        power:35,
        accuracy:85,
        type:4,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Sheer Cold",
        category:2,
        pp:5,
        power:0,
        accuracy:30,
        type:14,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Muddy Water",
        category:2,
        pp:10,
        power:90,
        accuracy:85,
        type:10,
        target:3,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Bullet Seed",
        category:1,
        pp:30,
        power:25,
        accuracy:100,
        type:11,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Aerial Ace",
        category:1,
        pp:20,
        power:60,
        accuracy:true,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,distance:1}
    },
    {
        name:"Icicle Spear",
        category:1,
        pp:30,
        power:25,
        accuracy:100,
        type:14,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Iron Defense",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:8,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Block",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{magic:1,mirror:1}
    },
    {
        name:"Howl",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Dragon Claw",
        category:1,
        pp:15,
        power:80,
        accuracy:100,
        type:15,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Frenzy Plant",
        category:2,
        pp:5,
        power:150,
        accuracy:90,
        type:11,
        target:1,
        flags:{reprotect:1,mirror:1,nonsky:1}
    },
    {
        name:"Bulk Up",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:1,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Bounce",
        category:1,
        pp:5,
        power:85,
        accuracy:85,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,gravity:1,distance:1}
    },
    {
        name:"Mud Shot",
        category:2,
        pp:15,
        power:55,
        accuracy:95,
        type:4,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Poison Tail",
        category:1,
        pp:25,
        power:50,
        accuracy:100,
        type:3,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Covet",
        category:1,
        pp:25,
        power:60,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Volt Tackle",
        category:1,
        pp:15,
        power:120,
        accuracy:100,
        type:12,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        recoil:1/3
    },
    {
        name:"Magical Leaf",
        category:2,
        pp:20,
        power:60,
        accuracy:true,
        type:11,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Water Sport",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:10,
        target:5,
        flags:{nonsky:1}
    },
    {
        name:"Calm Mind",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Leaf Blade",
        category:1,
        pp:15,
        power:90,
        accuracy:100,
        type:11,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Dragon Dance",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:15,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Rock Blast",
        category:1,
        pp:10,
        power:25,
        accuracy:90,
        type:5,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Shock Wave",
        category:2,
        pp:20,
        power:60,
        accuracy:true,
        type:12,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Water Pulse",
        category:2,
        pp:20,
        power:60,
        accuracy:100,
        type:10,
        target:1,
        flags:{protect:1,pulse:1,mirror:1,distance:1}
    },
    {
        name:"Doom Desire",
        category:2,
        pp:5,
        power:140,
        accuracy:100,
        type:8,
        target:1,
        flags:{}
    },
    {
        name:"Psycho Boost",
        category:2,
        pp:5,
        power:140,
        accuracy:90,
        type:13,
        target:1,
        flags:{protect:1,mirror:1}
    },
//  Generation 4
    {
        name:"Roost",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:2,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Gravity",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:13,
        target:5,
        flags:{nonsky:1}
    },
    {
        name:"Miracle Eye",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Wake-Up Slap",
        category:1,
        pp:10,
        power:70,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Hammer Arm",
        category:1,
        pp:10,
        power:100,
        accuracy:90,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1}
    },
    {
        name:"Gyro Ball",
        category:1,
        pp:5,
        power:0,
        accuracy:100,
        type:8,
        target:1,
        flags:{bullet:1,contact:1,protect:1,mirror:1}
    },
    {
        name:"Healing Wish",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Brine",
        category:2,
        pp:10,
        power:65,
        accuracy:100,
        type:10,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Natural Gift",
        category:1,
        pp:15,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Feint",
        category:1,
        pp:10,
        power:30,
        accuracy:100,
        type:0,
        target:1,
        flags:{mirror:1},
        priority:2
    },
    {
        name:"Pluck",
        category:1,
        pp:20,
        power:60,
        accuracy:100,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,distance:1}
    },
    {
        name:"Tailwind",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:2,
        target:6,
        flags:{snatch:1}
    },
    {
        name:"Acupressure",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{}
    },
    {
        name:"Metal Burst",
        category:1,
        pp:10,
        power:0,
        accuracy:100,
        type:8,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"U-turn",
        category:1,
        pp:20,
        power:70,
        accuracy:100,
        type:6,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Close Combat",
        category:1,
        pp:5,
        power:120,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Payback",
        category:1,
        pp:10,
        power:50,
        accuracy:100,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Assurance",
        category:1,
        pp:10,
        power:60,
        accuracy:100,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Embargo",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Fling",
        category:1,
        pp:10,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Psycho Shift",
        category:0,
        pp:10,
        power:0,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Trump Card",
        category:2,
        pp:5,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Heal Block",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:13,
        target:3,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Wring Out",
        category:2,
        pp:5,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Power Trick",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Gastro Acid",
        category:0,
        pp:10,
        power:0,
        accuracy:100,
        type:3,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Lucky Chant",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:0,
        target:6,
        flags:{snatch:1}
    },
    {
        name:"Me First",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{protect:1,skipsub:1}
    },
    {
        name:"Copycat",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{}
    },
    {
        name:"Power Swap",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{protect:1,mirror:1,skipsub:1}
    },
    {
        name:"Guard Swap",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{protect:1,mirror:1,skipsub:1}
    },
    {
        name:"Punishment",
        category:1,
        pp:5,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Last Resort",
        category:1,
        pp:5,
        power:140,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Worry Seed",
        category:0,
        pp:10,
        power:0,
        accuracy:100,
        type:11,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Sucker Punch",
        category:1,
        pp:5,
        power:80,
        accuracy:100,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:1
    },
    {
        name:"Toxic Spikes",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:3,
        target:7,
        flags:{magic:1,nonsky:1}
    },
    {
        name:"Heart Swap",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{protect:1,mirror:1,skipsub:1}
    },
    {
        name:"Aqua Ring",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:10,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Magnet Rise",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:12,
        target:0,
        flags:{snatch:1,gravity:1}
    },
    {
        name:"Flare Blitz",
        category:1,
        pp:15,
        power:120,
        accuracy:100,
        type:9,
        target:1,
        flags:{contact:1,protect:1,mirror:1,"thaw":1},
        recoil:1/3
    },
    {
        name:"Force Palm",
        category:1,
        pp:10,
        power:60,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Aura Sphere",
        category:2,
        pp:20,
        power:80,
        accuracy:true,
        type:1,
        target:1,
        flags:{bullet:1,protect:1,pulse:1,mirror:1,distance:1}
    },
    {
        name:"Rock Polish",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:5,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Poison Jab",
        category:1,
        pp:20,
        power:80,
        accuracy:100,
        type:3,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Dark Pulse",
        category:2,
        pp:15,
        power:80,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,pulse:1,mirror:1,distance:1}
    },
    {
        name:"Night Slash",
        category:1,
        pp:15,
        power:70,
        accuracy:100,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Aqua Tail",
        category:1,
        pp:10,
        power:90,
        accuracy:90,
        type:10,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Seed Bomb",
        category:1,
        pp:15,
        power:80,
        accuracy:100,
        type:11,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Air Slash",
        category:2,
        pp:15,
        power:75,
        accuracy:95,
        type:2,
        target:1,
        flags:{protect:1,mirror:1,distance:1}
    },
    {
        name:"X-Scissor",
        category:1,
        pp:15,
        power:80,
        accuracy:100,
        type:6,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Bug Buzz",
        category:2,
        pp:10,
        power:90,
        accuracy:100,
        type:6,
        target:1,
        flags:{protect:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Dragon Pulse",
        category:2,
        pp:10,
        power:85,
        accuracy:100,
        type:15,
        target:1,
        flags:{protect:1,pulse:1,mirror:1,distance:1}
    },
    {
        name:"Dragon Rush",
        category:1,
        pp:10,
        power:100,
        accuracy:75,
        type:15,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Power Gem",
        category:2,
        pp:20,
        power:80,
        accuracy:100,
        type:5,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Drain Punch",
        category:1,
        pp:10,
        power:75,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1,heal:1},
        drain:0.5
    },
    {
        name:"Vacuum Wave",
        category:2,
        pp:30,
        power:40,
        accuracy:100,
        type:1,
        target:1,
        flags:{protect:1,mirror:1},
        priority:1
    },
    {
        name:"Focus Blast",
        category:2,
        pp:5,
        power:120,
        accuracy:70,
        type:1,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Energy Ball",
        category:2,
        pp:10,
        power:90,
        accuracy:100,
        type:11,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Brave Bird",
        category:1,
        pp:15,
        power:120,
        accuracy:100,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,distance:1},
        recoil:1/3
    },
    {
        name:"Earth Power",
        category:2,
        pp:10,
        power:90,
        accuracy:100,
        type:4,
        target:1,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Switcheroo",
        category:0,
        pp:10,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Giga Impact",
        category:1,
        pp:5,
        power:150,
        accuracy:90,
        type:0,
        target:1,
        flags:{contact:1,reprotect:1,mirror:1}
    },
    {
        name:"Nasty Plot",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:16,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Bullet Punch",
        category:1,
        pp:30,
        power:40,
        accuracy:100,
        type:8,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1},
        priority:1
    },
    {
        name:"Avalanche",
        category:1,
        pp:10,
        power:60,
        accuracy:100,
        type:14,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:-4
    },
    {
        name:"Ice Shard",
        category:1,
        pp:30,
        power:40,
        accuracy:100,
        type:14,
        target:1,
        flags:{protect:1,mirror:1},
        priority:1
    },
    {
        name:"Shadow Claw",
        category:1,
        pp:15,
        power:70,
        accuracy:100,
        type:7,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Thunder Fang",
        category:1,
        pp:15,
        power:65,
        accuracy:95,
        type:12,
        target:1,
        flags:{jaw:1,contact:1,protect:1,mirror:1}
    },
    {
        name:"Ice Fang",
        category:1,
        pp:15,
        power:65,
        accuracy:95,
        type:14,
        target:1,
        flags:{jaw:1,contact:1,protect:1,mirror:1}
    },
    {
        name:"Fire Fang",
        category:1,
        pp:15,
        power:65,
        accuracy:95,
        type:9,
        target:1,
        flags:{jaw:1,contact:1,protect:1,mirror:1}
    },
    {
        name:"Shadow Sneak",
        category:1,
        pp:30,
        power:40,
        accuracy:100,
        type:7,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:1
    },
    {
        name:"Mud Bomb",
        category:2,
        pp:10,
        power:65,
        accuracy:85,
        type:4,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Psycho Cut",
        category:1,
        pp:20,
        power:70,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Zen Headbutt",
        category:1,
        pp:15,
        power:80,
        accuracy:90,
        type:13,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Mirror Shot",
        category:2,
        pp:10,
        power:65,
        accuracy:85,
        type:8,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Flash Cannon",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:8,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Rock Climb",
        category:1,
        pp:20,
        power:90,
        accuracy:85,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Defog",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:2,
        target:1,
        flags:{protect:1,magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Trick Room",
        category:0,
        pp:5,
        power:0,
        accuracy:true,
        type:13,
        target:5,
        flags:{mirror:1},
        priority:-7
    },
    {
        name:"Draco Meteor",
        category:2,
        pp:5,
        power:130,
        accuracy:90,
        type:15,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Discharge",
        category:2,
        pp:15,
        power:80,
        accuracy:100,
        type:12,
        target:4,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Lava Plume",
        category:2,
        pp:15,
        power:80,
        accuracy:100,
        type:9,
        target:4,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Leaf Storm",
        category:2,
        pp:5,
        power:130,
        accuracy:90,
        type:11,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Power Whip",
        category:1,
        pp:10,
        power:120,
        accuracy:85,
        type:11,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Rock Wrecker",
        category:1,
        pp:5,
        power:150,
        accuracy:90,
        type:5,
        target:1,
        flags:{bullet:1,reprotect:1,mirror:1}
    },
    {
        name:"Cross Poison",
        category:1,
        pp:20,
        power:70,
        accuracy:100,
        type:3,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Gunk Shot",
        category:1,
        pp:5,
        power:120,
        accuracy:80,
        type:3,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Iron Head",
        category:1,
        pp:15,
        power:80,
        accuracy:100,
        type:8,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Magnet Bomb",
        category:1,
        pp:20,
        power:60,
        accuracy:true,
        type:8,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Stone Edge",
        category:1,
        pp:5,
        power:100,
        accuracy:80,
        type:5,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Captivate",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:0,
        target:3,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Stealth Rock",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:5,
        target:7,
        flags:{magic:1}
    },
    {
        name:"Grass Knot",
        category:2,
        pp:20,
        power:0,
        accuracy:100,
        type:11,
        target:1,
        flags:{contact:1,protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Chatter",
        category:2,
        pp:20,
        power:65,
        accuracy:100,
        type:2,
        target:1,
        flags:{protect:1,mirror:1,sound:1,distance:1,skipsub:1,nomimic:1}
    },
    {
        name:"Judgment",
        category:2,
        pp:10,
        power:100,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Bug Bite",
        category:1,
        pp:20,
        power:60,
        accuracy:100,
        type:6,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Charge Beam",
        category:2,
        pp:10,
        power:50,
        accuracy:90,
        type:12,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Wood Hammer",
        category:1,
        pp:15,
        power:120,
        accuracy:100,
        type:11,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        recoil:1/3
    },
    {
        name:"Aqua Jet",
        category:1,
        pp:20,
        power:40,
        accuracy:100,
        type:10,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:1
    },
    {
        name:"Attack Order",
        category:1,
        pp:15,
        power:90,
        accuracy:100,
        type:6,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Defend Order",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:6,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Heal Order",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:6,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Head Smash",
        category:1,
        pp:5,
        power:150,
        accuracy:80,
        type:5,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        recoil:0.5
    },
    {
        name:"Double Hit",
        category:1,
        pp:10,
        power:35,
        accuracy:90,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Roar of Time",
        category:2,
        pp:5,
        power:150,
        accuracy:90,
        type:15,
        target:1,
        flags:{reprotect:1,mirror:1}
    },
    {
        name:"Spacial Rend",
        category:2,
        pp:5,
        power:100,
        accuracy:95,
        type:15,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Lunar Dance",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{snatch:1,heal:1}
    },
    {
        name:"Crush Grip",
        category:1,
        pp:5,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Magma Storm",
        category:2,
        pp:5,
        power:100,
        accuracy:75,
        type:9,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Dark Void",
        category:0,
        pp:10,
        power:0,
        accuracy:80,
        type:16,
        target:3,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Seed Flare",
        category:2,
        pp:5,
        power:120,
        accuracy:85,
        type:11,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Ominous Wind",
        category:2,
        pp:5,
        power:60,
        accuracy:100,
        type:7,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Shadow Force",
        category:1,
        pp:5,
        power:120,
        accuracy:100,
        type:7,
        target:1,
        flags:{contact:1,mirror:1}
    },
//  Generation 5
    {
        name:"Hone Claws",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:16,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Wide Guard",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:5,
        target:6,
        flags:{snatch:1},
        priority:3
    },
    {
        name:"Guard Split",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{protect:1}
    },
    {
        name:"Power Split",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{protect:1}
    },
    {
        name:"Wonder Room",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:5,
        flags:{mirror:1}
    },
    {
        name:"Psyshock",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Venoshock",
        category:2,
        pp:10,
        power:65,
        accuracy:100,
        type:3,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Autotomize",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:8,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Rage Powder",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:6,
        target:0,
        flags:{powder:1},
        priority:2},
    {
        name:"Telekinesis",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{protect:1,magic:1,mirror:1,gravity:1}
    },
    {
        name:"Magic Room",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:5,
        flags:{mirror:1}
    },
    {
        name:"Smack Down",
        category:1,
        pp:15,
        power:50,
        accuracy:100,
        type:5,
        target:1,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Storm Throw",
        category:1,
        pp:10,
        power:60,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Flame Burst",
        category:2,
        pp:15,
        power:70,
        accuracy:100,
        type:9,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Sludge Wave",
        category:2,
        pp:10,
        power:95,
        accuracy:100,
        type:3,
        target:4,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Quiver Dance",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:6,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Heavy Slam",
        category:1,
        pp:10,
        power:0,
        accuracy:100,
        type:8,
        target:1,
        flags:{contact:1,protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Synchronoise",
        category:2,
        pp:10,
        power:120,
        accuracy:100,
        type:13,
        target:4,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Electro Ball",
        category:2,
        pp:10,
        power:0,
        accuracy:100,
        type:12,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Soak",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:10,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Flame Charge",
        category:1,
        pp:20,
        power:50,
        accuracy:100,
        type:9,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Coil",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:3,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Low Sweep",
        category:1,
        pp:20,
        power:65,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Acid Spray",
        category:2,
        pp:20,
        power:40,
        accuracy:100,
        type:3,
        target:1,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Foul Play",
        category:1,
        pp:15,
        power:95,
        accuracy:100,
        type:16,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Simple Beam",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Entrainment",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"After You",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{skipsub:1}
    },
    {
        name:"Round",
        category:2,
        pp:15,
        power:60,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Echoed Voice",
        category:2,
        pp:15,
        power:40,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Chip Away",
        category:1,
        pp:20,
        power:70,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Clear Smog",
        category:2,
        pp:15,
        power:50,
        accuracy:true,
        type:3,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Stored Power",
        category:2,
        pp:10,
        power:20,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Quick Guard",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:1,
        target:6,
        flags:{snatch:1},
        priority:3
    },
    {
        name:"Ally Switch",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:13,
        target:0,
        flags:{},
        priority:1
    },
    {
        name:"Scald",
        category:2,
        pp:15,
        power:80,
        accuracy:100,
        type:10,
        target:1,
        flags:{protect:1,mirror:1,"thaw":1}
    },
    {
        name:"Shell Smash",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Heal Pulse",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:13,
        target:1,
        flags:{protect:1,pulse:1,magic:1,distance:1,heal:1}
    },
    {
        name:"Hex",
        category:2,
        pp:10,
        power:65,
        accuracy:100,
        type:7,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Sky Drop",
        category:1,
        pp:10,
        power:60,
        accuracy:100,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,gravity:1,distance:1}
    },
    {
        name:"Shift Gear",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:8,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Circle Throw",
        category:1,
        pp:10,
        power:60,
        accuracy:90,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:-6
    },
    {
        name:"Incinerate",
        category:2,
        pp:15,
        power:60,
        accuracy:100,
        type:9,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Quash",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Acrobatics",
        category:1,
        pp:15,
        power:55,
        accuracy:100,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,distance:1}
    },
    {
        name:"Reflect Type",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{protect:1,skipsub:1}
    },
    {
        name:"Retaliate",
        category:1,
        pp:5,
        power:70,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Final Gambit",
        category:2,
        pp:5,
        power:0,
        accuracy:100,
        type:1,
        target:1,
        flags:{protect:1}
    },
    {
        name:"Bestow",
        category:0,
        pp:15,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{mirror:1,skipsub:1}
    },
    {
        name:"Inferno",
        category:2,
        pp:5,
        power:100,
        accuracy:50,
        type:9,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Water Pledge",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:10,
        target:1,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Fire Pledge",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:9,
        target:1,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Grass Pledge",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:11,
        target:1,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Volt Switch",
        category:2,
        pp:20,
        power:70,
        accuracy:100,
        type:12,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Struggle Bug",
        category:2,
        pp:20,
        power:50,
        accuracy:100,
        type:6,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Bulldoze",
        category:1,
        pp:20,
        power:60,
        accuracy:100,
        type:4,
        target:4,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Frost Breath",
        category:2,
        pp:10,
        power:60,
        accuracy:90,
        type:14,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Dragon Tail",
        category:1,
        pp:10,
        power:60,
        accuracy:90,
        type:15,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        priority:-6
    },
    {
        name:"Work Up",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Electroweb",
        category:2,
        pp:15,
        power:55,
        accuracy:95,
        type:12,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Wild Charge",
        category:1,
        pp:15,
        power:90,
        accuracy:100,
        type:12,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        recoil:0.25
    },
    {
        name:"Drill Run",
        category:1,
        pp:10,
        power:80,
        accuracy:95,
        type:4,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Dual Chop",
        category:1,
        pp:15,
        power:40,
        accuracy:90,
        type:15,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Heart Stamp",
        category:1,
        pp:25,
        power:60,
        accuracy:100,
        type:13,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Horn Leech",
        category:1,
        pp:10,
        power:75,
        accuracy:100,
        type:11,
        target:1,
        flags:{contact:1,protect:1,mirror:1,heal:1},
        drain:0.5
    },
    {
        name:"Sacred Sword",
        category:1,
        pp:15,
        power:90,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Razor Shell",
        category:1,
        pp:10,
        power:75,
        accuracy:95,
        type:10,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Heat Crash",
        category:1,
        pp:10,
        power:0,
        accuracy:100,
        type:9,
        target:1,
        flags:{contact:1,protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Leaf Tornado",
        category:2,
        pp:10,
        power:65,
        accuracy:90,
        type:11,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Steamroller",
        category:1,
        pp:20,
        power:65,
        accuracy:100,
        type:6,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Cotton Guard",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:11,
        target:0,
        flags:{snatch:1}
    },
    {
        name:"Night Daze",
        category:2,
        pp:10,
        power:85,
        accuracy:95,
        type:16,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Psystrike",
        category:2,
        pp:10,
        power:100,
        accuracy:100,
        type:13,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Tail Slap",
        category:1,
        pp:10,
        power:25,
        accuracy:85,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Hurricane",
        category:2,
        pp:10,
        power:110,
        accuracy:70,
        type:2,
        target:1,
        flags:{protect:1,mirror:1,distance:1}
    },
    {
        name:"Head Charge",
        category:1,
        pp:15,
        power:120,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1},
        recoil:0.25
    },
    {
        name:"Gear Grind",
        category:1,
        pp:15,
        power:50,
        accuracy:85,
        type:8,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Searing Shot",
        category:2,
        pp:5,
        power:100,
        accuracy:100,
        type:9,
        target:4,
        flags:{bullet:1,protect:1,mirror:1}
    },
    {
        name:"Techno Blast",
        category:2,
        pp:5,
        power:120,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Relic Song",
        category:2,
        pp:10,
        power:75,
        accuracy:100,
        type:0,
        target:3,
        flags:{protect:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Secret Sword",
        category:2,
        pp:10,
        power:85,
        accuracy:100,
        type:1,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Glaciate",
        category:2,
        pp:10,
        power:65,
        accuracy:95,
        type:14,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Bolt Strike",
        category:1,
        pp:5,
        power:130,
        accuracy:85,
        type:12,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Blue Flare",
        category:2,
        pp:5,
        power:130,
        accuracy:85,
        type:9,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Fiery Dance",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:9,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Freeze Shock",
        category:1,
        pp:5,
        power:140,
        accuracy:90,
        type:14,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Ice Burn",
        category:2,
        pp:5,
        power:140,
        accuracy:90,
        type:14,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Snarl",
        category:2,
        pp:15,
        power:55,
        accuracy:95,
        type:16,
        target:3,
        flags:{protect:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Icicle Crash",
        category:1,
        pp:10,
        power:85,
        accuracy:90,
        type:14,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"V-create",
        category:1,
        pp:5,
        power:180,
        accuracy:95,
        type:9,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Fusion Flare",
        category:2,
        pp:5,
        power:100,
        accuracy:100,
        type:9,
        target:1,
        flags:{protect:1,mirror:1,"thaw":1}
    },
    {
        name:"Fusion Bolt",
        category:1,
        pp:5,
        power:100,
        accuracy:100,
        type:12,
        target:1,
        flags:{protect:1,mirror:1}
    },
//  Generation 6
    {
        name:"Flying Press",
        category:1,
        pp:10,
        power:80,
        accuracy:95,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,gravity:1,distance:1,nonsky:1}
    },
    {
        name:"Mat Block",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:1,
        target:6,
        flags:{snatch:1,nonsky:1}
    },
    {
        name:"Belch",
        category:2,
        pp:10,
        power:120,
        accuracy:90,
        type:3,
        target:1,
        flags:{protect:1}
    },
    {
        name:"Rototiller",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:4,
        target:5,
        flags:{distance:1,nonsky:1}
    },
    {
        name:"Sticky Web",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:6,
        target:7,
        flags:{magic:1}
    },
    {
        name:"Fell Stinger",
        category:1,
        pp:25,
        power:30,
        accuracy:100,
        type:6,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Phantom Force",
        category:1,
        pp:10,
        power:90,
        accuracy:100,
        type:7,
        target:1,
        flags:{contact:1,mirror:1}
    },
    {
        name:"Trick-or-Treat",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:7,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Noble Roar",
        category:0,
        pp:30,
        power:0,
        accuracy:100,
        type:0,
        target:1,
        flags:{protect:1,magic:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Ion Deluge",
        category:0,
        pp:25,
        power:0,
        accuracy:true,
        type:12,
        target:5,
        flags:{},
        priority:1
    },
    {
        name:"Parabolic Charge",
        category:2,
        pp:20,
        power:50,
        accuracy:100,
        type:12,
        target:4,
        flags:{protect:1,mirror:1,heal:1},
        drain:0.5
    },
    {
        name:"Forest's Curse",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:11,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Petal Blizzard",
        category:1,
        pp:15,
        power:90,
        accuracy:100,
        type:11,
        target:4,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Freeze-Dry",
        category:2,
        pp:20,
        power:70,
        accuracy:100,
        type:14,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Disarming Voice",
        category:2,
        pp:15,
        power:40,
        accuracy:true,
        type:17,
        target:3,
        flags:{protect:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Parting Shot",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:16,
        target:1,
        flags:{protect:1,magic:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Topsy-Turvy",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:16,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Draining Kiss",
        category:2,
        pp:10,
        power:50,
        accuracy:100,
        type:17,
        target:1,
        flags:{contact:1,protect:1,mirror:1,heal:1},
        drain:0.75
    },
    {
        name:"Crafty Shield",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:17,
        target:6,
        flags:{},
        priority:3
    },
    {
        name:"Flower Shield",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:17,
        target:5,
        flags:{distance:1}
    },
    {
        name:"Grassy Terrain",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:11,
        target:5,
        flags:{nonsky:1}
    },
    {
        name:"Misty Terrain",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:17,
        target:5,
        flags:{nonsky:1}
    },
    {
        name:"Electrify",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:12,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Play Rough",
        category:1,
        pp:10,
        power:90,
        accuracy:90,
        type:17,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Fairy Wind",
        category:2,
        pp:30,
        power:40,
        accuracy:100,
        type:17,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Moonblast",
        category:2,
        pp:15,
        power:95,
        accuracy:100,
        type:17,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Boomburst",
        category:2,
        pp:10,
        power:140,
        accuracy:100,
        type:0,
        target:4,
        flags:{protect:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Fairy Lock",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:17,
        target:5,
        flags:{mirror:1,skipsub:1}
    },
    {
        name:"King's Shield",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:8,
        target:0,
        flags:{},
        priority:4
    },
    {
        name:"Play Nice",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{magic:1,mirror:1,skipsub:1}
    },
    {
        name:"Confide",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:0,
        target:1,
        flags:{magic:1,mirror:1,sound:1,skipsub:1}
    },
    {
        name:"Diamond Storm",
        category:1,
        pp:5,
        power:100,
        accuracy:95,
        type:5,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Steam Eruption",
        category:2,
        pp:5,
        power:110,
        accuracy:95,
        type:10,
        target:1,
        flags:{protect:1,mirror:1,"thaw":1}
    },
    {
        name:"Hyperspace Hole",
        category:2,
        pp:5,
        power:80,
        accuracy:true,
        type:13,
        target:1,
        flags:{mirror:1,skipsub:1}
    },
    {
        name:"Water Shuriken",
        category:1,
        pp:20,
        power:15,
        accuracy:100,
        type:10,
        target:1,
        flags:{protect:1,mirror:1},
        priority:1,
        getHitCount : multihit
    },
    {
        name:"Mystical Fire",
        category:2,
        pp:10,
        power:65,
        accuracy:100,
        type:9,
        target:1,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Spiky Shield",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:11,
        target:0,
        flags:{},
        priority:4
    },
    {
        name:"Aromatic Mist",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:17,
        target:2,
        flags:{skipsub:1}
    },
    {
        name:"Eerie Impulse",
        category:0,
        pp:15,
        power:0,
        accuracy:100,
        type:12,
        target:1,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Venom Drench",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:3,
        target:3,
        flags:{protect:1,magic:1,mirror:1}
    },
    {
        name:"Powder",
        category:0,
        pp:20,
        power:0,
        accuracy:100,
        type:6,
        target:1,
        flags:{powder:1,protect:1,magic:1,mirror:1,skipsub:1},
        priority:1
    },
    {
        name:"Geomancy",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:17,
        target:0,
        flags:{nonsky:1}
    },
    {
        name:"Magnetic Flux",
        category:0,
        pp:20,
        power:0,
        accuracy:true,
        type:12,
        target:6,
        flags:{snatch:1,distance:1,skipsub:1}
    },
    {
        name:"Happy Hour",
        category:0,
        pp:30,
        power:0,
        accuracy:true,
        type:0,
        target:6,
        flags:{}
    },
    {
        name:"Electric Terrain",
        category:0,
        pp:10,
        power:0,
        accuracy:true,
        type:12,
        target:5,
        flags:{nonsky:1}
    },
    {
        name:"Dazzling Gleam",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:17,
        target:3,
        flags:{protect:1,mirror:1}
    },
    {
        name:"Celebrate",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{}
    },
    {
        name:"Hold Hands",
        category:0,
        pp:40,
        power:0,
        accuracy:true,
        type:0,
        target:0,
        flags:{}
    },
    {
        name:"Baby-Doll Eyes",
        category:0,
        pp:30,
        power:0,
        accuracy:100,
        type:17,
        target:1,
        flags:{protect:1,magic:1,mirror:1},
        priority:1
    },
    {
        name:"Nuzzle",
        category:1,
        pp:20,
        power:20,
        accuracy:100,
        type:12,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Hold Back",
        category:1,
        pp:40,
        power:40,
        accuracy:100,
        type:0,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Infestation",
        category:2,
        pp:20,
        power:20,
        accuracy:100,
        type:6,
        target:1,
        flags:{contact:1,protect:1,mirror:1}
    },
    {
        name:"Power-Up Punch",
        category:1,
        pp:20,
        power:40,
        accuracy:100,
        type:1,
        target:1,
        flags:{contact:1,protect:1,mirror:1,fist:1}
    },
    {
        name:"Oblivion Wing",
        category:2,
        pp:10,
        power:80,
        accuracy:100,
        type:2,
        target:1,
        flags:{protect:1,mirror:1,distance:1,heal:1},
        drain:0.75},
    {
        name:"Thousand Arrows",
        category:1,
        pp:10,
        power:90,
        accuracy:100,
        type:4,
        target:3,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Thousand Waves",
        category:1,
        pp:10,
        power:90,
        accuracy:100,
        type:4,
        target:3,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Land's Wrath",
        category:1,
        pp:10,
        power:90,
        accuracy:100,
        type:4,
        target:3,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Light of Ruin",
        category:2,
        pp:5,
        power:140,
        accuracy:90,
        type:17,
        target:1,
        flags:{protect:1,mirror:1},
        recoil:0.5
    },
    {
        name:"Origin Pulse",
        category:2,
        pp:10,
        power:110,
        accuracy:85,
        type:10,
        target:3,
        flags:{protect:1,pulse:1,mirror:1}
    },
    {
        name:"Precipice Blades",
        category:1,
        pp:10,
        power:120,
        accuracy:85,
        type:4,
        target:3,
        flags:{protect:1,mirror:1,nonsky:1}
    },
    {
        name:"Dragon Ascent",
        category:1,
        pp:5,
        power:120,
        accuracy:100,
        type:2,
        target:1,
        flags:{contact:1,protect:1,mirror:1,distance:1}
    },
    {
        name:"Hyperspace Fury",
        category:1,
        pp:5,
        power:100,
        accuracy:true,
        type:16,
        target:1,
        flags:{mirror:1,skipsub:1}
    }
];
for (var i = 0; i < Movedex.length; i++) {
    Movedex[i].num = i;
}