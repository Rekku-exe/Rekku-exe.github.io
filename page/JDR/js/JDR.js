let theConsole = document.getElementById("console");
function consoleLog(string) {
  theConsole.innerHTML += string+"<br>";
  theConsole.scrollTop = theConsole.scrollHeight;
}
function consoleClear() {
  theConsole.innerHTML = '';
}

const validPainter = ['air', 'wall'];

let cursor = 'move';
let painter = 'air'; 
let mover = '';
let view = 'mj';

let typer = document.getElementById("typer");
typer.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    let string = typer.value.split(' ');
    string[0] = string[0].toLowerCase();
    switch(string[0]){
      case 'lt':
        genLand();
        summon('Rekkou', 'pers', 'red', 4, 4);
        break;
      case 'help':
        let help = document.createElement('a');
        help.href = './help.txt';
        help.download = 'help.txt';
        help.click();
        break;
      case 'save':
        let save = document.createElement('a');
        save.href = 'data:text/plain;charset=utf-8,'+encodeURIComponent(document.getElementById('land').innerHTML);
        if(string.length < 2){
          save.download = "mySave.xml";
        } else {
          save.download = string[1]+'.xml';
        }
        save.click();
        break;
      case 'clear':
      case 'clr':
        consoleClear();
        break;
      case 'genland':
      case 'gl':
        if(string.length >= 3){
          genLand(parseInt(string[1]), parseInt(string[2]));
        } else {
          genLand();
        }
        break;
      case 'cursor':
      case 'c':
        cursor = string[1];
        consoleLog('cursor on "'+cursor+'"');
        break;
      case 'paint':
      case 'p':
        if(cursor != 'paint'){
          cursor = 'paint';
        consoleLog('cursor on "'+cursor+'"');
        }
        if(validPainter.includes(string[1])){
          painter = string[1];
          consoleLog('painter on "'+painter+'"');
        }
        break;
      case 'summon':
      case 'sum':
        switch (string.length) {
          case 1:
            summon('Rekkou', 'pers', 'red');
            break;
          case 2:
            summon(string[1]);
            break;
          case 3:
            summon(string[1], string[2]);
            break;
          case 4:
          case 5:
            summon(string[1], string[2], string[3]);
            break;
          default:
            summon(string[1], string[2], string[3], string[4], string[5], string[6]);
        }
        break;
      case 'kill':
        if(string.length == 2){
          document.getElementById('c-'+string[1]).remove();
          actuVision();
          consoleLog('"'+string[1]+'" was kill');
        }
        break
      case 'changeaff':
        changeAff(string[1], string[2]);
        break;
      case 'changerange':
        document.getElementById('c-'+string[1]).setAttribute('visionrange', string[2]);
        actuVision();
        break;
      case 'changeview':
      case 'cv':
        view = string[1];
        consoleLog('view on "'+view+'"');
        actuVision();
        break;
      default:
        if(typer.value.includes('D') || typer.value.includes('d')){
          roll(typer.value.replace('D','d'));
        } else {
          consoleLog('for help, type "help"')
        }
    }
    typer.value = '';
  }
});

function roll(string) {
  let listRoll = string.replace(' ', '').split('/');
  for(let roll of listRoll) {
    roll = roll.split('d');
    listRes = [];
    for(let i=0; i<parseInt(roll[0]); i++){
      listRes.push(Math.floor(Math.random() * parseInt(roll[1])) + 1);
    }
    res = "";
    tot = 0;
    for(let i in listRes) {
      if(i!=0) res+=" + ";
      res += listRes[i];
      tot += listRes[i];
    }
    consoleLog(res+" = "+tot);
  }
}

function loadFile(file) {
  let fr = new FileReader();
  fr.onload = () => document.getElementById('land').innerHTML=fr.result;
  fr.readAsText(document.getElementById('loader').files[0]);
}

function genLand(x=10, y=10){
  document.getElementById('land').innerHTML = '';
  for(let i=0; i<y; i++){
    let ligne = document.createElement('div');
    ligne.id = "l-"+i;
    ligne.className = 'ligne';
    for(let j=0; j<x; j++){
      let outterPos = document.createElement('div');
      outterPos.className = 'outterPos';
      let pos = document.createElement('div');
      pos.id = 'p-'+i+'-'+j;
      pos.className = 'pos air';
      pos.setAttribute('onclick', 'clickPos('+i+','+j+')');
      outterPos.appendChild(pos);
      ligne.appendChild(outterPos);
    }
    document.getElementById('land').appendChild(ligne);
  }
  consoleLog('land generated with size '+x+' / '+y);
}

function clickPos(x, y){
  switch (cursor){
    case 'paint':
      paint(x, y);
      break;
    case 'move':
      move(x, y);
      break;
  }
}

function paint(x, y) {
  document.getElementById('p-'+x+'-'+y).className = 'pos '+painter;
}

function summon(name, type="monster", color="white", x=0, y=0) {
  if(document.getElementById('p-'+x+'-'+y).children.length > 0){
    consoleLog('"'+document.getElementById('p-'+x+'-'+y).children[0].id.split('c-')[1]+'" already at '+x+'-'+y);
    return;
  }
  let cara = document.createElement('div');
  cara.id = 'c-'+name;
  cara.className = 'cara '+type;
  cara.innerHTML = '<p class="innerCara">'+name.split('')[0]+'</p>';
  cara.setAttribute('positionx', x);
  cara.setAttribute('positiony', y);
  cara.style.backgroundColor = color;
  if(type == 'pers'){
    cara.setAttribute('visionrange', 3);
  }
  document.getElementById('p-'+x+'-'+y).appendChild(cara);
  consoleLog('create '+type+' "'+name+'" at '+x+'-'+y);
  actuVision();
}

function move(x, y) {
  let pos = document.getElementById('p-'+x+'-'+y);
  if(pos.children.length != 0){
    mover = pos.children[0].id.split('c-')[1];
    consoleLog('mover on "'+mover+'"');
  } else if(mover != '') {
    if(document.getElementById('p-'+x+'-'+y).className.includes('wall')) return;
    let cara = document.getElementById('c-'+mover);
    pos.appendChild(cara);
    cara.setAttribute('positionx', x);
    cara.setAttribute('positiony', y);
  }
  actuVision();
}

function changeAff(name, aff){
  document.getElementById('c-'+name).children[0].innerHTML = aff;
}

function actuVision(){
  let list = document.getElementsByClassName('pos');
  if(view == 'mj'){
    for(i of list){
      i.style.opacity = '100%';
    }
  } else {
    for(i of list){
      i.style.opacity = '0%';
    }
    list = document.getElementsByClassName('pers');
    for(i of list){
      seeHere(i.getAttribute('positionx'), i.getAttribute('positiony'), i.getAttribute('visionrange'));
    }
  } 
}

function seeHere(x, y, nb){
  if(document.getElementById('p-'+x+'-'+y) == null || document.getElementById('p-'+x+'-'+y).style.opacity == '100%') return;
  document.getElementById('p-'+x+'-'+y).style.opacity = '100%';
  if(document.getElementById('p-'+x+'-'+y).className.includes('wall')) return;
  if(nb > 0){
    let x1 = parseInt(x) + 1;
    let y1 = parseInt(y) + 1;
    seeHere(x-1, y, nb-1);
    seeHere(x1, y, nb-1);
    seeHere(x, y-1, nb-1);
    seeHere(x, y1, nb-1);
  }
}