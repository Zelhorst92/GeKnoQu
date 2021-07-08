/* ----------------- Getting category data from opentbd.com API */

let selectedCategory = document.getElementById("category-selector");
let getCategories = fetch("https://opentdb.com/api_category.php")
    .then(Response => Response.json())
    .catch(err => {
        console.error(err)
    });

getCategories.then(function (result) {
    categories = result.trivia_categories;
    for (let category of categories) {
        (selectedCategory.options[selectedCategory.options.length] = new Option(category.name, category.id)); /* Create an option list for the category selector */
    };
});

/* ----------------- Getting question data from opentbd.com API with selected category*/

document.getElementById("category-selector").addEventListener("select", function () {
    fetchQuestions();
});

function fetchQuestions() {
    let categoryId = document.getElementById("category-selector").value;
    const fetchedQuestions = fetch("https://opentdb.com/api.php?amount=4&category=" + categoryId + "&type=multiple") /* Dont forget to change it back to 20! */
        .then(Response => Response.json())
        .catch(err => {
            console.error(err)
        });
    fetchedQuestions.then((data) => {
        questions = data.results.map(fetchedQuestion => {
            const formattedQuestions = {
                question: fetchedQuestion.question,
            };
            formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
            const answerChoices = [...fetchedQuestion.incorrect_answers];
            answerChoices.splice(formattedQuestions.answer - 1, 0, fetchedQuestion.correct_answer);
            answerChoices.forEach((choice, index) => {
                formattedQuestions['choice' + (index + 1)] = choice;
            });
            questions = formattedQuestions;
            return questions;
        });
    });
};

/* ----------------- */

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("answer-choice"));
const questionCounterProgress = document.getElementById("question-counter");
const scoreProgress = document.getElementById("score");
const leftLoad = document.getElementById("left");
const rightLoad = document.getElementById("right");
const gameCircle = document.getElementById("game-circle");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

const correctPoint = 1;
const maxQuestions = 20;

document.getElementById("start").addEventListener("click", function startGame() {
    if (questions.length === 0) {
        fetchQuestions();
        setTimeout(
            function () {
                startGame();
            }, 50
        );
    } else {

        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        console.log(availableQuestions);
        getNewQuestion();
        setTimeout(
            function () {
                gameCircle.className += " inner-circle-load";
                document.getElementById("category-container").className += " hide";
                document.getElementById("start").className += " hide";
                document.getElementById("linkHelpModal").className += " hide"
                document.getElementById("give-up").className = "btn-bottom";
            }, 200
        );
        setTimeout(
            function () {
                gameCircle.className = "inner-circle";
                document.getElementById("tally-container").className = "";
                question.className = "";
                for (let choice of choices) {
                    choice.className = "btn answer-choice";
                }
            }, 3000
        );

    }
});

/* ----------------- Get a new question */

function getNewQuestion() {

    if (availableQuestions.length === 0) {
            gameEnd();
    } else {
        setTimeout(
            function () {
                leftLoad.className = "timer left"
                rightLoad.className = "timer right"
            }, 4000
        )
        questionCounter++;
        questionCounterProgress.innerHTML = questionCounter + "/" + maxQuestions;

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerHTML = currentQuestion.question;

        for (let choice of choices) {
            const number = choice.dataset["number"];
            choice.innerHTML = currentQuestion["choice" + number];
        };

        availableQuestions.splice(questionIndex, 1);

        acceptingAnswers = true;
    };
};

/* ----------------- Check answer on click */

for (let choice of choices) {
    choice.addEventListener("click", function (event) {

        const correctAnswerNumber = currentQuestion.answer;
        const correctAnswer = document.querySelector(`[data-number="${correctAnswerNumber}"]`);

        if (!acceptingAnswers) {
            return;
        };

        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        let classToApply;

        if (selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
            addScore(correctPoint);
            leftLoad.className = "timer left hide"
            rightLoad.className = "timer right hide"
        } else {
            classToApply = "incorrect";
            leftLoad.className = "timer left hide"
            rightLoad.className = "timer right hide"
            setTimeout(function () {
                correctAnswer.classList.add("correct");
            }, 500)

        };

        selectedChoice.classList.add(classToApply);
        document.getElementById("outer-circle").className = classToApply

        setTimeout(
            function () {
                selectedChoice.classList.remove(classToApply);
                correctAnswer.classList.remove("correct");
                document.getElementById("outer-circle").className = "neutral";
                getNewQuestion();
            }, 2750
        );
        if (availableQuestions.length == 0) {
            return;
        } else {
        setTimeout(
            function () {
                console.log("I am called 4");
                console.log(availableQuestions.length);
                leftLoad.className = "timer left"
                rightLoad.className = "timer right"
            }, 3000
        );
    }});
};

function addScore(num) {
    score += num;
    scoreProgress.innerText = score;
}

/* ----------------- Game End */

let gameResult = document.getElementById("result");

function gameEnd() {
    leftLoad.className = "timer left hide";
    rightLoad.className = "timer right hide";
    question.className = "hide";
    for (let choice of choices) {
        choice.className = "btn answer-choice hide"
    };
    document.getElementById("tally-container").className = "hide";
    gameResult.className = "";
    gameResult.innerHTML = "Your game score is: " + score + " out of " + maxQuestions;
};

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

document.getElementById("give-up").addEventListener("click", function () {
    if (!confirm("Are you sure you want to quit the game and go back to the menu?")) {} else {
        window.location.reload();
    }
});