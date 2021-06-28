# Table of Content
- [User Experience](#user-experience)
  * [Site Owner Goal](#site-owner-goal)
  * [User Goals](#user-goals)
  * [User Stories](#user-stories)
  * [User Requirements](#user-requirements)
  * [User Expectations](#user-expectations)
  * [Design Choices](#design-choices)
  * [Wireframes](#wireframes)
- [Features](#features)
  * [Existing Features](#existing-features)
  * [Future Features](#future-features)
- [Technologies](#technologies)
  * [Languages](#languages)
  * [Libraries and Tools](#libraries-and-tools)
- [Testing](#testing)
- [Deployment](#deployment)
  * [Deployment via GitHub Pages](#deployment-via-github-pages)
  * [Deployment of the website locally:](#deployment-of-the-website-locally-)
- [Credits](#credits)
  * [Overall](#overall)
  * [Content](#content)
  * [Images](#images)
  * [Code](#code)
- [Thanks](#thanks)

# User Experience
## Site Owner Goal 
* Having users to play a small game of a multiple choice quiz, on a broad scale of subjects.
* For users to have fun and learn something at the same time.
* 

---

## User Goals
* A website where you can play a multiple choice quiz game.
* A website that is easy to use on and has good responsiveness on all screen sizes.
* An explanation on how to play the game and if there are any rules to it.
* In game:
    * To see whether a given answer is correct or wrong.
    * To see how many answers were answered correctly.
    * To see how many questions are there still to go/on which question out of total amount of questions the user is.
    * To see the score.

---

## User Stories
As a user;
* I want a website which is easy and intuitively to use.
* I want to see what the website is about at first glance. 
* I want a website that works on all screen sizes.
* I want to know how to play the game.
* I want to select the category of the questions.
* I want to see how much time I have left to anser the question.
* I want to know if an answer is correct or wrong.
* I want to know how far along I am on the questionaire/quiz.
* I want to my see my score.
* I want to play the game again.

[Back to top](#table-of-content)

---

## User Requirements
* Intuitively know how to start the game or to see how to play the game.
* Able to select the category of questions.
* A time indicator.
* Feedback on whether a question is correct or wrong.

---

## User Expectations
User expects: 
* the navigation on the site to be working properly.
* to be able to select a category.
* to known how much time the user has left to answer the question.
* feedback on if the given answer is correct or wrong.
* the correct answer to be shown.
* upon giving the correct answer that it increases to score. 
* to see the users final score on the end of the quiz.

[Back to top](#table-of-content)

---

## Design Choices
The goal of this site is that users can play a quiz/questionaire game. Therefore the user should immediately see the way to start to game or to see how to.

### The structure
For the structure of the website I will use the framework [Bootstrap](https://getbootstrap.com/ "Link to bootstrap").
This framework allows for a proper responsive website which is build up from a mobile-first perspective.
The grid-system that Bootstrap provides is very usefull to have a well working responsive website.
Furthermore Bootstrap has a wide browser compatibility, is quite easy to use and is very customizable.

### Fonts
During the quiz there will be a time restraint, therefore a simple but well readable font is necessary.
I will be using a font from [Google Fonts](https://fonts.google.com/ "Google Fonts"), specifically the [Teko Font](https://fonts.google.com/specimen/Teko "Teko Font").
An easy to read, compact, professional looking font.

---

# Technologies
## Languages
*   [HTML](https://en.wikipedia.org/wiki/HTML "Link to the HTML wikipedia page")
*   [CSS](https://en.wikipedia.org/wiki/CSS "Link to the CSS wikipedia page")
*   [JavaScript](https://en.wikipedia.org/wiki/JavaScript "Link to the JavaScript wikipedia page")

## Libraries and Tools
### Libraries & Frameworks
*   [Bootstrap](https://getbootstrap.com/ "Link to bootstrap")
*   [Fontawsome](https://fontawesome.com/ "Link to fontawesome") 
*   [Googlefonts](https://fonts.google.com/ "Link to googlefonts") 

### Tools
*   [Gitpod](https://www.gitpod.io/ "Link to gitpod")
*   [Github](https://github.com/ "Link to github")
*   [Git](https://git-scm.com/ "Link to git")
*   [Tinypng](https://tinypng.com/ "Link to tinypng") 
*   [Balsamiq Wireframes](https://balsamiq.com/wireframes/ "Link to balsamiq wireframes")
*   [W3C Css-validator](https://jigsaw.w3.org/css-validator/ "Link to the w3 css validator")
*   [W3C Markup-validator](https://validator.w3.org/ "Link to w3c markup validator")
*   [Techsini](http://techsini.com/ "techsini.com")

[Back to top](#table-of-content)

---

# Testing
This is done in a seperate file:

[TESTING.md](https://github.com/Zelhorst92/GeKnoQu/blob/master/TESTING.md "Link to tests and bugs file")

---

# Deployment
## Deployment via GitHub Pages
The website was deployed via GitHub by following the steps below:
-   Go to the repository you want to deply on github.
-   Click on the **Settings** tab
-   Go to **Pages** on the left side navigation
-   In the **Source** section, there is a dropdown menu; select the **master** branch and **root**. Click **save**.
-   Within a short moment the website is live.
    You will see a link on the top of the GitHub Pages section, either in a blue or green field.
    -   Example on how the **link** will look like and coincidently the link to the current website: [https://zelhorst92.github.io/GeKnoQu/](https://zelhorst92.github.io/GeKnoQu/ "Link to the deployed website")
-   Any time you will push to Github, the update will be visible after a short while.

## Deployment of the website locally:
-   Click on the dropdown menu which says **Code** on the Github Repository.
-   You will see several options; 
    -   **Clone with a link**, 
    -   **Open with GitHub Desktop** 
    -   **download ZIP**

#### Clone with a link
-   When you want to clone; use the **Clone with HTTPS option**, copy the link displayed.
-   Open your IDE and go to the terminal.
-   Change the working directory to the location where the cloned directory is to go.
-   Use the **git clone** command and paste the url copied in the second step.

#### Open with GitHub Desktop
-   If you have GitHub Desktop installed, you can click on this and it will import and clone the repository for you, after selecting where it needs to go.

#### Download the ZIP
-   You can also download the whole repository in a zip file and use the IDE software you want.

[Back to top](#table-of-content)

---