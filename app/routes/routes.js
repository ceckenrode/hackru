module.exports = function(app, passport) {
  var User = require('../models/userModel.js');
  var ChatRoom = require('../models/chatRoom.js');
  var SubRoom = require('../models/subRoom.js');
  //register and login routes====================================================================
  //register===================================================
  // app.post('/register', passport.authenticate('local-signup'),
  //   function(req, res) {
  //     // If this function gets called, authentication was successful.
  //     // `req.user` contains the authenticated user.
  //     res.json(req.user);
  //   }
  // );
  app.post('/register', passport.authenticate('local-signup'), function(req, res) {
    console.log(req.body);
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json(req.user);
  });


  //login======================================================
  app.post('/login', passport.authenticate('local-login'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.json(
        req.user
      );
    }
  );
  app.get('/api/getSubRooms/:id', function(req, res) {
    console.log(req.params.id);
    ChatRoom.find({
      _id: req.params.id
    }).populate('subRooms').exec(function(err, docs) {
      if (err) throw err;
      res.json(docs);
    });
  });

  app.get('/api/findorcreateroom', function(req, res) {
    console.log(req.query.location);
    ChatRoom.findOne({
      'location': req.query.location
    }, function(err, doc) {
      if (err) {
        req.status(404).json({
          message: "An error occured, cannot find or create a room."
        });
      }
      if (doc === null) {
        console.log('Room does not exist, creating...');
        var newRoom = new ChatRoom();
        newRoom.location = req.query.location;
        newRoom.save(function(err) {
          if (err) throw err;
          console.log('Created new room');
          res.json(newRoom);
        });
      } else {
        console.log(doc);
        console.log('going into', req.query.location);
        res.json(doc);
      }
    });
  });
  //===============================================================================================
  app.get('/authenticate', isAuthenticated, function(req, res) {
    res.status(200).json({});
  });

  app.get('/logout', function(req, res) {
    //logout user and send empty response

    req.logout();
    res.send({});
  });


  app.get('*', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
  });


  // route middleware to make sure user is logged in
  function isAuthenticated(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    }
    // if they aren't alert the client they aren't logged in
    res.status(401).json({
      message: "You must log in to use this feature"
    });
  }
};
