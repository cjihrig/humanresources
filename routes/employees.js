var async = require('async');
var express = require('express');
var connection = require('../lib/connection');
var employee = require('../models/employee');
var router = express.Router();

router.get('/employees', function(req, res, next) {
  var retrieve = function(conn, callback) {
    var Employee = employee.getModel(conn);

    Employee.find().sort('name.last').exec(function(error, results) {
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
    res.json(results);
  });
});

router.get('/employees/:employeeId', function(req, res, next) {
  var retrieve = function(conn, callback) {
    var Employee = employee.getModel(conn);
    var employeeId = req.params.employeeId;

    Employee.findOne({
      id: employeeId
    }, function(error, results) {
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

    // If valid user was not found, send 404
    if (!results) {
      res.send(404);
    }

    // Respond with valid data
    res.json({
      employee: results
    });
  });
});

module.exports = router;
