/*
FLAG GUIDE:

price : 100,    //  If this item is able to be sold at shops
held : true,    //  If this item is able to be held
sticky : true,  //  If this item cannot be knock off
mega : {        //  If this item allows Mega Evolution
    from : id,
    to : [object Pokedex] instance of the alternate form
}

*/

//  TODO: Fetch prices, machine moves


//  TODO: Old Gateau is missing international names
//  TODO: Fetch descriptions


var HealMessage = [" restored health."];
var ItemDex = [

    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Master Ball", "マスターボール", "Master Ball", "Meisterball", "Master Ball", "Master Ball", "마스터볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Ultra Ball", "ハイパーボール", "Hyper Ball", "Hyperball", "Ultra Ball", "Ultraball", "하이퍼볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Great Ball", "スーパーボール", "Super Ball", "Superball", "Mega Ball", "Superball", "수퍼볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Poké Ball", "モンスターボール", "Poké Ball", "Pokéball", "Poké Ball", "Poké Ball", "몬스터볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Safari Ball", "サファリボール", "Safari Ball", "Safariball", "Safari Ball", "Safari Ball", "사파리볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Net Ball", "ネットボール", "Filet Ball", "Netzball", "Rete Ball", "Malla Ball", "넷트볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dive Ball", "ダイブボール", "Scuba Ball", "Tauchball", "Sub Ball", "Buceo Ball", "다이브볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Nest Ball", "ネストボール", "Faiblo Ball", "Nestball", "Minor Ball", "Nido Ball", "네스트볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Repeat Ball", "リピートボール", "Bis Ball", "Wiederball", "Bis Ball", "Acopio Ball", "리피드볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Timer Ball", "タイマーボール", "Chrono Ball", "Timerball", "Timer Ball", "Turno Ball", "타이마볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Luxury Ball", "ゴージャスボール", "Luxe Ball", "Luxusball", "Chich Ball", "Lujo Ball", "럭셔리볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Premier Ball", "プレミアボール", "Honor Ball", "Premierball", "Premier Ball", "Honor Ball", "프레미어볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dusk Ball", "ダークボール", "Sombre Ball", "Finsterball", "Scuro Ball", "Ocaso Ball", "다크볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Heal Ball", "ヒールボール", "Soin Ball", "Heilball", "Cura Ball", "Sana Ball", "힐볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Quick Ball", "クイックボール", "Rapide Ball", "Flottball", "Velox Ball", "Veloz Ball", "퀵볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Cherish Ball", "プレジャスボール", "Mémoire Ball", "Jubelball", "Pregio Ball", "Gloria Ball", "프레셔스볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Potion", "キズぐすり", "Potion", "Trank", "Pozione", "Poción", "상처약"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(20);
        }
    },
    {
        name:["Antidote", "どくけし", "Antidote", "Gegengift", "Antidoto", "Antídoto", "해독제"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status == 1 || user.status == 2;
        },
        use : function (user) {
            user.cureStatus();
        }
    },
    {
        name:["Burn Heal", "やけどなおし", "Anti-Brûle", "Feuerheiler", "Antiscottatura", "Antiquemar", "화상치료제"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status == 3;
        },
        use : function (user) {
            user.cureStatus();
        }
    },
    {
        name:["Ice Heal", "こおりなおし", "Antigel", "Eisheiler", "Antigelo", "Antihielo", "얼음상태치료제"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status == 4;
        },
        use : function (user) {
            user.cureStatus();
        }
    },
    {
        name:["Awakening", "ねむけざまし", "Reveil", "Aufwecker", "Sveglia", "Despertar", "잠깨는약"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status == 5;
        },
        use : function (user) {
            user.cureStatus();
        }
    },
    {
        name:["Paralyze Heal", "まひなおし", "Anti-Para", "Para-Heiler", "Antiparalisi", "Antiparalizador", "마비치료제"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status == 6;
        },
        use : function (user) {
            user.cureStatus();
        }
    },
    {
        name:["Full Restore", "かいふくのくすり", "Guerison", "Top-Genesung", "Ricarica Totale", "Restaurar Todo", "회복약"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status != 0 && user.status < 7
                || user.health < user.stats[0];
        },
        use : function (user) {
            if (user.status !=0 && user.status < 7) {
                user.cureStatus();
            }
            user.restore(user.stats[0]);
        }
    },
    {
        name:["Max Potion", "まんたんのくすり", "Potion Max", "Top-Trank", "Pozione Max", "Máxima Poción", "풀회복약"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(user.stats[0]);
        }
    },
    {
        name:["Hyper Potion", "すごいキズぐすり", "Hyper Potion", "Hypertrank", "Iperpozione", "Hiperpoción", "고급상처약"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(200);
        }
    },
    {
        name:["Super Potion", "いいキズぐすり", "Super Potion", "Supertrank", "Super Pozione", "Superpoción", "좋은상처약"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(50);
        }
    },
    {
        name:["Full Heal", "なんでもなおし", "Total Soin", "Hyperheiler", "Cura Totale", "Cura Total", "만병통치약"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status != 0 && user.status < 7;
        },
        use : function (user) {
            user.cureStatus();
        }
    },
    {
        name:["Revive", "げんきのかけら", "Rappel", "Beleber", "Revitalizzante", "Revivir", "기력의조각"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status == 7;
        },
        use : function (user) {
            user.cureStatus();
            user.restore(user.stats[0] / 2);
        }
    },
    {
        name:["Max Revive", "げんきのかたまり", "Rappel Max", "Top-Beleber", "Revitalizzante Max", "Revivir Máximo", "기력의덩어리"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status == 7;
        },
        use : function (user) {
            user.cureStatus();
            user.restore(user.stats[0]);
        }
    },
    {
        name:["Fresh Water", "おいしいみず", "Eau Fraiche", "Tafelwasser", "Acqua Fresca", "Agua Fresca", "맛있는물"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(50);
        }
    },
    {
        name:["Soda Pop", "サイコソーダ", "Soda Cool", "Sprudel", "Gazzosa", "Refresco", "미네랄사이다"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(60);
        }
    },
    {
        name:["Lemonade", "ミックスオレ", "Limonade", "Limonade", "Lemonsucco", "Limonada", "후르츠밀크"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(80);
        }
    },
    {
        name:["Moomoo Milk", "モーモーミルク", "Lait Meumeu", "Kuhmuh-Milch", "Latte Mumu", "Leche Mu-Mu", "튼튼밀크"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(100);
        }
    },
    {
        name:["Energy Powder", "ちからのこな", "Poudrénergie", "Energiestaub", "Polvenergia", "Polvo Energía", "힘의가루"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(50);
            user.modFrienship(-5);
        }
    },
    {
        name:["Energy Root", "ちからのねっこ", "Racinénergie", "Kraftwurzel", "Radicenergia", "Raíz Energía", "힘의뿌리"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.health < user.stats[0];
        },
        use : function (user) {
            user.restore(50);
            user.modFrienship(-10);
        }
    },
    {
        name:["Heal Powder", "ばんのうごな", "Poudre Soin", "Heilpuder", "Polvocura", "Polvo Curación", "만능가루"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status != 0 && user.status < 7;
        },
        use : function (user) {
            user.cureStatus();
            user.modFrienship(-5);
        }
    },
    {
        name:["Revival Herb", "ふっかつそう", "Herbe Rappel", "Vitalkraut", "Vitalerba", "Hierba Revivir", "부활 초"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status == 7;
        },
        use : function (user) {
            user.cureStatus();
            user.restore(user.stats[0]);
            user.modFriendship(-15);
        }
    },
    {
        name:["Ether", "ピーピーエイド", "Huile", "Äther", "Etere", "Éter", "ＰＰ에이드"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Max Ether", "ピーピーリカバー", "Huile Max", "Top-Äther", "Etere Max", "Éter Máximo", "ＰＰ회복"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Elixir", "ピーピーエイダー", "Elixir", "Elixier", "Elisir", "Elixir", "ＰＰ에이더"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Max Elixir", "ピーピーマックス", "Max Elixir", "Top-Elixier", "Elisir Max", "Elixir Máximo", "ＰＰ맥스"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Lava Cookie", "フエンせんべい", "Lava Cookie", "Lavakeks", "Lavottino", "Galleta Lava", "용암전병"],
        desc:[],
        pocket:"Medicine",
        canUse : function (user) {
            return user.status != 0 && user.status < 7;
        },
        use : function (user) {
            user.cureStatus();
        }
    },
    {
        name:["Berry Juice", "きのみジュース", "Jus De Baie", "Beerensaft", "Succo di Bacca", "Zumo de Baya", "나무열매쥬스"],
        desc:[],
        pocket:"Medicine",
        held : true,
        activeAfterTakeDamage : function (user) {
            if (user.health <= user.stats[0] / 2) {
                user.restore(20);
            }
        }
    },
    {
        name:["Sacred Ash", "せいなるはい", "Cendresacrée", "Zauberasche", "Magicenere", "Ceniza Sagrada", "성스러운분말"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["HP Up", "マックスアップ", "PV Plus", "KP-Plus", "PS-Su", "Más PS", "맥스업"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Protein", "タウリン", "Proteine", "Protein", "Proteina", "Proteína", "타우린"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Iron", "ブロムヘキシン", "Fer", "Eisen", "Ferro", "Hierro", "사포닌"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Carbos", "インドメタシン", "Carbone", "Carbon", "Carburante", "Carburante", "알칼로이드"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Calcium", "リゾチウム", "Calcium", "Kalzium", "Calcio", "Calcio", "리보플라빈"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Rare Candy", "ふしぎなアメ", "Super Bonbon", "Sonderbonbon", "Caramella Rara", "Carameloraro", "이상한사탕"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["PP Up", "ポイントアップ", "PP Plus", "AP-Plus", "PP-Su", "Más PP", "포인트 업"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Zinc", "キトサン", "Zinc", "Zink", "Zinco", "Zinc", "키토산"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["PP Max", "ポイントマックス", "PP Max", "AP-Top", "PP-Max", "PP Máximos", "포인트 맥스"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Old Gateau", "もりのヨウカン", "", "", "", "", ""],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Guard Spec.", "エフェクトガード", "Defense Spec", "Megablock", "Superguardia", "Protec. Esp.", "이펙트가드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dire Hit", "クリティカット", "Muscle +", "Angriffplus", "Supercolpo", " Directo", "크리티컬커터"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Attack", "プラスパワー", "Attaque +", "X-Angriff", "Attacco X", "Ataque X", "플러스파워"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Defense", "ディフェンダー", "Defense +", "X-Abwehr", "Difesa X", "Defensa X", "디펜드업"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Speed", "スピーダー", "Vitesse +", "X-Tempo", "Velocità X", "Velocidad X", "스피드업"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Accuracy", "ヨクアタール", "Precision +", "X-Treffer", "Precisione X", "Precisión X", "잘-맞히기"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Sp. Atk", "スペシャルアップ", "Special +", "X-Spezial", "Special X", "Especial X", "스페셜업"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Sp. Def", "スペシャルガード", "Def. Spé. +", "X-SpezialVer", "Dif. Sp. X", "Def. Esp. X", "스페셜가드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Poké Doll", "ピッピにんぎょう", "Poképoupee", "Poképuppe", "Pokébambola", "Poké Muñeco", "삐삐인형"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Fluffy Tail", "エネコのシッポ", "Queue Skitty", "Eneco-Rute", "Coda Skitty", "Cola Skitty", "에나비꼬리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Blue Flute", "あおいビードロ", "Flute Bleue", "Blaue Flöte", "Flauto Blu", "Flauta Azul", "파랑비드로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Yellow Flute", "きいろビードロ", "Flute Jaune", "Gelbe Flöte", "Flauto Giallo", "Flauta Amarilla", "노랑비드로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Red Flute", "あかいビードロ", "Flute Rouge", "Rote Flöte", "Flauto Rosso", "Flauta Roja", "빨강비드로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Black Flute", "くろいビードロ", "Flute Noire", "Schw. Flöte", "Flauto Nero", "Flauta Negra", "검정비드로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["White Flute", "しろいビードロ", "Fluteblanche", "Weisse Flöte", "Flauto Bianco", "Flauta Blanca", "하양비드로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Shoal Salt", "あさせのしお", "Sel Trefonds", "Küstensalz", "Sale Ondoso", "Sal Cardumen", "여울소금"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Shoal Shell", "あさせのかいがら", "Co. Trefonds", "Küstenschale", "Gusciondoso", "Concha Cardumen", "여울조개껍질"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Red Shard", "あかいかけら", "Tesson Rouge", "Purpurstück", "Coccio Rosso", "Parte Roja", "빨강조각"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Blue Shard", "あおいかけら", "Tesson Bleu", "Indigostück", "Coccio Blu", "Parte Azul", "파랑조각"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Yellow Shard", "きいろいかけら", "Tesson Jaune", "Gelbstück", "Coccio Giallo", "Parte Amarilla", "노랑조각"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Green Shard", "みどりのかけら", "Tesson Vert", "Grünstück", "Coccio Verde", "Parte Verde", "초록조각"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Super Repel", "シルバースプレー", "Superepousse", "Superschutz", "Superrepellente", "Superrepelente", "실버스프레이"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Max Repel", "ゴールドスプレー", "Max Repousse", "Top-Schutz", "Repellente Max", "Máximo Repelente", "골드스프레이"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Escape Rope", "あなぬけのヒモ", "Corde Sortie", "Fluchtseil", "Fune Di Fuga", "Cuerda Huida", "동굴탈출로프"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Repel", "むしよけスプレー", "Repousse", "Schutz", "Repellente", "Repelente", "벌레회피스프레이"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sun Stone", "たいようのいし", "Pierre Soleil", "Sonnenstein", "Pietrasolare", "Piedra Solar", "태양의돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Moon Stone", "つきのいし", "Pierre Lune", "Mondstein", "Pietralunare", "Piedra Lunar", "달의돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Fire Stone", "ほのおのいし", "Pierre Feu", "Feuerstein", "Pietrafocaia", "Piedra Fuego", "불꽃의돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Thunder Stone", "かみなりのいし", "Pierre Foudre", "Donnerstein", "Pietratuono", "Piedra Trueno", "천둥의돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Water Stone", "みずのいし", "Pierre Eau", "Wasserstein", "Pietraidrica", "Piedra Agua", "물의돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Leaf Stone", "リーフのいし", "Pierre Plante", "Blattstein", "Pietrafoglia", "Piedra Hoja", "리프의돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Tiny Mushroom", "ちいさなキノコ", "Petit Champi", "Minipilz", "Piccolo Fungo", "Mini Seta", "작은버섯"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Big Mushroom", "おおきなキノコ", "Gros Champi", "Riesenpilz", "Grande Fungo", "Seta Grande", "큰버섯"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Pearl", "しんじゅ", "Perle", "Perle", "Perla", "Perla", "진주"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Big Pearl", "おおきなしんじゅ", "Grande Perle", "Riesenperle", "Grande Perla", "Perla Grande", "큰진주"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Stardust", "ほしのすな", "Poussière Étoile", "Sternenstaub", "Polvostella", "Polvoestelar", "별의모래"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Star Piece", "ほしのかけら", "Morceau d'Étoile", "Sternenstück", "Pezzo Stella", "Trozo Estrella", "별의조각"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Nugget", "きんのたま", "Pepite", "Nugget", "Pepita", "Pepita", "금구슬"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Heart Scale", "ハートのウロコ", "Écaille Cœur", "Herzschuppe", "Squama Cuore", "Escama Corazón", "하트비늘"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Honey", "あまいミツ", "Miel", "Honig", "Miele", "Miel", "달콤한꿀"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Growth Mulch", "すくすくこやし", "Fertipousse", "Wachsmulch", "Fertilrapido", "Abono Rápido", "무럭무럭비료"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Damp Mulch", "じめじめこやし", "Fertihumide", "Feuchtmulch", "Fertilidro", "Abono Lento", "축축이비료"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Stable Mulch", "ながながこやし", "Fertistable", "Stabilmulch", "Fertilsaldo", "Ab. Fijador", "오래오래비료"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Gooey Mulch", "ねばねばこやし", "Fertiglu", "Neumulch", "Fertilcolla", "Abono Brote", "끈적끈적비료"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Root Fossil", "ねっこのカセキ", "Fossile Racine", "Wurzelfossil", "Radifossile", "Fósil Raíz", "뿌리화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Claw Fossil", "ツメのカセキ", "Fossile Griffe", "Klauenfossil", "Fossilunghia", "Fósil Garra", "발톱화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Helix Fossil", "かいのカセキ", "Fossile Nautile", "Helixfossil", "Helixfossile", "Fósil Helix", "조개화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dome Fossil", "こうらのカセキ", "Fossile Dôme", "Domfossil", "Domofossile", "Fósil Domo", "껍질화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Old Amber", "ひみつのコハク", "Vieil Ambre", "Altbernstein", "Ambra Antica", "Ambar Viejo", "비밀의호박"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Armor Fossil", "たてのカセキ", "Fossile Armure", "Panzerfossil", "Fossilscudo", "Fósil Coraza", "방패의화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Skull Fossil", "ずがいのカセキ", "Fossile Crâne", "Kopffossil", "Fossilcranio", "Fósil Cráneo", "두개의화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Rare Bone", "きちょうなホネ", "Os Rare", "Steinknochen", "Ossopesso", "Hueso Raro", "귀중한뼈"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Shiny Stone", "ひかりのいし", "Pierre Éclat", "Leuchtstein", "Pietrabrillo", "Piedra Día", "빛의돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dusk Stone", "やみのいし", "Pierre Nuit", "Finsterstein", "Neropietra", "Piedra Noche", "어둠의돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dawn Stone", "めざめいし", "Pierre Aube", "Funkelstein", "Pietralbore", "Piedra Alba", "각성의돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Oval Stone", "まんまるいし", "Pierre Ovale", "Ovaler Stein", "Pietraovale", "Piedra Oval", "동글동글돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Odd Keystone", "かなめいし", "Clé de Voûte", "Spiritkern", "Roccianima", "P. Espíritu", "쐐기돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Griseous Orb", "はっきんだま", "Orbe Platiné", "Platinum-Orb", "Grigiosfera", "Griseosfera", "백금옥"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Douse Drive", "アクアカセット", "Module Aqua", "Aquamodul", "Idromodulo", "HidroROM", "아쿠아카세트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Shock Drive", "イナズマカセット", "Module Choc", "Blitzmodul", "Voltmodulo", "FulgoROM", "번개카세트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Burn Drive", "ブレイズカセット", "Module Pyro", "Flammenmodul", "Piromodulo", "PiroROM", "블레이즈카세트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Chill Drive", "フリーズカセット", "Module Cryo", "Gefriermodul", "Gelomodulo", "CrioROM", "프리즈카세트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sweet Heart", "ハートスイーツ", "Chococœur", "Herzkonfekt", "Dolcecuore", "Corazón Dulce", "하트스위트"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Adamant Orb", "こんごうだま", "Orbe Adamant", "Adamant-Orb", "Adamasfera", "Diamansfera", "금강옥"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Lustrous Orb", "しらたま", "Orbe Perlé", "Weiß-Orb", "Splendisfera", "Lustresfera", "백옥"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Greet Mail", "はじめてメール", "Lettre Salut", "Grußbrief", "Mess. Inizio", "C. Inicial", "첫메일"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Favored Mail", "だいすきメール", "Lettre Fan", "Faiblebrief", "Mess. TVB", "C. Favoritos", "애호메일"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["RSVP Mail", "おさそいメール", "Lettre Invit", "Einladebrief", "Mess. Invito", "C. Invitar", "권유메일"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Thanks Mail", "かんしゃメール", "Lettre Merci", "Dankesbrief", "Mess. Grazie", "C. Gracias", "감사메일"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Inquiry Mail", "しつもんメール", "Let. Demande", "Fragebrief", "Mess. Chiedi", "C. Pregunta", "질문메일"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Like Mail", "おすすめメール", "Lettre Avis", "Insiderbrief", "Mess. Sugg.", "C. Gustos", "추천메일"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Reply Mail", "おかえしメール", "Let. Réponse", "Rückbrief", "Mess. Risp.", "C. Respuesta", "답장메일"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Bridge Mail S", "ブリッジメールＳ", "Lettre PontS", "Brückbrief H", "Mess. Frec.", "C. Puente S", "브리지메일S"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Bridge Mail D", "ブリッジメールＨ", "Lettre PontY", "Brückbrief M", "Mess. Libec.", "C. Puente F", "브리지메일M"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Bridge Mail T", "ブリッジメールＣ", "Lettre PontF", "Brückbrief Z", "Mess. Prop.", "C. Puente A", "브리지메일C"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Bridge Mail V", "ブリッジメールＶ", "Lettre PontH", "Brückbrief D", "Mess. Vill.", "C. Puente V", "브리지메일V"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Bridge Mail M", "ブリッジメールＷ", "Lettre PontI", "Brückbrief W", "Mess. Merav.", "C. Puente P", "브리지메일W"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Cheri Berry", "クラボのみ", "Baie Ceriz", "Amrenabeere", "Baccaliegia", "Baya Zreza", "버치열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Chesto Berry", "カゴのみ", "Baie Maron", "Maronbeere", "Baccastagna", "Baya Atania", "유루열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Pecha Berry", "モモンのみ", "Baie Pecha", "Pirsifbeere", "Baccapesca", "Baya Meloc", "복슝열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Rawst Berry", "チーゴのみ", "Baie Fraive", "Fragiabeere", "Baccafrago", "Baya Safre", "복분열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Aspear Berry", "ナナシのみ", "Baie Willia", "Wilbirbeere", "Baccaperina", "Baya Perasi", "배리열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Leppa Berry", "ヒメリのみ", "Baie Mepo", "Jonagobeere", "Baccamela", "Baya Zanama", "과사열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Oran Berry", "オレンのみ", "Baie Oran", "Sinelbeere", "Baccarancia", "Baya Aranja", "오랭열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Persim Berry", "キーのみ", "Baie Kika", "Persimbeere", "Baccaki", "Baya Caquic", "시몬열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Lum Berry", "ラムのみ", "Baie Prine", "Prunusbeere", "Baccaprugna", "Baya Ziuela", "리샘열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Sitrus Berry", "オボンのみ", "Baie Sitrus", "Tsitrubeere", "Baccacedro", "Baya Zidra", "자뭉열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Figy Berry", "フィラのみ", "Baie Figuy", "Giefebeere", "Baccafico", "Baya Higog", "무화열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Wiki Berry", "ウイのみ", "Baie Wiki", "Wikibeere", "Baccaprugna", "Baya Wiki", "위키열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Mago Berry", "マゴのみ", "Baie Mago", "Magobeere", "Baccamango", "Baya Ango", "마고열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Aguav Berry", "バンジのみ", "Baie Gowav", "Gauvebeere", "Baccaguava", "Baya Guaya", "아바열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Iapapa Berry", "イアのみ", "Baie Papaya", "Yapabeere", "Baccapaia", "Baya Pabaya", "파야열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Razz Berry", "ズリのみ", "Baie Framby", "Himmihbeere", "Baccalampon", "Baya Frambu", "라즈열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Bluk Berry", "ブリーのみ", "Baie Remu", "Morbbeere", "Baccamora", "Baya Oram", "블리열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Nanab Berry", "ナナのみ", "Baie Nanab", "Nanabbeere", "Baccabana", "Baya Latano", "나나열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Wepear Berry", "セシナのみ", "Baie Repoi", "Nirbebeere", "Baccapera", "Baya Peragu", "서배열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Pinap Berry", "パイルのみ", "Baie Nanana", "Sananabeere", "Baccananas", "Baya Pinia", "파인열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Pomeg Berry", "ザロクのみ", "Baie Grena", "Granabeere", "Baccagrana", "Baya Grana", "유석열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Kelpsy Berry", "ネコブのみ", "Baie Alga", "Setangbeere", "Baccalga", "Baya Algama", "시마열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Qualot Berry", "タポルのみ", "Baie Qualot", "Qualotbeere", "Baccaloquat", "Baya Ispero", "파비열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Hondew Berry", "ロメのみ", "Baie Lonme", "Honmelbeere", "Baccamelon", "Baya Meluce", "로매열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Grepa Berry", "ウブのみ", "Baie Resin", "Labrusbeere", "Baccauva", "Baya Uvav", "또뽀열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Tamato Berry", "マトマのみ", "Baie Tamato", "Tamotbeere", "Baccamodoro", "Baya Tamate", "토망열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Cornn Berry", "モコシのみ", "Baie Siam", "Saimbeere", "Baccavena", "Baya Mais", "수숙열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Magost Berry", "ゴスのみ", "Baie Mangou", "Magostbeere", "Baccagostan", "Baya Aostan", "고스티열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Rabuta Berry", "ラブタのみ", "Baie Rabuta", "Rabutabeere", "Baccambutan", "Baya Rautan", "라부탐열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Nomel Berry", "ノメルのみ", "Baie Tronci", "Tronzibeere", "Baccalemon", "Baya Monli", "노멜열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Spelon Berry", "ノワキのみ", "Baie Kiwan", "Kiwanbeere", "Baccamelos", "Baya Wikano", "메호키열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Pamtre Berry", "シーヤのみ", "Baie Palma", "Pallmbeere", "Baccapalma", "Baya Plama", "자야열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Watmel Berry", "カイスのみ", "Baie Stekpa", "Wasmelbeere", "Baccacomero", "Baya Sambia", "슈박열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Durin Berry", "ドリのみ", "Baie Durin", "Durinbeere", "Baccadurian", "Baya Rudion", "두리열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Belue Berry", "ベリブのみ", "Baie Myrte", "Myrtilbeere", "Baccartillo", "Baya Andano", "루베열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Occa Berry", "オッカのみ", "Baie Chocco", "Koakobeere", "Baccacao", "Baya Caoca", "오카열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Passho Berry", "イトケのみ", "Baie Pocpoc", "Foepasbeere", "Baccapasflo", "Baya Pasio", "꼬시개열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Wacan Berry", "ソクノのみ", "Baie Parma", "Kerzalberre", "Baccaparmen", "Baya Gualot", "초나열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Rindo Berry", "リンドのみ", "Baie Ratam", "Grindobeere", "Baccarindo", "Baya Tamar", "린드열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Yache Berry", "ヤチェのみ", "Baie Nanone", "Kiroyabeere", "Baccamoya", "Baya Rimoya", "플카열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Chople Berry", "ヨプのみ", "Baie Pomroz", "Rospelbeere", "Baccarosmel", "Baya Pomaro", "로플열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Kebia Berry", "ビアーのみ", "Baie Kébia", "Grarzbeere", "Baccakebia", "Baya Kebia", "으름열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Shuca Berry", "シュカのみ", "Baie Jouca", "Schukebeere", "Baccanaca", "Baya Acardo", "슈캐열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Coba Berry", "バコウのみ", "Baie Cobaba", "Kobabeere", "Baccababa", "Baya Kouba", "바코열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Payapa Berry", "ウタンのみ", "Baie Yapap", "Pyapabeere", "Baccapayapa", "Baya Payapa", "야파열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Tanga Berry", "タンガのみ", "Baie Panga", "Tanigabeere", "Baccaitan", "Baya Yecana", "리체열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Charti Berry", "ヨロギのみ", "Baie Charti", "Chiaribeere", "Baccaciofo", "Baya Alcho", "루미열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Kasib Berry", "カシブのみ", "Baie Sédra", "Zitarzbeere", "Baccacitrus", "Baya Drasi", "수불열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Haban Berry", "ハバンのみ", "Baie Fraigo", "Terirobeere", "Baccahaban", "Baya Anjiro", "하반열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Colbur Berry", "ナモのみ", "Baie Lampou", "Burleobeere", "Baccaxan", "Baya Dillo", "마코열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Babiri Berry", "リリバのみ", "Baie Babiri", "Babiribeere", "Baccababiri", "Baya Baribá", "바리비열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Chilan Berry", "ホズのみ", "Baie Zalis", "Latchibeere", "Baccacinlan", "Baya Chilan", "카리열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Liechi Berry", "チイラのみ", "Baie Lichii", "Lydzibeere", "Baccalici", "Baya Lichi", "치리열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Ganlon Berry", "リュガのみ", "Baie Lingan", "Linganbeere", "Baccalongan", "Baya Gonlan", "용아열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Salac Berry", "カムラのみ", "Baie Sailak", "Salkabeere", "Baccasalak", "Baya Aslac", "캄라열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Petaya Berry", "ヤタピのみ", "Baie Pitaye", "Tahaybeere", "Baccapitaya", "Baya Yapati", "야타비열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Apicot Berry", "ズアのみ", "Baie Abriko", "Apikobeere", "Baccacocca", "Baya Aricoc", "규살열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Lansat Berry", "サンのみ", "Baie Lansat", "Lansatbeere", "Baccalangsa", "Baya Zonlan", "랑사열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Starf Berry", "スターのみ", "Baie Frista", "Krambobeere", "Baccambola", "Baya Arabol", "스타열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Enigma Berry", "ナゾのみ", "Baie Enigma", "Enigmabeere", "Baccaenigma", "Baya Enigma", "의문열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Micle Berry", "ミクルのみ", "Baie Micle", "Wunfrubeere", "Baccaracolo", "Baya Lagro", "미클열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Custap Berry", "イバンのみ", "Baie Chérim", "Eipfelbeere", "Baccacrela", "Baya Chiri", "애슈열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Jaboca Berry", "ジャポのみ", "Baie Jacoba", "Jabocabeere", "Baccajaba", "Baya Jaboca", "자보열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Rowap Berry", "レンブのみ", "Baie Pommo", "Roselbeere", "Baccaroam", "Baya Magua", "애터열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Bright Powder", "ひかりのこな", "Poudre Claire", "Blendpuder", "Luminpolvere", "Polvo Brillo", "반짝가루"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["White Herb", "しろいハーブ", "Herbe Blanche", "Schlohkraut", "Erbachiara", "Hierba Blanca", "하양허브"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Macho Brace", "きょうせいギプス", "Bracelet Macho", "Machoband", "Crescicappa", "Brazal Firme", "교정깁스"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Exp. Share", "がくしゅうそうち", "Multi Exp", "EP-Teiler", "Condividi Esp.", "Repartir Exp.", "학습장치"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Quick Claw", "せんせいのツメ", "Vive Griffe", "Flinkklaue", "Rapidartigli", "Garra Rápida", "선제공격손톱"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Soothe Bell", "やすらぎのすず", "Grelot Zen", "Sanftglocke", "Calmanella", "Campana Alivio", "평온의방울"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Mental Herb", "メンタルハーブ", "Herbe Mental", "Mentalkraut", "Mentalerba", "Hierba Mental", "멘탈허브"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Choice Band", "こだわりハチマキ", "Bandeau Choix", "Wahlband", "Bendascelta", "Cinta Elegida", "구애머리띠"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["King's Rock", "おうじゃのしるし", "Roche Royale", "King-Stein", "Roccia Di Re", "Roca del Rey", "왕의징표석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Silver Powder", "ぎんのこな", "Poudre Argentée", "Silberstaub", "Argenpolvere", "Polvo Plata", "은빛가루"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Amulet Coin", "おまもりこばん", "Piece Rune", "Münzamulett", "Monetamuleto", "Moneda Amuleto", "부적금화"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Cleanse Tag", "きよめのおふだ", "Rune Purifiante", "Schutzband", "Velopuro", "Amuleto", "순결의부적"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Soul Dew", "こころのしずく", "Rosée Âme", "Seelentau", "Cuorugiada", "Rocío Bondad", "마음의물방울"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Deep Sea Tooth", "しんかいのキバ", "Dent Océan", "Abysszahn", "Dente Abissi", "Diente Marino", "심해의이빨"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Deep Sea Scale", "しんかいのウロコ", "Écaille Océan", "Abyssplatte", "Squamabissi", "Escama Marina", "심해의비늘"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Smoke Ball", "けむりだま", "Boule Fumée", "Rauchball", "Palla Fumo", "Bola Humo", "연막탄"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Everstone", "かわらずのいし", "Pierre Stase", "Ewigstein", "Pietrastante", "Piedra Eterna", "변함없는돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Focus Band", "きあいのハチマキ", "Bandeau", "Fokus-Band", "Bandana", "Cinta Focus", "기합의머리띠"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Lucky Egg", "しあわせタマゴ", "Œuf Chance", "Glücks-Ei", "Fortunuovo", "Huevo Suerte", "행복의알"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Scope Lens", "ピントレンズ", "Lentilscope", "Scope-Linse", "Mirino", "Periscopio", "초점렌즈"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Metal Coat", "メタルコート", "Peau Metal", "Metallmantel", "Metalcoperta", "Revest. Metálico", "금속코트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Leftovers", "たべのこし", "Restes", "Überreste", "Avanzi", "Restos", "먹다남은음식"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dragon Scale", "りゅうのウロコ", "Écaille Draco", "Drachenhaut", "Squama Drago", "Escamadragón", "용의비늘"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Light Ball", "でんきだま", "Ballelumiere", "Kugelblitz", "Elettropalla", "Bolaluminosa", "전기구슬"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Soft Sand", "やわらかいすな", "Sable Doux", "Pudersand", "Sabbia Soffice", "Arena Fina", "부드러운모래"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Hard Stone", "かたいいし", "Pierre Dure", "Granitstein", "Pietradura", "Piedra Dura", "딱딱한돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Miracle Seed", "きせきのタネ", "Grain Miracle", "Wundersaat", "Miracolseme", "Semilla Milagro", "기적의씨"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Black Glasses", "くろいメガネ", "Lunettes Noires", "Schattenglas", "Occhialineri", "Gafas de Sol", "검은안경"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Black Belt", "くろおび", "Ceinture Noire", "Schwarzgurt", "Cinturanera", "Cinturón Negro", "검은띠"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Magnet", "じしゃく", "Aimant", "Magnet", "Calamita", "Imán", "자석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Mystic Water", "しんぴのしずく", "Eau Mystique", "Zauberwasser", "Acqua Magica", "Agua Mística", "신비의물방울"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sharp Beak", "するどいくちばし", "Bec Pointu", "Hackattack", "Beccaffilato", "Pico Afilado", "예리한부리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Poison Barb", "どくバリ", "Pic Venin", "Giftstich", "Velenago", "Flecha Venenosa", "독바늘"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Never-Melt Ice", "とけないこおり", "Glace Éternelle", "Ewiges Eis", "Gelomai", "Antiderretir", "녹지않는얼음"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Spell Tag", "のろいのおふだ", "Rune Sort", "Bannsticker", "Spettrotarga", "Hechizo", "저주의부적"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Twisted Spoon", "まがったスプーン", "Cuiller Tordue", "Krümmlöffel", "Cucchiaio Torto", "Cuchara Torcida", "휘어진스푼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Charcoal", "もくたん", "Charbon", "Holzkohle", "Carbonella", "Carbón", "목탄"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dragon Fang", "りゅうのキバ", "Croc Dragon", "Drachenzahn", "Dentedidrago", "Colmillo Dragón", "용의이빨"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Silk Scarf", "シルクのスカーフ", "Mouchoir Soie", "Seidenschal", "Sciarpa Seta", "Pañuelo Seda", "실크스카프"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Up-Grade", "アップグレード", "Améliorator", "Up-Grade", "Upgrade", "Mejora", "업그레이드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Shell Bell", "かいがらのすず", "Grelot Coque", "Seegesang", "Conchinella", "Campana Concha", "조개껍질방울"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sea Incense", "うしおのおこう", "Encens Mer", "Seerauch", "Marearoma", "Incienso Marino", "바닷물향로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Lax Incense", "のんきのおこう", "Encens Doux", "Laxrauch", "Distraroma", "Incienso Suave", "무사태평항로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Lucky Punch", "ラッキーパンチ", "Poing Chance", "Lucky Punch", "Fortunpugno", "Puño Suerte", "럭키펀치"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Metal Powder", "メタルパウダー", "Poudre Metal", "Metallstaub", "Metalpolvere", "Polvo Metálico", "금속파우더"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Thick Club", "ふといホネ", "Masse Os", "Kampfknochen", "Ossospesso", "Hueso Grueso", "굵은뼈"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Stick", "ながねぎ", "Baton", "Lauchstange", "Gambo", "Palo", "대파"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Red Scarf", "あかいバンダナ", "Foul. Rouge", "Roter Schal", "Fascia Rossa", "Pañuelo Rojo", "빨강밴드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Blue Scarf", "あおいバンダナ", "Foul. Bleu", "Blauer Schal", "Fascia Blu", "Pañuelo Azul", "파랑밴드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Pink Scarf", "ピンクのバンダナ", "Foul. Rose", "Rosa Schal", "Fascia Rosa", "Pañuelo Rosa", "분홍밴드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Green Scarf", "みどりのバンダナ", "Foul. Vert", "Grüner Schal", "Fascia Verde", "Pañuelo Verde", "초록밴드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Yellow Scarf", "きいろのバンダナ", "Foul. Jaune", "Gelber Schal", "Fascia Gialla", "Pañuelo Amarillo", "노랑밴드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Wide Lens", "こうかくレンズ", "Loupe", "Großlinse", "Grandelente", "Lupa", "광각렌즈"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Muscle Band", "ちからのハチマキ", "Bandeau Muscle", "Muskelband", "Muscolbanda", "Cinta Fuerte", "힘의머리띠"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Wise Glasses", "ものしりメガネ", "Lunettes Sages", "Schlauglas", "Saviocchiali", "Gafas Especiales", "박식안경"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Expert Belt", "たつじんのおび", "Ceinture Pro", "Expertengurt", "Abilcintura", "Cinta Xperto", "달인의띠"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Light Clay", "ひかりのねんど", "Lumargile", "Lichtlehm", "Creta Luce", "Refleluz", "빛의점토"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Life Orb", "いのちのたま", "Orbe Vie", "Leben-Orb", "Assorbisfera", "Vidasfera", "생명의구슬"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Power Herb", "パワフルハーブ", "Herbe Pouvoir", "Energiekraut", "Vigorerba", "Hierba Única", "파워풀허브"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Toxic Orb", "どくどくだま", "Orbe Toxique", "Toxik-Orb", "Tossicsfera", "Toxisfera", "맹독구슬"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Flame Orb", "かえんだま", "Orbe Flamme", "Heiß-Orb", "Fiammosfera", "Llamasfera", "화염구슬"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Quick Powder", "スピードパウダー", "Poudre Vite", "Flottstaub", "Velopolvere", "Polvo Veloz", "스피드파우더"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Focus Sash", "きあいのタスキ", "Ceinture Force", "Fokusgurt", "Focalnastro", "Banda Focus", "기합의띠"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Zoom Lens", "フォーカスレンズ", "Lentille Zoom", "Zoomlinse", "Zoomlente", "Telescopio", "포커스렌즈"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Metronome", "メトロノーム", "Métronome", "Metronom", "Plessimetro", "Metrónomo", "메트로놈"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Iron Ball", "くろいてっきゅう", "Balle Fer", "Eisenkugel", "Ferropalla", "Bola Férrea", "검은철구"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Lagging Tail", "こうこうのしっぽ", "Ralentiqueue", "Schwerschwf.", "Rallentocoda", "Cola Plúmbea", "느림보꼬리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Destiny Knot", "あかいいと", "Nœud Destin", "Fatumknoten", "Destincomune", "Lazo Destino", "빨간실"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Black Sludge", "くろいヘドロ", "Boue Noire", "Giftschleim", "Fangopece", "Lodo Negro", "검은진흙"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Icy Rock", "つめたいいわ", "Roche Glace", "Eisbrocken", "Rocciafredda", "Roca Helada", "차가운바위"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Smooth Rock", "さらさらいわ", "Roche Lisse", "Glattbrocken", "Roccialiscia", "Roca Suave", "보송보송바위"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Heat Rock", "あついいわ", "Roche Chaude", "Heißbrocken", "Rocciacalda", "Roca Calor", "뜨거운바위"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Damp Rock", "しめったいわ", "Roche Humide", "Nassbrocken", "Rocciaumida", "Roca Lluvia", "축축한바위"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Grip Claw", "ねばりのかぎづめ", "Accro Griffe", "Griffklaue", "Presartigli", "Garra Garfio", "끈기갈고리손톱"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Choice Scarf", "こだわりスカーフ", "Mouchoir Choix", "Wahlschal", "Stolascelta", "Pañuelo Elegido", "구애스카프"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sticky Barb", "くっつきバリ", "Piquants", "Klettdorn", "Vischiopunta", "Toxiestrella", "끈적끈적바늘"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Power Bracer", "パワーリスト", "Poignée Pouvoir", "Machtreif", "Vigorcerchio", "Brazal Recio", "파워리스트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Power Belt", "パワーベルト", "Ceinture Pouvoir", "Machtgurt", "Vigorfascia", "Cinto Recio", "파워벨트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Power Lens", "パワーレンズ", "Lentille Pouvoir", "Machtlinse", "Vigorlente", "Lente Recia", "파워렌즈"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Power Band", "パワーバンド", "Bandeau Pouvoir", "Machtband", "Vigorbanda", "Banda Recia", "파워밴드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Power Anklet", "パワーアンクル", "Chaîne Pouvoir", "Machtkette", "Vigorgliera", "Franja Recia", "파워앵클릿"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Power Weight", "パワーウエイト", "Poids Pouvoir", "Machtgewicht", "Vigorpeso", "Pesa Recia", "파워웨이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Shed Shell", "きれいなぬけがら", "Carapace Mue", "Wechselhülle", "Disfoguscio", "Muda Concha", "아름다운허물"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Big Root", "おおきなねっこ", "Grosse Racine", "Großwurzel", "Granradice", "Raíz Grande", "큰뿌리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Choice Specs", "こだわりメガネ", "Lunettes Choix", "Wahlglas", "Lentiscelta", "Gafas Elegid", "구애안경"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Flame Plate", "ひのたまプレート", "Plaque Flam", "Feuertafel", "Lastrarogo", "Tabla Llama", "불구슬플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Splash Plate", "しずくプレート", "Plaque Hydro", "Wassertafel", "Lastraidro", "Tabla Linfa", "물방울플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Zap Plate", "いかずちプレート", "Plaque Volt", "Blitztafel", "Lastrasaetta", "Tabla Trueno", "우뢰플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Meadow Plate", "みどりのプレート", "Plaque Herbe", "Wiesentafel", "Lastraprato", "Tabla Pradal", "초록플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Icicle Plate", "つららのプレート", "Plaque Glace", "Frosttafel", "Lastragelo", "Tabla Helada", "고드름플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Fist Plate", "こぶしのプレート", "Plaque Poing", "Fausttafel", "Lastrapugno", "Tabla Fuerte", "주먹플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Toxic Plate", "もうどくプレート", "Plaque Toxic", "Gifttafel", "Lastrafiele", "Tabla Tóxica", "맹독플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Earth Plate", "だいちのプレート", "Plaque Terre", "Erdtafel", "Lastrageo", "Tabla Terrax", "대지플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sky Plate", "あおぞらプレート", "Plaque Ciel", "Wolkentafel", "Lastracielo", "Tabla Cielo", "푸른하늘플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Mind Plate", "ふしぎのプレート", "Plaque Esprit", "Hirntafel", "Lastramente", "Tabla Mental", "이상한플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Insect Plate", "たまむしプレート", "Plaquinsect", "Käfertafel", "Lastrabaco", "Tabla Bicho", "비단벌레플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Stone Plate", "がんせきプレート", "Plaque Roc", "Steintafel", "Lastrapietra", "Tabla Pétrea", "암석플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Spooky Plate", "もののけプレート", "Plaque Fantô", "Spuktafel", "Lastratetra", "Tabla Terror", "원령플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Draco Plate", "りゅうのプレート", "Plaque Draco", "Dracotafel", "Lastradrakon", "Tabla Draco", "용의플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dread Plate", "こわもてプレート", "Plaque Ombre", "Furchttafel", "Lastratimore", "Tabla Oscura", "공포플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Iron Plate", "こうてつプレート", "Plaque Fer", "Eisentafel", "Lastraferro", "Tabla Acero", "강철플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Odd Incense", "あやしいおこう", "Encens Bizarre", "Schrägrauch", "Bizzoaroma", "Incienso Raro", "괴상한향로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Rock Incense", "がんせきおこう", "Encens Roc", "Steinrauch", "Roccioaroma", "Incienso Roca", "암석향로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Full Incense", "まんぷくおこう", "Encens Plein", "Lahmrauch", "Gonfioaroma", "Incienso Lento", "만복향로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Wave Incense", "さざなみのおこう", "Encens Vague", "Wellenrauch", "Ondaroma", "Incienso Aqua", "잔물결향로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Rose Incense", "おはなのおこう", "Encens Fleur", "Rosenrauch", "Rosaroma", "Incienso Floral", "꽃향로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Luck Incense", "こううんのおこう", "Encens Veine", "Glücksrauch", "Fortunaroma", "Incienso Duplo", "행운의향로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Pure Incense", "きよめのおこう", "Encens Pur", "Scheuchrauch", "Puroaroma", "Incienso Puro", "순결의향로"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Protector", "プロテクター", "Protecteur", "Schützer", "Copertura", "Protector", "프로텍터"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Electirizer", "エレキブースター", "Électiriseur", "Stromisierer", "Elettritore", "Electrizador", "에레키부스터"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Magmarizer", "マグマブースター", "Magmariseur", "Magmaisierer", "Magmatore", "Magmatizador", "마그마부스터"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dubious Disc", "あやしいパッチ", "CD Douteux", "Dubiosdisc", "Dubbiodisco", "Discoxtraño", "괴상한패치"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Reaper Cloth", "れいかいのぬの", "Tissu Fauche", "Düsterumhang", "Terrorpanno", "Tela Terrible", "영계의천"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Razor Claw", "するどいツメ", "Griffe Rasoir", "Scharfklaue", "Affilartigli", "Garra Afilada", "예리한손톱"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Razor Fang", "するどいキバ", "Croc Rasoir", "Scharfzahn", "Affilodente", "Colmillo Agudo", "예리한이빨"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["TM01"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM02"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM03"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM04"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM05"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM06"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM07"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM08"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM09"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM10"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM11"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM12"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM13"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM14"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM15"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM16"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM17"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM18"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM19"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM20"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM21"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM22"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM23"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM24"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM25"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM26"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM27"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM28"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM29"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM30"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM31"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM32"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM33"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM34"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM35"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM36"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM37"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM38"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM39"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM40"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM41"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM42"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM43"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM44"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM45"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM46"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM47"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM48"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM49"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM50"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM51"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM52"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM53"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM54"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM55"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM56"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM57"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM58"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM59"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM60"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM61"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM62"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM63"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM64"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM65"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM66"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM67"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM68"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM69"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM70"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM71"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM72"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM73"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM74"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM75"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM76"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM77"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM78"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM79"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM80"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM81"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM82"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM83"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM84"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM85"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM86"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM87"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM88"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM89"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM90"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM91"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM92"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["HM01"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["HM02"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["HM03"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["HM04"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["HM05"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["HM06"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["No Item", "", "", "", "", "", ""],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Explorer Kit", "たんけんセット", "Explorakit", "Forschersack", "Esplorokit", "Kit Explor.", "탐험세트"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Loot Sack", "たからぶくろ", "Sac Butin", "Beutesack", "Bottinosacca", "Saca Botín", "보물주머니"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Rule Book", "ルールブック", "Livre Règles", "Regelbuch", "Libro Regole", "Reglamento", "룰북"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Poké Radar", "ポケトレ", "Poké Radar", "Pokéradar", "Poké Radar", "Pokéradar", "포켓트레"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Point Card", "ポイントカード", "Carte Points", "Punktekarte", "Scheda Punti", "Tarj. Puntos", "포인트카드"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Journal", "ぼうけんノート", "Journal", "Tagebuch", "Agenda", "Diario", "모험노트"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Seal Case", "シールいれ", "Boîte Sceaux", "Stick.Koffer", "Portabolli", "Caja Sellos", "실상자"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Fashion Case", "アクセサリーいれ", "Coffret Mode", "Modekoffer", "Scatola Chic", "Caja Corazón", "액세서리상자"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Seal Bag", "シールぶくろ", "Sac Sceaux", "Stickertüte", "Bollosacca", "Bolsa Sellos", "실주머니"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Pal Pad", "ともだちてちょう", "Registre Ami", "Adressbuch", "Blocco Amici", "Bloc amigos", "친구수첩"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Works Key", "はつでんしょキー", "Clé Centrale", "K-Schlüssel", "Turbinchiave", "Ll. Central", "발전소키"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Old Charm", "こだいのおまもり", "Vieux Grigri", "Talisman", "Arcamuleto", "Talismán", "고대의부적"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Galactic Key", "ギンガだんのカギ", "Clé Galaxie", "G-Schlüssel", "Galachiave", "Ll. Galaxia", "갤럭시단의 열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Red Chain", "あかいくさり", "Chaîne Rouge", "Rote Kette", "Rossocatena", "Cadena Roja", "빨강쇠사슬"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Town Map", "タウンマップ", "Carte", "Karte", "Mappa", "Mapa", "타운맵"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Vs. Seeker", "バトルサーチャー", "Cherche VS", "Kampffahnder", "Cercasfide", "Buscapelea", "배틀서처"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Coin Case", "コインケース", "Boite Jetons", "Münzkorb", "Salvadanaio", "Monedero", "동전케이스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Old Rod", "ボロのつりざお", "Canne", "Angel", "Amo Vecchio", "Caña Vieja", "낡은낚싯대"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Good Rod", "いいつりざお", "Super Canne", "Profiangel", "Amo Buono", "Caña Buena", "좋은낚싯대"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Super Rod", "すごいつりざお", "Mega Canne", "Superangel", "Super Amo", "Supercaña", "대단한낚싯대"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Sprayduck", "コダックじょうろ", "Kwakarrosoir", "Entonkanne", "Sprayduck", "Psydugadera", "고라파덕물뿌리개"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Poffin Case", "ポフィンケース", "Boîte Poffin", "Knurspbox", "Portapoffin", "Pokochera", "포핀케이스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Bicycle", "じてんしゃ", "Bicyclette", "Fahrrad", "Bicicletta", "Bici", "자전거"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Suite Key", "ルームキー", "Clé Chambre", "B-Schlüssel", "Chiave Suite", "Llave Suite", "룸키"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Oak's Letter", "オーキドのてがみ", "Lettre Chen", "Eichs Brief", "Lettera di Oak", "Carta Pr Oak", "오박사의 편지"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Lunar Wing", "みかづきのはね", "Lun'Aile", "Lunarfeder", "Ala Lunare", "Pluma Lunar", "초승달날개"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Member Card", "メンバーズカード", "Carte Membre", "Mitgl.Karte", "Scheda Soci", "Carné Socio", "멤버스카드"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Azure Flute", "てんかいのふえ", "Flûte Azur", "Azurflöte", "Flauto Cielo", "Flauta Azur", "천계의 피리"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["S.S. Ticket", "ふねのチケット", "Passe Bateau", "Bootsticket", "Biglietto Nave", "Ticket Barco", "승선티켓"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Contest Pass", "コンテストパス", "Passe Concours", "Wettbewerbskarte", "Tessera Gare", "Pase Concurso", "콘테스트패스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Magma Stone", "かざんのおきいし", "Pierre Magma", "Magmastein", "Magmapietra", "Piedra Magma", "화산의 돌"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Parcel", "おとどけもの", "Colis", "Paket", "Pacco", "Paquete", "전해줄 물건"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Coupon 1", "ひきかえけん1", "Bon 1", "Kupon 1", "Coupon 1", "Cupón 1", "교환권 1"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Coupon 2", "ひきかえけん2", "Bon 2", "Kupon 2", "Coupon 2", "Cupón 2", "교환권 2"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Coupon 3", "ひきかえけん3", "Bon 3", "Kupon 3", "Coupon 3", "Cupón 3", "교환권 3"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Storage Key", "そうこのカギ", "Clé Stockage", "Lagerschlüssel", "Chiave magazzino", "Llave Almacén", "창고열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Secret Potion", "ひでんのくすり", "Potionsecret", "Geheimtrank", "Poz. Segreta", "Poc. Secreta", "비전신약"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Vs. Recorder", "バトルレコーダー", "Magnéto VS", "Kampfkamera", "Registradati", "Cámara Lucha", "배틀레코더"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Gracidea", "グラシデアのはな", "Gracidée", "Gracidea", "Gracidea", "Gracídea", "그라시데아꽃"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Secret Key", "ひみつのカギ", "Clé Secrète", "?-Öffner", "Chiave Segreta", "Llave Secreta", "비밀의열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Apricorn Box", "ぼんぐりケース", "Bte Noigrume", "Aprikokobox", "Ghicobox", "Caja Bonguri", "규토리케이스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Unown Report", "アンノーンノート", "Carnet Zarbi", "Icognitoheft", "UnownBloc", "Bloc Unown", "안농노트"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Berry Pots", "きのみプランター", "Plante Baies", "Pflanzset", "Piantabacche", "Plantabayas", "나무열매플랜터"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Dowsing Machine", "ダウジングマシン", "Cherch'Objet", "Itemradar", "Ricerca Str.", "Zahorí", "다우징머신"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Blue Card", "ブルーカード", "Carte Bleue", "Blaue Karte", "Carta Blu", "Tarjeta Azul", "블루카드"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Slowpoke Tail", "おいしいシッポ", "QueueRamolos", "Flegmonrute", "CodaSlowpoke", "Colaslowpoke", "맛있는꼬리"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Clear Bell", "とうめいなスズ", "Glas Transparent", "Klarglocke", "Campana Chiara", "Campana Clara", "크리스탈방울"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Card Key", "カードキー", "Carte Magn.", "Türöffner", "Apriporta", "Llave Magnética", "카드키"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Basement Key", "ちかのカギ", "Clé Sous-Sol", "Kelleröffner", "Chiave sotterr.", "Llave del Sótano", "지하열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Squirt Bottle", "ゼニガメじょうろ", "Carapuce à O", "Schiggykanne", "Annaffiatoio", "Regadera", "꼬부기물뿌리개"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Red Scale", "あかいウロコ", "Écaillerouge", "Rote Haut", "Squama Rossa", "Escama Roja", "빨간비늘"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Lost Item", "おとしもの", "Poupée perdue", "Fundsache", "Strumento Perso", "Obj. Perdido", "분실물"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Pass", "リニアパス", "Passe Train", "Fahrschein", "Superpass", "Magnetopase", "리니어패스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Machine Part", "きかいのぶひん", "Partie de Machine", "Spule", "Pezzo macch.", "Maquinaria", "기계부품"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Silver Wing", "ぎんいろのはね", "Argent'Aile", "Silberflügel", "Aladargento", "Ala Plateada", "은빛날개"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Rainbow Wing", "にじいろのはね", "Arcenci'Aile", "Buntschwinge", "Ala d'Iride", "Ala Arcoíris", "무지개빛날개"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mystery Egg", "ふしぎなタマゴ", "Œuf Mystère", "Rätsel-Ei", "Uovo Mistero", "Huevo Mist", "이상한알"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Red Apricorn", "あかぼんぐり", "Noigrume Rge", "Aprikoko Rot", "Ghicocca Rsa", "Bonguri Roj", "빨간규토리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Yellow Apricorn", "きぼんぐり", "Noigrume Jau", "Aprikoko Gel", "Ghicocca Gia", "Bonguri Ama", "노랑규토리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Blue Apricorn", "あおぼんぐり", "Noigrume Blu", "Aprikoko Blu", "Ghicocca Blu", "Bonguri Azu", "파란규토리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Green Apricorn", "みどぼんぐり", "Noigrume Vrt", "Aprikoko Grn", "Ghicocca Ver", "Bonguri Ver", "초록규토리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Pink Apricorn", "ももぼんぐり", "Noigrume Ros", "Aprikoko Pnk", "Ghicocca Ros", "Bonguri Ros", "담홍규토리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["White Apricorn", "しろぼんぐり", "Noigrume Bln", "Aprikoko Wss", "Ghicocca Bln", "Bonguri Bla", "하얀규토리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Black Apricorn", "くろぼんぐり", "Noigrume Nr", "Aprikoko Sch", "Ghicocca Nra", "Bonguri Neg", "검은규토리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Fast Ball", "スピードボール", "Speed Ball", "Turboball", "Rapid Ball", "Rapid Ball", "스피드볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Level Ball", "レベルボール", "Niveau Ball", "Levelball", "Level Ball", "Nivel Ball", "레벨볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Lure Ball", "ルアーボール", "Appat Ball", "Köderball", "Esca Ball", "Cebo Ball", "루어볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Heavy Ball", "ヘビーボール", "Masse Ball", "Schwerball", "Peso Ball", "Peso Ball", "헤비볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Love Ball", "ラブラブボール", "Love Ball", "Sympaball", "Love Ball", "Amor Ball", "러브러브볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Friend Ball", "フレンドボール", "Copain Ball", "Freundesball", "Friend Ball", "Amigo Ball", "프랜드볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Moon Ball", "ムーンボール", "Lune Ball", "Mondball", "Luna Ball", "Luna Ball", "문볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sport Ball", "コンペボール", "Compét'Ball", "Turnierball", "Gara Ball", "Competi Ball", "콤페볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Park Ball", "パークボール", "Parc Ball", "Parkball", "Parco Ball", "Parque Ball", "파크볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Photo Album", "フォトアルバム", "Album Photo", "Fotoalbum", "Album", "Álbum", "포토앨범"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["GB Sounds", "GBプレイヤー", "Musique GB.", "GB-Player", "Lettore GB", "Lector GB", "GB플레이어"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Tidal Bell", "うみなりのスズ", "Glas tempête", "Gischtglocke", "Camp. Onda", "Camp. Oleaje", "해명의방울"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Rage Candy Bar", "いかりまんじゅう", "Bonbon Rage", "Wutkeks", "Iramella", "Caramelo Furia", "분노의호두과자"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Data Card", "データカード", "Carte Mémo", "Datenkarte", "Scheda Dati", "Tarjeta Datos", "데이터카드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 02"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 03"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 04"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 05"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 06"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 07"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 08"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 09"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 10"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 11"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 12"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 13"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 14"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 15"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 16"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 17"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 18"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 19"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 20"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 21"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 22"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 23"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 24"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 25"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 26"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Data Card 27"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Jade Orb", "もえぎいろのたま", "Orbe Vert", "Grüne Kugel", "Sfera Verde", "Esfera Verde", "연둣빛구슬"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Lock Capsule", "ロックカプセル", "Capsule Anti-vol", "Tresorkapsel", "Cap. Scrigno", "Cáp. Candado", "록캡슐"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Red Orb", "べにいろのたま", "Orbe Rouge", "Rote Kugel", "Sfera Rossa", "Esfera Roja", "주홍구슬"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Blue Orb", "あいいろのたま", "Orbe Bleu", "Blaue Kugel", "Sfera Blu", "Esfera Azul", "쪽빛구슬"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Enigma Stone", "なぞのすいしょう", "Mystécristal", "Mytokristall", "Misticristal", "Misticristal", "수수께끼의수정"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Prism Scale", "きれいなウロコ", "Bel'Écaille", "Schönschuppe", "Squama Bella", "Escama Bella", "고운비늘"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Eviolite", "しんかのきせき", "Évoluroc", "Evolith", "Evolcondensa", "Mineral Evol", "진화의 휘석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Float Stone", "かるいし", "Pierrallégée", "Leichtstein", "Pietralieve", "Piedra Pómez", "가벼운돌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Rocky Helmet", "ゴツゴツメット", "Casque Brut", "Beulenhelm", "Bitorzolelmo", "Casco Dentado", "울퉁불퉁멧"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Air Balloon", "ふうせん", "Ballon", "Luftballon", "Palloncino", "Globo Helio", "풍선"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Red Card", "レッドカード", "Carton Rouge", "Rote Karte", "Cartelrosso", "Tarjeta Roja", "레드카드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Ring Target", "ねらいのまと", "Point de Mire", "Zielscheibe", "Facilsaglio", "Blanco", "겨냥표적"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Binding Band", "しめつけバンド", "Bande Étreinte", "Klammerband", "Legafascia", "Banda Atadura", "조임밴드"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Absorb Bulb", "きゅうこん", "Bulbe", "Knolle", "Bulbo", "Tubérculo", "구근"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Cell Battery", "じゅうでんち", "Pile", "Akku", "Ricaripila", "Pila", "충전지"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Eject Button", "だっしゅつボタン", "Bouton Fuite", "Fluchtknopf", "Pulsantefuga", "Botón Escape", "탈출버튼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Fire Gem", "ほのおのジュエル", "Joyau Feu", "Feuerjuwel", "Bijoufuoco", "G. Fuego", "불꽃주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Water Gem", "みずのジュエル", "Joyau Eau", "Wasserjuwel", "Bijouacqua", "G. Agua", "물주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Electric Gem", "でんきのジュエル", "Joyau Électr", "Elektrojuwel", "Bijouelettro", "G. Eléctrica", "전기주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Grass Gem", "くさのジュエル", "Joyau Plante", "Pflanzjuwel", "Bijouerba", "G. Planta", "풀주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Ice Gem", "こおりのジュエル", "Joyau Glace", "Eisjuwel", "Bijoughiac.", "G. Hielo", "얼음주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Fighting Gem", "かくとうジュエル", "Joyau Combat", "Kampfjuwel", "Bijoulotta", "G. Lucha", "격투주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Poison Gem", "どくのジュエル", "Joyau Poison", "Giftjuwel", "Bijouveleno", "G. Veneno", "독주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Ground Gem", "じめんのジュエル", "Joyau Sol", "Bodenjuwel", "Bijouterra", "G. Tierra", "땅주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Flying Gem", "ひこうのジュエル", "Joyau Vol", "Flugjuwel", "Bijouvolante", "G. Voladora", "비행주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Psychic Gem", "エスパージュエル", "Joyau Psy", "Psychojuwel", "Bijoupsico", "G. Psíquica", "에스퍼주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Bug Gem", "むしのジュエル", "Joyau Insect", "Käferjuwel", "Bijoucoleot.", "G. Bicho", "벌레주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Rock Gem", "いわのジュエル", "Joyau Roche", "Gesteinjuwel", "Bijouroccia", "G. Roca", "바위주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Ghost Gem", "ゴーストジュエル", "Joyau Spectr", "Geistjuwel", "Bijouspettro", "G. Fantasma", "고스트주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dragon Gem", "ドラゴンジュエル", "Joyau Dragon", "Drakojuwel", "Bijoudrago", "G. Dragón", "드래곤주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dark Gem", "あくのジュエル", "Joyau Ténèbr", "Unlichtjuwel", "Bijoubuio", "G. Siniestra", "악주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Steel Gem", "はがねのジュエル", "Joyau Acier", "Stahljuwel", "Bijouacciaio", "G. Acero", "강철주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Normal Gem", "ノーマルジュエル", "Joyau Normal", "Normaljuwel", "Bijounormale", "Gema Normal", "노말주얼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Health Wing", "たいりょくのハネ", "Aile Santé", "Heilfeder", "Piumsalute", "Pluma Vigor", "체력날개"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Muscle Wing", "きんりょくのハネ", "Aile Force", "Kraftfeder", "Piumpotenza", "Pluma Músculo", "근력날개"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Resist Wing", "ていこうのハネ", "Aile Armure", "Abwehrfeder", "Piumtutela", "Pluma Aguante", "저항력날개"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Genius Wing", "ちりょくのハネ", "Aile Esprit", "Geniefeder", "Piumingegno", "Pluma Intelecto", "지력날개"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Clever Wing", "せいしんのハネ", "Aile Mental", "Espritfeder", "Piumintuito", "Pluma Mente", "정신력날개"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Swift Wing", "しゅんぱつのハネ", "Aile Sprint", "Flinkfeder", "Piumreazione", "Pluma Ímpetu", "순발력날개"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Pretty Wing", "きれいなハネ", "Jolie Aile", "Prachtfeder", "Piumabella", "Pluma Bella", "고운날개"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Cover Fossil", "ふたのカセキ", "Fossile Plaque", "Schildfossil", "Fossiltappo", "Fósil Tapa", "덮개화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Plume Fossil", "はねのカセキ", "Fossile Plume", "Federfossil", "Fossilpiuma", "Fósil Pluma", "날개화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Liberty Pass", "リバティチケット", "Pass Liberté", "Gartenpass", "Liberticket", "T. Libertad", "리버티티켓"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Pass Orb", "デルダマ", "Offrisphère", "Transferorb", "Passabilia", "Regalosfera", "딜구슬"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dream Ball", "ドリームボール", "Rêve Ball", "Traumball", "Dream Ball", "Ensueño Ball", "드림볼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Poké Toy", "ポケじゃらし", "Poképlumet", "Pokéwedel", "Pokégingillo", "Pokéseñuelo", "포켓풀"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Prop Case", "グッズケース", "Boîte Parure", "Deko-Box", "Portagadget", "Neceser", "굿즈케이스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Dragon Skull", "ドラゴンのホネ", "Crâne Dragon", "Drakoschädel", "Teschio", "Crán. Dragón", "드래곤의뼈"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Balm Mushroom", "かおるキノコ", "Champi Suave", "Duftpilz", "Profumfungo", "Seta Aroma", "향기버섯"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Big Nugget", "でかいきんのたま", "Maxi Pépite", "Riesennugget", "Granpepita", "Maxipepita", "큰금구슬"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Pearl String", "おだんごしんじゅ", "Perle Triple", "Triperle", "Trittiperla", "Sarta Perlas", "경단진주"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Comet Shard", "すいせいのかけら", "Morceau Comète", "Kometstück", "Pezzo Cometa", "Fragmento Cometa", "혜성조각"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Relic Copper", "こだいのどうか", "Vieux Sou", "Alter Heller", "Soldantico", "Real Cobre", "고대의동화"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Relic Silver", "こだいのぎんか", "Vieil Écu", "Alter Taler", "Ducatantico", "Real Plata", "고대의은화"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Relic Gold", "こだいのきんか", "Vieux Ducat", "Alter Dukat", "Doblonantico", "Real Oro", "고대의금화"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Relic Vase", "こだいのツボ", "Vieux Vase", "Alte Vase", "Vasantico", "Ánfora", "고대의항아리"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Relic Band", "こだいのうでわ", "Vieux Bijou", "Alter Rief", "Bracciantico", "Brazal", "고대의팔찌"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Relic Statue", "こだいのせきぞう", "Vieux Santon", "Alte Statue", "Statuantica", "Efi. Antigua", "고대의석상"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Relic Crown", "こだいのおうかん", "Vieux Tortil", "Alte Krone", "Coronantica", "Cor. Antigua", "고대의왕관"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Casteliacone", "ヒウンアイス", "Glace Volute", "Stratos-Eis", "Conostropoli", "Porcehelado", "구름아이스"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Dire Hit 2"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Speed 2"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Sp. Atk 2"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Sp. Def 2"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Defense 2"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Attack 2"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Accuracy 2"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Speed 3"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Sp. Atk 3"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Sp. Def 3"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Defense 3"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Attack 3"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Accuracy 3"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Speed 6"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Sp. Atk 6"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Sp. Def 6"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Defense 6"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Attack 6"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["X Accuracy 6"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Ability Urge", "スキルコール", "Appel CapSpé", "Fäh.-Appell", "Chiamabilità", "Habilitador", "스킬콜"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Item Drop", "アイテムドロップ", "Jette Objet", "Itemabwurf", "Lascioggetto", "Tiraobjeto", "아이템드롭"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Item Urge", "アイテムコール", "Appel Objet", "Itemappell", "Chiamoggetto", "Activaobjeto", "아이템콜"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Reset Urge", "フラットコール", "Réamorçage", "Umkehrappell", "Ripristino", "Quitaestado", "플랫콜"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Dire Hit 3"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Light Stone", "ライトストーン", "Galet Blanc", "Lichtstein", "Chiarolite", "Orbe Claro", "라이트스톤"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Dark Stone", "ダークストーン", "Galet Noir", "Dunkelstein", "Scurolite", "Orbe Oscuro", "다크스톤"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["TM93"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM94"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM95"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["Xtransceiver", "ライブキャスター", "Vokit", "Viso-Caster", "Interpoké", "Videomisor", "라이브캐스터"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["God Stone", "ゴッドストーン", "--", "--", "--", "--", "--"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Gram 1", "はいたつぶつ１", "Courrier 1", "Briefpost 1", "Missiva 1", "Envío 1", "배달물1"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Gram 2", "はいたつぶつ２", "Courrier 2", "Briefpost 2", "Missiva 2", "Envío 2", "배달물2"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Gram 3", "はいたつぶつ３", "Courrier 3", "Briefpost 3", "Missiva 3", "Envío 3", "배달물3"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Xtransceiver", "ライブキャスター", "Vokit", "Viso-Caster", "Interpoké", "Videomisor", "라이브캐스터"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Medal Box", "メダルボックス", "B. Médailles", "Medaillenbox", "Box Premi", "C. Insignias", "메달박스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["DNA Splicers", "いでんしのくさび", "Pointeau ADN", "DNS-Keil", "Cuneo DNA", "Punta ADN", "유전자쐐기"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["DNA Splicers", "いでんしのくさび", "Pointeau ADN", "DNS-Keil", "Cuneo DNA", "Punta ADN", "유전자쐐기"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Permit", "きょかしょう", "Permis", "Genehmigung", "Permesso", "Pase", "허가증"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Oval Charm", "まるいおまもり", "Charme Ovale", "Ovalpin", "Ovamuleto", "Amuleto Oval", "둥근부적"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Shiny Charm", "ひかるおまもり", "CharmeChroma", "Schillerpin", "Cromamuleto", "Amuleto Iris", "빚나는부적"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Plasma Card", "プラズマカード", "Carte Plasma", "Plasmakarte", "Carta Plasma", "Tarjeta Plasma", "플라스마카드"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Grubby Hanky", "よごれたハンカチ", "MouchoirSale", "Schnäuztuch", "Pezza Sporca", "Pan. Sucio", "더러손수건"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Colress Machine", "アクロママシーン", "Nikodule", "Achromat", "Acrocongegno", "Acromáquina", "아크로마머신"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Dropped Item", "わすれもの", "Objet Trouvé", "Fundsache", "Oggetto Perso", "Obj. Perdido", "잊은물건"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Dropped Item", "わすれもの", "Objet Trouvé", "Fundsache", "Oggetto Perso", "Obj. Perdido", "잊은물건"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Reveal Glass", "うつしかがみ", "Miroir Sacré", "Wahrspiegel", "Verispecchio", "Espejo Veraz", "비추는거울"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Weakness Policy", "じゃくてんほけん", "Vulné-Assurance", "Schwächenschutz", "Vulneropolizza", "Seguro Debilidad", "약점보험"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Assault Vest", "とつげきチョッキ", "Veste de Combat", "Offensivweste", "Corpetto Assalto", "Chaleco Asalto", "돌격조끼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Holo Caster", "ホロキャスター", "Holokit", "Holo-Log", "Holovox", "Holomisor", "홀로캐시터"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Prof's Letter", "はかせのてがみ", "Lettre du Prof", "Brief vom Prof", "Lettera del Prof", "Carta Profesor", "박사의편지"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Roller Skates", "ローラースケート", "Rollers", "Rollerskates", "Pattini", "Patines", "롤러스케이트"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Pixie Plate", "せいれいプレート", "Plaque Pixie", "Feentafel", "Lastraspiritello", "Tabla Duende", "정령플레이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Ability Capsule", "とくせいカプセル", "Pilule Talent", "Fähigkeiten-Kapsel", "Capsula Abilità", "Cáps. Habilidad", "특성캡슐"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Whipped Dream", "ホイップポップ", "Chantibonbon", "Sahnehäubchen", "Dolcespuma", "Dulce de Nata", "휘핑팝"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sachet", "においぶくろ", "Sachet Senteur", "Duftbeutel", "Bustina Aromi", "Saquito Fragante", "향기주머니"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Luminous Moss", "ひかりごけ", "Lichen Lumineux", "Leuchtmoos", "Muschioluce", "Musgo Brillante", "빛이끼"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Snowball", "ゆきだま", "Boule de Neige", "Schneeball", "Palla di Neve", "Bola de Nieve", "눈덩이"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Safety Goggles", "ぼうじんゴーグル", "Lunettes Filtre", "Schutzbrille", "Visierantisabbia", "Gafa Protectora", "방진고글"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Poké Flute", "ポケモンのふえ", "Pokéflute", "Pokéflöte", "Pokéflauto", "Poké Flauta", "포켓몬피리"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Rich Mulch", "たわわこやし", "Fertibondance", "Sprießmulch", "Fertilflorido", "Abono Fértil", "주렁주렁비료"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Surprise Mulch", "びっくりこやし", "Fertistantané", "Wundermulch", "Fertilsorpresa", "Abono Sorpresa", "깜놀비료"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Boost Mulch", "ぐんぐんこやし", "Fertibérance", "Wuchermulch", "Fertilcopioso", "Abono Fructífero", "부쩍부쩍비료"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Amaze Mulch", "とんでもこやし", "Fertiprodige", "Ultramulch", "Fertilprodigio", "Abono Insólito", "기절초풍비료"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Gengarite", "ゲンガナイト", "Ectoplasmite", "Gengarnit", "Gengarite", "Gengarita", "팬텀나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Gardevoirite", "サーナイトナイト", "Gardevoirite", "Guardevoirnit", "Gardevoirite", "Gardevoirita", "가디안나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Ampharosite", "デンリュウナイト", "Pharampite", "Ampharosnit", "Ampharosite", "Ampharosita", "전룡나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Venusaurite", "フシギバナイト", "Florizarrite", "Bisaflornit", "Venusaurite", "Venusaurita", "이상해꽃나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Charizardite X", "リザードナイトX", "Dracaufite X", "Gluraknit X", "Charizardite X", "Charizardita X", "리자몽나이트X"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Blastoisinite", "カメックスナイト", "Tortankite", "Turtoknit", "Blastoisite", "Blastoisita", "거북왕나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Mewtwonite X", "ミュウツナイトX", "Mewtwoïte X", "Mewtunit X", "Mewtwoite X", "Mewtwoita X", "뮤츠나이트X"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Mewtwonite Y", "ミュウツナイトY", "Mewtwoïte Y", "Mewtunit Y", "Mewtwoite Y", "Mewtwoita Y", "뮤츠나이트Y"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Blazikenite", "バシャーモナイト", "Braségalite", "Lohgocknit", "Blazikenite", "Blazikenita", "번치코나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Medichamite", "チャーレムナイト", "Charminite", "Meditalisnit", "Medichamite", "Medichamita", "요가램나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Houndoominite", "ヘルガナイト", "Démolossite", "Démolossite", "Houndoomite", "Houndoomita", "헬가나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Aggronite", "ボスゴドラナイト", "Galekingite", "Stollossnit", "Aggronite", "Aggronita", "보스로라나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Banettite", "ジュペッタナイト", "Branettite", "Banetteonit", "Banettite", "Banettita", "다크펫나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Tyranitarite", "バンギラスナイト", "Tyranocivite", "Despotarnit", "Tyranitarite", "Tyranitarita", "마기라스나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Scizorite", "ハッサムナイト", "Cizayoxite", "Scheroxnit", "Scizorite", "Scizorita", "핫삼나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Pinsirite", "カイロスナイト", "Scarabruite", "Pinsirnit", "Pinsirite", "Pinsirita", "쁘사이저나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Aerodactylite", "プテラナイト", "Ptéraïte", "Aerodactylonit", "Aerodactylite", "Aerodactylita", "프테라나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Lucarionite", "ルカリオナイト", "Lucarite", "Lucarionit", "Lucarite", "Lucarita", "루카리오나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Abomasite", "ユキノオナイト", "Blizzarite", "Rexblisarnit", "Abomasnowite", "Abomasnowita", "눈설왕나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Kangaskhanite", "ガルーラナイト", "Kangourexite", "Kangamanit", "Kangaskhanite", "Kangaskhanita", "캥카나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Gyaradosite", "ギャラドスナイト", "Léviatorite", "Garadosnit", "Gyaradosite", "Gyaradosita", "갸라도스나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Absolite", "アブソルナイト", "Absolite", "Absolnit", "Absolite", "Absolita", "앱솔나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Charizardite Y", "リザードナイトY", "Dracaufite Y", "Gluraknit Y", "Charizardite Y", "Charizardita Y", "리자몽나이트Y"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Alakazite", "フーディナイト", "Alakazamite", "Simsalanit", "Alakazamite", "Alakazamita", "후디나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Heracronite", "ヘラクロスナイト", "Scarhinoïte", "Scarhinoïte", "Heracrossite", "Heracrossita", "헤라크로스나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Mawilite", "クチートナイト", "Mysdibulite", "Flunkifernit", "Mawilite", "Mawilita", "입치트나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Manectite", "ライボルトナイト", "Élecsprintite", "Voltensonit", "Manectricite", "Manectricita", "썬더볼트나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Garchompite", "ガブリアスナイト", "Carchacrokite", "Knakracknit", "Garchompite", "Garchompita", "한카리아스나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Latiasite", "ラティアスナイト", "Latiasite", "Latiasnit", "Latiasite", "Latiasita", "라티아스나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Latiosite", "ラティオスナイト", "Latiosite", "Latiosnit", "Latiosite", "Latiosita", "라티오스나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Roseli Berry", "ロゼルのみ", "Baie Selro", "Hibisbeere", "Baccarcadè", "Baya Hibis", "로셀열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Kee Berry", "アッキのみ", "Baie Éka", "Akibeere", "Baccalighia", "Baya Biglia", "악키열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Maranga Berry", "タラプのみ", "Baie Rangma", "Tarabeere", "Baccapane", "Baya Maranga", "타라프열매"],
        desc:[],
        pocket:"Berries"
    },
    {
        name:["Sprinklotad", "ハスボーじょうろ", "Nénurrosoir", "Loturzelkanne", "Irrigalotad", "Lotadgadera", "연꽃몬물뿌리개"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["TM96"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM97"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM98"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM99"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["TM100"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["Power Plant Pass", "はつでんしょパス", "Passe Centrale", "Kraftwerks-Pass", "Pass Centrale", "Pase Central", "발전소패스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mega Ring", "メガリング", "Méga-Anneau", "Mega-Ring", "Megacerchio", "Mega-Aro", "메가링"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Intriguing Stone", "すごそうないし", "Pierre Insolite", "Kurioser Stein", "Sasso suggestivo", "Piedra Insólita", "대단할듯한돌"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Common Stone"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Discount Coupon", "バーゲンチケット", "Bon Réduction", "Rabattmarke", "Buono sconto", "Vale Descuento", "바겐세일티켓"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Elevator Key", "エレベーターのキー", "Clé Ascenseur", "Liftschlüssel", "Chiave ascensore", "Llave Ascensor", "엘리베이터키"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["TMV Pass", "TMVパス", "Passe TMV", "TMV-Pass", "Pass TMV", "Abono del TMV", "TMV패스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Honor of Kalos", "カロスエンブレム", "Insigne de Kalos", "Kalos-Emblem", "Emblema di Kalos", "Emblema de Kalos", "칼로스엠블럼"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Adventure Rules", "たんけんこころえ", "ABC Aventure", "Abenteuerfibel", "Guida Avventura", "Guía de Máximas", "탐험수칙"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Strange Souvenir", "ふしぎなおきもの", "Bibelot Bizarre", "Skurriloskulptur", "Strano ninnolo", "Estatuilla Rara", "이상한장식품"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Lens Case", "レンズケース", "Boîte Lentilles", "Linsenetui", "Portalenti", "Portalentillas", "렌즈케이스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Travel Trunk"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Travel Trunk"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Lumiose Galette", "ミアレガレット", "Galette Illumis", "Illumina-Galette", "Pan di Lumi", "Crêpe Luminalia", "미르갈레트"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Shalour Sable", "シャラサブレ", "Sablé Yantreizh", "Yantara-Sablé", "Yantafrollino", "Galleta Yantra", "사라사블레"],
        desc:[],
        pocket:"Medicine"
    },
    {
        name:["Jaw Fossil", "アゴのカセキ", "Fossile Mâchoire", "Kieferfossil", "Fossilmascella", "Fósil Mandíbula", "턱화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sail Fossil", "ヒレのカセキ", "Fossile Nageoire", "Flossenfossil", "Fossilpinna", "Fósil Aleta", "지느러미화석"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Looker Ticket", "ハンサムチケット", "Ticket Beladonis", "LeBelle-Ticket", "Carta Bellocchio", "Boleto Handsome", "핸섬티켓"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Bicycle", "じてんしゃ", "Bicyclette", "Fahrrad", "Bicicletta", "Bici", "자전거"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Holo Caster", "ホロキャスター", "Holokit", "Holo-Log", "Holovox", "Holomisor", "홀로캐시터"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Fairy Gem"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Mega Charm"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mega Glove"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mach Bike", "マッハじてんしゃ", "Vélo de Course", "Eilrad", "Bici da corsa", "Bici de Carreras", "마하자전거"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Acro Bike", "ダートじてんしゃ", "Vélo Cross", "Kunstrad", "Bici da cross", "Bici Acrobática", "더트자전거"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Wailmer Pail", "ホエルコじょうろ", "Wailmerrosoir", "Wailmerkanne", "Vaso Wailmer", "Wailmegadera", "고래왕자물뿌리개"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Devon Parts", "デボンのにもつ", "Pack Devon", "Devon-Waren", "Merce Devon", "Piezas Devon", "데봉화물"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Soot Sack", "はいぶくろ", "Sac à Suie", "Aschetasche", "Sacco cenere", "Saco Hollín", "재주머니"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Basement Key", "ちかのカギ", "Clé Sous-Sol", "Kelleröffner", "Chiave sotterr.", "Llave del Sótano", "지하열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Pokéblock Kit", "ポロックキット", "Kit Pokébloc", "Pokériegel-Set", "Kit Pokémelle", "Kit de Pokécubos", "포켓몬스넥키트"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Letter", "ダイゴへのてがみ", "Lettre à Pierre", "Brief an Troy", "Lettera", "Carta a Máximo", "성호에게줄편지"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Eon Ticket", "むげんのチケット", "Passe Éon", "Äon-Ticket", "Biglietto Eone", "Ticket Eón", "무한티켓"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Scanner", "たんちき", "Scanner", "Scanner", "Scanner", "Escáner", "탐지기"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Go-Goggles", "ゴーゴーゴーグル", "Lunettes Sable", "Wüstenglas", "Occhialoni", "Gafas Aislantes", "고고고글"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Meteorite", "いんせき", "Météorite", "Meteorit", "Meteorite", "Meteorito", "운석"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Key to Room 1", "いちごうしつのカギ", "Clé Salle 1", "R1-Schlüssel", "Chiave stanza 1", "Ll. Habitación 1", "일호실열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Key to Room 2", "にごうしつのカギ", "Clé Salle 2", "R2-Schlüssel", "Chiave stanza 2", "Ll. Habitación 2", "이호실열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Key to Room 4", "よんごうしつのカギ", "Clé Salle 4", "R4-Schlüssel", "Chiave stanza 4", "Ll. Habitación 4", "사호실열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Key to Room 6", "ろくごうしつのカギ", "Clé Salle 6", "R6-Schlüssel", "Chiave stanza 6", "Ll. Habitación 6", "육호실열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Storage Key", "そうこのカギ", "Clé Stockage", "Lagerschlüssel", "Chiave magazzino", "Llave Almacén", "창고열쇠"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Devon Scope", "デボンスコープ", "Devon Scope", "Devon-Scope", "Devonscopio", "Detector Devon", "데봉스코프"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["S.S. Ticket", "ふねのチケット", "Passe Bateau", "Bootsticket", "Biglietto Nave", "Ticket Barco", "승선티켓"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["HM07"],
        desc:[],
        pocket:"TMs and HMs"
    },
    {
        name:["Devon Scuba Gear", "デボンボンベ", "Plongeur Devon", "Devon-Atemgerät", "Maschera Devon", "Bombona Devon", "데봉봄베"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Contest Costume", "ライブドレス", "Robe Live", "Live-Kleid", "Vestito Live", "Vestido de Gala", "라이브드레스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Contest Costume", "ライブドレス", "Robe Live", "Live-Kleid", "Vestito Live", "Vestido de Gala", "라이브드레스"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Magma Suit", "マグマスーツ", "Scaph. Magma", "Magma-Anzug", "Tuta Magma", "Traje Magma", "마그마슈트"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Aqua Suit", "アクアスーツ", "Scaphandre Aqua", "Aqua-Anzug", "Tuta Idro", "Traje Aqua", "아쿠아슈트"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Pair of Tickets", "ペアチケット", "Ticket Duo", "Zweierticket", "Biglietto doppio", "Entrada para dos", "페어티켓"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mega Bracelet", "メガバングル", "Méga-Bracelet", "Mega-Armreif", "Megabracciale", "Megapulsera", "메가뱅글"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mega Pendant"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mega Glasses"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mega Anchor"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mega Stickpin"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mega Tiara"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Mega Anklet"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Meteorite", "いんせき", "Météorite", "Meteorit", "Meteorite", "Meteorito", "운석"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Swampertite", "ラグラージナイト", "Laggronite", "Sumpexnit", "Swampertite", "Swampertita", "대짱이나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sceptilite", "ジュカインナイト", "Jungkite", "Gewaldronit", "Sceptilite", "Sceptilita", "나무킹나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sablenite", "ヤミラミナイト", "Ténéfixite", "Zobirisnit", "Sableyite", "Sableynita", "깜까미나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Altarianite", "チルタリスナイト", "Altarite", "Altarianit", "Altarite", "Altarianita", "파비코리나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Galladite", "エルレイドナイト", "Gallamite", "Galagladinit", "Galladite", "Galladita", "엘레이드나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Audinite", "タブンネナイト", "Nanméouïte", "Ohrdochnit", "Audinite", "Audinita", "다부니나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Metagrossite", "メタグロスナイト", "Métalossite", "Metagrossnit", "Metagrossite", "Metagrossita", "메타그로스나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Sharpedonite", "サメハダナイト", "Sharpedite", "Tohaidonit", "Sharpedite", "Sharpedonita", "샤크니아나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Slowbronite", "ヤドランナイト", "Flagadossite", "Lahmusnit", "Slowbroite", "Slowbronita", "야도란나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Steelixite", "ハガネールナイト", "Steelixite", "Stahlosnit", "Steelixite", "Steelixita", "강철톤나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Pidgeotite", "ピジョットナイト", "Roucarnagite", "Taubossnit", "Pidgeotite", "Pidgeotita", "피죤투나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Glalitite", "オニゴーリナイト", "Oniglalite", "Firnontornit", "Glalite", "Glalita", "얼음귀신나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Diancite", "ディアンシナイト", "Diancite", "Diancienit", "Diancite", "Diancita", "디안시나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Prison Bottle", "いましめのツボ", "Vase Scellé", "Banngefäß", "Vaso del vincolo", "Vasija Castigo", "굴레의항아리"],
        desc:[],
        pocket:"Key Items"
    },
    {
        name:["Mega Cuff"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Cameruptite", "バクーダナイト", "Caméruptite", "Cameruptnit", "Cameruptite", "Cameruptita", "폭타나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Lopunnite", "ミミロップナイト", "Lockpinite", "Schlapornit", "Lopunnite", "Lopunnita", "이어롭나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Salamencite", "ボーマンダナイト", "Drattakite", "Brutalandanit", "Salamencite", "Salamencita", "보만다나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Beedrillite", "スピアナイト", "Dardargnite", "Bibornit", "Beedrillite", "Beedrillita", "독침붕나이트"],
        desc:[],
        pocket:"Items"
    },
    {
        name:["Meteorite", "いんせき", "Météorite", "Meteorit", "Meteorite", "Meteorito", "운석"],
        desc:[],
        pocket:"Key Items"
    },
    {
        name:["Meteorite", "いんせき", "Météorite", "Meteorit", "Meteorite", "Meteorito", "운석"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Key Stone"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Meteorite Shard", "いんせきのかけら", "Éclat Météorite", "Meteoritenstück", "Framm. meteorite", "Frag. Meteorito", "운석조각"],
        desc:[],
        pocket:"Key items"
    },
    {
        name:["Eon Flute", "むげんのふえ", "Flûte Éon", "Äon-Flöte", "Flauto Eone", "Flauta Eón", "무한의피리"],
        desc:[],
        pocket:"Key items"
    }
];