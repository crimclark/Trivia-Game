const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Login Page'});
  } else {
    const user = JSON.stringify(req.session.user)
    // res.send(`${user}`)
    res.render('new', {title: 'New Game'});
    // res.render(create new game)
  }
});

// router.get('/new', (req, res, next) => {
// });

router.get('/game', (req, res, next) => {
  res.render('game', {title: 'Question', num: "1"});
});

router.get('/score', (req, res, next) => {
  res.render('score', {title: 'Score'});
});

router.get('/user', (req, res, next) => {
  res.render('profile', {title: 'Player Profile'});
});

router.get('/test', (req, res, next) => {
  res.render('test')
});

module.exports = router
