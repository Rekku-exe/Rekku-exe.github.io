document.getElementsByClassName(".slider").style.transition = 0.4;

var actived = true;

function fond(){
    if(actived){
        document.getElementById("vid-fond").style.display = "block";
        actived = false;
    } else {
        document.getElementById("vid-fond").style.display = "none";
        actived = true;
    }
}