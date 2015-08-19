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
    this.moves = build.moves;
    this.item = Item[build.item];
    this.pp = [];
    for (var i = 0; i < this.moves.length; i++) {
        this.pp[i] = Movedex[this.moves[i]].pp;
    }
    this.stats = [0, 0, 0, 0, 0, 0, 100, 100];
    //  Current HP, rather than the stat
    this.health = 0;
    //  Nonvolatile status
    this.status = 0;
    this.statuscounter = 0; //  sleep and toxic
    //  Templates do not change.
    this.types = this.templatetypes = this.template.types;
    this.ability =this.templateability = Ability[this.template[build.ability]];
    mega = false;
    statuscounter = 0;
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
Poke.prototype.name = function () {
    //  Overridden by some things
    //  but that is for later
    return this.build.nick;
};

//  HP
Poke.prototype.allowHeal = function () {}
//  Returns amount healed
Poke.prototype.onHeal = function (amount) {
    amount = Math.floor(amount);
    //  heal more than possible
    if (this.stats[0] < amount + this.health) {
        amount = this.stats[0] - this.health;
    }
    //  Recovery doesn't work
    if (amount <= 0) {
        return 0;
    }
    this.health += amount;
    game.write(this.name() + " restored health.");
    return amount;
};
//  Returns amount hurt
Poke.prototype.onHurt = function (amount) {
    amount = Math.floor(amount);
    //  hurt more than possible
    if (this.health - amount < 0) {
        amount = this.health;
    }
    this.health -= amount;
    return amount;
};
//  Direct damage only
Poke.prototype.takeDirectDamage = function (user, move, amount) {
    if (this.health - amount <= 0) {
        //  Focus Sash, Focus Band
        if (this.allowItem() && this.item.letLive && this.item.letLive(this)
        //  Sturdy
        ||  this.ability.letLive && this.ability.letLive(this)) {
            amount = this.health - 1;
        }
    }
    amount = this.onHurt(amount);
    //  Counter, Mirror Coat, Bide, and Metal Burst
    this.thisturn.damage[Category[move.category]] += amount;
    this.thisturn.damage.lastmon = user;
    //  Color Change
    if (this.ability.onDirectDamage) {
        this.ability.onDirectDamage(user, move, this, amount);
    }
    //  Recovery Berries, Red Card, Eject Button
    if (this.allowItem() && this.item.onDirectDamagee) {
        this.item.onDirectDamage(user, move, this, amount);
    }
};
//  Indirect Damage
Poke.prototype.takeResidualDamage = function (amount, message) {
    //  Magic Guard
    if (this.ability.takeResidualDamage) {
        amount = this.ability.takeResidualDamage(amount);
    }
    if (amount && this.item.takeResidualDamage) {
        amount = this.item.takeResidualDamage(amount);
    }
    if (amount != 0) {
        game.write(message);
        this.hurt(amount);
    }
};
Poke.prototype.takeRecoilDamage = function (amount) {
    //  Magic Guard, Rock Head
    if (this.ability.takeRecoilDamage) {
        amount = this.ability.takeRecoilDamage(amount);
    }
    if (amount && this.item.takeRecoilDamage) {
        amount = this.item.takeRecoilDamage(amount);
    }
    if (amount != 0) {
        game.write(this.name() + " is hurt with recoil.");
        this.hurt(amount);
    }
}
//  Sort of also falls into HP category
Poke.prototype.onContacted = function (user, move) {
    //  Rough Skin, Iron Barbs, Mummy
    if (this.ability.onContacted) {
        this.ability.onContacted(user, move, this);
    }
    //  Recoil Berries, Rocky Helmet
    if (this.allowItem() && this.item.onContacted) {
        this.item.onContacted(user, move, this);
    }
};
Poke.prototype.drainHP = function (amount, foe) {
    if (foe.foeDrainHP) {
        amount = foe.foeDrainHP(amount);
    }
    //  This probably exists
    if (this.ability.drainHP) {
        amount = this.ability.drainHP(amount);
    }
    //  Big Root?
    if (this.allowItem() && this.item.drainHP) {
        amount = this.item.drainHP(amount);
    }
    if (amount < 0) {
        this.onHurt(amount);
    }
    else if (amount > 0) {
        this.onHeal(amount);
    }
};
Poke.prototype.foeDrainHP = function (amount) {
    //  Magic Guard, Liquid Ooze
    if (this.ability.foeDrainHP) {
        amount = this.ability.foeDrainHP(amount);
    }
    if (this.allowItem() && this.item.foeDrainHP) {
        amount = this.item.foeDrainHP(amount);
    }
    return amount;
};
Poke.prototype.afterDamage = function (damage) {
    //  This probably exists
    if (this.ability.afterDamage) {
        this.ability.afterDamage(amount);
    }
    //  Life Orb, Shell Bell
    if (this.allowItem() && this.item.afterDamage) {
        this.item.afterDamage(amount);
    }
};
Poke.prototype.onLandCrit = function (move, foe) {};
Poke.prototype.onTakeCrit = function (user, move) {
    if (this.ability.onTakeCrit) {
        this.ability.onTakeCRit(user, move, this);
    }
    if (this.allowItem() && this.item.onTakeCrit) {
        this.item.onTakeCRit(user, move, this);
    }
};



//  STATUS
Poke.prototype.allowGetStatus = function (status, foe) {
    switch (status) {
        case Status.Burn:
            if (this.hasType(Type.Fire)) {
                return false;
            }
            break;
        case Status.Paralysis:
            if (this.hasType(Type.Paralysis)) {
                return false;
            }
            break;
        case Status.Poison:
        case Status.BadPoison:
            if (this.hasType(Type.Poison)) {
                return false;
            }
            break;
    }
    //  Limber, Insomnia, Immunity, Magma Armor
    if (this.ability.allowGetStatus
    &&  !this.ability.allowGetStatus(status){
        return false;
    }
    //  Something probably exists that does this
    if (this.allowItem() && this.item.allowGetStatus
    &&  this.item.allowGetStatus(status)) {
        return false;
    }
    return true;
}
Poke.prototype.getStatus = function (status, foe) {
    if (this.status != Status.Healthy) {
        return;
    }
    if (this.allowGetStatus(status, foe)) {
        this.status = status;
        if (status == Status.BadPoison) {
            this.statuscounter = 1;
        }
        else if (status == Status.Sleep) {
            this.statuscounter = this.getSleepDuration();
        }
        //  Synchronize
        if (this.ability.onGetStatus) {
            this.ability.onGetStatus(this, status, foe);
        }
        //  Berries that reverse the effect
        if (this.allowItem() && this.item.onGetStatus) {
            this.item.onGetStatus(this, status, foe);
        }
    }
};
Poke.prototype.getSleepDuration = function () {
    var duration = rand(3) + 1;
    if (this.ability.getSleepDuration) {
        duration = this.ability.getSleepDuration(this, duration);
    }
    if (this.allowItem() && this.item.getSleepDuration) {
        duration = this.item.getSleepDuration(this, duration);
    }
    return duration;
}
Poke.prototype.onStatusDamage = function () {
    if (this.status == Status.Healthy) {
        return;
    }
    var ability = this.getAbility();
    //  Poison Heal
    if (ability.onStatusDamage && ability.onStatusDamage(this)) {
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



//  BEFORE ACTION PHASE
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
Poke.prototype.tryMegaEvolve = function () {
    if (this.team.mega) {
        return false;
    }
    if (this.allowItem() && this.item.mega && this.item.mega.from == this.template.name) {
        game.write(this.name() + " is reacting to " + this.team.name() + "'s Mega Ring!");
        this.loadFromTemplate(this.item.mega.to);
        game.write(this.name() + " Mega Evolves into " + this.template.name + "!");
    }
};
Poke.prototype.getPriority = function (move, foe) {
    var priority = move.getPriority ? move.getPriority(this, foe) :
        move.priority ? move.priority : 0;
    //  Prankster, Gale Wings
    if (this.ability.getPriority) {
        priority += this.ability.getPriority(this, move, foe);
    }
    if (this.allowItem() && this.item.getPriority) {
        priority += this.item.getPriority(this, move, foe));
    }
};
//  + to go up, - to go down, 0 for no change
Poke.prototype.changeInPriorityBracket = function (move, foe) {
    var change = 0;
    if (move.changeInPriorityBracket) {
        change += changeInPriorityBracket(this, foe);
    }
    if (this.ability.changeInPriorityBracket) {
        change += this.ability.changeInPriorityBracket(this, move, foe);
    }
    if (this.allowItem() && this.item.changeInPriorityBracket) {
        change += this.item.changeInPriorityBracket(this, move, foe);
    }
    return change;
};




//  ATTACK PHASE:
Poke.prototype.preventMove = function (user, move) {
    //  Water/Volt Absorb
    return 
    this.ability.preventMove && this.ability.preventMove(user, move)
    &&  foe.ability.evadeAbility
    ||  this.item.preventMove && this.item.preventMove(user, move);
};
Poke.prototype.onRotate = function (direction) {};
Poke.prototype.canSwitch = function () {};
Poke.prototype.onRetreat = function () {};
Poke.prototype.onSendOut = function (slot) {
    if (this.ability.onSendOut) {
        this.ability.onSendOut(this, slot);
    }
    if (this.allowItem() && this.item.onSendOut) {
        this.item.onSendOut(this, slot);
    }
};
Poke.prototype.changeTarget = function (user, move, foe) {
    //  Can only redirect single-target moves
    if (move.target == Target.Adjacent
    //  Storm Drain, Lightning Rod
    &&  this.ability.changeTarget) {
        return this.ability.changeTarget(this, user, move, foe);
    }
    return foe;
}



//  END OF TURN PHASE
Poke.prototype.onWeatherEffect = function () {

    //  Dry Skin, Rain Dish, Sand Veil/Rush/Force, Snow Cloak, Ice Body
    //  Return true if overridding weather effect, false if allowing it
    if (ability.onWeatherEffect && ability.onWeatherEffect(user)) {
        return;
    }
    switch (field.weather.getFlag()) {
        case "Sand":
            if (!this.hasType(Type.Rock) && !this.hasType(Type.Ground)
            &&  !this.hasType(Type.Steel)) {
                this.onResidualDamage(this.stats[Stat.HP] / 16,
                    this.name() + " is buffeted by the sand.");
            }
            break;
        case "Hail":
            if (!this.hasType(Type.Ice)) {
                this.onResidualDamage(this.stats[Stat.HP] / 16,
                    this.name() + " is buffeted by the hail.");
            }
            break;
    }
};
Poke.prototype.onStatusRestore = function () {
    if (this.ability.statusRestore) {
        this.ability.statusRestore(this);
    }
}
//  Leech Seed
Poke.prototype.onGradualDrain = function () {
    for (var i = 0; i < this.gradualdrain.length; i++) {
        var eff = this.gradualdrain[i];
        //  Returns false if the drain has stopped 
        if (!eff.move[eff.run].apply(eff.move, eff.params)) {
            this.trapcountdown.splice(i, 1);
            i--;
        }
    }
};
//  Bind, Wrap, Fire Spin, Clamp, Whirlpool, Sand Tomb, Magma Storm
Poke.prototype.onTrapCountdown = function () {
    for (var i = 0; i < this.trapcountdown.length; i++) {
        var eff = this.trapcountdown[i];
        if (0 == --eff.duration) {
            this.trapcountdown.splice(i--, 1);
            i--;
        }
        else {
            eff.move[eff.run].apply(eff.move, eff.params);
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
    for (var i = 0; i < this.countdowntodamage.length; i++) {
        var eff = this.countdowntodamage[i];
        eff.duration--;
        eff.move.onCountdown(this, eff.duration);
        if (0 == eff.duration) {
            eff.move.onCountdownFinish(this);
            this.countdowntodamage.splice(i--, 1);
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
    //  Speed Boost, Bad Dreams, Harvest, Moody
    if (this.ability.passiveEndOfTurn) {
        this.ability.passiveEndOfTurn(this);
    }
    //  Toxic Orb, Flame Orb, Sticky Barb
    if (this.allowItem() && this.item.passiveEndOfTurn) {
        this.item.passiveEndOfTurn(this);
    }
};
Poke.prototype.endOfTurnChange = function () {
    //  Zen Mode
    if (this.ability.endOfTurnFormChange) {
        this.ability.endOfTurnFormChange(this);
    }
    //  Slow Start
    else if (this.ability.endOfTurnStatChange) {
        this.ability.endOfTurnStatChange(this);
    }
};
Poke.prototype.nextTurn = function () {
    //  Clears Protect and its kin, Roost
    //  Loads multiturn, recharge
    this.thisturn = this.nextturn;
    this.nextturn = {};
};






//  EFFECTS
//  Returns the actual number (do not use this for critical hits.)
Poke.prototype.getStat = function (stat, user, foe) {
    //  Preserve user/foe targetting and everything
    //  Because there is a complicated mess that is best left to the
    //  items/abilities responsible
    if (user.ignoreBoost(stat, user, foe)
    ||  foe.ignoreBoost(stat, user, foe)) {
        return this.stats[stat];
    }
    var stages = this.getStage(stat);
    var value = (stat == Stat.Evasion || stat == Stat.Acuracy) ? 3 : 2;
    if (stages < 0) {
        return Math.floor(this.stats[stat] * value / (stages + value));
    }
    else {
        return Math.floor(this.stats[stat] * (stages + value) / value);
    }
};
Poke.prototype.ignoreBoost = function (stat, user, foe) {
    if (this.ability.ignoreUserBoost) {
        return this.ability.ignoreUserBoost(stat, user, foe);
    }
    if (this.allowItem() && this.item.ignoreUserBoost) {
        return this.item.ignoreUserBoost(stat, user, foe);
    }
    if (this.ability.ignoreFoeBoost) {
        return this.ability.ignoreFoeBoost(stat, user, foe);
    }
    if (this.allowItem() && this.item.ignoreFoeBoost) {
        return this.item.ignoreFoeBoost(stat, user, foe);
    }
}
//  Returns the stat boost level for the given stat.
Poke.prototype.getStage = function (stat) {
    var stage = this.temp.boosts[stat];
    //  Super Luck
    if (this.ability.getStage) {
        stage += this.ability.getStage(stat);
    }
    //  Razor Claw, some other item
    if (this.allowItem() && this.item.getStage) {
        stage += this.item.getStage(stat);
    }
    if (6 < stage) {
        stage = 6;
    }
    if (stage < -6) {
        stage = -6;
    }
    return stage;
};
//  Changes the stat boost level of the given stat
Poke.prototype.statChange = function (stat, change, user) {
    //  Contrary, Hyper Cutter, Big Pecks, Clear Body
    if (this.ability.changeStatChange) {
        change = this.ability.changeStatChange(stat, change, user);
    }
    //  Simple
    //  globals return false or the return value
    var globalchange = field.abilitySearch("globalStatChange",[stat, change, user]);
    if (globalchange) {
        change = globalchange;
    }
    if (change == 0) {
        game.write(this.name() + "'s stats are unaffected.");
    }
    if (change > 0) {
        //  Cap the change
        if (this.temp.boosts[stat] == 6) {
            game.write(this.name() + "'s " + Stat[stat] + " won't go higher!");
            return;
        }
        //  Cap the change
        if (6 < this.temp.boosts[stat] + change) {
            change = 6 - this.temp.boosts[stat];
        }
        this.temp.boosts[stat] += change;
        var adverb = "";
        if (change == 2) {
            adverb = "sharply ";
        }
        else if (1 < change) {
            adverb = "drastically ";
        }
        game.write(this.name() + "'s " + Stat[stat] + " " + adverb + "rises!");
    }
    else {
        if (this.temp.boosts[stat] == -6) {
            game.write(this.name() + "'s " + Stat[stat] + " won't go lower!");
            return;
        }
        if (-6 > this.temp.boosts[stat] + change) {
            change = -6 - this.temp.boosts[stat];
        }
        this.temp.boosts[stat] += change;
        var adverb = "";
        if (change == -2) {
            adverb = "harshly ";
        }
        else if (1 < change) {
            adverb = "severely ";
        }
        game.write(this.name() + "'s " + Stat[stat] + " " + adverb + "falls!");
    }
};
Poke.prototype.statMultiplier = function (stat, move) {
    var multiplier = 1;
    //  Huge/Pure Power, Slow Start, Swift Swim, Chlorophyll
    if (this.ability.statMultiplier) {
        multiplier *= this.ability.statMultiplier(stat, this, move);
    }
    //  Some items do this
    if (this.allowItem() && this.item.statMultiplier) {
        multiplier *= this.item.statMultiplier(stat, this, move);
    }
    //  Potential but not used
    if (field.weather.statMultiplier) {
        multiplier *= field.weather.statMultiplier(stat, this, move);
    }
    return multiplier;
};
//  Returns a multiplier of the move power or 1.
//  hit- move-induced multihit (triple kick)
//  hits- ability-induced multihit (Parental Bond)
Poke.prototype.powerMultiplier = function (move, foe, hit, hit2, power) {
    var multiplier = 1;
    if (this.ability.powerMultiplier) {
        multiplier *= this.ability.powerMultiplier(this, move, foe, hit, hit2, power);
    }
    if (this.allowItem() && this.item.powerMultiplier) {
        multiplier *= this.item.powerMultiplier(this, move, foe, hit, hit2, power);
    }
    return multiplier;
};

//  Returns a multiplier of the move power or 1.
//  Hits2- ability-induced multihit (Parental Bond)
Poke.prototype.foePowerMultiplier = function (user, move, hit, hit2, power) {
    var multiplier = 1;
    if (this.ability.foePowerMultiplier) {
        multiplier *= this.ability.foePowerMultiplier(user, move, this, hit, hit2, power);
    }
    if (this.allowItem() && this.item.foePowerMultiplier) {
        multiplier *= this.item.foePowerMultiplier(user, move, this, hit, hit2, power);
    }
    return multiplier;
};

Poke.prototype.damageMultiplier = function (move, foe, crit, eff) {
    var multiplier = 1;
    if (this.ability.damageMultiplier) {
        multiplier *= this.ability.damageMultiplier(this, move, crit, eff);
    }
    if (this.allowItem() && this.item.damageMultiplier) {
        multiplier *= this.item.damageMultiplier(this, move, crit, eff);
    }
    return multiplier;
};
Poke.prototype.foeDamageMultiplier = function (user, move, crit, eff) {
    var multiplier = 1;
    if (this.ability.foeDamageMultiplier) {
        multiplier *= this.ability.foeDamageMultiplier(user, move, this, crit, eff);
    }
    if (this.allowItem() && this.item.foeDamageMultiplier) {
        multiplier *= this.item.foeDamageMultiplier(user, move, this, crit, eff);
    }
    return multiplier;
};
Poke.prototype.getConfused = function () {
    //  Own Tempo
    if (this.ability.allowConfusion && !this.ability.allowConfusion(this)
    //  This is probably a thing
    ||  (this.item.allowConfusion && !item.allowConfusion(this)) {
        return;
    }
    this.temp.confused = rand(3);
    //  This is also probably a thing
    if (this.ability.onGetConfused) {
        this.ability.onGetConfused(this);
    }
    //  Status restore berries
    if (this.allowItem() && this.item.onGetConfused) {
        this.item.onGetConfused(this);
    }
};
Poke.prototype.getInfatuated = function (source) {
    //  Must have gender; can't be gay
    if (this.gender == Gender.Neutral || this.gender == source.gender
    ||  source.gender == Gender.Neutral
    //  Oblivious
    ||  this.ability.allowInfatuation && !this.ability.allowInfatuation(this)
    ||  this.item.allowInfatuation && !item.allowInfatuation(this)) {
        game.write(this.name() + " is not infatuated.");
        return false;
    }
    this.nocopy.infatuation = source;
    //  This is also probably a thing
    if (this.ability.onGetInfatuated) {
        this.ability.onGetInfatuated(this);
    }
    //  Destiny Knot
    if (this.allowItem() && this.item.onGetInfatuated) {
        this.item.onGetInfatuated(this);
    }
    return true;
};
Poke.prototype.forceSwitch = function (source) {
    if (this.ability.allowPhasing && !this.ability.allowPhasing(source, this)
    ||  this.item.allowPhasing && !this.item.allowPhasing(source, this)) {
        return;
    }
    this.onRetreat();
    //  TODO: Force in something else at random
};
Poke.prototype.allowSpore = function () {
    return !this.hasType(Type.Grass)
    &&  this.ability.noSpore == undefined
    &&  this.item.noSpore == undefined;
};
Poke.prototype.allowFlinching = function () {
    return !(this.ability.noflinching
        ||  this.item.noflinching);
};
Poke.prototype.onFlinch = function () {
    if (this.ability.onFlinch) {
        this.ability.onFlinch(this);
    }
    if (this.allowItem() && this.item.onFlinch) {
        this.item.onFlinch(this);
    }
};
//  form changes
Poke.prototype.revertForm = function() {};
Poke.prototype.changeForm = function (form) {};
Poke.prototype.loadFromTemplate = function () {};
Poke.prototype.lowerPP = function (slot) {};
Poke.prototype.cancelParalyzeSpeedDrop = function () {
    return ability.cancelParalyzeSpeedDrop || item.cancelParalyzeSpeedDrop
}
Poke.prototype.cancelBurnAttackDrop = function () {
    return ability.cancelBurnAttackDrop || item.cancelBurnAttackDrop
};
Poke.prototype.STAB = function(user, move, foe) {
    if (user.hasType(move.type)) {
        var stab = 1.5;
        if (this.ability.STAB) {
            stab += this.ability.STAB(user, move, foe);
        }
        //  THis is not but easily could become a thing
        if (this.allowItem() && this.item.STAB) {
            stab += this.item.STAB(user, move, foe);
        }
        return stab;
    }
    return 1;
};
Poke.prototype.getMultiHitCount = function (move, foe) {
    //  Skill Link
    if (this.ability.getMultiHitCount) {
        return this.ability.getMultiHitCount(this, move, foe);
    }
    var r = rand(6);
    if (rand < 2) {
        return 2;
    }
    if (rand < 4) {
        return 3;
    }
    if (rand < 5) {
        return 4;
    }
    return 5;
};
Poke.prototype.critModifier = function (move, foe) {
    var crit = 1.5;
    //  Sniper
    if (this.ability.critModifier) {
        crit *= this.ability.critModifier(this, move,foe);
    }
    //  This could be a thing
    if (this.allowItem() && this.item.critModifier) {
        crit *= this.item.critModifier(this, move, foe);
    }
    return crit;
};
Poke.prototype.allowItem = function () {
    //  Becaue JS's undefined vs false behavior
    if (this.temp.noitem || this.ability.noitem) {
        return false;
    }
    return true;
};
Poke.prototype.allowLoseItem = function () {
    if (this.item.sticky) {
        return false;
    }
    if (this.ability.allowLoseItem) {
        return this.ability.allowLoseItem();
    }
    return true;
}
Poke.prototype.allowSuppressAbility = function () {
    if (this.ability.allowSuppressAbility) {
        return this.ability.allowSuppressAbility();
    }
    return true;
};
Poke.prototype.takeRecoilEffect = function (foe, damage) {
    if (this.ability.takeRecoilEffect) {
        this.takeRecoilDamage(this.ability.takeRecoilEffect(this, foe, damage));
    //  Life Orb
    if (this.item.takeRecoilEffect) {
        this.takeRecoilDamage(this.item.takeRecoilEffect(this, foe, damage));
    }
}


