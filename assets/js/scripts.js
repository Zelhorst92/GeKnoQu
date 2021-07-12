const selectedCategoryRef = document.querySelector("#category-selector");
const categoryId = selectedCategoryRef.value;

const questionRef = document.querySelector("#question");
const choices = Array.from(document.getElementsByClassName("answer-choice"));
const questionCounterProgress = document.querySelector("#question-counter");
const scoreProgress = document.querySelector("#score");
const feedbackCircle = document.querySelector("#outer-circle");
const leftLoad = document.querySelector("#left");
const rightLoad = document.querySelector("#right");
const gameCircle = document.querySelector("#game-circle");
const gameResultRef = document.querySelector("#result");

const modal = document.querySelector("#helpModal");
const help = document.querySelector("#linkHelpModal");
const close = document.querySelector("#helpExit")

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

let classToApply;

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

document.querySelector("#start").addEventListener("click", startGame = () => {
    if (questions.length === 0) {
        console.log("Number of questions in the array: " + questions.length)
        console.log("Questions array is empty, fetching questions...")
        fetchQuestions();
        setTimeout(
            () => {
                startGame();
            }, 250
        );
    } else {
        console.log("Questions array has questions!")
        questionCounter = 0;
        score = 0;
        console.log("Moving questions from questions-array to available-questions-array...")
        availableQuestions = [...questions];
        console.log("Printing availablequestions...")
        console.log(availableQuestions);
        getNewQuestion();
    }
});

/* ----------------- Getting question data from opentbd.com API with selected category*/

const fetchQuestions = () => {
    console.log("Executing fetchQuestions...")
    fetch(`https://opentdb.com/api.php?amount=4&category=${categoryId}&type=multiple`)
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
        () => {
            gameCircle.className += " inner-circle-load";
            document.querySelector("#category-container").className += " hide";
            document.querySelector("#start").className += " hide";
            document.querySelector("#linkHelpModal").className += " hide"
            document.querySelector("#give-up").className = "btn-bottom";
        }, 200
    );
    setTimeout(
        () => {
            gameCircle.className = "inner-circle";
            document.querySelector("#tally-container").className = "";
            questionRef.className = "";
            for (let choice of choices) {
                choice.className = "btn answer-choice";
            }
        }, 2000
    )
};

/* ----------------- Get a new question */

const getNewQuestion = () => {
    feedbackCircle.className = "neutral";
    if (availableQuestions.length === 0) {
        console.log("No more questions.")
        collapseAnimation();
        setTimeout(() => {
            gameEnd();
        }, 2000);
    } else {
        console.log("Presenting new question...")
        collapseAnimation();
        setTimeout(() => {
                const questionIndex = Math.floor(Math.random() * availableQuestions.length);
                currentQuestion = availableQuestions[questionIndex];
                questionRef.innerHTML = currentQuestion.question;
                questionCounter++;
                questionCounterProgress.innerHTML = questionCounter + "/" + maxQuestions;
                for (let choice of choices) {
                    const number = choice.dataset["number"];
                    choice.innerHTML = currentQuestion["choice" + number];
                };
                availableQuestions.splice(questionIndex, 1);
            }, 2000
        );
        setTimeout(() => {
                acceptingAnswers = true;
                checkAnswer();
                startTimerBar();
            }, 3000
        );
    };
};

/* ----------------- Check answer on click */

const checkAnswer = () => {
    const correctAnswerNumber = currentQuestion.answer;
    const correctAnswer = document.querySelector(`[data-number="${correctAnswerNumber}"]`);
    for (let choice of choices) {
        choice.addEventListener("click", (event) => {
            const selectedChoice = event.target;
            const selectedAnswer = selectedChoice.dataset["number"];
            if (!acceptingAnswers) {
                return;
            } else {
                acceptingAnswers = false;
                stopTimerBar();
                if (selectedAnswer == currentQuestion.answer) {
                    classToApply = "correct";
                    addScore(correctPoint);
                    console.log("correct answer given!")
                } else {
                    classToApply = "incorrect";
                    console.log("Incorrect answer given!")
                    setTimeout(() => {
                        correctAnswer.classList.add("correct");
                        console.log("Showing correct answer")
                    }, 500)
                };
                selectedChoice.classList.add(classToApply);
                feedbackCircle.className = classToApply
                setTimeout(
                    () => {
                        selectedChoice.classList.remove(classToApply);
                        correctAnswer.classList.remove("correct");
                        getNewQuestion();
                    }, 2750
                );
            };
        });
    };
};

/* ----------------- Add score point*/

const addScore = (num) => {
    score += num;
    scoreProgress.innerText = score;
};

/* ----------------- Game End */

const gameEnd = () => {

    questionRef.className = "hide";
    for (let choice of choices) {
        choice.className = "btn answer-choice hide"
    };
    document.querySelector("#tally-container").className = "hide";
    console.log("Showing game score..")
    gameResultRef.className = "";
    gameResultRef.innerHTML = "Your game score is: " + score + " out of " + maxQuestions;
};

/* ----------------- Timer bar stop (hide) */

const stopTimerBar = () => {
    leftLoad.className = "timer left hide";
    rightLoad.className = "timer right hide";
};

/* ----------------- Timer bar start (show) */

const startTimerBar = () => {
    leftLoad.className = "timer left";
    rightLoad.className = "timer right";
};

/* ----------------- Modal Help Script */

help.onclick = () => {
    modal.style.display = "block";
}

close.onclick = () => {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* ----------------- Restart Script */

document.querySelector("#give-up").addEventListener("click", () => {
    if (!confirm("Are you sure you want to quit the game and go back to the menu?")) {} else {
        window.location.reload();
    }
});