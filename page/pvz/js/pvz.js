function init(){
    for(let i=0; i<5; i++){
        document.getElementById("terrain").innerHTML += "<div class='row' id='row-"+i+"'></div>";
        for(let j=0; j<9; j++){
            document.getElementById('row-'+i).innerHTML += '<div class="grass" id="grass-'+i+'-'+j+'" onclick="plant('+i+','+j+')"></div>';
        }
    }
}

function choose(id){
    if(cursor != 0){
        document.getElementById("shop-"+cursor).style.border = "none";
        document.getElementById("shop-"+cursor).style.margin = "2px";
    }
    if(cursor != id){
        cursor = id;
        document.getElementById("shop-"+cursor).style.border = "2px solid red";
        document.getElementById("shop-"+cursor).style.margin = "0px";
    } else {
        document.getElementById("shop-"+cursor).style.border = "none";
        document.getElementById("shop-"+cursor).style.margin = "2px";
        cursor = 0;
    }
}

function plant(x, y){
    if(cursor == 0 || tabPlants[x][y] != 0 || money < tabSeed[cursor]["price"]) return;
    tabPlants[x][y] = cursor;
    document.getElementById('grass-'+x+'-'+y).style.backgroundImage = "url('./img/"+tabSeed[cursor]["img"]+"')";
    document.getElementById("shop-"+cursor).style.border = "none";
    document.getElementById("shop-"+cursor).style.margin = "2px";
    money -= tabSeed[cursor]["price"];
    document.getElementById("money").innerHTML = money;
    cursor = 0;
}

function actuFront(){
}

tabSeed = {
    "tournesol": {
        'img': 'tournesol.gif',
        'price': 50,
        'hp': 10,
        'cooldown': 0,
        'maxCooldown': 25
    },
    "pisto-pois": {
        'img': 'pisto-pois.gif',
        'price': 100,
        'hp': 10,
        'cooldown': 0,
        'maxCooldown': 5
    }
};
tabPlants = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];

money = 1000;
cursor = 0;

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );
        //actuBack();
        actuFront();
    }
    main();
})();