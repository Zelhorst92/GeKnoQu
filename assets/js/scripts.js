const selectedCategoryRef = document.querySelector("#category-selector");
const categoryWrapperRef = document.querySelector("#category-wrapper");

const questionRef = document.querySelector("#question");
const startBtnRef = document.querySelector("#start");
const restartBtnRef = document.querySelector("#restart");
const choicesRef = Array.from(document.getElementsByClassName("answer-choice"));

const tallyContainerRef = document.querySelector("#tally-container");
const questionCounterProgressRef = document.querySelector("#question-counter");
const scoreProgressRef = document.querySelector("#score");

const feedbackCircleRef = document.querySelector("#outer-circle");
const leftLoadRef = document.querySelector("#left");
const rightLoadRef = document.querySelector("#right");
const gameCircleRef = document.querySelector("#game-circle");
const gameResultRef = document.querySelector("#result");

const restartDuringRef = document.querySelector("#give-up");

const helpBtn = document.querySelector("#linkHelpModal");
const modalRef = document.querySelector("#helpModal");
const helpRef = document.querySelector("#linkHelpModal");
const closeRef = document.querySelector("#help-exit-btn");

let acceptingStart = false;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

let sec = 0;
let time;

let feedbackClass;

const correctPoint = 1;
const maxQuestions = 10;

// ----------------- Getting category data from opentbd.com API

fetch("https://opentdb.com/api_category.php")
    .then(res => res.json())
    .then((result) => createSelectBox(result.trivia_categories))
    .catch(err => {
        categoryWrapperRef.classList.add("hide");
        startBtnRef.classList.add("hide");
        questionRef.classList.remove("hide");
        questionRef.innerHTML = "An error has occurred getting the category list. Refresh page or try again later!";
        console.error(err);
    });

const createSelectBox = (categories) => {
    for (let category of categories) {
        (selectedCategoryRef.options[selectedCategoryRef.options.length] = new Option(category.name, category.id));
    }
    acceptingStart = true;
};

// ----------------- Start the game

startBtnRef.addEventListener("click", () => {
    if (acceptingStart) {
        acceptingStart = false;
        fetchQuestions();
        questionCounter = 0;
        score = 0;
        setTimeout(
            () => {
                availableQuestions = [...questions];
                getNewQuestion();
            }, 500);
        setTimeout(
            () => {
                categoryWrapperRef.classList.add("hide");
                startBtnRef.classList.add("hide");
                helpBtn.classList.add("hide");
                restartDuringRef.classList.remove("hide");
                tallyContainerRef.classList.remove("hide");
                questionRef.classList.remove("hide");
                for (let choice of choicesRef) {
                    choice.classList.remove("hide");
                }
            }, 1100);
    }
});

// ----------------- Getting question data from opentbd.com API with selected category

const fetchQuestions = () => {
    fetch(`https://opentdb.com/api.php?amount=${maxQuestions}&category=${selectedCategoryRef.value}&type=multiple`)
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
            if (!alert('Something went wrong getting the questions. Redirecting back to start!')) {
                window.location.reload();
            }
        });
};

// ----------------- Collapse animation

const collapseAnimation = () => {
    setTimeout(
        () => {
            gameCircleRef.classList.add("inner-circle-load");
        }, 200
    );
    setTimeout(
        () => {
            gameCircleRef.classList.remove("inner-circle-load");
        }, 2000
    );
};

// ----------------- Get a new question

const getNewQuestion = () => {
    sec = 0;
    feedbackCircleRef.className = "neutral";
    if (availableQuestions.length === 0) {
        collapseAnimation();
        setTimeout(() => {
            gameEnd();
        }, 2000);
    } else {
        collapseAnimation();
        setTimeout(() => {
            const questionIndex = Math.floor(Math.random() * availableQuestions.length);
            currentQuestion = availableQuestions[questionIndex];
            questionRef.innerHTML = currentQuestion.question;
            questionRef.ariaLabel = currentQuestion.question;
            questionCounter++;
            questionCounterProgressRef.innerHTML = questionCounter + "/" + maxQuestions;
            questionCounterProgressRef.ariaLabel = "You are on question " + questionCounter + " out of " + maxQuestions;
            for (let choice of choicesRef) {
                const number = choice.dataset.number;
                choice.innerHTML = currentQuestion["choice" + number];
                choice.ariaLabel = currentQuestion["choice" + number];
            }
            availableQuestions.splice(questionIndex, 1);
        }, 2000);
        setTimeout(() => {
            acceptingAnswers = true;
            checkAnswer();
            startTimerBar();
            time = setInterval(timer, 1000);
        }, 3000);
    }
};

// ----------------- Check answer on click

const checkAnswer = () => {
    const correctAnswerNumber = currentQuestion.answer;
    const correctAnswer = document.querySelector(`[data-number="${correctAnswerNumber}"]`);
    for (let choice of choicesRef) {
        choice.addEventListener("click", (event) => {
            clearInterval(time);
            const selectedChoice = event.target;
            const selectedAnswer = selectedChoice.dataset.number;
            if (!acceptingAnswers) {
                return;
            } else {
                acceptingAnswers = false;
                stopTimerBar();
                if (selectedAnswer == currentQuestion.answer) {
                    feedbackClass = "correct";
                    addScore(correctPoint);
                } else {
                    feedbackClass = "incorrect";
                    setTimeout(() => {
                        correctAnswer.classList.add("correct");
                    }, 500);
                }
                selectedChoice.classList.add(feedbackClass);
                feedbackCircleRef.className = feedbackClass;
                setTimeout(
                    () => {
                        selectedChoice.classList.remove(feedbackClass);
                        correctAnswer.classList.remove("correct");
                        getNewQuestion();
                    }, 2750
                );
            }
        });
    }
};

// ----------------- Add score point

const addScore = (num) => {
    score += num;
    scoreProgressRef.innerText = score;
    scoreProgressRef.ariaLabel = "Your score is " + score;
};

// ----------------- Game End

const gameEnd = () => {

    questionRef.classList.add("hide");
    for (let choice of choicesRef) {
        choice.classList.add("hide");
    }
    restartDuringRef.classList.add("hide");
    tallyContainerRef.classList.add("hide");
    gameResultRef.classList.remove("hide");
    gameResultRef.innerHTML =
        `<p>Your game score is:</p>
        <p> ${score} out of ${maxQuestions}</p>`;
    gameResultRef.ariaLabel = "Your game score is " + score + " out of " + maxQuestions;
    restartBtnRef.classList.remove("hide");
};

// ----------------- time counter script

const timer = () => {
    sec++;
    if (sec === 15) {
        clearInterval(time);
        acceptingAnswers = false;
        feedbackClass = "incorrect";
        stopTimerBar();
        feedbackCircleRef.className = feedbackClass;
        setTimeout(() => {
            getNewQuestion();
        }, 3000);
    }
};

// ----------------- Timer bar stop (hide) 

const stopTimerBar = () => {
    leftLoadRef.classList.add("hide");
    rightLoadRef.classList.add("hide");
};

// ----------------- Timer bar start (show) 

const startTimerBar = () => {
    leftLoadRef.classList.remove("hide");
    rightLoadRef.classList.remove("hide");
};

// ----------------- Modal Help Script

helpRef.onclick = () => {
    modalRef.style.display = "block";
};

closeRef.onclick = () => {
    modalRef.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == modalRef) {
        modalRef.style.display = "none";
    }
};

// ----------------- Restart Script
const restartFunction = () => {
    if (!confirm("Are you sure you want to quit the game and go back to the menu?")) {} else {
        window.location.reload();
    }
};

restartDuringRef.addEventListener("click", restartFunction);

restartBtnRef.addEventListener("click", () => {
    window.location.reload();
});