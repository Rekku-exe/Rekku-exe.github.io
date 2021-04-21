//const worker = require('worker_threads');


var tab = [];
for(var i = 1; i<=25; i++){
    tab.push([]);
    for(var j = 1; j<=10; j++){
        tab[i-1].push(0);
        $('#board').append('<div id=\"' + j + '-' + i + '\" class=\"box\"></div>');
    }
}
console.log("init done");



function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds){
        actu();
    };
}

function actu(){
    for(var i = 1; i<=25; i++){
        for(var j = 1; j<=10; j++){
            if(tab[i][j] == 0){
                document.getElementById(j + "-" + i).className = "box";
            } else if(tab[i][j] == 1){
                document.getElementById(j + "-" + i).className = "box redBox";
            }
        }
    }
}

var posX = 1;
var posY = 1;
var key;

$('body').keydown(function(e) {
    console.log(e.key);
    tab[posX][posY] = 0;
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
    tab[posX][posY] = 1;
    key = e.key;
});

var gravity = new Worker("js/gravity.js");
onmessage = function (event) {
    var returnedData = event.data;
    console.log(returnedData);
};
gravity.postMessage({"posY":posY});

var MyGame;
var tNow = window.performance.now();
(function () {
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );
        
        tab[posX][posY] = 0;
        if(posY < 25){
            posY++;
        } else {
            window.cancelAnimationFrame( MyGame );
        }
        tab[posX][posY] = 0;
        sleep(1000);
    }
    main();
})();