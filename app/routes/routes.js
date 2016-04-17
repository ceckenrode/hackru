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
  app.get('/api/findorcreateroom', function(req, res) {
      console.log(req.query);
      console.log('got here')
      res.json(
        req.user
      );
    }
  );
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
