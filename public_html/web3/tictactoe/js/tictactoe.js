let cases = document.querySelectorAll(".case");
let replayBtn = document.querySelector("#replay");
let panneauMessage = document.querySelector("#message");

// Variables de lâ€™app
let joueurX = true; //premier joueur X
let gagnant = ''; //pas encore de gagnant

const patrons = [ //les patrons gagnants
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


// Fonctions

//Principale Ã©vÃ©nement click des cases
for (let boite of cases) {
    boite.active = true;
    boite.addEventListener("click",function () {
        
        if (boite.active) {
            if (joueurX) { //tour du joueur X
                boite.style.backgroundImage = "url('./img/fried_chicken.svg')";
                boite.innerText = "X";
                joueurX = false;
            }
            else { //tour du jour O
                boite.style.backgroundImage = "url('./img/fries.svg')";
                boite.innerText = "O";
                joueurX = true;
            }
            boite.active = false;
            valide();
        }
     });
}

// Valide lâ€™Ã©tat du jeu: gagnant ou nulle
const valide = function () {
    if ([...cases].every((boite)  => boite.active === false)) { //toutes les cases sont inactives
        afficheMessage("Partie nulle");

    for (let boite of cases) {
        if (boite.innerText === "X") {
            boite.style.backgroundImage = "url('./img/fried_chicken_burnt.svg')"; //quand le jeu est nul
        }
        else if (boite.innerText === "O") {
            boite.style.backgroundImage = "url('./img/fries_burnt.svg')"; //quand le jeu est nul
        }
    }
}

    else { //sinon valide gagnant
        for (let patron of patrons) { //boucle des patrons gagnants
            let val1 = cases[patron[0]].innerText; //les valeurs des positions du patron
            let val2 = cases[patron[1]].innerText;
            let val3 = cases[patron[2]].innerText;

            if (val1 &&
                val1 === val2 &&
                val1 === val3) {  //nous avons on gagnant
                
                    if (val1 === "X") {
                        afficheMessage(`POULET COMME PLAT!!`);
                    }
                    else {
                        afficheMessage(`UN VRAI QUEBECOIS`);
                    }
                for (let boite of cases) {
                    boite.active = false;
                }
            }
        }
    }
};



//Vide les cases
const videCases = function () {
    for (let boite of cases) {
        boite.innerText = '';
        boite.style.backgroundImage = '';
    }
};

//Affiche message
const afficheMessage = function (msg) {
        panneauMessage.innerText = msg;
        document.querySelector("#boite-message").style.display = "flex";
};

//Jouer encore
replayBtn.addEventListener("click", function() {
    videCases();
    panneauMessage.innerText = "";
    document.querySelector("#boite-message").style.display = "none";
    joueurX = false;

    for (let boite of cases) {
        boite.active = true;
    }
});

const loading = document.getElementById("loading");
const commencer = document.getElementById("commencer");

commencer.addEventListener("click", function() {
    loading.classList.add("cache");
});