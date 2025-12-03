
const cuadricula = document.querySelector(".cuadricula-grid");
const resultadoDisplay = document.querySelector(".resultados-results");
let indiceActualTirador = 202;
const ancho = 15;
const alienigenasRemovidos = [];
let invasoresID;
let vaALaDerecha = true;
let direccion = 1;
let resultados = 0;

for (let i = 0; i < ancho * ancho; i++) {
    const cuadrado = document.createElement("div");
    cuadricula.appendChild(cuadrado);
}

const cuadrados = Array.from(document.querySelectorAll(".cuadricula-grid div"));

const alienigenasInvasores = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

function dibujar() {
    for (let i = 0; i < alienigenasInvasores.length; i++) {
        if (!alienigenasRemovidos.includes(i)) {
            cuadrados[alienigenasInvasores[i]].classList.add("invasor-invader");
        }
    }
}

dibujar();

cuadrados[indiceActualTirador].classList.add("tirador-shooter");

function eliminar() {
    for (let i = 0; i < alienigenasInvasores.length; i++) {
        cuadrados[alienigenasInvasores[i]].classList.remove("invasor-invader");
    }
}

function moverTirador(e) {
    cuadrados[indiceActualTirador].classList.remove("tirador-shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (indiceActualTirador % ancho !== 0) indiceActualTirador -= 1;
            break;
        case "ArrowRight":
            if (indiceActualTirador % ancho < ancho - 1) indiceActualTirador += 1;
            break;
    }
    cuadrados[indiceActualTirador].classList.add("tirador-shooter");
}

document.addEventListener("keydown", moverTirador);

function moverInvasores() {
    const bordeIzquierdo = alienigenasInvasores[0] % ancho === 0;
    const bordeDerecho = alienigenasInvasores[alienigenasInvasores.length - 1] % ancho === ancho - 1;
    eliminar();

    if (bordeDerecho && vaALaDerecha) {
        for (let i = 0; i < alienigenasInvasores.length; i++) {
            alienigenasInvasores[i] += ancho + 1;
            direccion = -1;
            vaALaDerecha = false;
        }
    }

    if (bordeIzquierdo && !vaALaDerecha) {
        for (let i = 0; i < alienigenasInvasores.length; i++) {
            alienigenasInvasores[i] += ancho - 1;
            direccion = 1;
            vaALaDerecha = true;
        }
    }

    for (let i = 0; i < alienigenasInvasores.length; i++) {
        alienigenasInvasores[i] += direccion;
    }

    dibujar();

    if (cuadrados[indiceActualTirador].classList.contains("invasor-invader")) {
        resultadoDisplay.innerHTML = "Fin del Juego";
        clearInterval(invasoresID);
    }

    if (alienigenasRemovidos.length === alienigenasInvasores.length) {
        resultadoDisplay.innerHTML = "Ganaste";
        clearInterval(invasoresID);
    }
}

invasoresID = setInterval(moverInvasores, 600);

function disparar(e) {
    let laserID;
    let indiceActualLaser = indiceActualTirador;

    function moverLaser() {
        cuadrados[indiceActualLaser].classList.remove("laser");
        indiceActualLaser -= ancho;
        cuadrados[indiceActualLaser].classList.add("laser");

        if (cuadrados[indiceActualLaser].classList.contains("invasor-invader")) {
            cuadrados[indiceActualLaser].classList.remove("laser");
            cuadrados[indiceActualLaser].classList.remove("invasor-invader");
            cuadrados[indiceActualLaser].classList.add("boom");

            setTimeout(() => cuadrados[indiceActualLaser].classList.remove("boom"), 300);
            clearInterval(laserID);

            const alienigenaRemovido = alienigenasInvasores.indexOf(indiceActualLaser);
            alienigenasRemovidos.push(alienigenaRemovido);
            resultados++;
            resultadoDisplay.innerHTML = resultados;
        }
    }

    if (e.key === "ArrowUp") {
        laserID = setInterval(moverLaser, 100);
    }
}

document.addEventListener("keydown", disparar);
