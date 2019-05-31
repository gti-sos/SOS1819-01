angular.module('SOS1819-app.majorDisastersApp', ['ngRoute', 'SOS1819-app', 'ngDialog', 'chart.js'])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/major-disasters', {
				controller: 'overviewCtrl',
				reloadOnSearch: false,
				templateUrl: '/ui/v1/major-disasters/overview.template.html',
				resolve: {
					initialData: function (MajorDisaster, PollutionStats, SportsCenters, $location, $q) {
						var searchObj = $location.search();
						var filter = {
							offset: parseInt(searchObj.offset) || 0,
							limit: parseInt(searchObj.limit) || 10,
							event: searchObj.event || null,
							year: parseInt(searchObj.year) || null,
							death: parseInt(searchObj.death) || null, 
							inflation: parseFloat(searchObj.inflation) || null, 
							"no-inflation": parseFloat(searchObj['no-inflation']) || null, 
							type: searchObj.type || null, 
							country: searchObj.country || null,
							from: parseInt(searchObj.from) || null,
							to: parseInt(searchObj.to) || null	
						};
						var promises = [MajorDisaster.v1.list(filter), 
										MajorDisaster.v2.count(filter),
										PollutionStats.list({}),
										SportsCenters.list({})];
						return $q.all(promises).then(function (res) {
							console.log(res)
							return {data: res[0].data, ext1: res[2].data, ext2: res[3].data, count: Math.ceil(res[1].data.count / filter.limit)};
						}).catch(function (res) {
							return {data: [], count: Math.ceil(res[1].data.count / filter.limit)};
						});
					},
					autoLoad: function ($location, MajorDisaster) {
						if (!$location.hash()) return null;
						else return $location.hash();
					}
				}
			})

			.when('/major-disasters/live', {
				controller: 'overviewLiveGraphCtrl',
				templateUrl: '/ui/v1/major-disasters/overviewLive.template.html',
				resolve: {
					initialData: function (MajorDisaster) {
						return MajorDisaster.v1.list().then(function (res) {
							return res;
						}).catch(function (res) {
							return [];
						});
						
					}
				}
			})

			.when('/major-disasters/:disaster', {
				controller: 'overviewModItemCtrl',
				reloadOnSearch: false,
				templateUrl: '/ui/v1/major-disasters/overviewItem.template.html',
				resolve: {
					initialData: function (MajorDisaster, $location, $route) {
						var promise = MajorDisaster.v1.get($route.current.params.disaster);
						return promise.then(function (res) {
							console.log('success', res);
							return {data: res.data, operation: 'modify'};
						}).catch(function (res) {
							//window.alert('No se ha encontrado ' + $route.current.params.disaster);
							return $location.url("/major-disasters");
						});
					}
				}
			})
	});