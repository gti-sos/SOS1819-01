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
    var comAta=[];
    var poke=[];
    var got=[];
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
        $q.all([
            $http.get($scope.url, {params: search}), 
            $http.get($scope.url2 + '/count', {params: search}), 
            $http.get($scope.url), 
            $http.get("/proxy/country-stats"),
            $http.get("/proxy/computers-attacks-stats"),
            $http.get("/proxy/poke"),
            $http.get("/proxy/got")
            ]).then(function(responses) {
            $scope.hurricanes = responses[0].data;
            $scope.hurricanes2 = responses[2].data;
            countryStats = responses[3].data;
            comAta =responses[4].data;
            poke =responses[5].data.results;
            got=responses[6].data;
            console.table(got)
            console.log(responses)
            cuentadanos();
            fium();
            mapa();
            cstats();
            cataques();
            pokeGraph();
            chanchachachanchan();
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
    var data = $scope.hurricanes.map(function(e, i){
        return [
        parseInt(e.speed),
        parseInt(e.mbar),
        countryStats[i].population,
        e.country,
        '2016'
        ];
    });
    var myChart2 = echarts.init(document.getElementById("supernenaazul"));

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
            }]
        };

        myChart2.setOption(option);
    };

function cataques(){
    
    anychart.onDocumentReady(function () {
    // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
    // https://cdn.anychart.com/releases/v8/js/anychart-data-adapter.min.js
    anychart.theme('darkBlue');

    // Load JSON data and create a chart by JSON data
    // The data used in this sample can be obtained from the CDN
    // https://cdn.anychart.com/samples/general-features/load-json-data/data.json
    anychart.data.loadJsonFile('https://cdn.anychart.com/samples/general-features/load-json-data/data.json', function (data) {
       console.log(comAta)
        
        var founded = {};
        var test = []
        comAta.forEach(function (e, i) {
            if (!founded[e.attacktype]) {
                founded[e.attacktype] = 1;

                test.push({x: e.attacktype, value: $scope.hurricanes[i].damagesuntil2008});
            } else
                founded[e.attacktype] = 1;
        })
        
        console.log(test)
        var chart = anychart.pie(test);
        chart.labels()
                .hAlign('center')
                .position('outside')
                .format('{%Value} km/h({%PercentOfCategory}%)');

        // set chart title text settings
        chart.title('Types of computer attack with the speed of a random hurricane.')
                //set chart radius
                .radius('43%')
                // create empty area in pie chart
                .innerRadius('30%');

        // set legend title text settings
        chart.legend()
                // set legend position and items layout
                .position('center-bottom')
                .itemsLayout('horizontal')
                .align('center');

        // set container id for the chart
        chart.container('donutataques');
        // initiate chart drawing
        chart.draw();
    });
});
}

function pokeGraph(){
    
    console.log("aaaaaaaaaaaaaaaaaa1")
     var chart = new EJSC.Chart("pokeG", {
      show_legend: false
    } );
    
    var tipos= poke.map(function(e, i) {
        return [$scope.hurricanes2[i].mbar, e.name];
    });
    console.log('asddadsaadasdasd', tipos)
    //return;
    var mySeries = new EJSC.BarSeries(
      new EJSC.ArrayDataHandler(tipos) , {
          orientation: "horizontal",
          title: "Hurricanes' mbars as pokémon types. ",
          intervalOffset: .5,
          useColorArray: true
      }
    );
    
    mySeries.x_axis_formatter = new EJSC.NumberFormatter({
        forced_decimals: 2,
        title: "ayuwoki"
    } );
    
    mySeries.y_axis_formatter = new EJSC.NumberFormatter({
        forced_decimals: 2
    } );
  
    chart.addSeries(mySeries);

    
}

function chanchachachanchan(){
    
    
    var myGot = echarts.init(document.getElementById("dieDieDieeeee"));
var dataBJ = [
    [55,9,56,0.46,18,6,1],
    [25,11,21,0.65,34,9,2],
    [56,7,63,0.3,14,5,3],
    [33,7,29,0.33,16,6,4],
    [42,24,44,0.76,40,16,5],
    [82,58,90,1.77,68,33,6],
    [74,49,77,1.46,48,27,7],
    [78,55,80,1.29,59,29,8],
    [267,216,280,4.8,108,64,9],
    [185,127,216,2.52,61,27,10],
    [39,19,38,0.57,31,15,11],
    [41,11,40,0.43,21,7,12],
    [64,38,74,1.04,46,22,13],
    [108,79,120,1.7,75,41,14],
    [108,63,116,1.48,44,26,15],
    [33,6,29,0.34,13,5,16],
    [94,66,110,1.54,62,31,17],
    [186,142,192,3.88,93,79,18],
    [57,31,54,0.96,32,14,19],
    [22,8,17,0.48,23,10,20],
    [39,15,36,0.61,29,13,21],
    [94,69,114,2.08,73,39,22],
    [99,73,110,2.43,76,48,23],
    [31,12,30,0.5,32,16,24],
    [42,27,43,1,53,22,25],
    [154,117,157,3.05,92,58,26],
    [234,185,230,4.09,123,69,27],
    [160,120,186,2.77,91,50,28],
    [134,96,165,2.76,83,41,29],
    [52,24,60,1.03,50,21,30],
    [46,5,49,0.28,10,6,31]
];

var lista=[100,1000,300,2050,100,1000,300,2050,300,2050];
var maxdmg=0;
var maxmbar=0;
var maxspeed=0;
var maxyear=0;
console.table($scope.hurricanes)
var gotDat=$scope.hurricanes.map(function(e, i){
    
    
        return [
        parseInt(e.damagesuntil2008),
        parseInt(e.mbar),
        parseInt(e.speed),
        parseInt(e.year),
        parseInt(e.damagesuntil2008),
        parseInt(e.mbar),
        parseInt(e.speed),
        parseInt(e.year),
        parseInt(e.speed),
        parseInt(e.year)
        ];
    });

console.table(gotDat)
var indiGot=got.map(function(e, i) {
    return {name: e.name, max: lista[i]}
})
console.table(indiGot)
var lineStyle = {
    normal: {
        width: 1,
        opacity: 0.5
    }
};

option = {
    backgroundColor: '#161627',
    title: {
        text: 'AQI - 雷达图',
        left: 'center',
        textStyle: {
            color: '#eee'
        }
    },
    legend: {
        bottom: 5,
        data: ['北京', '上海', '广州'],
        itemGap: 20,
        textStyle: {
            color: '#fff',
            fontSize: 14
        },
        selectedMode: 'single'
    },
    // visualMap: {
    //     show: true,
    //     min: 0,
    //     max: 20,
    //     dimension: 6,
    //     inRange: {
    //         colorLightness: [0.5, 0.8]
    //     }
    // },
    radar: {
        indicator: indiGot,
        shape: 'circle',
        splitNumber: 5,
        name: {
            textStyle: {
                color: 'rgb(238, 197, 102)'
            }
        },
        splitLine: {
            lineStyle: {
                color: [
                    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                    'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                    'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                ].reverse()
            }
        },
        splitArea: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(238, 197, 102, 0.5)'
            }
        }
    },
    series: [
        {
            name: '北京',
            type: 'radar',
            lineStyle: lineStyle,
            data: gotDat,
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: '#F9713C'
                }
            },
            areaStyle: {
                normal: {
                    opacity: 0.1
                }
            }
        }
    ]
};

            myGot.setOption(option);

}


//###################################

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