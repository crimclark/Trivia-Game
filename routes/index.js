const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');
const getQuestion = require('../lib/getQuestion.js');
const answerShuffle = require('../lib/answerShuffle.js')
const Profile = require('../models/userProfiles');
const GameRoom = require('../models/gameRooms');

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Login Page'});
  } else {
    const user = JSON.stringify(req.session.user)
    res.render('new', {title: 'New Game'});
  }
});

router.get('/new', (req, res, next) => {
  res.render('new', {title: 'New Game'});
});

router.get('/game/:id', (req, res, next) => {
  var fullUrl = '/game/' + req.params.id;
  var gameRoom = new GameRoom({
    url: fullUrl,
    activeUsers: 1,
    // *bug*
  });
  gameRoom.save();
  getQuestion(function(data, question) {
    answerShuffle.answerShuffle(data, function(shuffleData) {
      res.render('game', {question: question, answers: shuffleData});
    })
  })
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
