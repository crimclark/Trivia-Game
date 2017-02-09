var socket = io();
var $startBtn = $('#startBtn');
var $correct = $('.correct');
var $incorrect = $('.incorrect');
var room = window.location.pathname;
var $profEdit = $('.profileEdit');
var $profEditFormBtn = $('.profileEdit>button');
var $profEditLink = $('#profEditLink');
var $profUserNameEdit = $('#profUserNameEdit');

socket.on('connect', function() {
  console.log('client connected');
  var player = {
    id: socket.id,
    score: 0,
    room: room
  }
  socket.emit('room', {room: room, player: player});
});

var playerScore = 0;

var player = {
  id: socket.id,
  score: 0
}

var counter = $('.counter').text()
function addToCounter() {
  counter++
  $('.counter').text(counter);
  if (counter === 11) {
    html = '<div class="container scoreboard"><h1>GAME OVER</h1><h3>*USER* WINS</h3><h5>User1 Score: ##</h5><h5>User2 Score: ##</h5></div>';
    $('.container').html(html);
    $.ajax({
      url: $('#gameUrl').text(),
      type: 'delete',
    })
  }
}

function renderHtml(question) {
  var answer = question.answers;
  if(undefined === question.answers){
    return;
  } else {
      var $question = $('.question');
      $question.text(question.question);
      var html = '';
      for (var i = 0; i < 4; i++) {
        if (answer[i].correct) {
          html += '<li class="mc-list"><button class="mc-btn correct" data-correct="true">' + answer[i].answer + '</button></li>';
        } else {
            html += '<li class="mc-list"><button class="mc-btn incorrect" data-correct="false">' + answer[i].answer + '</button></li>';
          }
      }
      $('#mc').html(html);
      // Counter
      var counter = $('.counter').text();
      counter++;
      $('.counter').text(counter)
    }
}

function getQuestion(answer) {
  $.get('/question?gameUrl=' + window.location.pathname, function(question) {
    socket.emit('correct click', {question: question, answer: answer});
  });
  }
  $('#mc').html(html);
  // Counter
  addToCounter();
}

function getQuestion(answer) {
  $.get('/question', function(question) {
    socket.emit('correct click', {question: question, answer: answer, score: playerScore});
    console.log(playerScore);
    console.log(socket.id);
  })
}

// CORRECT ANSWER CLICK
$('body').on('click', '.correct', function(event) {
  var answerText = $(this).text();
  playerScore ++;
  getQuestion(answerText);
});

socket.on('correct click', function(data) {
  $('li').each( function(el) {
    if ($(this).text() === data.answer) {
      $(this).children().addClass('green');
    }
  });
  // ajax => next question
  setTimeout(function() {
    renderHtml(data.question);
  }, 1000);
});

// WRONG ANSWER CLICK
$('body').on('click', '.incorrect', function(event) {
  var answerText = $(this).text();
  socket.emit('incorrect click', answerText);
});

socket.on('incorrect click', function(data) {
  $('li').each( function(el) {
    if ($(this).text() === data) {
      $(this).children().addClass('red');
    }
  });
});

$('body').on('click', '.incorrect', function() {
  if ($('.red').length === 1) {
    getQuestion();
  }
});

//ROOM URL PSEUDOCODE
$startBtn.on('click', function(){
  var randURL = '/game/'
  randURL += randWord();
 $('form').attr('action', `${randURL}`);
});

//Profile Update rendering

$profEditLink.on('click', function(evt){
  $profEdit.css('display', 'inline');
  $profUserNameEdit.css('display', 'none');
});

$profEditFormBtn.on('click', function(evt){
  $profEdit.css('display', 'none');
  $profUserNameEdit.css('display', 'inline');
});


