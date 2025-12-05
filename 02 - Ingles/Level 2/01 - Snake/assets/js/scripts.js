
document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const scoreDisplay = document.querySelector("span");
    const startBtn = document.querySelector(".start");

    const width = 10;
    let currentIndex = 0; // So First div in pur grid
    let appleIndex = 0; // So First div in our grid
    let currentSnake = [2, 1, 0];
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;
    
    // To Start, and Restart The Game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove("snake"));
        squares[appleIndex].classList.remove("apple");
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add("snake"));
        interval = setInterval(movementEntersExits, intervalTime);
    }

    // Function That Deals With All The Move Outcomes of The Snake
    function movementEntersExits() {
        // Deals With Snake Hitting Border And Snake Hitting Self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // If Snake Hits Bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // If Snake Hits Right Wall
            (currentSnake[0] % width === 0 && direction === -1) || // If Snake Hits Left Wall
            (currentSnake[0] - width < 0 && direction === - width) || // If Snake Hits The Top
            squares[currentSnake[0] + direction].classList.contains("snake") // If Snake Goes Into Itself
        ) {
            return clearInterval(interval) // This Will Clear The Interval If Any Of The Above Happen
        }

        const tail = currentSnake.pop(); // Removes Last Item of The Array and Shows It
        squares[tail].classList.remove("snake"); // Removes class of (snake) from the Tail
        currentSnake.unshift(currentSnake[0] + direction); // Gives Direction To The Head Of The Array

        // Deals With Snake Getting Apple
        if (squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple");
            squares[tail].classList.add("snake");
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(movementEntersExits, intervalTime);
        }
        squares[currentSnake[0]].classList.add("snake");
    }

    // Generate New Apple Once Apple is Eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains("snake")) // Making Sure Apples Dont Appear on the Snake
        squares[appleIndex].classList.add("apple");
    }

    // Assign Functions to Keycodes
    function control(e) {
        squares[currentIndex].classList.remove("snake");
        if (e.keyCode === 39) {
            direction = 1; // If We Press The Right Arrow on Our Keyboard, The Snake Will Go Right One
        } else if (e.keyCode === 38) {
            direction = -width; // If We Press The Up Arrow, The Snake Will Go Back Ten (divs), Appering To Go Up
        } else if (e.keyCode === 37) {
            direction = -1; // If We Press Left, The Snake Will Go Left One (div)
        } else if (e.keyCode === 40) {
            direction = +width; // If We Press Down, The Snake Head Will Instantly Appear In The (div) Ten (divs) From Where You Are Now
        }
    }

    document.addEventListener("keyup", control);
    startBtn.addEventListener("click", startGame);
});
