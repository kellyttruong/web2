
// creation du canvas
const canvas = document.createElement("canvas");
// Format plein écran
canvas.width = document.documentElement.clientWidth; 
canvas.height = document.documentElement.clientHeight;
// L'ajouter au document
document.querySelector("#gameBox").appendChild(canvas);
// button pour rejouer
const replayButton = document.createElement("button");
replayButton.textContent = "rejouer";
replayButton.id = "replayButton";
document.querySelector("#gameBox").appendChild(replayButton);
replayButton.addEventListener("click", function () {init();});
// Le context ctx sert à manipuler le contenue du canevas
const ctx = canvas.getContext("2d");
// son pour attraper goodie
const goodySound = document.querySelector("#goodies");
// son lorsqu'on attrape baddy ou perd le jeu
const baddySound = document.querySelector("#baddies");
// son pour gagner le jeu
const winSound = document.querySelector("#win");



/* SPRITES */
// Image d'arrière-plan
let bgImage = new Image();
bgImage.src = "img/bg.svg";

// Estampe gagnant
let winImage = new Image();
winImage.src = "img/win.svg";

// Estampe perdant
let overImage = new Image();
overImage.src = "img/over.svg";

// Estampe perdant
let timeImage = new Image();
timeImage.src = "img/time.svg";

// Image du joueur
let playerImage = new Image();
playerImage.src = "img/santa.svg";

// Image des goodies 1
let goodyImage = new Image();
goodyImage.src = "img/purple.svg";

// Image des goodies 2
let goodyImage2 = new Image();
goodyImage2.src = "img/pink.svg";

// Image des goodies 3
let goodyImage3 = new Image();
goodyImage3.src = "img/green.svg";

// Image des goodies 4
let goodyImage4 = new Image();
goodyImage4.src = "img/yellow.svg";

// Regrouper les images
let goodyImages = [
    goodyImage,
    goodyImage2,
    goodyImage3,
    goodyImage4
];

// Image des baddis
let baddyImage = new Image();
baddyImage.src = "img/baddy.svg";


/* OBJETS GLOBAUX */
const player = {
    speed : 8, // mouvement en pixels par tick
    width: 115,
    height: 115
};

// son pour le son de fond
const bg = document.querySelector("#bg");
bg.loop = true;
bg.volume = 0.2;

let goodies = []; // variable pour contenir les goddies, un array
let baddies = []; // variable pour contenir les baddies, un array


// Variables de vitesse
let vX = 0;
let vY = 0;

//The timer variables
let t; //time
let sec = 0; //sec
let min =1; //min
let timer;
let timeLeft;


/* CONTRÔLES */
// Gérer les commandes tactiles
addEventListener("touchstart", function (e) {
    // if (e.target.id == "uArrow") { // HAUT
    //     vX = 0;
    //     vY = -player.speed;
    // }
    // else if (e.target.id == "dArrow") { // BAS
    //     vX = 0;
    //     vY = player.speed;
    // }

    // activation du son
    if (bg) {
        bg.play();
    }

    if (e.target.id == "lArrow") { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }

    else if (e.target.id == "rArrow") { //DROIT
        vX = player.speed;
        vY = 0;
    }

    else { // ARRÊT S’arrête si vous touchez ailleurs
        vX = 0;
        vY = 0;
    }

}, false);

// Gérer les commandes du clavier
addEventListener("keydown", function (e) {
    //Touches
    // activation du son
    if (bg) {
        bg.play();
    }

    if (e.key == "ArrowLeft") { // FLECHE GAUCHE
        vX = -player.speed;
        vY = 0;
    }

    if (e.key == "ArrowRight") { // FLECHE DROITE
        vX = player.speed;
        vY = 0;
    }

    if (e.key == " ") { // ARRÊT barre d’espace
        vX = 0;
        vY = 0;
    }

}, false);

// Arrêter le joueur quand on relâche la touche
addEventListener("keyup", function (e) {

    if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
        vX = 0;
        vY = 0;
    }

}, false);



/* ÉTAT INITIAL : INIT */
const init = function () {
    //Mettre le joueur au centre
    player.x = (canvas.width - player.width) / 2;
    player.y = canvas.height - player.height - 5;

// les 4 goodies
    goodies = [
        { width: 60, height: 60, image: goodyImage },
        { width: 60, height: 60, image: goodyImage2 },
        { width: 60, height: 60, image: goodyImage3 },
        { width: 60, height: 60, image: goodyImage4 }
    ];

    baddies = [
        { width: 60, height: 60 }
    ];

    //Placez des goodies à des endroits aléatoires
    for (let i in goodies) {
        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width));
        goodies[i].y = 0;
    }

       for (let i in baddies) {
        baddies[i].x = (Math.random() * (canvas.width - baddies[i].width));
        baddies[i].y = 0;
    }

    clearInterval(timer);

    // cacher le button pour rejouer
    replayButton.style.display = "none";
    vX = 0;
    vY = 0;``
    baddySound.pause();
    baddySound.currentTime = 0;

    timeLeft = 60;
    min = 1;
    sec = 0;

    pts =0;

    gameOver = false;
    overReady = false;

// timer de 60 a 0 secondes
    timeLeft = 60;
    timer = setInterval(clock, 1000); //clock() is the function handle the timer (line 222)

    main(); //lancer la boucle
};



/* BOUCLE PRINCIPALE : MAIN */
const main = function () {
if (checkWin()) {
    clearInterval(timer);

    // lorsqu'on gagne, on arrete le son de fond et on joue le son de victoire
    bg.pause();
    bg.currentTime = 0;

    winSound.currentTime = 0;
    winSound.play();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    // fond plus foncé pour le message de victoire
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (winImage.complete) {
        let winWidth = canvas.width * 0.8;
        let winHeight = winWidth * (winImage.height / winImage.width);

    ctx.drawImage(winImage,(canvas.width - winWidth) / 2,(canvas.height - winHeight) / 2,
        winWidth,
        winHeight
        );
    }
}
else if (gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // lorsqu'on perd, on arrete le son de fond et on joue le son de défaite
    clearInterval(timer);
    bg.pause();
    bg.currentTime = 0;

    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    // fond plus foncé pour le message de victoire
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);   

    if (overImage.complete) {
        let overWidth = canvas.width * 0.8;
        let overHeight = overWidth * (overImage.height / overImage.width);

    ctx.drawImage(overImage,(canvas.width - overWidth) / 2,(canvas.height - overHeight) / 2,
        overWidth,
        overHeight
    );

    replayButton.style.display = "block";
    
}
    }
    else {
        //Pas encore gagné, jouer le jeu
        //déplacer le joueur
        if (player.x > 0 && player.x < canvas.width - player.width) {
            player.x += vX;
        }

        else {
            player.x -= vX;
            vX = -vX; //bounce
        }

        if (player.y > 0 && player.y < canvas.height - player.height) {
            player.y += vY
        }

        else {
            player.y -= vY;
            vY = -vY; //bounce
        }

        if (Math.random() > .99) {
			spawnGoody(); //the function that generates a new goodie, line 214
		}
        
//vérifier les collisions
for (let i = goodies.length - 1; i >= 0; i--) {
    goodies[i].y += 2;

    if (checkCollision(player, goodies[i])) {
        goodies.splice(i, 1);
        pts++;

        goodySound.currentTime = 0;
        goodySound.play();
    }

    else if (goodies[i].y > canvas.height) {
        goodies.splice(i, 1);
    }
        }

        for (let i = baddies.length - 1; i >= 0; i--) {
    baddies[i].y += 2;

    if (checkCollision(player, baddies[i])) {
        gameOver = true;

        baddySound.currentTime = 0;
        baddySound.play();
    }

    else if (baddies[i].y > canvas.height) {
        baddies.splice(i, 1);
    }
}

        render();
        window.requestAnimationFrame(main);
    }
};



/* AFFICHAGE : RENDER */
const render = function (statut) {
    //Nettoyer l’écran/canvas à chaque tic
    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (statut == "win") {  // statut: on a gagné, afficher le cadre gagnant
        ctx.fillStyle = "rgb(200,230,200)";  //vert pale
        ctx.beginPath();
        ctx.roundRect(40,40,canvas.width-80, canvas.height-80, [40]);
        ctx.fill();
    
        if (winImage.complete) {
            ctx.drawImage(winImage, (canvas.width - winImage.width)/2,
            (canvas.height - winImage.height)/2);
        }
    }
    else {  // sinon, afficher le jeu, statut par défaut
        if (bgImage.complete) {
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}
        if (playerImage.complete) {
            ctx.drawImage(playerImage, player.x, player.y, 115, 115);
        }

    for (let i in goodies) {
        if (goodies[i].image.complete) {
            ctx.drawImage(goodies[i].image,goodies[i].x,goodies[i].y,60,60);
        }
}
    if (baddyImage.complete) {
        for (let i in baddies) {
            ctx.drawImage(baddyImage, baddies[i].x, baddies[i].y, 60, 60);
            }
        }


        //Label
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.textAlign = "right";
        ctx.font = "20px monospace"; //peut être une fonte du CSS
        ctx.fillText("Cadeaux : " + pts + "/40", canvas.width - 32, 50);
        ctx.fillText("Time: " + min + ":" + (sec < 10 ? "0" : "") + sec, canvas.width - 32, 114);   
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
let checkWin = function () {
    return pts >= 40;
};

// pour faire apparaître un goodie aléatoire de chaque couleur
let spawnGoody = function () {
    let random = Math.random();
    let selectedImage;

    // Choisir la couleur du goodie
    if (random < 0.7) {
        selectedImage = goodyImage; 
    }
    else if (random < 0.6) {
        selectedImage = goodyImage2; 
    }
    else if (random < 0.5) {
        selectedImage = goodyImage3; 
    }
    else  {
        selectedImage = goodyImage4; 
    }

    goodies.push({
        width: 60,
        height: 60,
        image: selectedImage,
        x: Math.random() * (canvas.width - 60),
        y: 0
    });

    // Faire apparaître un baddy parfois
    if (Math.random() > 0.5) {
        baddies.push({
            width: 60,
            height: 60,
            x: Math.random() * (canvas.width - 60),
            y: 0
        });
    }
};

let clock = function () {
    timeLeft--;
    min = Math.floor(timeLeft / 60);
    sec = timeLeft % 60;

if (timeLeft <= 0) {
    timeLeft = 0;
    gameOver = true;
    clearInterval(timer);
    // jouer le son de défaite
    baddySound.currentTime = 0;
    baddySound.play();
}}

//Lancer le jeu
init();



