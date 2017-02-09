var players = [];

function sockets(io) {
  io.on('connection', socket => {

    console.log('a user connected');

    socket.on('room', function(data) {
      // console.log("**data** ", data);
      var roomName = data.room;

      socket.join(roomName);

      players.push(data.player);
      // console.log("**players** ", players);
      // getUsersInRoomNumber(io, roomName);

      console.log('joined room ', roomName);

      socket.on('correct click', function(data){
        // console.log('**score** ', data.score);
        var currentPlayer;
        // console.log("**socket.id** ", socket.id);
        players.forEach( function(player) {
          for (var id in player) {
            if (player[id] === socket.id) {
              player.score += 1;
              console.log("**player** ", player);
              currentPlayer = player;
            }
          }
        })
        io.to(roomName).emit('correct click', data);
        // io.to(roomName).emit('get score', currentPlayer.score);
        console.log('socket id: ', socket.id);
        console.log('currentplayer id: ', currentPlayer.id);
        console.log('id is ', id);
        console.log('current player is ', currentPlayer)
        socket.broadcast.to(socket.id).emit('get score', currentPlayer.score)
      })

      socket.on('incorrect click', function(data){
        io.to(roomName).emit('incorrect click', data);
      })

      // socket.on('get score', function(){
      //   var currentPlayer;
      //   players.forEach(function(player){
      //     for (var id in player) {
      //       if (player[id] === socket.id) {
      //         currentPlayer = player;
      //       }
      //     }
      //   })
      //   console.log('***current player*** ', currentPlayer);
      //   socket.broadcast.to(currentPlayer.id).emit('get score', currentPlayer.score);
      // })
    })
  })
}

module.exports = sockets;
