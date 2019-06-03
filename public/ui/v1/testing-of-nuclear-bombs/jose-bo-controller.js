var app = angular.module("SOS1819-app.Pema");
app.controller("PemaController", function($scope, $http, $q) {
    var url = "/api/v1/testing-of-nuclear-bombs";
    var url2 = "/api/v2/testing-of-nuclear-bombs";

    $scope.data = [];
    $scope.body = {};
    $scope.filter = { from: null, to: null };
    $scope.pagination = { offset: 0, limit: 100 }
    $scope.count = 0;
    var dataExt = [];
    var dataExt1 = [];
    var dataExt2 = [];
    var dataExt3 = [];

    $scope.get = function() {
        var obj = JSON.parse(JSON.stringify($scope.filter));
        //var search = Object.assign(obj, $scope.pagination);
        var search = angular.merge(obj, $scope.pagination);
        $q.all([
            $http.get(url, { params: search }),
            $http.get(url2 + '/count', { params: search }), 
            $http.get("/proxy/youth-unemployment-stats"),
            $http.get("/proxy/emigrations-by-countries"),
            $http.get("/proxy/marcas-vehiculos"), 
            $http.get("/proxy/albums")
        ]).then(function(responses) {
            $scope.data = responses[0].data;
            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit);
            dataExt = responses[2].data;
            dataExt1 = responses[3].data;
            dataExt2 = responses[4].data;
            dataExt3 = responses[5].data;

            /////////////////////////////////////////////VISUALIZACION///////////////////////////////////////////////////////////

            function view1(id, data) {
                var aux = {};
                var dataGraf = [];

                for (var i = 0; i < data.length; i++) {
                    var object = data[i];
                    var exist = aux[object.country];
                    if (exist) {
                        aux[object.country] += object.shot;
                    }
                    else {
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


                //Configurar tooltip
                chart.tooltip().title("Shot for Countries");
                chart.tooltip().format("Countries: {%categoryName} \n Shot: {%value}");
                // set the container id
                chart.container(id);

                // initiate drawing the chart
                chart.draw();
            }

            function view2(id, data) {
                var aux2 = {};
                var dataGraf2 = [];

                for (var i = 0; i < data.length; i++) {
                    var object2 = data[i];
                    var exist = aux2[object2.country];
                    if (exist) {
                        aux2[object2.country] += object2.maxYield;
                    }
                    else {
                        aux2[object2.country] = object2.maxYield;
                    }
                }

                for (var key in aux2) {
                    dataGraf2.push({ name: key, y: aux2[key] });
                }

                Highcharts.chart(id, {
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
            }

            function view3(id, data) {
                var aux3 = {};
                var dataGraf3 = [];
                dataGraf3.push(['Country', 'NPruebas']);


                for (var i = 0; i < data.length; i++) {
                    var object3 = data[i];
                    var exist = aux3[object3.country];
                    if (exist) {
                        aux3[object3.country] += 1;
                    }
                    else {
                        aux3[object3.country] = 1;
                    }
                }

                for (var key in aux3) {
                    dataGraf3.push([key, aux3[key]]);
                }

                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable(dataGraf3);

                    var options = {};

                    var chart = new google.visualization.GeoChart(document.getElementById(id));

                    chart.draw(data, options);
                }

            }

            function view4(id, data, dataExt) {
                var aux = {};
                var dataGraf = [];

                for (var i = 0; i < data.length; i++) {
                    var object = data[i];
                    var exist = aux[object.country];
                    if (exist) {
                        aux[object.country] += object.shot;
                    }
                    else {
                        aux[object.country] = object.shot;
                    }
                }

                for (var key in aux) {
                    dataGraf.push([key, aux[key]]);
                }
                var aux4 = {};
                var dataGraf4 = [];

                for (var i = 0; i < dataExt.length; i++) {
                    var object4 = dataExt[i];
                    if (object4.year == 2017) {
                        var exist = aux4[object4.country];
                        if (!exist) {
                            aux4[object4.country] = object4.youth_unemployment;
                        }
                    }

                }
                for (var key in aux4) {
                    dataGraf4.push([key, aux4[key]]);
                }

                dataGraf4 = dataGraf4.concat(dataGraf);

                // create a chart
                chart = anychart.bar();

                // create a bar series and set the data
                var series = chart.bar(dataGraf4);

                // set the chart title
                chart.title("Integración entre API testing y unemployment.");

                // set the titles of the axes
                chart.xAxis().title("País");
                chart.yAxis().title("Paro y Proyectiles");

                //Configurar tooltip
                chart.tooltip().title("Countries");
                chart.tooltip().format("Countries: {%categoryName} \n Paro y Proyectiles: {%value}");
                // set the container id
                chart.container(id);

                // initiate drawing the chart
                chart.draw();
            }

            function view5(id, data, dataExt) {
                var aux2 = {};
                var dataGraf2 = [];

                for (var i = 0; i < data.length; i++) {
                    var object2 = data[i];
                    var exist = aux2[object2.country];
                    if (exist) {
                        aux2[object2.country] += object2.maxYield;
                    }
                    else {
                        aux2[object2.country] = object2.maxYield;
                    }
                }

                for (var key in aux2) {
                    dataGraf2.push({ name: key, y: aux2[key] });
                }
                var dataGraf5 = [];

                for (var i = 0; i < dataExt1.length; i++) {
                    var object5 = dataExt1[i];
                    var exist = dataGraf5[object5.country];
                    if (!exist) {
                        dataGraf5.push([object5.country, object5.totalemigrant])
                    }


                    dataGraf5 = dataGraf5.concat(dataGraf2);

                }
                // Set up the chart
                Highcharts.chart(id, {
                    chart: {
                        type: 'pyramid3d',
                        options3d: {
                            enabled: true,
                            alpha: 10,
                            depth: 50,
                            viewDistance: 50
                        }
                    },
                    title: {
                        text: 'Integración entre las API testing y emigrations'
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b> ({point.y:,.0f})',
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                                allowOverlap: true,
                                x: 10,
                                y: -5
                            },
                            width: '60%',
                            height: '80%',
                            center: ['50%', '45%']
                        }
                    },
                    series: [{
                        name: 'Emigrantes y Carga explosiva',
                        data: dataGraf5
                    }]
                });
            }

            function view6(id, data, dataExt) {
                var dataGraf6 = [];

                for (var i = 0; i < dataExt.length; i++) {
                    if (i >= data.length)
                        break;
                    var object6 = dataExt[i];
                    dataGraf6.push([object6.nome, parseInt(object6.codigo), data[i].shot]);

                }

                Highcharts.chart(id, {

                    chart: {
                        type: 'variwide'
                    },

                    title: {
                        text: 'Integración Api externa 1'
                    },

                    xAxis: {
                        type: 'category',
                        title: {
                            text: 'Nombre Vehiculos'
                        }
                    },

                    legend: {
                        enabled: false
                    },

                    series: [{
                        name: 'Labor Costs',
                        data: dataGraf6,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.0f}'
                        },
                        tooltip: {
                            pointFormat: 'Codigo: <b> {point.y}</b><br>' +
                                'Proyectiles: <b> {point.z} </b><br>'
                        },
                        colorByPoint: true
                    }]

                });
            }

            function view7(id, data, dataExt) {
                var dataGraf7 = [];
                var dataGraf71 = [];
                var dataGraf72 = [];
                for (var i = 0; i < dataExt.length; i++) {
                    if (i >= data.length)
                        break;
                    var object7 = dataExt[i];
                    dataGraf7.push(object7.name);
                    dataGraf71.push(object7.albums);
                    dataGraf72.push(data[i].shot);

                }

                var myChart44 = echarts.init(document.getElementById(id));
                var option = {
                    xAxis: {
                        type: 'category',
                        data: dataGraf7
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: dataGraf71,
                        type: 'line'
                    }, {
                        data: dataGraf72,
                        type: 'line'
                    }]
                };
                myChart44.setOption(option);

            }




            //////////////////////////////////////////FINAL VISUALIZACIÓN//////////////////////////////////////////////////        


        }).catch(function(response) {
            console.log(response);
            window.alert("No se han obtenido los datos.");
        });
    };
    $scope.navigate = function(index) {
        $scope.pagination.offset = index;
        $scope.get();
    };
    $scope.get();
    $scope.delete = function(name) {
        $http.delete(url + "/" + name).then(function(response) {
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
        }).catch(function(response) {
            window.alert("No se ha encontrado el objeto a borrar.");
        });
    };

    $scope.post = function() {
        $http.post(url, $scope.body).then(function(response) {
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
            $scope.body = {};
        }).catch(function(response) {
            if (response.status === 409) {
                window.alert("Ya existe el objeto." + $scope.body.name);
            }
            else if (response.status === 400) {
                window.alert("Faltan campos por completar.");
            }
            else {
                window.alert("No se ha podido crear.");
            }
        });
    };
    $scope.put = function() {
        $http.put(url + "/" + $scope.body.name, $scope.body).then(function(response) {
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
            $scope.body = {};
        }).catch(function(response) {
            if (response.status === 404) {
                window.alert("No existe el objeto." + $scope.body.name);
            }
            else if (response.status === 400) {
                window.alert("Faltan campos por completar.");
            }
            else {
                window.alert("No se ha podido modificar.");
            }
        });
    };
    $scope.deleteAll = function() {
        $http.delete(url).then(function(response) {
            $scope.get();
            window.alert("La operacion ha sido realizada con exito.");
        }).catch(function(response) {
            window.alert("No se ha completado la operacion.");
        });

    };

});





app.controller("PemaEditController", function($scope, $http, $q, initialData, $location) {
    console.log(initialData);
    var url = "/api/v1/testing-of-nuclear-bombs";
    var url2 = "/api/v2/testing-of-nuclear-bombs";

    $scope.body = {
        name: initialData.name,
        country: initialData.country,
        year: parseFloat(initialData.year),
        maxYield: parseFloat(initialData.maxYield),
        shot: parseFloat(initialData.shot),
        hob: parseFloat(initialData.hob)
    };

    $scope.put = function() {
        $http.put(url + "/" + $scope.body.name, $scope.body).then(function(response) {
            //$scope.get();
            window.alert("La operacion ha sido realizada con exito.");
            $scope.body = {};
            $location.url("/testing-of-nuclear-bombs");
        }).catch(function(response) {
            if (response.status === 404) {
                window.alert("No existe el objeto." + $scope.body.name);
            }
            else if (response.status === 400) {
                window.alert("Faltan campos por completar.");
            }
            else {
                window.alert("No se ha podido modificar.");
            }
        });
    };

});
