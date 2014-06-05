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
  return $resource('/employees/:employeeId', {}, {
    update: {
      method: 'PUT'
    }
  });
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


app.controller('EmployeeCtrl', ['$scope', '$routeParams', 'EmployeeService', 'TeamService', '$q',
  function($scope, $routeParams, employee, team, $q) {

    function getTeam (teams, teamId) {
      for (var i = teams.length - 1; i >= 0; i--) {
        var t = teams[i];
        if (t._id === teamId) {
          return t;
        }
      }
    }

  $q.all([
    employee.get({
      employeeId: $routeParams.employeeId
    }).$promise,
    team.query().$promise
  ]).then(function(values) {
    $scope.teams = values[1];
    $scope.employee = values[0].employee;
    $scope.employee.team = getTeam($scope.teams, $scope.employee.team._id);
  });

  $scope.editing = false;
  $scope.edit = function() {
    $scope.editing = !$scope.editing;
  };

  $scope.save = function() {
    employee.update({
      employeeId: $routeParams.employeeId
    }, $scope.employee, function() {
      $scope.editing = !$scope.editing;
    });
  };

}]);


app.controller('TeamsCtrl', ['$scope', 'TeamService', function($scope, service) {
  $scope.teams = service.query();
}]);
