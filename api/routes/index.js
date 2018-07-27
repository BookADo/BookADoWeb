const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET', //dont keep the secret in the code
  userProperty: 'payload'

});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
