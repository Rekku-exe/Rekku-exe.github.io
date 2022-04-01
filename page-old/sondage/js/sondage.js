var actived = true;
liste = document.getElementsByClassName("fondTmp-int")

function filtre(){
    if(actived){
        for(var i=0; i<liste.length; i++){
            liste[i].style.opacity = "100%";
            liste[i].style.filter = "none";
        }
        actived = false;
    } else {
        for(var i=0; i<liste.length; i++){
            liste[i].style.opacity = null;
            liste[i].style.filter = null;
        }
        actived = true;
    }
}