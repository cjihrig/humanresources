app.controller('EmployeesCtrl', ['$scope', 'EmployeeService', function($scope, service) {
	service.query(function(data, headers) {
		$scope.employees = data;
	}, _handleError);
}]);

app.controller('EmployeeCtrl', ['$scope', '$routeParams', 'EmployeeService', 'TeamService', '$q', 'config', '$route',
	function($scope, $routeParams, employee, team, $q, config, $route) {

		$scope.address = {};

		function getTeam (teams, teamId) {
			for (var i = 0, l = teams.length; i < l; ++i) {
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
		$scope.employee = values[0];
		$scope.employee.team = getTeam($scope.teams, $scope.employee.team._id);
	}).catch(_handleError);

	$scope.editing = false;
	// to prevent multiple refereces to the same array, give us a new copy of it.
	$scope.states = config.states.slice(0);

	$scope.edit = function() {
		$scope.editing = !$scope.editing;
	};

	$scope.save = function() {
		//to prevent empty lines geting to the database and also to keep the UI clean
		// remove any blank lines
		var lines = $scope.employee.address.lines;

		if (lines.length) {
			lines = lines.filter(function (value) {
				return value;
			});
		}

		$scope.employee.address.lines = lines;

		employee.update({
			employeeId: $routeParams.employeeId
		}, $scope.employee, function() {
			$scope.editing = !$scope.editing;
		});
	};

	$scope.cancel = function () {
		$route.reload();
	}

	$scope.address.addLine = function (index) {
		var lines = $scope.employee.address.lines;

		lines.splice(index + 1, 0, '');
	}

	$scope.address.removeLine = function (index) {
		var lines = $scope.employee.address.lines;

		lines.splice(index, 1);
	}
}]);
