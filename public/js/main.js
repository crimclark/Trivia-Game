var socket = io();
var $startBtn = $('#startBtn');
var $correct = $('.correct');
var $incorrect = $('.incorrect');

var room = window.location.pathname;

socket.on('connect', function() {
  console.log('client connected');
  socket.emit('room', room);
});

// var greenBtn = $('#green');
// var redBtn = $('#red');

// greenBtn.on('click', function(){
//   socket.emit('green click')
// });

// redBtn.on('click', function(){
//   socket.emit('red click')
// });

// socket.on('green click', function() {
//   greenBtn.css('color', 'green');
// });

// socket.on('red click', function() {
//   redBtn.css('color', 'red');
// });

function renderHtml(question) {
  var $question = $('.question');
  $question.text(question.question);
  var html = '';
  var answer = question.answers;
  for (var i = 0; i < question.answers.length; i++) {
    if (answer[i].correct) {
      html += '<li class="mc-list"><button class="mc-btn correct" data-correct="true">' + answer[i].answer + '</button></li>';
    } else {
      html += '<li class="mc-list"><button class="mc-btn incorrect" data-correct="false">' + answer[i].answer + '</button></li>';
    }
  }
  // console.log(html);
  $('#mc').html(html);
  // Counter
  var counter = $('.counter').text()
  counter++
  $('.counter').text(counter)

  if(counter === 10 ) {
    $.ajax({
      url: $('#gameUrl').text(),
      type: 'delete',
    })
  }
}

function getQuestion(answer) {
  $.get('/question', function(question) {
    socket.emit('correct click', {question: question, answer: answer});
  })
}

// CORRECT ANSWER CLICK
$('body').on('click', '.correct', function(event) {
  var answerText = $(this).text();
  getQuestion(answerText);
});

socket.on('correct click', function(data) {
  // $correct.addClass('green');
  $('li').each( function(el) {
    if ($(this).text() === data.answer) {
      $(this).children().addClass('green');
    }
  })
  // ajax => next question
  setTimeout(function() {
    renderHtml(data.question);
  }, 1000);
});

// WRONG ANSWER CLICK
$('body').on('click', '.incorrect', function(event) {
  // console.log($(this).text());
  var answerText = $(this).text();
  socket.emit('incorrect click', answerText);
});

socket.on('incorrect click', function(data) {
  // console.log(data);
  $('li').each( function(el) {
    // console.log($(this));
    // console.log($(this).text());
    if ($(this).text() === data) {
      $(this).children().addClass('red');
    }
  })
});

$('body').on('click', '.incorrect', function() {
  if ($('.red').length === 1) {
    getQuestion();
  }
})
//ROOM URL PSEUDOCODE
$startBtn.on('click', function(){
  var randURL = '/game/'
  randURL += randWord()
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


