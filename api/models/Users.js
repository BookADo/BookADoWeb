const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt =
    crypto.randomBytes(16)
      .toString('hex');
  this.hash =
    crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
};

userSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
};

userSchema.methods.generateJwt = function(){

  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); //remove my secret from code
};

mongoose.model('User', userSchema);
