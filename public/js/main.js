var socket = io();

var room = window.location.pathname;

var startBtn = $('#start-btn');

socket.on('connect', function() {
  console.log('client connected');
  socket.emit('room', room);
});

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

//ROOM URL PSEUDOCODE

// startBtn.on('click', function(){
//   console.log(randWord());
//   // append link with url;
// })

