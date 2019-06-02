angular.module('SOS1819-app.integrations', ['ngRoute', 'SOS1819-app', 'SOS1819-app.majorDisastersApp'])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/integrations', {
		controller: 'integrationsCtrl',
		reloadOnSearch: true,
		templateUrl: '/ui/v1/integrations/integrations.template.html',
		resolve: {
			initialData: function (MajorDisaster, Hurricanes, TestingOfNuclearBombs, PollutionStats, SportsCenters, WeatherStats, DonaldTrump, $location, $q) {
				var initialData = {};
				var majorDisastersPromises = [
					MajorDisaster.v1.list({}), 
					MajorDisaster.v2.count({}),
					PollutionStats.list({}),
					SportsCenters.list({}),
					WeatherStats.list({}),
					DonaldTrump.random(),
					DonaldTrump.random(),
					DonaldTrump.random()
				];

				var hurricanesPromises = [
					Hurricanes.get()
				];
				
				var bombsPromises = [
					TestingOfNuclearBombs.get()
				];
				
				initialData.disasters = $q.all(majorDisastersPromises).then(function (res) {
					return {
						data: res[0].data, 
						ext1: res[2].data, 
						ext2: res[3].data, 
						ext3: res[4].data, 
						ext4: [
						res[5].data, 
						res[6].data, 
						res[7].data
						]
					};

				}).catch(function (res) {
					console.log('integrations.app.js majorDisastersInitialData exception on resolve', res);
					return {
						data: [], ext1: [], ext2: [], ext3: [], ext4: [], count: 0
					};
				});

				initialData.hurricanes = $q.all(hurricanesPromises).then(function (res) {
					return {
						data: res[0].data
					};
				}).catch(function (res) {
					console.log('integrations.app.js hurricanes exception on resolve', res);
					return {data: []};
				});

				initialData.bombs = $q.all(bombsPromises).then(function (res) {
					return {
						data: res[0].data
					};
				}).catch(function (res) {
					console.log('integrations.app.js bombs exception on resolve', res);
					return {data: []};
				});

				return $q.all(initialData);
			}
		}
	});
});