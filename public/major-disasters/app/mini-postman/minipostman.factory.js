angular.module('majorDisastersApp.miniPostman')
	
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
					console.log(search)
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
				}, addBad: function (id, data) {
				  return $http.post(this.__apiUrl + '/' + id, data);
				}, update: function (id, data) {
					var validKeys = ["inflation", "no-inflation", "death", "year", "country", "type", "event"];
					var validData = {};
					for (var key in data) {
						if (validKeys.indexOf(key) > -1 && data[key] !== "" && data[key] != null)
							validData[key] = data[key];
					}
				  return $http.put(this.__apiUrl + '/' + id, validData);
				},
				updateBad: function (data) {
					return $http.put(this.__apiUrl, data);
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
				},
			}
	      
	    };
	  });


	/*


	v2.
	*/