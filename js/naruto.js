function init(){

}

function actu(){
    document.getElementById("player").src = "../img/naruto/naruto-"+movement+".png";
    
}

var key = {};
onkeydown = onkeyup = function(e){
    key[e.key] = e.type == 'keydown';
}

movement = 0;

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
        actu();
    }
    main();
})();