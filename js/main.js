//const worker = require('worker_threads');

function init(){
    tab = [];
    for(var i = 0; i<25; i++){
        tab.push([]);
        for(var j = 0; j<10; j++){
            tab[i].push(0);
            $('#board').append('<div id=\"' + i + '-' + j + '\" class=\"box\"></div>');
        }
    }
    console.log("init done");
}



function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    while (currentDate - date < milliseconds) {
        currentDate = Date.now();
        actu();
    }
}

async function actu(){
    for(var i = 0; i<25; i++){
        for(var j = 0; j<10; j++){
            if(tab[i][j] == 0){
                document.getElementById(i + "-" + j).className = "box";
            } else if(tab[i][j] == 1){
                document.getElementById(i + "-" + j).className = "box redBox";
            }
        }
    }
}

posX = 0;
posY = 0;

document.addEventListener("keypress", function onEvent(e) {
    tab[posY][posX] = 0;
    if(e.key == "ArrowLeft" && posX > 0){
        posX--;
    } else if(e.key == "ArrowRight" && posX < 9){
    posX++;
    }/* else if(e.key == "ArrowDown" && posY < 25){
        posY++;
    }*/
    tab[posY][posX] = 1;
    actu();
    console.log(e.key);
    console.log("---");
});

/*var gravity = new Worker("js/gravity.js");
onmessage = function (event) {
    returnedData = event.data;
    console.log(returnedData);
};
gravity.postMessage({"posY":posY});*/

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );
        
        tab[posY][posX] = 0;
        if(posY < 24){
            posY++;
        } else {
            window.cancelAnimationFrame( MyGame );
        }
        tab[posY][posX] = 1;
        actu();
        sleep(1000);
    }
    main();
})();