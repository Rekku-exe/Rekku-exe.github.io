classe = "none";

function button(name){
    classe = name;
    if(name == "force"){
        document.getElementById("buttonForce").style.backgroundColor = "#1a4715";
        document.getElementById("buttonHabilite").style.backgroundColor = "#471915";
        document.getElementById("buttonIntelligence").style.backgroundColor = "#471915";
    } else if(name == "habilite"){
        document.getElementById("buttonForce").style.backgroundColor = "#471915";
        document.getElementById("buttonHabilite").style.backgroundColor = "#1a4715";
        document.getElementById("buttonIntelligence").style.backgroundColor = "#471915";
    } else if(name == "intelligence"){
        document.getElementById("buttonForce").style.backgroundColor = "#471915";
        document.getElementById("buttonHabilite").style.backgroundColor = "#471915";
        document.getElementById("buttonIntelligence").style.backgroundColor = "#1a4715";
    }
}

function valeur(val){
    if(classe == "none"){
        alert("Choisi une stat principale");
    }
    if(classe == "none" || document.getElementById("stat-"+val).value == 0){
        document.getElementById("stat-1").value = "";
        document.getElementById("stat-2").value = "";
        document.getElementById("stat-3").value = "";
        document.getElementById("stat-4").value = "";
        document.getElementById("stat-5").value = "";
        return;
    }

    if(classe == "force"){
        if(val == 1 || val == 4){
            document.getElementById("stat-1").value = document.getElementById("stat-"+val).value; 
            document.getElementById("stat-2").value = Math.floor(document.getElementById("stat-"+val).value / 3); 
            document.getElementById("stat-3").value = Math.floor(document.getElementById("stat-"+val).value / 3); 
            document.getElementById("stat-4").value = document.getElementById("stat-"+val).value;
            document.getElementById("stat-5").value = Math.floor(document.getElementById("stat-"+val).value / 2);
        } else if(val == 2 || val == 3){
            document.getElementById("stat-1").value = document.getElementById("stat-"+val).value * 3; 
            document.getElementById("stat-2").value = document.getElementById("stat-"+val).value; 
            document.getElementById("stat-3").value = document.getElementById("stat-"+val).value; 
            document.getElementById("stat-4").value = document.getElementById("stat-"+val).value * 3;
            document.getElementById("stat-5").value = Math.floor(document.getElementById("stat-"+val).value * 3 / 2);
        } else if(val == 5){
            document.getElementById("stat-1").value = document.getElementById("stat-"+val).value * 2; 
            document.getElementById("stat-2").value = Math.floor(document.getElementById("stat-"+val).value / 3) * 2; 
            document.getElementById("stat-3").value = Math.floor(document.getElementById("stat-"+val).value / 3) * 2; 
            document.getElementById("stat-4").value = document.getElementById("stat-"+val).value * 2;
            document.getElementById("stat-5").value = document.getElementById("stat-"+val).value;
        }
    } else if(classe == "habilite"){
        if(val == 2 || val == 4){
            document.getElementById("stat-2").value = document.getElementById("stat-"+val).value; 
            document.getElementById("stat-1").value = Math.floor(document.getElementById("stat-"+val).value / 3); 
            document.getElementById("stat-3").value = Math.floor(document.getElementById("stat-"+val).value / 3); 
            document.getElementById("stat-4").value = document.getElementById("stat-"+val).value;
            document.getElementById("stat-5").value = Math.floor(document.getElementById("stat-"+val).value / 2);
        } else if(val == 1 || val == 3){
            document.getElementById("stat-2").value = document.getElementById("stat-"+val).value * 3; 
            document.getElementById("stat-1").value = document.getElementById("stat-"+val).value; 
            document.getElementById("stat-3").value = document.getElementById("stat-"+val).value; 
            document.getElementById("stat-4").value = document.getElementById("stat-"+val).value * 3;
            document.getElementById("stat-5").value = Math.floor(document.getElementById("stat-"+val).value * 3 / 2);
        } else if(val == 5){
            document.getElementById("stat-2").value = document.getElementById("stat-"+val).value * 2; 
            document.getElementById("stat-1").value = Math.floor(document.getElementById("stat-"+val).value / 3) * 2; 
            document.getElementById("stat-3").value = Math.floor(document.getElementById("stat-"+val).value / 3) * 2; 
            document.getElementById("stat-4").value = document.getElementById("stat-"+val).value * 2;
            document.getElementById("stat-5").value = document.getElementById("stat-"+val).value;
        }        
    } else if(classe == "intelligence"){
        if(val == 3 || val == 4){
            document.getElementById("stat-3").value = document.getElementById("stat-"+val).value; 
            document.getElementById("stat-1").value = Math.floor(document.getElementById("stat-"+val).value / 3); 
            document.getElementById("stat-2").value = Math.floor(document.getElementById("stat-"+val).value / 3); 
            document.getElementById("stat-4").value = document.getElementById("stat-"+val).value;
            document.getElementById("stat-5").value = Math.floor(document.getElementById("stat-"+val).value / 2);
        } else if(val == 1 || val == 2){
            document.getElementById("stat-3").value = document.getElementById("stat-"+val).value * 3; 
            document.getElementById("stat-1").value = document.getElementById("stat-"+val).value; 
            document.getElementById("stat-2").value = document.getElementById("stat-"+val).value; 
            document.getElementById("stat-4").value = document.getElementById("stat-"+val).value * 3;
            document.getElementById("stat-5").value = Math.floor(document.getElementById("stat-"+val).value * 3 / 2);
        } else if(val == 5){
            document.getElementById("stat-3").value = document.getElementById("stat-"+val).value * 2; 
            document.getElementById("stat-1").value = Math.floor(document.getElementById("stat-"+val).value / 3) * 2; 
            document.getElementById("stat-2").value = Math.floor(document.getElementById("stat-"+val).value / 3) * 2; 
            document.getElementById("stat-4").value = document.getElementById("stat-"+val).value * 2;
            document.getElementById("stat-5").value = document.getElementById("stat-"+val).value;
        } 
    }
}

function reset(){
    document.getElementById("stat-1").value = "";
    document.getElementById("stat-2").value = "";
    document.getElementById("stat-3").value = "";
    document.getElementById("stat-4").value = "";
    document.getElementById("stat-5").value = "";
}