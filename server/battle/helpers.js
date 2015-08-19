function coinflip(percent) {
    return Math.floor(Math.random() * 100) < percent;
}

function transform (user, foe) {
    //  Massive TODO
}

function stealItem(user, foe) {
    if (!user.item && foe.item && !foe.item.stickyhold
    &&  (!foe.item.mega 
    ||  foe.item.mega != foe.template.name)) {
            game.write(user.name() + " steals"
                + foe.name() + "'s " + user.item.name + "!");
            user.item = foe.item;
            foe.item = false;
        }
    }
}

function disable (user, foe) {
    var duration = 4 + Math.floor(Math.random() * 4);
    foe.nocopy.disable = [foe.nocopy.lastmove, disableduration(user)];
}

function rampage (user, move) {
    var duration = coinflip(50) ? 4 : 5;
    var a = user.getAbility();
    //  Unused
    if (a.rampageDuration) {
        duration = a.rampageDuration();
    }
    //  Unused
    var i = user.item;
    if (i && i.rampageDuration) {
        duration = i.rampageDuration();
    }
    user.temp.rampage = [duration, move];
}

function bind (user, foe, message) {
    var damage = foe.stats[Stat.HP] / 8;
    var a = user.getAbility();
    if (a.trapPower) {
        damage = a.trapPower(damage);
    }
    var i = user.item;
    if (i && i.trapPower) {
        damage = i.trapPower(damage);
    }
    foe.onResidualDamage(damage, message);
}

function bindduration(user, foe) {
    var a = user.getAbility();
    if (a.bindDuration) {
        return a.bindDuration();
    }
    var i = user.item;
    if (i && i.bindDuration) {
        return i.bindDuration();
    }
    return coinflip(50)?4:5;
}

function multihit(user) {
    if (user.ability.onMultiHitCount) {
        return user.ability.onMultiHitCount();
    }
    //  Unused but a potential usage
    var i = user.item;
    if (user.allowItem() && user.item.onMultiHitCount) {
        return user.item.onMultiHitCount();
    }
    switch (Math.floor(Math.random() * 6)) {
        case 0: case 1: return 2;
        case 2: case 3: return 3;
        case 4: return 4;
        case 5: return 5;
    }
}

function drain (from, amount, to, ratio, message) {
    var hp = from.drainHP(amount) * ratio;
    if (to.allowItem() && to.item.boostDrain) {
        hp *= to.item.boostDrain;
    }
    if (hp != 0) {
        return hp;
        hp < 0 ? to.onResidualDamage(hp) : to.onHeal(hp);
    }
}