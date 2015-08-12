/*
Mon event list
int onDrainHP (from, to, amount);   //  returns amount of HP taken
void onResidualDamage(amount);

EOT- End of Turn
7- EOT_onGradualRecover
8- EOT_onGradualDrain
    move
9- EOT_onStatusDamage
    ability
10- EOT_onBindCountdown
    move
11- EOT_onVolatileCountdown
    move

*/

var build = {
    id:0,       //  ID handles alt forms
    nick:"",    //  empty string for no nick
    item:0,     //  id
    level:100,
    ability:0,  //  0, 1, 2 index from the template's ability.
    nature:0,   //  id
    gender:0,   //  id
    ivs:[31, 31, 31, 31, 31, 31],
    evs:[85, 85, 85, 85, 85, 85],
    moves:[0, 0, 0, 0], //  ids
    friendship:255; //  Frustrators can go fuck themselves
};

function Poke(team, build) {
    this.team = team;
    this.template = Pokedex[build.id];
    this.build = build;
    this.stats = [0, 0, 0, 0, 0, 0];
    this.health = 0;
    this.item = Item[build.item];
    this.ability = Ability[this.template[build.ability]];
    this.moves = build.moves;
    this.pp = [];
    this.status = 0;
    this.statuscounter = 0; //  sleep and toxic
    for (var i = 0; i < this.moves.length; i++) {
        this.pp[i] = Movedex[this.moves[i]].pp;
    }
    //  Only define these when necessary
    //mega : false,
    //statuscounter : 0,//  counter for Sleep and Toxic
    this.nocopy = {
        //  Only define these when necessary
        //  Things that can change temporarily
        //  but are not copied by baton pass
        //ability : 0,
        //types : [],
        lastmove : -1;  //  move slot,
        //disable : [slot, duration]
        //flying : 0,
        //digging : 0,
        //diving:0,
        //charging : 0,
    };
    this.temp = {
        boosts : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        //  Only define these when necessary
        //   Other flags and counters
        //confuse : 0,      //  counter
        //attract : mon,    //  slot?
        //minimize : false,
        //healblock : 0,
        //rage : 0,
        //rampage : 0,  //duration
        //rollout : 0,
        //bide : [countdown, damage, lastmon]
        //types: [],
        //substitute: 0;//hp
        slotcountdown : [],
        gradualdrain : [],
        gradualdamage : [],
        trapping : [],
        countdown : []
    };
    this.thisturn = {
        //recharge : false;
        decision : {
            fight:true; //  switch is false
            //move : 0,   //  Move slot
            //mega:false;
            //rotate:false;
            mon : 0,    //  target or switch slot
        },
        damage: {
            //physical:0,
            //special:0,
            lastattacker:mon
        }
    };
    this.nextturn = {};
}
Poke.prototype.slot = function () {
    return this.field.slots.indexOf(this);
}
Poke.prototype.name = function () {
    //  Overridden by some things
    //  but that is for later
    return this.build.nick;
}
Poke.prototype.getAbility = function () {
    if (this.nocopy.ability) {
        return this.nocopy.ability;
    }
}

//  HP

//  Returns amount healed
Poke.prototype.onHeal = function (amount) {
    //  can't heal
    if (this.stats[0] == this.health
    ||  this.countdown.healblock) {
        return 0;
    }
    //  heal more than possible
    if (this.stats[0] < amount + this.health) {
        amount = this.stats[0] - this.health;
    }
    this.health += amount;
    game.write(this.name() + " restored health.");
    return amount;
}
//  Returns amount hurt
Poke.prototype.onHurt = function (amount) {
    //  hurt more than possible
    if (this.health - amount < 0) {
        amount = this.health;
    }
    this.health -= amount;
    return amount;
}
//  Returns amount drained
//  Negative values possible with Liquid Ooze
Poke.prototype.onDrainHP = function (amount) {
    //  TODO
}
//  Direct damage only
Poke.prototype.onDamage = function (foe, move, amount) {
    amount = this.onHurt(amount);
    if (this.temp.bide) {
        this.temp.bide.damage += amount;
        this.temp.bide.target = foe
    }
    if (this.temp.rage) {
        this.temp.rage++;
        game.write(this.name() + "'s Rage is building!");
    }
    this.thisturn.damage[Category[move.category]] += amount;
    this.thisturn.damage.lastmon = foe;
}
//  Indirect Damage
Poke.prototype.onResidualDamage = function (amount, message) {
    var a = this.getAbility();
    if (a.onResidualDamage) {
        amount = a.onResidualDamage(amount);
    }
    var i = this.item;
    if (i && i.onResidualDamage) {
        amount = i.onResidualDamage(amount);
    }
    if (amount != 0) {
        game.write(message);
        this.hurt(amount);
    }
}

//  Stats

Poke.prototype.onStatChange = function (stat, change, user, noredirect) {

}