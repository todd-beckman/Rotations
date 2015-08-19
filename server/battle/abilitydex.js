var showAbility = function (ability) {
    //  TODO
}

var Abilitydex = [
{name:"Suppressed",desc:"Has no effect."},
{name:"Stench",desc:"May cause flinching.",
    getFlinchOdds : function (user, move, foe) {
        if (move.category != Category.Status) {
            return 10;
        }
    }
},
{name:"Drizzle",desc:"Begins a rainstorm.",
    onSendOut : function (user) {
        showAbility(this);
        field.trySetWeather(Weather.Rain, user);
    }
},
{name:"Speed Boost",desc:"Raises Speed every turn.",
    passiveEndOfTurn : function (user) {
        showAbility(this);
        user.onStatChange(Stat.Speed, 1);
    }
},
{name:"Battle Armor",desc:"Protects the user from Critical Hits",
    noCrits : 1
},
{name:"Sturdy",desc:"Survives 1-hit KO attacks.",
    letLive : function (mon) {
        if (mon.health == mon.stats[Stat.HP]) {
            showAbility(this);
            return true;
        }
        return false;
    }
},
{name:"Damp",desc:"Prevents self-destructing.",
    globalAllowSelfDestruct : function () {
        return false;
    }
},
{name:"Limber",desc:"Protects the user from Paralysis.",
    allowGetStatus : function (user, status, foe) {
        if (status == Status.Paralysis) {
            showAbility(this);
            return false;
        }
        return true;
    }
},
{name:"Sand Veil",desc:"Raises the user's Evasion in the sand.",
    allowSandDamage : function () {return false},
    getStatBoost : function (user, stat) {
        if (stat == Stat.Evasion) {
            return 1;
        }
        return 0;
    }
},
{name:"Static",desc:"Paralyzes foes that contact the user.",
    onContacted : function (user, move, foe) {
        if (rand(100) < 30) {
            showAbility(this);
            user.getStatus(Status.Paralysis, foe);
        }
    }
},
{name:"Volt Absorb",desc:"Heals when targeted with electricity.",
    preventMove : function (user, move, foe) {
        if (move.type == Type.Electric) {
            showAbility(this);
            game.write(foe.name() + " absorbs the attack.");
            if (foe.health < foe.stats[Stat.HP]) {
                foe.onHeal(foe.stats[Stat.HP] / 4);
            }
            return true;
        }
        return false;
    }
},
{name:"Water Absorb",desc:"Heals when targeted with water.",
    preventMove : function (user, move, foe) {
        if (move.type == Type.Water) {
            showAbility(this);
            game.write(foe.name() + " absorbs the attack.");
            if (foe.health < foe.stats[Stat.HP]) {
                foe.onHeal(foe.stats[Stat.HP] / 4);
            }
            return true;
        }
        return false;
    }
},
{name:"Oblivious",desc:"Prevents infatuation.",
    allowInfatution : function () {
        showAbility(this);
        return false;
    }
},
{name:"Cloud Nine",desc:"Suppresses weather conditions.",
    onSendOut : function (user) {
        showAbility(this);
        game.write("Effects of the weather disappeared.");
        field.weathersuppressed += 1;
        field.onWeatherSuppressed();
    },
    onRetreat : function (user) {
        field.weathersuppressed -= 1;
    },
    onFaint : function (user) {
        field.weathersuppressed -= 1;
    },
    onSuppressed : function (user) {
        field.weathersuppressed -= 1;
    }
},
{name:"Compound Eyes",desc:"Increases the user's Accuracy.",
    getStatBoost : function (user, stat) {
        if (stat == Stat.Accuracy) {
            return 1;
        }
        return 0;
    }
},
{name:"Insomnia",desc:"Protects the user from Sleep.",
    allowGetStatus : function (user, status) {
        if (status == Status.Sleep) {
            showAbility(this);
            return false;
        }
        return true;
    }
},
{name:"Color Change",desc:"User's type becomes the moves that target it.",
    onDirectDamage : function (user, move, foe, damage) {
        showAbility(this);
        game.write(foe.name() + " becomes " + Type[move.type] + "-type!");
        foe.types = [move.type, Type["???"]];
    }
},
{name:"Immunity",desc:"Protects the user from Poison.",
    allowGetStatus : function (user, status) {
        if (status == Status.Poison || status == Status.BadPoison) {
            showAbility(this);
            return false;
        }
        return true;
    }
},
{name:"Flash Fire",desc:"Powers up Fire-type moves when hit by one.",
    preventMove : function (user, move, foe) {
        if (move.type == Type.Fire) {
            showAbility(this);
            if (foe.temp.flashfire) {
                game.write(foe.name() + " is unaffected.");
            }
            else {
                game.write("The power of " + foe.name() + "'s Fire-type moves rises!");
                foe.temp.flashfire = 1;
            }
            return true;
        }
        return false;
    },
    powerMultiplier : function (user, move) {
        if (move.type == Type.Fire && user.temp.flashfire) {
            return 1.5;
        }
        return 1;
    }
},
{name:"Shield Dust",desc:"Protects the user from added effects of moves.",
    noFoeEffects : true
},
{name:"Own Tempo",desc:"Protects the user from Confusion.",
    allowConfusion : function () {
        showAbility(this);
        return false;
    }
},
{name:"Suction Cups",desc:"Protects the user from being forced out.",
    allowPhasing : function () {
        showAbility(this);
        return false;
    }
},
{name:"Intimidate",desc:"Lowers opposing Pokemon's Attack.",
    onSendOut : function (user) {
        showAbility(this);
        for (var i = 0; i < field.monsBySpeed.length; i++) {
            var mon = field.monsBySpeed[i];
            if (mon.team != user.team) {
                mon.changeStat(Stat.Attack, user);
            }
        }
    }
},
{name:"Shadow Tag",desc:"Prevents escape from Ghosts.",
    globalAllowSwitching : function (mon) {
        if (mon.ability == this || !mon.hasType(Type.Ghost)) {
            return false;
        }
        if (mon.item.evadetrap) {
            return true;
        }
        return 'continue';
    }
},
{name:"Rough Skin",desc:"Hurts foes that make contact with the user.",
    onContacted : function (user, move, foe) {
        showAbility(this);
        user.takeResidualDamage(user.stats[Stat.HP] / 8);
    }
},
{name:"Wonder Guard",desc:"Only super-effective attacks hit the user.",
    preventMove : function (user, move, foe) {
        if (typeEffectiveness (user, move, foe) < 2) {
            showAbility(this);
            return true;
        }
        return false;
    }
},
{name:"Levitate",desc:"Protects the user from Ground-based moves.",
    //  Custom type effectivness: usingType says whether it is changed
    //  typetable returns the actual result
    usingType : function (type) {
        return type == Type.Ground;
    },
    typetable : function (off, def) {
        return 0;
    }
},
{name:"Effect Spore",desc:"May Paralyze, Poison, or put to Sleep on contact.",
    onContacted : function (user, move, foe) {
        if (user.allowSpore() && user.status == Status.Healthy) {
            var eff = rand(100);
            if (rand < 9) {
                showAbility(this);
                user.getStatus(Status.Poison, foe);
            }
            else if (rand < 19) {
                showAbility(this);
                user.getStatus(Status.Paralysis, foe);
            }
            else if (rand < 30) {
                showAbility(this);
                user.getStatus(Status.Sleep, foe);
            }
        }
    }
},
{name:"Synchronize",desc:"Passes status afflictions to their sources.",
    onGetStatus : function (affected, status, source) {
        //  Only works if there was a source and source is healthy
        if (source && source.status == Status.Healthy) {
            showAbility(this);
            source.getStatus(status);
        }
    }
},
{name:"Clear Body",desc:"Protects the user from stat drops.",
    changeStatChange : function (stat, change) {
        if (change < 0) {
            showAbility(this);
            return 0;
        }
        return change;
    }
},
{name:"Natural Cure",desc:"Heals the user's status when switching.",
    onRetreat : function (mon) {
        showAbilit(this);
        mon.status = Status.Healthy;
    }
},
{name:"Lightning Rod",desc:"Draws in electricity and raises Special Attack when it does.",
    //  Mon has the ability while foe may or may not be mon
    changeTarget : function (mon, user, move, foe) {
        if (move.type == Type.Electric) {
            return mon;
        }
    },
    preventMove : function (user, move, foe) {
        if (move.type == Type.Electric) {
            showAbility(this);
            foe.changeStat(Stat["Special Attack"], 1);
            return true;
        }
        return false;
    }
},
{name:"Serene Grace",desc:"Improves chances of added effects.",
    improveLuck : 2
},
{name:"Swift Swim",desc:"Raises Speed in the Rian.",
    statMultiplier : function (stat) {
        if (stat == Stat.Speed && field.weather.getFlag() == "Rain") {
            return 2;
        }
        return 1;
    }
},
{name:"Chlorophyll",desc:"Raises Speed in the Sun.",
    statMultiplier : function (stat) {
        if (stat == Stat.Speed && field.weather.getFlag() == "Sun") {
            return 2;
        }
        return 1;
    }
},
{name:"Illuminate",desc:"Attracts wild Pokemon."},
{name:"Trace",desc:"Copies the foe's ability.",
    onSendOut : function (mon) {
        showAbility(this);
        var foe = mon.team.opposing.slot[mon.slot()];
        if (foe == 'empty') {
            foe = mon.team.opposing.slot[0];
        }
        showAbility(foe.ability);
        mon.ability = foe.ability;
        game.write(mon.name() + " copies " + mon.ability.name + "!");
    }
},
{name:"Huge Power",desc:"Doubles the user's Attack.",
    statMultiplier : function (stat) {
        if (stat == Stat.Attack) {
            return 2;
        }
        return 1;
    }
},
{name:"Poison Point",desc:"Poisons foes that contact the user.",
    onContacted : function (user, move, foe) {
        if (user.status != Status.Healthy
        &&  rand(10) < 3) {
            showAbility(this);
            user.getStatus(Status.Poison, foe);
        }
    }
},
{name:"Inner Focus",desc:"Protects the user from Flinching.",
    noflinching : true
},
{name:"Magma Armor",desc:"Protects the user from Freezing.",
    allowGetStatus : function (status) {
        if (status == Status.Freeze) {
            showAbility(this);
            return false;
        }
        return true;
    }
},
{name:"Water Veil",desc:"Protects the user from Burns.",
    allowGetStatus : function (status) {
        if (status == Status.Burn) {
            showAbility(this);
            return false;
        }
        return true;
    }
},
{name:"Magnet Pull",desc:"Prevents Steel-type Pokemon from escaping.",
    globalAllowSwitching : function (mon) {
        if (mon.hasType(Type.Steel)) {
            return false;
        }
        return 'continue';
    }
},
{name:"Soundproof",desc:"Protects the user from sound-based moves.",
    preventMove : function (user, move, foe) {
        if (move.flags.sound) {
            showAbility(this);
            return true;
        }
        return false;
    }
},
{name:"Rain Dish",desc:"Restores the user's HP in the Rain.",
    weatherEffect : function (user) {
        if (weather.getFlag() == "Rain") {
            if (user.allowHeal()) {
                showAbility(this);
                user.onHeal(user.stats[Stat.HP] / 16);
            }
            return true;
        }
        return false;
    }
},
{name:"Sand Stream",desc:"Begins a sandstorm.",
    onSendOut : function (user) {
        showAbility(this);
        field.trySetWeather(Weather.Sand, user);
    },
    onWeatherEffect : function () {
        return field.weather.getFlag() == "Sand";
    }
},
{name:"Pressure",desc:"Doubles PP usage of foes.",},
{name:"Thick Fat",desc:"Gives the user resistence to Fire and Ice.",
    foeDamageMultiplier : function (user, move) {
        if (move.type == Type.Fire || move.type == Type.Ice) {
            return 0.5;
        }
        return 1;
    }
},
{name:"Early Bird",desc:"Wakes the user up early.",
    getSleepDuration : function (mon, duration) {
        return Math.floor(duration / 2);
    }
},
{name:"Flame Body",desc:"Burns foes that contact the user.",
    onContacted : function (user, move, foe) {
        if (user.status != Status.Healthy
        &&  rand(10) < 3) {
            showAbility(this);
            user.getStatus(Status.Burn, foe);
        }
    }
},
{name:"Run Away",desc:"Allows the user to escape traps.",
    runaway : true
},
{name:"Keen Eye",desc:"Protects the user from Accuracy drops.",
    changeStatChange : function (stat, change, user) {
        if (stat == Stat.Accuracy) {
            showAbility(this);
            return 0;
        }
        return change;
    }
},
{name:"Hyper Cutter",desc:"Protects the user from Attack drops.",
    changeStatChange : function (stat, change, user) {
        if (stat == Stat.Attack) {
            showAbility(this);
            return 0;
        }
        return change;
    }
},
{name:"Pickup",desc:"User finds sometimes dropped items.",
    passiveEndOfTurn : function (user) {
        if (!user.item && field.droppeditems.length != 0) {
            showAbility(this);
            var i = rand(field.droppeditems.length);
            user.item = field.droppeditems[i];
            field.droppeditems.splice(i, 1);
            game.write(user.name() +" picks up one " + user.item.name() + ".");
        }
    }
},
{name:"Truant",desc:"The user only moves half of the time.",
    preventMove : function (user) {
        if (user.thisturn.truant) {
            showAbility(this);
            game.write(user.name() + " is loafing around.");
            return true;
        }
        user.nextturn.truant = true;
        return false;
    }
},
{name:"Hustle",desc:"Raises Attack but lowers Accuracy",
    statMultiplier : function (stat, move) {
        if (stat == Stat.Attack) {
            return 1.5;
        }
        if (stat == Stat.Accuracy && move.category == Category.Physical) {
            return 0.8;
        }
        return 1;
    }
},
{name:"Cute Charm",desc:"May infatuate foes on contact.",
    onContacted : function (user, move, foe) {
        if (user.getInfatuated(foe)) {
            showAbility(this);
        }
    }
},
{name:"Plus",desc:"",inbattle:""},
{name:"Minus",desc:"",inbattle:""},
{name:"Forecast",desc:"Transforms with the weather.",
    onSendOut : function (user) {
        if (user.template.name == "Castform") {
            switch (field.weather.getFlag()) {
                case "None":
                    user.revertForm();
                    return;
                case "Sun":
                    user.changeForm("Sunny");
                    return;
                case "Rain":
                    user.changeForm("Rainy");
                    return;
                case "Hail":
                    user.changeForm("Snowy");
                    return;
            }
        }
    },
    onWeatherChange : function (user) {
        if (user.template.name == "Castform") {
            switch (field.weather.getFlag()) {
                case "None":
                    user.revertForm();
                    return;
                case "Sun":
                    user.changeForm("Sunny");
                    return;
                case "Rain":
                    user.changeForm("Rainy");
                    return;
                case "Hail":
                    user.changeForm("Snowy");
                    return;
            }
        }
    },
    onWeatherSuppressed : function (user) {
        user.revertForm();
    }
},
{name:"Sticky Hold",desc:"The user's item cannot be removed",
    sticky : true
},
{name:"Shed Skin",desc:"May restore the user's status.",
    statusRestore : function (user) {
        if (user.status != Status.Healthy
        &&  rand(10) < 3) {
            showAbility(this);
            user.status = Status.Healthy;
            game.write(user.name() + " is cured of its status!");
        }
    }
},
{name:"Guts",desc:"Raises Attack when the user has a status affliction.",
    cancelBurnAttackDrop : true,
    damageMultiplier : function (user) {
        if (user.status != Status.Healthy) {
            return 1.5;
        }
        return 1;
    }
},
{name:"Marvel Scale",desc:"Raises Defense when the user has a status affliction.",
    statMultiplier : function(stat, user) {
        if (stat == Stat.Defense && user.status != Status.Healthy) {
            return 1.5;
        }
        return 1;
    }
},
{name:"Liquid Ooze",desc:"Hurts foes that drain the user's health.",
    foeDrainHP : function (amount) {
        showAbility(this);
        return -amount;
    }
},
{name:"Overgrow",desc:"Powers up Grass-type moves in a pinch.",
    powerMultiplier : function (user, move) {
        if (move.type == Type.Grass
        &&  user.health <= user.stats[Stat.HP] / 3) {
            return 1.5;
        }
        return 1;
    }
},
{name:"Blaze",desc:"Powers up Fire-type moves in a pinch.",
    powerMultiplier : function (user, move) {
        if (move.type == Type.Fire
        &&  user.health <= user.stats[Stat.HP] / 3) {
            return 1.5;
        }
        return 1;
    }
},
{name:"Torrent",desc:"Powers up Water-type moves in a pinch.",
    powerMultiplier : function (user, move) {
        if (move.type == Type.Water
        &&  user.health <= user.stats[Stat.HP] / 3) {
            return 1.5;
        }
        return 1;
    }
},
{name:"Swarm",desc:"Powers up Bug-type moves in a pinch.",
    powerMultiplier : function (user, move) {
        if (move.type == Type.Bug
        &&  user.health <= user.stats[Stat.HP] / 3) {
            return 1.5;
        }
        return 1;
    }
},
{name:"Rock Head",desc:"Protects the user from recoil damage.",
    takeRecoilDamage : function (amount) {
        return 0;
    }
},
{name:"Drought",desc:"Begins harsh sunlight.",
    onSendOut : function (user) {
        showAbility(this);
        field.trySetWeather(Weather.Sun, user);
    }
},
{name:"Arena Trap",desc:"Prevents grounded Pokemon from fleeing.",
    globalAllowSwitching : function (mon) {
        if (mon.ability == this || !mon.hasType(Type.Ground)) {
            return false;
        }
        if (mon.item.evadetrap) {
            return true;
        }
        return 'continue';
    }
},
{name:"Vital Spirit",desc:"Protects the user from Sleep.",
    allowGetStatus : function (status) {
        if (status == Status.Sleep) {
            showAbility(this);
            return false;
        }
        return true;
    }
},
{name:"White Smoke",desc:"Protects the user from stat drops.",
    changeStatChange : function(stat, change) {
        if (change < 0) {
            showAbility(this);
            return 0;
        }
        return change;
    }
},
{name:"Pure Power",desc:"Raises the user's Attack.",
    statMultiplier : function (stat) {
        if (stat == Stat.Attack) {
            return 2;
        }
        return 1;
    }
},
{name:"Shell Armor",desc:"Protects the user from Critical Hits.",
    noCrits : 1
},
{name:"Air Lock",desc:"Suppresses weather conditions.",
    onSendOut : function (user) {
        showAbility(this);
        game.write("Effects of the weather disappeared.");
        field.weathersuppressed += 1;
    },
    onRetreat : function (user) {
        field.weathersuppressed -= 1;
    },
    onFaint : function (user) {
        field.weathersuppressed -= 1;
    },
    onSuppressed : function (user) {
        field.weathersuppressed -= 1;
    }
},
{name:"Tangled Feet",desc:"Raises Evasion if confused.",
    statMultiplier : function (stat, user) {
        if (stat == Stat.Evasion
        &&  user.temp.confused) {
            return 1.2;
        }
        return 1;
    }
},
{name:"Motor Drive",desc:"Raises Speed if hit by Electricity.",
    onDirectDamage : function (user, move) {
        if (move.type == Type.Electric) {
            user.changeStat(Stat.Speed, 1);
        }
    }
},
{name:"Rivalry",desc:"Raises power of moves against the same gender.",
    powerMultiplier : function (user, move, foe) {
        if (user.gender != Gender.Neutral && foe.gender != Gender.Neutral
        &&  user.gender != foe.gender) {
            return 1.25;
        }
        return .75;
    }
},
{name:"Steadfast",desc:"Raises Speed upon flinching.",
    onFlinch : function (user) {
        user.changeStat(Stat.Speed, 1);
    }
},
{name:"Snow Cloak",desc:"Raises Evasion in the Hail.",
    statMultiplier : function (stat) {
        if (stat == Stat.Evasion && field.weather.getFlag() == "Hail") {
            return 1.25;
        }
        return 1;
    },
    onWeatherEffect : function () {
        return field.weather.getFlag() == "Hail";
    }
},
{name:"Gluttony",desc:"The user may eat its berry early.",
    gluttony : true
},
{name:"Anger Point",desc:"Maximizes attack when hit by a Critical hit.",
    onTakeCrit : function (user, move, foe) {
        foe.statChange(Stat.Attack, 12);
    }
},
{name:"Unburden",desc:"Raises Speed when consuming its held item.",
    onConsumeItem : function (user) {x
        user.temp.unburden = true;
    },
    statMultiplier : function (stat) {
        if (stat == Stat.Speed) {
            return 2;
        }
        return 1;
    }
},
{name:"Heatproof",desc:"Gives the user resistance to Fire.",
    foePowerMultiplier : function (user, move) {
        if (move.type == Type.Fire) {
            return 0.5;
        }
        return 1;
    }
},
{name:"Simple",desc:"Stat changes are more drastic.",
    globalStatChange : function (stat, change, user) {
        return change * 2;
    }
},
{name:"Dry Skin",desc:"Heals around Water but hurts around Fire.",
    onWeatherEffect : function (user) {
        switch (field.weather.getFlag()) {
            case "Rain":
                if (user.health < user.stats[Stat.HP]) {
                    showAbility();
                    user.onHeal(user.stats[Stat.HP] / 8);
                }
                return true;
            case "Sun":
                showAbility();
                user.takeResidualDamage(user.stats[Stat.HP] / 8,
                    user.name() + " is hurt by Dry Skin.");
                return true;
        }
        return false;
    }
},
{name:"Download",desc:"Boosts the stat the foe is weaker to.",inbattle:""},
{name:"Iron Fist",desc:"Boosts the power of punching moves.",
    powerMultiplier : function (user, move) {
        if (move.flags.fist) {
            return 1.2;
        }
        return 1;
    }
},
{name:"Poison Heal",desc:"Heals the user if poisoned.",
    onStatusDamage : function (user) {
        if (user.status == Status.BadPoison || user.status == Status.Poison) {
            if (user.health < user.stats[Stat.HP]) {
                showAbility();
                user.onHeal(user.stats[Stat.HP] / 8);
            }
            return true;
        }
        return false;
    }
},
{name:"Adaptability",desc:"Boosts attacks of the user's type.",
    STAB : function () {
        return 0.5;
    }
},
{name:"Skill Link",desc:"Multi-hit attacks strike maximally.",inbattle:"",
    getMultiHitCount : function () {
        return 5;
    }
},
{name:"Hydration",desc:"Heals status afflictions in the Rain.",
    statusRestore : function (user) {
        if (user.status != Status.Healthy
        &&  field.weather.getFlag() == "Rain") {
            showAbility(this);
            user.status = Status.Healthy;
            game.write(user.name() + " is cured of its status!");
        }
    }
},
{name:"Solar Power",desc:"Boosts Special Attack but hurts the user in the Sun.",
    statMultiplier : function (stat, user) {
        if (stat == Stat.SpecialAttack && field.weather.getFlag() == "Sun") {
            return 1.5;
        }
        return 1;
    },
    onWeatherEffect : function (user) {
        if (field.weather.getFlag() == "Sun") {
            showAbility(this);
            user.takeResidualDamage(user.stats[Stat.HP] / 8,
                user.name() + " is hurt by Solar Power.");
            return true;
        }
        return false;
    }
},
{name:"Quick Feet",desc:"Boosts Speed if the user has a status affliction.",
    cancelParalyzeSpeedDrop : true,
    statMultiplier : function (stat, user) {
        if (stat == Stat.Speed && user.status != Status.Healthy) {
            return 1.5;
        }
        return 1;
    }
},
{name:"Normalize",desc:"All moves are Normal-type.",inbattle:""},
{name:"Sniper",desc:"Powers up Critical Hits.",
    critModifier : function () {
        return 1.5;
    }
},
{name:"Magic Guard",desc:"The user cannot be hurt except by attacks.",
    takeResidualDamage : function () { return 0; }
    takeRecoilDamage : function () { return 0; }
    foeDrainHP : function () { return 0; }
},
{name:"No Guard",desc:"Attacks of the user and foe always land.",inbattle:""},
{name:"Stall",desc:"The user moves slower.",
    changeInPriorityBracket : function () {
        return -10;
    }
},
{name:"Technician",desc:"Boosts the power of weaker moves.",
    powerMultiplier : function (user, move, foe, hit, hit2, power) {
        //  Must use effective power as this may have changed from documented
        if (power <= 60) {
            return 1.5;
        }
        return 1;
    }
},
{name:"Leaf Guard",desc:"Protects the user from Status in the Sun.",
    allowGetStatus : function () {
        return field.weather.getFlag() == "Sun";
    }
},
{name:"Klutz",desc:"User can't use held items.",
    noitem : true
},
{name:"Mold Breaker",desc:"Abilities cannot stop the user.",
    evadeAbility : true;
},
{name:"Super Luck",desc:"Raises the user's Critical Hit ratio.",
    getStage : function (stat) {
        if (stat == Stat.Critical) {
            return 1;
        }
        return 0;
    }
},
{name:"Aftermath",desc:"Hurts the Pokemon that faints the user.",
    onFaint : function (source) {
        if (source) {
            if (source.ability.noselfdestruct) {
                return;
            }
            showAbility(this);
            source.takeResidualDamage()
        }
    }
},
{name:"Anticipation",desc:"Senses the foe's super-effective moves.",
    onSendOut : function (user) {
        for (var i = 0; i < field.monsBySpeed.length; i++) {
            var mon = field.monsBySpeed[i];
            if (mon.team != user.team) {
                for (var i = 0; i < mon.moves.length; i++) {
                    var move = Movedex[mon.moves[i]];
                    if (1 < typeEffectiveness(move, user)) {
                        showAbility(this);
                        game.write(user.name() + " shudders.");
                    }
                }
            }
        }
    }
},
{name:"Forewarn",desc:"Determines the moves known by the foe.",
    onSendOut : function (user) {
        var slot = user.slot();
        for (var i = 0; i < field.teams.length; i++) {
            var team = field.teams[i];
            if (user.team != team) {
                var mon = team.slots[slot];
                if (mon == 'empty') {
                    mon = team.slots[0];
                }
                showAbility(this);
                game.write(user.name() + "'s Forewarn alerted of " + mon.name() + "'s " + Movedex[mon.moves[0]].name + ".");
            }
        }
    }
},
{name:"Unaware",desc:"Ignores the foe's stat changes.",
    ignoreFoeBoost : function () {
        return true;
    }
},
{name:"Tinted Lens",desc:"Powers up not-very-effective moves.",
    powerMultipier : function (user, move, foe) {
        if (typeEffectiveness(move.type, foe) < 1) {
            return 2;
        }
        return 1;
    }
},
{name:"Filter",desc:"Powers down super-effective moves.",
    foePowerMultiplier : function (user, move, foe) {
        if (1 < typeEffectiveness(move.type, foe)) {
            return .75;
        }
        return 1;
    }
},
{name:"Slow Start",desc:"The user's Attack and Speed are halved at first.",
    onSendOut : function (user) {
        user.temp.slowstart = 5;
    },
    statMultipier : function (stat, user) {
        if (user.temp.slowstart
        &&  (stat == Stat.Attack || stat == Stat.Speed)) {
            return 0.5;
        }
        return 1;
    },
    endOfTurnChange : function (user) {
        if (user.temp.slowstart) {
            if (!(--user.temp.slowstart)) {
                showAbility(this);
                game.write(user.name() + " gets its act together!");
            }
        }
    }
},
{name:"Scrappy",desc:"Ignores Ghost's immunities.",
    //  Custom type effectivness: usingType says whether it is changed
    //  typetable returns the actual result
    usingType : function (type) {
        return type == Type.Normal || type == Type.Ghost;
    },
    table : [//Ghost is here -v-
        [2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [4, 2, 1, 1, 2, 4, 1, 1, 4, 2, 2, 2, 2, 1, 4, 2, 4, 1, 2]
    ],
    typetable : function (off, def) {
        return this.table[off,def];
    }
},
{name:"Storm Drain",desc:"Draws in Water and raises Special Attack when it does.",
    //  Mon has the ability while foe may or may not be mon
    changeTarget : function (mon, user, move, foe) {
        if (move.type == Type.Water) {
            return mon;
        }
    },
    preventMove : function (user, move, foe) {
        if (move.type == Type.Water) {
            showAbility(this);
            foe.changeStat(Stat["Special Attack"], 1);
            return true;
        }
        return false;
    }
},
{name:"Ice Body",desc:"Heals the user in the Hail.",
    onWeatherEffect : function (user) {
        if (field.weather.getFlag() == "Hail") {
            if (user.health < user.stats[Stat.HP]) {
                showAbility();
                user.onHeal(user.stats[Stat.HP] / 16);
            }
            return true;
        }
        return false;
    }
},
{name:"Solid Rock",desc:"Powers down super-effective moves.",
    foePowerMultiplier : function (user, move, foe) {
        if (1 < typeEffectiveness(move.type, foe)) {
            return .75;
        }
        return 1;
    }
},
{name:"Snow Warning",desc:"Begins a hailstorm.",
    onSendOut : function (user) {
        showAbility(this);
        field.trySetWeather(Weather.Hail, user);
    }
},
{name:"Honey Gather",desc:"May gather Honey."},
{name:"Frisk",desc:"Checks the foe's item.",
    onSendOut : function (user) {
        showAbility(this);
        for (var i = 0; i < field.monsBySpeed.length; i++) {
            var mon = field.monsBySpeed[i];
            if (mon.team != user.team && mon.item.name != "No Item") {
                game.write(user.name() + " frisked " + mon.name() + " and found one " + mon.item.name);
            }
        }
    }    
},
{name:"Reckless",desc:"Powers up moves that cause recoil.",
    powerMultiplier : function (user, move, foe) {
        if (move.recoil || move.recoilDamage
        ||  user.allowItem() && user.item.checkRecoil) {
            return 1.2;
        }
        return 1;
    }
},
{name:"Multitype",desc:"Changes the user's Type to match its Plate.",
    onSendOut : function (user) {
        if (user.template.name == "Arceus" && user.item.plate) {
            switch (user.item.name) {
            case "Insect Plate": user.changeForm("Bug"); break;
            case "Dread Plate": user.changeForm("Dark"); break;
            case "Draco Plate": user.changeForm("Dragon"); break;
            case "Zap Plate": user.changeForm("Electric"); break;
            case "Pixie Plate": user.changeForm("Fairy"); break;
            case "Fist Plate": user.changeForm("Fighting"); break;
            case "Flame Plate": user.changeForm("Fire"); break;
            case "Sky Plate": user.changeForm("Flying"); break;
            case "Spooky Plate": user.changeForm("Ghost"); break;
            case "Meadow Plate": user.changeForm("Grass"); break;
            case "Earth Plate": user.changeForm("Ground"); break;
            case "Icicle Plate": user.changeForm("Ice"); break;
            case "Toxic Plate": user.changeForm("Poison"); break;
            case "Mind Plate": user.changeForm("Psychic"); break;
            case "Stone Plate": user.changeForm("Rock"); break;
            case "Iron Plate": user.changeForm("Steel"); break;
            case "Splash Plate": user.changeForm("Water"); break;
            }
        }
    },
    allowLoseItem : function (user) {
        if (user.item.plate) {
            showAbility();
            return false;
        }
        return true;
    },
    allowSuppressAbility : function () {
        return false;
    }
},
{name:"Flower Gift",desc:"Boosts the party's Attack and Special Defense in the sun.",inbattle:"%u changes form!"},
{name:"Bad Dreams",desc:"Hurts sleeping foes.",
    passiveEndOfTurn : function (user) {
        var showed = false;
        for (var i = 0; i < field.monsBySpeed.length; i++) {
            var mon = field.monsBySpeed[i];
            if (mon.team != user.team && mon.status == Status.Sleep) {
                //  Only show it once.
                if (!showed) {
                    showAbility(this);
                    showed = true;
                }
                mon.takeResidualDamage(mon.stats[Stat.HP] / 8,
                    mon.name() + " is having bad dreams.");
            }
        }
    }
},
{name:"Pickpocket",desc:"May steal the foe's item on contact.",
    onContacted : function (user, move, foe) {
        //  Because undefined and false in Javascript are a mess
        if (user.allowLoseItem() && foe.item.name == "No Name") {}
        else {
            
        }
    }
},
{name:"Sheer Force",desc:"Ignores added effects of moves to boost their power.",inbattle:""},
{name:"Contrary",desc:"Reverses stat changes.",inbattle:""},
{name:"Unnerve",desc:"Prevents foes from eating berries.",inbattle:"%u's unnerve makes its foes nervous."},
{name:"Defiant",desc:"Sharply raises Attack upon having a stat dropped.",inbattle:""},
{name:"Defeatist",desc:"Halves Attack and Special Attack when HP gets low.",inbattle:""},
{name:"Cursed Body",desc:"May disable the foe's move.",inbattle:"%u's Cursed Body disables %f's %m."},
{name:"Healer",desc:"May cure allies' status afflictions.",inbattle:""},
{name:"Friend Guard",desc:"Decreases damage inflicted by allies.",inbattle:""},
{name:"Weak Armor",desc:"Raises Speed and lowers Defense when hit.",inbattle:""},
{name:"Heavy Metal",desc:"Makes the user heavier.",inbattle:""},
{name:"Light Metal",desc:"Makes the user lighter.",inbattle:""},
{name:"Multiscale",desc:"Weakens damage taken from full health.",inbattle:""},
{name:"Toxic Boost",desc:"Raises Attack when Poisoned.",inbattle:""},
{name:"Flare Boost",desc:"Raises Special Attack when Burned.",inbattle:""},
{name:"Harvest",desc:"The user may gather used berries.",inbattle:"%u harvested one %i."},
{name:"Telepathy",desc:"Protects the user from friendly damage.",inbattle:""},
{name:"Moody",desc:"Lowers one stat and sharply raises another every turn.",inbattle:""},
{name:"Overcoat",desc:"Protects the user from Powder moves.",inbattle:"%u is unaffected."},
{name:"Poison Touch",desc:"May poison foes it touches.",inbattle:""},
{name:"Regenerator",desc:"Heals the user when switching out.",inbattle:""},
{name:"Big Pecks",desc:"Protects the user from Defense drops.",inbattle:"%u's Defense is not lowered."},
{name:"Sand Rush",desc:"Boosts Speed in the sand.",inbattle:""},
{name:"Wonder Skin",desc:"May evade moves that cause status afflictions.",inbattle:""},
{name:"Analytic",desc:"Powers up moves when moving last.",inbattle:""},
{name:"Illusion",desc:"The user appears to be another Pokemon.",inbattle:""},
{name:"Imposter",desc:"The user transforms into its foe.",inbattle:""},
{name:"Infiltrator",desc:"Ignores substitutes.",inbattle:""},
{name:"Mummy",desc:"Changes the foe's ability to Mummy on contact.",inbattle:""},
{name:"Moxie",desc:"Raises Attack when landing a knock out.",inbattle:""},
{name:"Justified",desc:"Raises Attack when hit by a Dark-type move.",inbattle:""},
{name:"Rattled",desc:"Raises Speed when hit by a Dark- or Bug-type move.",inbattle:""},
{name:"Magic Bounce",desc:"Reflects Status moves.",inbattle:""},
{name:"Sap Sipper",desc:"Draws in Grass and raises Attack when it does.",inbattle:""},
{name:"Prankster",desc:"Gives priority to Status moves.",inbattle:""},
{name:"Sand Force",desc:"Raises Attack in a Sandstorm.",inbattle:""},
{name:"Iron Barbs",desc:"Hurts foes on contact.",inbattle:"%u is hurt by Iron Barbs"},
{name:"Zen Mode",desc:"Changes from when health is low.",inbattle:""},
{name:"Victory Star",desc:"Increases Accuracy of allies.",inbattle:""},
{name:"Turboblaze",desc:"Abilities cannot stop the user.",inbattle:""},
{name:"Teravolt",desc:"Abilities cannot stop the user.",inbattle:""},
{name:"Aroma Veil",desc:"Protects users from move-limiting attacks.",inbattle:""},
{name:"Flower Veil",desc:"Protects Grass-type Pokemon from stat drops.",inbattle:"%u's Flower Veil prevents the stat drop."},
{name:"Cheek Pouch",desc:"Restores HP when eating a berry.",inbattle:""},
{name:"Protean",desc:"Changes the user's type to match its attack.",inbattle:"%u became %t-type."},
{name:"Fur Coat",desc:"Raises Defense.",inbattle:""},
{name:"Magician",desc:"May steal the foe's item.",inbattle:"%u stole %f's %i."},
{name:"Bulletproof",desc:"Protects from Bullets, Balls, and Bombs.",inbattle:"%u is unaffected."},
{name:"Competitive",desc:"Sharply raises Special Attack upon having a stat dropped.",inbattle:""},
{name:"Strong Jaw",desc:"Boosts the power of biting moves.",inbattle:""},
{name:"Refrigerate",desc:"Turns Normal moves into Ice and powers them up.",inbattle:""},
{name:"Sweet Veil",desc:"Protects its team from Sleep.",inbattle:"%u is protected from Sleep."},
{name:"Stance Change",desc:"Changes the user's form based on its moves.",inbattle:"%u changes into its %f form."},
{name:"Gale Wings",desc:"Gives priority to Flying-type moves.",inbattle:""},
{name:"Mega Launcher",desc:"Powers up Pulse moves.",inbattle:""},
{name:"Grass Pelt",desc:"Boosts Defense in Grassy Terrain.",inbattle:""},
{name:"Symbiosis",desc:"May pass its item to an ally.",inbattle:"%u gaves its item to %f."},
{name:"Tough Claws",desc:"Powers up contact moves.",inbattle:""},
{name:"Pixilate",desc:"Turns Normal moves into Fairy and powers them up.",inbattle:""},
{name:"Gooey",desc:"Slows down foes that make contact.",inbattle:""},
{name:"Aerilate",desc:"Turns Normal moves into Flying and powers them up.",inbattle:""},
{name:"Parental Bond",desc:"The user moves twice per turn.",inbattle:""},
{name:"Dark Aura",desc:"Boosts the power of Dark moves.",inbattle:"%u emits a Dark Aura."},
{name:"Fairy Aura",desc:"Boosts the power of Fairy moves.",inbattle:"%u emits a Fairy Aura."},
{name:"Aura Break",desc:"Reverses the effects of other Auras.",inbattle:"%u reverses all auras."},
{name:"Primordial Sea",desc:"Overrides all weather and causes harsh rain."},
{name:"Desolate Land",desc:"Overrides all weather and causes intense sun."},
{name:"Delta Stream",desc:"Overrides all weather and gives resistence to Flying Pokemon."}
];