module.exports = function(passport){
    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
      function(req, username, password, done)  {
          findOrCreateUser = function(){
              //find a user in Mongo with provided username
              User.findOne({'username':username},function(err, user) {
                  // In case of any error return
                  if (err){
                      console.log('Error in Signup: '+err);
                      return done(err);
                  }
                  // already exists
                  if (user) {
                      console.log('User already exists');
                      return done(null, false,
                          req.flash('message', 'User Already Exists.'));
                  } else {
                      //if there is no user with that email
                      //create the user
                      var newUser = new User();
                      // set the user's local credentials
                      newUser.username = username;
                      newUser.password = createHash(password);
                      newUser.email = req.param('email');
                      newUser.firstname = req.param('firstName');
                      newUser.lastName = req.param('lastName');
                      
                      //save the user
                      newUser.Save(function(err) {
                          if (err) {
                              console.log('Error in Saving user: '+err);
                              throw err;
                          }
                          console.log('User Registration succesful');
                          return done(null, newUser);
                      });
                  }
              });
          };
          // Delay the execution of findOrCreateUser and execute the method
          // in the next tick of the event loop
          process.nextTick(findOrCreateUser);
      })
    );
    
    // Generates hash using bCrypt
    var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
}