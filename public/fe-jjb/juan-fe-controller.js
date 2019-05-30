/* global angular $scope */
var app = angular.module("MiniPostmanApp");
app.controller("MainCtrl", function ($scope,$http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/hurricanes";
    $scope.body = "";
    $scope.status = undefined;
    $scope.get = function (){
        $http.get($scope.url).then(function (response){
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        }).catch(function (response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        });
    };
    $scope.post = function () {
        var bdy = {};
        try {
            bdy = JSON.parse($scope.body);
        } catch (e) {
            alert(e);
        }

        $http.post($scope.url, bdy).then(function (response){
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        }).catch(function (response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        });
    };

    $scope.put = function () {
        var bdy = {};
        try {
            bdy = JSON.parse($scope.body);
        } catch (e) {
            alert(e);
        }

        $http.put($scope.url, bdy).then(function (response){
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        }).catch(function (response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        });
    };

    $scope.delete = function (){
        $http.delete($scope.url).then(function (response){
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        }).catch(function (response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        });
    };
    

});