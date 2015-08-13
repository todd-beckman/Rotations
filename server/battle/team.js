function Team (name, mons) {
    this.name = name;
    this.slots = mons;
    while (this.slots.length < 6) {
        this.slots.push(false);
    }
    this.moveeffects = [];
    this.thisturn = {};
    //  Copied to thisturn at the end turn
    this.nextturn = {};
}
Team.prototype.slotCountdown = function () {
    //  Future Sight, Doom Desire
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.slotCountdownAttack) {
            if (0 == --eff.duration) {
                eff.move.slotCountdownAttack(this, eff.slot, eff.user);
                this.moveeffects.splice(i--, 1);
            }
        }
    }
    //  Wish
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.slotCountdownHeal) {
            if (0 == --eff.duration) {
                eff.move.slotCountdownHeal(this, eff.slot, eff.user);
                this.moveeffects.splice(i--, 1);
            }
        }
    }
    //  Fire-Grass Pledge
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.slotGradualDamage) {
            eff.move.slotGradualDamage(this);
        }
    }
}
Team.prototype.countdown = function() {
    //  Reflect, Light Screen, Safeguard, Mist, Tailwind, Lucky Chant, Pledges
    for (var i = 0; i < this.moveeffects.length; i++) {
        var eff = this.moveeffects[i];
        if (eff.duration) {
            if (0 == --eff.duration) {
                eff.move.onCountdownFinish(this);
            }
        }
    }
}