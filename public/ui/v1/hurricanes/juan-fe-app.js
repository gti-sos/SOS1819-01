/*global angular*/
angular.module("SOS1819-app.Fronti",['SOS1819-app', 'ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/hurricanes', {
				controller: 'juan-fe-controller',
				templateUrl: '/ui/v1/hurricanes/index.html'
			});
	});