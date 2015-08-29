var Status = {
    "Healthy" : 0,
    "Poisoned" : 1,
    "Badly Poisoned" : 2,
    "Burned" : 3,
    "Frozen" : 4,
    "Asleep" : 5,
    "Paralyzed" : 6,
    "Fainted" : 7
};

//  TODO
var StatusDisplay = [
    ["Healthy"],
    ["Poisoned"],
    ["Poisoned"],
    ["Burned"],
    ["Frozen"],
    ["Asleep"],
    ["Paralyzed"],
    ["Fainted"]
];
//  TODO
var StatusInflictedMessage = [
    [],
    [" was poisoned."],
    [" was badly poisoned."],
    [" was burned."],
    [" was frozen solid."],
    [" went to sleep."],
    [" was paralyzed."],
    [" fainted!"]
];
//  TODO
var StatusEffectMessage = [
    [],
    [" is hurt by poison."],
    [" is hurt badly by poison."],
    [" is hurt by its burn."],
    [" is frozen solid."],
    [" is fast asleep."],
    [" is fully paralyzed."],
    [" is unable to fight."]
];
//  TODO
var StatusHealedMessage = [
    [],
    [" was cured of its poison!"],
    [" was cured of its poison!"],
    ["'s burn was healed!"],
    [" thawed out!"],
    [" was cured of paralysis!"],
    [" recovered from fainting!"]
];