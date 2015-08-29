var queryFromHand = function() {
    //  TODO - have the user pick a mon from hand
    //  returns integer slot from hand
};
var queryEmpySlot = function (options) {
    //  TODO - have the user pick between empty active slots
    //  returns integer slot
}


function Team (name, mons, bag) {
    this.name = name;
    //  Item list; should be empty in all competitive formats
    this.bag = bag;
    for (var i = 0; i < mons.length; i++) {
        mons[i].team = this;
    }
    //  Not on the field
    this.inhand = mons;
    //  Targettable; affected by field
    this.active = [];
    //  On field but not active (rotated out)
    this.bench = [];
    //  Produced on the fly. Effects can handle this
    moveeffects = {};
    events = {};
}
//  key is used for referral to the event later
//  in case it needs to be addressed. Constant time.
Team.prototype.addEvent = function (e, fun, key) {
    if (events[e] == undefined) {
        events[e] = [];
    }
    events[e].push({'key':key,'run':fun});
};
//  Remove by key. Linear time.
Team.prototype.removeEvent = function (e, key) {
    if (events[e] == undefined) {
        return;
    }
    for (var i = 0; i < events[e].length; i++) {
        if (events[e].key == key) {
            events[e].splice(i, 1);
            return;
        }
    }
}
//  Run an uncancelable event. Linear time.
Team.prototype.on = function (e, parameters) {
    if (events[e] != undefined) {
        for (var i = 0; i < events[e].length; i++) {
            events[e][i].run.apply(this, parameters);
        }
    }
};
//  Enforces as many active slots as possible by first
//  trying to pull them from hand, and if that fails,
//  by pulling from the bench in order.
Team.prototype.populateField = function () {
    var needed = [];
    for (var i = 0; i < this.active.length; i++) {
        if (this.active[i] == false) {
            needed.push(i);
        }
    }
    //  Go backwards because the array gets spliced
    for (var i = needed.length - 1; -1 < i; i--) {
        if (0 < this.inhand.length) {
            var slot = queryFromHand();
            //  Query the slot only if there are options
            var to = needed.length == 1
                ? needed[0]
                : queryEmptySlot(needed);
            var mon = this.inhand[slot];
            //  Take it out of the hand
            this.inhand.splice(slot, 1);
            //  Send it out
            this.sendOut(mon, tp);
        }
        else if (this.bench.length != 0
        &&  this.bench[0]) {
            var mon = this.bench.slot[0];
            this.bench.splice(0, 1);
            this.sendOut(mon, i);
            resolved = true;
        }
        //  Resolution won't work on the rest of the spots
        //  if it didn't work for this one.
        else {
            break;
        }
    }
};
//  Send out mon to active[slot]
Team.prototype.sendOut = function (mon, slot) {
    this.active[slot] = mon;
    mon.on("sendOut", []);
};
//  Swap an active mon with a benched mon.
Team.prototype.rotate = function (from, to) {
    this.bench.push(this.active[to]);
    this.active[to] = this.bench[from];
    this.active[to].slot = to;
    //  Unused but provides potential fan content
    this.active[to].on("rotate", []);
    this.bench.splice(from, 1);
};
Team.prototype.hasLost = function () {
    return this.active.length + this.bench.length + this.inhand.length == 0;
};