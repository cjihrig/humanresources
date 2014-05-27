var async = require('async');
var express = require('express');
var connection = require('../lib/connection');
var employee = require('../models/employee');
var team = require('../models/team');
var router = express.Router();

router.get('/teams', function(req, res, next) {
  var retrieve = function(conn, callback) {
    var Employee = employee.getModel(conn);
    var Team = team.getModel(conn);

    Team.find().sort('name').populate('members').exec(function(error, results) {
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

    // Respond with valid data
    res.json({
      teams: results
    });
  });
});

module.exports = router;
