'use strict';

var app = angular.module('app', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    })
    .when('/employees', {
      templateUrl: 'employees.html',
      controller: 'EmployeesCtrl'
    })
    .when('/employees/:employeeId', {
      templateUrl: 'employee.html',
      controller: 'EmployeeCtrl'
    })
    .when('/teams', {
      templateUrl: 'teams.html',
      controller: 'TeamsCtrl'
    })
    .otherwise({
      redirectTo: '/employees'
    });
}]);


app.factory('EmployeeService', ['$http', function($http) {
  var exports = {};

  function _handleError(data, status, headers, config) {
    // TODO: do something here... Probably just redirect to an error page
    console.log('%c ' + JSON.stringify(data), 'color:red');
  }

  function getEmployees() {
    return $http({
      method: 'GET',
      url: '/employees'
    }).error(_handleError);
  }

  function getEmployee(id) {
    return $http({
      method: 'GET',
      url: '/employees/' + id
    }).error(_handleError);
  }

  function updateEmployee(id, employee) {
    return $http({
      method: 'PUT',
      url: '/employees/' + id,
      data: employee
    }).error(_handleError);
  }

  exports.list = getEmployees;
  exports.employee = getEmployee;
  exports.update = updateEmployee;

  return exports;

}]).factory('TeamService', ['$http', function($http) {
  var exports = {};

  function _handleError(data, status, headers, config) {
    // TODO: do something here... Probably just redirect to an error page
    console.log('%c ' + JSON.stringify(data), 'color:red');
  }

  function getTeams() {
    return $http({
      method: 'GET',
      url: '/teams'
    }).error(_handleError);
  }

  exports.list = getTeams;

  return exports;
}]);;

app.directive('imageFallback', function() {
  return {
    link: function(scope, elem, attrs) {
      elem.bind('error', function() {
        angular.element(this).attr('src', attrs.imageFallback);
      });
    }
  };
}).directive('editInLine', function ($compile) {

  function link (scope, element, attrs) {
    var template = '<div>';

    if (attrs.editType === 'select') {
      template += '<div ng-hide="editing">{{displayValue}}</div>';
      template += '<select ng-show="editing" ng-model="value" class="form-control" ng-options="o._id as o.name for o in _options"></select>';
    }
    else {
      template += '<div ng-hide="editing">{{value}}</div>';
      template += '<input ng-show="editing" type="text" class="form-control" ng-model="value">';
    }

    // close the outer div
    template += '</div>';

    element.html(template);

    $compile(element.contents())(scope);
  }

  var exports = {};

  exports.scope = {
    value: '=value',
    editing: '=editing',
    _options: '=options',
    displayValue: '=displayValue'
  };
  exports.restrict = 'E';
  exports.replace = true;
  exports.link = link;

  // exports.controller = function ($scope) {

  // }


  return exports;

});





app.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.message = 'OK!';
}]);


app.controller('EmployeesCtrl', ['$scope', 'EmployeeService', function($scope, service) {
  service.list().success(function(data, status, headers, config) {
    $scope.employees = data.employees;
  });
}]);


app.controller('EmployeeCtrl', ['$scope', '$routeParams', 'EmployeeService', 'TeamService', '$timeout', function($scope, $routeParams, Employee, Team, $timeout) {
  Employee.employee($routeParams.employeeId).success(function(data, status, headers, config) {
    $scope.employee = data.employee;
  });

  $scope.editing = false;
  $scope.teams = [];
  $timeout(function() {
    $scope.teams = [{
      name: 'Project Development',
      _id: '53849da49436c60000446d79'
    }, {
      name: 'Software and Services Group',
      _id: '53849da49436c60000446d75'
    }];
  }, 100);

  $scope.edit = function() {
    $scope.editing = !$scope.editing;
  };

  $scope.save = function() {
    Employee.update($routeParams.employeeId, $scope.employee).success(function(data, status) {
      $scope.editing = !$scope.editing;
    });
  };

}]);


app.controller('TeamsCtrl', ['$scope', 'TeamService', function($scope, service) {
  service.list().success(function(data, status, headers, config) {
    $scope.teams = data.teams;
  });
}]);
