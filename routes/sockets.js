var players = [];

function sockets(io) {
  io.on('connection', socket => {

    console.log('a user connected');

    socket.on('room', function(data) {
      // console.log("**data** ", data);
      var roomName = data.room;

      socket.join(roomName);

      players.push(data.player);

      console.log('joined room ', roomName);

      socket.on('correct click', function(data){

        var currentPlayer;

        players.forEach( function(player) {
          for (var id in player) {
            if (player[id] === socket.id) {
              player.score += 1;
              console.log("**player** ", player);
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

      socket.on('get question', function(question){
        io.to(roomName).emit('get question', question);
      })
    })
  })
}

module.exports = sockets;

