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

router.get('/teams/:teamId', function(req, res, next) {
  var retrieve = function(conn, callback) {
    var Employee = employee.getModel(conn);
    var Team = team.getModel(conn);
    var teamId = req.params.teamId;

    Team.findOne({
      _id: teamId
    }).populate('members').exec(function(error, results) {
      callback(error, conn, results);
    });
  };

  async.waterfall([
    connection.open,
    retrieve
  ], function(error, conn, results) {
    // Close connection first
    if (conn) {
      conn.close();
    }

    // Handle error
    if (error) {
      // TODO: Handle error
    }

    // If valid team was not found, send 404
    if (!results) {
      res.send(404);
    }

    // Respond with valid data
    res.json({
      team: results
    });

  });
});

module.exports = router;
