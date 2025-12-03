
const tiempoRestanteDisplay = document.querySelector("#tiempo-restante");
const resultadoDisplay = document.querySelector("#resultado");
const inicioPausaBoton = document.querySelector("#iniciar-pausar-boton");
const cuadrados = document.querySelectorAll(".cuadricula div");
const registrosIzquierdos = document.querySelectorAll(".log-izquierda");
const registrosDerechos = document.querySelectorAll(".log-derecha");
const autosIzquierda = document.querySelectorAll(".auto-izquierda");
const autosDerecha = document.querySelectorAll(".auto-derecha");

let indiceActual = 76;
const ancho = 9;
let temporizadorID;
let temporizadorDeResultadosID;
let tiempoActual = 20;

function moverRana(e) {
    cuadrados[indiceActual].classList.remove("rana");

    switch (e.key) {
        case "ArrowLeft":
            if (indiceActual % ancho !== 0) indiceActual -= 1;
            break;
        case "ArrowRight":
            if (indiceActual % ancho < ancho - 1) indiceActual += 1;
            break;
        case "ArrowUp":
            if (indiceActual - ancho >= 0) indiceActual -= ancho;
            break;
        case "ArrowDown":
            if (indiceActual + ancho < ancho * ancho) indiceActual += ancho;
            break;
    }

    cuadrados[indiceActual].classList.add("rana");
}

function elementosDeMovimientoAutomatico() {
    tiempoActual--;
    tiempoRestanteDisplay.textContent = tiempoActual;
    registrosIzquierdos.forEach(registroIzquierdo => moverRegistroIzquierdo(registroIzquierdo));
    registrosDerechos.forEach(registroDerecho => moverRegistroDerecho(registroDerecho));
    autosIzquierda.forEach(autoIzquierdo => moverAutoIzquierdo(autoIzquierdo));
    autosDerecha.forEach(autoDerecho => moverAutoDerecho(autoDerecho));
}

function comprobarResultados() {
    perder();
    ganar();
}

function moverRegistroIzquierdo(registroIzquierdo) {
    switch (true) {
        case registroIzquierdo.classList.contains("l1"):
            registroIzquierdo.classList.remove("l1");
            registroIzquierdo.classList.add("l2");
            break;
        case registroIzquierdo.classList.contains("l2"):
            registroIzquierdo.classList.remove("l2");
            registroIzquierdo.classList.add("l3");
            break;
        case registroIzquierdo.classList.contains("l3"):
            registroIzquierdo.classList.remove("l3");
            registroIzquierdo.classList.add("l4");
            break;
        case registroIzquierdo.classList.contains("l4"):
            registroIzquierdo.classList.remove("l4");
            registroIzquierdo.classList.add("l5");
            break;
        case registroIzquierdo.classList.contains("l5"):
            registroIzquierdo.classList.remove("l5");
            registroIzquierdo.classList.add("l1");
            break;
    }
}

function moverRegistroDerecho(registroDerecho) {
    switch (true) {
        case registroDerecho.classList.contains("l1"):
            registroDerecho.classList.remove("l1");
            registroDerecho.classList.add("l5");
            break;
        case registroDerecho.classList.contains("l2"):
            registroDerecho.classList.remove("l2");
            registroDerecho.classList.add("l1");
            break;
        case registroDerecho.classList.contains("l3"):
            registroDerecho.classList.remove("l3");
            registroDerecho.classList.add("l2");
            break;
        case registroDerecho.classList.contains("l4"):
            registroDerecho.classList.remove("l4");
            registroDerecho.classList.add("l3");
            break;
        case registroDerecho.classList.contains("l5"):
            registroDerecho.classList.remove("l5");
            registroDerecho.classList.add("l4");
            break;
    }   
}

function moverAutoIzquierdo(autoIzquierdo) {
    switch (true) {
        case autoIzquierdo.classList.contains("c1"):
            autoIzquierdo.classList.remove("c1");
            autoIzquierdo.classList.add("c2");
            break;
        case autoIzquierdo.classList.contains("c2"):
            autoIzquierdo.classList.remove("c2");
            autoIzquierdo.classList.add("c3");
            break;
        case autoIzquierdo.classList.contains("c3"):
            autoIzquierdo.classList.remove("c3");
            autoIzquierdo.classList.add("c1");
            break;
    }
}

function moverAutoDerecho(autoDerecho) {
    switch (true) {
        case autoDerecho.classList.contains("c1"):
            autoDerecho.classList.remove("c1");
            autoDerecho.classList.add("c3");
            break;
        case autoDerecho.classList.contains("c2"):
            autoDerecho.classList.remove("c2");
            autoDerecho.classList.add("c1");
            break;
        case autoDerecho.classList.contains("c3"):
            autoDerecho.classList.remove("c3");
            autoDerecho.classList.add("c2");
            break;
    }
} 

function perder() {
    if (
        cuadrados[indiceActual].classList.contains("c1") ||
        cuadrados[indiceActual].classList.contains("l4") ||
        cuadrados[indiceActual].classList.contains("l5") ||
        tiempoActual <= 0
    ) {
        resultadoDisplay.textContent = "Perdiste!";    
        clearInterval(temporizadorID);
        clearInterval(temporizadorDeResultadosID);
        cuadrados[indiceActual].classList.remove("rana");
        document.removeEventListener("keyup", moverRana);
    }
}

function ganar() {
    if (cuadrados[indiceActual].classList.contains("bloque-final")) {
        resultadoDisplay.textContent = "Ganaste!";
        clearInterval(temporizadorID);
        clearInterval(temporizadorDeResultadosID);
        document.removeEventListener("keyup", moverRana);
    }
}

inicioPausaBoton.addEventListener("click", () => {
    if (temporizadorID) {
        clearInterval(temporizadorID);
        clearInterval(temporizadorDeResultadosID);
        temporizadorDeResultadosID = null;
        temporizadorID = null;
        document.removeEventListener("keyup", moverRana);
    } else {
        temporizadorID = setInterval(elementosDeMovimientoAutomatico, 1000);
        temporizadorDeResultadosID = setInterval(comprobarResultados, 50);
        document.addEventListener("keyup", moverRana);
    }
});
