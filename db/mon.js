
function Mon(id,team,ot,nick,nature,ivs,evs,ability,item,personality,formid) {
  //  Settle on the mon
  this.id = id;
  this.formid = (formid == undefined) ? 0 : formid;
  if (formid) {
    this.template = Pokedex[POKEDEX_FORM_START + formid];
  }
  else {
    this.template = Pokedex[id];
  }

  if (-1 == this.template.abilities.indexOf(ability)) {
    this.ability = AbilityDex[0];
  }
  else {
    this.ability = AbilityDex[ability];
  }
  this.item = ItemDex[item];
  if (!this.item.held) {
    this.item = ItemDex[0];
  }
  this.nature = nature < 0 || 24 < nature ? 0 : nature;

  //  TODO: Check these are legal
  this.evs = evs;
  this.ivs = ivs;
  this.stats = [
    calcUnmodifiedStat(this, 0),
    calcUnmodifiedStat(this, 1),
    calcUnmodifiedStat(this, 2),
    calcUnmodifiedStat(this, 3),
    calcUnmodifiedStat(this, 4),
    calcUnmodifiedStat(this, 5)
  ];
  this.gender = getGender(id, personality);
  this.shiny = (
    ot.id XOR ot.secret XOR personality >> 16 XOR personality
  ) < 8;
  this.team = team;
  this.nick = nick;
  this.health = this.stats[0];
  this.status = 0;
  this.nextturn = {};
}
Mon.prototype.turnStart = function () {
  this.thisturn = this.nextturn;
  this.nextturn = {};
}
Mon.prototype.sendOut = function (passing) {
  //  TODO: Animation flag
  //  Things that are passed by Baton Pass
  this.passable = (passing != undefined)
    ? passing
  : {
    boosts : [0, 0, 0, 0, 0, 0, 0, 0, 0],
    block : [], //  list of things preventing escape
    confused : false,
    slotdrain : false,  //  leech seed
    noability : false,
    noitem : false,
    noheal : false,
    substitute : false, //  HP of the user
    //  The rest of these are placeholders
    //  They do not need engine support
    //  Just a list of things that are passable
    lockon : false,
    powertrick : false,
    magnetrise : false,
    ingrain : false,
    aquaring : false,
    curse : false,
    stockpile : 0
  };
  //  Things that are not passed by Baton Pass
  this.temp = {
    infatuated : false,
    trapping : [],    //  partial trapping
    types : this.template.types,
    name : game.allowNicks ? nick : this.template.name[game.language];
  };
};


//  DATA FUNCTIONS
Mon.prototype.name = function () {
  return this.temp.name;
};
Mon.prototype.hasType = function (type) {
  return -1 < this.temp.types.indexOf(type);
};



//  ACTION FUNCTIONS

//  points must be an integer
Mon.prototype.hurt = function (points) {
  //  TODO: Animation flag
  this.health -= points;
  if (this.health == 0) {
    this.status = faint;
  }
};
Mon.prototype.takeDirectDamage = function (move, source, target, points) {
  points = Math.floor(points);
  if (this.health <= points) {
    points = this.health;
    if (!this.cancelEvent("LoseLastHP", move, source, target, points)) {
      points = this.health - 1;
    }
  }
  if (this.status != 7) {
    source.runAfterEvent("DealDamage", move, source, target, points);
    this.runAfterEvent("TakeDamage", move, source, target, points);
  }
  return points;
};
Mon.prototype.takeResidualDamage = function (points, message) {
  points = Math.floor(points);
  if (this.health < points) {
    points = this.health;
  }
  if (!this.cancelEvent("TakeResidualDamage")) {
    return;
  }
  game.write(message);
  return this.hurt(points);
};
//  points must be an integer
Mon.prototype.heal = function (points) {
  //  TODO: Animation flag
  this.health += points;
};
Mon.prototype.restore = function (points) {
  points = Math.floor(points);
  if (this.stats[0] < this.health + points) {
    points = this.stats[0] - this.health;
  }
  if (!this.cancelEvent("Heal", points)) {
    return;
  }
  this.heal(points);
};
Mon.prototype.consumeItem = function () {
  //  TODO: Animation flag
  this.item = ItemDex[0];
};
Mon.prototype.healDrainDamage=function(move,mtype,source,target,points,message){
  points = Math.floor(points);
  if (this.stats[0] < this.health + points) {
    points = this.stats[0] - this.health;
  }
  if (!this.cancelEvent("Heal", points)) {
    return;
  }
  if (message == undefined) {
    this.temp.message = this.name() + HealMessage[game.language];
  }
  else {
    this.temp.message = message;
  }
  points *= source.runMultiplyEvent("Drain", move, mtype, source, target);
  points *= target.runMultiplyEvent("FoeDrain", move, mtype, source, target);
  points = Math.floor(points);
  if (points == 0) {
    return;
  }
  game.write(this.temp.message);
  if (points < 0) {
    points *= -1;
    if (this.health < points) {
      points = this.health;
    }
    this.hurt(points);
  }
  if (this.stats[0] < this.health + points) {
    points = this.stats[0] - this.health;
  }
  this.heal(points);
};
Mon.prototype.gradualHeal = function (points, message) {
  points = Math.floor(points);
  if (this.stats[0] < this.health + points) {
    points = this.stats[0] - this.health;
  }
  if (!this.cancelEvent("Heal", points)) {
    return;
  }
  game.write(message);

}

/*  Before__ events
Let e be the substring of the event that is about to take place

Returning false will cancel the event.
Active Events that are canceled consume the item.
*/
Mon.prototype.cancelEvent = function (e, move, source, mtype, typeeff) {
  var name = "Before" + e;
  if (!this.passable.noability && this.ability[name] != undefined
  &&  !this.ability[name](this, move, source, type, typeeff)) {
    return false;
  }
  if (!this.passable.noability) {
    if (this.item["passive" + name] != undefined
    &&  !this.item["passive" + name](this, move, source, mtype, typeeff)) {
      return false;
    }
    if (this.item["active" + name] != undefined
    &&  !this.item["active" + name](this, move, source, mtype, typeeff)) {
      this.consumeItem();
      return false;
    }
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
  if (!this.passable.noability && this.ability[name] != undefined) {
    var value = this.ability[name](this, move);
    if (value !== false) {
      return value;
    }
  }
  if (!this.passable.noability) {
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
  return false;
}

/*  Multiply___ events
Let e be the substring of the property being multiplied:
Attack, Defense, Speed, etc.

Active Events returning anything but 1 consume the item.
*/
Mon.prototype.runMultiplyEvent = function (e,move,mtype,source,target,typeeff,crit,hit,hit2) {
  var name = "Multiply" + e;
  var amount = 1;
  if (!this.passable.noability && this.ability[name] != undefined) {
    amount*=this.ability[name](this,move,mtype,source,target,typeeff,crit,hit,hit2);
  }
  if (!this.passable.noability) {
    if (this.item["passive" + name] != undefined) {
      amount*=this.item["passive"+name](this,move,mtype,source,target,typeeff,crit,hit,hit2);
    }
    if (this.item["active" + name] != undefined) {
      var a=this.item["active"+name](this,move,mtype,source,target,typeeff,crit,hit,hit2);
      if (a != 1) {
        this.consumeItem();
        amount *= a;
      }
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
  if (!this.passable.noability && this.ability[name] == undefined
  ||  this.ability[name](this, move, source, target, damage)) {
    return;
  }
  if (!this.passable.noability) {
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
}

/*  EOT__ events
Let e be the substring of the event that just took place:
WeatherDamage, StatusDamage, GradualHeal, etc.

Active Events returning false consume the item.
*/
Mon.prototype.runAfterEvent = function (e, move, source, target, damage) {
  var name = "EOT_" + e;
  if (!this.passable.noability && this.ability[name] == undefined
  ||  false === this.ability[name](this, move, source, target, damage)) {
    return false;
  }
  if (!this.passable.noability) {
    if (this.item["passive" + name] == undefined
    ||  false===this.item["passive"+name](this, move, source, target, damage)) {
      return false;
    }
    if (this.item["active" + name] != undefined) {
      if (false===this.item["active"+name](this,move,source,target,damage)) {
        this.consumeItem();
        return false;
      }
    }
  }
  return true;
}
