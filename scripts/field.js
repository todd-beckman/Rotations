var field = {
    weather : {
        type : "None",
        duration : 0
    }
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