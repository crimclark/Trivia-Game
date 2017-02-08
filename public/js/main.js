var socket = io();
var $startBtn = $('#startBtn');
var $correct = $('.correct');
var $incorrect = $('.incorrect');

var room = window.location.pathname;

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
  // console.log(event.currentTarget)
  console.log($(this).text());
  var answerText = $(this).text();
  // $(this).addClass('clicked');
  // var clicked = event.currentTarget;
  socket.emit('incorrect click', answerText);
});

socket.on('incorrect click', function(data) {
  console.log(data);
  var $li = $('li');
  console.log($li);
  $li.each( function(el) {
    console.log(el);
    console.log(el.child);
    console.log(el.children[0]);
    // if ($li.text() === )
  })
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
