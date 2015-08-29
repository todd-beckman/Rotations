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

CharacteristicDisplay = [
    "Characteristic"
    //  TODO
]

var getCharacteristic : function (mon) {
    var start = mon.personality % 6;
    //  Always start min/max searches with example element
    var max = mon.ivs[start],
        maxi = start;
    //  Start from 1 because 0 is already the default
    for (var i = 1; i < 6; i++) {
        if (max < mon.ivs[(start + i) % 6]) {
            max = mon.ivs[start];
            maxi = i;
        }
    }
    return Characteristic[maxi][max % 5];
}

