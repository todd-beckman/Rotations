var MoveList = {
    "Scratch" : {
        desc : "Damages an adjacent target.",
        typing : "Normal",
        cat : "Physical",
        pp : 35,
        pow : 40,
        acc : 100,
        tar : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
    },
    "Dazzling Gleam" : {
        desc : "Damages adjacent opposing foes.",
        typing : "Fairy",
        cat : "Special",
        pow : 80,
        acc : 100,
        tar : "adjacent foes"
        flags : {protect : 1, kingsrock : 1}
    }
    "Celebrate" : {
        desc : "Does absolutely nothing.",
        typing : "Normal",
        cat : "Status",
        pp : 40,
        tar : "Self",
        onSuccess : function (user) {
            game.write("Congratulations, " + team.nick + "!");
        }
    },
    "Hold Hands" : {
        desc : "Holds adjacent ally's hand to no effect.",
        typing : "Normal",
        cat : "Status",
        pp : 40,
        tar : "adjacent ally",
    }
    "Baby-Doll Eyes" : {
        desc : "Lowers the adjacent target's Attack with high priority.",
        typing : "Fairy",
        cat : "Status",
        pp : 30,
        acc : 100,
        priority : 1,
        flags : {contact : 1, protect : 1, magic : 1, snatch : 1, kingsrock : 1},
    }
    "Nuzzle" : {
        desc : "Damages the adjacent target and paralyzes it.",
        typing : "Electric",
        cat : "Physical",
        pow : 20,
        pp : 20,
        acc : 100,
        flags : {contact : 1, protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            foe.onGetStatus("Paralysis", user);
        }
    }
    "Hold Back" : {
        desc : "Damages the adjacent target, but never causes it to faint.",
        typing : "Normal",
        cat : "Physical",
        pow : 40,
        pp : 40,
        acc : 100,
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {holdback : 1}
    }
    "Infestation" : {
        desc : "Damages and partially traps the adjacent target.",
        typing : "Bug",
        cat : "Special",
        pow : 20,
        pp : 20,
        acc : 100,
        tar : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1}
        effects : {bind : true};
    },
    "Power-Up Punch" : {
        desc : "Damages an adjacent target and raises the user's Attack.",
        typing : "Fighting",
        cat : "Physical",
        pp : 20,
        pow : 40,
        acc : 100,
        tar : "any adjacent",
        flags : {contact : 1, protect : 1, , kingsrock : 1, punch : 1}
        onSuccess : function (user) {
            user.onStatChange("Attack", 1);
        }
    },
    "Oblivion Wing" : {
        desc : "Damages the target and drains 75% of the damage dealt.",
        typing : "Normal",
        cat : "Physical",
        pp : 10,
        pow : 80,
        acc : 100,
        tar : "any",
        flags : {protect : 1, kingsrock : 1},
        effects : {drain : .75}
    },
    "Thousand Arrows" : {
        desc : "Damages all adjacent foes and knocks them out of the air.",
        typing : "Ground",
        cat : "Physical",
        pp : 10,
        pow : 90,
        acc : 100,
        tar : "all adjacent foes",
        flags : {protect : 1, kingsrock : 1},
        onTargetSemiInvulnerable : function (user, foe) {
            //  Hits flying, bouncing, and skydrop
            return (foe.flying || foe.bouncing || skydrop);
        },
        onPowerModifiedCheck : function (user, foe) {
            //  Boosts power against flying, bouncing, and skydrop
            if (foe.flying || foe.bouncing || skydrop) {
                return this.pow * 2;
            }
            return this.pow;
        }
        onSuccess : function (user, foe) {
            foe.grounded = true;
            if (-1 < foe.types.indexof(Type.Ground)
            ||  foe.item == Item["Air Balloon"]
            ||  foe.ability == "Levitate") {
                game.write(foe.teambuild.nickname + " fell straight down!");
            }
            if (foe.flying) {
                foe.flying = false;
            }
            else if (foe.bouncing) {
                foe.bouncing = false;
            }
        }
    },
    "Thousand Waves" : {
        desc : "Damages all adjacent foes and prevents them from switching.",
        typing : "Ground",
        cat : "Physical",
        pp : 10,
        pow : 90,
        acc : 100,
        tar : "all adjacent foes",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            //  Either never blocked yet or not already blocking
            if (!foe.block || -1 == foe.block.indexOf(user)) {
                foe.block.push(user);
                game.write(foe.nonvolatile.nick + " can no longer escape!");
            }
        }
    },
    "Land's Wrath" : {
        desc : "Damages all adjacent foes.",
        typing : "Ground",
        cat : "Physical",
        pp : 10,
        pow : 90,
        acc : 100,
        tar : "all adjacent foes",
        flags : {protect : 1, kingsrock : 1}
    }
    "Light of Ruin" : {
        desc : "Damages an adjacent target with 1/2 recoil damage.",
        typing : "Fairy",
        cat : "Special",
        pp : 5,
        pow : 140,
        acc : 90,
        tar : "any adjacent",
        flags : {protect : 1, kingsrock : 1}
        effects : {recoil : 0.5},
    }
    "Origin Pulse" : {
        desc : "Damages all adjacent foes.",
        typing : "Water",
        cat : "Special",
        pp : 10,
        pow : 110,
        acc : 85,
        tar : "adjacent foes",
        flags : {protect : 1, kingsrock : 1, launcher : 1, bullet : 1}
    }
    "Precipice Blades" : {
        desc : "Damages all adjacent foes."
        pow : 120,
        acc : 85,
        pp : 10,
        cat : "Physical",
        typing : "Ground",
        tar : "adjacent foes",
        flags : {protect : 1, kingsrock : 1}
    }
    "Dragon Ascent" : {
        desc : "Damages the foe and lowers both of the user's defenses.",
        pow : 120,
        acc : 100,
        pp : 5,
        cat : "Physical",
        typing : "Flying",
        tar : "any",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        onSuccess : function(user){
            user.onStatChange("Defense", -1);
            user.onStatChange("Special Defense", -1);
        },
    },
    "Hyperspace Fury" : {
        desc : "Lifts all protection and always hits target adjacent foe. The user's Defense is then lowered.",
        pow : 100,
        pp : 5,
        cat : "Physical"
        typing : "Dark",
        tar : "any adjacent",
        flags : {kingsrock : 1},
        preConditions : function (user) {
            if (user.template.name == "Hoopa") {
                game.write("But " + user.nonvolatile.nickname + " can't use it the way it is now.");
                return false;
            }
            if (user.template.name != "Hoopa-Confined") {
                game.write("But it can't use the move!");
                return false;
            }
            return true;
        },
        onSuccess : function (user, foe) {
            user.onStatChange("Defense", -1);
            foe.protection = false;
            foe.team.thisturn.protection = false;
        }
    },
    //  SHADOW MOVES -- Unofficial
    //  Because why they hell not
    "Shadow Blitz" : {
        desc : "Damages adjacent target.",
        pow : 40,
        acc : 100,
        pp : 30,
        cat : "Physical",
        typing : "Shadow",
        flags : {contact : 1, protect : 1, kingsrock : 1}
    },
    "Shadow Rush" : {
        desc : "Puts the user in Hyper mode and then deals damage.",
        pow : 90,
        acc : 100,
        pp : 5,
        cat : "Physical",
        typing : "Shadow",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {crit : 1},
        takeChargeTurn : function (user) {
            if (!user.volatile.hyper) {
                user.volatile.hyper = true;
                game.write(user.teambuild.nick + "'s emotions rose to a fever pitch!");
                return true;
            }
            return false;
        }
    }
    "Shadow Break" : {
        desc : "Damages adjacent target.",
        pow : 75,
        acc : 100,
        pp : 5,
        cat : "Physical",
        typing : "Shadow",
        tar : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {recoil : 0.5}
    },
    "Shadow End" : {
        desc : "Damages adjacent target and deals 1/2 recoil damage.",
        pow : 120,
        acc : 60,
        pp : 5,
        cat : "Physical",
        typing : "Shadow",
        tar : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {recoil : 0.5}
    },
    "Shadow Wave" : {
        desc : "Damages all adjacent foes.",
        pow : 50,
        acc : 100,
        pp : 5,
        cat : "Special",
        typing : "Shadow",
        tar : "all adjacent",
        flags : {protect : 1}
    },
    "Shadow Rave" : {
        desc : "Damages all adjacent foes.",
        pow : 70,
        acc : 100,
        pp : 5,
        cat : "Special",
        typing : "Shadow",
        tar : "all adjacent",
        flags : {protect : 1}
    },
    "Shadow Storm" : {
        desc : "Damages all adjacent foes.",
        pow : 95,
        acc : 100,
        pp : 5,
        cat : "Special",
        typing : "Shadow",
        tar : "all adjacent",
        flags : {protect : 1}
    },
    "Shadow Fire" : {
        desc : "Damages adjacent target and has a 10% chance of burning."
        pow : 75,
        acc : 100,
        pp : 5,
        cat : "Special",
        typing : "Shadow",
        tar : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(10) < 1) {
                foe.onGetStatus("Burn", source);
            }
        }
    },
    "Shadow Bolt" : {
        desc : "Damages adjacent target and has a 10% chance of paralyzing."
        pow : 75,
        acc : 100,
        pp : 5,
        cat : "Special",
        typing : "Shadow",
        tar : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(10) < 1) {
                foe.onGetStatus("Paralysis", source);
            }
        }
    },
    "Shadow Chill" : {
        desc : "Damages adjacent target and has a 10% chance of freezing."
        pow : 75,
        acc : 100,
        pp : 5,
        cat : "Special",
        typing : "Shadow",
        tar : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(10) < 1) {
                foe.onGetStatus("Freeze", source);
            }
        }
    },
    "Shadow Blast" : {
        desc : "Damages adjacent target with a high critical-hit ratio."
        pow : 80,
        acc : 100,
        pp : 5,
        cat : "Physical",
        typing : "Shadow",
        tar : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        effects : {crit : 1};
    },
    "Shadow Sky" : {
        desc : "Causes the Shadow Sky weather condition.",
        pp : 5,
        cat : "Status",
        typing : "Shadow",
        tar : "field",
        onSuccess : function (user) {
            var duration = 5;
            if (user.ability.extend["Shadow"]) {
                duration = user.ability.extend["Shadow"];
            }
            else if (user.item.extend["Shadow"]) {
                duration = user.item.extend["Shadow"];
            }
            field.weather = {type : "Shadow", turns: duration};
        }
    },
    "Shadow Hold" : {
        desc : "Prevents adjacent foes from escaping.",
        pp : 5,
        acc : 100,
        cat : "Status",
        typing : "Shadow",
        tar : "adjacent foes",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            foe.block.push(user);
            game.write(foe.nonvolatile.nick + " can no longer escape!");
        }
    },
    "Shadow Mist" : {
        desc : "Sharply lowers all opposing foes' Evasion.",
        pp : 5,
        acc : 100,
        cat : "Status",
        typing : "Shadow",
        tar : "all foes",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Evasion", -2, user);
        }
    },
    "Shadow Panic" : {
        desc : "Confuses all opposing foes.",
        pp : 5,
        acc : 60,
        cat : "Status",
        typing : "Shadow",
        tar : "all foes",
        flags : {protect : 1, sound : 1},
        onSuccess : function (user, foe) {
            foe.onGetConfused(user);
        }
    },
    "Shadow Down" : {
        desc : "Sharply lowers opposing foes' Defense stat.",
        pp : 5,
        cat : "Status",
        acc : 100,
        typing : "Shadow",
        tar : "all foes",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Defense", -2, user);
        }
    },
    "Shadow Shed" : {
        desc : "Removes Safeguard, Reflect, and Light Screen from the battle.",
        pp : 10,
        cat : "Status",
        typing : "Shadow",
        tar : "field",
        onSuccess : function () {
            for (var i = 0; i < field.teams.length; i++) {
                var team = field.teams[i];
                if (team.reflect) {
                    game.write(team.nick + "'s Reflect faded!");
                    team.reflect = 0;
                }
                if (team.lighscreen) {
                    game.write(team.nick + "'s Light Screen faded!");
                    team.lightscreen = 0;
                }
                if (team.safeguard) {
                    game.write(team.nick + "'s Safeguard ended!");
                    team.safeguard = 0;
                }
            }
        }
    },
    "Shadow Half" : {
        desc : "Halves HP of all Pokemon in battle.",
        pp : 5,
        cat : "Status",
        typing : "Shadow",
        tar : "all",
        flags : {protect : 1}, 
        onSuccess : function (user, foe) {
            //  Only applied on targets it is successful for
            if (1 < foe.nonvolatile.hpleft) {
                foe.nonvolatile.hpleft /= 2;
            }
        }
    }   
}