

var field = {
    teams : [],
    monsOnField : 2,    //  per team
    activeMons : 2,     //  per team
    moveeffects : [],
    droppeditems : [],
    weatherduration : 0,
    trySetWeather : function (weather, user) {
        if (this.weather.allowWeatherChange == undefined
        ||  this.weather.allowWeatherChange(weather)) {
            var duration = user.getWeatherDuration(weather);
            this.weather = weather;
            this.weatherduration = duration;
        }
    },
    onWeatherCountdown : function () {
        if (this.weather.type == Weather.None) {
            return;
        }
        this.weather.duration--;
        if (this.weather.duration == 0) {
            this.weather.type = Weather.None;
            switch (this.weather.type) {
                case Weather.Rain:
                    game.write("The rain stopped.");
                    break;
                case Weather.HeavyRain:
                    game.write();
                    break;
                case Weather.Sun:
                    game.write("The sunlight faded.");
                    break;
                case Weather.Sand:
                    game.write("The sandstorm subsided.");
                    break;
                case Weather.Hail:
                    game.write("The hail subsided.");
                    break;
            }
        }
        else {
            switch (this.weather.type) {
                case Weather.Rain:
                    game.write("Rain continues to fall.");
                    break;
                case Weather.Sun:
                    game.write("The sunlight is strong.");
                    break;
                case Weather.Sand:
                    game.write("The sandstorm rages.");
                    break;
                case Weather.Hail:
                    game.write("Hail continues to fall.");
                    break;                
            }
        }
    },
    countdown : function () {
        //  Gravity, Trick Room, Wonder Room, Magic Room
        for (var i = 0; i < this.moveeffects.length; i++) {
            var eff = this.moveeffects[i];
            if (eff.duration) {
                if (0 == --eff.duration) {
                    eff.move.onCountdownFinish(this);
                }
            }
        }
    },
    abilitySearch : function (fun, parameters) {
        for (var t = 0; t < teams.length; t++) {
            for (var s = 0; s < teams[i].onfield; s++) {
                var mon = teams[t].slots[s];
                if (mon != 'empty') {
                    if (mon.ability[fun]) {
                        var r =mon.ability[fun].apply(mon.ability, parameters);
                        if (r != 'continue') {
                            return r;
                        }
                    }
                }
            }
        }
        return false;
    }
};
