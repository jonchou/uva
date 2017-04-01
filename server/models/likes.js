const mongoose = require('mongoose');
const db = require('../../database-mongo/index.js');
const Like = require('../../database-mongo/models/Likes');

module.exports.addLike = (username, productId, like) => {
  return new Promise((resolve, reject) => {
    Like.create({ username: username, product_id: productId, like: like }, (err, result) => {
      if (err) { reject(err); }
      else { resolve(result); }
    })
  })
}

module.exports.getLikes = (username) => {
  return new Promise((resolve, reject) => {
    Like.find({ username: username }, (err, result) => {
      if (err) { reject(err); }
      else { resolve(result); }
    })
  })
}

module.exports.addLikesToWines = (username, wines) => {
  return new Promise((resolve, reject) => {
    Like.find( {username: username }, (err, likes) => {
      if (err) { reject(err); }
      else {
        const likedWines = {};
        likes.forEach((wine) => {
          likedWines[wine.product_id] = wine.like;
        })
        wines.topRated = wines.topRated.map((wine) => {
          const newWine = wine;
          if (likes[wine._id]) {
            newWine.like = likes[wine._id];
          } else {
            newWine.like = null;
          }
          return newWine;
        })
        resolve(wines);
      }    
    })
  })
}