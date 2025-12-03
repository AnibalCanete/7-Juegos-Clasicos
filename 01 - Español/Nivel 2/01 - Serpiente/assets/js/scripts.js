
document.addEventListener("DOMContentLoaded", () => {
    const cuadrados = document.querySelectorAll(".cuadricula-grid div");
    const puntajeDisplay = document.querySelector("span");
    const iniciarBtn = document.querySelector(".iniciar-start");

    const ancho = 10;
    let indiceActual = 0; // El Primer div de nuestro grid - So First div in our grid
    let indiceManzana = 0; // El Primer div de nuestro grid - So First div in our grid
    let serpienteActual = [2, 1, 0];
    let direccion = 1;
    let puntaje = 0;
    let velocidad = 0.9;
    let intervaloDeTiempo = 0;
    let intervalo = 0;

    // Para Comenzar y Reiniciar el Juego - To Start, and Restart The Game
    function iniciarJuego() {
        serpienteActual.forEach(index => cuadrados[index].classList.remove("serpiente-snake"));
        cuadrados[indiceManzana].classList.remove("manzana-apple");
        clearInterval(intervalo);
        puntaje = 0;
        manzanaAleatoria();
        direccion = 1;
        puntajeDisplay.innerText = puntaje;
        intervaloDeTiempo = 1000;
        serpienteActual = [2, 1, 0];
        indiceActual = 0;
        serpienteActual.forEach(index => cuadrados[index].classList.add("serpiente-snake"));
        intervalo = setInterval(movimientoSaleEntra, intervaloDeTiempo)
    }

    /**
     * Función que Maneja Todos los Resultados Movimientos de la Serpiente
     * Function That Deals With All The Move Outcomes of The Snake 
    */
    function movimientoSaleEntra() {
        /**
         * Trata Sobre Serpientes que Golpean el Borde y Serpientes que se Golpean a si Mismas
         * Deals With Snake Hitting Border And Snake Hitting Self
        */
        if (
            (serpienteActual[0] + ancho >= (ancho * ancho) && direccion === ancho) || // Si La Serpiente Choca con el Fondo - If Snake Hits Bottom
            (serpienteActual[0] % ancho === ancho -1 && direccion === 1) || // Si La Serpiente Choca Contra La Pared Derecha - If Snake Hits Right Wall
            (serpienteActual[0] % ancho === 0 && direccion === -1) || // Si La Serpiente Choca Contra La Pared Izquierda - If Snake Hits Left Wall
            (serpienteActual[0] - ancho < 0 && direccion === -ancho) || // Si la Serpiente Choca con la Cima - If Snake Hits The Top
            cuadrados[serpienteActual[0] + direccion].classList.contains("serpiente-snake") // Si La Serpiente Choca Consigo Mismo - If Snake Goes Into Itself
        ) { 
            return clearInterval(intervalo); // Esto Borrara El Intervalo Si Ocurre Algunos de los Casos Anteriores - This Will Clear The Interval If Any Of The Above Happen
        }

        const cola = serpienteActual.pop(); // Elimina el Ultimo Elemento de la Matriz y Lo Muestra - Removes Last Item of The Array and Shows It
        cuadrados[cola].classList.remove("serpiente-snake"); // Elimina la Clase de (serpiente-snake) de la cola - Removes class of (serpiente-snake) from the Tail
        serpienteActual.unshift(serpienteActual[0] + direccion); // Da Dirección A La Cabeza de La Matriz - Gives Direction To The Head Of The Array

        // Tratos Con Serpientes Que Consiguen La Manzana - Deals With Snake Getting Apple
        if (cuadrados[serpienteActual[0]].classList.contains("manzana-apple")) {
            cuadrados[serpienteActual[0]].classList.remove("manzana-apple");
            cuadrados[cola].classList.add("serpiente-snake");
            serpienteActual.push(cola);
            manzanaAleatoria();
            puntaje++;
            puntajeDisplay.textContent = puntaje;
            clearInterval(intervalo);
            intervaloDeTiempo = intervaloDeTiempo * velocidad;
            intervalo = setInterval(movimientoSaleEntra, intervaloDeTiempo);
        }
        cuadrados[serpienteActual[0]].classList.add("serpiente-snake");
    }

    // Generar Una Nueva Manzana Una Vez que Se Haya Comido la Manzana - Generate New Apple Once Apple is Eaten
    function manzanaAleatoria() {
        do {
            indiceManzana = Math.floor(Math.random() * cuadrados.length);
        } while (cuadrados[indiceManzana].classList.contains("serpiente-snake")) // Nos Aseguramos De Que No Aparezcan Manzana en la Serpiente - Making Sure Apples Dont Appear on the Snake
        cuadrados[indiceManzana].classList.add("manzana-apple");
    }

    // Asignar Funciones a Códigos de Teclas - Assign Functions to Keycodes
    function control(e) {
        cuadrados[indiceActual].classList.remove("serpiente-snake");

        if (e.keyCode === 39) {
            direccion = 1; // Si pulsamos la Flecha Derecha del Teclado, La Serpiente Irá Una Dirección a la Derecha - If We Press The Right Arrow on Our Keyboard, The Snake Will Go Right One
        } else if (e.keyCode === 38) {
            direccion = -ancho; // Si pulsamos la Flecha Hacia Arriba, La Serpiente Retrocederá diez (divs) dando la impresión de que sube - If We Press The Up Arrow, The Snake Will Go Back Ten (divs), Appering To Go Up
        } else if (e.keyCode === 37) {
            direccion = -1; // Si Pulsamos Izquierda, La Serpiente Se Movera Una Unidad a la Izquierda - If We Press Left, The Snake Will Go Left One (div)
        } else if (e.keyCode === 40) {
            direccion = +ancho; // Si Pulsamos Hacia Abajo, La Cabeza de la Serpiente Aparecerá Instantáneamente en el (div) diez (divs) más Abajo de Donde Te Encuentras Ahora - If We Press Down, The Snake Head Will Instantly Appear In The (div) Ten (divs) From Where You Are Now
        }
    }

    document.addEventListener("keyup", control);
    iniciarBtn.addEventListener("click", iniciarJuego);

});
