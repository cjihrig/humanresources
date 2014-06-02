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

router.put('/employees/:employeeId', function (req, res, next) {
  function update (conn, callback) {
    var Employee = employee.getModel(conn);

    // we can't update this because it's our primary key
    delete req.body['_id'];

    Employee.update({
      id:req.params.employeeId
    }, req.body, callback);
  }

  async.waterfall([
    connection.open,
    update
    ], function (error, conn, results) {
      console.log(error, conn, results)
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

    })


});

module.exports = router;
