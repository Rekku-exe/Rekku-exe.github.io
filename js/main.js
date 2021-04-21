//const worker = require('worker_threads');

function init() {
    console.log("init");
    for(var i = 1; i<=25; i++){
        for(var j = 1; j<=10; j++){
            $('#board').append("<div id=\"" + j + "-" + i + "\" class=\"box\"></div>");
        }
    }
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

$('body').keydown(async function(e) {
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
    var returnedData = event.data;
});
gravity.postMessage({"posY":posY});

var MyGame;
var tNow = window.performance.now();
(function () {
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );
        
        document.getElementById(posX + "-" + posY).className = "box";
        if(posY < 25){
            posY++;
        } else {
            window.cancelAnimationFrame( MyGame );
        }
        document.getElementById(posX + "-" + posY).className = "box redBox";
        console.log(returnedData);
        sleep(1000);
    }
    main();
})();    
        