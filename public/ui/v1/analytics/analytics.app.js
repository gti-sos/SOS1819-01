angular.module('SOS1819-app.analytics', ['ngRoute', 'SOS1819-app', 'SOS1819-app.majorDisastersApp', 'SOS1819-app.integrations'])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/analytics', {
		controller: 'analyticsCtrl',
		reloadOnSearch: true,
		templateUrl: '/ui/v1/analytics/analytics.template.html',
		resolve: {
			initialData: function (MajorDisaster, Hurricanes, TestingOfNuclearBombs, $location, $q) {
				var initialData = {};
				var majorDisastersPromises = [MajorDisaster.v1.list({})];
				var hurricanesPromises = [Hurricanes.get()];
				var bombsPromises = [TestingOfNuclearBombs.get()];
				
				initialData.disasters = $q.all(majorDisastersPromises).then(function (res) {
					return {data: res[0].data};
				}).catch(function (res) {
					console.log('analytics.app.js majorDisastersInitialData exception on resolve', res);
					return {data: []};
				});

				initialData.hurricanes = $q.all(hurricanesPromises).then(function (res) {
					return {data: res[0].data};
				}).catch(function (res) {
					console.log('analytics.app.js hurricanes exception on resolve', res);
					return {data: []};
				});

				initialData.bombs = $q.all(bombsPromises).then(function (res) {
					return {data: res[0].data};
				}).catch(function (res) {
					console.log('analytics.app.js bombs exception on resolve', res);
					return {data: []};
				});
				return $q.all(initialData);
			}
		}
	});
});