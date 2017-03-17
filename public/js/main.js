var socket = io();
var $startBtn = $('#startBtn');
var $joinBtn = $('#joinBtn');
var $correct = $('.correct');
var $incorrect = $('.incorrect');
var userName = $('#username').val();
var $playerMode = $('#gameMode').text();

var mongoId = $('#mongoId').text();

var room = window.location.pathname;

var startBtn = $('#start-btn');

socket.on('connect', function() {
  var player = {
    id: socket.id,
    name: userName,
    score: 0,
    room: room,
    mongoId: mongoId
  }
  socket.emit('room', {room: room, player: player});
});

function removeEventListeners() {
  $('body').off('click', '.correct', correctAnswer);
  $('body').off('click', '.incorrect', incorrectAnswer);
}

function addEventListeners() {
  $('body').on('click', '.correct', correctAnswer);
  $('body').on('click', '.incorrect', incorrectAnswer);
}

var counter = $('.counter').text()
function addToCounter() {
  counter++;
  $('.counter').text(counter);
  if (counter === 10) {
    $.ajax({
      url: $('#gameUrl').text(),
      type: 'delete',
    });
    socket.emit('score card');
  }
}

function getWinner(players) {
  players.sort(function(a, b){
    return b.score - a.score;
  })
  return players[0];
}

socket.once('score card winner', function(players){
  var winner = players.winner;
  var loser = players.loser;
  if ($playerMode === 'Multiplayer') {
    html = '<div class="container scoreboard"><h1>GAME OVER</h1><h3>YOU WIN</h3>';
    html += '<h5>' + winner.name + ' Score: ' + winner.score + '</h5><h5>' +
            loser.name + ' Score: ' + loser.score + '</h5></div>'
    $('.container').html(html);
    if (players.winner.id === socket.id) {
      putScores(winner, loser);
    }
  } else {
    html = '<div class="container scoreboard"><h1>GAME RESULTS</h1><h5> Your Score: ' + winner.score + '</h5>';
    $('.container').html(html);
  }
})

socket.once('score card loser', function(players){
  var winner = players.winner;
  var loser = players.loser;
  html = '<div class="container scoreboard"><h1>GAME OVER</h1><h3>YOU LOSE</h3>';
  html += '<h5>' + winner.name + ' Score: ' + winner.score + '</h5><h5>' +
          loser.name + ' Score: ' + loser.score + '</h5></div>'
  $('.container').html(html);
})


function putScores(winner, loser) {
  $.ajax({
    url: '/scores',
    method: 'put',
    data: {winner: winner, loser: loser}
  })
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
    addToCounter();
    addEventListeners();
}

function getQuestion(emitTo, answer) {
  var cat = $('#category').text()
  $.get(`/question?category=${cat}`, function(question) {
    socket.emit(emitTo, {question: question, answer: answer});
  });
}

socket.on('get question', function(question){
  renderHtml(question);
})

// CORRECT ANSWER CLICK

function correctAnswer() {
  var answerText = $(this).text();
  getQuestion('correct click', answerText);
}

$('body').on('click', '.correct', correctAnswer);

socket.on('correct click', function(data) {
  removeEventListeners();
  $('li').each( function(el) {
    if ($(this).text() === data.answer) {
      $(this).children().addClass('green');
    }
  })
  setTimeout(function() {
    renderHtml(data.question);
  }, 1000);
});

// WRONG ANSWER CLICK
function incorrectAnswer() {
  removeEventListeners();
  var answerText = $(this).text();
  socket.emit('incorrect click', answerText);
  if($playerMode === 'Single Player') {
    if ($('.red').length === 0) {
      getQuestion('get question', answerText);
    }
  } else {
      if ($('.red').length === 1) {
        removeEventListeners();
        getQuestion('get question', answerText);
      }
    }
}

$('body').on('click', '.incorrect', incorrectAnswer)

socket.on('incorrect click', function(data) {
  $('li').each( function(el) {
    if ($(this).text() === data) {
      $(this).children().addClass('red');
    }
  })
});

socket.on('get score', function(score){
  $('#score').text(score);
})


$startBtn.on('click', function(){
  var cat = $('select').val()
  var randURL = '/game/'
  randURL += randWord()
  $('form').attr('action', `${randURL}?category=${cat}`);
});


//Profile Update rendering
var $profEdit = $('.profileEdit');
var $profEditDivBtn = $('.profileEdit>button');
var $profEditLink = $('#profEditLink');
var $profUserNameEdit = $('#profUserNameEdit');
var $input = $('.profileEdit>input');


$profEditLink.on('click', function(evt){
  $profEdit.css('display', 'inline');
  $profUserNameEdit.css('display', 'none');
});

$profEditDivBtn.on('click', function(evt){
  $profEdit.css('display', 'none');
  $profUserNameEdit.css('display', 'inline');
  $.ajax({
    url: '/user',
    method: 'PUT',
    data: {newName: $input.val()}
  });
});


