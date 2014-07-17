app.controller('TeamsCtrl', ['$scope', 'TeamService', function($scope, service) {
	service.query(function (data) {
		$scope.teams = data;
	}, _handleError);
}]);

app.controller('TeamCtrl', ['$scope', '$routeParams', 'TeamService', function($scope, $routeParams, service) {
	service.get({
		teamId: $routeParams.teamId
	}, function(data, headers) {
		$scope.team = data;
	}, _handleError);
}]);
