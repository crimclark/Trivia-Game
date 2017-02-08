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

// ANSWER CLICK PSEUDOCODE
$correct.on('click', function() {
  socket.emit('correct click');
});

socket.on('correct click', function() {
  $correct.addClass('green');
  // ajax => next question
});

// WRONG ANSWER CLICK
$incorrect.on('click', function(event) {
  console.log($(this).text());
  var answerText = $(this).text();
  socket.emit('incorrect click', answerText);
});

socket.on('incorrect click', function(data) {
  console.log(data);
  $('li').each( function(el) {
    console.log($(this));
    console.log($(this).text());
    if ($(this).text() === data)
    $(this).children().addClass('red');
  })
});

//ROOM URL PSEUDOCODE
$startBtn.on('click', function(){
  var randURL = '/game/'
  randURL += randWord()
  console.log(randURL)
 $('form').attr('action', `${randURL}`);
});

//Profile Update rendering
var $profEdit = $('.profileEdit');
var $profEditFormBtn = $('.profileEdit>button');
var $profEditLink = $('#profEditLink');
var $profUserNameEdit = $('#profUserNameEdit');

$profEditLink.on('click', function(evt){
  $profEdit.css('display', 'inline');
  $profUserNameEdit.css('display', 'none');
});

$profEditFormBtn.on('click', function(evt){
  $profEdit.css('display', 'none');
  $profUserNameEdit.css('display', 'inline');
});


