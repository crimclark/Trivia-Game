var mongoose = require('mongoose')

var gameRooms = new mongoose.Schema({
  url: {type: String, unique: true},
  activeUsers: Number,
  category: String
});

module.exports = mongoose.model('gameRooms', gameRooms)
