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
                boite.style.backroundImage = "url('')";
                joueurX = false;
            }
            else { //tour du jour O
                boite.style.backroundImage = "url('')";
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
    }
    else { //sinon valide gagnant
        for (let patron of patrons) { //boucle des patrons gagnants
            let val1 = cases[patron[0]].innerText; //les valeurs des positions du patron
            let val2 = cases[patron[1]].innerText;
            let val3 = cases[patron[2]].innerText;

            if (val1 &&
                val1 === val2 &&
                val1 === val3) {  //nous avons on gagnant
                afficheMessage(`Le gagnant est ${val1}`);
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
    }
};

//Affiche message
const afficheMessage = function (msg) {
        panneauMessage.innerText = msg;
};

//Jouer encore
replayBtn.addEventListener("click", function() {
    videCases();
    afficheMessage("");
    joueurX = true;
    for (let boite of cases) {
        boite.active = true;
    }
});