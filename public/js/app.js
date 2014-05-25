'use strict';

var app = angular.module('app', ['ngRoute']);

app.controller('HomeCtrl', function($scope, $route, $routeParams, $location) {
  $scope.message = 'OK!';
});

app.config(function($routeProvider) {
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
    });;
});

app.controller('EmployeesCtrl', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/employees'
  }).success(function(data, status, headers, config) {
    $scope.employees = data.employees;
  }).error(function(data, status, headers, config) {
    // TODO: Handle error
  });
});

app.controller('EmployeeCtrl', function($scope, $routeParams, $http) {
  $http({
    method: 'GET',
    url: '/employees/' + $routeParams.employeeId
  }).success(function(data, status, headers, config) {
    $scope.employee = data.employee;
  }).error(function(data, status, headers, config) {
    // TODO: Handle error
  });
});