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
}

function move() {
    if(key["ArrowUp"] && !key["ArrowDown"]) {
        document.getElementById("player").src = "../img/TESTTEST/isaac-up.png";
        if(y <= 90+speed){
            y=90;
        } else if (map[y-speed-90][x-45] == 0 && map[y-speed-90][x+45] == 0) {
            y-=speed;
        }
    }
    if(key["ArrowDown"] && !key["ArrowUp"]) {
        document.getElementById("player").src = "../img/TESTTEST/isaac-down.png";
        if(y >= 700-speed){
            y=700;
        } else if (map[y+speed][x-45] == 0 && map[y+speed][x+45] == 0) {
            y+=speed;
        }
    }
    if(key["ArrowLeft"] && !key["ArrowRight"]){
        document.getElementById("player").src = "../img/TESTTEST/isaac-left.png";
        if(x <= 50+speed){
            x=50;
        } else if (map[y][x-speed-45] == 0 && map[y-90][x-speed-45] == 0) {
            x-=speed;
        }
    }
    if(key["ArrowRight"] && !key["ArrowLeft"]) {
        document.getElementById("player").src = "../img/TESTTEST/isaac-right.png";
        if(x >= 950-speed){
            x=950;
        } else if (map[y][x+speed+45] == 0 && map[y-90][x+speed+45] == 0) {
            x+=speed;
        }
    }
    document.getElementById("player").style.zIndex = y;
}

function test(){
    for(var i = 300; i<=400; i++){
        for(var j = 300; j<=400; j++){
            map[j][i] = 1;
        }
    }
}

speed = 3;
x = 150;
y = 150;

var key = {};
onkeydown = onkeyup = function(e){
    key[e.key] = e.type == 'keydown';
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
        }
        move();
        actu();
    }
    main();
})();