var socket = io();
var $startBtn = $('#startBtn');
var $joinBtn = $('#joinBtn');
var $correct = $('.correct');
var $incorrect = $('.incorrect');
var userName = $('#username').val();
var $playerMode;
console.log(userName);

var room = window.location.pathname;

var startBtn = $('#start-btn');

socket.on('connect', function() {
  console.log('client connected');
  var player = {
    id: socket.id,
    name: userName,
    score: 0,
    room: room
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
  if (counter === 11) {
    $.ajax({
      url: $('#gameUrl').text(),
      type: 'delete',
    })
    socket.emit('score card')
  }
}

socket.on('score card', function(players){
  players.sort(function(a, b){
    return b.score - a.score;
  })
  html = '<div class="container scoreboard"><h1>GAME OVER</h1><h3>' + players[0].name + ' WINS</h3>';
  for (var i = 0; i < players.length; i++) {
    html += '<h5>' + players[i].name + ' Score: ' + players[i].score + '</h5>';
  }
  html += '</div>';
  $('.container').html(html);
})

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
  // if($playerMode === 'Multiplayer'){
  //   addToCounter();
  //   addEventListeners();
  // } else {
  //     addToCounter();
  //   }
      addToCounter();
    addEventListeners();
}

function getQuestion(emitTo, answer) {
  var cat = $('#category').text()
  $.get(`/question?category=${cat}`, function(question) {
    socket.emit(emitTo, {question: question, answer: answer});
  })
}

socket.on('get question', function(question){
  renderHtml(question);
})

// CORRECT ANSWER CLICK

function correctAnswer() {
  // if($playerMode === 'Multiplayer'){
  //   removeEventListeners();
  // }
      removeEventListeners();

  var answerText = $(this).text();
  getQuestion('correct click', answerText);
}

$('body').on('click', '.correct', correctAnswer);

socket.on('correct click', function(data) {
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
  console.log('I am the real playerMode: ' + `${$playerMode}`)
  if($playerMode === 'Multiplayer'){
    removeEventListeners();
  }
      // removeEventListeners();

  var answerText = $(this).text();
  socket.emit('incorrect click', answerText);
  if ($('.red').length === 1) {
    getQuestion('get question', answerText);
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
  // user selects a category from dropdown menu
  // on start button click, grab the value of selected category option
  // ajax request to send the category to server '/game'
  var cat = $('select').val()
  if(cat != 'selectOne') {
    var randURL = '/game/'
    randURL += randWord()
    $('form').attr('action', `${randURL}?category=${cat}`);
  }

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


