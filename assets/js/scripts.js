/* ----------------- Getting any data from opentbd.com API */

let baseURL = "https://opentdb.com/"

let getData = function (url) {
    return fetch(url).then(Response => Response.json());
}

/* ----------------- Getting category data from opentbd.com API */

let selectCategory = document.getElementById("category-selector");
let getCategories = getData(baseURL + "api_category.php");

getCategories.then(function (data) {
    categories = data.trivia_categories; /* array of categories taken from API*/
    for(let category of categories) {
        (selectCategory.options[selectCategory.options.length] = new Option(category.name, category.id)); /* Create an option list for the category selector */
    };
});

/* ----------------- Getting question data from opentbd.com API */

/* ----------------- Collapse animation Script */

document.getElementById("start").addEventListener("click", function () {
    setTimeout(
        function () {
            document.getElementById("game-circle").className += " inner-circle-load";
            document.getElementById("category-container").className += " hide";
            document.getElementById("start").className += " hide";
        }, 500
    );
    setTimeout(
        function () {
            document.getElementById("game-circle").className = "inner-circle";
        }, 4000
    );
    setTimeout(
        function () {
            document.getElementById("category-container").className = "";
            document.getElementById("start").className = "btn btn-start";
        }, 4500
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