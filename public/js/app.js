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
    .otherwise({
      redirectTo: '/employees'
    });
}]);


app.factory('EmployeeService', ['$resource', function($resource) {
  return $resource('/employees/:employeeId');
}]);


app.factory('TeamService', ['$resource', function($resource) {
  return $resource('/teams/:teamId');
}]);

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
      template += '<select ng-show="editing" ng-model="value" class="form-control" ng-options="o.name for o in _options"></select>';
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
  service.query(function(data, headers) {
    $scope.employees = data;
  }, function(response) {
    // TODO: do something here... Probably just redirect to an error page
    console.log('%c ' + response, 'color:red');
  });
}]);


app.controller('EmployeeCtrl', ['$scope', '$routeParams', 'EmployeeService', 'TeamService', function($scope, $routeParams, service, team) {
  service.get({
    employeeId: $routeParams.employeeId
  }).$promise.then(function (data) {
  $scope.employee = data.employee;

  team.query().$promise.then(function (data) {
    $scope.teams = data;
    $scope.employee.team = data[0];
  });

 });

  $scope.editing = false;
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
  $scope.teams = service.query();
}]);
