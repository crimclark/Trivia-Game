const entities = require('html-entities').AllHtmlEntities;

var question = '';

var answerShuffle = function(obj, callback) {
  question = obj.question;

  var answersArray = [];

  obj.incorrect_answers.forEach(function (answer){
    var answerObj = {};
    var decodedIncorrect = entities.decode(answer);
    answerObj.answer = decodedIncorrect;
    answerObj.correct = false;
    answersArray.push(answerObj);
  })

  var decodedCorrect = entities.decode(obj.correct_answer);

  var correctAnsObj = {
    answer: decodedCorrect,
    correct: true
  }

  function randomIndex() {
    return Math.floor(Math.random() * 4);
  }

  var i = randomIndex();
  answersArray.splice(i, 0, correctAnsObj);

  callback(answersArray);
}

module.exports = answerShuffle;

module.exports = {
  answerShuffle: answerShuffle,
  question: question
}
