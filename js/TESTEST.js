function init() {
    map = [];
    for(var i = 0; i<=700; i++){
        map.push([]);
        for(var j = 0; j<=1000; j++){
            map[i].push(0);
        }
    }
    console.log("init done");
}

function actu() {
    document.getElementById("player").style.top = y+"px";
    document.getElementById("player").style.left = x+"px";
    document.getElementById("player").src = "../img/TESTTEST/isaac-"+direction+"-"+movement+".png";
}

function move() {
    walk = false;
    if(key["ArrowUp"] && !key["ArrowDown"]) {
        direction = "up";
        walk = true;
        if(y <= 50+speed){
            y=50;
        } else if (map[y-speed-50][x-25] == 0 && map[y-speed-50][x+25] == 0) {
            y-=speed;
        }
    }
    if(key["ArrowDown"] && !key["ArrowUp"]) {
        direction = "down";
        walk = true;
        if(y >= 700-speed){
            y=700;
        } else if (map[y+speed][x-25] == 0 && map[y+speed][x+25] == 0) {
            y+=speed;
        }
    }
    if(key["ArrowLeft"] && !key["ArrowRight"]){
        direction = "left";
        walk = true;
        if(x <= 25+speed){
            x=25;
        } else if (map[y][x-speed-25] == 0 && map[y-50][x-speed-25] == 0) {
            x-=speed;
        }
    }
    if(key["ArrowRight"] && !key["ArrowLeft"]) {
        direction = "right";
        walk = true;
        if(x >= 975-speed){
            x=975;
        } else if (map[y][x+speed+25] == 0 && map[y-50][x+speed+25] == 0) {
            x+=speed;
        }
    }
    if(walk){
        walkcount++;
        stopwalk = false;
    }
    if(walkcount >= 15){
        walkcount = 0;
        if(movement == 1){
            movement = 2;
        } else {
            movement = 1;
        }
    }
    document.getElementById("player").style.zIndex = y;
}

function test(){
    for(var i = 325; i<=375; i++){
        for(var j = 295; j<=345; j++){
            map[j][i] = 1;
        }
    }
}

function getHit(){
    document.getElementById("player").style.animation = "hit 1.2s ease 1";
}
function beNormal(){
    document.getElementById("player").style.animation = "null";
}

speed = 3;
x = 150;
y = 150;
status = "normal";
direction = "down";
movement = 0;
walkcount = 0;

var key = {};
onkeydown = onkeyup = function(e){
    key[e.key] = e.type == 'keydown';
    if(key["n"]){
        status = "hit";
        getHit();
        
    }
}

tmp = (new Date()).getSeconds();

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    test();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );

        if(tmp != (new Date()).getSeconds()){
            tmp = (new Date()).getSeconds();
            if(status == "hit"){
                status = "normal";
            } else if(status == "normal") {
                beNormal();
            }
        }
        stopwalk = true;
        move();
        actu();
        if(stopwalk){
            movement = 0;
        }
    }
    main();
})();