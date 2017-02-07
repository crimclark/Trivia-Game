const express = require('express')
const router = express.Router()
// const randomWord = require('../lib/randomWord');

router.get('/', (req, res, next) => {
  res.render('index', {title: 'Home'})
})

router.get('/test', (req, res, next) => {
  res.render('test')
})

// router.get('/randomWord', (req, res, next) => {
//   var myWord = randomWord();
//   console.log('I am a random word: ' + myWord);
//   res.json();
// });

module.exports = router
