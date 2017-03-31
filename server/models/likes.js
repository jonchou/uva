const mongoose = require('mongoose');
const db = require('../../database-mongo/index.js');
const Like = require('../../database-mongo/models/Likes');

module.exports.addLike = (username, productId, like) => {
  return Like.create({ username: username, product_id: product_id, like: like }, (err, result) => {
    return new Promise((resolve, reject) => {
      if (err) { reject(err); }
      else { resolve(result); }
    })
  })
}

module.exports.getLikes = (username) => {
  return Like.find({ username: username }, (err, result) => {
    return new Promise((resolve, reject) => {
      if (err) { reject(err); }
      else { resolve(result); }
    })
  })
}