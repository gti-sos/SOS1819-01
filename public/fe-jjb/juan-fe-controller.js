/* global angular $scope */
var app = angular.module("MiniPostmanApp");
app.controller("MainCtrl", ["$scope","$http", function ($scope,$http){
    console.log("MainCtrl initialized!");
    $scope.url = "http://sos1819-01.herokuapp.com/api/v1/hurricanes";
                
    $scope.send = function (){
        $http.get($scope.url).then(function (response){
            $scope.data = JSON.stringify(response.data,null,2);
        });
    $scope.send = function (){
        $http.get($scope.url).then(function (response){
            $scope.data = JSON.stringify(response.data,null,2);
        });
    }
}]);