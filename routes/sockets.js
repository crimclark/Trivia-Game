function sockets(io) {
  io.on('connection', socket => {

    console.log('a user connected');

    socket.on('room', function(roomName) {
      socket.join(roomName);

      console.log('joined room ' + roomName);

      socket.on('red click', function() {
        io.to(roomName).emit('red click');
      })

      socket.on('green click', function(){
        io.to(roomName).emit('green click');
      })
    })
  })
}

module.exports = sockets;


