function init(){

}

function actuFront() {
    document.getElementById("player").style.top = player["y"]+"px";
    document.getElementById("player").style.left = player["x"]+"px";
    document.getElementById("player").src = "../img/isaac/player/isaac-"+player["direction"]+"-"+player["frame"]+".png";
    document.getElementById("player").style.zIndex = player["y"];
    document.getElementById("stat-1").innerText = "speed:"+player["speed"];
    document.getElementById("stat-2").innerText = "tears:"+player["tears"];
    document.getElementById("stat-3").innerText = "damage:"+player["damage"];
    document.getElementById("stat-4").innerText = "range:"+player["range"];
    document.getElementById("stat-5").innerText = "shoot speed:"+player["shootSpeed"];

    tears.forEach(tear => {
        document.getElementById("tear-"+tear["id"]).style.top = tear["y"]+"px";
        document.getElementById("tear-"+tear["id"]).style.left = tear["x"]+"px";
        document.getElementById("tear-"+tear["id"]).style.zIndex = tear["y"];
    });
}

function createTears(direction) {
    tears.push({
        id: nbTears,
        dir: direction,
        x: player["x"],
        y: player["y"]-15,
        ttl: player["range"],
    });
    tear = document.createElement("img");
    tear.src = "../img/isaac/tears/tears-5.png";
    tear.classList = "sprit tears";
    tear.style.top = player["y"]+"px";
    tear.style.left = player["x"]+"px";
    tear.id = "tear-"+nbTears++;
    document.getElementById("theBox").appendChild(tear);
}

function actuBack() {
    //déplacement
    player["walk"] = false;
    if(key["ArrowUp"] && !key["ArrowDown"]) {
        player["direction"] = "up";
        player["walk"] = true;
        if(player["y"] <= 50+player["speed"]){
            player["y"]=50;
        } else {
            player["y"]-=player["speed"];
        }
    }
    if(key["ArrowDown"] && !key["ArrowUp"]) {
        player["direction"] = "down";
        player["walk"] = true;
        if(player["y"] >= 700-player["speed"]){
            player["y"]=700;
        } else {
            player["y"]+=player["speed"];
        }
    }
    if(key["ArrowLeft"] && !key["ArrowRight"]){
        player["direction"] = "left";
        player["walk"] = true;
        if(player["x"] <= 25+player["speed"]){
            player["x"]=25;
        } else {
            player["x"]-=player["speed"];
        }
    }
    if(key["ArrowRight"] && !key["ArrowLeft"]) {
        player["direction"] = "right";
        player["walk"] = true;
        if(player["x"] >= 975-player["speed"]){
            player["x"]=975;
        } else {
            player["x"]+=player["speed"];
        }
    }
    if(player["walk"]){
        if(player["frameSpeed"] == 6) {
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
        if(tear["ttl"] == 0){
            document.getElementById("theBox").removeChild(document.getElementById("tear-"+tear["id"]));
            return;
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
    });
    tears = tears.filter(t => t["ttl"] != 0);
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
    damage: 0,
    x: 100,
    y: 100,
    cd: 0,
    direction: "down",
    frame: 0,
    frameSpeed: 0,
    walk: false,
}
tears = [];
nbTears = 0;

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