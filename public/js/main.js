var socket = io();

console.log('hello');

var greenBtn = $('#green');
var redBtn = $('#red');

// socket.on('div click', function(){
//   socket.emit('div click', greenBtn.on('click', function(){
//     greenBtn.css('color', 'green');
//   }));

// })

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
