var mongoose = require('mongoose');
var db = require('../../database-mongo/index.js');
var Review = require('../../database-mongo/models/Review');

module.exports = {

  addReview: function(review, callback){
    Review.create({content: review.content, rating: review.rating, product: review.product, username: review.username, product_id: review.product_id}, function(error, results){
      if(error){
        callback(error, null)
      } else {
        callback(null, results)
      }
    })
  },

  getReviews: function(product_id, callback){
    console.log('inside getReviews', product_id);
    Review.find({product_id: product_id}, function(error, results){
      if(error){
        callback(error, null);
      } else {
        callback(null, results);
      }
    })
  }

}