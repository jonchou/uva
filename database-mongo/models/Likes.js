var mongoose = require('mongoose');

var likesSchema = mongoose.Schema({
  username: String,
  product_id: String,
  like: Number
});

module.exports = mongoose.model('Likes', likesSchema);