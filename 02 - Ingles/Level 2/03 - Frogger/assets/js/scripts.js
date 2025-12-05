
const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const registersLeft = document.querySelectorAll(".log-left");
const registersRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");

let currentIndex = 76;
const width = 9;
let timerID;
let timerResultsID;
let currentTime = 20;

function moveFrog(e) {
    squares[currentIndex].classList.remove("frog");
    switch (e.key) {
        case "ArrowLeft":
            if (currentIndex % width !== 0) currentIndex -= 1;
            break;
        case "ArrowRight":
            if (currentIndex % width < width - 1) currentIndex += 1;
            break;
        case "ArrowUp":
            if (currentIndex - width >= 0) currentIndex -= width;
            break;
        case "ArrowDown":
            if (currentIndex + width < width * width) currentIndex += width;
            break; 
    }
    squares[currentIndex].classList.add("frog");
}

function elementsOfAutomaticMovements() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    registersLeft.forEach(registerLeft => moveRegisterLeft(registerLeft));
    registersRight.forEach(registerRight => moveRegisterRight(registerRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
}

function checkResults() {
    lose();
    win();
}

function moveRegisterLeft(registerLeft) {
    switch (true) {
        case registerLeft.classList.contains("l1"):
            registerLeft.classList.remove("l1");
            registerLeft.classList.add("l2");
            break;
        case registerLeft.classList.contains("l2"):
            registerLeft.classList.remove("l2");
            registerLeft.classList.add("l3");
            break;
        case registerLeft.classList.contains("l3"):
            registerLeft.classList.remove("l3");
            registerLeft.classList.add("l4");
            break;
        case registerLeft.classList.contains("l4"):
            registerLeft.classList.remove("l4");
            registerLeft.classList.add("l5");
            break;
        case registerLeft.classList.contains("l5"):
            registerLeft.classList.remove("l5");
            registerLeft.classList.add("l1");
            break;
    }
}

function moveRegisterRight(registerRight) {
    switch (true) {
        case registerRight.classList.contains("l1"):
            registerRight.classList.remove("l1");
            registerRight.classList.add("l5");
            break;
        case registerRight.classList.contains("l2"):
            registerRight.classList.remove("l2");
            registerRight.classList.add("l1");
            break;
        case registerRight.classList.contains("l3"):
            registerRight.classList.remove("l3");
            registerRight.classList.add("l2");
            break;
        case registerRight.classList.contains("l4"):
            registerRight.classList.remove("l4");
            registerRight.classList.add("l3");
            break;
        case registerRight.classList.contains("l5"):
            registerRight.classList.remove("l5");
            registerRight.classList.add("l4");
            break;
    }
}

function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains("c1"):
            carLeft.classList.remove("c1");
            carLeft.classList.add("c2");
            break;
        case carLeft.classList.contains("c2"):
            carLeft.classList.remove("c2");
            carLeft.classList.add("c3");
            break;
        case carLeft.classList.contains("c3"):
            carLeft.classList.remove("c3");
            carLeft.classList.add("c1");
            break;
    }
}

function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains("c1"):
            carRight.classList.remove("c1");
            carRight.classList.add("c3");
            break;
        case carRight.classList.contains("c2"):
            carRight.classList.remove("c2");
            carRight.classList.add("c1");
            break;
        case carRight.classList.contains("c3"):
            carRight.classList.remove("c3");
            carRight.classList.add("c2");
            break;
    }
}

function lose() {
    if (
        squares[currentIndex].classList.contains("c1") ||
        squares[currentIndex].classList.contains("l4") ||
        squares[currentIndex].classList.contains("l5") ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = "¡You Lose!";
        clearInterval(timerID);
        clearInterval(timerResultsID);
        squares[currentIndex].classList.remove("frog");
        document.removeEventListener("keyup", moveFrog);
    }
}

function win() {
    if (squares[currentIndex].classList.contains("final-block")) {
        resultDisplay.textContent = "¡You Won!";
        clearInterval(timerID);
        clearInterval(timerResultsID);
        document.removeEventListener("keyup", moveFrog);
    }
}

startPauseButton.addEventListener("click", () => {
    if (timerID) {
        clearInterval(timerID);
        clearInterval(timerResultsID);
        timerResultsID = null;
        timerID = null;
        document.removeEventListener("keyup", moveFrog);
    } else {
        timerID = setInterval(elementsOfAutomaticMovements, 1000);
        timerResultsID = setInterval(checkResults, 50);
        document.addEventListener("keyup", moveFrog);
    }
});
