/* global angular $scope */
var app = angular.module("Fronti");
app.controller("juan-fe-controller", function ($scope,$http, $q) {
    console.log("juan-fe-controller initialized!");
    $scope.url = "/api/v1/hurricanes";
    $scope.pagination = {
        offset: 0,
        limit: 10
    };
    $scope.filter = {
        from: null,
        to: null
    };
    //$scope.count = 0;

    refresh();
/*
    $http.get('/api/v2/hurricanes/count', $scope.pagination).then(function (response) {
        console.log(response)
    }).catch(function (response) {
        console.log(response)

    });
*/
    function refresh(cb){
        var searchObj = {
          offset: $scope.pagination.offset,
          limit: $scope.pagination.limit
        };
        console.log('refresh', Object.assign(searchObj, $scope.filter), searchObj);
        var promises = [$http.get($scope.url, {params: searchObj}), $http.get('/api/v2/hurricanes/count', {params:searchObj})];
        $q.all(promises).then(function (responses) {
            $scope.hurricanes = responses[0].data;

            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit);
            if (cb) cb();

        }).catch(function (responses) {
            $scope.hurricanes = responses[0].data;
            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit);
            if (cb) cb();
        });
        
    }
    
    $scope.navigate = function (index) {
        $scope.pagination.offset = index;
        refresh();
    };

    $scope.body = {
        name: "",
        year: null,
        country: "",
        speed: null,
        damagesuntil2008: null
    };


    //$scope.get = function (){
    //    $http.get($scope.url).then(function (response){
    //        $scope.data = JSON.stringify(response.data, null, 2);
    //        $scope.status = response.status + " " + response.statusText;
    //    }).catch(function (response) {
    //        $scope.data = JSON.stringify(response.data, null, 2);
    //        $scope.status = response.status + " " + response.statusText;
    //    });
    //};
    $scope.post = function () {
        var bdy = JSON.parse(JSON.stringify($scope.body));

        $http.post($scope.url, bdy).then(function (response){
            //$scope.data = JSON.stringify(response.data, null, 2);
            //$scope.status = response.status + " " + response.statusText;
            refresh(function () {
                window.alert('Se ha creado el elemento correctamente');
            });
        }).catch(function (response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
            //$scope.status = response.status + " " + response.statusText;
            refresh(function () {
                window.alert('No se ha podido crear el elemento');
            });
 
        });
    };
    
    $scope.load = function (item) {
        $scope.body = item;
    }

    $scope.put = function () {
        var bdy = {};
        try {
            bdy = $scope.body;
        } catch (e) {
            return alert(e);
        }

        $http.put($scope.url + '/' + bdy.name, bdy).then(function (response){
            //$scope.data = JSON.stringify(response.data, null, 2);
            window.alert(bdy.name+' modificado.')
            $scope.status = response.status + " " + response.statusText;
        }).catch(function (response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        });
        refresh();
    };

    $scope.delete = function (hurricane){
        $http.delete($scope.url + '/' + hurricane, hurricane).then(function (response){
            if (response.status > 204) {
                window.alert('No se ha podido borrar el elemento')
            } else {
                refresh(function () {
                    window.alert('Se ha borrado ' + hurricane);
                });
            }
            //$scope.data = response.data;
            //$scope.status = response.status + " " + response.statusText;
        }).catch(function (response) {
            //$scope.data = response.data;
            window.alert('No se ha podido borrar el elemento, probablemente no exista');
            $scope.status = response.status + " " + response.statusText;
        });
    };
    //TODO
    $scope.filtra= function() {

        var filter = {};
        $scope.pagination.offset = 0;
        $scope.filter.from = ($scope.filter.from) ? $scope.filter.from : null;
        $scope.filter.to = ($scope.filter.to) ? $scope.filter.to : null;
        refresh();
        //if ($scope.filter.from) filter.from = from;
       // if ($scope.filter.to) filter.to = to;
    /*
        var promises = [$http.get($scope.url, {params: $scope.filter}), $http.get('/api/v2/hurricanes/count', {params:filter})];
        $q.all(promises).then(function (responses) {
            $scope.hurricanes = responses[0].data;
            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit);

        }).catch(function (responses) {
            $scope.hurricanes = responses[0].data;
            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit);
        });*/
/*
        $http.get($scope.url, {params: filter}).then(function (response){
            $scope.hurricanes = response.data;
            //$scope.status = response.status + " " + response.statusText;
        }).catch(function (response) {
            window.alert('Se ha producido un error al filtrar por fechas')
            $scope.hurricanes = response.data;
            //$scope.status = response.status + " " + response.statusText;
        });*/
    };
    $scope.borraTodo= function(){
         $http.delete($scope.url).then(function (response){
            $scope.hurricanes = [];
            $scope.status = response.status + " " + response.statusText;
            window.alert('Se han borrado todos los elementos');
        }).catch(function (response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
            window.alert('Algo ha salido mal');
        });
        refresh();
    };
});