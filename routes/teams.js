var express = require('express');
var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var router = express.Router();

router.get('/teams', function(req, res, next) {
  Team.find().sort('name').populate('members').exec(function(error, results) {
    // Handle error
    if (error) {
      // TODO: Handle error
    }

    // Respond with valid data
    res.json(results);

  });
});

module.exports = router;
