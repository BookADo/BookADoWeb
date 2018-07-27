const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField : 'email'
  },

  function(username, password, done){
    User.findOne({email: username}, function(err, user){

      if(err){return done(err)}

      //Return if user is not found in database
      if(!user) {
        return done(null, false, {
          message: 'User Not Found'
        });
      }

      //Return if passwords do not match
      if(!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect Password'
        });
      }

      //If credentials are correct - return the user object
      return done(null, user);

    });
  }
));
