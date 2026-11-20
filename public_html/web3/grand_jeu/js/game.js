/* PLATEFORME DE JEU */
// Créer le canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);
let replayBtn = document.querySelector("#replay");
let panneauMessage = document.querySelector("#message");
let victorybg = document.querySelector(".win");
const chat = document.querySelector(".chat");
const boitegagnant = document.querySelector(".boitegagnant");



// sons
let joue = false;
let beat = document.getElementById("beat");
let son1 = document.getElementById("poisson");
let son2 = document.getElementById("whale");
let rejouerSon = document.getElementById("rejouerSon");

/* VARIABLES */
let current_energy = 100;
let energy_loss_per_tick = 0.1;
let energy_gain_per_goodie = 20;
let energy_loss_per_baddie = 30;
let goodies_speed = 2;
let baddies_speed = 2;

let goodies_number = 0;


/* SPRITES */
// Image d'arrière-plan
let bgImage = new Image();
bgImage.src = "images/background1.png";

// Estampe gagnant
let winImage = new Image();
winImage.src = "images/tuPerds1.png";

// Image du joueur
let playerImage = new Image();
playerImage.src = "images/joueur.png";

// Image des goodies
let goodyImage = new Image();
goodyImage.src = "images/sardine.png";

// Image des baddies
let baddieImage = new Image();
baddieImage.src = "images/baddie.png";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

/* ÉTAT INITIAL : INIT */
const init = function () {
    //Mettre le joueur au centre
    player.x = canvas.width * .3;
    player.y = (canvas.height - player.height) / 2;

    // GOODIES
    goodies = [];

    setInterval(function(){
        let _pos = goodies.push({ width: 32, height: 32 });
        
        let _x = getRandomIntInclusive(canvas.width *.5 ,canvas.width - goodies[_pos-1].width);
        let _y = getRandomIntInclusive(goodies[_pos-1].height * 2,canvas.height - goodies[_pos-1].height * 2);
        goodies[_pos-1].x = _x;
        goodies[_pos-1].y = _y;
    }, 2000);

    // BADDIES
    baddies = [];

    setInterval(function(){
        let _pos = baddies.push({ width: 32, height: 32 });
        
        let _x = getRandomIntInclusive(canvas.width *.5 ,canvas.width - baddies[_pos-1].width);
        let _y = getRandomIntInclusive(baddies[_pos-1].height * 2,canvas.height - baddies[_pos-1].height * 2);
        baddies[_pos-1].x = _x;
        baddies[_pos-1].y = _y;
    }, 2000);

    main(); //lancer la boucle
};

/* BOUCLE PRINCIPALE : MAIN */
// dessiner les éléments
const main = function () {
    goodies_speed += 0.001;
    baddies_speed += 0.001;
    current_energy -= energy_loss_per_tick;

    if (checkFail()) {
        render("win"); //affichage gagnant vrai
    }
    else {
        //Pas encore gagné, jouer le jeu
        //déplacer le joueur
        if (player.y > 0 && player.y < canvas.height - player.height) {
            player.y += vY
        }
        else {
            player.y -= vY;
            vY = -vY; //bounce
        }
        // GOODIES
        goodies.forEach((element, index, array) => {
            element.x -= goodies_speed;

            if (element.x <= 0){
                array.splice(index,1);
            }
        });
        //vérifier les collisions
        for (let i in goodies) {
            if (checkCollision(player,goodies[i])) {
                // ENERGY
                current_energy += energy_gain_per_goodie;
                son1.play();
                goodies_number++;
                goodies.splice(i,1);
            }
        }

        // BADDIES
        baddies.forEach((element, index, array) => {
            element.x -= baddies_speed;

            if (element.x <= 0){
                array.splice(index,1);
            }
        });
        //vérifier les collisions
        for (let i in baddies) {
            if (checkCollision(player,baddies[i])) {
                // ENERGY
                current_energy-=energy_loss_per_baddie;
                son2.play();
                baddies.splice(i,1);
            }
        }

        render();
        window.requestAnimationFrame(main);
    }
};

/* OBJETS GLOBAUX */
const player = {
    speed : 5, // mouvement en pixels par tick
    width: 32,
    height: 32
};

// Variables de vitesse
let vX = 0;
let vY = 0;

/* CONTRÔLES */
// Gérer les commandes tactiles
addEventListener("touchstart", function (e) {
    let playerTouchY = e.touches[0].clientY;
    let hScreen = screen.height;

    if (playerTouchY > hScreen*.5) {
       vY = player.speed;
    }
    else {
        vY = -player.speed;
    }
}, false);


addEventListener("touchend", function (e) {
       vY = 0;
}, false);

// Gérer les commandes du clavier
addEventListener("keydown", function (e) {
    //Touches
    if (e.key == "ArrowUp") { // FLECHE HAUT
        vX = 0;
        vY = -player.speed;
    }
    if (e.key == "ArrowDown") { // FLECHE BAS
        vX = 0;
        vY = player.speed;
    }
}, false);

// Detecting when you let go of keyoard
addEventListener("keyup", function (e) {
    if (e.key == "ArrowUp") { // FLECHE HAUT
        vY = 0;
    }
    if (e.key == "ArrowDown") { // FLECHE BAS
        vY = 0;
    }
}, false);

// variable pour contenir les goddies, un array
let goodies = []; 

/* AFFICHAGE : RENDER */
const render = function (s) {
    //Nettoyer l’écran/canvas sur chaque tic
    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (s == "win") {  // statut: on a gagné, afficher le cadre gagnant
        if (winImage.complete) {

        }
        ctx.fillText("Poisson Consumés : " + Math.round(goodies_number), (canvas.width - winImage.width)/2,
                (canvas.height - winImage.height)/2 + 100);
    }
    else {  // sinon, afficher le jeu
        if (bgImage.complete) {
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        }
        if (playerImage.complete) {
            ctx.drawImage(playerImage, player.x, player.y);
        }
        if (goodyImage.complete) {
            for (let i in goodies) {
                ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
            }
        }
        // BADDIES
        if (baddieImage.complete) {
            for (let i in baddies) {
                ctx.drawImage(baddieImage, baddies[i].x, baddies[i].y);
            }
        }
    
        //Label
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "14px monospace"; //peut être une fonte CSS
        ctx.fillText("Energie restants : " + Math.round(current_energy), 32, 32);
        ctx.fillText("Poisson Consumés : " + Math.round(goodies_number), 32, 64);
    }
};

/* AUTRES FONCTIONS */
//Fonction générique pour vérifier les collisions
const checkCollision = function (obj1,obj2) {
    return (obj1.x < (obj2.x + obj2.width) &&
        (obj1.x + obj1.width) > obj2.x &&
        obj1.y < (obj2.y + obj2.height) &&
        (obj1.y + obj1.height) > obj2.y
    );
};

//Vérifiez si nous avons gagné
const checkFail = function () {
    if (current_energy <= 0){
        victorybg.style.opacity = "1";
        victorybg.style.pointerEvents="auto";

        boitegagnant.animate(
            [
                // Start position (above the final spot)
                { transform: 'translateY(-100px)', opacity: 0 },
                // End position (normal spot)
                { transform: 'translateY(0px)', opacity: 1 }
            ],
            {
                duration: 500, // duration in milliseconds
                easing: 'ease-out',
                fill: 'forwards' // keeps the final state
            }
        );
        return true;
    }
    return false;
};

//Affiche message
const afficheMessage = function (msg) {
        panneauMessage.innerText = msg;
};

//Jouer encore
replayBtn.addEventListener("click", function() {
    victorybg.style.opacity = "0";
    victorybg.style.pointerEvents="none";
    afficheMessage("");
    current_energy = 100;
});

//Lancer le jeu
init();

