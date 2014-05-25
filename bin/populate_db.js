var async = require('async');
var mongoose = require('mongoose');
var connection = require(process.cwd() + '/lib/connection');
var employee = require(process.cwd() + '/models/employee')

connection.open(function(error, conn) {
  var Employee = employee.getModel(conn);
  var data = {
    employees: [
      {
        id: '1000003',
        name: {
          first: 'Colin',
          last: 'Ihrig'
        },
        team: 'Software and Services Group'
      },
      {
        id: '1000021',
        name: {
          first: 'Adam',
          last: 'Bretz'
        },
        team: 'Project Development'
      }
    ]
  };

  var deleteEmployees = function(callback) {
    console.log('Deleting employees');
    Employee.remove({}, function(error, response) {
      if (error) {
        console.error('Error deleting employees: ' + error);
      }

      console.log('Done deleting employees');
      callback();
    });
  };

  var addEmployees = function(callback) {
    console.log('Adding employees');
    async.each(data.employees, function(emp, callback) {
      var employee = new Employee(emp);

      console.log('Adding employee ' + emp.id);
      employee.save(function(error) {
        if (error) {
          console.error('Error adding employee: ' + error);
        }

        callback();
      });
    }, function(error) {
      if (error) {
        console.error('Error: ' + error);
      }

      console.log('Done adding employees');
      callback();
    });
  };

  async.series([
    deleteEmployees,
    addEmployees
  ], function(error, results) {
    if (error) {
      console.error('Error: ' + error);
    }

    conn.close();
    console.log('Done!');
  });
});