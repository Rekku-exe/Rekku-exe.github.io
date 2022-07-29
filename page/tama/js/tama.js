chara = document.getElementById('chara');
land = document.getElementById('land');
stat = {
    name: 'Pinou',
    hp: 100,
    hungry: 10000,
    drink: 10000,
    state: 'normal',
    sprite: 'stay',
    spriteNo: 0,
    dir: 'down',
    x: 200,
    y: 200,
    speed: 1,
    focus: 40,
    miniFocus: 40,
    size: 60,
}
notify = {
    hungry: true,
    drink: true,
}
//---
let tamaSave = localStorage.getItem('tamaSave');
if(tamaSave != null){
    tamaSave = JSON.parse(tamaSave);
    stat.name = tamaSave.name;
    stat.hungry = tamaSave.hungry;
    stat.drink = tamaSave.drink;
}

function save(){
    saveTmp = {
        name: stat.name,
        hungry: stat.hungry,
        drink: stat.drink,
    }
    localStorage.setItem('tamaSave', JSON.stringify(saveTmp));
}
//---
document.getElementById('name').value = stat.name;
function updateName() {
    stat.name = document.getElementById('name').value;
}
//---
function tamaLog(text) {
    log = document.createElement('div');
    log.className = 'log';
    log.innerHTML = text;
    document.getElementById('tamaConsole').appendChild(log);
    document.getElementById('tamaConsole').scrollTop = document.getElementById('tamaConsole').scrollHeight;
}
//---
tmp = Math.floor((new Date()).getMilliseconds()/500);
rand = 100;
//---
var MyGame;
var tNow = window.performance.now();
(function () {
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );

        chara.style.marginTop = stat.y + 'px';
        chara.style.marginLeft = stat.x + 'px';

        switch (stat.state) {
            case 'normal':
                if (stat.focus > 0) {
                    stat.focus--;
                } else {
                    rand = Math.floor(Math.random() * 15);
                    stat.focus = stat.miniFocus + Math.floor(Math.random() * 30);
                }
                if (rand >= 2 && rand <= 4) {
                    stat.x += stat.speed;
                    stat.dir = 'right';
                }
                if (rand >= 6 && rand <= 7) {
                    stat.x -= stat.speed;
                    stat.dir = 'left';
                }
                if(rand <= 2){
                    stat.y -= stat.speed;
                    stat.dir = 'up';
                }
                if (rand >= 4 && rand <= 6) {
                    stat.y += stat.speed;
                    stat.dir = 'down';
                }
                if(rand <= 7){
                    stat.sprite = 'walk';
                    
                } else {
                    stat.sprite = 'stay';
                }
                break;
            default:
                break;
        }

        if(stat.x < 0){
            stat.x = 0;
        } else if(stat.x + stat.size > 1000){
            stat.x = 1000 - stat.size;
        }
        if(stat.y < 0){
            stat.y = 0;
        } else if(stat.y + stat.size > 600){
            stat.y = 600 - stat.size;
        }

        if(tmp != Math.floor((new Date()).getMilliseconds()/500)){
            switch(stat.sprite){
                case 'walk':
                    stat.drink -= 3;
                    break;
                case 'stay':
                    stat.drink -= 2;
                    break;
                default:
                    break;
            }
            stat.hungry -= 1;
            document.getElementById('hungry').value = stat.hungry;
            document.getElementById('drink').value = stat.drink;

            if(stat.hungry <= 3000){
                if(notify.hungry){
                    tamaLog(stat.name + ' a faim !');
                    notify.hungry = false;
                }
            } else {
                notify.hungry = true;
            }
            if(stat.drink == 3000){
                if(notify.drink){
                    tamaLog(stat.name + ' a soif !');
                    notify.drink = false;
                }
            } else {
                notify.drink = true;
            }

            if(stat.spriteNo == 0){
                stat.spriteNo = 1;
            } else {
                stat.spriteNo = 0;
            }
            tmp = Math.floor((new Date()).getMilliseconds()/500);
        }
        chara.src = './img/chara/chara-' + stat.dir + '-' + stat.sprite + '-' + stat.spriteNo + '.png';
        
    }
    main();
})();