for(let i=0; i<5; i++){
    for(let j=0; j<9; j++){
        document.getElementById('column-plant-'+i).innerHTML += '<div class="slotplant" id="slot-'+i+'-'+j+'" onclick="cliqueslot('+i+', '+j+')"></div>';
    }
}

cursor = 0;
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
    console.log("cursor: "+cursor);
}

function cliqueslot(x, y){
    if(tabPlants[x][y] == 0){
        if(cursor != 0 && money >= tabShop[cursor]["price"]){
            plant(x, y);
        }
    } else {
        console.log(tabPlants[x][y]);
    }
}

function plant(x, y){
    console.log('plant: '+cursor+' '+x+'-'+y);
    tabPlants[x][y] = {...tabShop[cursor]};
    document.getElementById('slot-'+x+'-'+y).style.backgroundImage = "url('./img/"+tabShop[cursor]["img"]+"')";
    document.getElementById("shop-"+cursor).style.border = "none";
    document.getElementById("shop-"+cursor).style.margin = "2px";
    money -= tabShop[cursor]["price"];
    document.getElementById("money").innerHTML = money;
    cursor = 0;
}

zid = 0;
function spawnZombie(type, y){
    console.log('spawn: '+type+' '+y);
    tabZombies.push({...tabZombiesBank[type], 'y': y, 'x': 1000, id:++zid});
    z = document.createElement('img');
    z.className = 'zombie entity';
    z.id = 'z-'+zid;
    z.src = './img/'+tabZombiesBank[type]['img'];
    z.style.left = '900px';
    document.getElementById('column-zombie-'+y).appendChild(z);
}

money = 1000;
tabShop = {
    'tournesol': {
        'hp': 10,
        'price': 50,
        'img': 'tournesol.gif'
    },
    'pisto-pois': {
        'hp': 10,
        'price': 100,
        'img': 'pisto-pois.gif',
        'type': 'shoot',
        'cooldown': 100,
        'maxCooldown': 100
    }
}

tabPlants = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];

sid = 0;
tabShoot = [];

tabZombiesBank = {
    'zombie': {
        'img': 'zombie.webp',
        'speed': 0.3,
        'attackSpeed': 0,
        'attackSpeedMax': 100,
        'hp': 10,
    }
}

tabZombies = [];

var MyGame;
var tNow = window.performance.now();
(function () {
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );
        for (let z of tabZombies) {
            if(z.x > 900 || tabPlants[z.y][Math.floor((z.x-1)/100)] == 0 ){
                z.x -= z.speed;
                document.getElementById('z-'+z.id).style.left = z.x+'px';
            } else if (tabPlants[z.y][Math.floor((z.x-1)/100)] != 0 && z.attackSpeed == 0) {
                tabPlants[z.y][Math.floor((z.x-1)/100)].hp -= 1;
                z.attackSpeed = z.attackSpeedMax;
            }
            if (z.attackSpeed > 0) {
                z.attackSpeed--;
            }
        }
        for (let y=0; y<5; y++) {
            for (let x=0; x<9; x++) {
                if(tabPlants[y][x] != 0){
                    if(tabPlants[y][x].hp <= 0){
                        document.getElementById('slot-'+y+'-'+x).style.backgroundImage = "none";
                        tabPlants[y][x] = 0;
                        continue;
                    }
                    if(tabPlants[y][x].type == 'shoot'){
                        if(tabPlants[y][x].cooldown > 0){
                            tabPlants[y][x].cooldown--;
                        } else {
                            if(tabZombies.some(z => z.x > x*100 && z.y == y)){
                                s = document.createElement('img');
                                s.src = './img/pois.png';
                                s.className = 'pois entity';
                                s.style.left = (x+1)*100+'px';
                                s.id = 'pois-'+(++sid);
                                document.getElementById('column-zombie-'+y).appendChild(s);
                                tabShoot.push({'id':sid, 'x': x*100+100, 'y': y});
                                tabPlants[y][x].cooldown = tabPlants[y][x].maxCooldown;
                            }
                        }
                    }
                }
            }
        }
        for (let s of tabShoot) {
            s.x += 3;
            document.getElementById('pois-'+s.id).style.left = s.x+'px';
            tabColi = tabZombies.filter(z => z.y == s.y && z.x < s.x+10 && z.x > s.x-10);
            if(tabColi.length > 0){
                document.getElementById('pois-'+s.id).remove();
                tabShoot.splice(tabShoot.indexOf(s), 1);
                tabColi[0].hp -= 1;
                if (tabColi[0].hp <= 0) {
                    document.getElementById('z-'+tabColi[0].id).remove();
                    tabZombies.splice(tabZombies.indexOf(tabColi[0]), 1);
                }
            }
            if(s.x > 1100){
                document.getElementById('pois-'+s.id).remove();
                tabShoot.splice(tabShoot.indexOf(s), 1);
            }
        }
    }
    main();
})();