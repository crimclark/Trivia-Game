const express = require('express')
const router = express.Router()
// const randomWord = require('../lib/randomWord');

router.get('/', (req, res, next) => {
  res.render('index', {title: 'Home'})
})

router.get('/test', (req, res, next) => {
  res.render('test')
})

router.get('/randomWord', (req, res, next) => {
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  var randomWord = [];
  var i = 0;
  while(i < 8){
    var randomNumber = Math.floor(Math.random() * 26);
    var randomLetter = alphabet.charAt(randomNumber);
    randomWord.push(randomLetter);
    i++;
  }
  randomWord = randomWord.join('');
  console.log('I am short word: ' + randomWord);
  res.json(randomWord);
});

module.exports = router
