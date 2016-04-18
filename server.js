// modules ==========================================================================
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require('bcryptjs');
var logger = require('morgan');
var session = require('express-session');
var logger = require('morgan');
var db = require('./config/db');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
var SubRoom = require('./app/models/subRoom.js');



//configuration ====================================================================
mongoose.connect(db.url); // connect to our database
require('./config/passport')(passport);

// set up our port ==================================================================

var PORT = process.env.PORT || 3000;
// middleware =======================================================================
app.use(logger('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(session({
  secret: 'HackRU2016',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
})); // session secret
app.use(passport.initialize()); // required for passport
app.use(passport.session()); // persistent login sessions


// socket =======================================================================
io.on('connection', function(socket) {
  // console.log(socket);

  console.log('a user has connected');

  socket.on('message', function(data) {
    console.log(data);
    SubRoom.update({
      _id: {
        $eq: data.room
      }
    }, {
      $push: {
        "chats": {
          user: data.user,
          message: data.message
        }
      }
    }, function(err, result) {
      if (err) {
        res.json({
          message: "Something went wrong"
        });
      }
      console.log("Updated successfully");
      socket.emit('update', {message: "Updated"});
      console.log(result);
    });

  });

});


// routes ===========================================================================

require('./app/routes/routes')(app, passport); //pass our application and passport into our routes

http.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
}); //start server and console log on connection

exports = module.exports = app; // expose our app
