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
game.loopevents.push(function() {
    if (field.weather.type != Weather.None) {
        if (--field.weather.duration) {
            //  weather ends
        }
    }
});
    //  Sandstorm, Hail, Rain Dish, Dry Skin, Ice Body

//  Slot-based, countdown moves
//  Future Sight, Doom Desire
//  Wish
game.loopevents.push(function() {
    //  TODO
});

//  Fire/Grass Pledge Damage
game.loopevents.push(function() {
    for (var i = 0; i < field.teams.length; i++) {
        var team = field.teams[i];
        if (team.firegrasspledge) {
            //  TODO
        }
    }
});

//  Status-restoring Abilities
//  Shed Skin, Hydration, Healer
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
        mon = monsBySpeed[i];
        switch (mon.ability) {
        case Ability["Shed Skin"]:
            if (mon.Status != Status.Healthy) {
                if (game.rand(10) < 3) {
                    game.write(mon.nick + "'s Shed Skin cures its status.");
                    mon.Status = Status.Healthy;
                }
            }
            break;
        case Ability["Hydration"]:
            if (mon.status != Status.Healthy) {
                if (field.weather.type == Weather.Rain) {
                    game.write(mon.nick + "'s Hydration cures its status.");
                    mon.Status = Status.Healthy;
                }
            }
            break;
        case Ability["Healer"]:
            //  TODO
            break;
        }
    }
});

//  Item recovery
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
        mon = monsBySpeed[i];
        if (mon.item == Item["Leftovers"]) {
            if (mon.healblock) {
                game.write(mon.nick + " was prevented from healing by Heal Block.");
            }
            else {
                game.write(mon.nick + "'s health is restored with Leftovers.");
                mon.heal(mon.hp / 16);
            }
        }
        else if (mon.item == Item["Black Sludge"]) {
            if (mon.healblock) {
                game.write(mon.nick + " was prevented from healing by Heal Block.");
            }
            else {
                game.write(mon.nick + "'s health is restored with Leftovers.");
                mon.heal(mon.hp / 16);
            }
        }
    }
});

//  Move recovery
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
        mon = monsBySpeed[i];
        if (mon.aquaring) {
            if (mon.healblock) {
                game.write(mon.nick + " was prevented from healing by Heal Block.");
            }
            else {
                game.write(mon.nick + " restorse health with its Aqua Ring.");
                var health = mon.hp / 16;
                if (mon.item == Item["Big Root"]) {
                    health *= 1.3;
                }
                mon.heal(health);
            }
        }
        if (mon.ingrain) {
            if (mon.healblock) {
                game.write(mon.nick + " was prevented from healing by Heal Block.");
            }
            else {
                game.write(mon.nick + " restored health through its roots.");
                var health = mon.hp / 16;
                if (mon.item == Item["Big Root"]) {
                    health *= 1.3;
                }
                mon.heal(health);
            }
        }
    }
});


//  Leech Seed
/*  Leech Format:
    leechseed = {
        source : slot to send health 
    }
*/
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
        mon = monsBySpeed[i];
        if (mon.leechseed && mon.ability != Ability["Magic Guard"]) {
            var damage = mon.hp / 16;
            game.write(mon.nick + "'s health is drained by Leech Seed.");
            mon.hurt(damage);
            var target = slots[mon.leechseed.source];
            if (target.healblock) {
                game.write(target.nick + " was prevented from healing by Heal Block.");
            }
            else {
                if (target.item == Item["Big Root"]) {
                    damage *= 1.3;
                }
                target.heal(damage);
            }
        }
    }
});

//  Poison, Burn, Poison Heal
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
        var mon = monsBySpeed[i];
        switch(mon.Status) {
        case Poison:
            if (mon.ability == Ability["Poison Heal"]) {
                if (mon.healblock) {
                    game.write(mon.nick + " was prevented from healing by Heal Block.");
                }
                else {
                    game.write(mon.nick + "'s Poison Heal restores its health.");
                    mon.heal(mon.hp / 8);
                }
            }
            else if (mon.ability != Ability["Magic Guard"]) {
                game.write(mon.nick + " is hurt by poison.");
                mon.hurt(mon.hp / 8);
            }
            break;
        case BadlyPoison:
            mon.toxic++;
            if (mon.ability == Ability["Poison Heal"]) {
                if (mon.healblock) {
                    game.write(mon.nick + " was prevented from healing by Heal Block.");
                }
                else {
                    game.write(mon.nick + "'s Poison Heal restores its health.");
                    mon.heal(mon.hp / 8);
                }
            }
            else if (mon.ability != Ability["Magic Guard"]) {
                game.write(mon.nick + " is hurt by poison.");
                mon.hurt(mon.toxic * mon.hp / 16);
            }
            break;
        case Burn:
            if (mon.ability != Ability["Magic Guard"]) {
                game.write(mon.nick + " is hurt by its burn.");
                mon.hurt(mon.hp / 8);
            }
            break;
        }
    }
});

//  Nightmare
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
        var mon = monsBySpeed[i];
        if (mon.nightmare) {
            if (mon.Status == Status.Asleep
            &&  mon.ability != Ability["Magic Guard"]) {
                game.write(mon.nick + " is hurt by Nightmare.");
                mon.hurt(mon.hp / 4);
            }
            else {
                mon.nightmare = false;
            }
        }
    }
});

//  Ghost Curse
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
        var mon = monsBySpeed[i];
        if (mon.cursed && mon.ability != Ability["Magic Guard"]) {
            game.write(mon.nick + " is afflicted by the Curse.");
            mon.hurt(mon.hp / 4);
        }
    }
});

//  Binding Moves
/*  Binding format:
    binds = [];     //  starts empty
    binds.push({    //  push new binds
        source : mon that triggered it
        move : move that triggered it
        duration : time left for binding
        band : whether a binding band boosts its power
    });
    binds.splice(i, 1)//remove binds
*/
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
        var mon = monsBySpeed[i];
        for (var j = 0; j < mon.binds; j++) {
            //  The source is on the field
            if (field.monOnField(mon.binds.source)) {
                //  Countdown
                if (--mon.binds.duration && mon.ability != Ability["Magic Guard"]) {
                    game.write(mon.nick + " is hurt by " + mon.binds[j].move);
                    mon.hurt(mon.hp / (mon.binds[j].band ? 6 : 8));
                }
                //  Bind is over
                else {
                    game.write(mon.nick + " was freed from " + mon.binds[j].move);
                    mon.binds.splice(j, 1);
                }
            }
            //  Source no longer on the field; get rid of it
            else {
                mon.binds.splice(j, 1);
            }
        }
    }
});

//  Individual countdowns
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
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
    for (var i = 0; i < field.teams.length; i++) {
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
game.loopevents.push(function() {

});


//  Orb Activation, Sticky barb
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
        monsBySpeed[i].item.endOfTurn();

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
    for (var i = 0; i < monsBySpeed.length; i++) {
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
    for (var i = 0; i < field.teams.length; i++) {
        var team = field.teams[i];
        if (team.onfield.length < team.monsleft) {
            //  Choose a mon to switch in
            var mon;//TODO
            
        }
    }
}

//  Slow Start
game.loopevents.push(function() {
    for (var i = 0; i < monsBySpeed.length; i++) {
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
    for (var i = 0; i < monsBySpeed.length; i++) {
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
