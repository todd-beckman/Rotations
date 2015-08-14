//  No, it does not get any prettier than this
//  Yes, this is where the magic happens.
var calculateDamage = function (level, attack, defense, base, modifier) {
    return ((level >> 1 + 10) * attack * base * modifier /
        (250 * defense) + 2) * (0.85 + rand(0.15));
};
//  Returns the ratio effect of the boost
//  Do not use this for Critical Hit ratio
var statBoost = function (user, foe, stat) {
    var uability = user.getAbility(),
        fability = foe.getAbility();
    //  User ignores itself getting the boost
    if (uability.ignoreUserBoost
    &&  uability.ignoreUserBoost(foe, stat)) {
        return 1;
    }
    //  Foe ignores being targeted with a boost
    if (uability.ignoreFoeBoost
    &&  uability.ignoreFoeBoost(user, stat)) {
        return 1;
    }
    var stages = user.temp.boosts[stat];
    var value = (stat == Stat.Evasion || stat == Stat.Acuracy) ? 3 : 2;
    if (stages < 0) {
        return value / (stages + value);
    }
    else {
        return (stages + value) / value;
    }
};
//  Get the actual stat
var getStat = function (user, foe, stat) {
    var num = user.stats[stat];
    //  Huge Power, Pure Power, Slow Start, and Furfrou's ability
    num *= user.getStatModifier(stat, foe);
    return num * statBoost(user, foe, stat);
};
//  Accuracy check: Determine if the move hits or misses
var moveHit = function (user, move, foe) {
    //  Moves that never miss
    if (move.accuracy === true) {
        return true;
    }
    //  No Guard, homing abilities
    var uability = user.getAbility(),
        fability = foe.getAbility();
    if (uability.ignoreAccuracy && uability.ignoreAccuracy(user, move, foe)
    ||  fability.ignoreAccuracy && fability.ignoreAccuracy(user, move, foe)) {
        return true;
    }
    if (move.ohko) {
        var odds = 30 + user.level - foe.level;
        return 30 <= odds && rand(100) < odds;
    }
    var accuracy = getStat(user, foe, Stat.Accuracy);
    var evasion = getStat(foe, user, Stat.Evasion);
    return rand(100) < move.accuracy * accuracy * evasion;  
};
//  Get the type effectiveness of the attack, 
var typeEff = function (user, move, foe) {
    if (!move.noeff) {
    var typeeff = 1, types = foe.getTypes();
    for (var i = 0; i < types.length; i++) {
        //  Flying Press, Freeze Dry
        if (move.typetable) {
            typeeff *= move.typetable[move.type][types[i]] / 2;
        }
        //  Delta Stream
        else if (uability.typetable) {
            typeeff *= uability.typetable[move.type][types[i]] / 2;
        }
        //  Delta Stream
        else if (fability.typetable) {
            typeeff *= uability.typetable[move.type][types[i]] / 2;
        }
        //  Standard table
        else {
            typeeff *= typetable[move.type][types[i]] / 2
        }
    }
    return typeeff;
}

var useMove = function (user, decision, noreverse) {
    //  Use decision to construct targets
    //  and loop through the foes
    //  Do not use the user's decision because this could be
    //  a manual move call
    //  leave noreverse undefined or false at first

    //  If slot is undefined, usemove is, due to out-of-turn move calls.
    //  If usemove is the case, targets may need to be defined
}

//  Gets data on the calculations
//  It is an object, not a number, because important info must be passed
//  based on this calculation
var damageCalc = function (user, move, foe) {
    //  Base power may vary
    var power = move.getPower
        ? move.getPower(user, foe, hit, hit2) : move.power;
    //  Multipliers sometimes exist
    if (move.powerMultiplier) {
        power *= move.powerMultipler(user, foe);
    }
    if (ability.powerMultiplier) {
        power *= ability.powerMultiplier(user, foe, hits2);
    }
    var modifier = 1,
        typeeff = typeEffectiveness(user, move, foe),
        crit = false;
    //  Seismic Toss, Night Shade, Sonic Boom, Dragon Rage
    if (!move.getExactDamage) {
        //  Shell Armor
        if (!fability.noCrits) {
            var stages = user.temp.boosts[Stat.Critical];
            //  Super Luck
            if (uability.modifyCritStage) {
                stages += uability.modifyCritStage(user, move, foe);
            }
            //  Razor Claw, some other item
            if (uitem.modifyCritStage) {
                stages += uitem.modifyCritStage(user, move, foe);
            }
            if (-1 < stages) {
                var odds = 1;
                switch (stages) {
                    case 0: odds = 1/16;
                    case 1: odds = 1/8;
                    case 2: odds = 1/2;
                }
                crit = rand(1) < odds;
            }
        }
    }
    //  Does no damage if the type effectiveness is 0
    //  end early
    //  else:
    modifier *= typeeff;
    if (crit) {
        //  before gen 6, this is 2
        modifier *= 1.5;
    }
    //  Burn halves attack
    if (move.category == Category.Physical && user.status == Status.Burn) {
        //  Move Facade and Ability Guts
        if (!move.cancelBurnAttackDrop && !uability.cancelBurnAttackDrop) {
            modifier *= .5;
        }
    }
    //  Guts, Sniper
    if (uability.getDamageModifier) {
        modifer *= uability.getDamageModifier(user, move, foe, crit, eff);
    }
    //  Dry Skin (hurt), Thick Fat
    if (fability.getFoeDamageModifier) {
        modifier *= fability.onFoeDamageModifier(user, move, foe, crit, eff);
    }
    //  About half the viable hold items
    if (uitem.getDamageModifier) {
        modifier *= uitem.getDamageModifier(user, move, foe, crit, eff);
    }
    //  About half of the remaining viable hold items
    if (fitem.getFoeDamageModifier) {
        modifier *= fitem.getFoeDamageModifier(user, move, foe, crit, eff);
    }
    //  Spread moves damage everyone
    if (1 < field.activeMons && user.decision.targets.length > 1) {
        modifier *= 0.75;
    }
    var damage = calculateDamage(level, attack, defense, base, modifier);
    return {"damage":damage,"crit":crit,"typeeff":typeeff};
}

var moveSequence = function (user, move, foe, noreverse) {
    var uability = user.getAbility(),
        fability = foe.getAbility(),
        uitem = user.item,
        fitem = foe.item;
    //  This is the case even if it fails
    user.thisturn.hasmoved = true;
    //  Flinches cancel move early
    if (user.thisturn.flinch && !user.stopFlinching(move, foe)) {
        game.write(user.name() + " flinched!");
        //  Steadfast
        user.onFlinch();
        return;
    }
    //  Taunt, Torment, Disable can activate mid-turn after decision is made
    if (user.moveIsRestricted(user.moves[user.thisturn.decision.slot])) {
        return;
    }
    //  Recharge!
    if (user.thisturn.recharge) {
        game.write(user.name() + " must rechage.");
        return;
    }
    //  Don't commit if this is the first of a 2-turn move
    if (move.takeChargeTurn(user, foe)) {
        return;
    }
    //  Commit to move, even if it move misses or fails
    game.write(user.name() + " uses " + move.name + "!");
    user.pp[user.thisturn.decision.slot]--;
    //  Preconditions must be met
    if (!move.preConditions(user, foe)) {
        game.write(user.name())
        return;
    }
    if (foe != user && !moveHit(user, move, foe)) {
        game.write(user.name() "'s attack missed!");
        move.onMiss(user, foe);
    }
    //  Multi-hit moves
    var numhits = move.getHitCount ? move.getHitCount(user, foe) : 1;
    for (var hit = 0; hit < numhits; hit++) {
        //  Side effects could have changed this
        var ability = user.getAbility();
        //  Parental Bond
        var numhits2 = ability.getHitCount ? ability.getHitCount(move) : 1;
        for (var hit2 = 0; hit2 < numhits2; hit2++) {
            //  These could have been changed by move effects
            uability = user.getAbility();
            fability = foe.getAbility();
            uitem = theuser.item;
            fitem = thefoe.item;
            //  Ability Magic Bounce and Move Magic Coat
            if (!(noreverse === true)  //  could be undefined
            &&  move.flags.magic && foe.hasMagic()) {
                useMove(foe, {
                    option:fight,
                    targets:undefined,
                    slot:undefined,
                    usemove:move
                });
                return;
            }
            //  Status moves don't cause damage
            if (move.category == Category.Status) {
                if (0 < typeEffectiveness(theuser, move, thefoe)) {
                    move.onSuccess(theuser, thefoe);
                }
            }
            else {
                var damageinfo = damageCalc(user, move, foe);
                var damage = dmageinfo.damage;
                var crit = damageinfo.crit;
                var typeeff = damageinfo.typeeff;
                //  Self-damaging moves hurt the user first
                move.beforeDamage(user, foe);
                //  Critical hit!
                if (crit) {
                    game.write("<font color='yellow'>A critical hit!</font>");
                    //  Anger Point
                    user.onLandCrit(move, foe);
                }
                if (typeeff < 1) {
                    game.write("It's not very effective...");
                    //  I know these are a thing but I can't remember what
                    user.onLandNotVeryEffectiveHit(move, foe);
                    foe.onTakeNotVeryEffectiveHit(user, move);
                }
                else if (1 < typeeff) {
                    game.write("It's super effective!");
                    //  I know these are a thing but I can't remember what
                    user.onLandSuperEffectiveHit(move, foe);
                    foe.onTakeSuperEffectiveHit(user, move);
                }
                //  Direct damage
                foe.takeDirectDamage(damage);
                //  Draining Moves
                if (move.drain) {
                    user.drain(damage * move.drain);
                }
                //  Shell Bell
                user.afterDamage(damage);
                //  Allow the foe to faint the user before the faint check
                if (move.flags.contact) {
                    foe.onContact(user, move);
                }
                //  User KOing itself faints first
                if (user.health == 0) {
                    user.onFaint();
                }
                //  User did not KO itself, foe didn't KO it; foe faints next
                if (foe.health == 0) {
                    foe.onFaint(user);
                }
                //  User takes damage from standard recoil
                if (move.recoil) {
                    user.takeRecoilDamage(damage * move.recoil);
                }
                //  Special recoil rates such as Struggle
                if (move.recoilDamage) {
                    user.takeRecoilDamage(move.recoilDamage(user,foe, damage));
                }
                /*I'm sure this is a thing; will uncomment as appropriate
                if (user.ability.causeRecoil) {
                    user.item.causeRecoil(user, damage);
                }*/
                //  Life Orb
                if (user.item && user.item.causeRecoil) {
                    user.item.causeRecoil(user, damage);
                }
                //  User still might faint after the tiebreaker
                if (user.health == 0) {
                    user.onFaint();
                }
                //  Side effects
                move.onSuccess(user, foe);
                //  The shorthand in movedex now kicking me in the ass
                for (var eff in move.effects) {
                    switch (eff) {
                    case "userboost":
                        for (var stat in eff.userboost) {
                            if (eff.userboost[stat][1] == undefined
                            ||  rand(100) < eff.userboost[stat[1]]) {
                                user.onStatChange(stat, eff.userboost[0]);
                            }
                        }
                        break;
                    case "foeboost":
                        for (var stat in eff.foeboost) {
                            if (eff.foeboost[stat][1] == undefined
                            ||  rand(100) < eff.foeboost[stat[1]]) {
                                //  user copied because likely future changes
                                foe.onStatChange(stat, eff.foeboost[0], user);
                            }
                        }
                        break;
                    case "status":
                        if (user.status != Status.Healthy) {
                            for (var status in eff.status) {
                                if (rand(100) < eff.status[status]) {
                                    user.getStatus(status);
                                }
                            }
                        }
                        break;
                    case "confuse":
                        if (!foe.confused && rand(100) < eff.confuse) {
                            //  User copied in
                            foe.getConfused(user);
                        }
                        break;
                    case "infatuate":
                        if (!foe.infatuated && rand(100) < eff.infatuate) {
                            foe.getInfatuated(user);
                        }
                        break;
                    }
                }
            }
        }
    }
}