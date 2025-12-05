
const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".results");
let currentShooterIndex = 202;
const width = 15;
const aliensRemoved = [];
let invadersID;
let goToTheRight = true;
let direction = 1;
let results = 0;

for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const aliensInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

function draw() {
    for (let i = 0; i < aliensInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[aliensInvaders[i]].classList.add("invader");
        }
    }
}

draw();

squares[currentShooterIndex].classList.add("shooter");

function remove() {
    for (let i = 0; i < aliensInvaders.length; i++) {
        squares[aliensInvaders[i]].classList.remove("invader");
    }
}

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
    const leftEdge = aliensInvaders[0] % width === 0;
    const rightEdge = aliensInvaders[aliensInvaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && goToTheRight) {
        for (let i = 0; i < aliensInvaders.length; i++) {
            aliensInvaders[i] += width + 1;
            direction = -1;
            goToTheRight = false;
        }
    }

    if (leftEdge && !goToTheRight) {
        for (let i = 0; i < aliensInvaders.length; i++) {
            aliensInvaders[i] += width - 1;
            direction = 1;
            goToTheRight = true;
        }
    }

    for (let i = 0; i < aliensInvaders.length; i++) {
        aliensInvaders[i] += direction;
    }

    draw();

    if (squares[currentShooterIndex].classList.contains("invader")) {
        resultDisplay.innerHTML = "Game Over";
        clearInterval(invadersID);
    }

    if (aliensRemoved.length === aliensInvaders.length) {
        resultDisplay.innerHTML = "You Won";
        clearInterval(invadersID);
    }
}


invadersID = setInterval(moveInvaders, 600);

function shoot(e) {
    let laserID;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        if (squares[currentLaserIndex].classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);
            clearInterval(laserID);

            const alienRemoved = aliensInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            results++;
            resultDisplay.innerHTML = results;
        }
    }

    if (e.key === "ArrowUp") {
        laserID = setInterval(moveLaser, 100);
    }
}

document.addEventListener("keydown", shoot);
