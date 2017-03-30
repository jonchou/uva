var express = require('express');
var bodyParser = require('body-parser');
var wineApiUtils = require('./utilities/wineApiUtils.js');
var cors = require('cors');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var fb = require('./utilities/config.js');
var ppUtils = require('./utilities/passportUtils.js');
var User = require('../database-mongo/models/User.js');
var path = require('path');
var Product = require('./models/product.js');
var User = require('./models/user.js');
var Review = require('./models/review.js');

//initializing Passport with FB OAuth
passport.use(new FacebookStrategy({
    clientID: fb.fbAppId,
    clientSecret: fb.secret,
    callbackURL: 'http://localhost:3000/login/facebook/callback',
  }, User.passportAuth));

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(require('cookie-parser')());
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', ppUtils.isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist'));
});

app.use(express.static(__dirname + '/../react-client/dist'));

passport.serializeUser((user, done) => {
  // user is returned as an object within an array
  if (user) {
    done(null, user[0].accessToken);
  } else {
    done(null, 'first time user');
  }
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});


app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login',
    // session: false,
    successRedirect: '/'
  })
);

app.get('/init', function(req, res) {
  var wines = {
    top10Reds: [],
    top10Wines: [],
    topRated: [],
  };

  Product.top10Reds(function(error, topReds) {
    if (error) {
      res.send(error);
    } else {
      wines.top10Reds = topReds;
      Product.top10Whites(function(error, topWhites) {
        if(error){
          res.send(error)
        } else {
          wines.top10Whites = topWhites;
          res.send(wines);
         //GET TOP 10 RATED
         // var topRated = db.top10Rated(function(error, topRated){
         //  if(error){
         //    res.send(error)
         //  } else {
         //    wines.topRated = topRated;
         //    res.send(wines);
         //    console.log('WIIINES())()()()', wines);
         //  }
         // });
        }
      });
    }
  });
});


app.options('*', cors());

app.get('/getWines', function(req, res) {
  // can be modified to take in a price from req/res later
  var price = 10;

  wineApiUtils.topRed(price, function(error, results) {
    Product.storeWines(results.Products.List, function() {
      wineApiUtils.topWhite(price, function(error, results) {
        Product.storeWines(results.Products.List, function() {
          res.send('storage of red and white wines complete!');
        });
      });
    });
  });
});

//This route invokes wine.com api.
// app.get('/catalog', wineApiUtils.apiRequest);

app.post('/search', function(req, res) {
  var query = req.body.search;
  var price = req.body.price || 10;

  Product.searchWines(query, price, function(error, results) {
    if(error){
      console.log('Error from server API request', error);
      res.sendStatus(404).send('not found')
    } else {
      res.send(results);
    }
  })

});

app.post('/signup', function(req, res) {
  var user = req.body.username;
  var pass = req.body.password;

  //check for valid username, i.e. currently not in use
  User.checkuserName(user, function(error, valid, results){
    if(error){
      res.send('error inside checkuserName index');
    } else if (!valid) {
      res.send('duplicate username')
    } else if (valid) {
      User.addUser(user, pass, function(error, success, results){
        if(error) {
          res.send('error inside addUser index.js');
        } else if (success) {
          res.send(results);
        }
      })
    }
  })
});

app.post('/users/username/', function(req, res) {
  var username = req.body.username;

  User.checkuserName(username, function(error, valid, results){
    if(error){
      console.error(error)
      res.send(error);
    } else {
      console.log('results from checkuserName', results);
      res.send(results);
    }
  });
});

app.options('/users/username/');

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.validateUser(username, password, function(error, results) {
    if(error){
      console.log(error)
    } else {
      res.send(results);
    }
  })
});

app.post('/review', function(req, res) {
  var content = req.body.review;
  var rating = req.body.rating;
  var product = req.body.product;
  var username = req.body.username;
  var product_id = req.body.product_id;
  var review = {
    content: content,
    rating: rating,
    product: product,
    username: username,
    product_id: product_id
  }
  Review.addReview(review, function(error, results){
    if(error){
      console.log('error inside dbUtils addReview', error);
    } else {
      console.log('success after add wine review', results);
      res.send(results)
    }
  })
});

app.post('/reviews', function(req, res) {
  var product_id = req.body.product_id;
  console.log('product inside reviews GET all', product_id);

  Review.getReviews(product_id, function(error, reviews){
    if(error){
      console.log('error in post-reviews')
      res.send(error)
    } else {
      res.send(reviews)
    }
  })
});


var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening to port ' + port);
});
