/* global angular $scope */

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

var app = angular.module("SOS1819-app.Fronti");
app.controller("juan-fe-controller", function ($scope, $http, $q) {
    console.log("juan-fe-controller initialized!");
    $scope.url = "/api/v1/hurricanes";
    $scope.url2 = "/api/v2/hurricanes";

    $scope.pagination = {
        offset: 0,
        limit: 10
    };
    $scope.filter = {
        from: null,
        to: null
    };

    $scope.bodyEdit = {
        name: "",
        year: null,
        country: "",
        speed: null,
        damagesuntil2008: null
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
        var obj = JSON.parse(JSON.stringify($scope.filter));
        //var search = Object.assign(obj, $scope.pagination);
        var search = angular.merge(obj, $scope.pagination);
        $q.all([$http.get($scope.url,{params:search}), $http.get($scope.url2 + '/count',{params:search})]).then(function(responses){
            $scope.hurricanes = responses[0].data;
            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit);
            if (cb) cb();
        }).catch(function(response){
            window.alert("No se han obtenido los datos.");
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

    $scope.put = function () {
        var bdy = JSON.parse(JSON.stringify($scope.bodyEdit));


        $http.put($scope.url, bdy).then(function (response){
            //$scope.data = JSON.stringify(response.data, null, 2);
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
        $scope.filter.to = ($scope.filter.to) ? $scope
        .filter.to : null;
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
})

app.controller("juan-fe-edit-controller" ,function ($scope, $http, $q, dataToEdit,$location){
    
    
    console.log(dataToEdit);
    $scope.body = {
        name: dataToEdit.name,
        year: dataToEdit.year,
        country: dataToEdit.country,
        speed: parseFloat(dataToEdit.speed),
        damagesuntil2008: parseFloat(dataToEdit.damagesuntil2008),
        mbar: parseFloat(dataToEdit.mbar)
    };
    
    
     $scope.put = function () {
        var bdy = JSON.parse(JSON.stringify($scope.body));

        $http.put("/api/v1/hurricanes/"+ dataToEdit.name, bdy).then(function (response){
            //$scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
            if (response.status > 204) {
                window.alert('No se ha podido modificar el elemento');
            } else {
                    window.alert('Se ha modificado ' + dataToEdit.name);
                    $location.url("/hurricanes");
                }
        }).catch(function (response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        });
     };
     
     
     
    });







