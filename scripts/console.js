var console = {
    //  the lines are already formatted
    lines : "",
    //  clear the console
    clear : function() {
        this.lines = "";
        this.update();
    },
    write : function(line) {
        this.lines += "<p class=\"consoleline\">" + line + "</p>";
        this.update();
    },
    update : function() {
        document.getElementById("consolearea").innerHTML = this.lines;
    }
};
