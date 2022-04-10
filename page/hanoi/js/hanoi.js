stand = 0;
tours = [
    [8,7,6,5,4,3,2,1],
    [],
    []
]

function actu(){
    for (let tour in tours) {
        for (let i = 0; i < tours[tour].length; i++) {
            document.getElementById("piece-"+tours[tour][i]).style.top = (30*(10-i))+"px";
        }
    }
}
actu();

function clique(id){
    if(stand == 0){
        if(tours[id].length == 0){
            return;
        }
        stand = tours[id][tours[id].length-1];
        tours[id].pop();
        document.getElementById("stand").appendChild(document.getElementById("piece-"+stand));
        document.getElementById("piece-"+stand).style.top = "auto";
    } else if(tours[id][tours[id].length-1] > stand || tours[id].length == 0) {
        document.getElementById("tour-"+id).appendChild(document.getElementById("piece-"+stand));
        tours[id].push(stand);
        stand = 0;
    }
    actu();
}