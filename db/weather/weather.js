var type=require("type");

var weather = {
    current : 0,    //  Not to be called directly; use weather.flag()
    suppressed : 0, //  Number of weather-suppressing features on the field
    duration : 0,
    flag : function () {
        if (this.suppressed) {
            return 0;
        }
        return this.data[this.current].flag
    },
    set : function (to) {
        if (this.data[to].priority < this.data[this.current].priority) {
            game.write(this.PreventChangeMessage[this.current][game.language]);
        }
        else {
            this.current = to;
            game.write(this.BeginMessage[to][game.language]);
        }
    },
    MultiplyEvent : function (e, user, move, mtype) {
        var name = "Multiply" + e;
        if (this.data[this.current][name] !== undefined) {
            return this.data[this.current][name](user, move);
        }
        return 1;
    },
    EOT_WeatherDamage : function (user) {
        if (this.data[this.current].EOT_WeatherDamage !== undefined) {
            this.data[this.current].EOT_WeatherDamage(user);
        }
    },
    BeforeMoveUsed : function (user, move) {
        if (this.data[this.current].BeforeMoveUsed !== undefined) {
            if (!this.data[this.current].BeforeMoveUsed(user, move)) {
                game.write(this.PreventMoveMessage[this.current][game.language]);
                return false;
            }
        }
        return true;
    },
    GetTypeEffectiveness : function (user, move, mtype) {
        if (this.data[this.current].GetTypeEffectiveness !== undefined) {
            return this.data[this.current]
                .GetTypeEffectiveness(user, move, mtype);
        }
        return false;
    },
    data = [
    {   //  None
        flag : 0,
        priority : 0
    },
    {   //  Rain
        flag : 1,
        priority : 0,
        MultiplyPower : function (user, move, mtype) {
            if (mtype == 9) {
                return 0.5;
            }
            if (mtype == 10) {
                return 1.5;
            }
            return 1;
        }
    },
    {   //  Sun
        flag : 2,
        priority : 0,
        MultiplyPower : function (user, move, mtype) {
            if (mtype == 9) {
                return 1.5;
            }
            if (mtype == 10) {
                return 0.5;
            }
            return 1;
        }
    },
    {   //  Sand
        flag : 3,
        priority : 0,
        MultiplySpecialDefense : function (user) {
            if (user.hasType(4)
            ||  user.hasType(5)
            ||  user.hasType(8)) {
                return 1.5;
            }
            return 1;
        }
        EOT_WeatherDamage : function (user) {
            if (user.hasType(4)
            ||  user.hasType(5)
            ||  user.hasType(8)
            ||  !user.runBeforeEvent("SandDamage")) {
                user.takeResidualDamage(user.stats[0] / 16,
                    user.name() + this.DamageMessage[3][game.language]);
            }
            return 1;
        }
    },
    {   //  Hail
        flag : 4,
        priority : 0,
        EOT_WeatherDamage : function (user) {
            if (user.hasType(4)
            ||  user.hasType(5)
            ||  user.hasType(8)
            ||  !user.runBeforeEvent("HailDamage")) {
                user.takeResidualDamage(user.stats[0] / 16,
                    user.name() + this.DamageMessage[4][game.language]);
            }
            return 1;
        }
    },
    {   //  Heavy rain
        flag : 1,
        priority : 1,
        BeforeMoveUsed : function (user, move, mtype) {
            return mtype != 9;
        },
        MultiplyPower : function (user, move, mtype) {
            if (mtype == 10) {
                return 1.5;
            }
            return 1;
        }
    },
    {   //  Harsh Sun
        flag : 2,
        priority : 1,
        BeforeMoveUsed : function (user, move, mtype) {
            return mtype != 10;
        },
        MultiplyPower : function (user, move, mtype) {
            if (mtype == 9) {
                return 1.5;
            }
            return 1;
        }
    },
    {   //  Strong Wind
        flag : 5,
        priority : 1,
        GetTypeEffectiveness : function (user, move, source, target, mtype) {
            //  Neutralize weaknesses to Flying
            if (type.effectiveness[mtype][2] == 4) {
                return 1;
            }
            return false;
        }
    },
    Conditions = {
        "None" : 0,
        "Rain" : 1,
        "Sun" : 2,
        "Sand" : 3,
        "Hail" : 4,
        "Heavy Rain" : 5,
        "Harsh Sun" : 6,
        "Strong Wind" : 7
    };
    //  TODO
    Display:[
        ["None"],
        ["Rain"],
        ["Sun"],
        ["Sand"],
        ["Hail"],
        ["Heavy Rain"],
        ["Harsh Sun"],
        ["Strong Wind"]
    ];
    //  TODO
    StartMessage:[
        [],
        ["It started to rain!"],
        ["The sunlight turned harsh!"],
        ["A sandstorm kicked up!"],
        ["It started to hail!"],
        ["A heavy rain began to fall!"],
        ["The sunlight turned extremely harsh!"],
        ["A mysterious air current is protecting Flying Pokémon!"]
    ];
    //  TODO
    ContinueMessage:[
        [],
        ["Rain continues to fail."],
        ["The sunlight is strong."],
        ["The sandstorm rages."],
        ["Hail continues to fall."],
        ["The heavy rain persists."],
        ["The extremely harsh sunlight persists."],
        ["The mysterious air current persists."]
    ];
    //  TODO =
    EndMessage:[
        [],
        ["The rain stopped."],
        ["The sunlight faded."],
        ["The sandstorm subsided."],
        ["The hail stopped."],
        ["The heavy rain is lifted."],
        ["The harsh sunlight faded."],
        ["The mysterious air current dissipated."]
    ];
    //  TODO
    DamageMessage:[
        [],[],[],
        [" is buffeted by the sand."],
        [" is buffeted by the hail."],
        [],[],[]
    ];
    //  TODO
    PreventMoveMessage:[
        [],[],[],[],[],
        ["The Fire-type attack fizzled out in the heavy rain!"],
        ["The Water-type attack evaporated in the harsh sunlight!"],
        []
    ];
    //  TODO
    PreventChangeMesage = [
        [],[],[],[],[],
        ["There is no relief from this heavy rain!"],
        ["The extremely harsh sunlight was not lessened at all!"],
        ["The mysterious air current blows regardless."]
    ];
];

module.exports = weather;
