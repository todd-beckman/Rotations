var get=GET();
if(get['ability']!==undefined){
    var g=get['ability'].toLowerCase(),g2=parseInt(g);
    if((isNaN(g2)||g2<0||AbilityDex.length<=g2)&&AbilityID[g]===undefined){
        window.location.href=window.location.href.split("?")[0];
    }
    var id=isNaN(g2)?AbilityID[g]:g2;
    var ability=AbilityDex[id];
    console.log("Found " + id);
    window.onload=function(){
        //document.getElementById("abilityid").innerHTML="#"+id;
        document.getElementById("abilityname").innerHTML=ability.name[0];
        document.getElementById("abilitynames").innerHTML="<h2 class=\"text-center\">Other Names:</h2><table class='text-center'width='100%'><tr><td>日本語</td><td>"+ability.name[1]+"</td></tr><tr><td>Français</td><td>"+ability.name[2]+"</td></tr><tr><td>Deutsch</td><td>"+ability.name[3]+"</td></tr><tr><td>Italiano</td><td>"+ability.name[4]+"</td></tr><tr><td>Español</td><td>"+ability.name[5]+"</td></tr><tr><td>한글</td><td>"+ability.name[6]+"</td></tr></table>";
        document.getElementById("abilitydesc").innerHTML="<h1 class='text-center'>"+ability.desc+"</h1>";
    }
}
