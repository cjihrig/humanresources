var express = require('express');
var router = express.Router();

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

router.get('/employees', function(req, res, next) {
  res.json({
    employees: data.employees
  });
});

router.get('/employees/:employeeId', function(req, res, next) {
  var employeeId = req.params.employeeId;
  var employee = (data.employees.filter(function(employee) {
        if (employee.id === employeeId) {
          return true;
        }

        return false;
      }) || [])[0];

  res.json({
    employee: employee
  });
});

module.exports = router;
