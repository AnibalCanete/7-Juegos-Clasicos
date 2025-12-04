
document.addEventListener("DOMContentLoaded", () => {
    // También Podemos Obtener el Tamaño de la Cuadricula del Usuario - We Can Also Get The (grid) size from User
    const CUADRICULA_ANCHO = 10;
    const CUADRICULA_ALTURA = 20;
    const CUADRICULA_TAMANO = CUADRICULA_ANCHO * CUADRICULA_ALTURA;

    // No Hace Falta Escribir 200 (divs) - No Need to Type 200 (divs)
    const cuadricula = crearCuadricula();
    let cuadrados = Array.from(cuadricula.querySelectorAll("div"));
    const botonIniciar = document.querySelector(".boton");
    const botonHamburguesa = document.querySelector(".interruptor");
    const menu = document.querySelector(".menu");
    const span = document.getElementsByClassName("cerrar")[0];
    const puntajeDisplay = document.querySelector(".puntaje-display");
    const lineasDisplay = document.querySelector(".lineas-puntaje");
    let indiceActual = 0;
    let rotacionActual = 0;
    const ancho = 10;
    let puntaje = 0;
    let lineas = 0;
    let temporizadorID;
    let siguienteAleatorio = 0;
    const colores = [
        "url(./assets/images/blue_block.png)",
        "url(./assets/images/pink_block.png)",
        "url(./assets/images/purple_block.png)",
        "url(./assets/images/peach_block.png)",
        "url(./assets/images/yellow_block.png"
    ];

    function crearCuadricula() {
        // La Cuadricula Principal - The Main Grid
        let cuadricula = document.querySelector(".cuadricula");
        for (let i = 0; i < CUADRICULA_TAMANO; i++) {
            let elementoCuadricula = document.createElement("div");
            cuadricula.appendChild(elementoCuadricula);
        }

        // Establecer La Base de la Cuadricula - Set Base of Grid
        for (let i = 0; i < CUADRICULA_ANCHO; i++) {
            let elementoCuadricula = document.createElement("div");
            elementoCuadricula.setAttribute("class", "bloque-3");
            cuadricula.appendChild(elementoCuadricula);
        }

        let cuadriculaAnterior = document.querySelector(".cuadricula-anterior");
        // Dado que 16 es el Tamaño Máximo de Cuadricula en la que Caben Todos los Tetrominos - Since 16 Is The Max (grid) Size in Which All The Tetrominoes
        // Puede Caber, Creamos uno Aqui - Can Fit We Create One Here
        for (let i = 0; i < 16; i++) {
            let elementoCuadricula = document.createElement("div");
            cuadriculaAnterior.appendChild(elementoCuadricula);
        }
        return cuadricula;
    }

    // Asignar Funciones a Códigos de Teclas - Assign Functions to Keycodes
    function control(e) {
        if (e.keyCode === 39) {
            moverDerecha();
        } else if (e.keyCode === 38) {
            rotar();
        } else if (e.keyCode === 37) {
            moverIzquierda();
        } else if (e.keyCode === 40) {
            moverAbajo();
        }
    }

    /**
     * El Comportamiento Clásico Consiste en Acelerar el Bloque si se Mantiene Pulsado el Botón de Bajar, Haciendo eso
     * The Classical Behavior is To Speed Up The Block if Down Button is Kept Pressed so Doing That
    */
    document.addEventListener("keydown", control);

    // Los Tetrominos - The Tetrominoes
    const lTetromino = [
        [1, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO * 2 + 1, 2],
        [CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO + 2, CUADRICULA_ANCHO * 2 + 2],
        [1, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO * 2 + 1, CUADRICULA_ANCHO * 2],
        [CUADRICULA_ANCHO, CUADRICULA_ANCHO * 2, CUADRICULA_ANCHO * 2 + 1, CUADRICULA_ANCHO * 2 + 2]
    ];

    const zTetromino = [
        [0, CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO * 2 + 1],
        [CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO + 2, CUADRICULA_ANCHO * 2, CUADRICULA_ANCHO * 2 + 1],
        [0, CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO * 2 + 1],
        [CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO + 2, CUADRICULA_ANCHO * 2, CUADRICULA_ANCHO * 2 + 1]
    ];

    const tTetromino = [
        [1, CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO + 2],
        [1, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO + 2, CUADRICULA_ANCHO * 2 + 1],
        [CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO + 2, CUADRICULA_ANCHO * 2 + 1],
        [1, CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1],
        [0, 1, CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1],
        [0, 1, CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1],
        [0, 1, CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1]
    ];

    const iTetromino = [
        [1, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO * 2 + 1, CUADRICULA_ANCHO * 3 + 1],
        [CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO + 2, CUADRICULA_ANCHO + 3],
        [1, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO * 2 + 1, CUADRICULA_ANCHO * 3 + 1],
        [CUADRICULA_ANCHO, CUADRICULA_ANCHO + 1, CUADRICULA_ANCHO + 2, CUADRICULA_ANCHO + 3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    // Tetrominó Seleccionado al Azar - Randomly Selct Tetromino
    let aleatorio = Math.floor(Math.random() * theTetrominoes.length);
    let actual = theTetrominoes[aleatorio][rotacionActual];

    // Mover el Tetrominó Abajo - Move The Tetromino MoveDown
    let posicionActual = 4;

    // Dibujar la Forma - Draw The Shape
    function dibujar() {
        actual.forEach(index => {
            cuadrados[posicionActual + index].classList.add("bloque");
            cuadrados[posicionActual + index].style.backgroundImage = colores[aleatorio];
        });
    }

    // Desdibujar la Forma - Undraw The Shape
    function desdibujar() {
        actual.forEach(index => {
            cuadrados[posicionActual + index].classList.remove("bloque");
            cuadrados[posicionActual + index].style.backgroundImage = "none";
        });
    }

    // Bajar en Bucle - Move Down on Loop
    function moverAbajo() {
        desdibujar();
        posicionActual = posicionActual += ancho;
        dibujar();
        congelar();
    }

    botonIniciar.addEventListener("click", () => {
        if (temporizadorID) {
            clearInterval(temporizadorID);
            temporizadorID = null;
        } else {
            dibujar();
            temporizadorID = setInterval(moverAbajo, 1000);
            siguienteAleatorio = Math.floor(Math.random() * theTetrominoes.length);
            formaDisplay();
        }
    });

    // Muevete a la Izquierda y Evita Colisiones con Figuras que se Mueven hacia la Izquierda - Move Left and Prevent Collisions With Shapes Moving Left
    function moverDerecha() {
        desdibujar();
        const estaEnElBordeDerecho = actual.some(index => (posicionActual + index) % ancho === ancho - 1);
        if (!estaEnElBordeDerecho) posicionActual += 1;
        if (actual.some(index => cuadrados[posicionActual + index].classList.contains("bloque-2"))) {
            posicionActual -= 1;
        }
        dibujar();
    }

    // Muevete a la Derecha y Evita Colisiones con Figuras que se Mueven Hacia la Derecha - Move Right and Prevent Collisions With Shapes Moving Right
    function moverIzquierda() {
        desdibujar();
        const estaEnElBordeIzquierdo = actual.some(index => (posicionActual + index) % ancho === 0);
        if (!estaEnElBordeIzquierdo) posicionActual -= 1;
        if (actual.some(index => cuadrados[posicionActual + index].classList.contains("bloque-2"))) {
            posicionActual += 1;
        }
        dibujar();
    }

    // Congelar la Forma - Freeze The Shape
    function congelar() {
        // Si el Bloque se ha Asentado - If Block has Settled
        if (actual.some(index => cuadrados[posicionActual + index + ancho].classList.contains("bloque-3") || cuadrados[posicionActual + index + ancho].classList.contains("bloque-2"))) {
            // Crea el Bloque 2 - Make it Block 2
            actual.forEach(index => cuadrados[index + posicionActual].classList.add("bloque-2"));
            // Comienza una Nueva Caída de Tetrominó - Start a New Tetromino Falling
            aleatorio = siguienteAleatorio;
            siguienteAleatorio = Math.floor(Math.random() * theTetrominoes.length);
            actual = theTetrominoes[aleatorio][rotacionActual];
            posicionActual = 4;
            dibujar();
            formaDisplay();
            agregarPuntaje();
            juegoTerminado();
        }
    }
    congelar();

    // Girar el Tetrominó
    function rotar() {
        desdibujar();
        rotacionActual++;
        if (rotacionActual === actual.length) {
            rotacionActual = 0;
        }
        actual = theTetrominoes[aleatorio][rotacionActual];
        dibujar();
    }

    // Fin del Juego - Game Over
    function juegoTerminado() {
        if (actual.some(index => cuadrados[posicionActual + index].classList.contains("bloque-2"))) {
            puntajeDisplay.innerHTML = "end";
            clearInterval(temporizadorID);
        }
    }

    // Mostrar el Tetrominó Anterior en la Pantalla de Puntuación - Show Previous Tetromino in scoreDisplay
    const anchoDisplay = 4;
    const cuadradosDisplay = document.querySelectorAll(".cuadricula-anterior div");
    let indiceDisplay = 0;

    const tetrominoesChico = [
        [1, anchoDisplay + 1, anchoDisplay * 2 + 1, 2], // lTetromino
        [0, anchoDisplay, anchoDisplay + 1, anchoDisplay * 2 + 1], //zTetromino
        [1, anchoDisplay, anchoDisplay + 1, anchoDisplay + 2], // tTetromino
        [0, 1, anchoDisplay, anchoDisplay + 1], // oTetromino
        [1, anchoDisplay + 1, anchoDisplay * 2 + 1, anchoDisplay * 3 + 1] // iTetromino
    ];

    function formaDisplay() {
        cuadradosDisplay.forEach(cuadrados => {
            cuadrados.classList.remove("bloque");
            cuadrados.style.backgroundImage = "none";
        });

        tetrominoesChico[siguienteAleatorio].forEach(index => {
            cuadradosDisplay[indiceDisplay + index].classList.add("bloque");
            cuadradosDisplay[indiceDisplay + index].style.backgroundImage = colores[siguienteAleatorio];
        });
    }

    // Puntiación Adicional - Add Score
    function agregarPuntaje() {
        for (indiceActual = 0; indiceActual < CUADRICULA_TAMANO; indiceActual += CUADRICULA_ANCHO) {
            const fila = [indiceActual, indiceActual + 1, indiceActual + 2, indiceActual + 3, indiceActual + 4, indiceActual + 5, indiceActual + 6, indiceActual + 7, indiceActual + 8, indiceActual + 9];
            if (fila.every(index => cuadrados[index].classList.contains("bloque-2"))) {
                puntaje += 10;
                lineas += 1;
                puntajeDisplay.innerHTML = puntaje;
                lineasDisplay.innerHTML = lineas;
                fila.forEach(index => {
                    cuadrados[index].style.backgroundImage = "none";
                    cuadrados[index].classList.remove("bloque-2") || cuadrados[index].classList.remove("bloque");
                });
                // Matriz de Empalme - Splice Array
                const cuadradosRemovidos = cuadrados.splice(indiceActual, ancho);
                cuadrados = cuadradosRemovidos.concat(cuadrados);
                cuadrados.forEach(cell => cuadricula.appendChild(cell));
            }
        }
    }

    // Estilismo de los Oyentes del Evento - Styling eventListeners
    botonHamburguesa.addEventListener("click", () => {
        menu.style.display = "flex";
    });

    span.addEventListener("click", () => {
        menu.style.display = "none";
    });

});
