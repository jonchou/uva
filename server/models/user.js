var mongoose = require('mongoose');
var db = require('../../database-mongo/index.js');
var User = require('../../database-mongo/models/User');
const NN = require('../neural-network.js');

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
  let profile = NN.newUserNN().toJSON();
  return User.create({
    name: username,
    joined: new Date(),
    accessToken: accessToken,
    meta: {
      reviews: 0,
      friends: 0
    },
    recommendation_profile: profile
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

module.exports.updateUserNN = (username, NN) => {
  return new Promise ((resolve, reject) => {
    User.findOneAndUpdate({name: username}, {$set:{recommendation_profile:NN}}, {new: true}, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
