angular.module('majorDisastersApp.miniPostman')
	
	.factory('MajorDisaster', function ($http, $q) {
	    return {
	      apiUrl: '/api/v1/major-disasters',
	      list: function (config) {
	        return $http.get(this.apiUrl + '/', { params: {
	          offset: config.offset,
	          limit: config.limit
	          //sort: config.sort,
	          //filter: config.filter
	        }, cache: false });
	        //return deferred.promise;
	      },
	      count: function () {
	      	return $http.get(this.apiUrl + '/count');
	      },
	      get: function (id) {
	        return $http.get(this.apiUrl + '/' + id, {cache: false});
	      },
	      add: function (data) {
	        return $http.post(this.apiUrl, data);
	      },
	      addBad: function (id, data) {
		    return $http.post(this.apiUrl + '/' + id, data);
	      },
	      update: function (id, data) {
	        return $http.put(this.apiUrl + '/' + id, data);
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
	      }
	    };
	  });