var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  joined: Date,
  accessToken: String,
  meta: {
    reviews: Number,
    friends: Number
  },
  recommendation_profile: Object
});

module.exports = mongoose.model('User', userSchema);