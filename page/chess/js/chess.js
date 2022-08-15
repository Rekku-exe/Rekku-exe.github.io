let pair = true;
for(let i=0; i<8; i++){
    for(let j=0; j<8; j++){
        let pos = document.createElement('div');
        if(pair){
            pos.className = 'posWhite';
            pair = false;
        } else {
            pos.className = 'posBlack';
            pair = true;
        }
        pos.className += ' pos';
        pos.id = j+'-'+i;
        pos.setAttribute('onclick', 'clique('+j+','+i+')');
        pos.setAttribute('clickable', 'false');
        document.getElementById('board').appendChild(pos);
    }
    (pair ? pair=false : pair=true);
}

let actualTeam = 1;
let board = [
    [{team:2,type:'T'},{team:2,type:'C'},{team:2,type:'F'},{team:2,type:'Q'},{team:2,type:'R'},{team:2,type:'F'},{team:2,type:'C'},{team:2,type:'T'}],
    [{team:2,type:'p'},{team:2,type:'p'},{team:2,type:'p'},{team:2,type:'p'},{team:2,type:'p'},{team:2,type:'p'},{team:2,type:'p'},{team:2,type:'p'}],
    [{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0}],
    [{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0}],
    [{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0}],
    [{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0},{team:0,type:0}],
    [{team:1,type:'p'},{team:1,type:'p'},{team:1,type:'p'},{team:1,type:'p'},{team:1,type:'p'},{team:1,type:'p'},{team:1,type:'p'},{team:1,type:'p'}],
    [{team:1,type:'T'},{team:1,type:'C'},{team:1,type:'F'},{team:1,type:'Q'},{team:1,type:'R'},{team:1,type:'F'},{team:1,type:'C'},{team:1,type:'T'}]
];

function actu(){
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            document.getElementById(i+'-'+j).style.cursor = (board[j][i].team == actualTeam ? 'pointer' : '');
            if(!board[j][i].team){
                document.getElementById(i+'-'+j).style.backgroundImage = null;
                continue;
            };
            document.getElementById(i+'-'+j).style.backgroundImage = "url('./img/piece/"+board[j][i].type+board[j][i].team+".png')";
        }
    }
}
actu();

let piece;
function clique(x, y){
    let moved = false;
    if(document.getElementById(x+'-'+y).getAttribute('clickable') == 'true'){
        board[y][x] = piece.ref;
        board[piece.y][piece.x] = {team:0,type:0};
        actu();
        moved = true;
        piece = {'ref':board[y][x], 'x':x, 'y':y, 'xOld':piece.x, 'yOld':piece.y};
        if(piece.ref.type=='p' && (y==0 || y==7)){
            document.getElementById('evo').style.display = 'flex';
            for(let i of document.getElementsByClassName('choice-evo-img')){
                i.src= i.src.replace((actualTeam == 1 ? '2' : '1'), actualTeam);
            }
        }
    }
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            document.getElementById(j+'-'+i).style.backgroundColor = null;
            document.getElementById(j+'-'+i).setAttribute('clickable', 'false');;
        }
    }
    if(moved) {
        document.getElementById(piece.x+'-'+piece.y).style.backgroundColor = 'orange';
        document.getElementById(piece.xOld+'-'+piece.yOld).style.backgroundColor = 'orange';
        actualTeam = (actualTeam == 1 ? 2 : 1);
        console.log(document.getElementById('evo').style.display);
        if(document.getElementById('evo').style.display == ''){
            document.getElementById('playerTurn').innerHTML = 'TOUR DE JEU : '+ (actualTeam == 1 ? 'BLANC' : 'NOIR');
            actu();
        }
        return;
    }
    if(board[y][x].team == (actualTeam == 1 ? 2 : 1)) return;
    switch (board[y][x].type) {
        case 'p':// pion
            let opTeam = (board[y][x].team == 1 ? 2 : 1);
            let dir = (board[y][x].team == 1 ? -1 : 1);
            if(board[y+dir][x].team == 0){
                document.getElementById(x+'-'+(y+dir)).setAttribute('clickable', 'true');
                if((board[y][x].team == 1 && y == 6) || (board[y][x].team == 2 && y == 1) && board[y+dir*2][x].team == 0){
                    document.getElementById(x+'-'+(y+dir*2)).setAttribute('clickable', 'true');
                }
            }
            if(x < 7 && board[y+dir][x+1].team == opTeam){
                document.getElementById((x+1)+'-'+(y+dir)).setAttribute('clickable', 'true');
            }
            if(x > 0 && board[y+dir][x-1].team == opTeam){
                document.getElementById((x-1)+'-'+(y+dir)).setAttribute('clickable', 'true');
            }
            break;
        case 'T':// Tour
            cliqueTour(x, y-1, 'top', board[y][x].team);
            cliqueTour(x, y+1, 'bot', board[y][x].team);
            cliqueTour(x-1, y, 'left', board[y][x].team);
            cliqueTour(x+1, y, 'right', board[y][x].team);
            break;
        case 'F':// Fou
            cliqueFou(x-1, y-1, 'top-left', board[y][x].team);
            cliqueFou(x+1, y-1, 'top-right', board[y][x].team);
            cliqueFou(x-1, y+1, 'bot-left', board[y][x].team);
            cliqueFou(x+1, y+1, 'bot-right', board[y][x].team);
            break;
        case 'Q':// Queen
            cliqueTour(x, y-1, 'top', board[y][x].team);
            cliqueTour(x, y+1, 'bot', board[y][x].team);
            cliqueTour(x-1, y, 'left', board[y][x].team);
            cliqueTour(x+1, y, 'right', board[y][x].team);
            cliqueFou(x-1, y-1, 'top-left', board[y][x].team);
            cliqueFou(x+1, y-1, 'top-right', board[y][x].team);
            cliqueFou(x-1, y+1, 'bot-left', board[y][x].team);
            cliqueFou(x+1, y+1, 'bot-right', board[y][x].team);
        case 'R':// Roi
            if(x>0){
                if(board[y][x-1].team != board[y][x].team)document.getElementById((x-1)+'-'+y).setAttribute('clickable', 'true');
                if(y>0){
                    if(board[y-1][x-1].team != board[y][x].team)document.getElementById((x-1)+'-'+(y-1)).setAttribute('clickable', 'true');
                }
                if(y<7){
                    if(board[y+1][x-1].team != board[y][x].team)document.getElementById((x-1)+'-'+(y+1)).setAttribute('clickable', 'true');
                }
            }
            if(x<7){
                if(board[y][x+1].team != board[y][x].team)document.getElementById((x+1)+'-'+y).setAttribute('clickable', 'true');
                if(y>0){
                    if(board[y-1][x+1].team != board[y][x].team)document.getElementById((x+1)+'-'+(y-1)).setAttribute('clickable', 'true');
                }
                if(y<7){
                    if(board[y+1][x+1].team != board[y][x].team)document.getElementById((x+1)+'-'+(y+1)).setAttribute('clickable', 'true');
                }
            }
            if(y>0 && board[y-1][x].team != board[y][x].team)document.getElementById(x+'-'+(y-1)).setAttribute('clickable', 'true');
            if(y<7 && board[y+1][x].team != board[y][x].team)document.getElementById(x+'-'+(y+1)).setAttribute('clickable', 'true');
            break;
        case 'C':// Cavalier
            if(x>1){
                if(y>0 && board[y-1][x-2].team != board[y][x].team)document.getElementById((x-2)+'-'+(y-1)).setAttribute('clickable', 'true');
                if(y<7 && board[y+1][x-2].team != board[y][x].team)document.getElementById((x-2)+'-'+(y+1)).setAttribute('clickable', 'true');
            }
            if(x>0){
                if(y>1 && board[y-2][x-1].team != board[y][x].team)document.getElementById((x-1)+'-'+(y-2)).setAttribute('clickable', 'true');
                if(y<6 && board[y+2][x-1].team != board[y][x].team)document.getElementById((x-1)+'-'+(y+2)).setAttribute('clickable', 'true');
            }
            if(x<7){
                if(y>1 && board[y-2][x+1].team != board[y][x].team)document.getElementById((x+1)+'-'+(y-2)).setAttribute('clickable', 'true');
                if(y<6 && board[y+2][x+1].team != board[y][x].team)document.getElementById((x+1)+'-'+(y+2)).setAttribute('clickable', 'true');
            }
            if(x<6){
                if(y>0 && board[y-1][x+2].team != board[y][x].team)document.getElementById((x+2)+'-'+(y-1)).setAttribute('clickable', 'true');
                if(y<7 && board[y+1][x+2].team != board[y][x].team)document.getElementById((x+2)+'-'+(y+1)).setAttribute('clickable', 'true');
            }
            break;
        case 0:
            break;
        default:
            alert('Les pièces de type '+board[y][x].type+' ne sont pas fonctionnelles');
            break;
    }
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            if(document.getElementById(j+'-'+i).getAttribute('clickable') == 'true'){
                document.getElementById(j+'-'+i).style.backgroundColor = 'lightcoral';
                document.getElementById(j+'-'+i).style.cursor = 'pointer';
            }
        }
    }
    piece = {'ref':board[y][x], 'x':x, 'y':y};
}

function cliqueTour(x, y, dir, team){
    if(y>7 || y<0 || x>7 || x<0 || board[y][x].team == team) return;
    document.getElementById(x+'-'+y).setAttribute('clickable', 'true');
    if(board[y][x].team != 0) return;
    let x2 = x;
    let y2 = y
    switch (dir){
        case 'top':
            y2--;
            break;
        case 'bot':
            y2++;
            break;  
        case 'left':
            x2--;
            break;  
        case 'right':
            x2++;
            break;  
    }
    cliqueTour(x2, y2, dir, team);
}

function cliqueFou(x, y, dir, team){
    if(y>7 || y<0 || x>7 || x<0 || board[y][x].team == team) return;
    document.getElementById(x+'-'+y).setAttribute('clickable', 'true');
    if(board[y][x].team != 0) return;
    switch (dir){
        case 'top-left':
            y--;
            x--;
            break;
        case 'top-right':
            y--;
            x++;
            break;  
        case 'bot-left':
            y++;
            x--;
            break;  
        case 'bot-right':
            y++;
            x++;
            break;  
    }
    cliqueFou(x, y, dir, team);
}

function choiceEvo(type){
    board[piece.y][piece.x].type = type;
    actu();
    document.getElementById('evo').style.display = 'none';
    document.getElementById('playerTurn').innerHTML = 'TOUR DE JEU : '+ (actualTeam == 1 ? 'BLANC' : 'NOIR');
}