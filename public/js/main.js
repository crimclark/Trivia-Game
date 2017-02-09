var socket = io();
var $startBtn = $('#startBtn');
var $correct = $('.correct');
var $incorrect = $('.incorrect');

var room = window.location.pathname;

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
  $('#mc').html(html);
  // Counter
  var counter = $('.counter').text()
  counter++
  $('.counter').text(counter)
  if (counter === 10) {
    $.get('/score', function(res) {
      console.log(res);


    })
  }
}

function getQuestion(answer) {
  $.get('/question', function(question) {
    socket.emit('correct click', {question: question, answer: answer, score: playerScore});
    console.log(playerScore);
    console.log(socket.id);
  })
}



//GET SCORE CLICK
$('body').on('click', '#mc', function(event) {
  socket.emit('get score');
})

socket.on('get score', function(score){
  console.log('score is ', score)
  $('#score').text(score);
})

// CORRECT ANSWER CLICK
$('body').on('click', '.correct', function(event) {
  var answerText = $(this).text();
  playerScore ++;
  getQuestion(answerText);
});

socket.on('correct click', function(data) {
  console.log(data.answer)
  $('li').each( function(el) {
    if ($(this).text() === data.answer) {
      $(this).children().addClass('green');
    }
  })
    console.log(data.score);
    // $('#score').text(data.score);
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
    if ($(this).text() === data) {
      $(this).children().addClass('red');
    }
  })
});

$('body').on('click', '.incorrect', function() {
  // console.log($('.red').length);
  if ($('.red').length === 1) {
    getQuestion();
  }
})
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


