var mongoose = require('mongoose')

var userProfiles = new mongoose.Schema({
  f_name: String,
  profileName: String,
  avatar: String,
  score: { gamesWon: Number, gamesPlayed: Number},
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('userProfiles', userProfiles)
