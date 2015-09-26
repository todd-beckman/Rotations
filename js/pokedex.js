var get=GET();
var mons = {
    "bulbasaur":{"name":"Bulbasaur"},
    "ivysaur":{"name":"Ivysaur"},
    "venusaur":{"name":"Venusaur"}
}
if (get['mon'] !== undefined && mons[get['mon'].toLowerCase()] === undefined) {
    window.location.href=window.location.href.split("?")[0];
}
var mon = mons[get['mon'].toLowerCase()];
window.onload = function() {
    document.getElementById("monname").innerHTML = mon.name;
}
