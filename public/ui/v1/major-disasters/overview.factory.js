angular.module('SOS1819-app.majorDisastersApp')

.factory('MajorDisaster', function ($http, $q) {
	return {
		v1: {
			__apiUrl: '/api/v1/major-disasters',
			list: function (config) {
				var validKeys = ["from", "to", "offset", "limit", "inflation", "no-inflation", "death", "year", "country", "type", "event"];
				var search = {};
				for (var key in config) {
					if (validKeys.indexOf(key) > -1 && config[key] !== "" && config[key] != null)
						search[key] = config[key];
				}
					//console.log(search)
					return $http.get(this.__apiUrl + '/', { params: search
				    //offset: config.offset,
				    //limit: config.limit
				    //sort: config.sort,
				    //filter: config.filter
				    , cache: false });
				}, get: function (id) {
					return $http.get(this.__apiUrl + '/' + id, {cache: false});
				}, add: function (data) {
					var validKeys = ["inflation", "no-inflation", "death", "year", "country", "type", "event"];
					var validData = {};
					for (var key in data) {
						if (validKeys.indexOf(key) > -1 && data[key] !== "" && data[key] != null)
							validData[key] = data[key];
					}
					return $http.post(this.__apiUrl, validData);
				}, update: function (id, data) {
					var validKeys = ["inflation", "no-inflation", "death", "year", "country", "type", "event"];
					var validData = {};
					for (var key in data) {
						if (validKeys.indexOf(key) > -1 && data[key] !== "" && data[key] != null)
							validData[key] = data[key];
					}
					return $http.put(this.__apiUrl + '/' + id, validData);
				},
				remove: function (id) {
					return $http.delete(this.__apiUrl + '/' + id);
				},
				removeAll: function () {
					return $http.delete(this.__apiUrl);
				},
				populate: function () {
					return $http.get(this.__apiUrl + '/loadInitialData', {cache: false});
				}
			}, 
			v2: {
				__apiUrl: '/api/v2/major-disasters',
				count: function (config) {
					config = (config) ? config : {};
					var validKeys = ["from", "to","inflation", "no-inflation", "death", "year", "country", "type", "event"];
					var search = {};
					for (var key in config) {
						if (validKeys.indexOf(key) > -1 && config[key] !== "" && config[key] != null)
							search[key] = config[key];
					}
					return $http.get(this.__apiUrl + '/count', {cache: false, params: search});
				}
			}
		};
	})

.factory('PollutionStats', function ($http, $q) {
	return {
		__apiUrl: '/proxy/pollution-stats',
		list: function (config) {
			return $http.get(this.__apiUrl, {params: config});
		}
	};
})

.factory('SportsCenters', function ($http, $q) {
	return {
		__apiUrl: '/proxy/sports-centers',
		list: function (config) {
			return $http.get(this.__apiUrl, {params: config});
		}
	};
})

.factory('WeatherStats', function ($http, $q) {
	return {
		__apiUrl: '/proxy/awhere/weather',
		list: function (config) {
			return $http.get(this.__apiUrl, {params: config});
		}
	};
})

.factory('DonaldTrump', function ($http, $q) {
	return {
		__apiUrl: 'https://matchilling-tronald-dump-v1.p.rapidapi.com/random/quote',
		random: function () {
			var opt = {
				params: {},
				headers: {
					'Access-Control-Allow-Origin': "*", 
					'X-RapidAPI-Key': '749296e16emsh19b71465c3377a3p120f28jsn58424fc8ae24',
					"X-RapidAPI-Host": 'matchilling-tronald-dump-v1.p.rapidapi.com'
				}
			};
			return $http.get(this.__apiUrl, opt);
		}
	};
})

.factory('Dogs', function ($http, $q) {
	return {
		__apiUrl: 'https://dog.ceo/api/breeds/list/all',
		list: function () {
			return $http.get(this.__apiUrl);
		}
	};
})

.factory('Advice', function ($http, $q) {
	return {
		__apiUrl: 'https://api.adviceslip.com/advice/search/day',
		list: function () {
			return $http.get(this.__apiUrl);
		}
	};
})

.factory('Cities', function ($http, $q) {
	return {
		__apiUrl: 'https://api.openaq.org/v1/cities',
		list: function () {
			return $http.get(this.__apiUrl);
		}
	};
})

.factory('SocketIO', function () {
	var socket = io('/major-disasters');
	return socket;
});