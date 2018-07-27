const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Team = require('../models/Team.js');
 
// Get all team members
router.get('/', function(req, res, next) {
  Team.find(function (err, members) {
    if (err) return next(err);
    res.json(members);
  })
});

// Get team member by id
router.get('/:id', function(req, res, next) {
  Team.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// temp api to save team member
router.post('/', function(req, res, next) {
  Team.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
