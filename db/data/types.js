var Type = {
    "Normal"    : 0,
    "Fighting:" : 1, 
    "Flying"    : 2,
    "Poison"    : 3,
    "Ground"    : 4,
    "Rock"      : 5 ,
    "Bug"       : 6,
    "Ghost"     : 7,
    "Steel"     : 8,
    "Fire"      : 9,
    "Water"     : 10,
    "Grass"     : 11,
    "Electric"  : 12,
    "Psychic"   : 13,
    "Ice"       : 14,
    "Dragon"    : 15,
    "Dark"      : 16,
    "Fairy"     : 17
};

//  TODO
var TypeDisplay = ["Type"];
var TypeName = [
    ["Normal", "ノーマル", "Normal", "Normal", "Normale", "Normal", "노말"],
    ["Fighting", "かくとう", "Combat", "Kampf", "Lotta", "Peleador", "격투"],
    ["Flying", "ひこう", "Vol", "Flug", "Volante", "Volador", "비행"],
    ["Poison", "どく", "Poison", "Gift", "Veleno", "Veneno", "독"],
    ["Ground", "じめん", "Sol", "Boden", "Terra", "Tierra", "땅"],
    ["Rock", "いわ", "Roche", "Gestein", "Roccia", "Roca", "바위"],
    ["Bug", "むし", "Insecte", "Käfer", "Coleottero", "Insecto", "벌레"],
    ["Ghost", "ゴースト", "Spectre", "Geist", "Spettro", "Fantasma", "고스트"],
    ["Steel", "はがね", "Acier", "Stahl", "Acciaio", "Acero", "강철"],
    ["Fire", "ほのお", "Feu", "Feuer", "Fuoco", "Fuego", "불꽃"],
    ["Water", "みず", "Eau", "Wasser", "Acqua", "Agua", "물"],
    ["Grass", "くさ", "Plante", "Pflanze", "Erba", "Planta", "풀"],
    ["Electric", "でんき", "Électrik", "Elektro", "Elettro", "Eléctrico", "전기"],
    ["Psychic", "エスパ", "Psy", "Psycho", "Psico", "Psíquico", "에스퍼"],
    ["Ice", "こおり", "Glace", "Es", "Ghiaccio", "Heilo", "얼음"],
    ["Dragon", "ドラゴン", "Dragon", "Drache", "Drago", "Dragón", "드래곤"],
    ["Dark", "あく", "Ténèbres", "Unlicht", "Buio", "Oscuridad", "악"],
    ["Fairy", "フェアリー", "Fée", "Fee", "Folletto", "Hada", "페어리"]
];
//  TODO
var SuperEffectiveMessage = ["It's super effective!"];
//  TODO
var NotVeryEffectiveMessage = ["It's not very effective."];
//  TODO
var NotEffectiveMessage = ["It's super effective!"];

//  The categories of moves with these types in Generations 1, 2, and 3.
var TypeCategory = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2];

//  These are double what they should be. Rightshift the result.
var TypeEffectiveness = [
    [2, 2, 2, 2, 2, 1, 2, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [4, 2, 1, 1, 2, 4, 1, 0, 4, 2, 2, 2, 2, 1, 4, 2, 4, 1],
    [2, 4, 2, 2, 2, 1, 4, 2, 1, 2, 2, 4, 1, 2, 2, 2, 2, 2],
    [2, 2, 2, 1, 1, 1, 2, 1, 0, 2, 2, 4, 2, 2, 2, 2, 2, 4],
    [2, 2, 0, 4, 2, 4, 1, 2, 4, 4, 2, 1, 4, 2, 2, 2, 2, 2],
    [2, 1, 4, 2, 1, 2, 4, 2, 1, 4, 2, 2, 2, 2, 4, 2, 2, 2],
    [2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 4, 2, 4, 2, 2, 4, 1],
    [0, 2, 2, 2, 2, 2, 2, 4, 1, 2, 2, 2, 2, 4, 2, 2, 1, 2],
    [2, 2, 2, 2, 2, 4, 2, 2, 1, 1, 1, 2, 1, 2, 4, 2, 2, 4],
    [2, 2, 2, 2, 2, 1, 4, 2, 4, 1, 1, 4, 2, 2, 4, 1, 2, 2],
    [2, 2, 2, 2, 4, 4, 2, 2, 2, 4, 1, 1, 2, 2, 2, 1, 2, 2],
    [2, 2, 1, 1, 4, 4, 1, 2, 1, 1, 4, 1, 2, 2, 2, 1, 2, 2],
    [2, 2, 4, 2, 0, 2, 2, 2, 2, 2, 4, 1, 1, 2, 2, 1, 2, 2],
    [2, 4, 2, 4, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 0, 2],
    [2, 2, 4, 2, 4, 2, 2, 2, 1, 1, 1, 4, 2, 2, 1, 4, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 4, 2, 0],
    [2, 1, 2, 2, 2, 2, 2, 4, 1, 2, 2, 2, 2, 4, 2, 2, 1, 1],
    [2, 4, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 4, 4, 2]
];

//  Also double what they should be. Used in Inverted Battle.
var InvertedTypeEffectiveness = [
    [2, 2, 2, 2, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 2, 4, 4, 2, 1, 4, 4, 4, 1, 2, 2, 2, 4, 1, 2, 1, 4],
    [2, 1, 2, 2, 2, 4, 1, 2, 4, 2, 2, 1, 4, 2, 2, 2, 2, 2],
    [2, 2, 2, 4, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [2, 2, 4, 1, 2, 1, 4, 2, 1, 1, 2, 4, 1, 2, 2, 2, 2, 2],
    [2, 4, 1, 2, 4, 2, 1, 2, 4, 1, 2, 2, 2, 2, 1, 2, 2, 2],
    [2, 4, 4, 4, 2, 2, 2, 4, 4, 4, 2, 1, 2, 1, 2, 2, 1, 4],
    [4, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 4, 1],
    [2, 2, 2, 2, 2, 1, 2, 2, 4, 4, 4, 2, 4, 2, 1, 2, 2, 1],
    [2, 2, 2, 2, 2, 4, 1, 2, 1, 4, 4, 2, 1, 1, 2, 4, 2, 2],
    [2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 4, 4, 2, 2, 2, 4, 2, 2],
    [2, 2, 4, 4, 1, 1, 4, 2, 4, 4, 1, 4, 2, 2, 2, 4, 2, 2],
    [2, 2, 1, 2, 4, 2, 2, 2, 2, 2, 1, 4, 4, 2, 2, 4, 2, 2],
    [2, 1, 2, 1, 2, 2, 2, 2, 4, 2, 2, 2, 2, 4, 2, 2, 4, 2],
    [2, 2, 1, 2, 1, 2, 2, 2, 4, 4, 4, 1, 2, 2, 4, 1, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 1, 2, 4],
    [2, 4, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 4, 4],
    [2, 1, 2, 4, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 1, 1, 2]
];

var HiddenPowerType = function (ivs) {
    return Math.floor(
           (ivs.[0] && 1
        +   ivs.[1] && 2
        +   ivs.[2] && 4
        +   ivs.[3] && 8
        +   ivs.[4] && 16
        +   ivs.[5] && 32
        ) * 15 / 63) + ;
};

//  TODO
var CharacteristicDisplay = ["Characteristic"];
var Characteristic = [
    [
        ["Loves to eat", "たべるのがだいすき", "Adore manger", "Liebt es zu essen", "Adora mangiare", "Le encanta comer", "먹는 것을 제일 좋아함"],
        ["Takes plenty of siestas", "ひるねをよくする", "S'assoupit souvent", "Nickt oft ein", "Si addormenta spesso", "A menudo se duerme", "낮잠을 잘 잠"],
        ["Nods off a lot", "いねむりがおおい", "Inemuri ga ooi", "Dort beaucoup", "Schläft gerne", "Dorme a lungo", "Duerme muncho", "말뚝잠이 많음"],
        ["Scatters things often", "ものをよくちらかす", "Éparpille des choses", "Macht oft Unordnung", "Lascia cose in giro", "Suele desordenar cosas", "물건을 잘 어지름"],
        ["Likes to relax", "のんびりするのがすき", "Aime se détendre", "Mag es, sich zu entspannen", "Adora rilassarsi", "Le gusta relajarse", "유유자적함을 좋아함"],
    ],
    [
        ["Proud of its power", "ちからがじまん", "Chikara ga jiman", "Est fier de sa puissance", "Stolz auf seine Stärke", "La forza è il suo vanto", "Orgulloso de su fuerza", "힘자랑이 특기임", "Himjalang'i teug'giim"],
        ["Likes to thrash about", "あばれることがすき", "Aime se démener", "Prügelt sich gerne", "Adora dimenarsi", "Le gusta revolverse", "난동부리기를 좋아함"],
        ["A little quick tempered", "ちょっとおこりっぽい", "Un peu coléreux", "Besitzt Temperament", "Si arrabbia facilmente", "A veces se enfada", "약간 화를 잘 내는 성미임"],
        ["Likes to fight", "ケンカをするのがすき", "Aime combattre", "Liebt Kämpfe", "Adora combattere", "Le gusta luchar", "싸움을 좋아함"],
        ["Quick tempered", "ちのけがおおい", "S'emporte facilement", "Impulsiv", "Facilmente irritabile", "Tiene mal genio", "혈기가 왕성함"]
    ],
    [
        ["Sturdy body", "からだがじょうぶ", "Corps robuste", "Hat robusten Körper", "Ha un corpo robusto", "Cuerpo resistente", "몸이 튼튼함"],
        ["Capable of taking hits", "うたれづよい", "Sait encaisser les coups", "Kann Treffer gut verkraften", "Forte in attacco", "Buen fajador", "맷집이 강함"],
        ["Highly persistent", "ねばりづよい", "Très obstiné", "Äußerst ausdauernd", "Molto ostinato", "Muy persistente", "끈질김"],
        ["Good endurance", "しんぼうづよい", "Bonne endurance", "Hat eine gute Ausdauer", "Molto paziente", "Muy resistente", "인내심이 강함"],
        ["Good perseverance", "がまんづよい", "Persévérant", "Ist beharrlich", "Molto tenace", "Muy perseverante", "잘 참음"],
    ],
    [
        ["Likes to run", "かけっこがすき", "Aime courir", "Liebt es zu rennen", "Adora correre", "Le gusta correr", "약간 우쭐쟁이임"],
        ["Alert to sounds", "ものおとにびんかん", "Attentif aux sons", "Achtet auf Geräusche", "Fa attenzione ai suoni", "Oído siempre alerta", "주위 소리에 민감함"],
        ["Impetuous and silly", "おっちょこちょい", "Bête et impulsif", "Ungestüm und einfältig", "Irruente e semplice", "Impetuoso y bobo", "촐랑대는 성격임"],
        ["Somewhat of a clown", "すこしおちょうしもの", "Aime faire le pitre", "Ist fast wie ein Clown", "Una specie di buffone", "Es un poco payaso", "약간 우쭐쟁이임"],
        ["Quick to flee", "にげるのがはやい", "Fuit rapidement", "Flüchtet schnell", "Sa fuggire velocemente", "Huye rápido", "도망에는 선수임"],
    ],
    [
        ["Highly curious", "こうきしんがつよい", "Extrêmement curieux", "Sehr neugierig", "Grande ficcanaso", "Extremadamente curioso", "호기심이 강함"],
        ["Mischievous", "イタズラがすき", "Coquin", "Hinterhältig", "Alquanto vivace", "Travieso", "매우 꼼꼼함"],
        ["Thoroughly cunning", "ぬけめがない", "Très astucieux", "Äußerst gerissen", "Estremamente sagace", "Muy astuto", "빈틈이 없음"],
        ["Often lost in thought", "かんがえごとがおおい", "Souvent dans la lune", "Ist oft in Gedanken", "Si perde nel suo mondo", "A menudo está en Babia", "걱정거리가 많음",],
        ["Very finicky", "とてもきちょうめん", "Très particulier", "Sehr pedantisch", "Molto esigente", "Muy melindroso", "매우 꼼꼼함"]
    ],
    [
        ["Strong willed", "きがつよい", "Très volontaire", "Besitzt starken Willen", "Sa il fatto suo", "Voluntarioso", "기가 센 성격임"],
        ["Somewhat vain", "ちょっぴりみえっぱり", "Un peu vaniteux", "Irgendwie eitel", "Abbastanza superficiale", "Algo orgulloso", "조금 겉치레를 좋아함"],
        ["Strongly defiant", "まけんきがつよい", "Esprit rebelle", "Sehr aufsässig", "Molto insolente", "Muy insolente", "오기가 센 성격임"],
        ["Hates to lose", "まけずぎらい", "A horreur de perdre", "Hasst Niederlagen", "Non sopporta perdere", "Odia perder", "지기 싫어함"],
        ["Somewhat stubborn", "ちょっぴりごうじょう", "Assez entêté", "Dickköpfig", "Un po' testardo", "Un poco cabezota", "조금 고집통이임"]
    ]
];

