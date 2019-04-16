angular.module('majorDisastersApp', ['ngRoute', "majorDisastersApp.miniPostman", "majorDisastersApp.overview"])
	.config(function ($routeProvider) {
  		$routeProvider
			
			.when('/mini-postman', {
			    templateUrl: '/major-disasters/mini-postman/minipostman.template.pug',
			    controller: 'miniPostmanCtrl'
			})
			.when('/overview', {
				templateUrl: '/major-disasters/overview/overview.template.pug',
				controller: 'overviewCtrl'
			})
			.when('/', {
				redirectTo: "/overview"
			});
	});
/*
	.run(function ($location) {
		$location.path('/oveview');
	});
	*/