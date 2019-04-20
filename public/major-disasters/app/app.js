angular.module('majorDisastersApp', ['ngRoute', "majorDisastersApp.miniPostman", "majorDisastersApp.overview"])
	.config(function ($routeProvider) {
  		$routeProvider
			
			.when('/mini-postman', {
			    templateUrl: '/ui/v1/major-disasters/mini-postman/minipostman.template.pug',
			    controller: 'miniPostmanCtrl'
			})
			.when('/overview', {
				templateUrl: '/ui/v1/major-disasters/overview/overview.template.pug',
				controller: 'overviewCtrl',
				resolve: {
					initialData: function (MajorDisaster) {
						var pagination = {offset: 0, limit: 10, count: 0};
						var promises = [MajorDisaster.v1.list(pagination), MajorDisaster.v2.count()];
						return Promise.all(promises).then(function (res) {
							pagination.count = Math.ceil(res[1].data.count / pagination.limit);
							return {data: res[0].data, pagination: pagination};
						}).catch(function (res) {
							//console.log(res);
							return {data: [], pagination: pagination};
						});
					}
				}
			})
			.when('/', {redirectTo: "/overview"});
	});
/*
	.run(function ($location) {
		$location.path('/oveview');
	});
	*/