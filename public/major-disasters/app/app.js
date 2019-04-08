angular.module('majorDisastersApp', ['ngRoute', "majorDisastersApp.miniPostman"])
	.config(function ($routeProvider) {
  		$routeProvider
			.when('/mini-postman', {
			        templateUrl: '/major-disasters/mini-postman/minipostman.template.pug',
			        controller: 'miniPostmanCtrl'
			      });
	})

	.run(function ($location) {
		$location.path('/mini-postman');
	});