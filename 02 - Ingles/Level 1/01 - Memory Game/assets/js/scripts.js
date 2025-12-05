
document.addEventListener("DOMContentLoaded", () => {
    // List All Card Options
    const cardArray = [
        {
            name: "fries",
            img: "./assets/images/fries.png",
        },
        {
            name: "cheeseburger",
            img: "./assets/images/cheeseburger.png",
        },
        {
            name: "ice-cream",
            img: "./assets/images/ice-cream.png",
        },
        {
            name: "pizza",
            img: "./assets/images/pizza.png",
        },
        {
            name: "milkshake",
            img: "./assets/images/milkshake.png",
        },
        {
            name: "hotdog",
            img: "./assets/images/hotdog.png",
        },
        {
            name: "fries",
            img: "./assets/images/fries.png",
        },
        {
            name: "cheeseburger",
            img: "./assets/images/cheeseburger.png",
        },
        {
            name: "ice-cream",
            img: "./assets/images/ice-cream.png",
        },
        {
            name: "pizza",
            img: "./assets/images/pizza.png",
        },
        {
            name: "milkshake",
            img: "./assets/images/milkshake.png",
        },
        {
            name: "hotdog",
            img: "./assets/images/hotdog.png",
        }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    let cardsChosen = [];
    let cardsChosenID = [];
    let cardsWinner = [];

    // Create The Board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement("img");
            card.setAttribute("src", "./assets/images/blank.png");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }

    // Check For Matches
    function checkForMatches() {
        const cards = document.querySelectorAll("img");
        const optionOneID = cardsChosenID[0];
        const optionTwoID = cardsChosenID[1];

        if (optionOneID === optionTwoID) {
            cards[optionOneID].setAttribute("src", "./assets/images/blank.png");
            cards[optionTwoID].setAttribute("src", "./assets/images/blank.png");
            alert("¡You Clicked On The Same Image!");
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert("You Found a Match");
            cards[optionOneID].setAttribute("src", "./assets/images/white.png");
            cards[optionTwoID].setAttribute("src", "./assets/images/white.png");
            cards[optionOneID].removeEventListener("click", flipCard);
            cards[optionTwoID].removeEventListener("click", flipCard);
            cardsWinner.push(cardsChosen);
        } else {
            cards[optionOneID].setAttribute("src", "./assets/images/blank.png");
            cards[optionTwoID].setAttribute("src", "./assets/images/blank.png");
            alert("I'm Sorry, Please Try Again");
        }

        cardsChosen = [];
        cardsChosenID = [];
        resultDisplay.textContent = cardsWinner.length;
        if (cardsWinner.length === cardArray.length/2) {
            resultDisplay.textContent = "Congratulations! You've Found Them All!";
        }
    }

    // Flip The Card
    function flipCard() {
        let cardID = this.getAttribute("data-id");
        cardsChosen.push(cardArray[cardID].name);
        cardsChosenID.push(cardID);
        this.setAttribute("src", cardArray[cardID].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatches, 500);
        }
    }

    createBoard();
    
});
