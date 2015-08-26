

//  Multi-lingual lookup:

//  Used for Characteristics, Genders, Languages, LevelGrowths, Natures,
//  Stats, Types; anything that is simply a string, not an object definition
var getID = function(list, name, language) {
    if (language == undefined) {
        language = 0;
    }
    for (var i = 0; i < list.length; i++) {
        if (list[i][language] == name) {
            return i;
        }
    }
    return -1;
};

//  Used for Ability, Item, Move
//  These are "Library" objects with a name property
//  Unlike Pokemon, there is exactly one instance per ID
var getLibraryID = function(list, name, language) {
    if (language == undefined) {
        language = 0;
    }
    for (var i = 0; i < list.length; i++) {
        if (list[i].name[language] == name) {
            return i;
        }
    }
    return -1;
};

//    Dulicate names; Only data scrubbing phase should need these two
var getAllIDs = function(list, name, language) {
    if (language == undefined) {
        language = 0;
    }
    var ids = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i][language] == name) {
            ids.push(i);
        }
    }
    return ids;
};
var getAllLibraryIDs = function(list, name, language) {
    if (language == undefined) {
        language = 0;
    }
    var ids = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].name[language] == name) {
            ids.push(i);
        }
    }
    return ids;
};

