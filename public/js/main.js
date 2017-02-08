var socket = io();
var $startBtn = $('#startBtn');
var $correct = $('.correct');
var $incorrect = $('.incorrect');

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

$correct.on('click', function() {
  socket.emit('correct click');
});

socket.on('correct click', function() {
  $correct.addClass('green');
  // ajax => next question
});

$incorrect.on('click', function(event) {
  $(this).addClass('clicked');
  socket.emit('incorrect click');
});

socket.on('incorrect click', function() {
  var $clicked = $('.clicked');
  $clicked.addClass('red');
});

//ROOM URL PSEUDOCODE

$startBtn.on('click', function(){
  var randURL = '/game/'
  randURL += randWord()
  console.log(randURL)
 $('form').attr('action', `${randURL}`);
});

