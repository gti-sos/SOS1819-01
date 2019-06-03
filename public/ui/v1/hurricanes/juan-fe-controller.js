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
app.controller("juan-fe-controller", function($scope, $http, $q) {
    console.log("juan-fe-controller initialized!");

    //console.log(EJSC);

    var v1 = 1;
    var v2 = 1;
    var v3 = 1;
    var v4 = 2;
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
    function refresh(cb) {
        var obj = JSON.parse(JSON.stringify($scope.filter));
        //var search = Object.assign(obj, $scope.pagination);
        var search = angular.merge(obj, $scope.pagination);
        $q.all([$http.get($scope.url, {
            params: search
        }), $http.get($scope.url2 + '/count', {
            params: search
        }), $http.get($scope.url), $http.get("/proxy/country-stats")]).then(function(responses) {
            $scope.hurricanes = responses[0].data;
            $scope.hurricanes2 = responses[2].data;
            countryStats = responses[3].data;
            cuentadanos();
            fium();
            mapa();
            cstats();
            $scope.count = Math.ceil(responses[1].data.count / $scope.pagination.limit);
            if (cb) cb();
        }).catch(function(response) {
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


    //$scope.get = function (){
    //    $http.get($scope.url).then(function (response){
    //        $scope.data = JSON.stringify(response.data, null, 2);
    //        $scope.status = response.status + " " + response.statusText;
    //    }).catch(function (response) {
    //        $scope.data = JSON.stringify(response.data, null, 2);
    //        $scope.status = response.status + " " + response.statusText;
    //    });
    //};
    $scope.post = function() {
        var bdy = JSON.parse(JSON.stringify($scope.body));

        $http.post($scope.url, bdy).then(function(response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
            //$scope.status = response.status + " " + response.statusText;
            refresh(function() {
                window.alert('Se ha creado el elemento correctamente');
            });
        }).catch(function(response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
            //$scope.status = response.status + " " + response.statusText;
            refresh(function() {
                window.alert('No se ha podido crear el elemento');
            });

        });
    };

    $scope.put = function() {
        var bdy = JSON.parse(JSON.stringify($scope.bodyEdit));


        $http.put($scope.url, bdy).then(function(response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        }).catch(function(response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
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
            //$scope.data = response.data;
            //$scope.status = response.status + " " + response.statusText;
        }).catch(function(response) {
            //$scope.data = response.data;
            window.alert('No se ha podido borrar el elemento, probablemente no exista');
            $scope.status = response.status + " " + response.statusText;
        });
    };
    //TODO
    $scope.filtra = function() {

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
    $scope.borraTodo = function() {
        $http.delete($scope.url).then(function(response) {
            $scope.hurricanes = [];
            $scope.status = response.status + " " + response.statusText;
            window.alert('Se han borrado todos los elementos');
        }).catch(function(response) {
            //$scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
            window.alert('Algo ha salido mal');
        });
        refresh();
    };


    function cuentadanos() {
        v1 = 0;
        v2 = 0;
        v3 = 0;
        v4 = 0;

        $scope.hurricanes2.forEach(function(e) {
            if (parseInt(e.damagesuntil2008) < 25)
                v1++;
            else if (parseInt(e.damagesuntil2008) < 50)
                v2++;
            else if (parseInt(e.damagesuntil2008) < 75)
                v3++;
            else if (parseInt(e.damagesuntil2008) < 100)
                v4++;
        });
        console.log("v1=" + v1);

        var chart = new EJSC.Chart("myChart9a", {
            show_legend: true,
            title: 'Damages-until-2008'
        });

        //   cuentadanos();
        var data2 = $scope.hurricanes2.map(function(e) {
            return [e.damagesuntil2008, e.name];
        })

        chart.addSeries(new EJSC.DoughnutSeries(
            new EJSC.ArrayDataHandler(data2), {
                opacity: 30, //default: 50
                doughnutOffset: .2, //default: .5
                position: "topRight", //default: "center"
                height: "50%", //default: "100%"
                width: "50%" //default: "100%"
            }
        ));
        chart.addSeries(new EJSC.DoughnutSeries(
            new EJSC.ArrayDataHandler([
                [v1, "0-25 Millones"],
                [v2, "26-50 Millones"],
                [v3, "51-75 Millones"],
                [v4, "+75 Millones"]
            ]), {
                opacity: 80, //default: 50
                doughnutOffset: .5, //default: .5
                position: "bottomLeft", //default: "center"
                height: "70%", //default: "100%"
                width: "70%" //default: "100%"
            }
        ));
    }

    function fium() {
        var v = 0;
        var i = 0;
        var o = 0;

        $scope.hurricanes.forEach(function(e) {
            v = v + parseInt(e.speed);
            i++;
        });
        //  console.log("speed="+v);
        v = v / i;
        //    console.log("i="+i);
        //   console.log("medium speed="+v);
        i = 0;

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
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
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
            function(chart) {
                if (!chart.renderer.forExport) {
                    setInterval(function() {

                        //console.log("Value of o = ", o)    
                        if (o == 0) {
                            var point = chart.series[0].points[0],
                                newVal,
                                inc = -5;

                            newVal = point.y + inc;
                            // console.log("entra1");
                            point.update(newVal);

                            o++;
                        } else if (o == 1) {
                            var point = chart.series[0].points[0],
                                newVal,
                                inc = 5;

                            newVal = point.y + inc;

                            // console.log("entra2"+o);
                            point.update(newVal);

                            o++;
                        } else if (o == 2) {
                            var point = chart.series[0].points[0],
                                newVal,
                                inc = 5;

                            newVal = point.y + inc;

                            point.update(newVal);
                            //   console.log("entra3"+o);
                            o++;
                        } else {
                            var point = chart.series[0].points[0],
                                newVal,
                                inc = -5;

                            newVal = point.y + inc;

                            point.update(newVal);

                            o = 0;
                        }

                    }, 100);

                }
            }
        );
    }

    function mapa() {


        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var hur = {};
            var auxdat2 = {};
            var aux = [];
            var dataMapa = [
                ['Country', 'Damages', 'Hurricanes']
            ];

            $scope.hurricanes.forEach(function(e) {
                var country = e.country;
                var exist = auxdat2[country];
                e.damagesuntil2008 = parseFloat(e.damagesuntil2008);

                if (exist) {
                    // if(aux.includes(e.Country)){
                    //auxdat2[country].damages += e.damagesuntil2008;
                    //auxdat2[country] = {damages: e.damagesuntil2008, hurricanes: ""}
                    auxdat2[country].damages += e.damagesuntil2008;
                    auxdat2[country].hurricanes += 1 //e.name + "\n\r";

                } else {
                    auxdat2[country] = {
                        damages: e.damagesuntil2008,
                        hurricanes: 2
                    }
                    //auxdat2[country] = e.damagesuntil2008;

                }
            });

            for (var key in auxdat2) {
                dataMapa.push([key, auxdat2[key].damages, auxdat2[key].hurricanes]);
            }
            var data = google.visualization.arrayToDataTable(dataMapa);
            var options = {};

            var chartM = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chartM.draw(data, options);
        }
    }

    function cstats() {
        console.log(echarts)
        //app.title = 'POP VS DMG';
        //    var data2 
        
            var data = $scope.hurricanes.map(function(e, i){
                return [
                    parseInt(e.speed),
                    parseInt(e.mbar),
                    countryStats[i].population,
                    e.country,
                    '2016'
                ];
            });
        console.log(data)
        // var dat=countryStats{}
        var myChart2 = echarts.init(document.getElementById("supernenaazul"));
        
        /*data = data0[
            [
                [28604, 77, 17096869, 'Australia', 1990],
                [31163, 77.4, 27662440, 'Canada', 1990],
                [1516, 68, 1154605773, 'China', 1990],
                [13670, 74.7, 10582082, 'Cuba', 1990],
                [28599, 75, 4986705, 'Finland', 1990],
                [29476, 77.1, 56943299, 'France', 1990],
                [31476, 75.4, 78958237, 'Germany', 1990],
                [28666, 78.1, 254830, 'Iceland', 1990],
                [1777, 57.7, 870601776, 'India', 1990],
                [29550, 79.1, 122249285, 'Japan', 1990],
                [2076, 67.9, 20194354, 'North Korea', 1990],
                [12087, 72, 42972254, 'South Korea', 1990],
                [24021, 75.4, 3397534, 'New Zealand', 1990],
                [43296, 76.8, 4240375, 'Norway', 1990],
                [10088, 70.8, 38195258, 'Poland', 1990],
                [19349, 69.6, 147568552, 'Russia', 1990],
                [10670, 67.3, 53994605, 'Turkey', 1990],
                [26424, 75.7, 57110117, 'United Kingdom', 1990],
                [37062, 75.4, 252847810, 'United States', 1990]
            ],
            [
                [44056, 81.8, 23968973, 'Australia', 2015],
                [43294, 81.7, 35939927, 'Canada', 2015],
                [13334, 76.9, 1376048943, 'China', 2015],
                [21291, 78.5, 11389562, 'Cuba', 2015],
                [38923, 80.8, 5503457, 'Finland', 2015],
                [37599, 81.9, 64395345, 'France', 2015],
                [44053, 81.1, 80688545, 'Germany', 2015],
                [42182, 82.8, 329425, 'Iceland', 2015],
                [5903, 66.8, 1311050527, 'India', 2015],
                [36162, 83.5, 126573481, 'Japan', 2015],
                [1390, 71.4, 25155317, 'North Korea', 2015],
                [34644, 80.7, 50293439, 'South Korea', 2015],
                [34186, 80.6, 4528526, 'New Zealand', 2015],
                [64304, 81.6, 5210967, 'Norway', 2015],
                [24787, 77.3, 38611794, 'Poland', 2015],
                [23038, 73.13, 143456918, 'Russia', 2015],
                [19360, 76.5, 78665830, 'Turkey', 2015],
                [38225, 81.4, 64715810, 'United Kingdom', 2015],
                [53354, 79.1, 321773631, 'United States', 2015]
            ]
        ]*/;

        var option = {
            backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                offset: 0,
                color: '#f7f8fa'
            }, {
                offset: 1,
                color: '#cdd0d5'
            }]),
            title: {
                text: '1990 与 2015 年各国家人均寿命与 GDP'
            },
            legend: {
                right: 10,
                data: ['2016']
            },
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: [{
                name: '2016',
                data: data[0],
                type: 'scatter',
                /*symbolSize: function(data) {
                    return Math.sqrt(data[2]) / 5e2;
                },*/
                label: {
                    emphasis: {
                        show: true,
                        formatter: function(param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(120, 36, 50, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(251, 118, 123)'
                        }, {
                            offset: 1,
                            color: 'rgb(204, 46, 72)'
                        }])
                    }
                }
            }, {
                name: '2015',
                data: data[1],
                type: 'scatter',
                /*symbolSize: function(data) {
                    return Math.sqrt(data[2]) / 5e2;
                },*/
                label: {
                    emphasis: {
                        show: true,
                        formatter: function(param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(25, 100, 150, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(129, 227, 238)'
                        }, {
                            offset: 1,
                            color: 'rgb(25, 183, 207)'
                        }])
                    }
                }
            }]
        };

        option = {
            backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                offset: 0,
                color: '#f7f8fa'
            }, {
                offset: 1,
                color: '#cdd0d5'
            }]),
            title: {
                text: 'Integración country-stats / hurricanes'
            },
            legend: {
                right: 10,
                data: ['1990', '2015']
            },
            xAxis: {
                name: 'Velocidad',
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                name: 'Mbar',
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: [{
                name: '2016',
                data: data,
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                label: {
                    emphasis: {
                        show: true,
                        formatter: function (param) {
                            return param.data[3] + " , población: " + param.data[2];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(120, 36, 50, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(251, 118, 123)'
                        }, {
                            offset: 1,
                            color: 'rgb(204, 46, 72)'
                        }])
                    }
                }
            }, /*{
                name: '2015',
                data: data[1],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                label: {
                    emphasis: {
                        show: true,
                        formatter: function (param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(25, 100, 150, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(129, 227, 238)'
                        }, {
                            offset: 1,
                            color: 'rgb(25, 183, 207)'
                        }])
                    }
                }
            }*/]
        };

        myChart2.setOption(option);
    };

})

app.controller("juan-fe-edit-controller", function($scope, $http, $q, dataToEdit, $location) {


    // console.log(dataToEdit);
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
            //$scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = response.status + " " + response.statusText;
        });
    };


});