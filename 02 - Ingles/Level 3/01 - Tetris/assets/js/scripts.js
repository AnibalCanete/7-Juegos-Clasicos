
document.addEventListener("DOMContentLoaded", () => {
    // We Can Also Get The (grid) size from User
    const GRID_WIDTH = 10;
    const GRID_HEIGHT = 20;
    const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;

    // No Need to Type 200 (divs)
    const grid = createGrid();
    let squares = Array.from(grid.querySelectorAll("div"));
    const startButton = document.querySelector(".button");
    const hamburgerButton = document.querySelector(".toggle");
    const menu = document.querySelector(".menu");
    const span = document.getElementsByClassName("close")[0];
    const scoreDisplay = document.querySelector(".score-display");
    const linesDisplay = document.querySelector(".lines-score");
    let currentIndex = 0;
    let currentRotation = 0;
    const width = 10;
    let score = 0;
    let lines = 0;
    let timerID;
    let nextRandom = 0;
    const colors = [
        "url(./assets/images/blue_block.png)",
        "url(./assets/images/pink_block.png)",
        "url(./assets/images/purple_block.png)",
        "url(./assets/images/peach_block.png)",
        "url(./assets/images/yellow_block.png)",
    ];

    function createGrid() {
        // The Main Grid
        let grid = document.querySelector(".grid");
        for (let i = 0; i < GRID_SIZE; i++) {
            let elementGrid = document.createElement("div");
            grid.appendChild(elementGrid);
        }

        // Set Base of Grid
        for (let i = 0; i < GRID_WIDTH; i++) {
            let elementGrid = document.createElement("div");
            elementGrid.setAttribute("class", "block-3");
            grid.appendChild(elementGrid);
        }

        let previousGrid = document.querySelector(".previous-grid");
        // Since 16 Is The Max (grid) Size in Which All The Tetrominoes
        // Can Fit We Create One Here
        for (let i = 0; i < 16; i++) {
            let elementGrid = document.createElement("div");
            previousGrid.appendChild(elementGrid);
        }
        return grid;
    }

    // Assign Functions to Keycodes
    function control(e) {
        if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }

    // The Classical Behavior is To Speed Up The Block if Down Button is Kept Pressed so Doing That
    document.addEventListener("keydown", control);

    // The Tetrominoes
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
    ];

    const zTetromino = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    ];

    const tTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    ];

    const oTetromino = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    ];

    const iTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    // Randomly Selct Tetromino
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    // Move The Tetromino MoveDown
    let currentPosition = 4;

    // Draw The Shape
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("block");
            squares[currentPosition + index].style.backgroundImage = colors[random];
        });
    }

    // Undraw The Shape
    function unDraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("block");
            squares[currentPosition + index].style.backgroundImage = "none";
        });
    }

    // Move Down on Loop
    function moveDown() {
        unDraw();
        currentPosition = currentPosition += width;
        draw();
        freeze();
    }

    startButton.addEventListener("click", () => {
        if (timerID) {
            clearInterval(timerID);
            timerID = null;
        } else {
            draw();
            timerID = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            shapeDisplay();
        }
    });

    // Move Left and Prevent Collisions With Shapes Moving Left
    function moveRight() {
        unDraw();
        const onTheRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if (!onTheRightEdge) currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("block-2"))) {
            currentPosition -= 1;
        }
        draw();
    }

    // Move Right and Prevent Collisions With Shapes Moving Right
    function moveLeft() {
        unDraw();
        const onTheLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if (!onTheLeftEdge) currentPosition -= 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("block-2"))) {
            currentPosition += 1;
        }
        draw();
    }

    // Freeze The Shape
    function freeze() {
        // If Block has Settled
        if (current.some(index => squares[currentPosition + index + width].classList.contains("block-3") || squares[currentPosition + index + width].classList.contains("block-2"))) {
            // Make it Block 2
            current.forEach(index => squares[index + currentPosition].classList.add("block-2"));
            // Start a New Tetromino Falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            shapeDisplay();
            addScore();
            gameOver();
        }
    }

    freeze();

    // Turn The Tetromino
    function rotate() {
        unDraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }

    // Game Over
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains("block-2"))) {
            scoreDisplay.innerHTML = "End";
            clearInterval(timerID);
        }
    }

    // Show Previous Tetromino in scoreDisplay
    const widthDisplay = 4;
    const squaresDisplay = document.querySelectorAll(".previous-grid div");
    let indexDisplay = 0;

    const tetrominoesSmall = [
        [1, widthDisplay + 1, widthDisplay * 2 + 1, 2],
        [0, widthDisplay, widthDisplay + 1, widthDisplay * 2 + 1],
        [1, widthDisplay, widthDisplay + 1, widthDisplay + 2],
        [0, 1, widthDisplay, widthDisplay + 1],
        [1, widthDisplay + 1, widthDisplay * 2 + 1, widthDisplay * 3 + 1],
    ];

    function shapeDisplay() {
        squaresDisplay.forEach(squares => {
            squares.classList.remove("block");
            squares.style.backgroundImage = "none";
        });

        tetrominoesSmall[nextRandom].forEach(index => {
            squaresDisplay[indexDisplay + index].classList.add("block");
            squaresDisplay[indexDisplay + index].style.backgroundImage = colors[nextRandom];
        });
    }

    // Add Score
    function addScore() {
        for (currentIndex = 0; currentIndex < GRID_SIZE; currentIndex += GRID_WIDTH) {
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9];
            if (row.every(index => squares[index].classList.contains("block-2"))) {
                score += 10;
                lines += 1;
                scoreDisplay.innerHTML = score;
                linesDisplay.innerHTML = lines;
                row.forEach(index => {
                    squares[index].style.backgroundImage = "none";
                    squares[index].classList.remove("block-2") || squares[index].classList.remove("block");
                });
                // Splice Array
                const squaresRemoved = squares.splice(currentIndex, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    //  Styling eventListeners
    hamburgerButton.addEventListener("click", () => {
        menu.style.display = "flex";
    });

    span.addEventListener("click", () => {
        menu.style.display = "none";
    });

});
