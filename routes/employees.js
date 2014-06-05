var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var router = express.Router();

router.get('/employees', function(req, res, next) {
  Employee.find().sort('name.last').exec(function(error, results) {
    if (error) {
      return next(error);
    }

    // Respond with valid data
    res.json(results);
  });
});

router.get('/employees/:employeeId', function(req, res, next) {
  Employee.findOne({
    id: req.params.employeeId
  }).populate('team').exec(function (error, results) {
    if (error) {
      return next(error);
    }

    // If valid user was not found, send 404
    if (!results) {
      res.send(404);
    }

    // Respond with valid data
    res.json(results);
  });
});

router.put('/employees/:employeeId', function (req, res, next) {
  delete req.body['_id'];
  req.body.team = req.body.team._id;

  Employee.update({
    id:req.params.employeeId
  }, req.body, function (error, data) {
    if (error) {
      return next(error);
    }
    res.send(200);
  });
});

module.exports = router;
