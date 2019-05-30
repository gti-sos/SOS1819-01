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
    
            var chart = new EJSC.Chart("myChart9a", {show_legend: false, title: 'DoughnutSeries'} );
    
        chart.addSeries(new EJSC.DoughnutSeries(
            new EJSC.ArrayDataHandler( [
                [4,"Widgets"], [12,"Doodads"], [3,"Thingamagigs"],
                [7,"Whatchamacallits"], [5,"Gizmos"]
            ] ), {  
                opacity: 30, //default: 50
                doughnutOffset: .2, //default: .5
                position: "topRight", //default: "center"
                height: "50%", //default: "100%"
                width: "50%" //default: "100%"
            }            
        ) );
        chart.addSeries(new EJSC.DoughnutSeries(
            new EJSC.ArrayDataHandler( [
                [12,"Widgets"], [1,"Doodads"], [4,"Thingamagigs"],
                [2,"Whatchamacallits"], [9,"Gizmos"]
            ] ), {  
                opacity: 80, //default: 50
                doughnutOffset: .7, //default: .5
                position: "bottomLeft", //default: "center"
                height: "70%", //default: "100%"
                width: "70%", //default: "100%"
                  onAfterDataAvailable:function(chart, series){
                      chart.selectPoint(series.__points[0], true);
                  }
        
            }            
        ) );        

});