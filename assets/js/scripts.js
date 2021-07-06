/* ----------------- Getting any data from opentbd.com API */

let baseURL = "https://opentdb.com/"

let getData = function (url) {
    return fetch(url).then(Response => Response.json());
}

/* ----------------- Getting category data from opentbd.com API */

let selectCategory = document.getElementById("category-selector");
let getCategories = getData(baseURL + "api_category.php");

getCategories.then(function (result) {
    categories = result.trivia_categories; /* array of categories taken from API*/
    for (let category of categories) {
        (selectCategory.options[selectCategory.options.length] = new Option(category.name, category.id)); /* Create an option list for the category selector */
    };
});

/* ----------------- Getting category choice back to request appropriate questions form the API and start the game */

document.getElementById("start").addEventListener("click", function () {
   /*  let getQuestions = getData(baseURL + "api.php?amount=10&category=" + categoryId + "&type=multiple"); */
    setTimeout(
        function () {
            document.getElementById("game-circle").className += " inner-circle-load";
            document.getElementById("category-container").className += " hide";
            document.getElementById("start").className += " hide";
            document.getElementById("linkHelpModal").className += " hide"
            document.getElementById("restart").className = "give-up";
        }, 200
    );
    setTimeout(
        function () {
            document.getElementById("game-circle").className = "inner-circle";
            document.getElementById("tally-container").className = "";
            document.getElementById("question").className = "";
            document.getElementById("choiceOne").className = "btn btn-answer";
            document.getElementById("choiceTwo").className = "btn btn-answer";
            document.getElementById("choiceThree").className = "btn btn-answer";
            document.getElementById("choiceFour").className = "btn btn-answer";
        }, 3000
    );
});

/* ----------------- Getting question data from opentbd.com API */



/* ----------------- Collapse animation Script */

/* document.getElementById("start").addEventListener("click", collapseFunction); */

/* function unCollapseFunction() {

    setTimeout(
        function () {
            document.getElementById("game-circle").className = "inner-circle";
        }, 2000
    );
    setTimeout(
        function () {
            document.getElementById("category-container").className = "";
            document.getElementById("start").className = "btn btn-start";
        }, 2800
    );
}; */


/* ----------------- Modal Help Script */

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

/* ----------------- Restart Script */