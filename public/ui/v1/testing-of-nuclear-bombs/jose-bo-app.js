angular.module("SOS1819-app.Pema",["SOS1819-app", 'ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/testing-of-nuclear-bombs', {
				controller: 'PemaController',
				templateUrl: '/ui/v1/testing-of-nuclear-bombs/index.html'
			})
			.when('/testing-of-nuclear-bombs/:name', {
				controller: 'PemaEditController',
				templateUrl: '/ui/v1/testing-of-nuclear-bombs/edit.html',
				resolve:{ initialData: function($route, $http){
					 return $http.get("/api/v1/testing-of-nuclear-bombs/"+ $route.current.params.name).then(function(response){
					 	return response.data;
					 }).catch(function(response){
					 	return {};
					 });
				}
					
				}
			})
	});