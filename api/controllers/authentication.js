var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function (req, res){

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;

    token = user.generateJwt();
    res.status(200);
    res.json({

      "token": token

    });
  });
};

module.exports.login = function(req,res){

  passport.authenticate('local', function(err, user, info){

    var token;

    // If Passport throws/catches an error
    if (err){
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({

        "token": token

      });
    } else {
      //If user not found
      res.status(401).json(info);
    }
  })(req,res);
};


//TODO:
/*Don’t forget that, in reality, this code would have a number of error traps,
validating form inputs and catching errors in the save function. They’re omitted
here to highlight the main functionality of the code.*/
