# Testing and Bugreports

*   [Testing](#testing)
    *   [Category Selection](#category-selection)
    *   [How to play](#how-to-play)
    *   [Timer](#timer)
    *   [Transition](#transition)
    *   [Feedback](#feedback)
    *   [Score and Progress](#score-and-progress)
*   [Bugreports](#bugreports)
    *   [](#)


# Testing

##  Category Selection
*   ### User Expectation
    *   The user expects to be able to select a category.
*   ### Intention
    *   A dropdown menu where the user can select the desired category regarding the questions of the quiz. The categories shown should be the same as the categories offered on [opentdb](https://opentdb.com/).
*   ### Test
    *   The category selector will be looked at at multiple devices if works.
    *   The categories shown in the dropdown menu will be compared to the categories given on [opentdb](https://opentdb.com/).

    *   The questions will be looked at if the selected category will affect the questions presented.
*   ### Result
    *   The category selector works on all tested screen/sizes. Tested devices are: Sony Experia XZ, Ipad, Asus laptop and a Desktop.
    *   All categories given on [opentdb](https://opentdb.com/) are also shown in the categoryselector. Therefore the categories are fetched correctly.

    ![Category comparison](https://github.com/Zelhorst92/GeKnoQu/blob/master/testing/categories-comparison.png?raw=true "Category comparison screenshot")
    *   The questions after category selection do resemble the selected category. In the example below the category sport has been selected and in the console you can see that the questions resemble sports-questions.
    
    ![Category select relative to questions](https://github.com/Zelhorst92/GeKnoQu/blob/master/testing/category-select-result.png?raw=true "Category select relative to questions screenshot")
*   ### Bugs
    *   None
*   ### Comments
    *   None

##  How to play
*   ### User Expectation
    *   The user expects to find on how to play the game.
*   ### Intention
    *   The intention is to have a button which will open a modal on click showing the basics on to how to play the game and the game rules.
*   ### Test
    *   Click on the button to open the modal and click on the back button or next the modal to exit the modal.
*   ### Result
    * Works as intended, with the execption of screensize larger then 768px wide. Margin top is set to 33% on screens larger then 768px width, which causes the modal to be pushed down out of the screen on large screens.
*   ### Bugs
    *   Modal being pushed down out of the screen on larger screen sizes. See [Modal Margin](#modal-margin).
*   ### Comments
    *   None

##  Timer
*   ### User Expectation
    *   The user expects to known how much time the user has left to answer the question.
*   ### Intention
    *   Via a visual timerbar the user will be informed on how much time the user has left to answer the question. On timer end the question is considered wrong, see feedback, and the game moves on to the next question.
*   ### Test
*   ### Result
*   ### Bugs
*   ### Comments

##  Transition
*   ### User Expectation
    *   The user expects the navigation on the site to be working properly.
*   ### Intention
    *   There should be a good transition between start, the game and the end. This is done via a collapse animation, where the switching on different elements happens behind, out of view of the user.
*   ### Test
*   ### Result
*   ### Bugs
*   ### Comments

##  Feedback
*   ### User Expectations
    *   The user expects feedback on if the given answer is correct or wrong.
    *   The user expects the correct answer to be shown.
*   ### Intention
    *   When an answer is given, the user will either see a green colour on the button the user has pressed when the answer is correct or a red colour when the answer is wrong. If wrong, the correct answer will be shown as green after a short while.
    *   There also is a feedback circle surrounding the game. This will change colour the same as the buttons. It will also turn red when the time has run out.
*   ### Test
*   ### Result
*   ### Bugs
*   ### Comments

##  Score and Progress
*   ### User Expectations
    *   The user expects a score increase upon giving the correct answer.
    *   The user expects to see the users final score on the end of the quiz.
    *   The user expects to see how far along the user is on the quiz.
*   ### Intention
    *   The intention is to show the user what score the user has and how far along the user is in the quiz. This is done via a simple question and score counter in the top of the gamesection. A good answer increases the score with one point while a wrong answer does not increase score. The progress advances with one on loading a new question.
*   ### Test
*   ### Result
*   ### Bugs
*   ### Comments

[Back to top](#testing-and-bugreports)

---

# Bugreports

## Modal Margin
*   ### Bug
    *   The phonenumberfield can contain any number between 0 and infinity.

*   ### Fix
    *   Change input type to tel and give it a pattern value of 8 to 10 character of only numbers.

*   ### Result
    *   Only numbers between 8 to 10 digits can now be submitted.

*   ### Status
    *   Resolved

[Back to top](#testing-and-bugreports)