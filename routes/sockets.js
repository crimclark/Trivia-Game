function sockets(io) {
  io.on('connection', socket => {
    console.log('a user connected');

    socket.on('red click', function() {
      io.emit('red click');
    })

    socket.on('green click', function(){
      io.emit('green click');
    })
  })
}

module.exports = sockets;
