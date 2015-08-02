//  Ranges [0, Odds)
var rand(odds) {
    return game.rand(0, odds);
}

var statusChance = function(target, odds, status) {
    if (rand(100) < odds) {
        target.onGetStatus(status);
    }
}

var leechseed = function(target) {
    target.leechseed = true;
}

var bind = function(target, move, numturns) {
    target.bind = {move : move.name, countdown : numturns};
}

var ohkoFailTest = function(user, target) {
    var difference = user.level - target.level;
    if (difference < 0) {
        return false;
    }
    return rand(100) < 30 + difference;
}

var MoveEvents = {
    Move["Karate Chop"].onCritMod = function(user, crit) {
        return crit + 1;
    },
    Move["Double Slap"].onMoveBegin = function(user) {
        user.onMultiHit();
        return true;
    },
    Move["Comet Punch"].onMoveBegin = function(user, target) {
        user.onMultiHit();
        return true;
    },
    Move["Fire Punch"].onSuccess = function(user, target) {
        statusChance(target, 10, "Burn");
    },
    Move["Ice Punch"].onSuccess = function(user, target) {
        statusChance(target, 10, "Freeze");
    },
    Move["Thunder Punch"].onSuccess = function(user, target) {
        statusChance(target, 10, "Paralyze");
    },
    Move["Guillotine"].onMoveBegin = function(user, target) {
        return ohkoFailTest(user, target);
    },
    Move["Guillotine"].onSuccess = function() {
        game.print("A One-Hit KO!");
    },
    Move["Razor Wind"].onCharge = function(user) {
        if (user.charging) {
            user.charging = false;
            return false;
        }
        else {
            game.print(user.name + " made a whirlwind!");
            user.charging = true;
            return true;
        }
    },
    Move["Swords Dance"].onSuccess = function(user) {
        user.onStatChange("Attack", 2);
    },
    Move["Gust"].onPowMod = function(user, target) {
        if (target.flying) {
            return this.power / 2;
        }
        return this.power;
    },
    Move["Gust"].onTestSemiInvulnerable = function(user, target) {
        if (target.flying || target.sky) {
            return true;
        }
        return false;
    },
    Move["Whirlwind"].onSuccess = function(user, target) {
        target.onPhaze();
    },
    Move["Fly"].onCharge = function(user) {
        if (user.charging) {
            user.charging = false;
            return false;
        }
        else {
            game.print(user.name + " flew up high!");
            user.charging = true;
            return true;
        }
    },
    Move["Bind"].onSuccess = function(user, target) {
        var duration = 4 + rand(2);
        target.bind = {
            move : "Bind",
            countdown : user.onBind(move, target)
        };
    },
    Move["Stomp"].onPowMod = function(user, target) {
        if (target.minimize) {
            return this.power * 2;
        }
        return this.power;
    },
    Move["Double Kick"].onMoveBegin = function(user) {
        user.numhits = 2;
    },
    Move["Jump Kick"].onMoveBegin = function() {
        if (field.gravity) {
            return false;
        }
    },
    Move["Jump Kick"].onMoveFail = function(user) {
        game.print(user.name + " kept going and crashed!");
        var damage = damagecalc(user, move, target, stats);
        hurt(user, damage / 8.0);
    }

};