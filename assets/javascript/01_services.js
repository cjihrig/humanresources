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
