var get=GET(),id=-1;
if(get['mon']!==undefined){
    var g=get['mon'].toLowerCase(),gi=MonNames.indexOf(g);
    var g2=parseInt(g);
    if (!isNaN(g2)&&-1<g2&&g2<MonNames.length){
        id=g2;
    }
    else {
        id=gi;
    }
    if (id===-1){
        window.location.href=window.location.href.split("?")[0];
    }       
}
window.onload=function(){
    if (id===-1) {
        id=Math.floor(Math.random()*MonNames.length);
    }
    var mon=MonTemplates[id];
    var sprite=mon.n.toLowerCase();
    switch (mon.n){
        case "Mr. Mime":sprite="mrmime";break;
        case "Mime Jr.":sprite="mimejr";break;
        case "Farfetch'd":sprite="farfetchd";break;
        case "Flab&eacute;b&eacute;":sprite="flabebe";break;
        case "Nidoran &#9792;":sprite="nidoranf";break;
        case "Nidoran &#9794;":sprite="nidoranm";break;
    }
    document.getElementById("monname").innerHTML="#"+mon.id+": "+mon.n;
    document.getElementById("monpic").innerHTML='<img src="http://play.pokemonshowdown.com/sprites/xyani/'+sprite+'.gif" alt="'+mon.name+'">';
    var gender="Neutral";
    if (mon.g==undefined) {
        gender="1 Male / 1 Female";
    }
    else switch (mon.g) {
        case 254:gender="Always Female";break;
        case 223:gender="1 Male / 7 Female";break;
        case 191:gender="1 Male / 3 Female";break;
        case 127:gender="1 Male / 1 Female";break;
        case 63:gender="3 Male / 1 Female";break;
        case 31:gender="7 Male / 1 Female";break;
        case 0:gender="Always Male";break;
    }
    var types="";
    for (var i=0;i<mon.t.length;i++){
        types+="<img class='montypes' src='http://play.pokemonshowdown.com/sprites/types/"+mon.t[i]+".png' alt='"+mon.t[i]+"-type'>";
    }
    document.getElementById("montypes").innerHTML=types;
    document.getElementById("mongender").innerHTML=gender;
    document.getElementById("monheight").innerHTML=mon.h;
    document.getElementById("monweight").innerHTML=mon.w;
    document.getElementById("moncolor").innerHTML=mon.c;
    document.getElementById("moneggs").innerHTML=mon.e.join(" and ");
    document.getElementById("monhp").innerHTML=mon.s[0];
    document.getElementById("monatk").innerHTML=mon.s[1];
    document.getElementById("mondef").innerHTML=mon.s[2];
    document.getElementById("monspa").innerHTML=mon.s[3];
    document.getElementById("monspd").innerHTML=mon.s[4];
    document.getElementById("monspe").innerHTML=mon.s[5];
}

