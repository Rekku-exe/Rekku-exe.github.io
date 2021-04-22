
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
                if(j != posX){
                    document.getElementById(i + "-" + j).className = "box";
                } else {
                    document.getElementById(i + "-" + j).className = "box semiRedBox";
                }
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

function rollForme(){
    forme = listForme[Math.floor(Math.random() * 7)][0];
}

function putting(arg){
    if(forme == "I1"){
        tab[posY-1][posX] = arg;//   X
        tab[posY][posX] = arg;//     X
        tab[posY+1][posX] = arg;//   X
        tab[posY+2][posX] = arg;//   X
    } else if(forme == "I2"){
        tab[posY][posX-1] = arg;//
        tab[posY][posX] = arg;//    X X X X
        tab[posY][posX+1] = arg;//
        tab[posY][posX+2] = arg;//
    } else if(forme == "L1"){
        tab[posY-1][posX] = arg;//   X
        tab[posY][posX] = arg;//     X
        tab[posY+1][posX] = arg;//   X X
        tab[posY+1][posX+1] = arg;//
    } else if(forme == "L2"){
        tab[posY][posX+1] = arg;//
        tab[posY][posX] = arg;//     X X X
        tab[posY][posX-1] = arg;//   X
        tab[posY+1][posX-1] = arg;//
    } else if(forme == "L3"){
        tab[posY-1][posX] = arg;//  X X
        tab[posY][posX] = arg;//      X
        tab[posY-1][posX-1] = arg;//  X
        tab[posY+1][posX] = arg;//
    } else if(forme == "L4"){
        tab[posY-1][posX+1] = arg;//
        tab[posY][posX-1] = arg;//      X
        tab[posY][posX] = arg;//    X X X
        tab[posY][posX+1] = arg;//
    } else if(forme == "l1"){
        tab[posY-1][posX] = arg;//    X
        tab[posY][posX] = arg;//      X
        tab[posY+1][posX] = arg;//  X X
        tab[posY+1][posX-1] = arg;//
    } else if(forme == "l2"){
        tab[posY][posX-1] = arg;//
        tab[posY][posX] = arg;//     X
        tab[posY-1][posX-1] = arg;// X X X
        tab[posY][posX+1] = arg;//
    } else if(forme == "l3"){
        tab[posY-1][posX+1] = arg;// X X
        tab[posY-1][posX] = arg;//   X  
        tab[posY][posX] = arg;//     X
        tab[posY+1][posX] = arg;//
    } else if(forme == "l4"){
        tab[posY][posX-1] = arg;//
        tab[posY][posX] = arg;//     X X X
        tab[posY][posX+1] = arg;//       X
        tab[posY+1][posX+1] = arg;//
    } else if(forme == "O1"){
        tab[posY][posX] = arg;//
        tab[posY+1][posX] = arg;//    X X
        tab[posY][posX+1] = arg;//    X X
        tab[posY+1][posX+1] = arg;//
    } else if(forme == "S1"){
        tab[posY][posX+1] = arg;//
        tab[posY][posX] = arg;//       X X
        tab[posY+1][posX] = arg;//   X X
        tab[posY+1][posX-1] = arg;//
    } else if(forme == "S2"){
        tab[posY-1][posX] = arg;//    X
        tab[posY][posX] = arg;//      X X
        tab[posY][posX+1] = arg;//      X
        tab[posY+1][posX+1] = arg;//
    } else if(forme == "Z1"){
        tab[posY][posX-1] = arg;//
        tab[posY][posX] = arg;//     X X
        tab[posY+1][posX] = arg;//     X X
        tab[posY+1][posX+1] = arg;//
    } else if(forme == "Z2"){
        tab[posY-1][posX] = arg;//      X
        tab[posY][posX] = arg;//      X X
        tab[posY][posX-1] = arg;//    X
        tab[posY+1][posX-1] = arg;//
    } else if(forme == "T1"){
        tab[posY][posX-1] = arg;//
        tab[posY][posX] = arg;//     X X X
        tab[posY][posX+1] = arg;//     X
        tab[posY+1][posX] = arg;//
    } else if(forme == "T2"){
        tab[posY-1][posX] = arg;//    X
        tab[posY][posX] = arg;//    X X
        tab[posY+1][posX] = arg;//    X
        tab[posY][posX-1] = arg;//
    } else if(forme == "T3"){
        tab[posY-1][posX] = arg;//
        tab[posY][posX] = arg;//       X
        tab[posY][posX-1] = arg;//   X X X
        tab[posY][posX+1] = arg;//
    } else if(forme == "T4"){
        tab[posY-1][posX] = arg;//     X
        tab[posY][posX] = arg;//       X X
        tab[posY+1][posX] = arg;//     X
        tab[posY][posX+1] = arg;//
    }
}

function collision(dir){
    if(forme == "I1"){//      X X X X
        if(dir == "g"){//
            return (posX > 0 && tab[posY-1][posX-1] == 0 && tab[posY][posX-1] == 0 && tab[posY+1][posX-1] == 0 && tab[posY+2][posX-1] == 0);
        } else if(dir == "d"){
            return (posX < 9 && tab[posY-1][posX+1] == 0 && tab[posY][posX+1] == 0 && tab[posY+1][posX+1] == 0 && tab[posY+2][posX+1] == 0);
        } else if(dir == "b") {
            return (posY < 22 && tab[posY+3][posX] == 0);
        }
    } else if(forme == "I2"){
        if(dir == "g"){
            return (posX > 1 && tab[posY][posX-2] == 0);
        } else if(dir == "d"){
            return (posX < 7 && tab[posY][posX+3] == 0);
        } else if(dir == "b") {
            return (posY < 24 && tab[posY+1][posX-1] == 0 && tab[posY+1][posX] == 0 && tab[posY+1][posX+1] == 0 && tab[posY+1][posX+2] == 0);
        }
    } else if(forme == "L1"){//      X
        if(dir == "g"){//        X X X
            return (posX > 0 && tab[posY-1][posX-1] == 0 && tab[posY][posX-1] == 0 && tab[posY+1][posX-1] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY-1][posX+1] == 0 && tab[posY][posX+1] == 0 && tab[posY+1][posX+2] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+2][posX] == 0 && tab[posY+2][posX+1] == 0);
        }
    } else if(forme == "L2"){
        if(dir == "g"){
            return (posX > 1 && tab[posY][posX-2] == 0 && tab[posY+1][posX-2] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY][posX+2] == 0 && tab[posY+1][posX] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+2][posX-1] == 0 && tab[posY+1][posX] == 0 && tab[posY+1][posX+1] == 0);
        }
    } else if(forme == "L3"){
        if(dir == "g"){
            return (posX > 1 && tab[posY-1][posX-2] == 0 && tab[posY][posX-1] == 0 && tab[posY+1][posX-1]);
        } else if(dir == "d"){
            return (posX < 9 && tab[posY-1][posX+1] == 0 && tab[posY][posX+1] == 0 && tab[posY+1][posX+1]);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY][posX-1] == 0 && tab[posY+2][posX] == 0);
        } 
    } else if(forme == "L4"){
        if(dir == "g"){
            return (posX > 1 && tab[posY-1][posX] == 0 && tab[posY][posX-2] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY-1][posX+2] == 0 && tab[posY][posX+2] == 0);
        } else if(dir == "b") {
            return (posY < 24 && tab[posY+1][posX-1] == 0 && tab[posY][posX] == 0 && tab[posY+1][posX+1] == 0);
        } 
    } else if(forme == "l1"){//  X X X
        if(dir == "g"){//            X
            return (posX > 1 && tab[posY-1][posX-1] == 0 && tab[posY][posX-1] == 0 && tab[posY+1][posX-2] == 0);
        } else if(dir == "d"){
            return (posX < 9 && tab[posY-1][posX+1] == 0 && tab[posY][posX+1] == 0 && tab[posY+1][posX+1] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+2][posX] == 0 && tab[posY+2][posX-1] == 0);
        } 
    } else if(forme == "l2"){
        if(dir == "g"){
            return (posX > 1 && tab[posY-1][posX-2] == 0 && tab[posY][posX-2] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY-1][posX] == 0 && tab[posY][posX+2] == 0);
        } else if(dir == "b") {
            return (posY < 24 && tab[posY+1][posX-1] == 0 && tab[posY+1][posX] == 0 && tab[posY+1][posX+1] == 0);
        } 
    } else if(forme == "l3"){
        if(dir == "g"){
            return (posX > 0 && tab[posY-1][posX-1] == 0 && tab[posY][posX-1] == 0 && tab[posY+1][posX-1] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY-1][posX+2] == 0 && tab[posY][posX+1] == 0 && tab[posY+1][posX+1] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+2][posX] == 0 && tab[posY][posX+1] == 0);
        } 
    } else if(forme == "l4"){
        if(dir == "g"){
            return (posX > 1 && tab[posY][posX-2] == 0 && tab[posY+1][posX] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY][posX+2] == 0 && tab[posY+1][posX+2] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+1][posX-1] == 0 && tab[posY+1][posX] == 0 && tab[posY+2][posX+1] == 0);
        } 
    } else if(forme == "O1"){//  X X
        if(dir == "g"){//        X X
            return (posX > 0 && tab[posY][posX-1] == 0 && tab[posY+1][posX-1] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY][posX+2] == 0 && tab[posY+1][posX+2] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+2][posX] == 0 && tab[posY+2][posX+1] == 0);
        } 
    } else if(forme == "S1"){//    X X
        if(dir == "g"){//        X X
            return (posX > 1 && tab[posY][posX-1] == 0 && tab[posY+1][posX-2] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY][posX+2] == 0 && tab[posY+1][posX+1] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+2][posX-1] == 0 && tab[posY+2][posX] == 0 && tab[posY+1][posX+1] == 0);
        }
    } else if(forme == "S2"){
        if(dir == "g"){
            return (posX > 0 && tab[posY-1][posX-1] == 0 && tab[posY][posX-1] == 0 && tab[posY+1][posX] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY-1][posX+1] == 0 && tab[posY][posX+2] == 0 && tab[posY+1][posX+2] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+1][posX] == 0 && tab[posY+2][posX+1] == 0);
        }
    } else if(forme == "Z1"){//  X X
        if(dir == "g"){//          X X
            return (posX > 1 && tab[posY][posX-2] == 0 && tab[posY+1][posX-1] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY][posX+1] == 0 && tab[posY+1][posX+2] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+1][posX+1] == 0 && tab[posY+2][posX] == 0 && tab[posY+2][posX+1] == 0);
        }
    } else if(forme == "Z2"){
        if(dir == "g"){
            return (posX > 1 && tab[posY-1][posX-1] == 0 && tab[posY][posX-2] == 0 && tab[posY+1][posX-2] == 0);
        } else if(dir == "d"){
            return (posX < 9 && tab[posY-1][posX+1] == 0 && tab[posY][posX+1] == 0 && tab[posY+1][posX] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+2][posX-1] == 0 && tab[posY+1][posX] == 0);
        }
    } else if(forme == "T1"){//    X X X
        if(dir == "g"){//            X
            return (posX > 1 && tab[posY][posX-2] == 0 && tab[posY+1][posX-1]);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY][posX+2] == 0 && tab[posY+1][posX+1]);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+1][posX-1] == 0 && tab[posY+2][posX] == 0 && tab[posY+1][posX+1] == 0);
        }
    } else if(forme == "T2"){
        if(dir == "g"){
            return (posX > 1 && tab[posY-1][posX-1] == 0 && tab[posY][posX-2] == 0 && tab[posY+1][posX-1] == 0);
        } else if(dir == "d"){
            return (posX < 9 && tab[posY-1][posX+1] == 0 && tab[posY][posX+1] == 0 && tab[posY+1][posX+1] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+1][posX-1] == 0 && tab[posY+2][posX] == 0);
        }
    } else if(forme == "T3"){
        if(dir == "g"){
            return (posX > 1 && tab[posY-1][posX-1] == 0 && tab[posY][posX-2]);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY+1][posX+1] == 0 && tab[posY][posX+2]);
        } else if(dir == "b") {
            return (posY < 24 && tab[posY+1][posX-1] == 0 && tab[posY+1][posX] == 0 && tab[posY+1][posX+1] == 0);
        }
    } else if(forme == "T4"){///////////////////////
        if(dir == "g"){
            return (posX > 0 && tab[posY-1][posX-1] == 0 && tab[posY][posX-1] == 0 && tab[posY+1][posX-1] == 0);
        } else if(dir == "d"){
            return (posX < 8 && tab[posY-1][posX+1] == 0 && tab[posY][posX+2] == 0 && tab[posY+1][posX+1] == 0);
        } else if(dir == "b") {
            return (posY < 23 && tab[posY+2][posX] == 0 && tab[posY+1][posX+1] == 0);
        }
    }
}

function canExist(f){
    if(f == "I1"){
        return (tab[posY-1][posX] == 0 && tab[posY][posX] == 0 && tab[posY+1][posX] == 0 && tab[posY+2][posX] == 0);
    } else if(f == "I2"){
        return (tab[posY][posX-1] == 0 && tab[posY][posX] == 0 && tab[posY][posX+1] == 0 && tab[posY][posX+2] == 0);
    } else if(f == "L1"){
        return (tab[posY][posX] == 0 && tab[posY-1][posX] == 0 && tab[posY+1][posX] == 0 && tab[posY+1][posX+1] == 0);
    } else if(f == "L2"){
        return (tab[posY][posX-1] == 0 && tab[posY+1][posX-1] == 0 && tab[posY][posX] == 0 && tab[posY][posX+1] == 0);
    } else if(f == "L3"){
    } else if(f == "L4"){
    }
}

posX = 4;
posY = 1;
listForme = [
    ["I1", "I2", "I1", "I2"],
    ["L1", "L2", "L3", "I4"],
    ["l1", "l2", "l3", "l4"],
    ["O1", "O1", "O1", "O1"],
    ["S1", "S2", "S1", "S2"],
    ["Z1", "Z2", "Z1", "Z2"],
    ["T1", "T2", "T3", "T4"]
];
forme = listForme[Math.floor(Math.random() * 7)][0];

document.addEventListener("keydown", function onEvent(e) {
    putting(0);
    if(e.key == "ArrowLeft" && collision("g")){
        posX--;
    } else if(e.key == "ArrowRight" && collision("d")){
    posX++;
    } else if(e.key == "ArrowDown" && collision("b")){
        posY++;
    } else if(e.key == "e"){
        window.cancelAnimationFrame( MyGame );
    }
    putting(1);
    actu();
});

tmp = (new Date()).getSeconds();

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );

        if(tmp != (new Date()).getSeconds()){
            putting(0);
            if(collision("b")){
                posY++;
            } else {
                putting(2);
                posX = 5;
                posY = 1;
                rollForme()
                ligne();
            }
            putting(1);
            tmp = (new Date()).getSeconds();
        }

        actu();
    }
    main();
})();