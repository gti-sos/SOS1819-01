var app = angular.module("SOS1819-app.Pema");
app.controller("PemaController", function ($scope,$http, $q){
    var url = "/api/v1/testing-of-nuclear-bombs";
    var url2 = "/api/v2/testing-of-nuclear-bombs";

    $scope.data=[];
    $scope.body={};
    $scope.filter={from:null,to:null};
    $scope.pagination={offset:0,limit:10}
    $scope.count = 0;
    
    
    $scope.get = function(){
        var obj = JSON.parse(JSON.stringify($scope.filter));
        //var search = Object.assign(obj, $scope.pagination);
        var search = angular.merge(obj, $scope.pagination);
        $q.all([$http.get(url,{params:search}), $http.get(url2 + '/count',{params:search})]).then(function(responses){
            $scope.data = responses[0].data;
            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit);
            
            
            
            
/////////////////////////////////////////////VISUALIZACION///////////////////////////////////////////////////////////

            var aux = {};
            var dataGraf = [];
        
            for (var i = 0; i<$scope.data.length;i++){
                var object = $scope.data[i];
                var exist = aux[object.country];
                if(exist){
                    aux[object.country] += object.shot;
                } else {
                    aux[object.country] = object.shot;
                }
            }
            
            for (var key in aux) {
                dataGraf.push([key, aux[key]]);
            }

            // create a chart
            chart = anychart.area();

            // create an area series and set the data
            var series = chart.area(dataGraf);
    
            // set the chart title
            chart.title("Shot for Countries");

            // set the titles of the axes
            chart.xAxis().title("Countries");
            chart.yAxis().title("Shot");

            // set the container id
            chart.container("migraf");

            // initiate drawing the chart
            chart.draw();
            
            
            var aux2 = {};
            var dataGraf2 = [];
        
            for (var i = 0; i<$scope.data.length;i++){
                var object2 = $scope.data[i];
                var exist = aux2[object.country];
                if(exist){
                    aux2[object2.country] += object2.maxYield;
                } else {
                    aux2[object2.country] = object2.maxYield;
                }
            }
            
            for (var key in aux2) {
                dataGraf2.push({ name:key , y:aux2[key]});
            }
            
            Highcharts.chart('migraf2', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Carga explosiva usada por cada pais.'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'MaxYields',
                    colorByPoint: true,
                    data: dataGraf2
                }]
            });
            
            var aux3 = {};
            var dataGraf3 = [];
            dataGraf3.push(['Country', 'HOB']);
            
        
            for (var i = 0; i<$scope.data.length;i++){
                var object3 = $scope.data[i];
                var exist = aux3[object3.country];
                if(exist){
                    aux3[object3.country] += 1;
                } else {
                    aux3[object3.country] = 1;
                }
            }
            
            for (var key in aux3) {
                dataGraf3.push([key, aux3[key]]);
            }
            
            google.charts.load('current', {
                'packages':['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyDKWisx0-8N-R7YqB2bbzYrjCwwTFBkTZ4'
              });
              google.charts.setOnLoadCallback(drawRegionsMap);
        
              function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable(dataGraf3);
        
                var options = {};
        
                var chart = new google.visualization.GeoChart(document.getElementById('migraf3'));
        
                chart.draw(data, options);
              }
        
        
//////////////////////////////////////////FINAL VISUALIZACIÓN//////////////////////////////////////////////////        
        
        
        }).catch(function(response){
            window.alert("No se han obtenido los datos.");
        });
    };
    $scope.navigate = function(index){
        $scope.pagination.offset = index;
        $scope.get();
    };
    $scope.get();
    $scope.delete = function(name){
        $http.delete(url + "/" + name).then(function (response) {
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
        }).catch(function(response){
           window.alert("No se ha encontrado el objeto a borrar.");
        });
    };
    
    $scope.post = function(){
        $http.post(url,$scope.body).then(function (response) {
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
        });
    };
    $scope.put = function(){
        $http.put(url + "/"+ $scope.body.name,$scope.body).then(function (response) { 
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
        });
    };
    $scope.deleteAll = function(){
        $http.delete(url).then(function (response){
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
        }).catch(function(response){
            window.alert("No se ha completado la operacion.");
        });
        
    };
    
});





app.controller("PemaEditController", function ($scope,$http, $q, initialData,$location){
    console.log(initialData);
    var url = "/api/v1/testing-of-nuclear-bombs";
    var url2 = "/api/v2/testing-of-nuclear-bombs";
    
    $scope.body={name:initialData.name,country:initialData.country,year:parseFloat(initialData.year),maxYield:parseFloat(initialData.maxYield),
        shot:parseFloat(initialData.shot),hob:parseFloat(initialData.hob)};
    
    $scope.put = function(){
        $http.put(url + "/"+ $scope.body.name,$scope.body).then(function (response) { 
            //$scope.get();
            window.alert("La operacion ha sido realizada con exito.");
            $scope.body={};
            $location.url("/testing-of-nuclear-bombs");
        }).catch(function(response){
            if(response.status===404){
                window.alert("No existe el objeto."+ $scope.body.name);
            } else if (response.status===400){
                window.alert("Faltan campos por completar.");
            } else {
                window.alert("No se ha podido modificar.");
            }
        });
    };
    
});