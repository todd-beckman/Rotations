//  Ranges [0, Odds)
var rand(odds) {
    return game.rand(0, odds);
}

var statusChance = function(target, odds, status) {
    if (rand(100) < odds) {
        target.onGetStatus(status);
    }
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
    "Karate Chop" : {
        onCritMod : function(user, crit) {
            return crit + 1;
        }
    },
    "Double Slap" : {
        onMoveBegin : function(user) {
            user.onMultiHit();
            return true;
        }
    },
    "Comet Punch" : {
        onMoveBegin : function(user, target) {
            user.onMultiHit();
            return true;
        }
    },
    "Fire Punch" : {
        onSuccess : function(user, target) {
            statusChance(target, 10, "Burn");
        }
    },
    "Ice Punch" : {
        onSuccess : function(user, target) {
            statusChance(target, 10, "Freeze");
        }
    },
    "Thunder Punch" : {
        onSuccess : function(user, target) {
            statusChance(target, 10, "Paralyze");
        }
    },
    "Guillotine" : {
        onMoveBegin : function(user, target) {
            return ohkoFailTest(user, target);
        },
        onPowModified : function () {
            return ;
        },
        onSuccess : function() {
            game.print("A One-Hit KO!");
        }
    }
    "Razor Wind" : {
        onCharge : function(user) {
            if (user.charging) {
                user.charging = false;
                return false;
            }
            else {
                game.print(user.name + " made a whirlwind!");
                user.charging = true;
                return true;
            }
        }
    },
    "Swords Dance" : {
        onSuccess : function(user) {
            user.onStatChange("Attack", 2);
        }
    },
    "Gust" : {
        onPowMod : function(user, target) {
            if (target.flying) {
                return this.power / 2;
            }
            return this.power;
        },
        onTestSemiInvulnerable = function(user, target) {
            if (target.flying || target.sky) {
                return true;
            }
            return false;
        }
    },
    "Whirlwind" : {
        onSuccess : function(user, target) {
            target.onPhaze();
        }
    },
    "Fly" : {
        onCharge : function(user) {
            if (user.charging) {
                user.charging = false;
                return false;
            }
            else {
                game.print(user.name + " flew up high!");
                user.charging = true;
                return true;
            }
        }
    },
    "Bind" : {
        onSuccess : function(user, target) {
            var duration = 4 + rand(2);
            target.bind = {
                move : "Bind",
                countdown : user.onBind(move, target)
            };
        }
    },
    "Stomp" : {
        onPowMod : function(user, target) {
            if (target.minimize) {
                return this.power * 2;
            }
            return this.power;
        }
    },
    "Double Kick" : {
        onMoveBegin : function(user) {
            user.numhits = 2;
        }
    },
    "Jump Kick" : {
        isAllowed : function() {
            return !field.gravity;
        },
        onFail : function(user) {
            game.print(user.name + " kept going and crashed!");
            var damage = damagecalc(user, move, target, stats);
            hurt(user, damage / 8.0);
        }
    }
};