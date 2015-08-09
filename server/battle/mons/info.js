//  Template format
var template = loadFromTemplate(name);
template = {
    name : "Missingno",
    basestats : {
        "HP" : 0, "Attack" : 0, "Defense" : 0, "Speed" : 0
        "Special Attack" : 0, "Special Defense" : 0
    }
    types : ["Normal", "???"],
    abilities : ["No Ability", "No Ability", "No Ability"],
    weight : 50
};
//  Build format
build = {
    nickname : "George Zip",
    nature : "Hardy",
    item : "No Item",
    ability : "No Ability",
    ivs : {
        "HP" : 0, "Attack" : 0, "Defense" : 0, "Speed" : 0,
        "Special Attack" : 0, "Special Defense" : 0
    },
    evs : {
        "HP" : 0, "Attack" : 0, "Defense" : 0, "Speed" : 0,
        "Special Attack" : 0, "Special Defense" : 0
    }
};

function Mon (name, build, team, slot) {
    this.team = team;
    this.slot = slot;
    this.template = loadFromTemplate(name);
    this.build = build;
    //  Properties that stay until changed
    this.permanent = {
        mega : false,
        nick : "George Zip",
        item : Item[this.build.helditem],
        ability : Ability[this.build.ability],
        types : this.template.types,
        stats : {
            "HP" : 0,
            "Attack" : 0,
            "Defense" : 0,
            "Special Attack" : 0,
            "Special Defense" : 0,
            "Speed" : 0
        },
        hpleft : 0,
        status : "Healthy",
        moves : [],
        movepp : [0, 0, 0, 0]
        //  Let usage define these on the fly
        //toxic : 0,
        //eatenberry : false,
        //hyper : false       //  Unofficial (Shadow)
    },
    //  Properties that are dropped when switched out
    this.temporary = {
        //  Commented out means it is define on the fly
        //ability : [object],
        //item : [object],
        //types : [],
        statboosts : {
            "HP" : 0, "Attack" : 0, "Defense" : 0, "Speed" : 0,
            "Special Attack" : 0, "Special Defense" : 0,
            "Accuracy" : 0, "Evasion" : 0
        },
        lastmove : "No Move",
        binding : [{        //  List of bindings
            move : "No Move",
            turns : 0,
            source : [object]
        }],
        countdown : {
            //confuse : 0,
            //yawn : 0,
            //magnetrise : 0,
            //telekinesis : 0,
            //taunt : 0,
            //torment : 0,
            //encore : 0,
            //recharging : 0,
            //skydropping : 0,
            //skydrop : 0,
            //embargo : 0,
            //healblock : 0
        },
        //extratype : "???",
        //protectcount : 0,
        //choicelock : false, //  Save the move
        //attract : false,    //  Save the target
        //substitute : 0,     //  Save the HP
        //block : [],         //  Save the sources
        //grounded : false,
        //powder : false,
        //minimize : false,
    },
    //  same as thisturn, loaded next turn
    nextturn : {}
    //  Properties that only exist this turn
    thisturn : {        //  2-turn moves, charge turn 1
        //  true when switched in, false when sent out naturally
        hasmoved : true,
        //flying : false,
        //phantom : false,
        //diving : false,
        //use this
        //charging : false,
        //fairylock : source,
        //electricfy : false,
        //round : false,
        endure : false,
        protection : {
            protect : false,
            spikyshield : false,
            //  Only one 's'
            kingshield : false
        }
        decision : {
            option : "Fight", //"Fight" or "Switch"
            //  if fight:
            //mega : false,
            //rotate : false, "Left" or "Right"
            //move : to move using
            //  if switch:
            //mon : to replace it
        }
    }
}

//  -------- Information functions --------------------------------------------

Mon.prototype.ability = function () {
    if (this.temporary.ability) {
        return this.temporary.ability;
    }
    return this.permanent.ability;
};
Mon.prototype.helditem = function () {
    return this.permanent.helditem;
};
Mon.prototype.types = function (){
    var types = this.permanent.types;
    if (this.temporary.extratype) {
        types.push(this.temporary.extratype);
    }
    if (this.temporary.types) {
        for (var i = 0; i < this.temporary.types.length; i++) {
            types = this.temporary.types[i];
        }
    }
    return types;
};
Mon.prototype.hasType = function (type) {
    return -1 < this.types().indexOf(type);
};
Mon.prototype.grounded = function() {
    //  Temporary conditions override everything
    //  Smack Down
    if (this.temporary.grounded) {
        return true;
    }
    //  Roost
    if (this.thisturn.grounded) {
        return true;
    }
    if (this.hasType("Flying")) {
        return false;
    }
    var ability = this.ability(),
        item = this.helditem();
    if (ability && ability.levitate || item && item.levitate) {
        return false;
    }
    return true;
};
Mon.prototype.nick = function () {
    //  Transform, Illusion
    if (this.temporary.nickname) {
        return this.temporary.nickname;
    }
    return this.build.nickname;
}

//  -------- Directed events --------------------------------------------------
Mon.prototype.heal = function (health) {
    this.permanent.hpleft += health;
    game.write(this.nick() + " restored " + health + " hit points ("
        + Math.floor(100 * health / this.permanent.stats.HP) + "%)!");
};
Mon.prototype.hurt = function (damage) {
    this.permament.hpleft -= damage;
    game.write(this.nick() + " lost " + damage + " hit points ("
        + Math.floor(100 * damage / this.permanent.stats.HP) + "%)!");
};
//  Direct damage from an attack
Mon.prototype.takeDamage = function (foe, damage) {
    var ability = this.ability(),
        item = this.helditem(),
        foeability = foe.ability(),
        foehelditem = foe.helditem();
    if (this.permanent.hpleft < damage) {
        damage = this.permanent.hpleft;
    }
    //  Will cause user to faint
    if (damage == this.permanent.hpleft) {
        //  Moldbreaker
        if (foeability && foeability.moldbreaker) {
            game.showability(foe, ability);
        }
        else {
            //  Endure
            if (this.thisturn.endure
            //  Sturdy
            ||  ability && ability.onEndure && ability.onEndure(this, damage)
            //  Focus Band/Sash
            ||  item && item.onEndure && item.onEndure(this, damage)) {
                damage -= 1;
            }
        }
    }
    this.hurt(damage);
    //  Illusion
    if (ability && ability.afterDamageTaken) {
        ability.afterDamageTaken(this, damage);
    }
    //  Air Balloon
    if (item && item.afterDamageTaken) {
        item.afterDamageTaken(this, damage);
    }
    //  Unused but potential
    if (foeability && foeability.afterDamageDealt) {
        foeability.afterDamageDealt(this, damage);
    }
    //  Shell Bell, Life orb
    if (foeitem && foeitem.afterDamageDealt) {
        foeitem.afterDamageDealt(this, damage);
    }
    //  Don't go straight to onFaint because the order of fainting
    //  should be handled by the battle handler, which will break
    //  appropriate ties.
};
//  Source should be a string
//  "Burn", "Poison", "Sand", "Hail", "Recoil", "Trap", "Contact"
//  "Drain", "Ability", "Item"
Mon.prototype.takeResidualDamageTaken = function (damage, source) {
    var ability = this.ability(),
        item = this.helditem();
    //  Magic Guard, Poison Heal, Ice Body, Snow Veil,
    //  Sand Force, Sand Rush, Sand Veil, Sheer Force?
    //  Liquid Ooze
    if (ability && ability.cancelResidualDamage
    &&  ability.cancelResidualDamage(this, damage, source)) {
        return;
    }
    //  Safety Goggles
    if (item && item.cancelResidualDamage
    &&  item.cancelResidualDamage(this, damage, source)) {
        return;
    }
    this.hurt(damage);
};
Mon.protote.statRaise = function (statchange) {
    if (6 < this.temporary.boosts[statchange.s] + statchange.num) {
        statchange.num = 6 - this.temporary.boosts[statchange.s]
        if (statchange.num == 0) {
            game.write(this.nick()+"'s " + statchange.s + " won't go higher!");
            return;
        }
    }
    this.temporary.boosts[statchange.s] += statchange.num;
    if (this.temporary.boosts[statchange.s] == 6) {
        game.write(this.nick() + "'s " + statchange.s + " was maximized!");
    }
    else {
        var adverb = " ";
        if (2 == statchange.num) {
            adverb = " harshly";
        }
        else if (statchange.num != 1) {
            adverb = " drastically";
        }
        game.write(this.nick() + "'s " + statchange.s + adverb + " rose!");
    }
};
Mon.protote.statDrop = function (statchange) {
    if (this.temporary.boosts[statchange.s] + statchange.num < -6) {
        statchange.num = -6 - this.temporary.boosts[statchange.s]
        if (statchange.num == 0) {
            game.write(this.nick()+ "'s " + statchange.s + " won't go lower!");
            return;
        }
    }
    this.temporary.boosts[statchange.s] += statchange.num;
    if (this.temporary.boosts[statchange.s] == -6) {
        game.write(this.nick() + "'s " + statchange.s + " was minimized!");
    }
    else {
        var adverb = " ";
        if (-2 == statchange.num) {
            adverb = " harshly";
        }
        else if (statchange.num != -1) {
            adverb = " severely";
        }
        game.write(this.nick() + "'s " + statchange.s + adverb + " fell!");
    }
};
Mon.prototype.statChange = function (stat, stages, foe, noredirect) {
    var statchange = {s : stat, num : stages};
    var ability = this.ability(),
        item = this.helditem();
    //  Contrary
    if (ability && ability.onStatChange) {
        statchange = ability.onStatChange(statchange, foe, noredirect);
    }
    if (item && item.onStatChange) {
        statchange = ability.onStatChange(statchange, foe, noredirect);
    }
    if (statchange.num == 0) {
        return;
    }
    else if (statchange.num < 0) {
        this.statDrop(statchange);
    }
    else {
        this.statRaise(statchange);
    }
}

//  -------- Reactive events---------------------------------------------------

Mon.prototype.onFaint = function (foe) {
    if (foe) {
        var ability = this.ability(),
            item = this.helditem();
        //  Aftermath
        if (ability && ability.onFaint) {
            ability.onFaint(this, foe);
        }
        //  Unused but potential
        if (item && item.onFaint) {
            ability.onFaint(this, foe);
        }
    }
    this.fainted = true;
    this.team[this.slot].empty = true;
    game.write(this.nick() + " fainted!");
}
Mon.prototype.onTouch = function (foe) {
    var ability = this.ability(),
        item = this.helditem();
    if (ability.onTouch) {
        ability.onTouch(this, foe);
    }
    if (item.onTouch) {
        item.onTouch(this, foe);
    }
};
Mon.prototype.onTouched = function (foe) {
    var ability = this.ability();
        item = this.helditem();
    if (ability.onTouched) {
        ability.onTouched(this, foe);
    }
    if (item.onTouched) {
        item.onTouched(this, foe);
    }
};

//  Multipliers
Mon.prototype.onMovePowerMultiplier = function (foe, move) {
    var multipier = 1,
        ability = this.ability(),
        item = this.helditem();
    if (ability.onMovePowerMultiplier) {
        multiplier *= ability.onMovePowerMultipler(this, foe, move);
    }
    if (item.onMovePowerMultiplier) {
        multiplier *= item.onMovePowerMultipler(this, foe, move);
    }
    return multiplier;
};
Mon.prototype.onAttackMultiplier = function (foe, move) {
    var multipier = 1,
        ability = this.ability(),
        item = this.helditem();
    if (ability && ability.onAttackMultiplier) {
        multiplier *= ability.onAttackMultipler(this, foe, move);
    }
    if (item && item.onAttackMultiplier) {
        multiplier *= item.onAttackMultipler(this, foe, move);
    }
    return multiplier;
};
