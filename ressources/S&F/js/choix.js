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

function valeur(nb){
    value =  document.getElementById("stat-"+nb).value;
    if(value == ""){
        document.getElementById("stat-"+nb).value = 0;
    }
    if(value == 0){
        document.getElementById("stat-"+nb).style.backgroundColor = "#471915";
    } else {
        document.getElementById("stat-"+nb).style.backgroundColor = "#1a4715";
    }
}

function calcul(){
    stat = [0,0,0,0,0,0,0]
    if(classe == "none"){
        alert("Choisi une stat principale");
        return;
    }
    stat[0] = document.getElementById("stat-0").value * 6;
    if(classe == "force"){
        stat[1] = document.getElementById("stat-1").value * 6;
    } else {
        stat[1] = document.getElementById("stat-1").value * 2;
    }
    if(classe == "habilite"){
        stat[2] = document.getElementById("stat-2").value * 6;
    } else {
        stat[2] = document.getElementById("stat-2").value * 2;
    }
    if(classe == "intelligence"){
        stat[3] = document.getElementById("stat-3").value * 6;
    } else {
        stat[3] = document.getElementById("stat-3").value * 2;
    }
    stat[4] = document.getElementById("stat-4").value * 6;
    stat[5] = document.getElementById("stat-5").value * 3;
    stat[6] = document.getElementById("stat-6").value * 3;

    result = stat.reduce((a,b) => a+b, 0);
    if(result > 0){
        document.getElementById("result").innerHTML = "Oui, avec un avantage de "+result;
        document.getElementById("resultat").style.backgroundColor = "#0e260b";
    } else if(result < 0){
        document.getElementById("result").innerHTML = "Non, avec un désavantage de "+result;
        document.getElementById("resultat").style.backgroundColor = "#2b0f0d";
    } else {
        document.getElementById("result").innerHTML = "Changement équivalent";
        document.getElementById("resultat").style.backgroundColor = "#154247";
    }
}

function reset(){
    document.getElementById("stat-0").value = "";
    document.getElementById("stat-0").style.backgroundColor = "#471915";
    document.getElementById("stat-1").value = "";
    document.getElementById("stat-1").style.backgroundColor = "#471915";
    document.getElementById("stat-2").value = "";
    document.getElementById("stat-2").style.backgroundColor = "#471915";
    document.getElementById("stat-3").value = "";
    document.getElementById("stat-3").style.backgroundColor = "#471915";
    document.getElementById("stat-4").value = "";
    document.getElementById("stat-4").style.backgroundColor = "#471915";
    document.getElementById("stat-5").value = "";
    document.getElementById("stat-5").style.backgroundColor = "#471915";
    document.getElementById("stat-6").value = "";
    document.getElementById("stat-6").style.backgroundColor = "#471915";
}