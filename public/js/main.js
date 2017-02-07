var socket = io();

console.log('hello');

var greenBtn = $('#green');
var redBtn = $('#red');

greenBtn.on('click', function(){
  socket.emit('green click')
});

redBtn.on('click', function(){
  socket.emit('red click')
});

socket.on('green click', function() {
  greenBtn.css('color', 'green');
});

socket.on('red click', function() {
  redBtn.css('color', 'red');
});

//ANSWER CLICK PSEUDOCODE

// answer.on('click', function(answerString) {
//   socket.emit('answer click', answerString)
// });

// socket.on('answer click', function(answer) {
//  if (answer === 'correct') {
//    turn answer green
//  } else {
//   turn answer red
//  }
// })
