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

  exports.list = getEmployees;
  exports.employee = getEmployee;

  return exports;

}])


app.factory('TeamService', ['$http', function($http) {
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
}]);


app.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.message = 'OK!';
}]);


app.controller('EmployeesCtrl', ['$scope', 'EmployeeService', function($scope, service) {
  service.list().success(function(data, status, headers, config) {
    $scope.employees = data.employees;
  });
}]);


app.controller('EmployeeCtrl', ['$scope', '$routeParams', 'EmployeeService', function($scope, $routeParams, service) {
  service.employee($routeParams.employeeId).success(function(data, status, headers, config) {
    $scope.employee = data.employee
  });
}]);


app.controller('TeamsCtrl', ['$scope', 'TeamService', function($scope, service) {
  service.list().success(function(data, status, headers, config) {
    $scope.teams = data.teams;
  });
}]);


app.directive('imageFallback', function() {
  return {
    link: function(scope, elem, attrs) {
      elem.bind('error', function() {
        angular.element(this).attr('src', attrs.imageFallback);
      });
    }
  };
});
