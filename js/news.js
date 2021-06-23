page = 1;
maxPage = 2;

function changePage(dir){
    document.getElementById("page-"+page).style.display = "none";
    if(dir == "-" && page > 1){
        page-=1;
    } else if(dir == "+" && page < maxPage){
        page+=1;
    } else if(dir == "++"){
        page = maxPage;
    } else if(dir == "--"){
        page = 1;
    }
    if(page == 1){
        document.getElementById("buttonLeft1").style.opacity = "0%";
        document.getElementById("buttonLeft1").style.cursor = "default";
        document.getElementById("buttonLeft2").style.opacity = "0%";
        document.getElementById("buttonLeft2").style.cursor = "default";
    } else {
        document.getElementById("buttonLeft1").style.opacity = "100%";
        document.getElementById("buttonLeft1").style.cursor = "pointer";
        document.getElementById("buttonLeft2").style.opacity = "100%";
        document.getElementById("buttonLeft2").style.cursor = "pointer";
    }
    if(page == maxPage){
        document.getElementById("buttonRight1").style.opacity = "0%";
        document.getElementById("buttonRight1").style.cursor = "default";
        document.getElementById("buttonRight2").style.opacity = "0%";
        document.getElementById("buttonRight2").style.cursor = "default";
    } else {
        document.getElementById("buttonRight1").style.opacity = "100%";
        document.getElementById("buttonRight1").style.cursor = "pointer";
        document.getElementById("buttonRight2").style.opacity = "100%";
        document.getElementById("buttonRight2").style.cursor = "pointer";
    }
    document.getElementById("page-"+page).style.display = "flex";
    document.getElementById("numeroPage").innerHTML = page;
}