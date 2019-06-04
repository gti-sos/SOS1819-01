var app = angular.module("SOS1819-app.Fronti");
app.controller("juan-fe-controller", function($scope, $http, $q) {
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

    function refresh(cb) {
        var obj = JSON.parse(JSON.stringify($scope.filter));
        var search = angular.merge(obj, $scope.pagination);
        $q.all([
            $http.get($scope.url, {
                params: search
            }),
            $http.get($scope.url2 + '/count', {
                params: search
            })
        ]).then(function(responses) {
            $scope.hurricanes = responses[0].data;
            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit);
            if (cb) cb();
        }).catch(function(response) {
            console.log(response)
            window.alert("No se han obtenido los datos.");
        });
    }


    $scope.navigate = function(index) {
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

    $scope.post = function() {
        var bdy = JSON.parse(JSON.stringify($scope.body));

        $http.post($scope.url, bdy).then(function(response) {
            refresh(function() {
                window.alert('Se ha creado el elemento correctamente');
            });
        }).catch(function(response) {
            refresh(function() {
                window.alert('No se ha podido crear el elemento');
            });

        });
    };

    $scope.put = function() {
        var bdy = JSON.parse(JSON.stringify($scope.bodyEdit));


        $http.put($scope.url, bdy).then(function(response) {
            $scope.status = response.status + " " + response.statusText;
        }).catch(function(response) {
            $scope.status = response.status + " " + response.statusText;
        });
        refresh();
    };

    $scope.delete = function(hurricane) {
        $http.delete($scope.url + '/' + hurricane, hurricane).then(function(response) {
            if (response.status > 204) {
                window.alert('No se ha podido borrar el elemento')
            } else {
                refresh(function() {
                    window.alert('Se ha borrado ' + hurricane);
                });
            }
        }).catch(function(response) {
            window.alert('No se ha podido borrar el elemento, probablemente no exista');
            $scope.status = response.status + " " + response.statusText;
        });
    };
    $scope.filtra = function() {

        var filter = {};
        $scope.pagination.offset = 0;
        $scope.filter.from = ($scope.filter.from) ? $scope.filter.from : null;
        $scope.filter.to = ($scope.filter.to) ? $scope
            .filter.to : null;
        refresh();

    };
    $scope.borraTodo = function() {
        $http.delete($scope.url).then(function(response) {
            $scope.hurricanes = [];
            $scope.status = response.status + " " + response.statusText;
            window.alert('Se han borrado todos los elementos');
        }).catch(function(response) {
            $scope.status = response.status + " " + response.statusText;
            window.alert('Algo ha salido mal');
        });
        refresh();
    };

});


app.controller("juan-fe-edit-controller", function($scope, $http, $q, dataToEdit, $location) {
    $scope.body = {
        name: dataToEdit.name,
        year: dataToEdit.year,
        country: dataToEdit.country,
        speed: parseFloat(dataToEdit.speed),
        damagesuntil2008: parseFloat(dataToEdit.damagesuntil2008),
        mbar: parseFloat(dataToEdit.mbar)
    };


    $scope.put = function() {
        var bdy = JSON.parse(JSON.stringify($scope.body));

        $http.put("/api/v1/hurricanes/" + dataToEdit.name, bdy).then(function(response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
            if (response.status > 204) {
                window.alert('No se ha podido modificar el elemento');
            } else {
                window.alert('Se ha modificado ' + dataToEdit.name);
                $location.url("/hurricanes");
            }
        }).catch(function(response) {
            $scope.status = response.status + " " + response.statusText;
        });
    };
});