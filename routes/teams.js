var express = require('express');
var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var router = express.Router();

router.get('/teams', function(req, res, next) {
  Team.find().sort('name').populate('members').exec(function(error, results) {
    if (error) {
      return next(error);
    }

    // Respond with valid data
    res.json(results);
  });
});

router.get('/teams/:teamId', function(req, res, next) {
  Team.findOne({
    _id: req.params.teamId
  }).populate('members').exec(function(error, results) {
    if (error) {
      return next(error);
    }

    // If valid team was not found, send 404
    if (!results) {
      res.send(404);
    }

    // Respond with valid data
    res.json(results);
  });
});

module.exports = router;
