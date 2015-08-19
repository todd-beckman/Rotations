//  No, it does not get any prettier than this
//  Yes, this is where the magic happens.
var calculateDamage = function (level, attack, defense, base, modifier) {
    return ((level >> 1 + 10) * attack * base * modifier /
        (250 * defense) + 2) * (0.85 + rand(0.15));
};
//  Accuracy check: Determine if the move hits or misses
var moveHit = function (user, move, foe) {
    //  Moves that never miss
    var accuracy = move.getAccuracy ? move.getAccuracy (user, foe) : move.accuracy;

    if (move.accuracy === true) {
        return true;
    }
    //  No Guard, homing abilities
    if (user.ability.ignoreAccuracy
    &&  user.ability.ignoreAccuracy(user, move, foe)
    ||  foe.ability.ignoreAccuracy
    &&  foe.ability.ignoreAccuracy(user, move, foe)) {
        return true;
    }
    if (move.flags.ohko) {
        var odds = 30 + user.level - foe.level;
        return 30 <= odds && rand(100) < odds;
    }
    var uaccuracy = statBoost(user, foe, Stat.Accuracy);
    var fevasion = statBoost(foe, user, Stat.Evasion);
    return rand(100) < accuracy * uaccuracy * fevasion;  
};

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
//  based on this calculation.
//  I separated this from the giant code because the moves (Hi) Jump Kick
//  require the number on the miss event, which happens way before the rest
//  of the events. However, consumable items must not be consumed until they
//  are actually used rather than having theoretial calculations consume them
//  for real.
var damageCalc = function (user, move, foe, hit, hit2) {
    if (move.getExactDamage) {
        return {
            "damage" : move.getExactDamage(user, foe),
            //  Exact damage is never critical
            "crit" : false,
            //  Either doesn't affect or is neutral damage
            "typeeff": typeEffectiveness(user, move, foe) ? 1 : 0
        };
    }
    //  Base power may vary
    var power = move.getPower
        ? move.getPower(user, foe, hit, hit2) : move.power;
    //  Examples- moves that hit Fly, Bounce, and Dig
    if (move.powerMultiplier) {
        power *= move.powerMultipler(user, foe);
    }
    //  Muscle Band and Wise Glasses?
    //  Refrigerate, Aerialate, Pixelate
    power *= user.powerMultiplier(user, foe, hit, hit2, power);
    power *= foe.powerMultiplier(user, foe, hit, hit2, power);
    var modifier = 1,
        typeeff = typeEffectiveness(user, move, foe),
        crit = false;
    //  Seismic Toss, Night Shade, Sonic Boom, Dragon Rage
    if (!move.getExactDamage) {
        //  Shell Armor
        if (!foe.ability.noCrits) {
            var stages = user.getStage(Stat.Critical);
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
        user.critModifier(move, foe);
    }
    //  Burn halves attack
    if (move.category == Category.Physical && user.status == Status.Burn) {
        //  Move Facade and Ability Guts
        if (!move.cancelBurnAttackDrop && !user.cancelBurnAttackDrop()) {
            modifier *= .5;
        }
    }
    modifier *= user.STAB(user, move, foe);
    //  Guts, Sniper
    //  Dry Skin (hurt), Thick Fat
    //  About half the viable hold items
    modifier *= user.damageMultiplier(user, move, foe, crit, eff);
    //  About half of the remaining viable hold items
    modifier *= foe.foeDamageMultiplier(user, move, foe, crit, eff);
    //  Spread moves damage everyone
    if (1 < field.activeMons && user.decision.targets.length > 1) {
        modifier *= 0.75;
    }
    if (field.weather.getDamageMultiplier) {
        modifier *= field.weather.getDamageMultiplier(user, move, foe);
    }
    var attack = user.getStat(Stat.Attack)
        * user.statMultiplier(Stat.Attack, move, foe);
    var defense = foe.getStat(Stat.Defense)
        * foe.statMutplier(Stat.Defense, user, move);
    var damage = calculateDamage(level, attack, defense, base, modifier);
    return {"damage":damage,"crit":crit,"typeeff":typeeff};
}

var moveSequence = function (user, move, foe, noreverse) {
    //  This is the case even if it fails
    user.thisturn.hasmoved = true;
    //  Flinches cancel move early
    if (user.thisturn.flinch && user.allowFlinching(move, foe)) {
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
        if (!user.skipChargeTurn(move, foe)
        ||  move.takeChargeTurn(user, foe) {
            return;
        }
    }
    //  Commit to move, even if it move misses or fails
    game.write(user.name() + " uses " + move.name + "!");
    user.dropPP(user.thisturn.decision.slot]);
    //  Preconditions must be met
    if (!move.preConditions(user, foe)) {
        game.write("But it fails!");
        return;
    }
    //  PROTECTION CHEK HERE
    //  Flash Fire, Lightningrod, Volt/Water Absorb, Wonderguard, Levitate
    //  Overcoat, Air Balloon, Soundproof
    if (foe.preventMove(user, move, foe)) {
        return;
    }
    //  Powder moves can't touch Overcoat, Safety Googles, Grass mons
    if (move.powder && !foe.allowSpore()) {
        game.write("But it fails!");
        return;
    }
    if (foe != user && !moveHit(user, move, foe)) {
        game.write(user.name() "'s attack missed!");
        move.onMiss(user, foe);
    }
    //  Multi-hit moves
    var numhits = move.getHitCount ? move.getHitCount(user, foe) : 1;
    for (var hit = 0; hit < numhits; hit++) {
        //  Side effects could have changed this between hits
        var ability = user.getAbility();
        //  Parental Bond
        var numhits2 = ability.getHitCount ? ability.getHitCount(move) : 1;
        for (var hit2 = 0; hit2 < numhits2; hit2++) {
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
                var damageinfo = damageCalc(user, move, foe, hit, hit2);
                var damage = damageinfo.damage;
                var crit = damageinfo.crit;
                var typeeff = damageinfo.typeeff;
                
                //  Self-damaging moves hurt the user first
                move.beforeDamage(user, foe);
                //  Critical hit!
                if (crit) {
                    game.write("<font color='yellow'>A critical hit!</font>");
                    //  Anger Point
                    user.onLandCrit(move, foe);
                    foe.onTakeCrit(user, move);
                }
                if (typeeff == 0) {
                    game.write("It doesn't affect " + foe.name());
                }
                else if (typeeff < 1) {
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
                foe.takeDirectDamage(user, move, damage);
                //  Allow the foe to faint the user before the faint check
                if (move.flags.contact) {
                    foe.onContacted(user, move);
                }
                //  Draining Moves
                if (move.drain) {
                    user.drain(damage * move.drain, foe);
                }
                //  Shell Bell
                user.afterDamage(damage);
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
                //  Life Orb
                user.takeRecoilEffect(foe, damage);
                //  User still might faint after the tiebreaker
                if (user.health == 0) {
                    user.onFaint();
                }
                //  Side effects
                //  Sheer Force
                if (!user.ability.noUserEffects) {
                    move.userEffects(user, foe);
                }
                //  Sheer Force, Shield Dust
                if (!user.ability.noUserFoeEffects
                ||  !foe.ability.noFoeEffects) {
                    move.foeEffects(user, foe);
                }
                //  Recharge. Things that are not added effects
                move.onSuccess(user, foe);
            }
        }
        if (move.onComplete) {
            move.onComplete();
        }
    }
}