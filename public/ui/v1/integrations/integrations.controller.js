angular.module('SOS1819-app.integrations')

    .controller('integrationsCtrl', function($scope, initialData) {
        $scope.apiName = '';

        console.log(initialData);


        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function refSort(targetData, refData) {
            // Create an array of indices [0, 1, 2, ...N].
            var indices = Object.keys(refData);

            // Sort array of indices according to the reference data.
            indices.sort(function(indexA, indexB) {
                if (refData[indexA] < refData[indexB]) {
                    return -1;
                } else if (refData[indexA] > refData[indexB]) {
                    return 1;
                }
                return 0;
            });

            // Map array of indices to corresponding values of the target array.
            return indices.map(function(index) {
                return targetData[index];
            });
        }

        function generateBarChart(containerId, ownData) {
            var xAxisData = []; //tags
            var seriesData = [];

            for (var i = 0; i < ownData.length; i++) {
                var elm = ownData[i];
                var index = xAxisData.indexOf(elm.year);
                if (index === -1) {
                    xAxisData.push(elm.year);
                    seriesData.push(1);
                } else
                    seriesData[index] += 1;
            }


            var seriesDataSorted = refSort(seriesData, xAxisData);
            xAxisData.sort();

            var myChart = echarts.init(document.getElementById(containerId));
            var option = {
                title: {
                    text: 'Incidentes por año'
                },
                tooltip: {

                },
                legend: {
                    data: ['Incidentes']
                },
                xAxis: {
                    data: xAxisData
                },
                yAxis: {},
                series: [{
                    name: 'Incidentes',
                    type: 'bar',
                    data: seriesDataSorted
                }]
            };
            myChart.setOption(option);
        }

        function generateHighCharts(containerId, ownData) {

            ownData.sort(function(a, b) {
                if (a.death < b.death) {
                    return 1;
                }
                if (a.death > b.death) {
                    return -1;
                }
                return 0;
            });

            //nData2 = nData2.splice(0, 50);

            ownData = ownData.map(function(e) {
                return {
                    x: e.year,
                    y: e.inflation,
                    z: e.death,
                    name: e.event
                };
            });

            Highcharts.chart(containerId, {

                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },

                legend: {
                    enabled: false
                },

                title: {
                    text: 'Gráfico de las ' + ownData.length + ' catástrofes con más muertes y su coste'
                },


                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        text: 'Año'
                    },
                    labels: {
                        format: '{value}'
                    }
                },

                yAxis: {
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: 'Millones de dólares'
                    },
                    labels: {
                        format: '{value} $'
                    },
                    maxPadding: 0.2
                },

                tooltip: {
                    useHTML: true,
                    headerFormat: '<table style="width:200px">',
                    pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                        '<tr><th>Año:</th><td>{point.x}</td></tr>' +
                        '<tr><th>Coste (millones USD):</th><td>{point.y}</td></tr>' +
                        '<tr><th>Muertes:</th><td>{point.z}</td></tr>',
                    footerFormat: '</table>',
                    followPointer: true
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },

                series: [{
                    data: ownData
                }]

            });
        }

        function generateGeoCharts(containerId, ownData) {
            google.charts.load('current', {
                'packages': ['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
            var labels = [
                ['País', 'Coste millones $ (sin inflación)', 'Muertes']
            ];

            for (var i = 0; i < ownData.length; i++) {
                var item = ownData[i];
                for (var j = item.country.length - 1; j >= 0; j--) {
                    var itemCountry = item.country[j];
                    var founded = false;
                    for (var k = labels.length - 1; k >= 0; k--) {
                        if (labels[k][0] === itemCountry) {
                            founded = true;
                            labels[k][1] += item['no-inflation'];
                            labels[k][2] += item.death;
                        }
                    }
                    if (!founded)
                        labels.push([ownData[i].country[j], ownData[i]['no-inflation'], ownData[i].death]);
                }
            }

            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable(labels);
                console.log(data)

                var options = {};

                var chart = new google.visualization.GeoChart(document.getElementById(containerId));

                chart.draw(data, options);
            }
        }

        function generateLineChart(containerId, ownData, extData) {
            console.log(extData);
            var serie0 = {
                name: 'Pollution',
                data: []
            };

            var serie1 = {
                name: 'Inflation',
                data: []
            };

            serie0.data = extData.map(function(e, i) {
                serie1.data.push(ownData[i].inflation);
                return e.pollution_tco2;
            });

            Highcharts.chart(containerId, {

                title: {
                    text: 'Relación polución - inflación'
                },

                subtitle: {
                    text: 'Integración major-disasters / pollution-stats'
                },

                yAxis: {
                    title: {
                        text: 'Number of Employees'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [serie0, serie1],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });
        }

        function generateAreaChart(containerId, ownData, extData) {
            var myChart2 = echarts.init(document.getElementById(containerId));
            var xAxisData = [];
            var seriesData = [];
            for (var i = 0; i < ownData.length; i++) {
                var elm = ownData[i];
                var index = xAxisData.indexOf(elm.year);
                if (index === -1) {
                    xAxisData.push(elm.year);
                    seriesData.push(1);
                } else
                    seriesData[index] += 1;
            }


            var seriesDataSorted = refSort(seriesData, xAxisData);
            xAxisData.sort();

            var xAxisDataFiltered = [];
            var seriesDataFiltered = [];

            for (var i = 0; i < xAxisData.length; i++) {
                for (var j = 0; j < extData.length; j++) {
                    if (extData[j].year === xAxisData[i] && xAxisDataFiltered.indexOf(xAxisData[i]) === -1) {
                        xAxisDataFiltered.push(xAxisData[i]);
                        seriesDataFiltered.push(seriesDataSorted[i]);
                    }
                }
            }
            var ext1DataGrouped = {};

            for (var i = extData.length - 1; i >= 0; i--) {
                var elm = extData[i];
                if (!ext1DataGrouped[elm.year])
                    ext1DataGrouped[elm.year] = elm.pollution_tco2;
                else
                    ext1DataGrouped[elm.year] += elm.pollution_tco2;
            }

            var seriesDataExt1 = [];

            for (var key in ext1DataGrouped) {
                var index = xAxisDataFiltered.indexOf(parseInt(key));
                if (index > -1) {
                    seriesDataExt1[index] = parseInt(ext1DataGrouped[parseInt(key)]);
                } else {
                    seriesDataExt1[index] = 0;
                }
            }

            var option2 = {
                title: {
                    text: 'Integración major-disasters (G01) / pollution-stats (G08)'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    right: "5%",
                    data: ['Emisiones globales de CO2', 'Catástrofes ambientales']
                },
                xAxis: [{
                    type: 'category',
                    data: xAxisDataFiltered,
                    axisPointer: {
                        type: 'shadow'
                    }
                }],
                yAxis: [{
                        type: 'value',
                        name: 'Toneladas de CO2',
                        min: 0,
                        max: 2200,
                        interval: 220,
                        axisLabel: {
                            formatter: '{value} t'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Número de catástrofes ambientales',
                        min: 1,
                        max: 11,
                        interval: 1,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [{
                        name: 'Emisiones globales de CO2',
                        type: 'line',
                        areaStyle: {
                            normal: {}
                        },
                        data: seriesDataExt1
                    },
                    {
                        name: 'Catástrofes ambientales',
                        type: 'line',
                        areaStyle: {
                            normal: {}
                        },
                        yAxisIndex: 1,
                        data: seriesDataFiltered
                    }
                ]
            };

            myChart2.setOption(option2);
        }

        function generateHeatmap(containerId, ownData, extData) {
            var myChart3 = echarts.init(document.getElementById(containerId));
            var mixedData = ownData.concat(extData);
            var mixedYears = [];
            var mixedEvents = [];
            for (var i = 0; i < mixedData.length; i++) {
                var elm = mixedData[i];
                var event = (elm.name) ? [elm.name] : [elm.event];
                var year = (elm.year) ? elm.year : elm.startingyear;
                var yearIndex = mixedYears.indexOf(year);
                if (yearIndex === -1) {
                    mixedYears.push(year);
                    mixedEvents.push(event);
                } else {
                    mixedEvents[yearIndex].push(event[0]);
                }

            }

            var sortedEvents = refSort(mixedEvents, mixedYears);
            var sortedYears = mixedYears.slice(0).sort();
            var bounds = {
                min: sortedYears[0],
                top: sortedYears[sortedYears.length - 1]
            };

            bounds.min = parseInt(bounds.min.toString().replace(/.$/, 0));
            bounds.top = parseInt(bounds.top.toString().replace(/.$/, 9));

            var filledSortedYears = [];
            var filledSortedEvents = [];

            for (var i = 0; i <= bounds.top - bounds.min; i++) {
                var index = sortedYears.indexOf(bounds.min + i);
                filledSortedYears.push(bounds.min + i);
                filledSortedEvents.push((index === -1) ? [] : sortedEvents[index]);
            }

            var chunkNumber = Math.ceil(filledSortedYears.length / 10);

            var chunkedDataDisplay = [];
            var chunkedData = [];
            var step = 10;
            var xData = [];
            var yData = [];

            function chunkArray(myArray, chunk_size) {
                var index = 0;
                var arrayLength = myArray.length;
                var tempArray = [];

                for (index = 0; index < arrayLength; index += chunk_size) {
                    myChunk = myArray.slice(index, index + chunk_size);
                    tempArray.push(myChunk);
                }

                return tempArray;
            }

            var splittedFilledSortedEvents = chunkArray(filledSortedEvents, 10);
            var splittedfilledSortedYears = chunkArray(filledSortedYears, 10);


            for (var i = 0; i < step; i++) {
                xData.push(i);
            }

            for (var i = 0; i < splittedFilledSortedEvents.length; i++) {
                var elm = splittedFilledSortedEvents[i];
                var year = splittedfilledSortedYears[i];
                for (var j = 0; j < elm.length; j++) {
                    chunkedData.push([j, i, elm[j].length]);
                    chunkedDataDisplay.push([j, i, elm[j], year[j], "lengh " + elm[j].length]);
                }
            }

            for (var i = 0; i < chunkNumber; i++) {
                yData.push(bounds.min + (i * step));
            }


            var data4 = chunkedData;
            var option3 = {
                title: {
                    subtext: 'Integración major-disasters (G01) / sports-centers (G15)',
                    text: 'Histograma de eventos desde ' + bounds.min + " hasta " + bounds.top
                },
                tooltip: {
                    position: 'inside',
                    formatter: function(params, ticket, callback) {
                        var x = params.data[1];
                        var y = params.data[0];
                        var jump = (x * step) + y;
                        var events = chunkedDataDisplay[jump][2];
                        var year = chunkedDataDisplay[jump][3];
                        var text = "<h6>Eventos en " + year + "</h6>";
                        if (events.length === 0)
                            return "<span>No hay ningún evento en " + year + "</span><p></p>";
                        for (var i = 0; i < events.length; i++) {
                            text += '<p></p><span style="list-style-type:none">' + events[i] + '</span>';
                        }
                        return text;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'category',
                    data: yData
                },
                visualMap: {
                    min: 0,
                    max: 10,
                    calculable: true,
                    realtime: false,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                },
                series: [{
                    name: 'Gaussian',
                    type: 'heatmap',
                    data: chunkedData,

                    itemStyle: {
                        emphasis: {
                            borderColor: '#333',
                            borderWidth: 1
                        }
                    },
                    progressive: 1000,
                    animation: false
                }]
            };
            myChart3.setOption(option3);
        }

        function generateRadar(containerId, ownData, extData) {
            var yearsTaken = [];
            var eventsTaken = [];
            for (var i = 0; i < ownData.length; i++) {
                var index = yearsTaken.indexOf(ownData[i]);
                if (index === -1) {
                    eventsTaken.push(ownData[i].event);
                    yearsTaken.push(ownData[i].year);
                }
                if (eventsTaken.length === extData.length) break;

            }

            var ownDataSet = [];
            for (var i = 0; i < eventsTaken.length; i++) {
                var event = eventsTaken[i];
                var extValues = extData[i];
                ownDataSet.push([event, extValues.maxTemp.average, extValues.minHumidity.average, extValues.dailyMaxWind.average]);
            }

            var dataSet = anychart.data.set(ownDataSet);
            var data1 = dataSet.mapAs({
                'x': 0,
                'value': 1
            });
            var data2 = dataSet.mapAs({
                'x': 0,
                'value': 2
            });
            var data3 = dataSet.mapAs({
                'x': 0,
                'value': 3
            });

            var chart = anychart.radar();

            chart.title('Catástrofes naturales y condiciones atmosféricas').legend(true);

            chart.padding().bottom(70);

            // set chart yScale settings
            chart.yScale().minimum(0).maximum(70).ticks({
                'interval': 10
            });

            // create chart label with description
            chart.label()
                .text('Integración major-disasters (G01) con https://api.awhere.com usando OAuth')
                .anchor('center-bottom')
                .position('center-bottom')
                .fontWeight('normal')
                .fontSize(11)
                .fontFamily('tahoma')
                .fontColor('rgb(35,35,35)')
                .offsetY(15);

            // create first series with mapped data
            chart.line(data1).name('Temperatura').markers(true);
            // create second series with mapped data
            chart.line(data2).name('Humedad').markers(true);
            // create third series with mapped data
            chart.line(data3).name('Velocidad del viento').markers(true);

            // set tooltip format
            chart.tooltip().format('Value: {%Value}{decimalsCount: 2}');

            // set container id for the chart
            chart.container(containerId);
            // initiate chart drawing
            chart.draw();
        }

        function generateGraph(containerId, ownData, extData) {
            var myChart7 = echarts.init(document.getElementById(containerId));

            var parentNodes = [];
            var childNodes = [];

            for (var i = 0; i < extData.length; i++) {
                var parentNode = extData[i];
                var firstHalf = parentNode.value.slice(0, Math.ceil(parentNode.value.length / 2));
                var secondHalf = parentNode.value.substr(Math.ceil(parentNode.value.length / 2)).replace(' ', " \n\r")

                parentNode.value = firstHalf + secondHalf;
                parentNodes.push({
                    name: parentNode.value,
                    label: {
                        fontWeight: "bolder",
                        position: 'top',
                        color: "black"
                    },
                    itemStyle: {
                        color: '#0f5ddb'
                    },
                    x: i * 200,
                    y: Math.random() * (200 - 0) + 0
                });
            }

            for (var i = 0; i < ownData.length; i++) {
                var childNode = ownData[i];
                childNodes.push({
                    itemStyle: {
                        color: '#36933b'
                    },
                    name: childNode.event,
                    label: {
                        color: "black"
                    },
                    x: (i * 100) + (Math.random() * (50 - 20) + 20),
                    y: Math.random() * (300 - 100) + 300
                });
            }

            var links = [];

            for (var i = 0; i < childNodes.length; i++) {
                links.push({
                    target: childNodes[i].name,
                    source: parentNodes[i % parentNodes.length].name
                });
            }

            var option7 = {
                title: {
                    text: 'Declaraciones de Donald Trump y su relación con catástrofes naturales',
                    subtext: 'Integración major-disasters (G01) con https://matchilling-tronald-dump-v1.p.rapidapi.com'
                },
                tooltip: {},
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                series: [{
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    data: parentNodes.concat(childNodes),
                    links: links,
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                }]
            };
            myChart7.setOption(option7);
        }

        function generateScatter(containerId, ownData, extData) {
            var ctx = document.getElementById(containerId).getContext('2d');

            var series2 = [];
            var k = 0;
            for (var key in extData) {
                if (k > 8)
                    break;
                k++;
                var obj = {
                    label: key,
                    borderColor: getRandomColor(),
                    data: []
                }
                for (var i = 3; i >= 0; i--) {
                    var item = ownData[Math.floor(Math.random() * ownData.length)];
                    //obj.data.push({x: 5, y: 1})
                    obj.data.push({
                        x: parseInt(item.inflation),
                        y: parseInt(item['no-inflation'])
                    });
                }
                series2.push(obj);
            }

            window.myScatter = Chart.Scatter(ctx, {
                data: {
                    datasets: series2
                },
                options: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: true,
                        text: 'Integración major disasters - dogs'
                    },
                }
            });
        }

        function generateWordTree(containerId, ownData, extData) {
            var treeData = [{
                parent: -1,
                name: 'TEst',
                id: 0
            }]; //parent: (i) % 15
            var treeExtData = extData.map(function(e, i) {
                return {
                    id: i + 1,
                    value: e.advice,
                    fontSize: 12,
                    parent: 0
                };
            });
            treeData = treeData.concat(treeExtData);
            var treeLeafs = ownData.map(function(e, i) {
                var item = treeData[Math.floor(Math.random() * treeData.length)];
                return {
                    id: treeExtData.length + i,
                    parent: item.id,
                    value: e.event,
                    fontColor: getRandomColor(),
                    fontSize: 10
                };
            });
            treeData = treeData.concat(treeLeafs)

            anychart.data.set(treeData);

            var tableData = anychart.data.tree(treeData, 'as-table');

            // create word-tree charts
            var chart = anychart.wordtree(tableData);

            // set chart's font size minimum and maximum
            chart.minFontSize(8);
            chart.maxFontSize(20);

            // set default chart font color
            chart.fontColor('#333');

            // set chart paddings
            chart.padding(15, 0);

            // set chart connectors settings
            chart.connectors()
                .curveFactor(.9)
                .length(35)
                .stroke('#2485d0');

            // set container id for the chart
            chart.container(containerId);

            // initiate chart drawing
            chart.draw();
        }

        function generatePie(containerId, extData) {
            var ctx = document.getElementById(containerId).getContext('2d');
            var labels = [];
            var backgroundColor = [];
            var data = extData.map(function(e, i) {
                labels.push(e.city);
                backgroundColor.push(getRandomColor());
                return e.count;
            });

            var config = {
                type: 'pie',
                data: {
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColor,
                        label: 'Dataset 1'
                    }],
                    labels: labels
                },
                options: {
                    responsive: true
                }
            };
            window.myPie = new Chart(ctx, config);
        }


        ///GRAFICAS JUAN
        function cuentadanos(id, datos) {
            var v1 = 0;
            var v2 = 0;
            var v3 = 0;
            var v4 = 0;

            datos.forEach(function(e) {
                if (parseInt(e.damagesuntil2008) < 25)
                    v1++;
                else if (parseInt(e.damagesuntil2008) < 50)
                    v2++;
                else if (parseInt(e.damagesuntil2008) < 75)
                    v3++;
                else if (parseInt(e.damagesuntil2008) < 100)
                    v4++;
            });

            var chart = new EJSC.Chart(id, {
                show_legend: true,
                title: 'Damages-until-2008'
            });

            //   cuentadanos();
            var data2 = datos.map(function(e) {
                return [e.damagesuntil2008, e.name];
            });

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

        function fium(id, datos) {
            var v = 0;
            var i = 0;
            var o = 0;

            datos.forEach(function(e) {
                v = v + parseInt(e.speed);
                i++;
            });
            //  console.log("speed="+v);
            v = v / i;
            //    console.log("i="+i);
            //   console.log("medium speed="+v);
            i = 0;

            Highcharts.chart(id, {

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

        function mapa(id, datos) {


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

                datos.forEach(function(e) {
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

                var chartM = new google.visualization.GeoChart(document.getElementById(id));

                chartM.draw(data, options);
            }
        }

        function cstats(id, datos1, datos2) {
            console.log(datos1)
            var data = datos1.map(function(e, i) {
                console.log(e)
                if (datos2[i].population) {
                    return [
                        parseInt(e.speed),
                        parseInt(e.mbar),
                        datos2[i].population,
                        e.country,
                        '2016'
                    ];
                } else {
                    return [
                        parseInt(e.speed),
                        parseInt(e.mbar),
                        0,
                        e.country,
                        '2016'
                    ];
                }
            });
            var myChart2 = echarts.init(document.getElementById(id));

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
                    symbolSize: function(data) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function(param) {
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
        }

        function cataques(id, datos1, datos2) {

            anychart.onDocumentReady(function() {
                // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
                // https://cdn.anychart.com/releases/v8/js/anychart-data-adapter.min.js
                anychart.theme('darkBlue');

                // Load JSON data and create a chart by JSON data
                // The data used in this sample can be obtained from the CDN
                // https://cdn.anychart.com/samples/general-features/load-json-data/data.json
                anychart.data.loadJsonFile('https://cdn.anychart.com/samples/general-features/load-json-data/data.json', function(data) {
                    // console.log(comAta)

                    var founded = {};
                    var test = []
                    datos2.forEach(function(e, i) {
                        if (!founded[e.attacktype]) {
                            founded[e.attacktype] = 1;

                            test.push({
                                x: e.attacktype,
                                value: datos1[i].damagesuntil2008
                            });
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
                    chart.container(id);
                    // initiate chart drawing
                    chart.draw();
                });
            });
        }

        function pokeGraph(id, datos1, datos2) {

            var chart = new EJSC.Chart(id, {
                show_legend: false
            });

            var tipos = datos2.map(function(e, i) {
                return [datos1[i].mbar, e.name];
            });
            //return;
            var mySeries = new EJSC.BarSeries(
                new EJSC.ArrayDataHandler(tipos), {
                    orientation: "horizontal",
                    title: "Hurricanes' mbars as pokémon types. ",
                    intervalOffset: .5,
                    useColorArray: true
                }
            );

            mySeries.x_axis_formatter = new EJSC.NumberFormatter({
                forced_decimals: 2,
                title: "ayuwoki"
            });

            mySeries.y_axis_formatter = new EJSC.NumberFormatter({
                forced_decimals: 2
            });

            chart.addSeries(mySeries);
        }

        function cncall(id, ownData, extData) {

            var data = ownData.map(function(e, i) {
                return {
                    from: e.name,
                    to: extData.value.joke,
                    value: 100
                };
            });

            anychart.onDocumentReady(function() {
                // create sankey chart
                chart = anychart.sankey();

                // set chart's data
                chart.data(data);

                // set curve factor for the flow
                chart.curveFactor(0);

                // set chart's palette
                chart.palette(['#47659b', '#355691', '#314f84', '#2c4777', '#273f6a', '#22375d', '#1d2f50',
                    '#192842', '#1d2f50', '#22375d', '#273f6a', '#2c4777', '#314f84', '#355691', '#47659b'
                ]);

                // // set nodes width and padding
                chart.nodeWidth(200);

                // set node's label font color and weight
                chart.node().normal().labels()
                    .fontColor('#fff')
                    .fontWeight('bold');

                //disable tooltips for thew node
                chart.node().tooltip().enabled(false);

                // disable tooltip and label in hovered state for the flow
                chart.flow().tooltip().enabled(false);
                chart.flow().hovered().labels().enabled(false);

                // set flow's normal and hovered fill
                chart.flow({
                    normal: {
                        fill: function() {
                            return this.sourceColor + ' ' + .3
                        },
                    },
                    hovered: {
                        fill: function() {
                            return this.sourceColor + ' ' + .9
                        },
                    }
                });

                // set container id for the chart
                chart.container(id);

                // initiate chart drawing
                chart.draw();
            });
        }

        function chanchachachanchan(id, datos1, datos2) {
            var myGot = echarts.init(document.getElementById(id));
            var lista = [100, 1000, 300, 2050, 100, 1000, 300, 2050, 300, 2050];
            var gotDat = datos1.map(function(e, i) {


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

            //console.table(gotDat)
            var indiGot = datos2.map(function(e, i) {
                return {
                    name: e.name,
                    max: lista[i]
                };
            });
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
                    text: 'GOT Books with a random hurricane data',
                    left: 'center',
                    textStyle: {
                        color: '#eee'
                    }
                },
                legend: {
                    bottom: 5,
                    data: [],
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
                series: [{
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
                }]
            };

            myGot.setOption(option);

        }

        function view1(id, data) {
            var aux = {};
            var dataGraf = [];

            for (var i = 0; i < data.length; i++) {
                var object = data[i];
                var exist = aux[object.country];
                if (exist) {
                    aux[object.country] += object.shot;
                } else {
                    aux[object.country] = object.shot;
                }
            }

            for (var key in aux) {
                dataGraf.push([key, aux[key]]);
            }

            // create a chart
            var chart = anychart.area();

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
                } else {
                    aux2[object2.country] = object2.maxYield;
                }
            }

            for (var key in aux2) {
                dataGraf2.push({
                    name: key,
                    y: aux2[key]
                });
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
                } else {
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
                } else {
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
                } else {
                    aux2[object2.country] = object2.maxYield;
                }
            }

            for (var key in aux2) {
                dataGraf2.push({
                    name: key,
                    y: aux2[key]
                });
            }
            var dataGraf5 = [];

            for (var i = 0; i < dataExt.length; i++) {
                var object5 = dataExt[i];
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

        function view8(id, data, dataExt) {
            var dataGraf = [];
            dataExt = dataExt.data;
            for (var i = 0; i < dataExt.length; i++) {
                if (i >= dataExt.length)
                    break;
                var object6 = dataExt[i];
                dataGraf.push([object6.Year, data[i].maxYield * 1000, object6.Population]);

            }


            var data = anychart.data.set(dataGraf);

            // map the data
            var seriesData_1 = data.mapAs({
                x: 0,
                value: 1
            });
            var seriesData_2 = data.mapAs({
                x: 0,
                value: 2
            });

            // create a chart
            chart = anychart.vertical();

            // create the first series (bar)
            var series1 = chart.splineArea(seriesData_1);

            // create the second series (spline)
            var series2 = chart.spline(seriesData_2);

            // set the container id
            chart.container(id);

            // initiate drawing the chart
            chart.draw();
        }

        var graph = function(fn) {
            var slicedArgs = Array.prototype.slice.call(arguments, 1);
            this.show = false;
            this.generate = fn.bind(this, ...slicedArgs);
            this.toggle = function() {
                this.show = !this.show;
                if (this.show) setTimeout(this.generate, 0);
            };
        };

        function view9(id, data, dataExt) {
            var aux = {};
            var dataGraf = [];

            for (var i = 0; i < dataExt.length; i++) {
                var object = dataExt[i];
                var exist = aux[object.country];
                if (!exist) {
                    aux[object.country] = object.name;
                }
            }
            var count = 0;
            for (var key in aux) {
                dataGraf.push({
                    name: aux[key],
                    value: data[count].shot
                });
                count++;

            }


            var myChart44 = echarts.init(document.getElementById(id));
            var option = {
                backgroundColor: '#2c343c',

                title: {
                    text: 'Integración 6',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [{
                    name: 'Universidades Middle',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: dataGraf.sort(function(a, b) {
                        return a.value - b.value;
                    }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(230, 50, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function(idx) {
                        return Math.random() * 200;
                    }
                }]
            };
            myChart44.setOption(option);
        }

        function view10(id, data, dataExt) {
            var aux = {};
            var dataGraf = [];
            var dataGraf1 = [];
            var dataGraf2 = [];

            for (var i = 0; i < dataExt.length; i++) {
                var object = dataExt[i];
                var exist = aux[object.Name];
                if (!exist) {
                    aux[object.Name] = object.arrest_count;
                }
            }
            var i = 0;
            for (var key in aux) {
                if (i >= data.length) {
                    break;
                }
                dataGraf.push(key);
                dataGraf1.push(aux[key]);
                dataGraf2.push(data[i].shot);

                i++;

            }

            var ctx = document.getElementById(id).getContext('2d');
            var config = {
                type: 'line',
                data: {
                    labels: dataGraf,
                    datasets: [{
                        label: 'My First dataset',
                        //backgroundColor: window.chartColors.red,
                        //borderColor: window.chartColors.red,
                        data: dataGraf1,
                        fill: false,
                    }, {
                        label: 'My Second dataset',
                        fill: false,
                        //backgroundColor: window.chartColors.blue,
                        //borderColor: window.chartColors.blue,
                        data: dataGraf2,
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    }
                }
            };
            window.myLine = new Chart(ctx, config);
        };


        function bbcall(id, ownData, bbad) {

            google.charts.load('current', {
                packages: ['corechart', 'bar']
            });
            google.charts.setOnLoadCallback(drawBarColors);

            function drawBarColors() {
                var auxbb = [];
                auxbb.push(['Breaking bad character', "mbar"])
                auxbb.push([bbad[0].author, parseInt(ownData[1].mbar)])
                var data = google.visualization.arrayToDataTable(auxbb);

                var options = {
                    title: '',
                    chartArea: {
                        width: '50%'
                    },
                    colors: ['#b0120a', '#ffab91'],
                    hAxis: {
                        title: bbad[0].author,
                        minValue: 0
                    },
                    vAxis: {
                        title: "mbar"
                    }
                };

                var chart = new google.visualization.BarChart(document.getElementById(id));
                chart.draw(data, options);
            }
        }

        var graph = function(fn) {
            var slicedArgs = Array.prototype.slice.call(arguments, 1);
            this.show = false;
            this.generate = fn.bind(this, ...slicedArgs);
            this.toggle = function() {
                this.show = !this.show;
                if (this.show) setTimeout(this.generate, 0);
            };
        };


        $scope.disasters = {
            show: true,
            visualizations: {
                echarts: new graph(generateBarChart, 'main1', initialData.disasters.data),
                highcharts: new graph(generateHighCharts, 'main2', initialData.disasters.data),
                geocharts: new graph(generateGeoCharts, 'main3', initialData.disasters.data)
            },
            integrations: {
                ext1: new graph(generateLineChart, 'main4', initialData.disasters.data.slice(0), initialData.disasters.ext1),
                ext2: new graph(generateHeatmap, 'main5', initialData.disasters.data.slice(0), initialData.disasters.ext2),
                ext3: new graph(generateRadar, 'main6', initialData.disasters.data.slice(0), initialData.disasters.ext3.norms),
                ext4: new graph(generateGraph, 'main7', initialData.disasters.data.slice(0, 8), initialData.disasters.ext4),
                ext5: new graph(generateScatter, 'main8', initialData.disasters.data, initialData.disasters.ext5.message),
                ext6: new graph(generateWordTree, 'main9', initialData.disasters.data.slice(0, 25), initialData.disasters.ext6.slips),
                ext7: new graph(generatePie, 'main10', initialData.disasters.ext7.results)
            }
        };

        $scope.bombs = {
            show: true,
            visualizations: {
                anychart: new graph(view1, 'vista1', initialData.bombs.data),
                highcharts: new graph(view2, 'vista2', initialData.bombs.data),
                geocharts: new graph(view3, 'vista3', initialData.bombs.data)
            },
            integrations: {
                ext1: new graph(view4, 'vista4', initialData.bombs.data.slice(0), initialData.bombs.ext1),
                ext2: new graph(view5, 'vista5', initialData.bombs.data.slice(0), initialData.bombs.ext2),
                ext3: new graph(view6, 'vista6', initialData.bombs.data.slice(0), initialData.bombs.ext3),
                ext4: new graph(view7, 'vista7', initialData.bombs.data.slice(0), initialData.bombs.ext4),
                ext5: new graph(view8, 'vista8', initialData.bombs.data.slice(0), initialData.bombs.ext5),
                ext6: new graph(view9, 'vista9', initialData.bombs.data.slice(0), initialData.bombs.ext6),
                ext7: new graph(view10, 'vista10', initialData.bombs.data.slice(0), initialData.bombs.ext7)
            }
        };

        $scope.hurricanes = {
            show: true,
            visualizations: {
                ejscharts: new graph(cuentadanos, 'main1h', initialData.hurricanes.data), //
                highcharts: new graph(fium, 'main2h', initialData.hurricanes.data),
                geocharts: new graph(mapa, 'main3h', initialData.hurricanes.data)
            },
            integrations: {
                ext1: new graph(cstats, 'main4h', initialData.hurricanes.data.slice(0, 10), initialData.hurricanes.ext1),
                ext2: new graph(cataques, 'main5h', initialData.hurricanes.data, initialData.hurricanes.ext2),
                ext3: new graph(pokeGraph, 'main6h', initialData.hurricanes.data, initialData.hurricanes.ext3.results), //
                ext4: new graph(chanchachachanchan, 'main7h', initialData.hurricanes.data, initialData.hurricanes.ext4),
                ext5: new graph(cncall, 'main8h', initialData.hurricanes.data, initialData.hurricanes.ext5),
                ext6: new graph(bbcall, 'main9h', initialData.hurricanes.data, initialData.hurricanes.ext6)
            }
        };

    });