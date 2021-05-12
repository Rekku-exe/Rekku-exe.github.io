document.getElementsByClassName(".slider").style.transition = 0.4;

var actived = true;

function fond(){
    if(actived){
        document.getElementById("mainIndex").style.right = null;
        document.getElementById("mainIndex").style.left = null;
        document.getElementById("vid-fond").style.display = "block";
        actived = false;
    } else {
        document.getElementById("mainIndex").style.right = "0";
        document.getElementById("mainIndex").style.left = "0";
        setTimeout('document.getElementById("vid-fond").style.display = "none"', 1000);
        actived = true;
    }
}