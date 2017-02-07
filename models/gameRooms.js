var mongoose = require('mongoose')

var gameRooms = new mongoose.Schema({
  url: String,
  activeUsers: Number,
  category: String
});

module.exports = mongoose.model('gameRooms', gameRooms)
