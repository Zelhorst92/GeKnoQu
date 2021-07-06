/* ----------------- Fade in/out animation Script */

document.getElementById('start').addEventListener("click", function () {
    setTimeout(
        function () {
            document.getElementById('game-circle').className += ' inner-circle-load';
        }, 500
    );
    setTimeout(
        function () {
            document.getElementById('game-circle').className = 'inner-circle';
        }, 4000
    );
});


/* ----------------- Modal Script */

let modal = document.getElementById("helpModal");
let help = document.getElementById("linkHelpModal");
let close = document.getElementById("helpExit")

help.onclick = function () {
    modal.style.display = "block";
}

close.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}