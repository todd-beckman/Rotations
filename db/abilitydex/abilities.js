var AbilityDisplay = ["Ability", "とくせい", "Talent", "Fähigkeit", "Abilità", "Habilidad", "특성"];

var ShowAbilityConnector = [
    "'s "
];

//  TODO: Translate the descriptions
//  TODO: Translate the connector


var showAbility(user, ability) {
    //  TODO: Animation flag
    game.write(user.name()
        + ShowAbilityConnector[game.language]
        + ability.name[game.language]
    );
}

var AbilityDex = [
    {
        name:["No Ability", "", "", "", "", "", ""],
        desc:["Does absolutely nothing."]
    },
    {
        name:["Stench", "あくしゅう", "Puanteur", "Duftnote", "Tanfo", "Hedor", "악취"],
        desc:["The stench may cause the target to flinch."],
        GetFlinchOdds : function () { return 10; }
    },
    {
        name:["Drizzle", "あめふらし", "Crachin", "Niesel", "Piovischio", "Llovizna", "잔비"],
        desc:["The Pokémon makes it rain if it appears in battle."],
        AfterSendOut : function (user) {
            if (weather.flag() != 1) {
                showAbility(user, this);
                weather.set(1);
            }
        }
    },
    {
        name:["Speed Boost", "かそく", "Turbo", "Temposchub", "Acceleratore", "Impulso", "가속"],
        desc:["The Pokémon’s Speed stat is gradually boosted."],
        EOT_PassiveAbility : function (user) {
            //  Does not apply speed boost for freshly switched mons
            if (user.thisturn.hasmoved) {
                showAbility(user, this);
                user.statBoost([0, 0, 1]);
            }
        }
    },
    {
        name:["Battle Armor", "カブトアーマー", "Armurbaston", "Kampfpanzer", "Lottascudo", "Armadura Batalla*", "전투"],
        desc:["The Pokémon is protected against critical hits."],
        BeforeFoeCriticalHit : function (user) {
            return false;
        }
    },
    {
        name:["Sturdy", "がんじょう　", "Fermeté", "Robustheit", "Vigore", "Robustez", "옹골참"],
        desc:["The Pokémon is protected against 1-hit KO attacks."],
        BeforeLoseLastHP = function (user) {
            if (user.health == user.stats[0]) {
                showAbility(user, this);
                return false;
            }
            return true;
        }
    },
    {
        name:["Damp", "しめりけ", "Moiteur", "Feuchtigkeit", "Umidità", "Humedad", "습기"],
        desc:["Prevents combatants from self destructing."],
        BeforeMoveUsed : function (user, move) {
            if (move.selfko) {
                showAbility(user, this);
                return false;
            }
            return true;
        },
        BeforeFoeMoveUsed : function (user, move) {
            if (move.selfko) {
                showAbility(user, this);
                return false;
            }
            return true;
        },
    },
    {
        name:["Limber", "じゅうなん", "Échauffement", "Flexibilität", "Scioltezza", "Flexibilidad", "유연"],
        desc:["The Pokémon is protected from paralysis."],
        BeforeParalyzed : function (user) {
            showAbility(user, this);
            return false;
        }
    },
    {
        name:["Sand Veil", "すながくれ", "Voile Sable", "Sandschleier", "Sabbiavelo", "Velo Arena", "모래숨기"],
        desc:["Boosts the Pokémon’s evasion in a sandstorm."],
        BeforeHailDamage : function () {
            return false;
        },
        MultiplyEvasion : function () {
            if (weather.flag() == 3) {
                return 1.25;
            }
            return 1;
        }
    },
    {
        name:["Static", "せいでんき", "Statik", "Statik", "Statico", "Elec. Estática*", "정전기"],
        desc:["Contact with the Pokémon may cause paralysis."],
        
    },
    {
        name:["Volt Absorb", "ちくでん", "Absorb Volt", "Voltabsorber", "Assorbivolt", "Absorbe Elec*", "축전"],
        desc:["Restores HP if hit by an Electric-type move."]
    },
    {
        name:["Water Absorb", "ちょすい", "Absorb Eau", "H2O-Absorber", "Assorbacqua", "Absorbe Agua*", "저수"],
        desc:["Restores HP if hit by a Water-type move."]
    },
    {
        name:["Oblivious", "どんかん", "Benêt", "Dösigkeit", "Indifferenza", "Despiste", "둔감"],
        desc:["Prevents the Pokémon from becoming infatuated."]
    },
    {
        name:["Cloud Nine", "ノーてんき", "Ciel Gris", "Wolke Sieben", "Antimeteo", "Aclimatación", "날씨"],
        desc:["Eliminates the effects of weather."]
    },
    {
        name:["Compound Eyes", "ふくがん", "Œil Composé", "Facettenauge", "Insettocchi", "Ojo Compuesto*", "복안"],
        desc:["The Pokémon’s accuracy is boosted."]
    },
    {
        name:["Insomnia", "ふみん", "Insomnia", "Insomnia", "Insonnia", "Insomnio", "불면"],
        desc:["Prevents the Pokémon from falling asleep."]
    },
    {
        name:["Color Change", "へんしょく", "Déguisement", "Farbwechsel", "Cambiacolore", "Cambio Color", "변색"],
        desc:["Changes the Pokémon’s type to the foe’s move."]
    },
    {
        name:["Immunity", "めんえき", "Vaccin", "Immunität", "Immunità", "Inmunidad", "면역"],
        desc:["Prevents the Pokémon from getting poisoned."]
    },
    {
        name:["Flash Fire", "もらいび", "Torche", "Feuerfänger", "Fuocardore", "Absorbe Fuego*", "타오르는"],
        desc:["Powers up Fire-type moves if hit by a fire move."]
    },
    {
        name:["Shield Dust", "りんぷん", "Écran Poudre", "Puderabwehr", "Polvoscudo", "Polvo Escudo", "인분"],
        desc:["Blocks the added effects of attacks taken."]
    },
    {
        name:["Own Tempo", "マイペース　", "Tempo Perso", "Tempomacher", "Mente Locale", "Ritmo Proprio", "마이페이스"],
        desc:["Prevents the Pokémon from becoming confused."]
    },
    {
        name:["Suction Cups", "きゅうばん", "Ventouse", "Saugnapf", "Ventose", "Ventosas", "흡반"],
        desc:["Negates moves that force switching out."]
    },
    {
        name:["Intimidate", "いかく", "Intimidation", "Bedroher", "Prepotenza", "Intimidación", "위협"],
        desc:["Lowers the foe’s Attack stat."]
    },
    {
        name:["Shadow Tag", "かげふみ", "Marque Ombre", "Wegsperre", "Pedinombra", "Sombra Trampa*", "그림자"],
        desc:["Prevents the foe from escaping."]
    },
    {
        name:["Rough Skin", "さめはだ", "Peau Dure", "Rauhaut", "Cartavetro", "Piel Tosca", "까칠한"],
        desc:["Inflicts damage to the foe on contact."]
    },
    {
        name:["Wonder Guard", "ふしぎなまもり", "Garde Mystik", "Wunderwache", "Magidifesa", "Superguarda", "불가사의"],
        desc:["Only supereffective moves will hit."]
    },
    {
        name:["Levitate", "ふゆう", "Lévitation", "Schwebe", "Levitazione", "Levitación", "부유"],
        desc:["Gives full immunity to all Ground-type moves."]
    },
    {
        name:["Effect Spore", "ほうし", "Pose Spore", "Sporenwirt", "Spargispora", "Efecto Espora*", "포자"],
        desc:["Contact may paralyze", "poison", "or cause sleep."]
    },
    {
        name:["Synchronize", "シンクロ", "Synchro", "Synchro", "Sincronismo", "Sincronía", "싱크로"],
        desc:["Passes on a burn", "poison", "or paralysis to the foe."]
    },
    {
        name:["Clear Body", "クリアボディ", "Corps Sain", "Neutraltorso", "Corpochiaro", "Cuerpo Puro", "클리어"],
        desc:["Prevents the Pokémon’s stats from being lowered."]
    },
    {
        name:["Natural Cure", "しぜんかいふく", "Médic Nature", "Innere Kraft", "Alternacura", "Cura Natural", "자연회복"],
        desc:["All status problems are healed upon switching out."]
    },
    {
        name:["Lightning Rod", "ひらいしん　", "Paratonnerre", "Blitzfänger", "Parafulmine", "Pararrayos", "피뢰침"],
        desc:["The Pokémon draws in all Electric-type moves to raise Sp.Atk."]
    },
    {
        name:["Serene Grace", "てんのめぐみ", "Sérénité", "Edelmut", "Leggiadro", "Dicha", "하늘의"],
        desc:["Boosts the likelihood of added effects appearing."]
    },
    {
        name:["Swift Swim", "すいすい", "Glissade", "Wassertempo", "Nuotovelox", "Nado Rápido", "쓱쓱"],
        desc:["Boosts the Pokémon’s Speed in rain."]
    },
    {
        name:["Chlorophyll", "ようりょくそ", "Chlorophylle*", "Chlorophyll", "Clorofilla", "Clorofila", "엽록소"],
        desc:["Boosts the Pokémon’s Speed in sunshine."]
    },
    {
        name:["Illuminate", "はっこう", "Lumiattirance", "Erleuchtung", "Risplendi", "Iluminación", "발광"],
        desc:["Raises the likelihood of meeting wild Pokémon."]
    },
    {
        name:["Trace", "トレース", "Calque", "Fährte", "Traccia", "Rastro", "트레이스"],
        desc:["The Pokémon copies a foe's Ability."]
    },
    {
        name:["Huge Power", "ちからもち", "Coloforce", "Kraftkoloss", "Macroforza", "Potencia", "천하장사"],
        desc:["Raises the Pokémon’s Attack stat."]
    },
    {
        name:["Poison Point", "どくのトゲ", "Point Poison", "Giftdorn", "Velenopunto", "Punto Tóxico", "독가시"],
        desc:["Contact with the Pokémon may poison the foe."]
    },
    {
        name:["Inner Focus", "せいしんりょく", "Attention", "Konzentrator", "Fuocodentro", "Foco Interno", "정신력"],
        desc:["The Pokémon is protected from flinching."]
    },
    {
        name:["Magma Armor", "マグマのよろい", "Armumagma", "Magmapanzer", "Magmascudo", "Escudo Magma", "마그마의"],
        desc:["Prevents the Pokémon from becoming frozen."]
    },
    {
        name:["Water Veil", "みずのベール", "Ignifu-Voile", "Aquahülle", "Idrovelo", "Velo Agua", "수의"],
        desc:["Prevents the Pokémon from getting a burn."]
    },
    {
        name:["Magnet Pull", "じりょく", "Magnépiège", "Magnetfalle", "Magnetismo", "Imán", "자력"],
        desc:["Prevents Steel-type Pokémon from escaping."]
    },
    {
        name:["Soundproof", "ぼうおん", "Anti-Bruit", "Lärmschutz", "Antisuono", "Insonorizar", "방음"],
        desc:["Gives full immunity to all sound-based moves."]
    },
    {
        name:["Rain Dish", "あめうけざら", "Cuvette", "Regengenuss", "Copripioggia", "Cura Lluvia", "젖은접시"],
        desc:["The Pokémon gradually recovers HP in rain."]
    },
    {
        name:["Sand Stream", "すなおこし", "Sable Volant", "Sandsturm", "Sabbiafiume", "Chorro Arena", "모래날림"],
        desc:["The Pokémon summons a sandstorm in battle."]
    },
    {
        name:["Pressure", "プレッシャー", "Pression", "Erzwinger", "Pressione", "Presión", "프레셔"],
        desc:["The Pokémon raises the foe’s PP usage."]
    },
    {
        name:["Thick Fat", "あついしぼう", "Isograisse", "Speckschicht", "Grassospesso", "Sebo", "두꺼운"],
        desc:["Raises resistance to Fire- and Ice-type moves."]
    },
    {
        name:["Early Bird", "はやおき", "Matinal", "Frühwecker", "Sveglialampo", "Madrugar", "일찍"],
        desc:["The Pokémon awakens quickly from sleep."]
    },
    {
        name:["Flame Body", "ほのおのからだ", "Corps Ardent", "Flammkörper", "Corpodifuoco", "Cuerpo Llama", "불꽃몸"],
        desc:["Contact with the Pokémon may burn the foe."]
    },
    {
        name:["Run Away", "にげあし", "Fuite", "Angsthase", "Fugafacile", "Fuga", "도주"],
        desc:["Enables sure getaway from wild Pokémon."]
    },
    {
        name:["Keen Eye", "するどいめ", "Regard Vif", "Adlerauge", "Sguardofermo", "Vista Lince", "날카로운"],
        desc:["Prevents the Pokémon from losing accuracy."]
    },
    {
        name:["Hyper Cutter", "かいりきバサミ", "Hyper Cutter", "Scherenmacht", "Ipertaglio", "Corte Fuerte", "괴력집게"],
        desc:["Prevents the Attack stat from being lowered."]
    },
    {
        name:["Pickup", "ものひろい", "Ramassage", "Mitnahme", "Raccolta", "Recogida", "픽업"],
        desc:["The Pokémon may pick up items."]
    },
    {
        name:["Truant", "なまけ", "Absentéisme", "Schnarchnase", "Pigrone", "Ausente", "게으름"],
        desc:["The Pokémon can't attack on consecutive turns."]
    },
    {
        name:["Hustle", "はりきり", "Agitation", "Übereifer", "Tuttafretta", "Entusiasmo", "의욕"],
        desc:["Boosts the Attack stat", "but lowers accuracy."]
    },
    {
        name:["Cute Charm", "メロメロボディ", "Joli Sourire", "Charmebolzen", "Incantevole", "Gran Encanto", "헤롱헤롱"],
        desc:["Contact with the Pokémon may cause infatuation."]
    },
    {
        name:["Plus", "プラス", "Plus", "Plus", "Più", "Más", "플러스"],
        desc:["Boosts Sp. Atk if another Pokémon has Minus."]
    },
    {
        name:["Minus", "マイナス", "Minus", "Minus", "Meno", "Menos", "마이너스"],
        desc:["Boosts Sp. Atk if another Pokémon has Plus."]
    },
    {
        name:["Forecast", "てんきや", "Météo", "Prognose", "Previsioni", "Predicción", "기분파"],
        desc:["Transforms with the weather."]
    },
    {
        name:["Sticky Hold", "ねんちゃく", "Glue", "Wertehalter", "Antifurto", "Viscosidad", "점착"],
        desc:["Protects the Pokémon from item theft."]
    },
    {
        name:["Shed Skin", "だっぴ", "Mue", "Expidermis", "Muta", "Mudar", "탈피"],
        desc:["The Pokémon may heal its own status problems."]
    },
    {
        name:["Guts", "こんじょう", "Cran", "Adrenalin", "Dentistretti", "Agallas", "근성"],
        desc:["Boosts Attack if there is a status problem."]
    },
    {
        name:["Marvel Scale", "ふしぎなうろこ", "Écaille Spéciale*", "Notschutz", "Pelledura", "Escama Especial*", "이상한"],
        desc:["Boosts Defense if there is a status problem."]
    },
    {
        name:["Liquid Ooze", "ヘドロえき", "Suintement", "Kloakensoße", "Melma", "Lodo Líquido", "해감액"],
        desc:["Inflicts damage on foes using any draining move."]
    },
    {
        name:["Overgrow", "しんりょく", "Engrais", "Notdünger", "Erbaiuto", "Espesura", "심록"],
        desc:["Powers up Grass-type moves in a pinch."]
    },
    {
        name:["Blaze", "もうか", "Brasier", "Großbrand", "Aiutofuoco", "Mar Llamas", "맹화"],
        desc:["Powers up Fire-type moves in a pinch."]
    },
    {
        name:["Torrent", "げきりゅう", "Torrent", "Sturzbach", "Acquaiuto", "Torrente", "급류"],
        desc:["Powers up Water-type moves in a pinch."]
    },
    {
        name:["Swarm", "むしのしらせ", "Essaim", "Hexaplaga", "Aiutinsetto", "Enjambre", "벌레의"],
        desc:["Powers up Bug-type moves in a pinch."]
    },
    {
        name:["Rock Head", "いしあたま", "Tête de Roc", "Steinhaupt", "Testadura", "Cabeza Roca", "돌머리"],
        desc:["Protects the Pokémon from recoil damage."]
    },
    {
        name:["Drought", "ひでり", "Sécheresse", "Dürre", "Siccità", "Sequía", "가뭄"],
        desc:["The Pokémon makes it sunny if it is in battle."]
    },
    {
        name:["Arena Trap", "ありじごく", "Piège", "Ausweglos", "Trappoarena", "Trampa Arena", "개미지옥"],
        desc:["Prevents the foe from fleeing."]
    },
    {
        name:["Vital Spirit", "やるき", "Esprit Vital", "Munterkeit", "Spiritovivo", "Espíritu Vital*", "의기양양"],
        desc:["Prevents the Pokémon from falling asleep."]
    },
    {
        name:["White Smoke", "しろいけむり", "Écran Fumée", "Pulverrauch", "Fumochiaro", "Humo Blanco", "하얀연기"],
        desc:["Prevents the Pokémon’s stats from being lowered."]
    },
    {
        name:["Pure Power", "ヨガパワー", "Force Pure", "Mentalkraft", "Forzapura", "Energía Pura", "순수한힘"],
        desc:["Boosts the power of physical attacks."]
    },
    {
        name:["Shell Armor", "シェルアーマー　", "Coque Armure", "Panzerhaut", "Guscioscudo", "Caparazón", "조가비"],
        desc:["The Pokémon is protected against critical hits."]
    },
    {
        name:["Air Lock", "エアロック", "Air Lock", "Klimaschutz", "Riparo", "Bucle Aire", "에어록"],
        desc:["Eliminates the effects of weather."]
    },
    {
        name:["Tangled Feet", "ちどりあし", "Pieds Confus", "Fußangel", "Intricopiedi", "Tumbos", "갈지자걸음"],
        desc:["Raises evasion if the Pokémon is confused."]
    },
    {
        name:["Motor Drive", "でんきエンジン", "Motorisé", "Starthilfe", "Elettrorapid", "Electromotor", "전기엔진"],
        desc:["Raises Speed if hit by an Electric-type move."]
    },
    {
        name:["Rivalry", "とうそうしん", "Rivalité", "Rivalität", "Antagonismo", "Rivalidad", "투쟁심"],
        desc:["Raises Attack if the foe is of the same gender."]
    },
    {
        name:["Steadfast", "ふくつのこころ", "Impassible", "Felsenfest", "Cuordeciso", "Impasible", "불굴의"],
        desc:["Raises Speed each time the Pokémon flinches."]
    },
    {
        name:["Snow Cloak", "ゆきがくれ", "Rideau Neige", "Schneemantel", "Mantelneve", "Manto Níveo", "눈숨기"],
        desc:["Raises evasion in a hailstorm."]
    },
    {
        name:["Gluttony", "くいしんぼう", "Gloutonnerie", "Völlerei", "Voracità", "Gula", "먹보"],
        desc:["Encourages the early use of a held Berry."]
    },
    {
        name:["Anger Point", "いかりのつぼ", "Colérique", "Kurzschluss", "Grancollera", "Irascible", "분노의"],
        desc:["Raises Attack upon taking a critical hit."]
    },
    {
        name:["Unburden", "かるわざ", "Délestage", "Entlastung", "Agiltecnica", "Liviano", "곡예"],
        desc:["Raises Speed if a held item is used."]
    },
    {
        name:["Heatproof", "たいねつ", "Ignifugé", "Hitzeschutz", "Antifuoco", "Ignífugo", "내열"],
        desc:["Weakens the power of Fire-type moves."]
    },
    {
        name:["Simple", "たんじゅん", "Simple", "Wankelmut", "Disinvoltura", "Simple", "단순"],
        desc:["The Pokémon is prone to wild stat changes."]
    },
    {
        name:["Dry Skin", "かんそうはだ", "Peau Sèche", "Trockenheit", "Pellearsa", "Piel Seca", "건조피부"],
        desc:["Reduces HP if it is hot. Water restores HP."]
    },
    {
        name:["Download", "ダウンロード", "Télécharge", "Download", "Download", "Descarga", "다운로드"],
        desc:["Adjusts power according to the foe’s lowest defensive stat."]
    },
    {
        name:["Iron Fist", "てつのこぶし", "Poing de Fer", "Eisenfaust", "Ferropugno", "Puño Férreo", "철주먹"],
        desc:["Boosts the power of punching moves."]
    },
    {
        name:["Poison Heal", "ポイズンヒール", "Soin Poison", "Aufheber", "Velencura", "Antídoto", "포이즌힐"],
        desc:["Restores HP if the Pokémon is poisoned."]
    },
    {
        name:["Adaptability", "てきおうりょく", "Adaptabilité", "Anpassung", "Adattabilità", "Adaptable", "적응력"],
        desc:["Powers up moves of the same type."]
    },
    {
        name:["Skill Link", "スキルリンク", "Multi-Coups", "Wertelink", "Abillegame", "Encadenado", "스킬링크"],
        desc:["Increases the frequency of multi-strike moves."]
    },
    {
        name:["Hydration", "うるおいボディ", "Hydratation", "Hydration", "Idratazione", "Hidratación", "촉촉바디"],
        desc:["Heals status problems if it is raining."]
    },
    {
        name:["Solar Power", "サンパワー", "Force Soleil", "Solarkraft", "Solarpotere", "Poder Solar", "선파워"],
        desc:["Boosts Sp. Atk", "but lowers HP in sunshine."]
    },
    {
        name:["Quick Feet", "はやあし", "Pied Véloce", "Rasanz", "Piedisvelti", "Pies Rápidos", "속보"],
        desc:["Boosts Speed if there is a status problem."]
    },
    {
        name:["Normalize", "ノーマルスキン", "Normalise", "Regulierung", "Normalità", "Normalidad", "노말스킨"],
        desc:["All the Pokémon’s moves become Normal type."]
    },
    {
        name:["Sniper", "スナイパー", "Sniper", "Superschütze", "Cecchino", "Francotirador*", "스나이퍼"],
        desc:["Powers up moves if they become critical hits."]
    },
    {
        name:["Magic Guard", "マジックガード", "Garde Magik", "Magieschild", "Magicscudo", "Muro Mágico", "매직가드"],
        desc:["The Pokémon only takes damage from attacks."]
    },
    {
        name:["No Guard", "ノーガード", "Annule Garde", "Schildlos", "Nullodifesa", "Indefenso", "노가드"],
        desc:["Ensures the Pokémon and its foe’s attacks land."]
    },
    {
        name:["Stall", "あとだし", "Frein", "Zeitspiel", "Rallentatore", "Rezagado", "시간벌기"],
        desc:["The Pokémon moves after even slower foes."]
    },
    {
        name:["Technician", "テクニシャン", "Technicien", "Techniker", "Tecnico", "Experto", "테크니션"],
        desc:["Powers up the Pokémon’s weaker moves."]
    },
    {
        name:["Leaf Guard", "リーフガード", "Feuille Garde*", "Floraschild", "Fogliamanto", "Defensa Hoja", "리프가드"],
        desc:["Prevents status problems in sunny weather."]
    },
    {
        name:["Klutz", "ぶきよう", "Maladresse", "Tollpatsch", "Impaccio", "Zoquete", "서투름"],
        desc:["The Pokémon can’t use any held items."]
    },
    {
        name:["Mold Breaker", "かたやぶり", "Brise Moule", "Überbrückung", "Rompiforma", "Rompemoldes", "틀깨기"],
        desc:["Moves can be used regardless of Abilities."]
    },
    {
        name:["Super Luck", "きょううん", "Chanceux", "Glückspilz", "Supersorte", "Afortunado", "대운"],
        desc:["Heightens the critical-hit ratios of moves."]
    },
    {
        name:["Aftermath", "ゆうばく", "Boom Final", "Finalschlag", "Scoppio", "Resquicio", "유폭"],
        desc:["Damages the foe landing the finishing hit."]
    },
    {
        name:["Anticipation", "きけんよち", "Anticipation", "Vorahnung", "Presagio", "Anticipación", "위험예지"],
        desc:["Senses the foe’s dangerous moves."]
    },
    {
        name:["Forewarn", "よちむ", "Prédiction", "Vorwarnung", "Premonizione", "Alerta", "예지몽"],
        desc:["Determines what moves the foe has."]
    },
    {
        name:["Unaware", "てんねん", "Inconscient", "Unkenntnis", "Imprudenza", "Ignorante", "천진"],
        desc:["Ignores any change in stats by the foe."]
    },
    {
        name:["Tinted Lens", "いろめがね", "Lentiteintée", "Aufwertung", "Lentifumé", "Cromolente", "색안경"],
        desc:["Powers up “not very effective” moves."]
    },
    {
        name:["Filter", "フィルター", "Filtre", "Filter", "Filtro", "Filtro", "필터"],
        desc:["Powers down supereffective moves."]
    },
    {
        name:["Slow Start", "スロースタート", "Début Calme", "Saumselig", "Lentoinizio", "Inicio Lento", "슬로스타트"],
        desc:["Temporarily halves Attack and Speed."]
    },
    {
        name:["Scrappy", "きもったま", "Querelleur", "Rauflust", "Nervisaldi", "Intrépido", "배짱"],
        desc:["Enables moves to hit Ghost-type foes."]
    },
    {
        name:["Storm Drain", "よびみず", "Lavabo", "Sturmsog", "Acquascolo", "Colector", "마중물"],
        desc:["The Pokémon draws in all Water-type moves."]
    },
    {
        name:["Ice Body", "アイスボディ", "Corps Gel", "Eishaut", "Corpogelo", "Gélido", "아이스바디"],
        desc:["The Pokémon regains HP in a hailstorm."]
    },
    {
        name:["Solid Rock", "ハードロック", "Solide Roc", "Felskern", "Solidroccia", "Roca Sólida", "하드록"],
        desc:["Powers down supereffective moves."]
    },
    {
        name:["Snow Warning", "ゆきふらし", "Alerte Neige", "Hagelalarm", "Scendineve", "Nevada", "눈퍼뜨리기"],
        desc:["The Pokémon summons a hailstorm in battle."]
    },
    {
        name:["Honey Gather", "みつあつめ", "Cherche Miel", "Honigmaul", "Mielincetta", "Recogemiel", "꿀모으기"],
        desc:["The Pokémon may gather Honey from somewhere."]
    },
    {
        name:["Frisk", "おみとおし", "Fouille", "Schnüffler", "Indagine", "Cacheo", "통찰"],
        desc:["The Pokémon can check the foe’s held item."]
    },
    {
        name:["Reckless", "すてみ", "Téméraire", "Achtlos", "Temerarietà", "Audaz", "이판사판"],
        desc:["Powers up moves that have recoil damage."]
    },
    {
        name:["Multitype", "マルチタイプ", "Multi-Type", "Variabilität", "Multitipo", "Multitipo", "멀티타입"],
        desc:["Changes type to match the held Plate."]
    },
    {
        name:["Flower Gift", "フラワーギフト", "Don Floral", "Pflanzengabe", "Regalfiore", "Don Floral", "플라워기프트"],
        desc:["Powers up party Pokémon when it is sunny."]
    },
    {
        name:["Bad Dreams", "ナイトメア", "Mauvais Rêve", "Alptraum", "Sogniamari", "Mal Sueño", "나이트메어"],
        desc:["Reduces a sleeping foe’s HP."]
    },
    {
        name:["Pickpocket", "わるいてぐせ", "Pickpocket", "Langfinger", "Arraffalesto", "Hurto", "나쁜손버릇"],
        desc:["Steals attacking Pokémon's held item on contact."]
    },
    {
        name:["Sheer Force", "ちからずく", "Sans Limite", "Rohe Gewalt", "Forzabruta", "Potencia Bruta*", "우격다짐"],
        desc:["Strengthens moves with extra effects to 1.3× their power", "but prevents their extra effects."]
    },
    {
        name:["Contrary", "あまのじゃく", "Contestation", "Umkehrung", "Inversione", "Respondón", "심술꾸러기"],
        desc:["Inverts stat modifiers."]
    },
    {
        name:["Unnerve", "きんちょうかん", "Tension", "Anspannung", "Agitazione", "Nerviosismo", "긴장감"],
        desc:["Prevents opposing Pokémon from eating held Berries."]
    },
    {
        name:["Defiant", "まけんき", "Acharné", "Siegeswille", "Agonismo", "Competitivo", "오기"],
        desc:["Raises Attack two stages upon having any stat lowered."]
    },
    {
        name:["Defeatist", "よわき", "Défaitiste", "Schwächling", "Sconforto", "Flaqueza", "무기력"],
        desc:["Halves Attack and Special Attack below 50% HP."]
    },
    {
        name:["Cursed Body", "のろわれボディ", "Corps Maudit", "Tastfluch", "Corpofunesto", "Cuerpo Maldito*", "저주받은바디"],
        desc:["Has a 30% chance of Disabling any move that hits the Pokémon."]
    },
    {
        name:["Healer", "いやしのこころ", "Cœur Soin", "Heilherz", "Curacuore", "Alma Cura", "치유의마음"],
        desc:["Has a 30% chance of curing each adjacent ally of any major status ailment after each turn."]
    },
    {
        name:["Friend Guard", "フレンドガード", "Garde Amie", "Freundeshut", "Amicoscudo", "Compiescolta", "프렌드가드"],
        desc:["Decreases damage inflicted against ally Pokémon."]
    },
    {
        name:["Weak Armor", "くだけるよろい", "Armurouillée", "Bruchrüstung", "Sottilguscio", "Armadura Frágil*", "깨어진갑옷"],
        desc:["Raises Speed and lowers Defense by one stage each upon being hit by any move."]
    },
    {
        name:["Heavy Metal", "ヘヴィメタル", "Heavy Metal", "Schwermetall", "Metalpesante", "Metal Pesado*", "헤비메탈"],
        desc:["Doubles the Pokémon's weight."]
    },
    {
        name:["Light Metal", "ライトメタル", "Light Metal", "Leichtmetall", "Metalleggero", "Metal Liviano*", "라이트메탈"],
        desc:["Halves the Pokémon's weight."]
    },
    {
        name:["Multiscale", "マルチスケイル", "Multiécaille", "Multischuppe", "Multisquame", "Compensación", "멀티스케일"],
        desc:["Halves damage taken from full HP."]
    },
    {
        name:["Toxic Boost", "どくぼうそう", "Rage Poison", "Giftwahn", "Velenimpeto", "Ímpetu Tóxico*", "독폭주"],
        desc:["Increases Attack to 1.5× when poisoned."]
    },
    {
        name:["Flare Boost", "ねつぼうそう", "Rage Brûlure", "Hitzewahn", "Bruciaimpeto", "Ímpetu Ardiente*", "열폭주"],
        desc:["Increases Special Attack to 1.5× when burned."]
    },
    {
        name:["Harvest", "しゅうかく", "Récolte", "Reiche Ernte", "Coglibacche", "Cosecha", "수확"],
        desc:["Sometimes restores a consumed Berry."]
    },
    {
        name:["Telepathy", "テレパシー", "Télépathe", "Telepathie", "Telepatia", "Telepatía", "텔레파시"],
        desc:["Protects against damaging moves from friendly Pokémon."]
    },
    {
        name:["Moody", "ムラっけ", "Lunatique", "Gefühlswippe", "Altalena", "Veleta", "변덕쟁이"],
        desc:["Raises a random stat two stages and lowers another one stage after each turn."]
    },
    {
        name:["Overcoat", "ぼうじん", "Envelocape", "Wetterfest", "Copricapo", "Funda", "방진"],
        desc:["Protects against damage from weather."]
    },
    {
        name:["Poison Touch", "どくしゅ", "Toxitouche", "Giftgriff", "Velentocco", "Toque Tóxico", "독수"],
        desc:["Has a 30% chance of poisoning Pokémon upon contact when attacking."]
    },
    {
        name:["Regenerator", "さいせいりょく", "Régé-Force", "Belebekraft", "Rigenergia", "Regeneración", "재생력"],
        desc:["Heals for 1/3 max HP upon leaving battle."]
    },
    {
        name:["Big Pecks", "はとむね", "Cœur de Coq", "Brustbieter", "Pettinfuori", "Sacapecho", "부풀린가슴"],
        desc:["Protects the Pokémon from Defense-lowering attacks."]
    },
    {
        name:["Sand Rush", "すなかき", "Baigne Sable", "Sandscharrer", "Remasabbia", "Ímpetu Arena", "모래헤치기"],
        desc:["Doubles Speed during a sandstorm."]
    },
    {
        name:["Wonder Skin", "ミラクルスキン", "Peau Miracle", "Wunderhaut", "Splendicute", "Piel Milagro", "미라클스킨"],
        desc:["Has a 50% chance of protecting against non-damaging moves that inflict major status ailments."]
    },
    {
        name:["Analytic", "アナライズ", "Analyste", "Analyse", "Ponderazione", "Cálculo Final*", "애널라이즈"],
        desc:["Strengthens moves when moving last."]
    },
    {
        name:["Illusion", "イリュージョン", "Illusion", "Trugbild", "Illusione", "Ilusión", "일루전"],
        desc:["Takes the appearance of the last conscious party Pokémon upon being sent out until hit by a damaging move."]
    },
    {
        name:["Imposter", "かわりもの", "Imposteur", "Doppelgänger", "Sosia", "Impostor", "괴짜"],
        desc:["Transforms upon entering battle."]
    },
    {
        name:["Infiltrator", "すりぬけ", "Infiltration", "Schwebedurch", "Intrapasso", "Allanamiento", "틈새포착"],
        desc:["Ignores Light Screen", "Reflect", "and Safeguard."]
    },
    {
        name:["Mummy", "ミイラ", "Momie", "Mumie", "Mummia", "Momia", "미라"],
        desc:["Contact with this Pokémon spreads this Ability."]
    },
    {
        name:["Moxie", "じしんかじょう", "Impudence", "Hochmut", "Arroganza", "Autoestima", "자기과신"],
        desc:["Raises Attack one stage upon KOing a Pokémon."]
    },
    {
        name:["Justified", "せいぎのこころ", "Cœur Noble", "Redlichkeit", "Giustizia", "Justiciero", "정의의마음"],
        desc:["Raises Attack when hit by Dark-type moves."]
    },
    {
        name:["Rattled", "びびり", "Phobique", "Hasenfuß", "Paura", "Cobardía", "주눅"],
        desc:["Raises Speed one stage upon being hit by a Dark", "Ghost", "or Bug move."]
    },
    {
        name:["Magic Bounce", "マジックミラー", "Miroir Magik", "Magiespiegel", "Magispecchio", "Espejo Mágico*", "매직미러"],
        desc:["Reflects most non-damaging moves back at their user."]
    },
    {
        name:["Sap Sipper", "そうしょく", "Herbivore", "Vegetarier", "Mangiaerba", "Herbívoro", "초식"],
        desc:["Absorbs Grass moves", "raising Attack one stage."]
    },
    {
        name:["Prankster", "いたずらごころ", "Farceur", "Strolch", "Burla", "Bromista", "짓궂은마음"],
        desc:["Raises non-damaging moves' priority by one stage."]
    },
    {
        name:["Sand Force", "すなのちから", "Force Sable", "Sandgewalt", "Silicoforza", "Poder Arena", "모래의힘"],
        desc:["Strengthens Rock", "Ground", "and Steel moves to 1.3× their power during a sandstorm."]
    },
    {
        name:["Iron Barbs", "てつのトゲ", "Épine de Fer", "Eisenstachel", "Spineferrate", "Punta Acero", "철가시"],
        desc:["Damages attacking Pokémon for 1/8 their max HP on contact."]
    },
    {
        name:["Zen Mode", "ダルマモード", "Mode Transe", "Trance-Modus", "Stato Zen", "Modo Daruma", "달마모드"],
        desc:["Changes the Pokémon's shape when HP is halved."]
    },
    {
        name:["Victory Star", "しょうりのほし", "Victorieux", "Triumphstern", "Vittorstella", "Tinovictoria", "승리의별"],
        desc:["Raises moves' accuracy to 1.1× for friendly Pokémon."]
    },
    {
        name:["Turboblaze", "ターボブレイズ", "TurboBrasier", "Turbobrand", "Piroturbina", "Turbollama", "터보블레이즈"],
        desc:["Moves can be used regardless of Abilities."]
    },
    {
        name:["Teravolt", "テラボルテージ", "Téra-Voltage", "Teravolt", "Teravolt", "Terravoltaje", "테라볼티지"],
        desc:["Moves can be used regardless of Abilities."]
    },
    {
        name:["Aroma Veil", "アロマベール", "Aroma-Voile", "Dufthülle", "Aromavelo", "Velo Aroma", "아로마베일"],
        desc:["Protects allies from attacks that limit their move choices."]
    },
    {
        name:["Flower Veil", "フラワーベール", "Flora-Voile", "Blütenhülle", "Fiorvelo", "Velo Flor", "플라워베일"],
        desc:["Prevents lowering of ally Grass-type Pokémon's stats."]
    },
    {
        name:["Cheek Pouch", "ほおぶくろ", "Bajoues", "Backentaschen", "Guancegonfie", "Carrillo", "볼주머니"],
        desc:["Restores HP as well when the Pokémon eats a Berry."]
    },
    {
        name:["Protean", "へんげんじざい", "Protéen", "Wandlungskunst", "Mutatipo", "Mutatipo", "변환자재"],
        desc:["Changes the Pokémon's type to the same type of the move it is using."]
    },
    {
        name:["Fur Coat", "ファーコート", "Toison Épaisse", "Fellkleid", "Foltopelo", "Pelaje Recio", "퍼코트"],
        desc:["Halves damage from physical moves."]
    },
    {
        name:["Magician", "マジシャン", "Magicien", "Zauberer", "Prestigiatore", "Prestidigitador", "매지션"],
        desc:["The Pokémon steals the held item of a Pokémon it hits with a move."]
    },
    {
        name:["Bulletproof", "ぼうだん", "Pare-Balles", "Kugelsicher", "Antiproiettile", "Antibalas", "방탄"],
        desc:["Protects the Pokémon from some ball and bomb moves."]
    },
    {
        name:["Competitive", "かちき", "Battant", "Unbeugsamkeit", "Tenacia", "Tenacidad", "승기"],
        desc:["Boosts the Sp.Atk stat when a stat is lowered."]
    },
    {
        name:["Strong Jaw", "がんじょうあご", "Prognathe", "Titankiefer", "Ferromascella", "Mandíbula Fuerte", "옹골찬턱"],
        desc:["The Pokémon's strong jaw gives it tremendous biting power."]
    },
    {
        name:["Refrigerate", "フリーズスキン", "Peau Gelée", "Frostschicht", "Pellegelo", "Piel Helada", "프리즈스킨"],
        desc:["Normal-type moves become Ice-type moves."]
    },
    {
        name:["Sweet Veil", "スイートベール", "Gluco-Voile", "Zuckerhülle", "Dolcevelo", "Velo Dulce", "스위트베일"],
        desc:["Prevents itself and its allies from falling asleep."]
    },
    {
        name:["Stance Change", "バトルスイッチ", "Déclic Tactique", "Taktikwechsel", "Accendilotta", "Cambio Táctico", "배틀스위치"],
        desc:["The Pokémon changes form depending on how it battles."]
    },
    {
        name:["Gale Wings", "はやてのつばさ", "Ailes Bourrasque", "Orkanschwingen", "Aliraffica", "Alas Vendaval", "질풍날개"],
        desc:["Gives priority to Flying-type moves."]
    },
    {
        name:["Mega Launcher", "メガランチャー", "Méga Blaster", "Megawumme", "Megalancio", "Megadisparador", "메가런처"],
        desc:["Powers up aura and pulse moves."]
    },
    {
        name:["Grass Pelt", "くさのけがわ", "Toison Herbue", "Pflanzenpelz", "Peloderba", "Manto Frondoso", "풀모피"],
        desc:["Boosts the Defense stat in Grassy Terrain."]
    },
    {
        name:["Symbiosis", "きょうせい", "Symbiose", "Nutznießer", "Simbiosi", "Simbiosis", "공생"],
        desc:["The Pokémon can pass an item to an ally."]
    },
    {
        name:["Tough Claws", "かたいツメ", "Griffe Dure", "Krallenwucht", "Unghiedure", "Garra Dura", "단단한"],
        desc:["Powers up moves that make direct contact."]
    },
    {
        name:["Pixilate", "フェアリースキン", "Peau Féérique", "Feenschicht", "Pellefolletto", "Piel Feérica", "페어리스킨"],
        desc:["Normal-type moves become Fairy-type moves."]
    },
    {
        name:["Gooey", "ぬめぬめ", "Poisseux", "Viskosität", "Viscosità", "Baba", "미끈미끈"],
        desc:["Contact with the Pokémon lowers the attacker's Speed stat."]
    },
    {
        name:["Aerilate", "スカイスキン", "Peau Céleste", "Zenithaut", "Pellecielo", "Piel Celeste", "스카이스킨"],
        desc:["Normal-type moves become Flying-type moves."]
    },
    {
        name:["Parental Bond", "おやこあい", "Amour Filial", "Familienbande", "Amorefiliale", "Amor Filial", "부자유친"],
        desc:["Parent and child attack together."]
    },
    {
        name:["Dark Aura", "ダークオーラ", "Aura Ténébreuse", "Dunkelaura", "Auratetra", "Aura Oscura", "다크오라"],
        desc:["Powers up each Pokémon's Dark-type moves."]
    },
    {
        name:["Fairy Aura", "フェアリーオーラ", "Aura Féerique", "Feenaura", "Aurafolletto", "Aura Feérica", "페어리오라"],
        desc:["Powers up each Pokémon's Fairy-type moves."]
    },
    {
        name:["Aura Break", "オーラブレイク", "Aura Inversée", "Aura-Umkehr", "Frangiaura", "Rompeaura", "오라브레이크"],
        desc:["The effects of "Aura" Abilities are reversed."]
    },
    {
        name:["Primordial Sea", "はじまりのうみ", "Mer Primaire", "Urmeer", "Mare Primordiale", "Mar del Albor", "시작의바다"],
        desc:["Causes heavy rain."]
    },
    {
        name:["Desolate Land", "おわりのだいち", "Terre Finale", "Endland", "Terra Estrema", "Tierra del Ocaso", "끝의대지"],
        desc:["Creates harsh sunlight."]
    },
    {
        name:["Delta Stream", "デルタストリーム", "Souffle Delta", "Delta-Wind", "Flusso Delta", "Ráfaga Delta", "델타스트림"],
        desc:["Eliminates weather effects and eliminates weaknesses of Flying-type Pokémon."]
    }
];