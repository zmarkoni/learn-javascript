var container = document.querySelector(".container");
var el = document.querySelector(".el");

document.querySelector(".startButton").addEventListener("click", start, false);

document.querySelector(".resetButton").addEventListener("click", reset, false);

function start() {
    container.classList.add("show");
};

function reset() {
    container.classList.remove("show");
};
