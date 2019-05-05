angular.module('SOS1819-app', ['ngRoute', "SOS1819-app.majorDisastersApp", "SOS1819-app.Pema", "SOS1819-app.Fronti"])
	.config(function ($routeProvider) {
  		$routeProvider
			/*
			.when('/overview', {
				templateUrl: '/ui/v1/major-disasters/overview/overview.template.pug',
				controller: 'overviewCtrl',
				resolve: {
					initialData: function (MajorDisaster) {
						console.log('resolving');
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
			*/
			.when('/', {redirectTo: "/about"});
	});

angular.module('SOS1819-app').controller('navCtrl', function ($scope, $location) {
	$scope.$on('$locationChangeSuccess', function($event, next, current) { 
		$scope.activeUrl = $location.url();
	 });
});