const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');
const getQuestion = require('../lib/getQuestion.js');
const answerShuffle = require('../lib/answerShuffle.js');
const Profile = require('../models/userProfiles.js');
const gameRooms = require('../models/gameRooms.js');

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'Login Page'});
  } else {
    const user = JSON.stringify(req.session.user);
    res.render('new', {title: 'New Game'});
  }
});

router.get('/new', (req, res, next) => {
  res.render('new', {title: 'New Game'});
});

router.get('/question', (req, res, next) => {
  getQuestion(function(data, question) {
    answerShuffle.answerShuffle(data, function(shuffleData) {
      res.send({question: question, answers: shuffleData});
    });
  });
});

function getUsername(id, callback) {
  Profile.findById(id, function(err, results){
    callback(results.name);
  })
}

router.get('/game/:id', (req, res, next) => {
  var fullUrl = '/game/' + req.params.id;
  // test /game/XIttXxHc
  gameRooms.find({url: fullUrl }, function(err, results) {
    if (err) {
      console.log(err);
    }
    if (results.length === 0) {
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
          getUsername(req.session.user.id, function(name){
            console.log('name is ' + name);
            res.render('game', {question: question, answers: shuffleData, gameUrl: fullUrl, name: name});
          })
          });
        });
      }
      else if(results) {
        gameRooms.find({url: fullUrl}, function(err, results) {
          var formatted_results = results[0].firstQuestion[0];
            getUsername(req.session.user.id, function(name){
              console.log('name is ' + name);
              res.render('game', {question: formatted_results.question, answers: formatted_results.answers, name: "Guest"});
            })
        });
      }
    });
});


router.get('/join', (req, res, next) => {
  gameRooms.find({activeUsers: 1}, (err, allRooms) => {
    var rand = Math.floor(Math.random() * allRooms.length);
    var joinUrl = allRooms[rand].url;
    gameRooms.update({url: joinUrl}, { $inc: { activeUsers: 1 }},(err, userData) => {
      res.redirect(joinUrl);
    });
  });
});

router.delete('/game/:id', (req, res, next) => {
  var fullUrl = '/game/' + req.params.id;
  gameRooms.findOneAndRemove({url: fullUrl}, function(err) {
    if (err) {
      console.log(err);
    }
  });
});

router.get('/user', (req, res, next) => {
  var userId = req.session.user.id;
  Profile.findOne({_id: userId}, (err, userData) => {
    res.render('profile', {title: 'Player Profile', info: userData});
  });
});

router.get('/user.json', (req, res, next) => {
  Profile.find({}, 'name avatar score.gamesWon score.gamesPlayed', function(err, userData) {
    res.send(userData);
  });
});

router.post('/user', (req, res, next) => {
  var userId = req.session.user.id;
  Profile.update({_id: userId}, { $set: { name: req.body.newName }},(err, userData) => {
  res.redirect('/user');
  });
});

router.get('/user/:id', (req, res, next) => {
  var userId = req.params.id;
  Profile.findOne({_id: userId}, (err, userData) => {
    res.render('pubProfData', {title: 'Player Profile', info: userData});
  });
});

router.get('/browse', (req, res, next) => {
  Profile.find({}, (err, allData) => {
    res.render('browse',  { title: 'Browse Profiles', profile: allData });
  });
});

router.get('/test', (req, res, next) => {
  res.render('test');
});

module.exports = router
