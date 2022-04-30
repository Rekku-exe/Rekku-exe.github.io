let actived = true;

function fond(){
    if(!actived){
        document.getElementById("porteGauche").style.width = '0px';
        document.getElementById("porteDroite").style.width = '0px';
        document.getElementById("mainIndex").style.boxShadow = null;
        /*document.getElementById("mainIndex").style.right = null;
        document.getElementById("mainIndex").style.left = null;
        document.getElementById("vid-fond").style.display = "block";*/
        actived = true;
    } else {
        document.getElementById("porteGauche").style.width = "50%";
        document.getElementById("porteDroite").style.width = "50%";
        document.getElementById("mainIndex").style.boxShadow = "none";
        /*document.getElementById("mainIndex").style.right = "0";
        document.getElementById("mainIndex").style.left = "0";
        setTimeout('document.getElementById("vid-fond").style.display = "none"', 1000);*/
        actived = false;
    }
}