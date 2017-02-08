function sockets(io) {
  io.on('connection', socket => {

    console.log('a user connected');

    socket.on('room', function(roomName) {
      socket.join(roomName);

      // getUsersInRoomNumber(io, roomName);

      console.log('joined room ' + roomName);

      // socket.on('red click', function() {
      //   io.to(roomName).emit('red click');
      // })

      // socket.on('green click', function(){
      //   io.to(roomName).emit('green click');
      // })

      socket.on('correct click', function(data){
        console.log(data);
        io.to(roomName).emit('correct click', data);
      })

      socket.on('incorrect click', function(data){
        io.to(roomName).emit('incorrect click', data);
      })
    })
  })
}

module.exports = sockets;
