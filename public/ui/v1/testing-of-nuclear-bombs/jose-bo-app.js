angular.module("SOS1819-app.Pema",["SOS1819-app", 'ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/testing-of-nuclear-bombs', {
				controller: 'PemaController',
				templateUrl: '/ui/v1/testing-of-nuclear-bombs/index.html'
			});
	});