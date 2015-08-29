var Gender = {
    "Female"    : 0,
    "Male"      : 1,
    "Neutral"   : 2
};

var GenderDisplay = ["Gender", "せいべつ", "Sexe", "Geschlecht", "Sesso", "Género", "성별"];

//  Index: Numerator in 8 chance of a female
//  Use 255 to identify as gender-neutral
var GenderThresholds = [254, 223, 191, 159, 127, 95, 63, 31, 0];

var getGender(id, personality) {
    var ratio = Pokedex[id].gender;
    if (ratio == 255) {
        return 2;
    }
    var gender = personality % 256;
    if (ratio < gender) {
        return 1;
    }
    return 0;
};
