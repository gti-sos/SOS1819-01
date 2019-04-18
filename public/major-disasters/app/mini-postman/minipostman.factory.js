angular.module('majorDisastersApp.miniPostman')
	
	.factory('MajorDisaster', function ($http, $q) {
	    return {
	      apiUrl: '/api/v1/major-disasters',
	      list: function (config) {
	        var validKeys = ["from", "to", "offset", "limit", "inflation", "no-inflation", "death", "year", "country", "type", "event"];
	        var search = {};
	        for (var key in config) {
	        	if (validKeys.indexOf(key) > -1 && config[key])
	        		search[key] = config[key];
	        }
	      	console.log(search)
	        return $http.get(this.apiUrl + '/', { params: search
	          //offset: config.offset,
	          //limit: config.limit
	          //sort: config.sort,
	          //filter: config.filter
	        , cache: false });
	        //return deferred.promise;
	      },
	      count: function (config) {
	      	config = (config) ? config : {};
	      	var validKeys = ["from", "to","inflation", "no-inflation", "death", "year", "country", "type", "event"];
	      	var search = {};
	      	for (var key in config) {
	      		if (validKeys.indexOf(key) > -1 && config[key])
	      			search[key] = config[key];
	      	}
	      	return $http.get(this.apiUrl + '/count', {cache: false, params: search});
	      },
	      get: function (id) {
	        return $http.get(this.apiUrl + '/' + id, {cache: false});
	      },
	      add: function (data) {
	      	var validKeys = ["inflation", "no-inflation", "death", "year", "country", "type", "event"];
	      	var validData = {};
	      	for (var key in data) {
	      		if (validKeys.indexOf(key) > -1 && data[key])
	      			validData[key] = data[key];
	      	}
	        return $http.post(this.apiUrl, validData);
	      },
	      addBad: function (id, data) {
		    return $http.post(this.apiUrl + '/' + id, data);
	      },
	      update: function (id, data) {
	      	var validKeys = ["inflation", "no-inflation", "death", "year", "country", "type", "event"];
	      	var validData = {};
	      	for (var key in data) {
	      		if (validKeys.indexOf(key) > -1 && data[key])
	      			validData[key] = data[key];
	      	}
	        return $http.put(this.apiUrl + '/' + id, validData);
	      },
	      updateBad: function (data) {
	      	return $http.put(this.apiUrl, data);
	      },
	      remove: function (id) {
	        return $http.delete(this.apiUrl + '/' + id);
	      },
	      removeAll: function () {
	        return $http.delete(this.apiUrl);
	      },
	      populate: function () {
	      	return $http.get(this.apiUrl + '/loadInitialData', {cache: false});
	      },
	    };
	  });