function init(){
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById("game").innerHTML = "";
    board = [];
    possible = [];
    vu = [];
    isFlag = [];
    setFlag = false;
    fini = false;
    nbToReveal = maxX*maxY-nbBomb;
    //--
    for(i=0; i<maxY; i++){
        board.push([]);
        vu.push([]);
        isFlag.push([]);
        //$('#game').append('<div id=row-'+i+' class="gameRow"></div>');
        document.getElementById("game").innerHTML += '<div id=row-'+i+' class="gameRow"></div>';
        for(j=0; j<maxX; j++){
            board[i].push(0);
            vu[i].push(false);
            isFlag[i].push(false);
            possible.push([i,j]);
            //$('#row-'+i).append('<div id="'+j+'-'+i+'" class="box boxLightGray" onclick="clique('+j+','+i+')"></div>');
            document.getElementById('row-'+i).innerHTML += '<div id="'+j+'-'+i+'" class="box boxLightGray" onclick="clique('+j+','+i+')" oncontextmenu="setAFlag('+j+','+i+')"></div>';
        }
    }
    console.log("init done");
}

document.addEventListener("keydown", function onEvent(e) {
    if(e.key == "s"){
        fini = true;
        document.getElementById("touche").innerHTML = "ARRET";
    }
    if(e.key == "f"){
        flagClique();
    }
});

function plant(nb){
    for(i=0; i<nb; i++){
        tmp = Math.floor(Math.random() * (possible.length-1));
        board[possible[tmp][0]][possible[tmp][1]] = "X";
        possible.splice(tmp, 1);
    }
    document.getElementById("innerCountMine").innerHTML = nb;
    countMine = nb;
}

function flagClique(){
    if(setFlag){
        document.getElementById("flagButton").style.backgroundColor = "lightgray";
        setFlag = false;

    } else {
        document.getElementById("flagButton").style.backgroundColor = "gray";
        setFlag = true;
    }
}

function displayPopUp(text){
    document.getElementById("popUp").style.display = "flex";
    document.getElementById("popUpInner").innerHTML = text;
}

function loser(){
    for(i=0; i<maxX; i++){
        for(j=0; j<maxY; j++){
            if(board[j][i] == "X"){
                if(isFlag[j][i]){
                    document.getElementById(i+"-"+j).classList = "box boxBomb boxGreen";
                } else {
                    document.getElementById(i+"-"+j).classList = "box boxBomb boxOrange";
                }
            }
        }
    }
    fini = true;
    displayPopUp("LOSE !<br/>You can retry by refresh (F5)");
}

function winner(){
    for(i=0; i<maxX; i++){
        for(j=0; j<maxY; j++){
            if(board[j][i] == "X"){
                document.getElementById(i+"-"+j).classList = "box boxBomb boxGreen";
            }
        }
    }
    fini = true;
    displayPopUp("WIN !<br/>You found "+nbBomb+" bombs on a "+maxX+"x"+maxY+" grid<br/>GG !");
}

function setAFlag(x, y){
    if(!vu[y][x]){
        if(isFlag[y][x]){
            document.getElementById(x+"-"+y).classList = "box boxLightGray";
            isFlag[y][x] = false;
            countMine++;
        } else {
            document.getElementById(x+"-"+y).classList = "box boxLightGray boxFlag";
            isFlag[y][x] = true;
            countMine--;
        }
        document.getElementById("innerCountMine").innerHTML = countMine;
    }
}

function clique(x, y){
    if(fini){
        return;
    }
    if(setFlag){
        setAFlag(x, y)
    } else if(!isFlag[y][x]){
        vu[y][x] = true;
        if(board[y][x] == "X"){
            loser();
            document.getElementById(x+"-"+y).classList = "box boxBomb boxRed";
        } else {
            count = 0;
            if(y != 0 && x != 0 && board[y-1][x-1] == "X")count++;
            if(y != 0 && board[y-1][x] == "X")count++;
            if(y != 0 && x != maxX-1 && board[y-1][x+1] == "X")count++;
            if(x != maxX-1 && board[y][x+1] == "X")count++;
            if(y != maxY-1 && x != maxX-1 && board[y+1][x+1] == "X")count++;
            if(y != maxY-1 && board[y+1][x] == "X")count++;
            if(y != maxY-1 && x != 0 && board[y+1][x-1] == "X")count++;
            if(x != 0 && board[y][x-1] == "X")count++;
            document.getElementById(x+"-"+y).classList = "box boxGray";
            if(count != 0){
                document.getElementById(x+"-"+y).innerHTML = count;
                document.getElementById(x+"-"+y).classList.add("value"+count);
            } else {
                setTimeout(() => {
                    if(y != 0 && x != 0 && !vu[y-1][x-1])clique(x-1,y-1);
                    if(y != 0 && !vu[y-1][x])clique(x,y-1);
                    if(y != 0 && x != maxX-1 && !vu[y-1][x+1])clique(x+1,y-1);
                    if(x != 0 && !vu[y][x-1])clique(x-1,y);
                    if(x != maxX-1 && !vu[y][x+1])clique(x+1,y);
                    if(y != maxY-1 && x != 0 && !vu[y+1][x-1])clique(x-1,y+1);
                    if(y != maxY-1 && !vu[y+1][x])clique(x,y+1);
                    if(y != maxY-1 && x != maxX-1 && !vu[y+1][x+1])clique(x+1,y+1);
                }, 1);
            }
            nbToReveal--;
            if(nbToReveal == 0) winner();
        }
    }
}

url = new URL(document.location.href)
if(url.searchParams.get('x') == undefined || url.searchParams.get('y') == undefined || url.searchParams.get('b') == undefined) {
    backLink = document.createElement('a');
    backLink.href = '../index.html'
    backLink.click();
} else {
    maxY = parseInt(url.searchParams.get('y'));
    maxX = parseInt(url.searchParams.get('x'));
    nbBomb = parseInt(url.searchParams.get('b'));
    init();
    plant(nbBomb);
    console.log("start");
}

/*while(!fini){
    console.log(1);
}*/
