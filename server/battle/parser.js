//  This script is intended specifically to parse files in Javascript in the local directory without any special includes required

var e;
function run() {
    e = document.getElementById("writeback");
    e.innerHTML = "var Abilitydex = [<br>" + printdex() + "<br>];";
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function printdex() {
    var strings = [];
    for (var i = 0; i < list.length; i++) {
        //  MODIFY STUFF HERE

        //  DON'T MODIFY AFTER THIS
        strings[list[i].id] = JSON.stringify({
            name : list[i].name,
            desc : "",
            inbattle : ""
        })
            .replace("\"name\"", "name")
            .replace("\"desc\"", "desc")
            .replace("\"inbattle\"", "inbattle");
    }
    return strings.join(",<br>");
}
