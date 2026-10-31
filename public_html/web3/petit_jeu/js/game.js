/**
VERSION 5.0 • 2026 Jan
Mise à jour syntaxe et structure
Vraiment mobile first
**/


/* PLATEFORME DE JEU */
// Créer le canevas
const canvas = document.createElement("canvas");
// Format plein écran
canvas.width = document.documentElement.clientWidth; 
canvas.height = document.documentElement.clientHeight;
// L'ajouter au document
document.querySelector("#gameBox").appendChild(canvas);
// Le context ctx sert à manipuler le contenue du canevas
const ctx = canvas.getContext("2d");

/* SPRITES */
// Image d'arrière-plan
let bgImage = new Image();
bgImage.src = "img/background.png";

// Estampe gagnant
let winImage = new Image();
winImage.src = "img/win.png";

let overImage = new Image();
overImage.src = "img/over.png";

// Image du joueur
let playerImage = new Image();
playerImage.src = "img/player.png";

// Image des goodies
let goodyImage = new Image();
goodyImage.src = "img/goody.png";


// Image des baddis
let baddyImage = new Image();
baddyImage.src = "img/baddy.png";


/* OBJETS GLOBAUX */
const player = {
    speed : 5, // mouvement en pixels par tick
    width: 32,
    height: 32
};

let goodies = []; // variable pour contenir les goddies, un array

let baddies = []; // variable pour contenir les baddies, un array


// Variables de vitesse
let vX = 0;
let vY = 0;


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
    // if (e.key == "ArrowUp") { // FLECHE HAUT
    //     vX = 0;
    //     vY = -player.speed;
    // }
    // if (e.key == "ArrowDown") { // FLECHE BAS
    //     vX = 0;
    //     vY = player.speed;
    // }
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



/* ÉTAT INITIAL : INIT */
const init = function () {
    //Mettre le joueur au centre
    player.x = (canvas.width - player.width) / 2;
    player.y = canvas.height - player.height - 5;

    // Mettre 3 goodies dans l’array
    goodies = [
        { width: 32, height: 32 }, // un goody
        { width: 32, height: 32 }, // deux goodies
        { width: 32, height: 32 }  // trois goodies
    ];

      baddies = [
        { width: 32, height: 32 }, // un baddy
        { width: 32, height: 32 }, // deux baddies
        { width: 32, height: 32 }  // trois baddies
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
    lvl =1;
    pts =0;

    gameOver = false;
    overReady = false;

    main(); //lancer la boucle
};



/* BOUCLE PRINCIPALE : MAIN */
const main = function () {
	if (checkWin()) {
		//WIN display win frame
		if (winReady) {
			//ctx.drawImage(winImage, 0, 0);
			ctx.drawImage(winImage,
				(cvs.width-winImage.width)/2,
				(cvs.height-winImage.height)/2);
		}
    }
    	else if (gameOver) {
		//LOSE display Game Over frame
        if (overImage.complete) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(overImage,
            (canvas.width-overImage.width)/2,
            (canvas.height-overImage.height)/2);
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

        if (Math.random() > 0.99) {
			spawnGoody(); //the function that generates a new goodie, line 214
		}
        //vérifier les collisions
        for (let i in goodies) {
            goodies[i].y++;

            if (checkCollision(player,goodies[i])) {
                goodies.splice(i,1);
                pts++;
            }

            if (goodies[i].y > canvas.height) {
				goodies.splice(i, 1);
        
		}
        }
        for (let i in baddies) {
    baddies[i].y++;
    
            if (checkCollision(player,baddies[i])) {
                gameOver = true;
            }

            if (baddies[i].y > canvas.height) {
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
            ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
            ctx.beginPath();
            ctx.fillRect(0,0,canvas.width,canvas.height);
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
        if (baddyImage.complete) {
            for (let i in baddies) {
                ctx.drawImage(baddyImage, baddies[i].x, baddies[i].y);
            }
        }
        //Label
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "14px monospace"; //peut être une fonte du CSS
        ctx.fillText("Goodies restants : "+goodies.length, 32, 32);
        ctx.fillText("Points: "+pts, 32, 64);
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
	if (goodies.length > 0) {
		return false;
	} else {
		return true;
	}
};


let spawnGoody = function () {
	//push() adds an item to the array, a new goodie
	goodies.push({
		//We need to set the new goodie’s init properties
		width: 32,
		height: 32,
		//and place it at a random position at the top
		x: (Math.random() * (canvas.width - 32)),
		y: 0
	});

    	baddies.push({
		//We need to set the new goodie’s init properties
		width: 32,
		height: 32,
		//and place it at a random position at the top
		x: (Math.random() * (canvas.width - 32)),
		y: 0
	});
};



//Lancer le jeu
init();




