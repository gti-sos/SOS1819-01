/*global angular*/
angular.module("SOS1819-app.Fronti",['SOS1819-app', 'ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/hurricanes', {
				controller: 'juan-fe-controller',
				templateUrl: '/ui/v1/hurricanes/index.html'
			})
			.when('/hurricanes/:name', {
				controller: 'juan-fe-edit-controller',
				templateUrl: '/ui/v1/hurricanes/edit.html',
				resolve: {dataToEdit:function($route,$http){
					return $http.get("/api/v1/hurricanes/"+$route.current.params.name).then(function(res){
            			return res.data;
        			});
				}}
			})
	});