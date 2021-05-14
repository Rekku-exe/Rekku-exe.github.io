function init(){

}

function actu(){
    if(y >= sol) {
        y = sol;
    }
    document.getElementById("player").style.top = y+"px";
    document.getElementById("player").src = "../img/naruto/naruto-"+movement+".png";
}

var key = {};
onkeydown = onkeyup = function(e){
    key[e.key] = e.type == 'keydown';
}

sol = 600;
y = sol;
movement = 0;
acceleration = 0;

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
        }
        y+=acceleration;
        if(y < sol){
            if((key[" "] || key["ArrowUp"]) && acceleration < 0){
                acceleration+=2;
            } else {
                acceleration+=5;
            }
        }
        actu();
    }
    main();
})();