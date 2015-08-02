function Pokemon(mon, item, ability, nature, ivs, evs, moves){
    if (Mon[mon] === undefined) {
        game.e("Illegal Pokemon ");
    }
    this.mon = mon;   //  because 'id' was taken
    this.item = Item[item];
    this.ability = Ability[ability];
    while (moves.length < 4) {
        moves.push(Move["No Move"]);
    }
    this.moves = [Move[moves[0]], Move[moves[1]], Move[moves[2]], Move[moves[3]]];
    this.type1 = Type[Mon[mon].type1];
    this.type2 = Type[Mon[mon].type2];
    //  Calculate stats. Nature, ivs, and evs can be dropped afterward
    var basestats = Mon[mon].basestats;
    //  Shedinja's base HP is always 1
    if (basestats[0] == 1) {
        this.stats = [1];
    }
    else {
        //  HP calc is different from the others
        this.stats = [Math.floor((ivs[0] + (2 * basestats[0]) + (evs[0] / 4) + 100) * level / 100 + 10)];
    }
    //  calc the others stats
    for (var i = 1; i < 6; i++) {
        this.stats.push(Math.floor((ivs[i] + (2 * basestats[i]) + (evs[i] / 4) ) * level / 100 + 5));
    }
    //  Apply nature modifiers
    var boosted = Nature[nature][0], dropped = Nature[nature][1];
    if (boosted != dropped) {
        stats[Nature[nature][0]] *= 1.1;
        stats[Nature[nature][1]] *= 0.9;
    }
    //  These will only be defaulted at battle start
    //  Don't put these in the reset function
    this.status = "Healthy";
    this.sleepcounter = 0;
    this.hpleft = this.basestats[0];    
    //  These will be defaulted on switch
    this.reset();
}
Pokemon.prototype.reset = function() {
    //  Stage-based stat boosts/drops
    this.boosts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.toxiccounter = 0;
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
    //  Moveset Restriction
    this.choicelock = false;
    this.lastMove = "(No Move)";
    this.disable = {duration : 0, move : -1};
    this.encore = {duration : 0, move : -1};
    //  Others
    this.hasMoved = false;
    this.helpinghand = false;
    this.protect = false;
    this.protecting = false;
    this.flinching = false;
    this.leechseed = false;
    this.kingshield = false;
    this.rage = 0;
    this.charging = false;
    this.magic = false;
    this.minimize = false;
    this.bind = {duration : 0, move : "(No Move)"};
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
    if (this.status != "Healthy") {
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
            case "Burn":
                if (this.type1 != "Fire" && this.type2 != "Fire") {
                    this.afterGetStatus(status);
                }
                break;
            //  Only para non-ele mons
            case "Paralysis":
                if (this.type1 != "Electric" && this.type2 != "Electric") {
                    this.afterGetStatus(status);
                }
                break;
            //  Only freeze non-ice mons
            case "Freeze":
                if (this.type1 != "Ice" && this.type2 != "Ice") {
                    this.afterGetStatus(status);
                }
                break;
            //  Poison and Steel are both immune
            case "Poison":
            case "Badly Poison":
                if (this.type1 != "Steel" && this.type1 != "Poison"
                &&  this.type2 != "Steel" && this.type2 != "Poison") {
                    this.afterGetStatus(status);
                }
                break;
        }
    }
};
//  Called when the status condition is successfully inflicted on the mon
Pokemon.prototype.afterGetStatus = function (status) {
    this.status = status;
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
        this.hurt(this.toxic * this.hp / 16);
        this.statuscounter++;
    }
}
Pokemon.prototype.onCureStatus = function () {
    this.ability.onCureStatus();
    this.item.onCureStatus();
}
//  Called when a user attempts a status move affected by Magic
//  Return true for success and false to trigger failure
Pokemon.prototype.onMagicMove = function(user, move) {
    //  Either this mon has Magic or its ability triggers it
    if (this.magic || !ability.onMagicMove(user, move) || !item.onMagicMove(user, move)) {
        //  TODO: Redirection
        return false;
    }
    else return true;
}
onGetStatus : function(status),
onMultiHit : function(),
onPhazed : function(),
onBind : function(move, target),
