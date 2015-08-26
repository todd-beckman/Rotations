function Mon() {}
Mon.prototype.consumeItem = function () {
    //  TODO: Animation flag
    this.item = ItemDex[0];
};

/*  Before__ events
Let e be the substring of the event that is about to take place

Returning false will cancel the event.
Active Events that are canceled consume the item.
*/
Mon.prototype.runBeforeEvent = function (e, move, source) {
    var name = "Before" + e;
    if (this.ability[name] != undefined
    &&  !this.ability[name](this, move, source)) {
        return false;
    }
    if (this.item["passive" + name] != undefined
    &&  !this.item["passive" + name](this, move, source)) {
        return false;
    }
    if (this.item["active" + name] != undefined
    &&  !this.item["active" + name](this, move, source)) {
        this.consumeItem();
        return false;
    }
    return true;
}


/*  Get__ events
Let e be the substring of the property being gotten:
HitCount, Duration, PriorityChange, etc.

Active Events returning anything but false consume the item.
*/
Mon.prototype.runGetEvent = function (e, move) {
    var name = "Get" + e;
    if (this.ability[name] != undefined) {
        var value = this.ability[name](this, move);
        if (value !== false) {
            return value;
        }
    }
    if (this.item["passive" + name] != undefined) {
        var value = this.item["passive" + name](this, move);
        if (value !== false) {
            return value;
        }
    }
    if (this.item["active" + name] != undefined) {
        var value = this.item["passive" + name](this, move);
        if (value !== false) {
            this.consumeItem();
            return value;
        }
    }
}

/*  Multiply___ events
Let e be the substring of the property being multiplied:
Attack, Defense, Speed, etc.

Active Events returning anything but 1 consume the item.
*/
Mon.prototype.runMultiplyEvent = function (e, move, source, target, typeeff, crit, hit, hit2) {
    var name = "Multiply" + e;
    var amount = 1;
    if (this.ability[name] != undefined) {
        amount *= this.ability[name](this, move, source, target, typeeff, crit, hit, hit2);
    }
    if (this.item["passive" + name] != undefined) {
        amount *= this.item["passive" + name](this, move, source, target, typeeff, crit, hit, hit2);
    }
    if (this.item["active" + name] != undefined) {
        var a = this.item["active" + name](this, move, source, target, typeeff, crit, hit, hit2);
        if (a != 1) {
            this.consumeItem();
            amount *= a;
        }
    }
    return amount;
};

/*  After__ events
Let e be the substring of the event that just took place:
Flinch, FoeMakeCOntact, DealDamage, etc.

Active Events returning true consume the item.
*/
Mon.prototype.runAfterEvent = function (e, move, source, target, damage) {
    var name = "After" + e;
    if (this.ability[name] == undefined
    ||  this.ability[name](this, move, source, target, damage)) {
        return;
    }
    if (this.item["passive" + name] == undefined
    ||  this.item["passive" + name](this, move, source, target, damage)) {
        return;
    }
    if (this.item["active" + name] != undefined) {
        if (this.item["active" + name](this, move, source, target, damage)) {
            this.consumeItem();
            return;
        }
    }
}



