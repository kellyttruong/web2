// console.log ("js loaded");

/* JEU */
// creation du canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

/*sprite */
// Arriere plan
let bgImage = new Image();
bgImage.src = "img/background.png";

// Gagnant
let winImage = new Image();
winImage.src = "img/win.png";

// joueur
let playerImage = new Image();
playerImage.src = "img/player.png";

// goodie
let goodyImage = new Image();
goodyImage.src = "img/goody.png";

// objets globaux
const player = {
    speed : 5, //movement en pixel par tick
    width : 32,
    height : 32
};

let goodies = []; //array pour contenir les goodies


// variables de vitesse
let vX = 0;
let vY = 0;

/*controle*/
// gerer les commandes tractiles
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // haut
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { //bas
        vX = 0;
        vY = player.speed
    }
    else if (e.target.id == "lArrow") { //gauche
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { //droite
        vX = player.speed;
        vY = 0;
    }
    else { //arret
        vX = 0;
        vY = 0;
    }
}, false);

//gerer les commande du clavier
addEventListener("keydown", function (e) {
    //touches
    if (e.key == "ArrowUp") {
        vX = 0;
        vY = -player.speed;
    }
    if (e.key == "ArrowDown") {
        vX = 0;
        vY = player.speed;
    }
    if (e.key == "ArrowLeft") {
        vX = -player.speed;
        vY = 0;
    }
    if (e.key == "ArrowRight") {
        vX = player.speed;
        vY = 0;
    }
}, false);

//verifier si nous avans gagne
const checkWin = function () {
    if (goodies.length > 0) {
        return false;
    } else {
        return true;
    }
};


/*etat initial - init*/
const init = function () {
    // centraliser le joueur
    player.x = (canvas.width - player.width) /2;
    player.y = (canvas.height - player.height) /2;


// mettre 3 goodies dans array
goodies = [
    {width: 32, height: 32 }, //goodie 1
    {width: 32, height: 32 }, //goodie 2
    {width: 32, height: 32 } //goodie 3
];

//placer goodie aleatoirement
for (let i in goodies) {
    goodies[i].x = (Math.random() * (canvas.width - goodies[i].width));
    goodies[i].y = (Math.random() * (canvas.height - goodies[i].height));
    }

    main(); //lancer boucle
}


/*boucle principale - main*/
const main = function () {
    if (checkWin()) {
        render("win"); //affichage gagnant vrai
    }
    else {
        //pas encore gagne, jour le jeu
        //deplacer le joueur
if (player.x > 0 && player.x < canvas.width - player.width) {
    player.x += vX;
}
else {
    player.x -= vX;
    vX = -vX; //bounce
}
if (player.y > 0 && player.y < canvas.height - player.height) {
    player.y += vY;
}
else {
    player.y -= vY;
    vY = -vY;
}

//verifier les collisions
for (let i in goodies) {
    if (checkCollision(player, goodies[i])) {
        goodies.splice(i, 1);
    }
}
    render();
    window.requestAnimationFrame(main);
  }

};


/*affichage - render */
const render = function (s) {
    // nettoyer le canvas a chaque tic
    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (s == "win") { //statut: on a gagne, afficher le cadre gagnant
        ctx.fillStyle = "rgb(200, 230, 200)";
        ctx.beginPath();
        ctx.roundRect(40,40,canvas.width-80, canvas.height-80, [40]);
        ctx.fill();

    if (winImage.complete) {
        ctx.drawImage(winImage, (canvas.width - winImage.width)/2,
    (canvas.height - winImage.height)/2);
    }
}

else 
    if (bgImage.complete) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.beginPath();
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fill();
    }
    
    if (playerImage.complete) {
        ctx.drawImage(playerImage, player.x, player.y);
    }

    if (goodyImage.complete) {
        for (let i in goodies) {
            ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
        }
    }

    // label
    ctx.fillStyle = "rgb(250, 250, 250";
    ctx.font = "14px monospace"; //peut être une fonte du CSS
    ctx.fillText(player.x+" "+player.y+" "+goodies.length, 32, 32);
};

/* autre function*/
//fonction generique pour verifier les collisions
const checkCollision = function (obj1, obj2) {
    return (obj1.x < (obj2.x + obj2.width) &&
    (obj1.x + obj1.width) > obj2.x &&
    obj1.y < (obj2.y + obj2.height) &&
    (obj1.y + obj1.height) > obj2.y
    );
};


// lancer jeu
init();