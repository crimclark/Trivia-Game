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
  greenBtn.css('color', 'green');
});

redBtn.on('click', function(){
  redBtn.css('color', 'red');
});

socket.emit('MyEvent', {Event1: 'test'});
