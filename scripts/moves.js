function endTurn(user) {
    user.numhits = 1;
    user.hasMoved = true;
    user.helpinghand = false;
    user.flinching = false;
    user.kingshield = false;
    user.protecting = false;
}

function useMove(user, move, target) {
    //  Can't move if flinching
    if (user.flinching) {
        //  Allow the user to evade flinching
        if (user.onMonFlinch()) {
            game.print(user.name + " flinched!");
            return;
        }
    }
    //
    if (user.taunted && move.category == "Status"){
        game.print(user.name + " can't use " + move.name + " after the Taunt.");
        move.onMoveFail(user, target);
        return;
    }
    //  Can't move if in the sky
    if (user.sky) {
        game.print(user.name + " can't move!");
        return;
    }
    //  Wait to charge
    if (move.onCharge(user)) {
        return;
    }
    print(user.name + " used " + move.name + "!");
    //  One-time call involving move failure
    if (!move.onMoveBegin(user, target)) {
        move.onMoveFail(user, target);
        return;
    }
    //  Move fails if target is protecting
    if (target.protecting) {
        if (!move.onHitProtect(user, target)) {
            move.onMoveFail(user, target);
            return;
        }
    }
    //  Check if the user is attempting to protect
    //  TODO: fails if all other mons have moved
    //  Also fails if all foes switch out
    if (user.protecting) {
        //  Successful protects apply counter
        if (move.onProtect(user, target)) {
            user.protect++;
        }
        //  Failed protects reset counter and fail the move
        else {
            user.protect = 0;
            move.onMoveFail(user, target);
            return;
        }
    }
    //  Non-protecting moves reset counter
    else {
        user.protect = 0;
    }
    var accuracy = move.accuracy;
    //  <1 accuracy always hits
    if (0 < accuracy) {
        game.
        move.onMoveFail(user, target);
    }
    if (move.category == "Status") {
        move.onSuccess(user, target);
    }
    else {
        //  Stat changes that only last for this turn
        var boosts = {
            atk : move.onAtkMod(user, user.boosts.atk, target);
            def : move.onDefMod(user, user.boosts.def, target);
            spatk : move.onSpAtkMod(user, user.boosts.spatk, target);
            spdef : move.onSpDefMod(user, user.boosts.spdef, target);
            crit : move.onCritMod(user, user.boosts.crit, target);
            eva : move.onEvaMod(user, user.boosts.eva, target);
            acc : move.onAccMod(user, user.boosts.acc, target);
        };
        var pow = move.onPowMod(user, target);
        //  Multi-hits require this loop
        var i;
        var damage = damagecalc(user, move, target, stats, pow);
        for (i = 1; i <= numhits; i++) {
            target.hurt(damage);
            //  Aftereffects of success activate
            move.onSuccess(user, target, damage);
            //  Make contact
            if (move.contact) {
                //  Move makes contact
                move.onContact(user, target);
                user.onTouch(move, target);
                target.onTouched(user, move);
                //  The user fainted on contact
                if (user.hpleft == 0) {
                    user.onFaint();
                    break;
                }
            }
            //  The foe has fainted to this attack
            if (target.hpleft == 0) {
                target.onFaint();
                break;
            }
            //  The user fainted while using this attack
            if (user.hpleft == 0) {
                user.onFaint();
                break;
            }
        }
        if (numhits != 1) {
            game.showMoveCount(i);
        }
    }
}
