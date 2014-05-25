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
    }).otherwise({
      redirectTo: '/employees'
    });
}]);


app.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.message = 'OK!';
}]);


app.controller('EmployeesCtrl', ['$scope', '$http', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/employees'
  }).success(function(data, status, headers, config) {
    $scope.employees = data.employees;
  }).error(function(data, status, headers, config) {
    // TODO: Handle error
  });
}]);

app.controller('EmployeeCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $http({
    method: 'GET',
    url: '/employees/' + $routeParams.employeeId
  }).success(function(data, status, headers, config) {
    $scope.employee = data.employee;
  }).error(function(data, status, headers, config) {
    // TODO: Handle error
  });
}]);