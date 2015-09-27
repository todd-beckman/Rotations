var get=GET();
var mons={
    "missingno.":0,
    "bulbasaur":1,
    "ivysaur":2,
    "venusaur":3
}
var ids=[
    {"name":"MissingNo."},
    {"name":"Bulbasaur"},
    {"name":"Ivysaur"},
    {"name":"Venusaur"}
];
if(get['mon']!==undefined){
    var g=get['mon'].toLowerCase(),g2=parseInt(g);
    if((isNaN(g2)||g2<0||ids.length<=g2)&&mons[g]===undefined){
        window.location.href=window.location.href.split("?")[0];
    }
    var id=isNaN(g2)?mons[g]:g2;
    var mon=ids[id];
    window.onload=function(){
        document.getElementById("monname").innerHTML="#"+id+": "+mon.name;
        document.getElementById("monpic").innerHTML='<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/'+mon.name.toLowerCase()+'.gif" alt="'+mon.name+'">';
        document.getElementById("monshiny").innerHTML='<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados-shiny/'+mon.name.toLowerCase()+'.gif" alt="'+mon.name+'">';
    }
}
