var mongoose = require('mongoose');
// var findOrCreate = require('mongoose-findorcreate')

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

// userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);