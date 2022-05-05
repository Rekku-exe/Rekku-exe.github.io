function init(){
    for(let i=0; i<5; i++){
        document.getElementById("terrain").innerHTML += "<div class='row' id='row-"+i+"'></div>";
        for(let j=0; j<9; j++){
            document.getElementById('row-'+i).innerHTML += '<div class="grass" id="grass-'+i+'-'+j+'" onclick="clique('+i+','+j+')"></div>';
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

function clique(x, y){
    if(tabPlants[x][y] == 0){
        if(cursor != 0 && money >= tabShop[cursor]["price"]){
            plant(x, y);
        }
    } else {
        switch (tabPlants[x][y]['name']) {
            case 'tournesol':
                if(tabPlants[x][y]['sun']){
                    money += 25;
                    document.getElementById("money").innerHTML = money;
                    document.getElementById('grass-'+x+'-'+y).innerHTML = "";
                    tabPlants[x][y]['sun'] = false;
                }
                break;
        }
    }
}

function plant(x, y){
    switch (cursor) {
        case 'tournesol':
            tabPlants[x][y] = {
                'name': 'tournesol',
                'img': 'tournesol.gif',
                'hp': 10,
                'cooldown': 100,
                'maxCooldown': 1000,
                'sun': false
            }
            break;
        case 'pisto-pois':
            tabPlants[x][y] = {
                'name': 'pisto-Pois',
                'img': 'pisto-pois.gif',
                'hp': 10,
                'cooldown': 100,
                'maxCooldown': 100
            }
            break;
    }
    document.getElementById('grass-'+x+'-'+y).style.backgroundImage = "url('./img/"+tabShop[cursor]["img"]+"')";
    document.getElementById("shop-"+cursor).style.border = "none";
    document.getElementById("shop-"+cursor).style.margin = "2px";
    money -= tabShop[cursor]["price"];
    document.getElementById("money").innerHTML = money;
    cursor = 0;
}

function spawnZombie(y){
    zombies.push({
        'img': 'zombie.webp',
        'y': y,
        'x': 800,
    });
    z = document.createElement('img');
    z.className = 'zombie';
    z.position = 'relative';
    z.src = './img/zombie.webp';
    z.style.top = (y*0)+'px';
    z.style.left = '170px';
    document.getElementById('horde').appendChild(z);
}

function actuFront(){
}

function actuBack(){
    for(let i=0; i<5; i++){
        for(let j=0; j<9; j++){
            if(tabPlants[i][j] != 0){
                switch (tabPlants[i][j]['name']) {
                    case 'tournesol':
                        if(!tabPlants[i][j]['sun']){
                            if(tabPlants[i][j]['cooldown'] == 0){
                                tabPlants[i][j]['cooldown'] = tabPlants[i][j]['maxCooldown'];
                                document.getElementById('grass-'+i+'-'+j).innerHTML = '<img class="sun" src="./img/sun.webp"/>';
                                tabPlants[i][j]['sun'] = true;
                            } else {
                                tabPlants[i][j]['cooldown']--;
                            }
                        }
                        break;
                    case 'pisto-pois':
                        break;
                }
            }
        }
    }
}

tabShop = {
    'tournesol': {
        'price': 50,
        'img': 'tournesol.gif'
    },
    'pisto-pois': {
        'price': 100,
        'img': 'pisto-pois.gif'
    }
}

tabPlants = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];

money = 1000;
cursor = 0;
idsun = 0;
zombies = [];

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );
        actuBack();
        actuFront();
    }
    main();
})();