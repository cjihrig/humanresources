var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var router = express.Router();

router.get('/employees', function(req, res, next) {
  Employee.find().sort('name.last').exec(function(error, results) {
    if (error) {
      // TODO: Handle error
    }

    // Respond with valid data
    res.json(results);
  });
});

router.get('/employees/:employeeId', function(req, res, next) {
  console.log(req.params.employeeId)
  Employee.findOne({
    id: req.params.employeeId
  }).populate('team').exec(function (error, results) {

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
