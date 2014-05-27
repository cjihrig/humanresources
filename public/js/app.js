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
    .otherwise({
      redirectTo: '/employees'
    });
}]);


app.factory('EmployeeService', ['$http', '$resource', function($http, $resource) {
  return $resource('/employees/:employeeId');
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


app.directive('imageFallback', function() {
  return {
    link: function(scope, elem, attrs) {
      elem.bind('error', function() {
        angular.element(this).attr('src', attrs.imageFallback);
      });
    }
  };
});
