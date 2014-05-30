var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');
var employee = mongoose.model('Employee');
var team = mongoose.model('Team');

var Employee = employee;
var Team = team;
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
      name: 'Software and Services Group',
      members: [
        '1000003',
        '1000025'
      ]
    },
    {
      name: 'Project Development',
      members: [
        '1000021',
        '1000022',
        '1000030',
        '1000031'
      ]
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

      emp._id = employee._id;
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

var deleteTeams = function(callback) {
  console.log('Deleting teams');
  Team.remove({}, function(error, response) {
    if (error) {
      console.error('Error deleting teams: ' + error);
    }

    console.log('Done deleting teams');
    callback();
  });
};

var addTeams = function(callback) {
  console.log('Adding teams');
  async.each(data.teams, function(t, callback) {
    console.log('Adding team ' + t.name);
    t.members = t.members.map(function(employeeId) {
      var employee = data.employees.filter(function(employee) {
        return employee.id === employeeId;
      }).pop();

      return employee._id;
    });

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

    console.log('Done adding teams');
    callback();
  });
};

var updateEmployeeTeams = function(callback) {
  console.log('Updating employee teams');
  async.each(data.teams, function(t, callback) {

    Employee.update({
      _id: {
        $in: t.members
      }
    }, {
      team: t._id
    }, function(error, numberAffected, response) {
      if (error) {
        console.error('Error updating employe team: ' + error);
      }

      callback();
    });
  }, function(error) {
    if (error) {
      console.error('Error: ' + error);
    }

    console.log('Done updating employee teams');
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
