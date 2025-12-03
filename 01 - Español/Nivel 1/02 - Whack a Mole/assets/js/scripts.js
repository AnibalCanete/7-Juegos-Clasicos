
const cuadrados = document.querySelectorAll(".cuadrado-square");
const topo = document.querySelector(".topo-mole");
const tiempoRestante = document.querySelector("#tiempo-restante");
const puntaje = document.querySelector("#puntaje");

let resultado = 0;
let posicionDeImpacto;
let horaActual = 60;
let temporizadorID = null;

function cuadradoAleatorio() {
    cuadrados.forEach(cuadrado => {
        cuadrado.classList.remove("topo-mole");
    });

    let cuadradoAleatorio = cuadrados[Math.floor(Math.random() * 9)];
    cuadradoAleatorio.classList.add("topo-mole");

    posicionDeImpacto = cuadradoAleatorio.id;
}

cuadrados.forEach(cuadrado => {
    cuadrado.addEventListener("mousedown", () => {
        if (cuadrado.id === posicionDeImpacto) {
            resultado++;
            puntaje.textContent = resultado;
            posicionDeImpacto = null;
        }
    });
});

function moverTopo() {
    temporizadorID = setInterval(cuadradoAleatorio, 500);
}

moverTopo();

function cuentaAtras() {
    horaActual--;
    tiempoRestante.textContent = horaActual;

    if (horaActual === 0) {
        clearInterval(cuentaAtrasTemporizadorID);
        clearInterval(temporizadorID);
        alert("¡Fin Del Juego! Tu Puntuación Final es " + resultado);
    }
}

let cuentaAtrasTemporizadorID = setInterval(cuentaAtras, 1000);
