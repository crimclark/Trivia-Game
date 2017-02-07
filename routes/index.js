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
  res.render('new', {title: 'New Game'});
});

router.get('/game/:id', (req, res, next) => {
  console.log(req.params);
  var fullUrl = '/game/' + req.params.id;
  var gameRoom = new GameRoom({
    url: fullUrl,
    activeUsers: 1,
  });
  gameRoom.save();
  res.render('game', {title: 'Question', num: "1"});
});

router.get('/score', (req, res, next) => {
  res.render('score', {title: 'Score'});
});

router.get('/user', (req, res, next) => {
  var userId = req.session.user.id;
  Profile.findOne({_id: userId}, (err, userData) => {
    res.render('profile', {title: 'Player Profile', info: userData});
  });
});

router.get('/test', (req, res, next) => {
  res.render('test')
});

module.exports = router
