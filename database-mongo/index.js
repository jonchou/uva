var mongoose = require('mongoose');
var url = 'mongodb://localhost/uva';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection errorINSIDE BIND'));

db.once('open', function() {
  console.log('connected');
});

module.exports = db;