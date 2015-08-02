//  SEND OUT MON:
//  player picks mon
//  mon.ability.onSendOut()
//  mon.item.onSendOut()
//  entry hazards
//  TEAM PREVIEW:
//  choose mons
//  SEND OUT MON for each team

//  order mons by speed
sortMonsBySpeed();

//  MAIN LOOP:
while(game.gameon) {
var option, choice;
/*  PLAYER DECISION:
for each slot:
    test if empty slot
    test if rampaging
    test if recharging
    Fight:
        Rotate?
        Mega Evolution?
        Disable illegal moves
            test for enough PP
            test for Choice lock
            test for Encore
            test for Disable
            test for Taunt
            test for Imprison
            test for Torment
        No moves? Struggle
        Find move targets
    Switch:
        test if enough mons to switch
        test for trapping
*/
/*  FIGHT:
    decision = {
        option : fight,
        rotate : false,
        mega : false,
        move : false
        target : fieldslot
    }
    decision = {
        option {
            option : switch,
            target : teamslot
        }
    }
*/

//  order mons by priority and speed
sortMonsByPriorityAndSpeed();

switch (mon.decision.option) {
case Options.Fight:
    if (mon.decision.rotate) {
        //  TODO
    }
    if (mon.decision.mega) {
        //  TODO
    }
    makeMove();
    break;
case Options.Switch:
    mon.retreat();
    sendOutMon();
    break;
}

//  ROTATE:
    //  Clean rotate-dependent status
    //  Rotate field slots

//  MEGA EVOLUTION:
    //  Change form
    //  mon.ability.onSendOut()

//  MOVE: section

    //  switch
        //  test for trap
        //  move.onFoeSwitch
        //  SEND OUT MON
    //  test for indecision
        //  test if flinching
        //  test if sky drop trap
        //  test if asleep
        //  test if frozen
        //  test if confused
        //  test if paralyzed
        //  test if attracted
    //  test for encore override
    //  move.onPrepare
        //  test if waiting turn of move
        //  determine hit count
    //  commit to move
        //  pp deduction
    //  test for protect
        //  test for protect/detect
        //  test for quick guard
        //  test for wide guard
        //  move.onFail
    //  test for failed conditions
        //  test for taunt
        //  ability overrides
        //  type mismatches
        //  move.onFail
    //  test for accuracy
        //  move.onFail
    //  test for temporary stat modifiers
    //  loop number of hits
        //  calculate damage
        //  deal damage
            //  test item override
            //  test ability override
            //  user.onDealDamage
            //  foe.onTakeDamage
        //  test for contact
            //  user.onTouch
            //  foe.onTouched
        //  test for user faint
            //  user.onFaint
        //  test for foe faint
            //  foe.onFaint
    //  test for multihit
        //  display hit count
    //  test for recoil
        //  move.onFinish
        //  user.onFinishMove
//  END OF TURN section
    //  Weather ends
    //  Sandstorm, Hail, Rain Dish, Dry Skin, Ice Body
    //  Future Sight, Doom Desire
    //  Wish
    //  Fire/Grass Pledge Damage
    //  Shed Skin, Hydration, Healer
    //  Leftovers, Black Sludge
    //  Aqua Ring
    //  Ingrain
    //  Leech Seed
    //  Poison, Burn, Poison Heal

    //  Nightmare
    //  Ghost Curse

//  Binding Moves
//  Bind, Wrap, Fire Spin, Clamp, Whirlpool, Sand Tomb, Magma Storm

//  Individual countdowns
game.loopevents.push(function() {
    for (var i in monsBySpeed) {
        var mon = monsBySpeed[i];
        if (mon.taunt) {
            if (!--mon.taunt) {
                game.write(mon.nick + "'s Taunt wore off.");
            }
        }
        if (mon.encore) {
            if (!--mon.encore) {
                game.write(mon.nick + "'s Encore ended.");
            }
        }
        if (mon.disable.duration) {
            if (!--mon.disable.duration) {
                game.write(mon.nick + " is no longer disabled.");
            }
        }
        if (mon.magnetrise) {
            if (!--mon.magnetrise) {
                game.write(mon.nick + " is no longer rising on magnetism.");
            }
        }
        if (mon.telekinesis) {
            if (!--mon.telekinesis) {
                game.write(mon.nick + " was freed from Telekinesis.");
            }
        }
        if (mon.healblock) {
            if (!--mon.healblock) {
                game.write(mon.nick + "'s Heal Block ended.");
            }
        }
        if (mon.embargo) {
            if (!--mon.embargo) {
                game.write(mon.nick + "'s Embargo ended.");
            }
        }
        if (mon.yawn) {
            if (!--mon.yawn) {
                mon.onGetStatus(Status.Sleep);
            }
        }
        if (mon.perishsong) {
            mon.perishsong--;
            game.write(mon.nick + "'s Perish Count fell to " + mon.perishsong);
            if (!mon.perishsong) {
                mon.onFaint();
            }
        }
    }
});

//  Team countdowns
game.loopevents.push(function() {
    for (var i in field.teams) {
        var team = field.teams[i];
        if (team.reflect) {
            if (!--team.reflect) {
                game.write(team.nick + "'s Reflect faded.");
            }
        }
        if (team.lightscreen) {
            if (!--team.lightscreen) {
                game.write(team.nick + "'s Light Screen faded.");
            }
        }
        if (team.safeguard) {
            if (!--team.safeguard) {
                game.write(team.nick + "'s Safeguard ended.");
            }
        }
        if (team.tailwind) {
            if (!team.tailwind) {
                game.write(team.nick + "'s Tailwind peetered out.");
            }
        }
        if (team.luckychant) {
            if (!team.luckchat) {
                game.write(team.nick + "'s Lucky Chant ended.");
            }
        }
        if (team.mist) {
            if (!--team.mist) {
                game.write(team.nick + "'s Mist faded.");
            }
        }
        if (team.firegrasspledge) {
            if (!--team.firegrasspledge) {
                game.write(team.nick + "'s Fire-Grass Pledge ended.");
            }
        }
        if (team.grasswaterpledge) {
            if (!--team.grasswaterpledge) {
                game.write(team.nick + "'s Grass-Water Pledge ended.");
            }
        }
        if (team.waterfirepledge) {
            if (!--team.waterfirepledge) {
                game.write(team.nick + "'s Water-Fire Pledge ended.");
            }
        }
    }
});

//  Field countdowns
game.loopevents.push(function() {
    if (field.gravity) {
        if (!--field.gravity) {
            game.write("Gravity returned to normal.");
        }
    }
    if (field.trickroom) {
        if (!--field.trickroom) {
            game.write("Trick Room ended.");
        }
    }
    if (field.wonderroom) {
        if (!--field.wonderroom) {
            game.write("Wonder Room ended.");
        }
    }
    if (field.magicroom) {
        if (!--field.magicroom) {
            game.write("Magic Room ended.");
        }
    }
});

//  Uproar
//  Speed Boost, Bad Dreams, Harvest, Moody


//  Orb Activation, Sticky barb
game.loopevents.push(function() {
    for (var i in monsBySpeed) {
        var mon = monsBySpeed[i];
        //  Nested ifs allow for appropriate else
        if (mon.item == Item["Toxic Orb"]) {
            if (mon.Status == Status.Healthy) {
                mon.onGetStatus(Status.BadPoison);
            }
        }
        else if (mon.item == Item["Flame Orb"]) {
            if (mon.Status == Status.Healthy) {
                mon.onGetStatus(Status.Burn);
            }
        }
        else if (mon.item == Item["Sticky Barb"]) {
            mon.hurt(mon.hp / 8);
        }
    }
});

//  Zen Mode
game.loopevents.push(function() {
    for (var i in monsBySpeed) {
        var mon = monsBySpeed[i];
        //  Only bother with Darmanitan
        if (mon.ability == Ability["Zen Mode"]) {
            if (mon.mon == "Darmanitan") {
                if (mon.hpleft <= mon.hp / 2) {
                    mon.changeForm("Darmanitan-Zen");
                }
            }
            else if (mon.mon == "Darmanitan-Zen") {
                if (mon.hp / 2 < mon.hpleft) {
                    mon.changeForm("Darmanitan");
                }
            }
        }
    }
});

//  Pokemon switched in upon faint
//  Healing Wish, Lunar Dance
//  Spikes, Toxic Spikes, Stealth Rock (hurt in order applied)
game.loopevents.push(function()) {
    for (var i in field.teams) {
        var team = field.teams[i];
        if (team.onfield.length < team.monsleft) {
            //  Choose a mon to switch in
            var mon;//TODO
            
        }
    }
}

//  Slow Start
game.loopevents.push(function() {
    for (var i in monsBySpeed) {
        var mon = monsBySpeed[i];
        //  Only bother with mons that have Slow Start
        if (mon.slowstart) {
            mon.slowstart--;
            //  Slow Start is over
            if (!mon.slowstart) {
                game.write(mon.nick + " got its act together.");
            }
        }
    }
});


//  Roost ends
game.loopevents.push(function() {
    for (var i in monsBySpeed) {
        monsBySpeed[i].roost = false;
    }
})

//  Turn counter increments
game.loopevents.push(function() {
    field.turn++;
});

//  Game end message
game.endevents.push(function() {
    console.write("The game has ended!");
    console.write(game.result);
};


//  FAINT LOOP
    //  request mons to open spots
    //  SEND OUT MON
    //  if mon faints to hazards, repeat FAINT
