const main = document.getElementById('main');

let champs = {
    "aatrox": false,
    "ahri": false,
    "akali": false,
    "alistar": false,
    "ambessa": false,
    "amumu": false,
    "anivia": false,
    "annie": false,
    "aphelios": false,
    "ashe": false,
    "aurelionsol": false,
    "azir": false,
    "bard": false,
    "belveth": false,//
    "blitzcrank": false,
    "brand": false,
    "braum": false,
    "briar": false,
    "caitlyn": false,
    "camille": false,
    "cassiopeia": false,
    "chogath": false,
    "corki": false,
    "darius": false,
    "diana": false,
    "draven": false,
    "drmundo": false,
    "ekko": false,
    "elise": false,
    "evelynn": false,
    "ezreal": false,
    "fiddlesticks": false,
    "fiora": false,
    "fizz": false,
    "galio": false,
    "gangplank": false,
    "garen": false,
    "gnar": false,
    "gragas": false,
    "graves": false,
    "gwen": false,
    "hecarim": false,
    "heimerdinger": false,
    "hwei": false,
    "illaoi": false,
    "irelia": false,
    "ivern": false,
    "janna": false,
    "jarvaniv": false,
    "jax": false,
    "jayce": false,
    "jhin": false,
    "jinx": false,
    "kaisa": false,
    "kalista": false,
    "karma": false,
    "karthus": false,
    "kassadin": false,
    "katarina": false,
    "kayle": false,
    "kayn": false,
    "kennen": false,
    "khazix": false,
    "kindred": false,
    "kled": false,
    "kogmaw": false,
    "leblanc": false,
    "leesin": false,
    "leona": false,
    "lillia": false,
    "lissandra": false,
    "lucian": false,
    "lulu": false,
    "lux": false,
    "malphite": false,
    "malzahar": false,
    "maokai": false,
    "masteryi": false,
    "mel": false,//
    "milio": false,
    "missfortune": false,
    "mordekaiser": false,
    "morgana": false,
    "naafiri": false,//
    "nami": false,
    "nasus": false,
    "nautilus": false,
    "neeko": false,
    "nidalee": false,
    "nilah": false,
    "nocturne": false,
    "nunu": false,
    "olaf": false,
    "orianna": false,
    "ornn": false,
    "pantheon": false,
    "poppy": false,
    "pyke": false,
    "qiyana": false,
    "quinn": false,
    "rakan": false,
    "rammus": false,
    "reksai": false,
    "rell": false,
    "renataglasc": false,
    "renekton": false,
    "rengar": false,
    "riven": false,
    "rumble": false,
    "ryze": false,
    "samira": false,
    "sejuani": false,
    "senna": false,
    "seraphine": false,
    "sett": false,
    "shaco": false,
    "shen": false,
    "shyvana": false,
    "singed": false,
    "sion": false,
    "sivir": false,
    "skarner": false,
    "smolder": false,//
    "sona": false,
    "soraka": false,
    "swain": false,
    "sylas": false,
    "syndra": false,
    "tahmkench": false,
    "taliyah": false,
    "talon": false,
    "taric": false,
    "teemo": false,
    "thresh": false,
    "tristana": false,
    "trundle": false,
    "tryndamere": false,
    "twistedfate": false,
    "twitch": false,
    "udyr": false,
    "urgot": false,
    "varus": false,
    "vayne": false,
    "veigar": false,
    "velkoz": false,
    "vex": false,
    "vi": false,
    "viego": false,
    "viktor": false,
    "vladimir": false,
    "volibear": false,
    "warwick": false,
    "wukong": false,//"monkeyking": false,
    "xayah": false,
    "xerath": false,
    "xinzhao": false,
    "yasuo": false,
    "yone": false,
    "yorick": false,
    "yuumi": false,
    "zac": false,
    "zed": false,
    "zeri": false,
    "ziggs": false,
    "zilean": false,
    "zoe": false,
    "zyra": false,
}

function loading() {
    const champsStorage = JSON.parse(localStorage.getItem('champs'));
    let count = 0;
    let countMax = 0;
    for (const c in champs) {
        if (champsStorage[c]) {
            champs[c] = champsStorage[c];
        }
        const icon = document.createElement('img');
        icon.src = `./img/champs/${c}.png`;
        icon.id = c;
        icon.className = 'champ';
        if (champs[c]) {
            icon.style.opacity = '10%';
            count++;
        } else {
            icon.style.opacity = '100%';
        }
        icon.onclick = onClickChamp;
        main.append(icon);
        countMax++;
    }
    document.getElementById('champCheckCount').innerText = count;
    document.getElementById('champMaxCount').innerText = countMax;
}

function onClickChamp() {
    champs[this.id] = !champs[this.id];
    if (champs[this.id]) {
        this.style.opacity = '10%';
        document.getElementById('champCheckCount').innerText++;
    } else {
        this.style.opacity = '100%';
        document.getElementById('champCheckCount').innerText--;
    }
    localStorage.setItem('champs', JSON.stringify(champs));
}