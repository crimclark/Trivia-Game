const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');
const getQuestion = require('../lib/getQuestion.js');
const answerShuffle = require('../lib/answerShuffle.js')
const Profile = require('../models/userProfiles.js');
const gameRooms = require('../models/gameRooms.js');

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
  // test /game/XIttXxHc
  gameRooms.find({url: fullUrl }, function(err, results) {
    if (err) {
      console.log(err)
    }

    if (results.length === 0) {
      console.log('no game room in db');
      getQuestion(function(data, question) {
        answerShuffle.answerShuffle(data, function(shuffleData) {
          var gameRoom = new gameRooms({
            url: fullUrl,
            activeUsers: 1,
            firstQuestion: {
              question: question,
              answers: shuffleData
            },
            });
          gameRoom.save();
          res.render('game', {question: question, answers: shuffleData});
          })
        })
      }
      else if(results) {
        console.log('game room exists in db')
        gameRooms.find({url: fullUrl}, function(err, results) {
          var hope = results[0].firstQuestion[0]
          console.log(hope)
          console.log(hope.answers)
         res.render('game', {question: hope.question, answers: hope.answers})
        })
      }
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
