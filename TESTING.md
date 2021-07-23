# Testing and Bugreports

*   [Testing](#testing)
    *   [Category Selection](#category-selection)
    *   [How to play](#how-to-play)
    *   [Timer](#timer)
    *   [Transition](#transition)
    *   [Feedback](#feedback)
    *   [Score and Progress](#score-and-progress)
    *   [Play Game As User](#play-game-as-user)
*   [Bugreports](#bugreports)
    *   [Modal Margin](#modal-margin)
    *   [Sporadic Correct Answer Not Given](#sporadic-correct-answer-not-given)
    *   [Answer To Large For Button](#answer-to-large-for-button)


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

[Back to top](#testing-and-bugreports)

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
    *   Modal being pushed down out of the screen on larger screen sizes. See bugreport: [Modal Margin](#modal-margin).
*   ### Comments
    *   None

[Back to top](#testing-and-bugreports)

##  Timer
*   ### User Expectation
    *   The user expects to known how much time the user has left to answer the question.
*   ### Intention
    *   Via a visual timerbar the user will be informed on how much time the user has left to answer the question. On timer end the question is considered wrong, see feedback, and the game moves on to the next question. The timer should start when the question is fully visibly after collapse animation.
*   ### Test
    *   Check if timer starts when the collapse animation is finished and if the visual bar lines up with the time counter in the javascript.
*   ### Result
    *   Works as intended. Visualisation of the timer lines up correctly to the time counter in the script. Also on time run out, the question is considered wrong and its moving on to the next question.

    ![Timer going and timer end screenshot](https://github.com/Zelhorst92/GeKnoQu/blob/master/testing/timer-plus-timerend.png?raw=true "Timer and timer end screenshot")
*   ### Bugs
    *   None.
*   ### Comments
    *   None.

[Back to top](#testing-and-bugreports)

##  Transition
*   ### User Expectation
    *   The user expects the navigation on the site to be working properly.
*   ### Intention
    *   The start button starts the game. On start the questions are fetched, combined with the selected category.
    *   There should be a good transition between start, the game and the end. This is done via a collapse animation, where the switching on different elements happens behind, out of view of the user.
    *   The restart button during gameplay gives an alert and reloads the page on confirmation so the user can select a category and play again.
    *   The restart button at the end of the game restarts the game by reloading the page, so the user can select a category and play again.
*   ### Test
    *   See if the start button starts the game.
    *   See if the questions are fetched.
    *   See if the collapse animation lines up properly and that the (next) question is loaded during the animation.
*   ### Result
    *   Start button works as intended. Questions are fetcheds as intended.
    *   Collapse animantion works as intended. Next question is loaded during the collapse animation.
    *   Restart button during gameplay gives an alert to confirm restart. And reloads the page on confirmation.
    *   Restart button at the end of the game does reload the page.
*   ### Bugs
    *   None.
*   ### Comments
    *   None.

[Back to top](#testing-and-bugreports)

##  Feedback
*   ### User Expectations
    *   The user expects feedback on if the given answer is correct or wrong.
    *   The user expects the correct answer to be shown.
*   ### Intention
    *   When an answer is given, the user will either see a green colour on the button the user has pressed when the answer is correct or a red colour when the answer is wrong. If wrong, the correct answer will be shown as green after a short while.
    *   There also is a feedback circle surrounding the game. This will change colour the same as the buttons. It will also turn red when the time has run out.
*   ### Test
    *   See if on click of an answer that it turns green or red, correct or incorrect respectively.
    *   See if the correct answer is shown after a wrong answer is given.
    *   See if the feedbackcircle on the edge changes colour respectively.
*   ### Result
    *   On click the button turns green or red if the answer is correct or incorrect respectively. Works as intended.
    *   The correct answer is shown after a wrong answer is given most of the time.
        ![Feedback correct and incorrect screenshot](https://github.com/Zelhorst92/GeKnoQu/blob/master/testing/feedback-test.png?raw=true "Feedback correct and incorrect screenshot")
*   ### Bugs
    *   Feedback to show the correct answer after a wrong answer is given does sporadically not work. See bugreport: [Sporadic Correct Answer Not Given](#sporadic-correct-answer-not-given).
*   ### Comments
    *   None.

[Back to top](#testing-and-bugreports)

##  Score and Progress
*   ### User Expectations
    *   The user expects a score increase upon giving the correct answer.
    *   The user expects to see the users final score on the end of the quiz.
    *   The user expects to see how far along the user is on the quiz.
*   ### Intention
    *   The intention is to show the user what score the user has and how far along the user is in the quiz. This is done via a simple question and score counter in the top of the gamesection. A correct answer increases the score with one point while a wrong answer does not increase score. The progress advances with one on loading a new question.
*   ### Test
    *   See if question counter increases by one upon next question.
    *   See if score counter increases by one upon giving a correct answer.
    *   See if score counter does not increase upon giving an incorrect answer.
    *   See if end score is given correctly on game end.
*   ### Result
    *   All works as intended.
*   ### Bugs
    *   None.
*   ### Comments
    *   None.

##  Play Game As User
*   ### Intention
    *   From start to end the game should work as intended.
        *   Select category.
        *   Start the game and get the appropriate question regarding category choice.
        *   See the users score increase upon playing the game.
        *   See the end result on endscreen.
        *   Restart the game.
*   ### Test
    *   See how the game plays 10 times.
*   ### Result
    *   Game overal works as intended.
    *   Questions are regarding the selected category.
    *   Score and progress add appropriately.
    *   Sometimes the answer does not fit the answerbutton correctly.
    *   End score is shown in the end as well as the restart button.
    *   Restart button reloads the page.
*   ### Bugs
    *   The answer does sporadically not fit inside the choice button on mobile screensize. See bugreport: [Answer To Large For Button](#answer-to-large-for-button)
*   ### Comments
    *   

## Arialabels
*   ### Intention
    *   The arialabels should represent what is the current question, choice options, the current score and the current question number.
    ### Test
    *   Check via the console terminal if the arialabel updates correctly with the changes to question, answers, score, questionnumber and end score message.
    ### Result
    *   Arialabels change accordingly on all fronts.
    ### Bugs
    *   None.
    ### Comments
    *   The arialabel do update for the visually impaired. In such an event, the time given to answer the question might be to short.
    See [Future Features](https://github.com/Zelhorst92/GeKnoQu/blob/master/README.md#future-features "Link to tests and bugs file") in the README.

[Back to top](#testing-and-bugreports)

---

# Bugreports

## Modal Margin
*   ### Bug
    *   Modal being pushed down out of the screen on larger screen sizes.

*   ### Fix
    *   Change the margin of 33%.

*   ### Result
    *   Completely removed the margin of 33%. Works fine without.

*   ### Status
    *   Resolved

[Back to top](#testing-and-bugreports)

## Sporadic Correct Answer Not Given
*   ### Bug
    *   Feedback to show the correct answer after a wrong answer is given does sporadically not work.

*   ### Fix
    *   

*   ### Comments
    *   So far I am unable to determine what causes this to happen, as it is not a recreatable error.

*   ### Conclusion
    *   

*   ### Result
    *   

*   ### Status
    *   Unresolved

[Back to top](#testing-and-bugreports)

## Answer To Large For Button
*   ### Bug
    *   The answer does sporadically not fit inside the choice button on mobile screen sizes.

*   ### Fixes
    *   ~~Make the font-size either smaller. or responsive to size on answer.~~
    *   ~~Make the font-size responsive to the length of the answer to always fit in the button.~~
    *   Make the buttons bigger.
    *   Target the questions with an answer to long to fit in the buttons and change them out for a better fitting one.

    ### Comments
    *   Making the font-size smaller would interfere with the usabilty; it might be to small to read. The font-size at the moment is as small as it should be.
    *   Making the font-size responsive to the length of the answer could work, but would require another script. Also the risk stil remains that the font-size might end up to small for the user to read properly.
    *   Making the buttons bigger would require a redesign of the whole design. Circles do make the real estate to work with significant smaller compared to the use of a more angular choice.

*   ### Conclusion
    *   A redesign or a filtering of the questions based on the answer length would be the way to go.

*   ### Result
    * None.

*   ### Status
    *   Unresolved

[Back to top](#testing-and-bugreports)