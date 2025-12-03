
document.addEventListener("DOMContentLoaded", () => {
    // Lista de Todas las Opciones de Tarjeta - List All Card Options
    const cartaArray = [
        {
            nombre: "fries",
            img: "./assets/images/fries.png",
        },
        {
            nombre: "cheeseburger",
            img: "./assets/images/cheeseburger.png",
        },
        {
            nombre: "ice-cream",
            img: "./assets/images/ice-cream.png",
        },
        {
            nombre: "pizza",
            img: "./assets/images/pizza.png",
        },
        {
            nombre: "milkshake",
            img: "./assets/images/milkshake.png",
        },
        {
            nombre: "hotdog",
            img: "./assets/images/hotdog.png",
        },
        {
            nombre: "fries",
            img: "./assets/images/fries.png",
        },
        {
            nombre: "cheeseburger",
            img: "./assets/images/cheeseburger.png",
        },
        {
            nombre: "ice-cream",
            img: "./assets/images/ice-cream.png",
        },
        {
            nombre: "pizza",
            img: "./assets/images/pizza.png",
        },
        {
            nombre: "milkshake",
            img: "./assets/images/milkshake.png",
        },
        {
            nombre: "hotdog",
            img: "./assets/images/hotdog.png",
        }
    ];

    cartaArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector(".cuadricula");
    const ResultadoDisplay = document.querySelector("#resultado");
    let cartasElegidas = [];
    let cartasElegidasId = [];
    let cartasGanadoras = [];

    // Crear El Tablero - Create The Board
    function crearTablero() {
        for (let i = 0; i < cartaArray.length; i++) {
            const carta = document.createElement("img");
            carta.setAttribute("src", "assets/images/blank.png");
            carta.setAttribute("data-id", i);
            carta.addEventListener("click", voltearCarta);
            grid.appendChild(carta);
        }
    }

    // Comprobar Si Hay Coincidencias - Check For Matches
    function comprobarCoincidencias() {
        const cartas = document.querySelectorAll("img");
        const opcionUnoId = cartasElegidasId[0];
        const opcionDosId = cartasElegidasId[1];

        if (opcionUnoId === opcionDosId) {
            cartas[opcionUnoId].setAttribute("src", "assets/images/blank.png");
            cartas[opcionDosId].setAttribute("src", "assets/images/blank.png");
            alert("¡Has Hecho Clic En La Misma Imagen!");
        } else if (cartasElegidas[0] === cartasElegidas[1]) {
            alert("Encontraste Una Coincidencia");
            cartas[opcionUnoId].setAttribute("src", "assets/images/white.png");
            cartas[opcionDosId].setAttribute("src", "assets/images/white.png");
            cartas[opcionUnoId].removeEventListener("click", voltearCarta);
            cartas[opcionDosId].removeEventListener("click", voltearCarta);
            cartasGanadoras.push(cartasElegidas);
        } else {
            cartas[opcionUnoId].setAttribute("src", "assets/images/blank.png");
            cartas[opcionDosId].setAttribute("src", "assets/images/blank.png");
            alert("Lo Siento, Inténtalo de Nuevo");
        }

        cartasElegidas = [];
        cartasElegidasId = [];
        ResultadoDisplay.textContent = cartasGanadoras.length;
        if (cartasGanadoras.length === cartaArray.length/2) {
            ResultadoDisplay.textContent = "¡Felicidades! Los has Encontrado Todos";
        }
    }

    // Voltear la Carta - Flip The Card
    function voltearCarta() {
        let cartaId = this.getAttribute("data-id");
        cartasElegidas.push(cartaArray[cartaId].nombre);
        cartasElegidasId.push(cartaId);
        this.setAttribute("src", cartaArray[cartaId].img);
        if (cartasElegidas.length === 2) {
            setTimeout(comprobarCoincidencias, 500);
        }
    }

    crearTablero();

});
