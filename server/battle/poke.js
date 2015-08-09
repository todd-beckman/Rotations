
var build = {
    id:0,       //  ID handles alt forms
    nick:"",    //  empty string for no nick
    item:0,     //  id
    ability:0,  //  0, 1, 2 index from the template's ability.
    nature:0,   //  id
    gender:0,   //  id
    ivs:[31, 31, 31, 31, 31, 31],
    evs:[85, 85, 85, 85, 85, 85],
    moves:[0, 0, 0, 0], //  ids
};

function Poke(build) {
    this.template = Pokedex[build.id];
    this.build = build;
    this.persistent = {
        stats : [0, 0, 0, 0, 0, 0],
        health : 0,
        item : build.item,
        //  Only define these when necessary
        //mega : false,
        //statuscounter : 0,//  counter for Sleep and Toxic
    };
    this.nocopy = {
        //  Only define these when necessary
        //  Things that can change temporarily
        //ability : 0,
    }
    this.temp = {
        boosts : [0, 0, 0, 0, 0, 0, 0, 0, 0],
        //  Only define these when necessary
        //  Things that can change temporarily
        //ability : 0,
        //types : [],
        //   Other flags and counters
        //confuse : 0,      //  counter
        //flying : false,   //  Fly, Bounce, Sky Drop
        //digging : false,
        //attract : 0,      //  slot?
        //traps : []        //  {slot?,counter,move}
        //minimize : false,

    };
}