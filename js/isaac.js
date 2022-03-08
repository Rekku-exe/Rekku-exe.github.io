function init(){
    document.getElementById("stat-1").value = player["speed"];
    document.getElementById("stat-2").value = player["tears"];
    document.getElementById("stat-3").value = player["damage"];
    document.getElementById("stat-4").value = player["range"];
    document.getElementById("stat-5").value = player["shootSpeed"];
}

function actuFront() {
    document.getElementById("player").style.top = player["y"]+"px";
    document.getElementById("player").style.left = player["x"]+"px";
    document.getElementById("player").src = "../img/isaac/player/isaac-"+player["direction"]+"-"+player["frame"]+".png";
    document.getElementById("player").style.zIndex = player["y"];

    tears.forEach(tear => {
        document.getElementById("tear-"+tear["id"]).style.top = tear["y"]+"px";
        document.getElementById("tear-"+tear["id"]).style.left = tear["x"]+"px";
        document.getElementById("tear-"+tear["id"]).style.zIndex = tear["y"];
    });

    globins.forEach(globin => {
        document.getElementById("globin-"+globin["id"]).style.top = globin["y"]+"px";
        document.getElementById("globin-"+globin["id"]).style.left = globin["x"]+"px";
        document.getElementById("globin-"+globin["id"]).style.zIndex = globin["y"];
    });
}

function createTears(direction) {
    tears.push({
        id: nbTears,
        dir: direction,
        x: player["x"],
        y: player["y"]-15,
        ttl: player["range"],
        rayon: 25,
    });
    tear = document.createElement("img");
    tear.src = "../img/isaac/tears/tears-5.png";
    tear.classList = "sprit tears";
    tear.style.top = (player["y"]-15)+"px";
    tear.style.left = player["x"]+"px";
    tear.id = "tear-"+nbTears++;
    document.getElementById("theBox").appendChild(tear);
}

function sumGlobin(ax, ay, ahp, aspeed, acd, arayon) {
    globins.push({
        id: nbGlobins,
        x: ax,
        y: ay,
        hp: parseInt(ahp),// 10
        speed: parseInt(aspeed),// 1
        dir: 0,
        cd: parseInt(acd),// 20
        maxcd: parseInt(acd),// 20
        rayon: parseInt(arayon),// 30
    });
    globin = document.createElement("img");
    globin.src = "../img/isaac/enemy/globin.png";
    globin.classList = "sprit globins";
    globin.style.top = ay+"px";
    globin.style.left = ax+"px";
    globin.style.width = parseInt(arayon)*2+"px";
    globin.id = "globin-"+nbGlobins++;
    document.getElementById("theBox").appendChild(globin);
}

function killGlobin(globin) {
    document.getElementById("theBox").removeChild(document.getElementById("globin-"+globin["id"]));
    globins = globins.filter(g => g["hp"] > 0);
}

function moveEntity(entity, dirx, diry){
    entity["x"]+=dirx;
    entity["y"]+=diry;
    if(entity["x"]+entity["rayon"] > 1000){
        entity["x"]=1000-entity["rayon"];
    }
    if(entity["x"]-entity["rayon"] < 0){
        entity["x"]=entity["rayon"];
    }
    if(entity["y"] > 700){
        entity["y"]=700;
    }
    if(entity["y"]-entity["rayon"]*2 < 0){
        entity["y"]=entity["rayon"]*2;
    }
}

function actuBack() {
    //déplacement
    player["walk"] = false;
    if(key["ArrowUp"] && !key["ArrowDown"]) {
        player["direction"] = "up";
        player["walk"] = true;
        moveEntity(player, 0, -player["speed"]);
    }
    if(key["ArrowDown"] && !key["ArrowUp"]) {
        player["direction"] = "down";
        player["walk"] = true;
        moveEntity(player, 0, player["speed"]);
    }
    if(key["ArrowLeft"] && !key["ArrowRight"]){
        player["direction"] = "left";
        player["walk"] = true;
        moveEntity(player, -player["speed"], 0);
    }
    if(key["ArrowRight"] && !key["ArrowLeft"]) {
        player["direction"] = "right";
        player["walk"] = true;
        moveEntity(player, player["speed"], 0);
    }
    if(player["walk"]){
        if(player["frameSpeed"] >= 12-player["speed"]*2 || player["speed"] > 7) {
            player["frame"] = (player["frame"]+1)%4;
            player["frameSpeed"] = 0;
        } else {
            player["frameSpeed"]++;
        }
    } else {
        player["frame"] = 0;
    }

    //tir
    shoot = false;
    if(key["d"]){
        shoot = "right";
    } else if(key["s"]){
        shoot = "down";
    } else if(key["q"]){
        shoot = "left";
    } else if(key["z"]){
        shoot = "up";
    }
    if(shoot){
        player["direction"] = shoot;
        if(player["cd"] == 0){
            createTears(shoot);
            player["cd"] = player["tears"];
        }
    }
    if(player["cd"] > 0) player["cd"]--;

    tears.forEach(tear => {
        tear["ttl"]--;
        if(tear["x"] < 0 || tear["x"] > 975 || tear["y"] < 25 || tear["y"] > 700){
            tear["ttl"] = 0;
        }
        switch (tear["dir"]) {
            case "right":
                tear["x"]+=player["shootSpeed"];
                break;
            case "down":
                tear["y"]+=player["shootSpeed"];
                break;
            case "left":
                tear["x"]-=player["shootSpeed"];
                break;
            case "up":
                tear["y"]-=player["shootSpeed"];
                break;
        }
        globins.forEach(globin => {
            document.getElementById("globin-"+globin["id"]).style.animation = "none";
            if(tear["x"] > globin["x"]-globin["rayon"]
                && tear["x"] < globin["x"]+globin["rayon"]
                && tear["y"] > globin["y"]-globin["rayon"]
                && tear["y"] < globin["y"]+globin["rayon"]
            ) {
                document.getElementById("globin-"+globin["id"]).style.animation = "hit 1.2s ease 1";
                globin["hp"]-=player["damage"];
                if(globin["hp"] <= 0){
                    killGlobin(globin);
                }
                tear["ttl"]=0;
            }
        });
        if(tear["ttl"] <= 0){
            document.getElementById("theBox").removeChild(document.getElementById("tear-"+tear["id"]));
            return;
        }
    });
    tears = tears.filter(t => t["ttl"] > 0);

    //ennemi
    globins.forEach(globin => {
        if(globin["dir"] == 2 || globin["dir"] == 3 || globin["dir"] == 4){
            moveEntity(globin, globin["speed"], 0);
        }
        if(globin["dir"] == 4 || globin["dir"] == 5 || globin["dir"] == 6){
            moveEntity(globin, 0, globin["speed"]);
        }
        if(globin["dir"] == 6 || globin["dir"] == 7 || globin["dir"] == 8){
            moveEntity(globin, -globin["speed"], 0);
        }
        if(globin["dir"] == 8 || globin["dir"] == 9 || globin["dir"] == 2){
            moveEntity(globin, 0, -globin["speed"]);
        }
        if(globin["dir"] >= 10){
            if(globin["x"] > player["x"]){
                moveEntity(globin, -globin["speed"], 0);
            }
            if(globin["x"] < player["x"]){
                moveEntity(globin, globin["speed"], 0);
            }
            if(globin["y"] > player["y"]){
                moveEntity(globin, 0, -globin["speed"]);
            }
            if(globin["y"] < player["y"]){
                moveEntity(globin, 0, globin["speed"]);
            }
        }
        if(globin["cd"] == 0){
            globin["dir"] = Math.floor(Math.random() * 18);
            globin["cd"] = globin["maxcd"];
        } else {
            globin["cd"]--;
        }
    });
}

var key = {};
onkeydown = onkeyup = function(e){
    key[e.key] = e.type == 'keydown';
}

player = {
    speed: 3,
    shootSpeed: 5,
    range: 50,
    tears: 30,
    damage: 4,
    x: 100,
    y: 100,
    cd: 0,
    direction: "down",
    frame: 0,
    frameSpeed: 0,
    walk: false,
    rayon: 30,
}
tears = [];
nbTears = 0;
globins = [];
nbGlobins = 0;

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );
        actuBack();
        actuFront();
    }
    main();
})();