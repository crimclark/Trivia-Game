const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');
const getQuestion = require('../lib/getQuestion.js');
const answerShuffle = require('../lib/answerShuffle.js');
const Profile = require('../models/userProfiles.js');
const gameRooms = require('../models/gameRooms.js');

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.render('index', {title: 'trivia | group 3'});
  } else {
    const user = JSON.stringify(req.session.user);
    console.log('req.params ', req.params);
    console.log('req.query ', req.query);

    res.render('new', {title: 'new game'});

  }
});

router.get('/new', (req, res, next) => {
  res.render('new', {title: 'new game'});
});

router.post('/', (req, res, next) => {
  const user = JSON.stringify(req.session.user);
    console.log('req.params ', req.params);
    console.log('req.query ', req.query);
    console.log('req.body.value: ', req.body.value);

    res.render('new', {title: 'new game'});
})

router.get('/question', (req, res, next) => {
  getQuestion(function(data, question) {
    answerShuffle.answerShuffle(data, function(shuffleData) {
      res.send({question: question, answers: shuffleData});
    });
  });
});

router.get('/game/:id', (req, res, next) => {
  var fullUrl = '/game/' + req.params.id;
  // test /game/XIttXxHc
  gameRooms.find({url: fullUrl }, function(err, results) {
    if (err) {
      console.log(err);
    }
    if (results.length === 0) {
      getQuestion('query here', function(data, question) {
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
          res.render('game', {question: question, answers: shuffleData, gameUrl: fullUrl});
          });
        });
      }
      else if(results) {
        gameRooms.find({url: fullUrl}, function(err, results) {
          var formatted_results = results[0].firstQuestion[0];
         res.render('game', {question: formatted_results.question, answers: formatted_results.answers});
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
    res.render('profile', {title: 'player profile', info: userData});
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
    res.render('pubProfData', {title: 'player profile', info: userData});
  });
});

router.get('/browse', (req, res, next) => {
  Profile.find({}, (err, allData) => {
    res.render('browse',  { title: 'browse profiles', profile: allData });
  });
});

router.get('/test', (req, res, next) => {
  res.render('test');
});

module.exports = router
