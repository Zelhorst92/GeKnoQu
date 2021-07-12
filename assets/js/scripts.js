const selectedCategoryRef = document.getElementById("category-selector");
const categoryIdRef = document.getElementById("category-selector");

const questionRef = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("answer-choice"));
const questionCounterProgress = document.getElementById("question-counter");
const scoreProgress = document.getElementById("score");
const feedbackCircle = document.getElementById("outer-circle");
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

/* ----------------- Getting category data from opentbd.com API */

const getCategories = fetch("https://opentdb.com/api_category.php")
    .then(res => res.json())
    .then((result) => createSelectBox(result.trivia_categories))
    .catch(err => {
        console.error(err)
    });

const createSelectBox = (categories) => {
    for (let category of categories) {
        (selectedCategoryRef.options[selectedCategoryRef.options.length] = new Option(category.name, category.id)); /* Create an option list for the category selector */
    };
};

/* ----------------- Start the game */

document.getElementById("start").addEventListener("click", function startGame() {
    if (questions.length === 0) {
        console.log("Number of questions in the array: " + questions.length)
        console.log("Questions array is empty, fetching questions...")
        fetchQuestions();
        setTimeout(
            function () {
                startGame();
            }, 250
        );
    } else {
        console.log("Questions array has questions!")
        questionCounter = 0;
        score = 0;
        console.log("Moving 'fetched' questions from questions-array to available-questions-array...")
        availableQuestions = [...questions];
        console.log("Printing availablequestions...")
        console.log(availableQuestions);
        collapseAnimation();
        getNewQuestion();
    }
});

/* ----------------- Getting question data from opentbd.com API with selected category*/

const fetchQuestions = () => {
    console.log("Executing fetchQuestions...")
    fetch(`https://opentdb.com/api.php?amount=4&category=${categoryIdRef.value}&type=multiple`)
        .then(res => res.json())
        .then((data) => {
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
                return formattedQuestions;
            });
        })
        .catch(err => {
            console.error(err)
        });
};

/* ----------------- Collapse animation*/

const collapseAnimation = () => {
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
            questionRef.className = "";
            for (let choice of choices) {
                choice.className = "btn answer-choice";
            }
        }, 1500
    )
};

/* ----------------- Get a new question */

function getNewQuestion() {
    if (availableQuestions.length === 0) {
        gameEnd();
    } else {
        setTimeout(
            function () {
                startTimerBar();
            }, 4000
        );
        questionCounter++;
        questionCounterProgress.innerHTML = questionCounter + "/" + maxQuestions;

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        questionRef.innerHTML = currentQuestion.question;

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
            stopTimerBar();
        } else {
            classToApply = "incorrect";
            stopTimerBar();
            setTimeout(function () {
                correctAnswer.classList.add("correct");
            }, 500)

        };

        selectedChoice.classList.add(classToApply);
        feedbackCircle.className = classToApply

        setTimeout(
            function () {
                selectedChoice.classList.remove(classToApply);
                correctAnswer.classList.remove("correct");
                feedbackCircle.className = "neutral";
                getNewQuestion();
            }, 2750
        );
        if (availableQuestions.length === 0) {
            return;
        } else {
            setTimeout(
                function () {
                    console.log("I am called 4");
                    console.log(availableQuestions.length);
                    startTimerBar();
                }, 3250
            );
        }
    });
};

/* ----------------- Add score point*/

function addScore(num) {
    score += num;
    scoreProgress.innerText = score;
};

/* ----------------- Game End */

let gameResult = document.getElementById("result");

function gameEnd() {
    stopTimerBar();
    questionRef.className = "hide";
    for (let choice of choices) {
        choice.className = "btn answer-choice hide"
    };
    document.getElementById("tally-container").className = "hide";
    gameResult.className = "";
    gameResult.innerHTML = "Your game score is: " + score + " out of " + maxQuestions;
};

/* ----------------- Timer bar stop (hide) */

function stopTimerBar() {
    leftLoad.className = "timer left hide";
    rightLoad.className = "timer right hide";
};

/* ----------------- Timer bar start (show) */

function startTimerBar() {
    leftLoad.className = "timer left";
    rightLoad.className = "timer right";
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