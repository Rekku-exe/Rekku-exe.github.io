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

function actu(){
    for(var i = 0; i<25; i++){
        for(var j = 0; j<10; j++){
            if(tab[i][j] == 0){
                document.getElementById(i + "-" + j).className = "box";
            } else if(tab[i][j] == 1){
                document.getElementById(i + "-" + j).className = "box redBox";
            } else if(tab[i][j] == 2){
                document.getElementById(i + "-" + j).className = "box greenBox";
            }
        }
    }
}

function ligne(){
    for(var i = 0; i<25; i++){
        var val = true;
        for(var l = 0; l<10; l++){
            if(tab[i][l] != 2){
                val = false;
            }
        }
        if(val){
            for(var j = i; j>0; j--){
                for(var k = 0; k<10; k++){
                    tab[j][k] = tab[j-1][k];
                }
            }
        }
    }
}

posX = 4;
posY = 0;

document.addEventListener("keydown", function onEvent(e) {
    tab[posY][posX] = 0;
    if(e.key == "ArrowLeft" && posX > 0 && tab[posY][posX -1] == 0){
        posX--;
    } else if(e.key == "ArrowRight" && posX < 9 && tab[posY][posX +1] == 0){
    posX++;
    } else if(e.key == "ArrowDown" && posY < 24 && tab[posY +1][posX] == 0){
        posY++;
    } else if(e.key == "e"){
        window.cancelAnimationFrame( MyGame );
    }
    tab[posY][posX] = 1;
    actu();
});

/*onmessage = function (event) {
    console.log(event)
    
}*/

tmp = (new Date()).getSeconds();

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );

        if(tmp != (new Date()).getSeconds()){
            tab[posY][posX] = 0;
            if(posY < 24 && tab[posY +1][posX] == 0){
                posY++;
            } else {
                tab[posY][posX] = 2;
                posY = 0;
                ligne();
            }
            tab[posY][posX] = 1;
            tmp = (new Date()).getSeconds();
        }

        actu();
    }
    main();
})();