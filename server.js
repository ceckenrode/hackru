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
io.on('connection', function(socket){
// console.log(socket);

  var users = [];
  var username = '';
  var room = '';
  console.log('a user has connected');


  // socket.on('join-room', function(data){
  //   socket.join(data.room);
  //   room = data.room;
  // });


  // socket.on('request-users', function(){
  //   socket.to(room).emit('users', {users: users});
  //   console.log(users);
  // });

  // socket.on('add-user', function(data){

  //     io.to(room).emit('add-user', {
  //       username: data.username
  //     });
  //     username = data.username;
  //     users.push(data.username);

  socket.on('message', function(data){
    console.log('got here');
    console.log(data);
  });

  });


    // io.to(room).emit('message', {username: username, message: data.message});

    // var newMessage = new Message({message: data.message, username: username, created: Date.now()});
    // console.log(newMessage);

  //   newMessage.save(function(err){
  //     if (err) throw err;
  //     console.log('new message saved');
  //   });
  // 
//   socket.on('disconnect', function(data){
//     console.log(username + ' has disconnected');
//     users.splice(users.indexOf(username), 1);
//     io.to(room).emit('remove-user', {username: username});
//   });
// });

// routes ===========================================================================

require('./app/routes/routes')(app, passport); //pass our application and passport into our routes

http.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
}); //start server and console log on connection

exports = module.exports = app; // expose our app
