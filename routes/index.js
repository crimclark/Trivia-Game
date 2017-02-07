const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');
const Profile = require('../models/userProfiles');
const GameRoom = require('../models/gameRooms');

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

router.get('/new', (req, res, next) => {
  res.render('index', {title: 'Index'});
});

router.get('/game/:id', (req, res, next) => {
  var item = {
    itemUrl: req.params.id,
    activeUsers: 1
  }
  var gameRoom = new Mongoose.model('gameRooms', item);
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
