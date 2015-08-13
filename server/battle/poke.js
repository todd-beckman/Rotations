var build = {
    id:0,       //  ID handles alt forms
    nick:"",    //  empty string for no nick
    item:0,     //  id
    level:100,
    ability:0,  //  0, 1, 2 index from the template's ability.
    nature:0,   //  id
    gender:0,   //  id
    ivs:[31, 31, 31, 31, 31, 31],
    evs:[85, 85, 85, 85, 85, 85],
    moves:[0, 0, 0, 0], //  ids
    friendship:255; //  Frustrators can go fuck themselves
};

function Poke(team, build) {
    this.team = team;
    this.template = Pokedex[build.id];
    this.build = build;
    this.stats = [0, 0, 0, 0, 0, 0];
    this.health = 0;
    this.item = Item[build.item];
    this.ability = Ability[this.template[build.ability]];
    this.moves = build.moves;
    this.pp = [];
    this.status = 0;
    this.statuscounter = 0; //  sleep and toxic
    for (var i = 0; i < this.moves.length; i++) {
        this.pp[i] = Movedex[this.moves[i]].pp;
    }
    //  Only define these when necessary
    //mega : false,
    //statuscounter : 0,//  counter for Sleep and Toxic
    this.nocopy = {
        //  Only define these when necessary
        //  Things that can change temporarily
        //  but are not copied by baton pass
        //ability : 0,
        //types : [],
        lastmove : -1;  //  move slot,
        //disable : [slot, duration]
        //flying : 0,
        //digging : 0,
        //diving:0,
        //charging : 0,
    };
    this.temp = {
        boosts : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        //  Only define these when necessary
        //   Other flags and counters
        //confuse : 0,      //  counter
        //attract : mon,    //  slot?
        //minimize : false,
        //healblock : 0,
        //rage : 0,
        //rampage : 0,  //duration
        //rollout : 0,
        //bide : [countdown, damage, lastmon]
        //types: [],
        //substitute: 0;//hp
        slotcountdown : [],
        gradualdrain : [],
        gradualdamage : [],
        trapping : [],
        countdown : []
    };
    this.thisturn = {
        //recharge : false;
        decision : {
            fight:true; //  switch is false
            //move : 0,   //  Move slot
            //mega:false;
            //rotate:false;
            mon : 0,    //  target or switch slot
        },
        damage: {
            //physical:0,
            //special:0,
            lastattacker:mon
        }
    };
    this.nextturn = {};
}
Poke.prototype.slot = function () {
    return this.field.slots.indexOf(this);
}
Poke.prototype.name = function () {
    //  Overridden by some things
    //  but that is for later
    return this.build.nick;
}
Poke.prototype.getAbility = function () {
    if (this.nocopy.ability) {
        return this.nocopy.ability;
    }
}

//  HP

//  Returns amount healed
Poke.prototype.onHeal = function (amount) {
    //  can't heal
    if (this.stats[0] == this.health
    ||  this.countdown.healblock) {
        return 0;
    }
    //  heal more than possible
    if (this.stats[0] < amount + this.health) {
        amount = this.stats[0] - this.health;
    }
    this.health += amount;
    game.write(this.name() + " restored health.");
    return amount;
}
//  Returns amount hurt
Poke.prototype.onHurt = function (amount) {
    //  hurt more than possible
    if (this.health - amount < 0) {
        amount = this.health;
    }
    this.health -= amount;
    return amount;
}
//  Returns amount drained
//  Negative values possible with Liquid Ooze
Poke.prototype.onDrainHP = function (amount) {}
//  Direct damage only
Poke.prototype.onDamage = function (foe, move, amount) {
    amount = this.onHurt(amount);
    if (this.temp.bide) {
        this.temp.bide.damage += amount;
        this.temp.bide.target = foe
    }
    if (this.temp.rage) {
        this.temp.rage++;
        game.write(this.name() + "'s Rage is building!");
    }
    this.thisturn.damage[Category[move.category]] += amount;
    this.thisturn.damage.lastmon = foe;
}
//  Indirect Damage
Poke.prototype.onResidualDamage = function (amount, message) {
    var a = this.getAbility();
    if (a.onResidualDamage) {
        amount = a.onResidualDamage(amount);
    }
    var i = this.item;
    if (i && i.onResidualDamage) {
        amount = i.onResidualDamage(amount);
    }
    if (amount != 0) {
        game.write(message);
        this.hurt(amount);
    }
}

//  Stats

Poke.prototype.onStatChange = function (stat, change, user, noredirect) {}


//  Events
Poke.prototype.onSendOut = function (slot) {}
Poke.prototype.tryMegaEvolve = function () {
    if (this.team.mega) {
        return false;
    }
    var item = this.item;
    if (item && item.mega
    &&  item.mega.from == this.template.name) {
        game.write(this.name() + " is reacting to " + this.team.name() + "'s Mega Ring!");
        this.loadFromTemplate(item.mega.to);
        game.write(this.name()+" mega evolved into "+this.template.name + "!");
    }
}
Poke.prototype.onRotate = function (direction) {};
Poke.prototype.canSwitch = function () {};
Poke.prototype.onRetreat = function () {};
Poke.prototype.getMoveChoices = function () {
    var options = [];
    for (var i = 0; i < this.moves.length; i++) {
        if (this.pp[i] == 0) {
            continue
        }
        var move = Movedex[this.moves[i]];
        var item = this.item;
        //  Assault Vest, Choice lock
        if (item && item.disallowMove
        &&  item.disallowMove(move)) {
            continue;
        }
        var allow = true;
        for (var j = 0; j < this.moveeffects.length; j++) {
            //  Taunt, Encore, Disable, Torment
            var eff = this.moveeffects[j];
            if (eff.move.disallowMove
            &&  eff.move.disallowMove(move)) {
                allow = false;
                break;
            }
        }
        if (allow) {
            options.push(i);
        }
    }
};
Poke.prototype.changePriority = function (move, foe) {
    var priority = move.getPriority ? move.getPriority(this, foe) :
        move.priority ? move.priority : 0;
    var ability = this.getAbility();
    //  Prankster, Gale Wings
    if (ability.changePriority) {
        return priority + ability.changePriority(this, move, foe);
    }
    /*  Unused but potential
    var item = this.item;
    if (item && item.changePriority) {
        return priority + item.changePriority(this, move, foe);
    }*/
    return priority;
};
//  +1 to go up, -1 to go down, 0 for no change
Poke.prototype.changeInPriorityBracket = function (move, foe) {
    if (move.changeInPriorityBracket) {
        return changeInPriorityBracket(this, foe);
    }
    /*  Unused but potential
    var ability = this.getAbility();
    if (ability.changeInPriorityBracket) {
        return ability.changeInPriorityBracket(this, move, foe);
    }*/
    //  Quick Claw, Custap Berry
    var item = this.item;
    if (item && item.changeInPriorityBracket) {
        return item.changeInPriorityBracket(this, move, foe);
    }
    return 0;
};
Poke.prototype.onWeatherEffect = function () {
    var ability = this.getAbility();
    //  Dry Skin, Rain Dish, Sand Veil/Rush/Force, Snow Cloak, Ice Body
    if (ability.onWeatherEffect) {
        ability.onWeatherEffect();
        return;
    }
    switch (field.weather.type) {
        case Weather.Sand:
            if (!this.hasType(Type.Rock) && !this.hasType(Type.Ground)
            &&  !this.hasType(Type.Steel)) {
                this.onResidualDamage(this.stats[Stat.HP] / 16,
                    this.name() + " is buffeted by the sand.");
            }
            break;
        case Weather.Hail:
            if (!this.hasType(Type.Ice)) {
                this.onResidualDamage(this.stats[Stat.HP] / 16,
                    this.name() + " is buffeted by the hail.");
            }
            break;
    }
};
Poke.prototype.onGradualRecovery = function () {
    var item = this.item;
    //  Leftovers, Black Sludge
    if (item && item.onGradualRecovery) {
        item.onGradualRecovery(this);
    }
    //  Aqua Ring, Ingrain
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.move.onGradualRecovery) {
            eff.move.onGradualRecovery(this);
        }
    }
};
//  Leech Seed
Poke.prototype.onGradualDrain = function () {
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.move.onGradualDrain) {
            eff.move.onGradualDrain(this, eff.slot);
        }
    }
};
Poke.prototype.onStatusDamage = function () {
    if (this.status == Status.Healthy) {
        return;
    }
    var ability = this.getAbility();
    //  Poison Heal
    if (ability.onStatusDamage) {
        ability.onStatusDamage(this);
        return;
    }
    switch (this.status) {
        case Status.Poison:
            if (!this.hasType(Type.Poison)) {
                this.onResidualDamage(this.stats[Stat.HP] / 8,
                    this.name() + " is hurt by the poison.");
            }
            break;
        case Status.BadPoison:
            if (!this.hasType(Type.Poison)) {
                this.onResidualDamage(
                    this.statuscounter * this.stats[Stat.HP] / 16,
                    this.name() + " is hurt by the poison.");
            }
            break;
        case Status.Burn:
            if (!this.hasType(Type.Fire)) {
                this.onResidualDamage(this.stats[Stat.HP] / 8,
                    this.name() + " is hurt by its burn.");
            }
            break;
        //  Nightmare
        case Status.Sleep:
            for (var i = 0; i < this.moveeffects.length; i++) {
                var eff = this.moveeffects[i];
                if (eff.move.onSleepDamage) {
                    eff.move.onSleepDamage(this);
                }
            }
            break;
    }
};
//  Bind, Wrap, Fire Spin, Clamp, Whirlpool, Sand Tomb, Magma Storm
Poke.prototype.trappingCountdown = function() {
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.trapping) {
            if (0 == --eff.duration) {
                game.write(this.name() + " was freed from " + eff.move.name);
                this.moveeffects.splice(i--, 1);
            }
            else {
                var damage = this.stats[Stat.HP] / 8;
                var item = this.item;
                if (item && item.bindingband) {
                    damage *= 4 / 3;
                }
                this.onResidualDamage(damage, this.name() + eff.message)
            }
        }
    }
};
//  Taunt, Encore, Disable (Cursed Body), Torment
Poke.prototype.moveRestrictCountdown = function () {
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.moveRestrictCountdown) {
            if (0 == --eff.duration) {
                eff.move.onCountdownFinish(this);
                this.moveeffects.splice(i--, 1);
            }
        }
    }
};
//  Magnet Rise, Telekinesis
Poke.prototype.typeEffectCountdown = function() {
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.typeEffectCountdown) {
            if (0 == --eff.duration) {
                eff.move.onCountdownFinish(this);
                this.moveeffects.splice(i--, 1);
            }
        }
    }
};
//  Heal Block, Embargo
Poke.prototype.actionRestrict = function() {
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.actionRestrict) {
            if (0 == --eff.duration) {
                eff.move.onCountdownFinish(this);
                this.moveeffects.splice(i--, 1);
            }
        }
    }
};
//  Yawn
Poke.prototype.countdownToStatus = function() {
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.countdownToStatus) {
            if (0 == --eff.duration) {
                eff.move.onCountdownFinish(this);
                this.moveeffects.splice(i--, 1);
            }
        }
    }
};
//  Perish Song
Poke.prototype.countdownToDamage = function() {
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.countdownToDamage) {
            if (0 == --eff.duration) {
                eff.move.onCountdownFinish(this);
                this.moveeffects.splice(i--, 1);
            }
        }
    }
};
//  Uproar
Poke.prototype.activeMoveCountdown = function () {
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.activeMoveCountdown) {
            if (0 == --eff.duration) {
                eff.move.onCountdownFinish(this);
                this.moveeffects.splice(i--, 1);
            }
            else {
                eff.move.activeMoveCountdown(this);
            }
        }
    }
};
Poke.prototype.passiveEndOfTurn = function () {
    var ability = this.getAbility();
    //  Speed Boost, Bad Dreams, Harvest, Moody
    if (ability.passiveEndOfTurn) {
        ability.passiveEndOfTurn(this);
    }
    var item = this.item;
    //  Toxic Orb, Flame Orb, Sticky Barb
    if (item && item.passiveEndOfTurn) {
        item.passiveEndOfTurn(this);
    }
};
Poke.prototype.endOfTurnChange = function () {
    var ability = this.getAbility();
    //  Zen Mode
    if (ability.endOfTurnFormChange) {
        ability.endOfTurnFormChange(this);
    }
    //  Slow Start
    else if (ability.endOfTurnStatChange) {
        ability.endOfTurnStatChange(this);
    }
};
Poke.prototype.nextTurn = function () {
    //  Clears Protect and its kin, Roost
    //  Loads multiturn, recharge
    this.thisturn = this.nextturn;
    this.nextturn = {};
}