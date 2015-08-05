var MoveList = {
    "Scratch" : {
        desc : "Damages a target.",
        typing : "Normal",
        contest : "Tough",
        category : "Physical",
        pp : 35,
        power : 40,
        acc : 100,
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1}
    },
    
    "Clear Smog" : {
        desc : "Damages the target and clears its stat changes.",
        typing : "Poison",
        contest : "Beautiful",
        category : "Special",
        pp : 15,
        power : 50,
        flags : {protect : 1, kingsrock : 1},
        preCondition : function (user, foe) {
            return !(foe.temporary.fly || foe.temporary.dig
            ||  foe.temporary.dive || foe.temporary.phantom
            ||  foe.temporary.skydrop || foe.temporary.bounce);
        },
        onSuccess : function (user, foe) {
            if (!foe.temporary.substitute) {
                foe.temporary.statboosts = {
                    "HP" : 0, "Attack" : 0, "Defense" : 0, "Speed" : 0,
                    "Special Attack" : 0, "Special Defense" : 0,
                    "Accuracy" : 0, "Evasion" : 0
                };
            }
        }
    },
    "Stored Power" : {
        desc : "Damages the target. Gets stronger as the user gains stat boosts.",
        typing : "Psychic",
        contest : "Clever",
        category : "Special",
        pp : 10,
        power : 20,
        acc : 100,
        flags : {protect : 1, kingsrock : 1}
        target : "any adjacent",
        onPowerModified : function (user) {
            //  Always does *something*
            var count = 1;
            for (var i in user.temporary.statboosts) {
                var boosts = user.temporary.statboosts[i];
                if (0 < boosts) {
                    count += boosts;
                }
            }
            return 20 * count;
        }
    },
    "Quick Guard" : {
        desc : "Blocks priority moves from targetting the user's team.",
        typing : "Fighting",
        contest : "Cool",
        category : "Status",
        pp : 15,
        effects : {priority : 1},
        target : "user team",
        onSuccess : function (user) {
            user.team.protection.quickguard = true;
        }
    },
    "Ally Switch" : {
        desc : "Switches places with the ally opposite it. Fails if the user is in the middle of a Triples battle.",
        typing : "Psychic",
        contest : "Clever",
        category : "Status",
        pp : 15,
        effects : {priority : 1},
        target : "self",
        preCondition : function (user) {
            if (field.mode == "Triples") {
                var slot = user.getSlot();
                //  [0, 1, 2], 3, 4, 5 (1 is in the middle)
                switch (slot) {
                    case 1:
                        return false;
                    case 0:
                        return !(user.team.slots[2].empty);
                    case 2:
                        return !(user.team.slots[0].empty);
                }
            }
            if (field.mode == "Doubles") {
                var slot = user.getSlot();
                return !(user.team.slots[(slot + 1) % 2].empty);
            }
            return false;
        },
        onSuccess : function (user) {
            //  for security, define dest so nothing happens at the worst
            var slot = user.getSlot(), dest = slot;
            if (field.mode == "Triples") {
                dest = slot ? 0 : 2;
            }
            else if (field.mode == "Doubles") {
                dest = slot ? 0 : 1;
            }
            user.team.slots[slot] = user.team.slots[dest];
            user.team.slots[dest] = user;
        }
    },
    "Scald" : {
        desc : "Damages the target with a 30% Burn chance.",
        typing : "Water",
        contest : "Tough",
        category : "Special",
        pp : 15,
        power : 80,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1, thaw : 1},
        onSuccess : function (user, foe) {
            if (foe.permanent.health == "Freeze") {
                foe.thaw();
            }
            if (game.rand(user, 10) < 3) {
                foe.onGetStatus("Burn");
            }
        }
    },
    "Shell Smash" : {
        desc : "Lowers the user's Defense and Special Defense, then sharply raises the uer's Attack, Special Attack, and Speed."
        typing : "Normal",
        contest : "Tough",
        category : "Status",
        pp : 15,
        flags : {snatch : 1},
        target : "self",
        onSuccess : function (user) {
            user.onStatChange("Defense", -1);
            user.onStatChange("Special Defense", -1);
            user.onStatChange("Attack", 2);
            user.onStatChange("Special Attack", 2);
            user.onStatChange("Speed", 2);
        }
    },
    "Heal Pulse" : {
        desc : "Heals the target.",
        typing : "Psychic",
        contest : "Beautiful",
        category : "Status",
        pp : 10,
        target : "any",
        flags : {protect : 1, magic : 1, launcher : 1},
        onSuccess : function (user, foe) {
            //  hardcoded since Mega Launcher fires on damage calc
            //  which is not run for status moves
            if (user.permanent.ability.launcher) {
                foe.heal(foe.permanent.basestats.hp * .75);
            }
            else {
                foe.heal(foe.permanent.basestats.HP / 2);
            }
        }
    },
    "Hex" : {
        desc : "Damages the target. Doubles in power against foes with Status afflictions.",
        typing : "Ghost",
        contest : "Clever",
        status : "Special",
        pp : 10,
        power : 65,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onPowerModified : function (user, foe) {
            if (foe.permanent.health != "Healthy") {
                return 130;
            }
            return 65;
        }
    },
    //  TODO
    "Sky Drop" : {
        desc : "Picks up the target on the first turn and then attacks the second.",
        typing : "Flying",
        contest : "Tough",
        category : "Physical",
        pp : 10,
        power : 60,
        acc : 100,
        preCondition : function (user, foe) {
            if (field.countdown.gravity) {
                return false;
            }
            return true;
        }
    },
    "Shift Gear" : {
        desc : "Raises the user's Attack and sharply raises its Speed.",
        typing : "Steel",
        contest : "Clever",
        category : "Status",
        pp : 10,
        target : "self",
        flags : {snatch : 1},
        onSuccess : function (user) {
            user.onStatChange("Attack", 1);
            user.onStatChange("Speed", 2);
        }
    },
    "Circle Throw" : {
        desc : "Damages the target and forces it to switch.",
        typing : "Fighting",
        category : "Physical",
        target : "any adjacent",
        contest : "Cool",
        pp : 10,
        power : 60,
        acc : 90,
        effects : {priority: -6},
        flags : {contact : 1, protect : 1},
        onComplete : function (user, foe) {
            foe.onPhaze();
        }
    },
    "Incinerate" : {
        desc : "Damages the opposing Pokemon and ruins their Berries and Gems.",
        typing : "Fire",
        contest : "Tough",
        category : "Special",
        pp : 15,
        power : 60,
        acc : 100,
        target : "adjacent foes",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (foe.permanent.item) {
                if (foe.permanent.item.berry
                ||  foe.permanent.item.gem) {
                    foe.loseItem();
                }
            }
        }
    },
    "Quash" : {
        desc : "Target moves last if it hasn't moved yet.",
        typing : "Dark",
        contest : "Clever",
        category : "Status",
        pp : 15,
        acc : 100,
        flags : {protect : 1, magic : 1},
        target : "any adjacent",
        preCondition : function (user, foe) {
            return !(foe.hasmoved);
        },
        onSuccess : function (user, foe) {
            //  I swear this is not bad design
            var i = field.monsSorted.indexOf(foe);
            field.monsSorted.splice(i, 1);
            field.monsSorted.push(foe);
        }
    },
    "Acrobatics" : {
        desc : "Damages the target. If the user has no item, the power is doubled.",
        typing : "Flying",
        contest : "Cool",
        category : "Physical",
        pp : 15,
        power : 55,
        acc : 100,
        target : "any",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        onPowerModified : function (user) {
            if (user.permanent.item) {
                return 55;
            }
            return 110;
        }
    },
    "Reflect Type" : {
        desc : "Changes types to match the target's.",
        typing : "Normal",
        contest : "Clever",
        category : "Status",
        pp : 15,
        target : "any adjacent",
        flags : {snatch : 1},
        preCondition : function (user, foe) {
            //  Must hard-code this.
            return !(foe.teambuild.ability == "Multitype");
        },
        onSuccess : function (user, foe) {
            user.permanent.types : foe.template.types;
        }
    },
    "Retaliate" : {
        desc : "Damages a target. Doubles in power if a member of the user's team fainted last turn.",
        typing : "Normal",
        contest : "Cool",
        category : "Physical",
        pp : 5,
        acc : 100,
        power : 70,
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        onPowerModified : function (user) {
            if (user.team.thisturn.retaliate) {
                return 140;
            }
            return 70;
        }
    },
    "Final Gambit" : {
        desc : "Normal",
        contest : "Tough",
        category : "Physical",
        pp : 5,
        acc : 100,
        flags : {contact : 1, protect : 1},
        getDamageOutput : function (self, foe) {
            var damage = self.permanent.hpleft;
            //  Self faints first
            self.permanent.hpleft = 0;
            self.onFaint();
            return damage;
        }
    },
    "Bestow" : {
        desc : "User gives the target its item.",
        typing : "Normal",
        contest : "Cute",
        category : "Status",
        pp : 15,
        target : "any adjacent",
        flags : {protect : 1},
        preCondition : function (user, foe) {
            //  Foe can't be holding an item
            if (foe.permanent.item) {
                return false;
            }
            //  User must be able to let go of the item
            if (user.permanent.item.stickyhold) {
                return false;
            }
        },
        onSuccess : function (user, foe) {
            foe.giveItem(user.permanent.item);
            user.takeItem();
        }
    },
    "Inferno" : {
        desc : "Damages and burns the target.",
        typing : "Fire",
        contest : "Beautiful",
        category : "Special",
        pp : 5,
        power : 100,
        acc : 50,
        target : "any adjacent",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            foe.onGetStatus("Burn", user);
        }
    },
    //  TODO Pledges
    "Grass Pledge" : {
        desc : "Damages the foe. Use with other Pledges for special effects.",
        typing : "Grass",
        contest : "Beautiful",
        category : "Special",
        pp : 10,
        power : 80,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1}
    }
    "Fire Pledge" : {
        desc : "Damages the foe. Use with other Pledges for special effects.",
        typing : "Fire",
        contest : "Beautiful",
        category : "Special",
        pp : 10,
        power : 80,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1}
    }
    "Water Pledge" : {
        desc : "Damages the foe. Use with other Pledges for special effects.",
        typing : "Water",
        contest : "Beautiful",
        category : "Special",
        pp : 10,
        power : 80,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1}
    }
    "Volt Switch" : {
        desc : "Damages the target. The user then switches out.",
        typing : "Electric",
        contest : "Cool",
        category : "Special",
        pp : 20,
        pow : 70,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        effects : {retreat : "uturn"}
    },
    "Struggle Bug" : {
        desc : "Damages the opposing Pokemon and lowers their Special Attack.",
        typing : "Bug",
        contest : "Cute",
        category : "Special",
        pp : 20,
        power : 50,
        acc : 100,
        target : "adjacent foes",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Special Attack", -1, user);
        }
    }
    "Bulldoze" : {
        desc : "Damages all adjacent Pokemon and lowers their Speed.",
        typing : "Ground",
        contest : "Tough",
        category : "Physical",
        pp : 20,
        power : 60,
        acc : 100,
        target : "all adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Speed", -1, user);
        }
    }
    "Frost Breath" : {
        desc : "Damages the target and always lands a Critical Hit.",
        typing : "Ice",
        contest : "Beautiful",
        category : "Special",
        pp : 10,
        power : 60,
        acc : 90,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        effects : {alwayscrit : 1}
    },
    "Dragon Tail" : {
        desc : "Damages the foe and forces it to switch out.",
        typing : "Dragon",
        contest : "Tough",
        category : "Physical",
        pp : 10,
        power : 60,
        acc : 90,
        effects : {priority : -6},
        flags : {contact : 1, protect : 1},
        target : "any adjacent",
        onComplete : function (user, foe) {
            foe.onPhaze();
        }
    },
    "Work Up" : {
        desc : "Raises the user's Attack and Special Attack.",
        typing : "Normal",
        contest : "Tough",
        category : "Status",
        pp : 30,
        target : "self",
        flags : {snatch : 1},
        onSuccess : function (user) {
            user.onStatChange("Attack", 1);
            user.onStatChange("Special Attack", 1);
        }
    },
    "Electroweb" : {
        desc : "Hits opposing foes and lowers each of ther Speed stats.",
        typing : "Electric",
        contest : "Beautiful",
        category : "Special",
        pp : 15,
        power : 55,
        acc : 95
        target : "adjacent foes",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Speed", -1, user);
        }
    },
    "Wild Charge" : {
        desc : "Damages a foe and gives 25% recoil to the user.",
        typing : "Electric",
        contest : "Tough",
        category : "Physical",
        pp : 15,
        power : 90,
        acc : 100,
        target : "any adjacent",
        effects : {recoil : .25},
        flags : {contact : 1, protect : 1, kingsrock : 1}
    },
    "Drill Run" : {
        desc : "Damages a target with a higher critical hit chance.",
        typing : "Ground",
        contest : "Tough",
        category : "Physical",
        pp : 10,
        power : 00,
        acc : 95,
        target : "any adjacent",
        effects : {crit : 1},
        flags : {contact : 1, protect : 1, kingsrock : 1}
    },
    "Dual Chop" : {
        desc : "Hits the target twice.",
        typing : "Dragon",
        contest : "Tough",
        category : "Physical",
        pp : 15,
        power : 40,
        acc : 90,
        target : "any adjacent",
        effects : {dualhit : 1},
        flags : {contact : 1, protect : 1, kingsrock : 1}
    },
    "Heart Stamp" : {
        desc : "Damages a target with a 30% flinch rate.",
        typing : "Psychic",
        contest : "Cute",
        category : "Physical",
        pp : 25,
        power : 60,
        acc : 100,
        target : "any adjacent",
        flags : {contact : 1, protect : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 3) {
                foe.thisturn.flinch = true;
            }
        }
    },
    "Horn Leech" : {
        desc : "Damages a target and restores 50% of the damage to the user.",
        typing : "Grass",
        contest : "Tough",
        category : "Physical",
        pp : 10,
        power : 75,
        acc : 100,
        target : "any adjacent",
        flags : {contact : 1, protect : 1},
        effects : {drain : .5}
    },
    "Sacred Sword" : {
        desc : "Damages a target, ignoring its Defense and Evasion boosts.",
        typing : "Fighting",
        contest : "Cool",
        category : "Physical",
        pp : 15,
        power : 90,
        acc : 100,
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {ignoreboosts : 1}
    },
    "Razor Shell" : {
        desc : "Damages the target and lowers its Defense 50% of the time.",
        typing : "Water",
        contest : "Cool",
        category : "Physical",
        pp : 10,
        power : 75,
        acc : 95,
        target : "any adjacent",
        flags : {contact : 1, protect : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 5) {
                foe.onStatChange("Defense", -1, user);
            }
        }
    },
    "Heat Crash" : {
        desc : "Deals more damage the heavier the user is than the target. ",
        typing : "Fire",
        contest : "Tough",
        category : "Physical",
        pp : 10,
        power : 80,
        acc : 100,
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        onPowerModified : function (user, foe) {
            var src = user.weight();
            var tar = foe.weight();
            //  Divide by 0 glitch that caused ironic "Heat Crash"
            //  that gave Pokemon Online devs headaches for weeks
            if (Math.floor(tar) == 0) {
                tar = 1;
            }
            var ratio = src / tar;
            if (ratio <= .2) {
                return 120;
            }
            if (ratio <= .25) {
                return 100;
            }
            if (ratio <= 1/3) {
                return 80;
            }
            if (ratio <= .5) {
                return 60;
            }
            return 40;
        }
    },
    "Leaf Tornado" : {
        desc : "Damages the target and lowers its accuracy 50% of the time.",
        typing : "Grass",
        contest : "Cool",
        category : "Special",
        pp : 10,
        power : 65,
        acc : 90,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 2) < 1) {
                foe.onStatChange("Accuracy", -1, user);
            }
        }
    },
    "Steamroller" : {
        desc : "Damages with a 30% flinch rate. Twice as strong against Minimize users.",
        typing : "Bug",
        contest : "Tough",
        category : "Physical",
        pp : 20,
        power : 65,
        acc : 100,
        target : "any adjacent",
        flags : {contact : 1, protect : 1},
        onAccuracyTest : function (user, foe) {
            if (foe.temporary.minimze) {
                return false;
            }
            return true;
        }
        onPowerModified : function (user, foe) {
            if (foe.temporary.minimize) {
                return 130;
            }
            return 65;
        }
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 3) {
                foe.thisturn.flinch = true;
            }
        }
    },
    "Cotton Guard" : {
        desc : "Drastically raises the user's Defense.",
        typing : "Grass",
        contest : "Cute",
        category : "Status",
        pp : 10,
        target : "self",
        flags : {snatch : 1},
        onSuccess : function (user) {
            user.onStatChange("Defense", 3);
        }
    },
    "Night Daze" : {
        desc : "Damages the target and lowers its Accuracy 40% of the time.",
        typing : "Dark",
        contest : "Cool",
        category : "Special",
        pp : 10,
        power : 85,
        acc : 95,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 4) {
                foe.onStatChange("Accuracy", -1, user);
            }
        }
    },
    "Psystrike" : {
        desc : "Damages the target using its Defense stat.",
        typing : "Psychic",
        contest : "Cool",
        category : "Special",
        pp : 10,
        power : 100,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        effects : {usedef : 1}
    },
    "Tail Slap" : {
        desc : "Hits 2-5 times.",
        typing : "Normal",
        contest : "Cute",
        category : "Physical",
        pp : 10,
        power : 25,
        acc : 85,
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {multihit : 1}
    },
    "Hurricane" : {
        desc : "Damages the target, has 10% confusion chance, and always hits in the rain.",
        typing : "Flying",
        contest : "Tough",
        category : "Special",
        pp : 10,
        power : 110,
        acc : 70,
        target : "any",
        flags : {protect : 1, kingsrock : 1},
        onAccuracyTest : function (user, foe) {
            return !field.weather.type == "Rain"
            ||  !foe.temporary.flying
            ||  !foe.temporary.bouncing
            ||  !foe.temporary.skydrop;
        },
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 3) {
                foe.onGetConfused(user);
            }
        }
    },
    "Head Charge" : {
        desc : "Damages the target and deals 25% recoil to the user.",
        typing : "Normal",
        contest : "Tough",
        category : "Physical",
        pp : 15,
        power : 120,
        acc : 100,
        target : "any adjacent",
        effects : {recoil : .25},
        flags : {contact : 1, protect : 1, kingsrock : 1}
    },
    "Gear Grind" : {
        desc : "Hits the target two times.",
        typing : "Steel",
        contest : "Clever",
        category : "Physical",
        pp : 15,
        power : 50,
        acc : 85,
        target : "any adjacent",
        effects : {dualhit : true},
        flags : {contact : 1, protect : 1}
    },
    "Searing Shot" : {
        desc : "Damages all adjacent Pokemon and has a 30% chance of burning each of them.",
        typing : "Fire",
        contest : "Cool",
        category : "Special",
        pp : 5,
        power : 100,
        acc : 100,
        target : "all adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 3) {
                foe.onGetStatus("Burn", user);
            }
        }
    },
    "Techno Blast" : {
        desc : "Damages a target. Its type depends on the Drive being held.",
        typing : "Normal",
        contest : "Cool",
        category : "Special",
        pp : 5,
        power : 120,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onTypeModified : function (user) {
            var item = user.permanent.item;
            if (item && item.technoBlast) {
                return item.technoBlast();
            }
            return "Normal";
        }
    },
    "Relic Song" : {
        desc : "Damages and has a 10% chance of putting the opposing Pokemon to sleep.",
        typing : "Normal",
        contest : "Beautiful",
        category : "Special",
        pp : 10,
        power : 75,
        acc : 100,
        target : "adjacent foes",
        flags : {protect : 1, sound : 1},
        onSuccess : function (user, foe) {
            if (game.rand(10) < 1) {
                foe.onGetStatus("Sleep", user);
            }
        }
        onComplete : function (user) {
            if (user.template.name == "Meloetta") {
                user.loadFromTemplate("Meloetta-Pirouette");
            }
            else if (user.template.name == "Meloetta-Pirouette") {
                user.loadFromTemplate("Meloetta");
            }
        }
    },
    "Secret Sword" : {
        desc : "Damages the target using its Defense stat.",
        typing : "Fighting",
        contest : "Beautiful",
        category : "Special",
        pp : 10,
        power : 85,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1, usedef : 1}
    },
    "Glaciate" : {
        desc : "Deals damage to and lowers the Speed of all adjacent foes.",
        typing : "Ice",
        contest : "Beautiful",
        category : "Special",
        pp : 10,
        power : 65,
        acc : 95,
        target : "adjacent foes",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Speed", -1, user);
        }
    },
    "Bolt Strike" : {
        desc : "Deals damage and has a 20% chance of paralyzing the target.",
        typing : "Electric",
        contest : "Beautiful",
        category : "Physical",
        pp : 5,
        power : 130,
        acc : 85,
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 2) {
                foe.onGetStatus("Paralysis", user);
            }
        }
    },
    "Blue Flare" : {
        desc : "Deals damage and has a 20% chance of burning the target.",
        typing : "Fire",
        contest : "Beautiful",
        category : "Special",
        pp : 5,
        power : 130,
        acc : 85,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1, thaw : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 2) {
                foe.onGetStatus("Burn", user);
            }
        }
    },
    "Fiery Dance" : {
        desc : "Damages the target and has a 50% chance of raising the user's Special Attack.",
        typing : "Fire",
        contest : "Beautiful",
        category : "Special",
        pp : 10,
        power : 80,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user) {
            if (game.rand(user, 2) < 1) {
                user.onStatChange("Special Attack", 1);
            }
        }
    },
    "Freeze Shock" : {
        desc : "User charges and then damages the target with a 30% chance of paralyzing it.",
        typing : "Ice",
        contest : "Beautiful",
        category : "Physical",
        pp : 5,
        power : 140,
        acc : 90,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        takeChargeTurn : function (user, foe) {
            if (user.temporary.charging) {
                user.temporary.charging = false;
                return true;
            }
            user.temporary.charging = true;
            return false;
        },
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 3) {
                foe.onGetStatus("Paralysis", user);
            }
        }
    },
    "Ice Burn" : {
        desc : "User charges and then damages the target with a 30% chance of burning it.",
        typing : "Ice",
        contest : "Beautiful",
        category : "Special",
        pp : 5,
        power : 140,
        acc : 90,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        takeChargeTurn : function (user, foe) {
            if (user.temporary.charging) {
                user.temporary.charging = false;
                return true;
            }
            user.temporary.charging = true;
            return false;
        },
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 3) {
                foe.onGetStatus("Burn", user);
            }
        }
    },
    "Snarl" : {
        desc : "Damages adjacent foes and lowers their Special Attack.",
        typing : "Dark",
        contest : "Tough",
        category : "Special",
        pp : 15,
        power : 55,
        acc : 95,
        target : "adjacent foes",
        flags : {contact : 1, kingsrock : 1, sound : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Special Attack", -1, user);
        }
    },
    "Icicle Crash" : {
        desc : "Damages the target and has a 30% chance of causing flinching.",
        typing : "Ice",
        contest : "Beautiful",
        category : "Physical",
        pp : 10,
        power : 85,
        acc : 90,
        target : "any adjacent",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 3) {
                foe.thisturn.flinch = true;
            }
        }
    },
    "V-create" : {
        desc : "Deals damage and then lowers the user's Defense, Special Defense, and Speed.",
        typing : "Fire",
        contest : "Cool",
        category : "Physical",
        pp : 5,
        power : 180,
        acc : 95,
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        onSuccess : function (user) {
            user.onStatChange("Defense", -1);
            user.onStatChange("Special Defense", -1);
            user.onStatChange("Speed", -1);
        }
    },
    "Fusion Flare" : {
        desc : "Deals damage. Doubles in power if used after Fusion Flare.",
        typing : "Fire",
        contest : "Beaituiful",
        category : "Special",
        pp : 5,
        power : 100,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1, thaw : 1},
        onPowerModified : function () {
            if (field.lastmove == "Fusion Bolt"
            ||  field.lastmove == "Bolt Strike") {
                return 200;
            }
            return 100;
        }
    },
    "Fusion Bolt" : {
        desc : "Deals damage. Doubles in power if used after Fusion Flare.",
        typing : "Electric",
        contest : "Cool",
        category : "Physical",
        pp : 5,
        power : 100,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onPowerModified : function () {
            if (field.lastmove == "Fusion Flare"
            ||  field.lastmove == "Blue Flare") {
                return 200;
            }
            return 100;
        }
    },
    "Flying Press" : {
        desc : "Damages the target with both Fighting and Flying effectiveness.",
        typing : "Fighting",
        contest : "Tough",
        category : "Physical",
        pp : 10,
        power : 80,
        acc : 95,
        target : "any",
        effects : {dualtype : "Flying"},
        flags : {contact : 1, protect : 1, kingsrock : 1}
    },
    "Mat Block" : {
        desc : "Protects the user's team from attacks.",
        typing : "Fighting",
        contest : "Cool",
        category : "Status",
        pp : 10,
        target : "Self",
        onSuccess : function (user) {
            user.team.this.turn.protection.matblock = true;
        }
    },
    "Belch" : {
        desc : "If the user has eaten a Berry previously, it may use this attack.",
        typing : "Poison",
        contest : "Tough",
        category : "Status",
        pp : 10,
        power : 120,
        acc : 90,
        flags : {protect : 1},
        target : "any adjacent",
        preCondition : function (user) {
            if (user.permanent.eatenberry) {
                return true;
            }
            return false;
        }
    },
    "Rototiller" : {
        desc : "Raises the Attack and Special Attack of all Grass-type Pokemon in battle."
        typing : "Ground",
        contest : "Tough",
        category : "Status",
        pp : 10,
        target : "all",
        preCondition : function () {
            for (var i = 0; i < field.monsBySpeed; i++) {
                if (field.monsBySpeed[i].hasType("Grass")) {
                    return true;
                }
            }
            return false;
        },
        onSuccess : function (user, foe) {
            foe.onStatChange("Attack", 1, user);
            foe.onStatChange("Special Attack", 1, user);
        }
    },
    "Sticky Web" : {
        desc : "Places an entry hazard on the foe's side that lowers the Speed of Pokemon that enter the field.",
        typing : "Bug",
        contest : "Tough",
        category : "Status",
        pp : 20,
        target : "foe team",
        flags : {magic : 1},
        onSuccess : function (user, team) {
            team.passive.stickyweb = true;
        }
    }
    "Fell Stinger" : {
        desc : "Deals damage. If the foe faints because of this move, the user's Attack sharply rises.",
        typing : "Bug",
        contest : "Cool",
        category : "Physical",
        pp : 25,
        power : 30,
        acc : 100,
        flags : {contact : 1, protect : 1, kingsrock : 1},
        target : "any adjacent",
        onSuccess : function (user, foe) {
            if (foe.permanent.hpleft == 0) {
                user.onStatChange("Attack", 2);
            }
        }
    },
    "Phantom Force" : {
        desc : "Vanish one turn, hit the target the next. Lifts all protection.",
        typing : "Ghost",
        contest : "Cool",
        category : "Physical",
        pp : 10,
        power : 90,
        acc : 100,
        target : "any adjacent",
        flags : {contact : 1, kingsrock : 1},
        onAccuracyTest : function (user, foe) {
            //  Don't want to return undefined
            if (!foe.minimize) {
                return true;
            }
            return false;
        },
        onPowerModified : function (user, foe) {
            if (foe.minimize) {
                return 180;
            }
            return 90;
        },
        takeChargeTurn : function (self, foe) {
            if (!user.temporary.phantom) {
                user.temporary.phantom = true;
                game.write(user.build.nick + " vanished instantly!");
                return true;
            }
            return false;
        }
    },
    "Trick-or-Treat" : {
        desc : "Adds Ghost typing to the target.",
        typing : "Ghost",
        contest : "Cute",
        category : "Status",
        pp : 20,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1},
        preCondition : function (user, foe) {
            return !foe.hasType("Ghost");
        },
        onSuccess : function (user, foe) {
            foe.temporary.extratype = "Ghost";
        }
    },
    "Noble Roar" : {
        desc : "Lowers the target's Attack and Special Attack stats.",
        typing : "Normal",
        contest : "Tough",
        category : "Status",
        pp : 30,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, magic : 1, kingsrock : 1, sound : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Attack", -1, user);
            foe.onStatChange("Special Attack", -1, user);
        }
    },
    "Ion Deluge" : {
        desc : "For the rest of the turn, all Normal-type moves become Electric-type.",
        contest : "Beautiful",
        category : "Status",
        pp : 25, 
        effects : {priority : 1},
        target : "field",
        onSuccess : function () {
            field.thisturn.iondeluge = true;
        }
    };
    "Parabolic Charge" : {
        desc : "Damages the target and restores 50% of the damage dealt to the user.",
        typing : "Electrc",
        contest : "Clever",
        category : "Status",
        pp : 20,
        power : 50,
        acc : 100,
        effects : {drain : .5},
        flags : {protect : 1}
    },
    "Forest's Curse" : {
        desc : "Adds Grass typing to the target.",
        typing : "Grass",
        contest : "Clever",
        category : "Status",
        pp : 20,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1},
        preCondition : function (user, foe) {
            return !foe.hasType("Grass");
        },
        onSuccess : function (user, foe) {
            foe.temporary.extratype = "Grass";
        }
    },
    "Petal Blizzard" : {
        desc : "Damages all adjacent Pokemon.",
        typing : "Grass",
        contest : "Beautiful",
        category : "Physical",
        pp : 15,
        power : 90,
        acc : 100,
        target : "all adjacent",
        flags : {protect : 1, kingsrock : 1}
    },
    "Freeze-Dry" : {
        desc : "Damages the foe, landing super-effective damage on Water Pokemon and has 10% chance of freezing."
        typing : "Ice",
        contest : "Beautiful",
        category : "Special",
        pp : 20,
        power : 70,
        acc : 100,
        target : "any adjacent",
        effects : {typeeff : {"Water": 2}},
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 1) {
                foe.onGetStatus("Freeze", user);
            }
        }
    },
    "Disarming Voice" : {
        desc : "Damages all adjacent foes. Always lands.",
        typing : "Fairy",
        contest : "Cute",
        category : "Special",
        pp : 15,
        power : 40,
        target : "adjacent foes",
        flags : {protect : 1, kingsrock : 1, sound : 1}
    },
    "Parting Shot" : {
        desc : "Lowers the targets Attack and Special Attack, and then the user switches out.",
        typing : "Dark",
        contest : "Cool",
        category : "Status",
        pp : 20,
        acc : 100,
        target : "any adjacent",
        effects : {retreat : "uturn"},
        flags : {protect : 1, magic : 1, kingsrock : 1, sound : 1}
    },
    "Topsy-Turvy" : {
        desc : "Reverses the stat changes of the target.",
        typing : "Dark",
        contest : "Clever",
        category : "Status",
        pp : 20,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            for (var i in foe.temporary.statboosts) {
                foe.temporary.statboosts[i] *= -1;
            }
        }
    },
    "Draining Kiss" : {
        desc : "Damages the target and restores 75% of the damage done to the user.",
        typing : "Fairy",
        contest : "Cute",
        category : "Special",
        pp : 10,
        power : 50,
        acc : 100,
        target : "any adjacent",
        effects : {drain : .75},
        flags : {contact : 1, protect : 1, kingsrock : 1}
    },
    "Crafty Shield" : {
        desc : "The user protects its team from Status moves."
        typing : "Fairy",
        contest : "Clever",
        category : "Status",
        pp : 10,
        target : "self",
        effects : {priority : 3},
        //  Fails when the user is the last one to move
        preCondition : function (user, foe) {
            for (var i = 0; i < field.teams.length; i++) {
                var team = field.teams[i];
                for (var j = 0; j < team.onfield.length; j++) {
                    var mon = team.onfield[j];
                    //  Mons that switched on thusfar have moved
                    if (!mon.thisturn.hasmoved) {
                        return true;
                    }
                }
            }
            return false;
        }
        onSuccess : function (user) {
            user.team.thisturn.protection.craftyshield = true;
        }
    },
    "Flower Shield" : {
        desc : "Raises the Defense of all Grass-type Pokemon.",
        typing : "Fairy",
        contest : "Beautiful",
        category : "Status",
        pp : 10,
        target : "all",
        onSuccess : function (user, foe) {
            if (-1 < foe.hasType("Grass")) {
                foe.onStatChange("Defense", 1, user);
            }
        }
    },
    "Grassy Terrain" : {
        desc : "Triggers a Grassy Terrain on the field.",
        typing : "Grass",
        contest : "Beautiful",
        category : "Status",
        pp : 10,
        effects : {terrain: "Grassy"}
    },
    "Misty Terrain" : {
        desc : "Triggers a Misty Terrain on the field.",
        typing : "Fairy",
        contest : "Beautiful",
        category : "Status",
        pp : 10,
        effects : {terrain: "Misty"}
    },
    "Electrify" : {
        desc : "Target's next move is Electric type.",
        typing : "Electric",
        contest : "Clever",
        category : "Status",
        pp : 20,
        target : "any adjacent",
        onSucces : function (user, foe) {
            foe.nextturn.electrify = 1;
        }
    }
    "Play Rough" : {
        desc : "Damages the target and has 10% chance of lowering its Attack.",
        typing : "Fairy",
        contest : "Cute",
        category : "Special",
        pp : 15,
        power : 95,
        acc : 90,
        flags : {contact : 1, protect : 1, kingsrock : 1},
        target : "any adjacent",
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 1) {
                foe.onStatChange("Attack", -1, user);
            }
        }
    },
    "Fairy Wind" : {
        desc : "Deals damage the target.",
        typing : "Fairy",
        contest : "Beautiful",
        category : "Special",
        pp : 30,
        power : 40,
        acc : 100,
        flags : {protect : 1, kingsrock : 1},
        target : "any adjacent"
    },
    "Moonblast" : {
        desc : "Damages the target and has 30% chance of lowering its Special Attack.",
        typing : "Fairy",
        contest : "Beautiful",
        category : "Special",
        pp : 15,
        power : 95,
        acc : 100,
        flags : {protect : 1, kingsrock : 1},
        target : "any adjacent",
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 3) {
                foe.onStatChange("Special Attack", -1, user);
            }
        }
    },
    "Boomburst" : {
        desc : "Damages all adjacent Pokemon.",
        typing : "Normal",
        contest : "Tough",
        category : "Special",
        pp : 10,
        power : 140,
        acc : 100,
        target : "all adjacent",
        flags : {protect : 1, kingsrock : 1, sound : 1}
    }
    "Fairy Lock" : {
        desc : "Prevents all Pokemon from switching next turn.",
        typing : "Fairy",
        contest : "Clever",
        category : "Status",
        pp : 10,
        target : "all",
        onSuccess : function (user, foe) {
            foe.nextturn.fairylock(user);
        }
    },
    "King's Shield" : {
        desc : "The user protects from attacking moves. Foes that make contact have their Attack dropped harshly."
        typing : "Steel",
        contest : "Cool",
        category : "Status",
        pp : 10,
        target : "self",
        effects : {priority : 4},
        flags : {snatch : 1},
        //  Fails when the user is the last one to move
        preCondition : function (user, foe) {
            for (var i = 0; i < field.teams.length; i++) {
                var team = field.teams[i];
                for (var j = 0; j < team.onfield.length; j++) {
                    var mon = team.onfield[j];
                    //  Mons that switched on thusfar have oved
                    if (!mon.thisturn.hasmoved) {
                        return true;
                    }
                }
            }
            return false;
        }
        onFail : function (user) {
            user.protectcount = 0;
        }
        onSuccess : function (user) {
            user.thisturn.protection.kingshield = true;
            user.protectcount++;
        }
    },
    "Play Nice" : {
        desc : "Lowers the target's Attack. Always lands, even through Protect.",
        typing : "Normal",
        contest : "Cute",
        category : "Status",
        pp : 20,
        target : "any adjacent",
        flags : {kingsrock : 1},
        //  Hardcoded because it can evade other forms but not this one
        preCondition : function (user, foe) {
            if (foe.team.thisturn.protection.craftyshield) {
                return false;
            }
            return true;
        },
        onSuccess : function (user, foe) {
            foe.onStatChange("Attack", -1, user);
        }
    },
    "Confide" : {
        desc : "Lowers the target's Special Attack. Always lands, even through Protect.",
        typing : "Normal",
        contest : "Cute",
        category : "Status",
        pp : 20,
        target : "any adjacent",
        flags : {kingsrock : 1, sound : 1},
        preCondition : function (user, foe) {
            if (foe.team.thisturn.protection.craftyshield) {
                return false;
            }
            return true;
        },
        onSuccess : function (user, foe) {
            foe.onStatChange("Special Attack", -1, user);
        }
    },
    "Diamond Storm" : {
        desc : "Deals damage to opposing Pokemon and has a 50% chance of raising the user's Defense for every target it hits."
        typing : "Rock",
        contest : "Beautiful",
        pp : 5,
        power : 100,
        acc : 95,
        target : "adjacent foes",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 2) < 1) {
                user.onStatChange("Defense", 1);
            }
        }
    },
    "Steam Eruption" : {
        desc : "Deals damage and has a 30% chance of burning the target.",
        typing : "Water",
        contest : "Beautiful",
        category : "Special",
        pp : 5,
        power : 110,
        acc : 95,
        effects : {thaw : 1},
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 3) {
                foe.onGetStatus("Burn", user);
            }
        }
    },
    "Hyperspace Hole" : {
        desc : "Always damages target, breaking all forms of Protections as well.",
        typing : "Psychic"
        contest : "Clever",
        pp : 5,
        power : 80,
        target : "any adjacent",
        flags : {kingsrock : 1},
        onSuccess : function (user, foe) {
            //  Breaks all protection, even if it's irrelevant
            foe.team.thisturn.protection = false;
        }
    },
    "Water Shuriken" : {
        desc : "With increased priority, damages a foe 2-5 times.",
        typing : "Water",
        contest : "Cool",
        category : "Physical",
        pp : 20,
        power : 15,
        acc : 100,
        target : "any adjacent",
        effects : {priority : 1, multihit : 1},
        flags : {protect : 1, kingsrock : 1},
    },
    "Mystical Fire" : {
        desc : "Damages the target and lowers its Special Attack.",
        typing : "Fire",
        contest : "Beautiful",
        category : "Special",
        power : 65,
        pp : 10,
        acc : 100,
        flags : {protect : 1, kingsrock : 1},
        target : "any adjacent",
        onSuccess : function (user, foe) {
            foe.onStatChange("Special Attack", -1, user);
        }
    },
    "Spiky Shield" : {
        desc : "Protects the user and hurts foes that make contact with it.",
        typing : "Grass",
        contest : "Tough",
        category : "Status",
        effects : {priority : 4},
        flags : {snatch : 1},
        target : "self"
    },
    "Aromatic Mist" : {
        desc : "Raises an ally's Special Defense.",
        typing : "Fairy",
        contest : "Beautiful",
        pp : 20,
        target : "adjacent ally",
        onSuccess : function (user, foe) {
            foe.onStatChange("Special Defense", 1, foe);
        }
    },
    "Eerie Impulse" : {
        desc : "Harhsly lowers the target's Special Attack",
        typing : "Electric",
        contest : "Clever",
        pp : 15,
        acc : 100,
        target : "any adjacent",
        flags : {protect : 1, magic : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Special Attack", -2, user);
        }
    },
    "Venom Drench" : {
        desc : "Lowers the Attack, Special Attack, and Speed of all poisoned adjacent foes.",
        typing : "Poison",
        contest : "Clever",
        category : "Status",
        pp : 20,
        target : "all foe",
        flags : {protect : 1, magic : 1},
        preConditions : function (user) {
            for (var i = 0; i < field.teams.length; i++) {
                var team = field.teams[i];
                if (team != user.team) {
                    for (var j = 0; j < team.onfield.length; j++) {
                        var mon = team.onfield[j];
                        if (mon.permanent.health == "Poison"
                        ||  mon.permanent.health == "BadPoison") {
                            return true;
                        }
                    }
                }
            }
        },
        onSuccess : function (user, foe) {
            if (mon.permanent.health == "Poison"
            ||  mon.permanent.health == "BadPoison") {
                foe.onStatChange("Attack", -1, user);
                foe.onStatChange("Special Attack", -1, user);
                foe.onStatChange("Speed", -1, user);
            }
        }
    },
    "Powder" : {
        desc : "With high priority, puts Powder on the target, which explodes when it makes a Fire-type move.",
        typing : "Bug",
        contest : "Clever",
        category : "Status",
        pp : 20,
        target : "any adjacent",
        flags : {protect : 1},
        effects : {priority : 1},
        onSuccess : function (user, foe) {
            foe.temporary.powder = true;
            game.write(foe.build.nick + " was covered in Powder!");
        }
    },
    "Geomancy" : {
        desc : "Charges for one turn, then sharply raises Special Attack, Special Defense, and Speed.",
        typing : "Fairy",
        contest : "Beautiful",
        category : "Status",
        pp : 10,
        target : "self",
        takeChargeTurn : function (user) {
            if (!user.temporary.charging) {
                user.temporary.charging = true;
                game.write(user.build.nick + " is absorbing pow!");
                user.nextturn.decision = {move : Move["Geomancy"], target : user};
                return true;
            }
            return false;
        },
        onSuccess : function (user) {
            user.onStatChange("Special Attack", 2);
            user.onStatChange("Special Defense", 2);
            user.onStatChange("Speed", 2);
        }
    },
    "Magnetic Flux" : {
        desc : "Raises the Defense and Special defense of the user and allies with Plus or Minus.",
        typing : "Electric",
        contest : "Clever",
        category : "Status",
        pp : 20,
        target : "all self",
        onSuccess : function (user, foe) {
            if (foe == user
            || foe.temporary.ability == Ability["Plus"]
            || foe.temporary.ability == Ability["Minus"]) {
                foe.onStatChange("Defense", 1);
                foe.onStatChange("Special Defense", 1);
            }
        }
    },
    "Happy Hour" : {
        desc : "Doubles prize money.",
        typing : "Normal",
        category : "Status",
        pp : 30,
        onSuccess : function () {
            game.write("But nothing happened!");
        }
    },
    "Electric Terrain" : {
        desc : "Triggers an Electric Terrain on the field.",
        typing : "Electric",
        contest : "Clever",
        category : "Status",
        pp : 10,
        effects : {terrain: "Electric"}
    },
    "Dazzling Gleam" : {
        desc : "Damages adjacent opposing foes.",
        typing : "Fairy",
        contest : "Beautiful",
        category : "Special",
        power : 80,
        acc : 100,
        target : "adjacent foes"
        flags : {protect : 1, kingsrock : 1}
    }
    "Celebrate" : {
        desc : "Does absolutely nothing.",
        typing : "Normal",
        contest : "Cute",
        category : "Status",
        pp : 40,
        target : "Self",
        onSuccess : function (user) {
            game.write("Congratulations, " + team.nick + "!");
        }
    },
    "Hold Hands" : {
        desc : "Holds adjacent ally's hand to no effect.",
        typing : "Normal",
        contest : "Cute",
        category : "Status",
        pp : 40,
        target : "adjacent ally",
    }
    "Baby-Doll Eyes" : {
        desc : "Lowers the target's Attack with high priority.",
        typing : "Fairy",
        contest : "Cute",
        category : "Status",
        pp : 30,
        acc : 100,
        priority : 1,
        target : "any adjacent"
        flags : {contact : 1, protect : 1, magic : 1, snatch : 1, kingsrock : 1},
    }
    "Nuzzle" : {
        desc : "Damages the target and paralyzes it.",
        typing : "Electric",
        contest : "Cute",
        category : "Physical",
        power : 20,
        pp : 20,
        acc : 100,
        target : "any adjacent"
        flags : {contact : 1, protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            foe.onGetStatus("Paralysis", user);
        }
    }
    "Hold Back" : {
        desc : "Damages the target, but never causes it to faint.",
        typing : "Normal",
        contest : "Cool",
        category : "Physical",
        power : 40,
        pp : 40,
        acc : 100,
        target : "any adjacent"
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {holdback : 1}
    }
    "Infestation" : {
        desc : "Damages and partially traps the target.",
        typing : "Bug",
        contest : "Cute",
        category : "Special",
        power : 20,
        pp : 20,
        acc : 100,
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1}
        effects : {bind : true};
    },
    "Power-Up Punch" : {
        desc : "Damages a target and raises the user's Attack.",
        typing : "Fighting",
        contest : "Tough",
        category : "Physical",
        pp : 20,
        power : 40,
        acc : 100,
        target : "any adjacent",
        flags : {contact : 1, protect : 1, , kingsrock : 1, punch : 1}
        onSuccess : function (user) {
            user.onStatChange("Attack", 1);
        }
    },
    "Oblivion Wing" : {
        desc : "Damages the target and drains 75% of the damage dealt.",
        typing : "Normal",
        contest : "Cool",
        category : "Physical",
        pp : 10,
        power : 80,
        acc : 100,
        target : "any",
        flags : {protect : 1, kingsrock : 1},
        effects : {drain : .75}
    },
    "Thousand Arrows" : {
        desc : "Damages all adjacent foes and knocks them out of the air.",
        typing : "Ground",
        contest : "Beautiful",
        category : "Physical",
        pp : 10,
        power : 90,
        acc : 100,
        target : "all adjacent foes",
        flags : {protect : 1, kingsrock : 1},
        onTargetSemiInvulnerable : function (user, foe) {
            //  Hits flying, bouncing, and skydrop
            return (foe.flying || foe.bouncing || skydrop);
        },
        onpowModifiedCheck : function (user, foe) {
            //  Boosts pow against flying, bouncing, and skydrop
            if (foe.flying || foe.bouncing || skydrop) {
                return this.pow * 2;
            }
            return this.pow;
        }
        onSuccess : function (user, foe) {
            foe.grounded = true;
            if (foe.hasType("Ground")
            ||  foe.item == Item["Air Balloon"]
            ||  foe.ability == "Levitate") {
                game.write(foe.build.nickname + " fell straight down!");
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
        contest : "Tough",
        category : "Physical",
        pp : 10,
        power : 90,
        acc : 100,
        target : "all adjacent foes",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            //  Either never blocked yet or not already blocking
            if (!foe.block || -1 == foe.block.indexOf(user)) {
                foe.block.push(user);
                game.write(foe.permanent.nick + " can no longer escape!");
            }
        }
    },
    "Land's Wrath" : {
        desc : "Damages all adjacent foes.",
        typing : "Ground",
        contest : "Beautiful",
        category : "Physical",
        pp : 10,
        power : 90,
        acc : 100,
        target : "all adjacent foes",
        flags : {protect : 1, kingsrock : 1}
    }
    "Light of Ruin" : {
        desc : "Damages a target with 1/2 recoil damage.",
        typing : "Fairy",
        contest : "Beautiful",
        category : "Special",
        pp : 5,
        power : 140,
        acc : 90,
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1}
        effects : {recoil : 0.5},
    }
    "Origin Pulse" : {
        desc : "Damages all adjacent foes.",
        typing : "Water",
        contest : "Beautiful",
        category : "Special",
        pp : 10,
        power : 110,
        acc : 85,
        target : "adjacent foes",
        flags : {protect : 1, kingsrock : 1, launcher : 1, bullet : 1}
    }
    "Precipice Blades" : {
        desc : "Damages all adjacent foes."
        power : 120,
        acc : 85,
        pp : 10,
        category : "Physical",
        typing : "Ground",
        contest : "Cool",
        target : "adjacent foes",
        flags : {protect : 1, kingsrock : 1}
    }
    "Dragon Ascent" : {
        desc : "Damages the foe and lowers both of the user's defenses.",
        power : 120,
        acc : 100,
        pp : 5,
        category : "Physical",
        typing : "Flying",
        contest : "Beautiful",
        target : "any",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        onSuccess : function(user){
            user.onStatChange("Defense", -1);
            user.onStatChange("Special Defense", -1);
        },
    },
    "Hyperspace Fury" : {
        desc : "Lifts all protection and always hits target adjacent foe. The user's Defense is then lowered.",
        power : 100,
        pp : 5,
        category : "Physical"
        typing : "Dark",
        contest : "Tough",
        target : "any adjacent",
        flags : {kingsrock : 1},
        preConditions : function (user) {
            if (user.template.name == "Hoopa") {
                game.write("But " + user.permanent.nick + " can't use it the way it is now.");
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
        desc : "Damages target.",
        category : "Physical",
        typing : "Shadow",
        power : 40,
        acc : 100,
        pp : 30,
        target : "any adjacent"
        flags : {contact : 1, protect : 1, kingsrock : 1}
    },
    "Shadow Rush" : {
        desc : "Puts the user in Hyper mode and then deals damage.",
        power : 90,
        acc : 100,
        pp : 5,
        category : "Physical",
        typing : "Shadow",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {crit : 1},
        takeChargeTurn : function (user) {
            if (!user.temporary.hyper) {
                user.temporary.hyper = true;
                game.write(user.build.nick + "'s emotions rose to a fever pitch!");
                return true;
            }
            return false;
        }
    }
    "Shadow Break" : {
        desc : "Damages target.",
        power : 75,
        acc : 100,
        pp : 5,
        category : "Physical",
        typing : "Shadow",
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {recoil : 0.5}
    },
    "Shadow End" : {
        desc : "Damages target and deals 1/2 recoil damage.",
        power : 120,
        acc : 60,
        pp : 5,
        category : "Physical",
        typing : "Shadow",
        target : "any adjacent",
        flags : {contact : 1, protect : 1, kingsrock : 1},
        effects : {recoil : 0.5}
    },
    "Shadow Wave" : {
        desc : "Damages all adjacent foes.",
        power : 50,
        acc : 100,
        pp : 5,
        category : "Special",
        typing : "Shadow",
        target : "all adjacent",
        flags : {protect : 1}
    },
    "Shadow Rave" : {
        desc : "Damages all adjacent foes.",
        power : 70,
        acc : 100,
        pp : 5,
        category : "Special",
        typing : "Shadow",
        target : "all adjacent",
        flags : {protect : 1}
    },
    "Shadow Storm" : {
        desc : "Damages all adjacent foes.",
        power : 95,
        acc : 100,
        pp : 5,
        category : "Special",
        typing : "Shadow",
        target : "all adjacent",
        flags : {protect : 1}
    },
    "Shadow Fire" : {
        desc : "Damages target and has a 10% chance of burning."
        power : 75,
        acc : 100,
        pp : 5,
        category : "Special",
        typing : "Shadow",
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        effects : {thaw : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 1) {
                foe.onGetStatus("Burn", source);
            }
        }
    },
    "Shadow Bolt" : {
        desc : "Damages target and has a 10% chance of paralyzing."
        power : 75,
        acc : 100,
        pp : 5,
        category : "Special",
        typing : "Shadow",
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 1) {
                foe.onGetStatus("Paralysis", source);
            }
        }
    },
    "Shadow Chill" : {
        desc : "Damages target and has a 10% chance of freezing."
        power : 75,
        acc : 100,
        pp : 5,
        category : "Special",
        typing : "Shadow",
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        onSuccess : function (user, foe) {
            if (game.rand(user, 10) < 1) {
                foe.onGetStatus("Freeze", source);
            }
        }
    },
    "Shadow Blast" : {
        desc : "Damages target with a high critical-hit ratio."
        power : 80,
        acc : 100,
        pp : 5,
        category : "Physical",
        typing : "Shadow",
        target : "any adjacent",
        flags : {protect : 1, kingsrock : 1},
        effects : {crit : 1};
    },
    "Shadow Sky" : {
        desc : "Causes the Shadow Sky weather condition.",
        pp : 5,
        category : "Status",
        typing : "Shadow",
        target : "field",
        effects : {weather : "Shadow"}
    },
    "Shadow Hold" : {
        desc : "Prevents adjacent foes from escaping.",
        pp : 5,
        acc : 100,
        category : "Status",
        typing : "Shadow",
        target : "adjacent foes",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            foe.block.push(user);
            game.write(foe.permanent.nick + " can no longer escape!");
        }
    },
    "Shadow Mist" : {
        desc : "Sharply lowers all opposing foes' Evasion.",
        pp : 5,
        acc : 100,
        category : "Status",
        typing : "Shadow",
        target : "all foes",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Evasion", -2, user);
        }
    },
    "Shadow Panic" : {
        desc : "Confuses all opposing foes.",
        pp : 5,
        acc : 60,
        category : "Status",
        typing : "Shadow",
        target : "all foes",
        flags : {protect : 1, sound : 1},
        onSuccess : function (user, foe) {
            foe.onGetConfused(user);
        }
    },
    "Shadow Down" : {
        desc : "Sharply lowers opposing foes' Defense stat.",
        pp : 5,
        category : "Status",
        acc : 100,
        typing : "Shadow",
        target : "all foes",
        flags : {protect : 1},
        onSuccess : function (user, foe) {
            foe.onStatChange("Defense", -2, user);
        }
    },
    "Shadow Shed" : {
        desc : "Removes Safeguard, Reflect, and Light Screen from the battle.",
        pp : 10,
        category : "Status",
        typing : "Shadow",
        target : "field",
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
        category : "Status",
        typing : "Shadow",
        target : "all",
        flags : {protect : 1}, 
        onSuccess : function (user, foe) {
            if (1 < foe.permanent.hpleft) {
                foe.hurt(foe.permanent.hpleft / 2);
            }
        }
    },
    //  Hallow's move
    "Fancy Dance" : {
        desc : "Raises the user's Special Attack and Critical Hit ratio.",
        category : "Status",
        contest : "Beautiful",
        typing : "Fairy",
        target : "self",
        pp : 15,
        flags : {snatch : 1},
        onSuccess : function (user) {
            user.onStatChange("Special Attack", 1);
            user.onStatChange("Critical", 1);
        }
    },
}