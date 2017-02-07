const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Login Page'});
  } else {
    const user = JSON.stringify(req.session.user)
    res.send(`${user}`)
    // res.render(create new game)
  }
});

router.get('/new', (req, res, next) => {
  res.render('new', {title: 'New Game'});
});

router.get('/game/:id', (req, res, next) => {
  console.log(`Im the route: ` + req.params.id)
  res.render('game', {title: 'Question', num: "1"});
});

// router.post('/game', (req, res, next) => {
//   var redirectUrl = '/game/' + req.body.url;
//   console.log(redirectUrl);
//   res.redirect(redirectUrl);
// });

router.get('/score', (req, res, next) => {
  res.render('score', {title: 'Score'});
});

router.get('/user', (req, res, next) => {
  res.render('profile', {title: 'Player Profile'});
});

router.get('/test', (req, res, next) => {
  res.render('test')
});

// router.get('/randomWord', (req, res, next) => {
//   var alphabet = 'abcdefghijklmnopqrstuvwxyz';
//   var randomWord = [];
//   var i = 0;
//   while(i < 8){
//     var randomNumber = Math.floor(Math.random() * 26);
//     var randomLetter = alphabet.charAt(randomNumber);
//     randomWord.push(randomLetter);
//     i++;
//   }
//   randomWord = randomWord.join('');
//   console.log('I am short word: ' + randomWord);
//   res.json(randomWord);
// });

module.exports = router
