
const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let impactPosition;
let currentTime = 60;
let timerID = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove("mole");
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add("mole");

    impactPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener("mousedown", () => {
        if (square.id === impactPosition) {
            result++;
            score.textContent = result;
            impactPosition = null;
        }
    });
});

function moveMole() {
    timerID = setInterval(randomSquare, 500);
}

moveMole();

function countdown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(countdownTimerId);
        clearInterval(timerID);
        alert("¡Game Over! Your Final Score is " + result)
    }
}

let countdownTimerId = setInterval(countdown, 1000);
