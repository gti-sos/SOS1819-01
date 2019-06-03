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
    
     //console.log(EJSC);
    
    var v1=1;
    var v2=1;
    var v3=1;
    var v4=2;
    $scope.url = "/api/v1/hurricanes";
    $scope.url2 = "/api/v2/hurricanes";

    var countryStats = [];
    var dataExt1 = [];

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
        $q.all([$http.get($scope.url,{params:search}), $http.get($scope.url2 + '/count',{params:search}), $http.get("/proxy/country-stats")]).then(function(responses){
            $scope.hurricanes = responses[0].data;
            countryStats = responses[2].data;
            cuentadanos();
            fium();
            mapa();
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
    
 
    function cuentadanos(){
        v1=0;
        v2=0;
        v3=0;
        v4=0;
        
        $scope.hurricanes.forEach(function(e){
            if(parseInt(e.damagesuntil2008)<25)
                v1++;
            else if(parseInt(e.damagesuntil2008)<50)
                v2++;
            else if(parseInt(e.damagesuntil2008)<75)
                v3++;
            else if(parseInt(e.damagesuntil2008)<100)
                v4++;
        });
        console.log("v1="+v1);
    
     var chart = new EJSC.Chart("myChart9a", {show_legend: true, title: 'Damages-until-2008'} );
    
 //   cuentadanos();
    
        chart.addSeries(new EJSC.DoughnutSeries(
            new EJSC.ArrayDataHandler( [
                [v1,"0-25 Millones"], [v2,"26-50 Millones"], [v3,"51-75 Millones"],
                [v4,"+75 Millones"]
            ] ), {  
                opacity: 80, //default: 50
                doughnutOffset: .5, //default: .5
                position: "center", //default: "center"
                height: "100%", //default: "100%"
                width: "100%" //default: "100%"
            }            
        ) );
    }
    
    function fium(){
        var v=0;
        var i=0;
        var o=0;
        
        $scope.hurricanes.forEach(function(e){
            v= v +parseInt(e.speed);
            i++;
        });
      //  console.log("speed="+v);
        v=v/i;
    //    console.log("i="+i);
     //   console.log("medium speed="+v);
        i=0;
        
        Highcharts.chart('fium', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: 'speed'
    },

    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 300,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'km/h'
        },
        plotBands: [{
            from: 0,
            to: 200,
            color: '#55BF3B' // green
        }, {
            from: 200,
            to: 250,
            color: '#DDDF0D' // yellow
        }, {
            from: 250,
            to: 300,
            color: '#DF5353' // red
        }]
    },

    
    series: [{
        name: 'speed',
        data: [v],
        tooltip: {
            valueSuffix: ' km/h '
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            
            //console.log("Value of o = ", o)    
            if(o==0){
            var point = chart.series[0].points[0],
                newVal,
                inc = -5;

            newVal = point.y + inc;
           // console.log("entra1");
            point.update(newVal);
            
            o++;    
            }else if(o==1){
                var point = chart.series[0].points[0],
                newVal,
                inc = 5;

            newVal = point.y + inc;
            
           // console.log("entra2"+o);
            point.update(newVal);
            
            o++;
            }else if(o==2){
                var point = chart.series[0].points[0],
                newVal,
                inc = 5;

            newVal = point.y + inc;

            point.update(newVal);
         //   console.log("entra3"+o);
            o++;
            }else{
                var point = chart.series[0].points[0],
                newVal,
                inc = -5;

            newVal = point.y + inc;

            point.update(newVal);
            
            o=0;}

        }, 100);
            
    }
    }
);
    }

    function mapa(){
        
        
        google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var auxdat={};
        var auxdat2={};
        var aux=[];
        var dataMapa=[];
        dataMapa.push(['Country', 'Damages']);
        
        $scope.hurricanes.forEach(function(e){
            
            var exist = auxdat2[e.country];
            if (exist) {
           // if(aux.includes(e.Country)){
                auxdat2[e.country] += e.damagesuntil2008;
                }
            else {
                    auxdat2[e.country] = e.damagesuntil2008;
                
                }
        });
        for (var key in auxdat2) {
                dataMapa.push([key, auxdat2[key]]);
            }
        var data = google.visualization.arrayToDataTable(dataMapa);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }
    }
    
})

app.controller("juan-fe-edit-controller" ,function ($scope, $http, $q, dataToEdit,$location){
    
    
   // console.log(dataToEdit);
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








