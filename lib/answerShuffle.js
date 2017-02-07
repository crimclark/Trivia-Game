
// {
//   "response_code":0,
//   "results":[
//     {"category":"General Knowledge",
//     "type":"multiple",
//     "difficulty":"medium",
//     "question":"What is the name given to Indian food cooked over charcoal in a clay oven?",
//     "correct_answer":"Tandoori",
//     "incorrect_answers":["Biryani","Pani puri","Tiki masala"]
//     }
//   ]
// }

var results = {"category":"General Knowledge",
    "type":"multiple",
    "difficulty":"medium",
    "question":"What is the name given to Indian food cooked over charcoal in a clay oven?",
    "correct_answer":"Tandoori",
    "incorrect_answers":["Biryani","Pani puri","Tiki masala"]
};


var answersArray = [];

results.incorrect_answers.forEach(function (answer){
  var answerObj = {};
  answerObj.answer = answer;
  answerObj.correct = false;
  answersArray.push(answerObj);
})

var correctAnsObj = {
  answer: results.correct_answer,
  correct: true
}


function randomIndex() {
  return Math.floor(Math.random() * 4);
}

var i = randomIndex();
console.log(i);
// console.log(i);

answersArray.splice(i, 0, correctAnsObj);

console.log(answersArray);

// [
//   {
//     answer: '....',
//     correct: false
//   },
//   {
//     answer: '....',
//     correct: false
//   },
//   {
//     answer: '....',
//     correct: true
//   },
//   {
//     answer: '....',
//     correct: false
//   }
// ]

// var i = 0;

// var mc = $('#mc')
// while (i < 4) {
//   var $li = jQuery('li');
//    $li.addClass('mc-btn');
//   var $btn = jQuery('button');
// $btn.attr('{{correct answer}}', '{{result.correct_answer}}');
// $btn.text('{{result.correct_answer}}')
//   i++
// }
