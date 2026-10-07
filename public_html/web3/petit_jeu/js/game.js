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

/*etat initial - init*/

const init = function () {
    // centraliser le joueur
    player.x = (canvas.width - player.width) /2;
    player.y = (canvas.height - player.height) /2;


// mettre 3 goodies dans array

goodies = [
    {width: 32, height: 32 }, //goodie 1
    {width: 32, height: 32 }, //goodie 2
    {width: 32, height: 32 }, //goodie 3
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
    render();
    window.requestAnimationFrame(main);
};

/*affichage - render */

const render = function (s) {
    // nettoyer le canvas a chaque tic
    ctx.clearRect(0,0,canvas.width, canvas.height);

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
    ctx.fillText("Au jeu!", 32, 32);
};

// lancer jeu
main();
init();