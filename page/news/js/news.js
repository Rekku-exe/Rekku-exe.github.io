page = 11;
maxPage = page;

function changePage(dir){
    document.getElementById("page-"+page).style.display = "none";
    switch (dir) {
        case "--":
            page = maxPage;
            break;
        case "-":
            if(page < maxPage) page++;
            break;
        case "+":
            if(page > 1) page--;
            break;
        case "++":
            page = 1;
            break;
    }
    if(page == maxPage){
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
    if(page == 1){
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
    document.getElementById("numeroPage").innerHTML = maxPage-page+1;
}