var app = angular.module("Pema");
app.controller("PemaController",function($scope,$http, $q){
    var url = "/api/v1/testing-of-nuclear-bombs";
    var url2 = "/api/v2/testing-of-nuclear-bombs";

    $scope.data=[];
    $scope.body={};
    $scope.filter={from:null,to:null};
    $scope.pagination={offset:0,limit:2}
    $scope.count = 0;
    
    
    $scope.get = function(){
        var obj = JSON.parse(JSON.stringify($scope.filter));
        var search = Object.assign(obj, $scope.pagination);
        $q.all([$http.get(url,{params:search}), $http.get(url2 + '/count',{params:search})]).then(function(responses){
            $scope.data = responses[0].data;
            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit)
        
        }).catch(function(response){
            window.alert("No se han obtenido los datos.")
        })
    }
    $scope.navigate = function(index){
        $scope.pagination.offset=index;
        $scope.get();
    }
    $scope.get();
    $scope.delete = function(name){
        $http.delete(url+"/"+name).then(function(response){
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
        }).catch(function(response){
            window.alert("No se ha encontrado el objeto a borrar.");
        })
    }
    
    $scope.post = function(){
        $http.post(url,$scope.body).then(function(response){
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
            $scope.body={};
        }).catch(function(response){
            if(response.status===409){
                window.alert("Ya existe el objeto."+ $scope.body.name);
            } else if (response.status===400){
                window.alert("Faltan campos por completar.");
            } else {
                window.alert("No se ha podido crear.");
            }
        })
    }
    $scope.put = function(){
        $http.put(url + "/"+ $scope.body.name,$scope.body).then(function(response){ 
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
            $scope.body={};
        }).catch(function(response){
            if(response.status===404){
                window.alert("No existe el objeto."+ $scope.body.name);
            } else if (response.status===400){
                window.alert("Faltan campos por completar.");
            } else {
                window.alert("No se ha podido modificar.");
            }
        })
    }
    $scope.deleteAll = function(){
        $http.delete(url).then(function(response){
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
        }).catch(function(response){
            window.alert("No se ha completado la operacion.");
        })
    }
})