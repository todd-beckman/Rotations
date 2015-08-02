//  This is populated at runtime with only relevant moves
var Ability = {};

//  Declare all events
var DefaultEvents = {
}

var loadAbility = function(ability) {
    //  Move already exists
    if (Ability.hasOwnProperty(ability)) {
        return;
    }
    //  Load trivial data
    Ability[ability] = AbilityList[ability];
    //  Load the event data
    for (var e : DefaultEvents) {
        //  See if the move has events
        if (AbilityEvents.hasOwnProperty(ability)
        //  See if this is one of the move's events
        &&  AbilityEvents[ability].hasOwnProperty(e)) {
            Ability[ability][e] = AbilityEvents[ability][e];
        }
        else {
            Ability[ability][e] = DefaultEvents[ability][e];
        }
    }
}

