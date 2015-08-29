var PRIORITY = {
    "FORFEIT":13,
    "ITEM":12,
    "PURSUIT":11,
    "SWITCHING":10,
    "ROTATION":9,
    "MEGA":8
};

var runDecision = function (decision) {
    switch (decision.action) {
        case PRIORITY.FORFEIT:
            game.playerlose(decision.user.team);
            break;
        case PRIORITY.ITEM:
            //  Even if client manages to request item usage
            //  server-side should still enforce this
            //  to prevent client hacking from allowing this
            if (!game.mode.allowitems) {
                return;
            }
            //  Prevent use of unobtained items on server-side
            //  because client hacking is a thing
            if (user.team.bag[decision.item] < 1) {
                return;
            }
            ItemDex[decision.item].use(user, decision.target);
            user.team.bag[decision.item]--;
            break;
        case PRIORITY.SWITCHING:
            var user = decision.user
            var team = user.team;
            var from = team.active.indexOf(user);
            //  Make sure it is still active before switching
            if (from != -1) {
                team.inhand.push(user);
                team.active[from] = team.inhand[decision.target];
                team.inhand.splice(decision.target, 1);
                var mon = team.active[from];
                mon.slot = from;
                mon.on("sendOut", []);
            }
            break;
        case PRIORITY.ROTATION:
            team.rotate(decision.slot, decision.user.slot);
            break;
        case PRIORITY.MEGA:
            //  Prevent multiple mega on server-side
            //  because client hacking is a thing
            if (user.team.mega) {
                return;
            }
            var item = ItemDex[decision.item];
            if (user.template.name = item.mega.from) {
                user.template
            }
            break;
    }
}

var orderDecisions = function (decisions) {
    var sorted = [];
    function swap(i1, i2) {
        var temp = sorted[i1];
        sorted[i1] = sorted[i2];
        sorted[i2] = temp;
    }
    //  Builds sorted array as it is constructed
    function insert(decision) {
        sorted.push(decision);
        var i = 0;
        while (i < sorted.length - 1
            &&  sorted[i].priority > sorted[i + 1].priority) {
            swap(i, i + 1);
        }
    }
    for (var i = 0; i < decisions.length; i++) {
        var d = decisions[0];
        switch (d.priority) {
            case PRIORITY.FORFEIT:
            case PRIORITY.ITEM:
            case PRIORITY.SWITCH:
                insert(d);
                break;
            default:
                //  bump is one of -.1, 0, .1
                var bump += decision.user.get("bump");
                if (decision.rotate) {
                    insert(RotateDecision(user, bump,
                        decision.rotate));
                }
                if (decision.mega) {
                    insert(MegaDecision(user, bump));
                }
                decision.priority += bump +
                    //  these are +-1 priority changes
                    decision.user.get("Priority");
                insert(decision);
                break;
        }
    }
    //  Break n-way ties
    for (var i = 0; i < sorted.length - 1; i++) {
        if (sorted[i].priority == sorted[i + 1].priority) {
            var j = i + 1;
            //  Find the size of the tie region
            while (j + 1 < sorted.length
            &&  sorted[i].priority == sorted[j + 1].priority) {
                j++;
            }
            //  save how far to skip
            var skip = j;
            //  shuffle region of array
            while (i < j){
                swap(i + Math.floor(rand() * j), j--);
            }
            //  this is the last checked place
            //  i++ is run after this during the for loop
            i = skip;
        }
    }
    return sorted;
};

function Decision (user, priority, action) {
    this.user = user;
    this.priority = priority;
    this.action = action;
};
var ForfeitDecision = function (user) {
    return new Decision(user, PRIORITY.FORFEIT, PRIORITY.FORFEIT);
};
var ItemDecision = function (user, item, target) {
    var decision = new Decision(user, PRIORITY.ITEM, PRIORITY.ITEM);
    decision.item = item;
    decision.target = target;
    return decision;
};
var SwitchDecision = function (user, to) {
    var decision = new Decision(user, PRIORITY.SWITCH, PRIORITY.SWITCH);
    decision.to = slot;
    return decision;
};
var MoveDecision = function (user, move, targets, rotate, mega) {
    var decision = new Decision(user, move.priority, 0);
    decision.move = move;
    //  targets is an array of team-slot tuples
    //  not a list of Pokémon
    decision.targets = targets;
    decision.rotate = rotate;
    decision.mega = mega;
    decision.action = 0;
    return decision;
}

//  Called internally; refrain from calling these outside of this file.
var RotateDecision = function (user, bump, direction) {
    var decision = new Decision(user, PRIORITY.ROTATE + bump, PRIORITY.ROTATE);
    decision.direction = direction;
    return decision;
};
var MegaDecision = function (user, bump) {
    return new Decision(user, PRIORITY.MEGA + bump, PRIORITY.MEGA);
};

