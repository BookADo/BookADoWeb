const mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
  name: String,
  headline: String,
  email: String,
  about: String,
  social: {
    github: String,
    facebook: String,
    linked: String,
    twitter: String
  },
});

module.exports = mongoose.model('Team', TeamSchema);
