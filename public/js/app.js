'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource']);


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
    .when('/teams/:teamId', {
      templateUrl: 'team.html',
      controller: 'TeamCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);


app.factory('EmployeeService', ['$resource', function($resource) {
  return $resource('/employees/:employeeId');
}]);


app.factory('TeamService', ['$resource', function($resource) {
  return $resource('/teams/:teamId');
}]);


app.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.message = 'OK!';
}]);


app.controller('EmployeesCtrl', ['$scope', 'EmployeeService', function($scope, service) {
  service.query(function(data, headers) {
    $scope.employees = data;
  }, function(response) {
    // TODO: do something here... Probably just redirect to an error page
    console.log('%c ' + response, 'color:red');
  });
}]);


app.controller('EmployeeCtrl', ['$scope', '$routeParams', 'EmployeeService', function($scope, $routeParams, service) {
  service.get({
    employeeId: $routeParams.employeeId
  }, function(data, headers) {
    $scope.employee = data.employee;
  }, function(response) {
    // TODO: do something here... Probably just redirect to an error page
    console.log('%c ' + response, 'color:red');
  });
}]);


app.controller('TeamsCtrl', ['$scope', 'TeamService', function($scope, service) {
  service.query(function(data, headers) {
    $scope.teams = data;
  }, function(response) {
    // TODO: do something here... Probably just redirect to an error page
    console.log('%c ' + response, 'color:red');
  });
}]);


app.controller('TeamCtrl', ['$scope', '$routeParams', 'TeamService', function($scope, $routeParams, service) {
  service.get({
    teamId: $routeParams.teamId
  }, function(data, headers) {
    $scope.team = data.team;
  }, function(response) {
    // TODO: do something here... Probably just redirect to an error page
    console.log('%c ' + response, 'color:red');
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
