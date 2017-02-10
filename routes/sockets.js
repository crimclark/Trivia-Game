var players = [];

function sockets(io) {
  io.on('connection', socket => {

    console.log('a user connected');

    socket.on('room', function(data) {
      var roomName = data.room;

      socket.join(roomName);

      players.push(data.player);

      console.log('joined room ', roomName);
      var room = io.sockets.adapter.rooms[roomName];
      console.log('total connections in ' + roomName + ': ' + room.length);

      socket.on('correct click', function(data){

        var currentPlayer;

        players.forEach( function(player) {
          for (var id in player) {
            if (player[id] === socket.id) {
              player.score += 1;
              currentPlayer = player;
              io.sockets.connected[socket.id].emit('get score', currentPlayer.score);
            }
          }
        })
        io.to(roomName).emit('correct click', data);
      })

      socket.on('incorrect click', function(data){
        io.to(roomName).emit('incorrect click', data);
      })

      socket.on('get question', function(data){
        io.to(roomName).emit('get question', data.question);
      })

      socket.on('score card', function(){
        var currentPlayers = [];
        players.forEach (function(player) {
          for (var room in player) {
            if (player[room] === roomName) {
              currentPlayers.push(player);
            }
          }
        })
        io.to(roomName).emit('score card', currentPlayers)
      })

      socket.on('disconnect', function(){
        console.log('disconnected. total connections in ' + roomName + ': ' + room.length);
      })
    })
  })
}

module.exports = sockets;

