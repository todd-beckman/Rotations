//  Only useful for developers; only English used
var Nature = [
    "Hardy"     : 0,
    "Bold"      : 1,
    "Timid"     : 2,
    "Modest"    : 3,
    "Calm"      : 4,
    "Lonely"    : 5,
    "Docile"    : 6,
    "Hasty"     : 7,
    "Mild"      : 8,
    "Gentle"    : 9,
    "Brave"     : 10,
    "Relaxed"   : 11,
    "Serious"   : 12,
    "Quiet"     : 13,
    "Sassy"     : 14,
    "Adamant"   : 15,
    "Impish"    : 16,
    "Jolly"     : 17,
    "Bashful"   : 18,
    "Careful"   : 19,
    "Naughty"   : 20,
    "Lax"       : 21,
    "Naive"     : 22,
    "Rash"      : 23,
    "Quirky"    : 24
];

var NatureName = [
    ["Hardy", "がんばりや", "Hardi", "Robust", "Ardita", "Fuerte", "노력"],
    ["Lonely", "さみしがり", "Solo", "Solo", "Schiva", "Huraña", "외로움"],
    ["Brave", "ゆうかん", "Brave", "Mutig", "Audace", "Audaz", "용감"],
    ["Adamant", "いじっぱり", "Rigide", "Hart", "Decisa", "Firme", "고집"],
    ["Naughty", "やんちゃ", "Mauvais", "Frech", "Birbona", "Pícara", "개구쟁이"],
    ["Bold", "ずぶとい", "Assuré", "Kühn", "Sicura", "Osada", "대담"],
    ["Docile", "すなお", "Docile", "Sanft", "Docile", "Dócil", "온순"],
    ["Relaxed", "のんき", "Relax", "Locker", "Placida", "Plácida", "무사태평"],
    ["Impish", "わんぱく", "Malin", "Pfiffig", "Scaltra", "Agitada", "장난꾸러기"],
    ["Lax", "のうてんき", "Lâche", "Lasch", "Fiacca", "Floja", "촐랑"],
    ["Serious", "まじめ", "Sérieux", "Ernst", "Seria", "Seria", "성실"],
    ["Timid", "おくびょう", "Timide", "Scheu", "Timida", "Miedosa", "겁쟁이"],
    ["Hasty", "せっかち", "Pressé", "Hastig", "Lesta", "Activa", "성급"],
    ["Serious", "まじめ", "Sérieux", "Ernst", "Seria", "Seria", "성실"],
    ["Jolly", "ようき", "Jovial", "Froh", "Allegra", "Alegre", "명랑"],
    ["Naive", "むじゃき", "Naïf", "Naiv", "Ingenua", "Ingenua", "천진난만"],
    ["Modest", "ひかえめ", "Modeste", "Mäßig", "Modesta", "Modesta", "조심"],
    ["Mild", "おっとり", "Doux", "Mild", "Mite", "Afable", "의젓"],
    ["Quiet", "れいせい", "Discret", "Ruhig", "Quieta", "Mansa", "냉정"],
    ["Bashful", "てれや", "Pudique", "Zaghaft", "Ritrosa", "Tímida", "수줍음"],
    ["Rash", "うっかりや", "Foufou", "Hitzig", "Ardente", "Alocada", "덜렁"],
    ["Calm", "おだやか", "Calme", "Still", "Calma", "Serena", "차분"],
    ["Gentle", "おとなしい", "Gentil", "Zart", "Gentile", "Amable", "얌전"],
    ["Sassy", "なまいき", "Malpoli", "Forsch", "Vivace", "Grosera", "건방"],
    ["Careful", "しんちょう", "Prudent", "Sacht", "Cauta", "Cauta", "신중"],
    ["Quirky", "きまぐれ", "Bizarre", "Kauzig", "Furba", "Rara", "변덕", "Byeongdeok"]
];

var NatureDisplay = [
    "Nature",
    "せいかく",
    "Nature",
    "Wesen",
    "Natura",
    "성격",
    "Naturaleza"
];

var natureRaises = function (nature) {
    //  add 1 to skip over HP
    return nature / 5 + 1;
};

var natureLowers = function (nature) {
    //  add 1 to skip over HP
    return nature % 5 + 1;
};

var natureRaisesContest = function (nature) {
    switch (natureRaises(nature)) {
        case 1: return 0;
        case 2: return 4;
        case 3: return 2;
        case 4: return 1;
        case 5: return 3;
    }
};

var natureLowersContest = function (nature) {
    switch (natureLowers(nature)) {
        case 1: return 0;
        case 2: return 4;
        case 3: return 2;
        case 4: return 1;
        case 5: return 3;
    }
};
