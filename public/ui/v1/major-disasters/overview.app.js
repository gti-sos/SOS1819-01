angular.module('SOS1819-app.majorDisastersApp', ['ngRoute', 'SOS1819-app', 'ngDialog'])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/major-disasters', {
				controller: 'overviewCtrl',
				reloadOnSearch: false,
				templateUrl: '/ui/v1/major-disasters/overview.template.html',
				resolve: {
					initialData: function (MajorDisaster, $location) {
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
						var promises = [MajorDisaster.v1.list(filter), MajorDisaster.v2.count(filter)];
						return Promise.all(promises).then(function (res) {
							return {data: res[0].data, count: Math.ceil(res[1].data.count / filter.limit)};
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
			
			.when('/major-disasters/:disaster', {
				controller: 'overviewModItemCtrl',
				reloadOnSearch: false,
				templateUrl: '/ui/v1/major-disasters/overviewItem.template.html',
				resolve: {
					initialData: function (MajorDisaster, $location, $route) {
						console.log($route.current.params.disaster);
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
			
		});
	});