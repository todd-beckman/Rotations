function Pokemon(mon, nick, item, ability, nature, ivs, evs, moves){
    //  Load the mon
    this.nick = nick;
    if (Mon[mon] === undefined) {
        game.e("Illegal Pokemon " + mon);
        return;
    }
    this.mon = mon;
    //  Load the item
    if (Item[item] === undefined) {
        game.e("Illegal Item: " + item);
        return;
    }
    this.item = Item[item];
    //  Load the nature
    if (Nature[nature] === undefined) {
        game.e("Illegal Nature: " + nature);
        return;
    }
    this.nature = Nature[nature];
    //  Check legal ivs and evs
    var sum = 0;
    for (var i = 0; i < 6; i++) {
        //  EVs must be in range [0, 252];
        if (252 < evs[i] || evs[i] < 0) {
            game.e("Illegal EV spread: " + evs.join(", "));
            return;
        }
        sum += evs[i];
        //  IVs must be in range [0, 31];
        if (31 < ivs[i] || ivs[i] < -1) {
            game.e("Illegal IV spread: " + ivs.join(", "));
            return;
        }
    }
    //  Too many EVs
    if (510 < sum) {
        game.e("Illegal EV spread: " + evs.join(", "));
        return;
    }
    //  Save stats in case of form change
    this.evs = evs;
    this.ivs = ivs;
    //  Load things having to do with form
    this.loadTrivial();
    //  These will only be defaulted at battle start
    //  Don't put these in the reset function
    this.Status = Status.Healthy;
    this.sleep = 0;
    this.hpleft = this.basestats[0];    
    //  These will be defaulted on switch
    this.loadDefaults();
}
Pokemon.prototype.loadTrivial = function () {
    //  Load the ability
    if (Ability[ability] === undefined) {
        game.e("Illegal Ability: " + ability);
        return;
    }
    this.ability = Ability[ability];
    //  Load the moves
    this.moves = [];
    for (var i = 0; i < 4; i++) {
        if (Move[moves[i]] == undefined) {
            moves.push(Move["No Move"]);
        }
        else {
            this.moves.push(Move[moves[i]]);
        }
    }
    //  Load the types
    this.type1 = Type[Mon[mon].type1];
    this.type2 = Type[Mon[mon].type2];
    //  Calculate stats
    var basestats = Mon[mon].basestats;
    //  Shedinja's base HP is always 1
    if (basestats[0] == 1) {
        this.stats = [1];
    }
    else {
        //  HP calc is different from the others
        this.stats = [Math.floor((this.ivs[0] + (2 * basestats[0]) + (this.evs[0] / 4) + 100) * this.level / 100 + 10)];
    }
    //  calc the others stats
    for (var i = 1; i < 6; i++) {
        this.stats.push(Math.floor((this.ivs[i] + (2 * basestats[i]) + (this.evs[i] / 4) ) * this.level / 100 + 5));
    }
    //  Apply nature modifiers
    var boosted = Nature[this.nature][0], dropped = Nature[this.nature][1];
    if (boosted != dropped) {
        this.stats[boosted] *= 1.1;
        this.stats[dropped] *= 0.9;
    }
}
Pokemon.prototype.changeForm = function (mon){
    this.mon = mon;
    this.loadTrivial();
}
Pokemon.prototype.loadDefaults = function() {
    //  Stage-based stat boosts/drops
    this.boosts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.toxic = 0;
    //  Pseudo-stats Conditions
    this.confused = false;
    this.confusecounter = 0;
    this.taunt = 0;
    this.torment = 0;
    this.attract = false;
    this.perish = -1;
    this.endure = false;
    //  Semi-invulnerable states
    this.digging = false;
    this.flying = false;
    this.diving = false;
    this.bouncing = false;
    this.phantom = false;
    this.skydropping = false;
    //  Choice Restriction
    this.flinching = false;
    this.choicelock = false;
    this.lastMove = "No Move";
    this.disable = {duration : 0, move : -1};
    this.encore = {duration : 0, move : -1};
    this.charging = false;
    //  Others
    this.hasMoved = false;
    this.helpinghand = false;
    this.protect = false;
    this.protecting = false;
    this.leechseed = false;
    this.kingshield = false;
    this.rage = 0;
    this.magic = false;
    this.minimize = false;
    this.bind = {duration : 0, move : "No Move"};
}



//  HANDLE DAMAGE
//  Called when a mon loses HP. Source triggers it; may be undefined
Pokemon.prototype.hurt = function (damage, source) {
    var total;
    for (total = 0; total < damage; total++) {
        if (this.hpleft == 1 && !this.takeLastHP()) {
            break;
        }
        if (this.hpleft == 0) {
            this.onFaint(source);
            break;
        }
    }
    //  TODO stuff
    this.afterDamageTaken(total, source);
};
Pokemon.prototype.takeLastHP = function () {
    return !this.endure && this.ability.takeLastHP() && this.item.takeLastHP();
}
//  Called after the mon takes damage. Source triggers it; may be undefined
Pokemon.prototype.afterDamageTaken = function (damage, source) {
    this.ability.afterDamageTaken(damage, source);
    this.item.afterDamageTaken(damage, source);
};
//  Called when the mon is fainting. Source triggers it; may be undefined
Pokemon.prototype.onFaint = function (source) {
    this.ability.onFaint(source);
    this.item.onFaint(source);
};
//  Called when this mon makes contact with the foe
Pokemon.prototype.onTouch = function(move, foe) {
    this.ability.onTouch(move, foe);
    this.item.onTouch(move, foe);
}
//  Called when a user makes contact with this mon
Pokemon.prototype.onTouched = function(user, move) {
    this.ability.onTouched(user, move);
    this.item.onTouch(user, move);
}


//  HANDLE STATUS
//  Called when the mon acquires a status condition
Pokemon.prototype.onGetStatus = function(status) {
    //  Already has status; cannot status again
    if (this.Status != Status.Healthy) {
        return;
    }
    //  Some abilities prevent status
    if (!this.ability.onGetStatus(status)) {
        return;
    }
    //  Some items prevent status
    if (!this.item.onGetStatus(status)) {
        return;
    }
    else {
        switch (status) {
            //  Only burn non-fire mons
            case Status.Burn:
                if (this.type1 != Type.Fire && this.type2 != Type.Fire) {
                    this.afterGetStatus(status);
                }
                break;
            //  Only para non-ele mons
            case Status.Paralyze:
                if (this.type1 != Type.Electric && this.type2 != Type.Electric) {
                    this.afterGetStatus(status);
                }
                break;
            //  Only freeze non-ice mons
            case Status.Freeze:
                if (this.type1 != Type.Ice && this.type2 != Type.Ice) {
                    this.afterGetStatus(status);
                }
                break;
            //  Poison and Steel are both immune
            case Status.Poison:
            case Status.BadlyPoison:
                if (this.type1 != Type.Steel && this.type1 != Type.Poison
                &&  this.type2 != Type.Steel && this.type2 != Type.Poison) {
                    this.afterGetStatus(status);
                }
                break;
        }
    }
};
//  Called when the status condition is successfully inflicted on the mon
Pokemon.prototype.afterGetStatus = function (status) {
    this.Status = status;
    this.statuscounter = 1;
    this.ability.afterGetStatus(status);
    this.item.afterGetStatus(status);
};
//  Called when the mon takes burn damage
Pokemon.prototype.onTakeBurnDamage = function() {
    if (this.ability.onTakeBurnDamage() && this.item.onTakeBurnDamage()) {
        this.hurt(this.hp / 16);
    }
};
//  Called when the mon takes poison damage
Pokemon.prototype.onTakePoisonDamage = function () {
    if (this.ability.onTakePoisonDamage() && this.item.onTakePoisonDamage()) {
        this.hurt(this.hp / 8);
    }
}
//  Called when the mon takes bad poison damage
Pokemon.prototype.onTakeBadPoisonDamage = function () {
    if (this.ability.onTakeBadPoisonDamage() && this.item.onTakeBadPoisonDamage()) {
        this.hurt(this.toxic++ * this.hp / 16);
    }
}
Pokemon.prototype.onCureStatus = function () {
    this.Status = Status.Healthy;s
    this.ability.onCureStatus();
    this.item.onCureStatus();
}
//  Called when a user attempts a status move affected by Magic on this mon
//  Return true for success and false to trigger failure
Pokemon.prototype.onMagicMove = function(user, move) {
    //  Either this mon has Magic or its ability triggers it
    return !this.magic
        && ability.onMagicMove(user, move) && item.onMagicMove(user, move);
}
Pokemon.prototype.onStatChange = function (stat, change, source) {
    //  TODO
}
onGetStatus : function(status),
onMultiHit : function(),
onPhazed : function(),
onBind : function(move, target),
