//const worker = require('worker_threads');

function init() {
    var tab = [];
    for(var i = 1; i<=25; i++){
        tab.push([]);
        for(var j = 1; j<=10; j++){
            tab[i-1].push(0);
            $('#board').append("<div id=\"" + j + "-" + i + "\" class=\"box\"></div>");
        }
    }
    console.log("init");
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

var posX = 1;
var posY = 1;
var key;

$('body').keydown(function(e) {
    console.log(e.key);
    document.getElementById(posX + "-" + posY).className = "box";
    if(e.key == "ArrowLeft" && posX > 1){
        posX--;
    }
    if(e.key == "ArrowRight" && posX < 10){
    posX++;
    }
    /*if(e.key == "ArrowUp" && posY > 1){
        posY--;
    }
    if(e.key == "ArrowDown" && posY < 25){
        posY++;
    }*/
    document.getElementById(posX + "-" + posY).className = "box redBox";
    key = e.key;
});

var gravity = new Worker("js/gravity.js");
gravity.addEventListener("message", function (event) {
    var returnedData = event;
});
gravity.postMessage({"posY":posY});

var MyGame;
var tNow = window.performance.now();
(function () {
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );
        
        $(posX + "-" + posY).attr("class","box");
        if(posY < 25){
            posY++;
        } else {
            window.cancelAnimationFrame( MyGame );
        }
        $(posX + "-" + posY).attr("class","box redBox");
        sleep(1000);
    }
    main();
})();    
console.log(returnedData);