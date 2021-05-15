function init(){

}

function actu(){
    if(y >= sol) {
        y = sol;
        state = "run";
    }
    document.getElementById("player").style.top = y+"px";
    if(state == "run"){
        document.getElementById("player").src = "../img/naruto/naruto-run-"+movement+".png";
    } else if(state == "jump") {
        if(acceleration <= 0){
            document.getElementById("player").src = "../img/naruto/naruto-jump-0.png";
        } else {
            document.getElementById("player").src = "../img/naruto/naruto-jump-1.png";
        }
    }
    killMob = false;
    for(i = 0; i < listeMob.length; i++){
        if(listeMob[i][1] <= -80){
            document.getElementById("leJeu").removeChild(document.getElementById("mob-"+listeMob[i][0]));
            killMob = true;
        } else {
            document.getElementById("mob-"+listeMob[i][0]).style.left = listeMob[i][1]+"px";
        }
    }
    if(killMob){
        listeMob.shift();
    }
}

function newMob(hauteur){
    let mob = document.createElement('img');
    mob.src = "../img/naruto/shuriken.png";
    mob.classList = "sprite mob";
    mob.style.top = hauteur+"px";
    mob.style.left = "2000px";
    id = inc++;
    mob.id = "mob-"+id;
    listeMob.push([id, 2000]);
    document.getElementById("leJeu").appendChild(mob);
}

var key = {};
onkeydown = onkeyup = function(e){
    key[e.key] = e.type == 'keydown';
}

sol = 600;
y = sol;
movement = 0;
acceleration = 0;
state = "run";
listeMob = [];
inc = 0;
tauxMob = 5;
tmpTaux = 5;
speedMob = 10;

tmp = (new Date()).getMilliseconds()/90>>0;
tmp2 = (new Date()).getSeconds();

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );
        
        if(tmp != (new Date()).getMilliseconds()/90>>0){
            tmp = (new Date()).getMilliseconds()/90>>0;
            movement = (movement+1)%5;
        }
        if((key[" "] || key["ArrowUp"]) && y == sol){
            acceleration = -20;
            state = "jump";
        }
        y+=acceleration;
        if(y < sol){
            if((key[" "] || key["ArrowUp"]) && acceleration < 0){
                acceleration+=0.5;
            } else {
                acceleration+=1.5;
            }
        }
        if(tmp2 != (new Date()).getSeconds()){
            tmp2 = (new Date()).getSeconds();
            if(Math.floor(Math.random() * tmpTaux) == 0){
                newMob(580);
                tmpTaux = tauxMob+1;
            }
            tmpTaux--;
        }
        for(i = 0; i < listeMob.length; i++){
            if(listeMob[i][1] <= 175 && listeMob[i][1] >= 125 && y >= 550){
                window.cancelAnimationFrame( MyGame );
            } else {
                listeMob[i][1]-=speedMob;
            }
        }
        actu();
    }
    main();
})();