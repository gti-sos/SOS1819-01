angular.module('SOS1819-app.integrations')

.factory('Hurricanes', function ($http) {
	return {
		__apiUrl: '/api/v1/hurricanes',
		get: function (config) {
			console.log(this)
			return $http.get(this.__apiUrl, {params: config});
		}
	};
})

.factory('TestingOfNuclearBombs', function ($http) {
	return {
		__apiUrl: '/api/v1/testing-of-nuclear-bombs',
		get: function (config) {
			return $http.get(this.__apiUrl, {params: config});
		}
	};
});