var mongoose = require('mongoose');
var db = require('../../database-mongo/index.js');
var User = require('../../database-mongo/models/User');

module.exports.findUser = (username) => {
  return User.find({name: username}, (err, user) => {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    })
  })
}

module.exports.createUser = (username, accessToken) => {
  return User.create({
    name: username,
    joined: new Date(),
    accessToken: accessToken,
    meta: {
      reviews: 0,
      friends: 0
    }
  }, (err, user) => {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(user)
      }
    })
  })
}

  // checkuserName: function(username, callback){
  //   User.find({name: username}, function(err, results) {
  //     if(err){
  //       callback(error, false, null);
  //     }
  //     else if( results.length === 0 ) {
  //       callback(null, true, results);

  //     } else {
  //       callback(null, false, results);
  //     }
  //   })
  // },

  // addUser: function(username, password, callback) {
  //   User.create({name:username, password: password}, function(error, results) {
  //     if(error){
  //       callback(error, false, null)
  //     } else {
  //       callback(null, true, results);
  //     }
  //   })
  // },

  // validateUser: function(username, password, callback) {
  //   User.find({name: username, password: password}, function(error, results) {
  //     if(error){
  //       callback(error, null);
  //     } else {
  //       callback(null, results);
  //     }
  //   })
  // },