# WDI Project #03 - Group #3

## Team Members ("TAJJ")
Tim "Nightcrawler" Clark
- Product Owner
- Front-End / Game Logic
- Socket.io

An "Professor X" Nguyen
- Project Board Manager
- CSS/Styling
- Handlebars Templating
- Front-End / Game Logic

Jake "Wolverine" Miller
- Scrum Master
- Front-End / Game Logic
- Back-End / Routing

Justin "Juggernaut" Samuels
- GitHub Manager
- Socket.io
- Back-End / Database & Mongoose

## Overview

Technologies Used: 
- Socket.io
- Mongoose
- Ajax
- jQuery
- HTML
- CSS
- JavaScript
- Handlebars
- Mongo
- Express
- Node.js
- [Google API](https://console.developers.google.com/apis/library)
- [Open Trivia DB API](https://opentdb.com/api_config.php)
- [Skeleton CSS](http://getskeleton.com/)
- Git
- [GitHub](https://github.com/WDI-DTLA-41-Group-3/Trivia-Game)
- Heroku
- [Project Board](https://github.com/WDI-DTLA-41-Group-3/Trivia-Game/projects/2)


User Stories & App Features: 
- [x] When a user visits site for the first time, they will be directed to a login page
- [x] Users will be able to log in via Google oauth with a Gmail account
- [x] After login, the user will be redirected to 'new game' page
- [x] User (Player 1) can create a new game by clicking "Create Game" button
- [x] Creating a new game will generate game url and redirect user to the game room 
- [x] Player 2 can join game room using the game link generated by P1
- [ ] Only two players can join one game room at a time
- [x] Once both players are in the same game room, the game can start
- [x] Users click on the multiple choice buttons to select their answer
- [ ] Each player can only click one time (select one answer) per question
- [x] When the incorrect answer is selected, the button will turn red (for both players)
- [x] When the correct answer is selected, the button will turn green (for both players)
- [x] A new question will render once a question is answered correctly, or 
- [x] A new question will render once both players have made one incorrect guess each
- [ ] When a player answers a question correctly, their score will update on the game page
- [x] After ten trivia questions have been rendered, the game will end
- [ ] Upon game end, a final score page will display both players' scores and the winner
- [ ] When a user visits their 'profile' page, they can view their username, games won, 
    and total games played
- [ ] Users can also update their own username from their 'profile' page
- [ ] Visiting '/___.json' will expose one JSON model
- [ ] ** Authorization middleware prevents users from updating each others' usernames
- [ ] ** Authorization middleware prevents users from deleting each others' profiles
