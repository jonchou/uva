var mongoose = require('mongoose');
var db = require('../../database-mongo/index.js');
var User = require('../../database-mongo/models/User');

module.exports = {

  checkuserName: function(username, callback){
    User.find({name: username}, function(err, results) {
      if(err){
        callback(error, false, null);
      }
      else if( results.length === 0 ) {
        callback(null, true, results);

      } else {
        callback(null, false, results);
      }
    })
  },

  addUser: function(username, password, callback) {
    User.create({name:username, password: password}, function(error, results) {
      if(error){
        callback(error, false, null)
      } else {
        callback(null, true, results);
      }
    })
  },

  validateUser: function(username, password, callback) {
    User.find({name: username, password: password}, function(error, results) {
      if(error){
        callback(error, null);
      } else {
        callback(null, results);
      }
    })
  },

  passportAuth: function(accessToken, refreshToken, profile, done) {
    User.find({name: profile.displayName}, function(err, user) {
      if (err) {
        console.error(err);
        return done(err);
      } 
      if (user.length < 1) {
        User.create({
          name: profile.displayName,
          joined: new Date(),
          accessToken: accessToken,
          meta: {
            reviews: 0,
            friends: 0,
          }, 
        }, function(err, user) {
          if (err) {
            return done(err);
          } else {
            return done(null, user);
          }
        });
      } else {
        done(null, user);
      }
    });
  }

}