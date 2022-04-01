function init(){
    document.getElementById("game").innerHTML = "";
    board = [];
    possible = [];
    vu = [];
    isFlag = [];
    setFlag = false;
    fini = false;
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
            document.getElementById('row-'+i).innerHTML += '<div id="'+j+'-'+i+'" class="box boxLightGray" onclick="clique('+j+','+i+')"></div>';
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

function reveal(){
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
}

function clique(x, y){
    if(fini){
        return;
    }
    if(setFlag){
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
    } else if(!isFlag[y][x]){
        vu[y][x] = true;
        if(board[y][x] == "X"){
            //document.getElementById(x+"-"+y).innerHTML = "X";
            document.getElementById("touche").innerHTML = "LOSE";
            reveal();
            document.getElementById(x+"-"+y).classList = "box boxBomb boxRed";
            fini = true;
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
        }
    }
}

maxY = 20;
maxX = 30;
init();
plant(80);
console.log("start");

/*while(!fini){
    console.log(1);
}*/
