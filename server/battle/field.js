

var field = {
    teams : [];
    moveeffects : [],
    weather : {type : Weather.None, duration : }
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
    }
};
