function Team(name, num) {
    this.nick = name;
    this.number = num;
    this.mons = [];
};

Team.prototype.updateGUI = function(id) {
    var thestring = "<p>Team " + (id + 1) + "</p>";
    for (var x in this) {
        //  Skip printing functions
        if (typeof(this[x]) !== "function" && x != "mons") {
            thestring += "<p><span class=\"playerfield\">" + x + "</span> : <span class=\"playerproperty\">" + this[x] + "</span></p>";
        }
    }
    document.getElementById("player" + id).innerHTML = thestring;
};
