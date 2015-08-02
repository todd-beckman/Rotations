var field = {
    //  Turn count
    turn : 0,
    //  The list of teams; init() fills this
    teams : [],
    //  Weather conditions
    weather : {
        type : 0,
        duration : 0
    },
    //  Terrain conditions
    terrain : {
        type : 0,
        duration : 0
    },
    //  Room conditions
    trickroom : 0,
    magicroom : 0,
    wonderroom : 0,
    //  Trap conditions
    arenatrap : false,
    shadowtag : false;
}

var updateFieldGUI = function() {
    var thestring = "<p>Field</p>";
    if (field.weather.type == "None") {
        thestring += "<p><span class=\"playerfield\">Weather</span> : <span class=\"playerproperty\">None</span></p>";
    }
    else {
        thestring += "<p><span class=\"playerfield\">Weather</span> : <span class=\"playerproperty\">" + field.weather.type + " for " + field.weather.duration + " turns.</span></p>";   
    }
    document.getElementById("field").innerHTML = thestring;
}