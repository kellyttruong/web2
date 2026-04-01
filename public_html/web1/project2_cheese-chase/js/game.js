console.log("Game start.");

const myMouse = document.querySelector("#mouse")
const myCheese = document.querySelector("#cheese")


let screenX = window.innerWidth;
let screenY = window.innerHeight;


let randoX;
let randoY;


setInterval(() => {
    randoX = Math.random() * screenX -520;
    randoY = Math.random() * screenY -250;
    myCheese.style.transform = `translateX(${randoX}px) translateY(${randoY}px)`
}, 5000);

// hit test

let mouseX;
let mouseY;

let cheeseX;
let cheeseY;

// myMouse.getBoundingClientRect().x
// myMouse.getBoundingClientRect().y

myMouse.addEventListener("click", () =>{
    myMouse.classList.toggle("move-right")
})

let objX= 0;
let objY= 0;
function moveMouse() {
    myMouse.style.transform = `translateX(${objX}px) translateY(${objY}px)`
}

const engineSound = new Audio("sounds/fart.mp3")

window.addEventListener("keydown", (evt) => {
    console.log(evt.key);
    if(evt.key == "ArrowRight") {
    // myMouse.classList.add("move-right")
    // myMouse.style.transform += "translateX(200px)"
    
    objX +=100; 
    moveMouse();

    }    
    if(evt.key == "ArrowLeft") {
     // myMouse.classList.remove("move-right")
    myMouse.style.transform += "translateX(-200px)"
    objX -=100;
    moveMouse();
    
    }

    if (evt.key == "ArrowUp") {
    myMouse.style.transform += "translateY(-200px)"
    objY -=100;
    moveMouse();
    
    }

    if (evt.key == "ArrowDown") {
    myMouse.style.transform +="translateY(200px)"
    objY +=100;
    moveMouse();

    }
    engineSound.pause();
    engineSound.currentTime = 0;
    engineSound.play();
    // myMouse.style.tranform = "tranformX(" + objX +")";
    // myMouse.style.transform = `translateX(${objX})`;
    })

    // Game Loop
setInterval(() => {
mouseX = myMouse.getBoundingClientRect().x
mouseY = myMouse.getBoundingClientRect().y
cheeseX = myCheese.getBoundingClientRect().x - 520
cheeseY = myCheese.getBoundingClientRect().y - 250

// console.log("robotX|robotY: " + robotX + " | " + robotY )
// console.log("batteryX|batteryY: " + batteryX + " | " + batteryY )

if (
(mouseX >= cheeseX && mouseX <= cheeseX + 500) &&
(mouseY >= cheeseY && mouseY <= cheeseY + 200)
)
{
console.log("Hit!")
triggerSomething()

}
}, 500);


const explosionSound = new Audio("sounds/eat.mp3")

function triggerSomething() {
explosionSound.pause()
explosionSound.currentTime = 0
explosionSound.play()
}

window.addEventListener("click", function(event) {
    console.log(event.clientX + " : " + event.clientY);
      objX = event.clientX-100;
      objY = event.clientY-92;
    mouse.style.transform = `translateX(${objX}px) translateY(${objY}px)`;
})


// Timer
let countdown;
function startTimer() {
  clearInterval(countdown);

  let timeLeft = 60; // 1 minutes in seconds

  countdown = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      document.getElementById("ding").play();
      document.getElementById("overlay").style.visibility = "visible";
    }

    timeLeft--;
  }, 1000);
}
startTimer()