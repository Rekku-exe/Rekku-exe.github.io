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

function actu(){
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

document.addEventListener("keydown", function onEvent(e) {
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

/*onmessage = function (event) {
    console.log(event)
    
}*/

tmp = Date.now().getSeconds();

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );

        if(tmp != Date.now().getSeconds()){
            tab[posY][posX] = 0;
            if(posY < 24){
                posY++;
            } else {
                window.cancelAnimationFrame( MyGame );
            }
            tab[posY][posX] = 1;
            tmp = Date.now().getSeconds();
        }

        actu();
    }
    main();
})();