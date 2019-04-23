angular.module('majorDisastersApp.overview', ['ngRoute', 'majorDisastersApp', 'majorDisastersApp.miniPostman', 'ngDialog'])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/overview', {
				controller: 'overviewCtrl',
				reloadOnSearch: false,
				templateUrl: '/ui/v1/major-disasters/overview/overview.template.pug',
				resolve: {
					initialData: (MajorDisaster, $location) => {
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
					autoLoad: ($location, MajorDisaster) => {
						if (!$location.hash()) return null;
						else return $location.hash();
						/*
						return MajorDisaster.v1.get($location.hash()).then(function (res) {
							return res;
						}).catch(function (res) {
							return res;
						});
						*/
					}
				}
			});
			/*
			.when('/overview/:disaster', {
				controller: 'overviewModItemCtrl',
				reloadOnSearch: false,
				templateUrl: '/ui/v1/major-disasters/overview/overview.template.pug',
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
					},
	
	
					autoLoad: function (MajorDisaster, $route) {
						return MajorDisaster.v1.get($route.current.params.disaster).then(function (res) {
							console.log(res, 'asd')
							return res;
						}).catch(function (res) {
							console.log(res);
							return res;
						});
						//return MajorDisaster.get($routeParams.disaster);
						//return MajorDisaster.v1.get()
						//var pagination = {offset: 0, limit: 10, count: 0};
						//var promises = [MajorDisaster.v1.list(pagination), MajorDisaster.v2.count()];
						//return Promise.all(promises).then(function (res) {
						//	pagination.count = Math.ceil(res[1].data.count / pagination.limit);
						//	return {data: res[0].data, pagination: pagination};
						//}).catch(function (res) {
						//	//console.log(res);
						//	return {data: [], pagination: pagination};
						//});
					}
				}
		})	*/
	});