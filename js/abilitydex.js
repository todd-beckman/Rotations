var get=GET(),id=-1;
if(get['ability']!==undefined){
    var g=get['ability'].toLowerCase(),g2=parseInt(g);
    if(!isNaN(g2)&&-1<g2&&g2<AbilityDex.length){
        id=g2;
    }
    else if (AbilityID.hasOwnProperty(g)){
        id=AbilityID[g];
    }
    if(id===-1){
        window.location.href=window.location.href.split("?")[0];
    }
}
window.onload=function(){
    if (id===-1){
        id=Math.floor(Math.random()*AbilityDex.length);
    }
    var ability=AbilityDex[id];
    document.getElementById("abilityname").innerHTML=ability.name[0];
    document.getElementById("abilitynames").innerHTML="<h2 class=\"text-center\">Other Names:</h2><table class='text-center'width='100%'><tr><td>日本語</td><td>"+ability.name[1]+"</td></tr><tr><td>Français</td><td>"+ability.name[2]+"</td></tr><tr><td>Deutsch</td><td>"+ability.name[3]+"</td></tr><tr><td>Italiano</td><td>"+ability.name[4]+"</td></tr><tr><td>Español</td><td>"+ability.name[5]+"</td></tr><tr><td>한글</td><td>"+ability.name[6]+"</td></tr></table>";
    document.getElementById("abilitydesc").innerHTML="<h1 class='text-center'>"+ability.desc+"</h1>";
}
