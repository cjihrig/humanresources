var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');

var data = {
  employees: [
    {
      id: '1000003',
      name: {
        first: 'Colin',
        last: 'Ihrig'
      },
      image: 'images/employees/1000003.png'
    },
    {
      id: '1000021',
      name: {
        first: 'Adam',
        last: 'Bretz'
      }
    },
    {
      id: '1000022',
      name: {
        first: 'Matt',
        last: 'Liegey'
      }
    },
    {
      id: '1000025',
      name: {
        first: 'Aleksey',
        last: 'Smolenchuk'
      },
      image: 'images/employees/1000025.png' /* invalid image */
    },
    {
      id: '1000030',
      name: {
        first: 'Sarah',
        last: 'Gay'
      }
    },
    {
      id: '1000031',
      name: {
        first: 'Dave',
        last: 'Beshero'
      }
    }
  ],
  teams: [
    {
      name: 'Software and Services Group'
    },
    {
      name: 'Project Development'
    }
  ]
};

var deleteEmployees = function(callback) {
  console.info('Deleting employees');
  Employee.remove({}, function(error, response) {
    if (error) {
      console.error('Error deleting employees: ' + error);
    }

    console.info('Done deleting employees');
    callback();
  });
};

var addEmployees = function(callback) {
  console.info('Adding employees');
  async.each(data.employees, function(emp, callback) {
    var employee = new Employee(emp);

    console.info('Adding employee ' + emp.id);
    employee.save(function(error) {
      if (error) {
        console.error('Error adding employee: ' + error);
      }

      emp._id = employee._id;
      callback();
    });
  }, function(error) {
    if (error) {
      console.error('Error: ' + error);
    }

    console.info('Done adding employees');
    callback();
  });
};

var deleteTeams = function(callback) {
  console.info('Deleting teams');
  Team.remove({}, function(error, response) {
    if (error) {
      console.error('Error deleting teams: ' + error);
    }

    console.info('Done deleting teams');
    callback();
  });
};

var addTeams = function(callback) {
  console.info('Adding teams');
  async.each(data.teams, function(t, callback) {
    console.info('Adding team ' + t.name);

    var team = new Team(t);

    team.save(function(error) {
      if (error) {
        console.error('Error adding team: ' + error);
      }

      t._id = team._id;
      callback();
    });
  }, function(error) {
    if (error) {
      console.error('Error: ' + error);
    }

    console.info('Done adding teams');
    callback();
  });
};

var updateEmployeeTeams = function (callback) {
  console.info('Updating employee teams');
  var team = data.teams[0];

  // Set everyone to be on the same team to start  
  Employee.update({}, {
    team: team._id
  }, {
    multi: true
  }, function (error, numberAffected, response) {
    if (error) {
      console.error('Error updating employe team: ' + error);
    }

    console.info('Done updating employee teams');
    callback();
  });
};


async.series([
  deleteEmployees,
  deleteTeams,
  addEmployees,
  addTeams,
  updateEmployeeTeams
], function(error, results) {
  if (error) {
    console.error('Error: ' + error);
  }

  mongoose.connection.close();
  console.log('Done!');
});
