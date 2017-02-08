function sockets(io) {
  io.on('connection', socket => {

    console.log('a user connected');

    socket.on('room', function(roomName) {
      socket.join(roomName);

      getUsersInRoomNumber(io, roomName);

      console.log('joined room ' + roomName);

      socket.on('red click', function() {
        io.to(roomName).emit('red click');
      })

      socket.on('green click', function(){
        io.to(roomName).emit('green click');
      })

      socket.on('correct click', function(){
        io.to(roomName).emit('correct click');
      })

      socket.on('incorrect click', function(){
        io.to(roomName).emit('incorrect click');
      })
    })
  })
}

module.exports = sockets;


var getUsersInRoomNumber = function(io, roomName) {
    var room = io.nsps['/'].adapter.rooms[roomName];
    // console.log(`number of users in room ${roomName} is ${Object.keys(room).length}`);
    console.log(Object.keys);
    return Object.keys(room).length;
}
