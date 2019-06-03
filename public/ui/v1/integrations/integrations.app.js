<<<<<<< HEAD
angular.module('SOS1819-app.integrations', ['ngRoute', 'SOS1819-app', 'SOS1819-app.majorDisastersApp'])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/integrations', {
		controller: 'integrationsCtrl',
		reloadOnSearch: true,
		templateUrl: '/ui/v1/integrations/integrations.template.html',
		resolve: {
			initialData: function ($http, MajorDisaster, Hurricanes, Dogs, Advice, TestingOfNuclearBombs, PollutionStats, SportsCenters, WeatherStats, DonaldTrump, $location, $q) {
				var initialData = {};
				var majorDisastersPromises = [
				MajorDisaster.v1.list({}), 
				MajorDisaster.v2.count({}),
				PollutionStats.list({}),
				SportsCenters.list({}),
				WeatherStats.list({}),
				DonaldTrump.random(),
				DonaldTrump.random(),
				DonaldTrump.random(),
				Dogs.list(),
				Advice.list()
				];

				var hurricanesPromises = [
				Hurricanes.get(),
				$http.get("/proxy/country-stats"),
				$http.get("/proxy/computers-attacks-stats"),
				$http.get("/proxy/poke"),
				$http.get("/proxy/got")
				];
				
				var bombsPromises = [
				TestingOfNuclearBombs.get(),
				$http.get("/proxy/youth-unemployment-stats"),
				$http.get("/proxy/emigrations-by-countries"),
				$http.get("/proxy/marcas-vehiculos"), 
				$http.get("/proxy/albums")
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
						],
						ext5: res[8].data,
						ext6: res[9].data
					};

				}).catch(function (res) {
					console.log('integrations.app.js majorDisastersInitialData exception on resolve', res);
					return {
						data: [], ext1: [], ext2: [], ext3: [], ext4: [], count: 0
					};
				});

				initialData.hurricanes = $q.all(hurricanesPromises).then(function (res) {
					return {
						data: res[0].data,
						ext1: res[1].data, 
						ext2: res[2].data, 
						ext3: res[3].data,
						ext4: res[4].data

					};
				}).catch(function (res) {
					console.log('integrations.app.js hurricanes exception on resolve', res);
					return {data: []};
				});

				initialData.bombs = $q.all(bombsPromises).then(function (res) {
					return {
						data: res[0].data,
						ext1: res[1].data,
						ext2: res[2].data,
						ext3: res[3].data,
						ext4: res[4].data
					};
				}).catch(function (res) {
					console.log('integrations.app.js bombs exception on resolve', res);
					return {data: []};
				});

				return $q.all(initialData);
			}
		}
	});
=======
angular.module('SOS1819-app.integrations', ['ngRoute', 'SOS1819-app', 'SOS1819-app.majorDisastersApp'])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/integrations', {
		controller: 'integrationsCtrl',
		reloadOnSearch: true,
		templateUrl: '/ui/v1/integrations/integrations.template.html',
		resolve: {
			initialData: function ($http, MajorDisaster, Hurricanes, Dogs, Advice, TestingOfNuclearBombs, PollutionStats, SportsCenters, WeatherStats, DonaldTrump, $location, $q) {
				var initialData = {};
				var majorDisastersPromises = [
				MajorDisaster.v1.list({}), 
				MajorDisaster.v2.count({}),
				PollutionStats.list({}),
				SportsCenters.list({}),
				WeatherStats.list({}),
				DonaldTrump.random(),
				DonaldTrump.random(),
				DonaldTrump.random(),
				Dogs.list(),
				Advice.list()
				];

				var hurricanesPromises = [
				Hurricanes.get(),
				$http.get("/proxy/country-stats"),
				$http.get("/proxy/computers-attacks-stats"),
				$http.get("/proxy/poke"),
				$http.get("/proxy/got")
				];
				
				var bombsPromises = [
				TestingOfNuclearBombs.get(),
				$http.get("/proxy/youth-unemployment-stats"),
				$http.get("/proxy/emigrations-by-countries"),
				$http.get("/proxy/marcas-vehiculos"), 
				$http.get("/proxy/albums")
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
						],
						ext5: res[8].data,
						ext6: res[9].data
					};

				}).catch(function (res) {
					console.log('integrations.app.js majorDisastersInitialData exception on resolve', res);
					return {
						data: [], ext1: [], ext2: [], ext3: [], ext4: [], count: 0
					};
				});

				initialData.hurricanes = $q.all(hurricanesPromises).then(function (res) {
					return {
						data: res[0].data,
						ext1: res[1].data, 
						ext2: res[2].data, 
						ext3: res[3].data,
						ext4: res[4].data

					};
				}).catch(function (res) {
					console.log('integrations.app.js hurricanes exception on resolve', res);
					return {data: []};
				});

				initialData.bombs = $q.all(bombsPromises).then(function (res) {
					return {
						data: res[0].data,
						ext1: res[1].data,
						ext2: res[2].data,
						ext3: res[3].data,
						ext4: res[4].data
					};
				}).catch(function (res) {
					console.log('integrations.app.js bombs exception on resolve', res);
					return {data: []};
				});

				return $q.all(initialData);
			}
		}
	});
<<<<<<< HEAD
>>>>>>> 040b1f86f33305247cc8d2b739fbbc14b27b82c5
})
=======
});
>>>>>>> 40ee60013ed1c8c89583f25a16c2d3cc62772737