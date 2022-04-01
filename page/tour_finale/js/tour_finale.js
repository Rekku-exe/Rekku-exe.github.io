affRules = false;

function printRules(){
    if(affRules){
        document.getElementById("rules").style.display = "none";
        affRules = false;
    } else {
        document.getElementById("rules").style.display = "flex";
        affRules = true;
    }
}

function init(){
    tab = [];
    for(var i = 0; i<6; i++){
        tab.push([]);
        for(var j = 0; j<6; j++){
            tab[i].push(0);
            $('#board').append('<div id=\"'+i+'-'+j+'\" class=\"box\" onclick="button('+i+','+j+')"></div>');
        }
    }
    tabJoueur = [
        [2,2,2,2,2,2],
        [2,2,2,2,2,2],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1]
    ];
    tabNiveau = [
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1]
    ];
    tabDir = [
        [2,2,2,2,2,2],
        [2,2,2,2,2,2],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1]
    ];
    tabLumiere = [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ];
    joueur = 1;
    possible = [];
    active = [];
    console.log("init done");
}

function actu(){
    for(var i = 0; i<6; i++){
        for(var j = 0; j<6; j++){
            document.getElementById(i+'-'+j).className = "box";
            if(tabJoueur[i][j] == 0){
                document.getElementById(i+'-'+j).classList.add("boxJ0");
            } else if(tabJoueur[i][j] == 1){
                document.getElementById(i+'-'+j).classList.add("boxJ1");
            } else if(tabJoueur[i][j] == 2){
                document.getElementById(i+'-'+j).classList.add("boxJ2");
            }
            if(tabLumiere[i][j] == 1){
                document.getElementById(i+'-'+j).classList.add("boxB");
            }
            if(tabNiveau[i][j] == 0){
                document.getElementById(i+'-'+j).innerHTML = "";
            } else {
                document.getElementById(i+'-'+j).innerHTML = "<p class='innerBox'>"+tabNiveau[i][j]+"</p>";
            }
        }
    }
}

function button(y, x){
    tabLumiere = [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ];
    if(joueur == tabJoueur[y][x]){
        possible = [];

        active = [y,x,tabNiveau[y][x],tabDir[y][x]];
        tabLumiere[y][x] = 1;

        if(tabDir[y][x] == 1){// haut
            if(tabNiveau[y][x] >= 1){// niv 1
                if(tabJoueur[y-1][x] != joueur){
                    possible.push([y-1,x]);
                }
            }
            if(tabNiveau[y][x] >= 2){// niv 2
                if(x > 0 && tabJoueur[y-1][x-1] != joueur){
                    possible.push([y-1,x-1]);
                }
                if( x < 5 && tabJoueur[y-1][x+1] != joueur){
                    possible.push([y-1,x+1]);
                }
            }
            if(tabNiveau[y][x] >= 3){// niv 3
                if(x > 0 && tabJoueur[y][x-1] != joueur){
                    possible.push([y,x-1]);
                }
                if(x < 5 && tabJoueur[y][x+1] != joueur){
                    possible.push([y,x+1]);
                }
            }
            if(tabNiveau[y][x] >= 4 && y < 4){// niv 4
                if(tabJoueur[y+1][x] != joueur){
                    possible.push([y+1,x]);
                }
                if(x > 0 && tabJoueur[y+1][x-1] != joueur){
                    possible.push([y+1,x-1]);
                }
                if(x < 5 && tabJoueur[y+1][x+1] != joueur){
                    possible.push([y+1,x+1]);
                }
            }
        } else if(tabDir[y][x] == 2){// bas
            if(tabNiveau[y][x] >= 1){// niv 1
                if(tabJoueur[y+1][x] != joueur){
                    possible.push([y+1,x]);
                }
            }
            if(tabNiveau[y][x] >= 2){// niv 2
                if(x > 0 && tabJoueur[y+1][x-1] != joueur){
                    possible.push([y+1,x-1]);
                }
                if(x < 5 && tabJoueur[y+1][x+1] != joueur){
                    possible.push([y+1,x+1]);
                }
            }
            if(tabNiveau[y][x] >= 3){// niv 3
                if(x > 0 && tabJoueur[y][x-1] != joueur){
                    possible.push([y,x-1]);
                }
                if(x < 5 && tabJoueur[y][x+1] != joueur){
                    possible.push([y,x+1]);
                }
            }
            if(tabNiveau[y][x] >= 4 && y > 0){// niv 4
                if(tabJoueur[y-1][x] != joueur){
                    possible.push([y-1,x]);
                }
                if(x > 0 && tabJoueur[y-1][x-1] != joueur){
                    possible.push([y-1,x-1]);
                }
                if( x < 5 && tabJoueur[y-1][x+1] != joueur){
                    possible.push([y-1,x+1]);
                }
            }
        }

        possible.forEach(i => {
            tabLumiere[i[0]][i[1]] = 1;
        });

    } else {
        for(var i=0; i<possible.length; i++){
            if(possible[i][0] == y && possible[i][1] == x){
                tabJoueur[y][x] = joueur;
                tabNiveau[y][x] = active[2] + tabNiveau[y][x];
                tabDir[y][x] = active[3];

                tabJoueur[active[0]][active[1]] = 0;
                tabNiveau[active[0]][active[1]] = 0;
                tabDir[active[0]][active[1]] = 0;

                if(y == 0){
                    tabDir[y][x] = 2;
                } else if(y == 4) {
                    tabDir[y][x] = 1;
                }

                if(joueur == 1){
                    joueur = 2;
                } else {
                    joueur = 1;

                }

                possible = [];

                found1 = false;
                found2 = false;
                for(var i = 0; i<5; i++){
                    for(var j = 0; j<5; j++){
                        if(tabJoueur[j][i] == 1)found1 = true;
                        if(tabJoueur[j][i] == 2)found2 = true;
                    }
                }

                if(!found1){
                    document.getElementById("joueur").innerHTML = "Joueur 2 gagne";
                } else if(!found2){
                    document.getElementById("joueur").innerHTML = "Joueur 1 gagne";
                } else {
                    document.getElementById("joueur").innerHTML = "Joueur:<br>"+joueur;
                }

                break;
            }
        }
    }
    
    actu();
}

tmp = (new Date()).getSeconds();

var MyGame;
var tNow = window.performance.now();
(function () {
    init();
    rien = 0;
    actu();
    function main( tFrame ) {
        MyGame = window.requestAnimationFrame( main );

        if(tmp != (new Date()).getSeconds()){
            tmp = (new Date()).getSeconds();

            if(rien == 2000){
                console.log("actu end");
                window.cancelAnimationFrame( MyGame );
            } else {
                rien+=1;
            }
        }
    }
    main();
})();