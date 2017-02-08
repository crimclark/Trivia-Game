var question = '';

var answerShuffle = function(obj, callback) {
  question = obj.question;

  var answersArray = [];

obj.incorrect_answers.forEach(function (answer){
  var answerObj = {};
  answerObj.answer = answer;
  answerObj.correct = false;
  answersArray.push(answerObj);
})

var correctAnsObj = {
  answer: obj.correct_answer,
  correct: true
}


function randomIndex() {
  return Math.floor(Math.random() * 4);
}

var i = randomIndex();
console.log(i);
// console.log(i);
answersArray.splice(i, 0, correctAnsObj);

callback(answersArray);
}

module.exports = answerShuffle;

module.exports = {
  answerShuffle: answerShuffle,
  question: question
}
