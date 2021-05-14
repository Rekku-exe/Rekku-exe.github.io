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

tmp = (new Date()).getMilliseconds()/90>>0;

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
            acceleration = -40;
            state = "jump";
        }
        y+=acceleration;
        if(y < sol){
            if((key[" "] || key["ArrowUp"]) && acceleration < 0){
                acceleration+=2;
            } else {
                acceleration+=6;
            }
        }
        actu();
    }
    main();
})();