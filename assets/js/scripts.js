const selectedCategoryRef = document.querySelector("#category-selector");

const questionRef = document.querySelector("#question");
const choicesRef = Array.from(document.getElementsByClassName("answer-choice"));
const questionCounterProgressRef = document.querySelector("#question-counter");
const scoreProgressRef = document.querySelector("#score");
const feedbackCircleRef = document.querySelector("#outer-circle");
const leftLoadRef = document.querySelector("#left");
const rightLoadRef = document.querySelector("#right");
const gameCircleRef = document.querySelector("#game-circle");
const gameResultRef = document.querySelector("#result");

const modalRef = document.querySelector("#helpModal");
const helpRef = document.querySelector("#linkHelpModal");
const closeRef = document.querySelector("#helpExit")

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

let sec = 0;
let time;

let classToApply;

const correctPoint = 1;
const maxQuestions = 20;

// ----------------- Getting category data from opentbd.com API

const getCategories = fetch("https://opentdb.com/api_category.php")
    .then(res => res.json())
    .then((result) => createSelectBox(result.trivia_categories))
    .catch(err => {
        console.error(err)
    });

const createSelectBox = (categories) => {
    for (let category of categories) {
        (selectedCategoryRef.options[selectedCategoryRef.options.length] = new Option(category.name, category.id));
    };
};

// ----------------- Start the game

document.querySelector("#start").addEventListener("click", startGame = () => {
    if (questions.length === 0) {
        console.log("Number of questions in the array: " + questions.length);
        console.log("Questions array is empty, fetching questions...");
        fetchQuestions();
        setTimeout(
            () => {
                startGame();
            }, 250
        );
    } else {
        console.log("Questions array has questions!");
        questionCounter = 0;
        score = 0;
        console.log("Moving questions from questions-array to available-questions-array...");
        availableQuestions = [...questions];
        console.log("Printing availablequestions...");
        console.log(availableQuestions);
        getNewQuestion();
    }
});

// ----------------- Getting question data from opentbd.com API with selected category

const fetchQuestions = () => {
    console.log("Executing fetchQuestions...")
    fetch(`https://opentdb.com/api.php?amount=2&category=${selectedCategoryRef.value}&type=multiple`)
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
            console.error(err);
        });
};

// ----------------- Collapse animation

const collapseAnimation = () => {
    setTimeout(
        () => {
            gameCircleRef.className += " inner-circle-load";
            document.querySelector("#category-container").className += " hide";
            document.querySelector("#start").className += " hide";
            document.querySelector("#linkHelpModal").className += " hide";
            document.querySelector("#give-up").className = "btn-bottom";
        }, 200
    );
    setTimeout(
        () => {
            gameCircleRef.className = "inner-circle";
            document.querySelector("#tally-container").className = "";
            questionRef.className = "";
            for (let choice of choicesRef) {
                choice.className = "btn answer-choice";
            };
        }, 2000
    );
};

// ----------------- Get a new question

const getNewQuestion = () => {
    sec = 0;
    console.log("getNewQuestion function is being executed");
    feedbackCircleRef.className = "neutral";
    if (availableQuestions.length === 0) {
        console.log("No more questions.");
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
            questionCounterProgressRef.innerHTML = questionCounter + "/" + maxQuestions;
            for (let choice of choicesRef) {
                const number = choice.dataset["number"];
                choice.innerHTML = currentQuestion["choice" + number];
            };
            availableQuestions.splice(questionIndex, 1);
        }, 2000);
        setTimeout(() => {
            acceptingAnswers = true;
            checkAnswer();
            startTimerBar();
            time = setInterval(timer, 1000);
        }, 3000);
    };
};

// ----------------- Check answer on click

const checkAnswer = () => {
    const correctAnswerNumber = currentQuestion.answer;
    const correctAnswer = document.querySelector(`[data-number="${correctAnswerNumber}"]`);
    for (let choice of choicesRef) {
        choice.addEventListener("click", (event) => {
            clearInterval(time);
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
                    console.log("correct answer given!");
                } else {
                    classToApply = "incorrect";
                    console.log("Incorrect answer given!");
                    setTimeout(() => {
                        correctAnswer.classList.add("correct");
                        console.log("Showing correct answer");
                    }, 500);
                };
                selectedChoice.classList.add(classToApply);
                feedbackCircleRef.className = classToApply;
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

// ----------------- Add score point

const addScore = (num) => {
    score += num;
    scoreProgressRef.innerText = score;
};

// ----------------- Game End

const gameEnd = () => {

    questionRef.className = "hide";
    for (let choice of choicesRef) {
        choice.className = "btn answer-choice hide";
    };
    document.querySelector("#give-up").className = "hide"
    document.querySelector("#tally-container").className = "hide";
    console.log("Showing game score..");
    gameResultRef.className = "";
    gameResultRef.innerHTML =
        `<p>Your game score is:</p>
        <p> ${score} out of ${maxQuestions}</p>`;
    document.querySelector("#restart").className = "btn btn-start";
};

// -------------------------------------------- Timer
// ----------------- time counter script

const timer = () => {
    sec++;
    console.log(sec);
    if (sec === 15) {
        clearInterval(time);
        acceptingAnswers = false;
        classToApply = "incorrect";
        stopTimerBar();
        feedbackCircleRef.className = classToApply;
        console.log("Time is up!");
        setTimeout(() => {
            getNewQuestion();
        }, 3000);
    };
};

// ----------------- Timer bar stop (hide) 

const stopTimerBar = () => {
    leftLoadRef.className = "timer left hide";
    rightLoadRef.className = "timer right hide";
};

// ----------------- Timer bar start (show) 

const startTimerBar = () => {
    leftLoadRef.className = "timer left";
    rightLoadRef.className = "timer right";
};

// ----------------- Modal Help Script

helpRef.onclick = () => {
    modalRef.style.display = "block";
}

closeRef.onclick = () => {
    modalRef.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) {
        modalRef.style.display = "none";
    }
}

// ----------------- Restart Script

document.querySelector("#give-up").addEventListener("click", restartFunc = () => {
    if (!confirm("Are you sure you want to quit the game and go back to the menu?")) {} else {
        window.location.reload();
    }
});
document.querySelector("#restart").addEventListener("click", restartFunc);