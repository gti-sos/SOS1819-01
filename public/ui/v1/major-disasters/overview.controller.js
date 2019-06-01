
function buildStatusPopup (data) {
	return {
		template: '/ui/v1/major-disasters/overviewPopup.template.html',
		className: 'ngdialog-theme-plain',
		disableAnimation: true,
		controller: 'overviewPopupCtrl',
		data: (data) ? data: {}
	};
}

angular.module('SOS1819-app.majorDisastersApp')
.controller('overviewCtrl', function ($scope, $location, $q, MajorDisaster, initialData, ngDialog, autoLoad) {
	console.log('initial data', initialData);
	var searchObj = $location.search();
	$scope.loading = false;
	$scope.data = initialData.data || [];


		xAxisData = []; //tags
		seriesData = [];

		var nData = $scope.data.slice(0);
		for (var i = 0; i < nData.length; i++) {
			var elm = nData[i];
			var index = xAxisData.indexOf(elm.year);
			if (index === -1) {
				xAxisData.push(elm.year);
				seriesData.push(1);
			}
			else
				seriesData[index] += 1;
		}
		function refSort (targetData, refData) {
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
		
		var seriesDataSorted = refSort(seriesData, xAxisData);
		xAxisData.sort();

		var myChart = echarts.init(document.getElementById('main'));
		var option = {
			title: {
				text: 'Incidentes por año'
			},
			tooltip: {
				
			},
			legend: {
				data:['Incidentes']
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


		var nData2 = $scope.data.slice(0);
		
		nData2.sort(function (a, b) {
			if ( a.death < b.death ){
				return 1;
			}
			if ( a.death > b.death ){
				return -1;
			}
			return 0;
		});

		nData2 = nData2.splice(0, 50);

		nData2 = nData2.map(function (e) {
			return {x: e.year, y: e.inflation, z: e.death, name: e.event};
		});





		Highcharts.chart('main2', {

			chart: {
				type: 'bubble',
				plotBorderWidth: 1,
				zoomType: 'xy'
			},

			legend: {
				enabled: false
			},

			title: {
				text: 'Gráfico de las ' + nData2.length + ' catástrofes con más muertes y su coste'
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
				data: nData2
			}]

		});




		////////////////GEO CHARTS ///////////////////////


		google.charts.load('current', {
			'packages':['geochart'],
		        // Note: you will need to get a mapsApiKey for your project.
		        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
		        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
		    });
		google.charts.setOnLoadCallback(drawRegionsMap);
		var nData3 = initialData.data.slice(0);
		var res3 = [['País', 'Coste millones $ (sin inflación)', 'Muertes']];

		for (var i = 0; i < nData3.length; i++) {
			var item = nData3[i];
			for (var j = item.country.length - 1; j >= 0; j--) {
				var itemCountry = item.country[j];
				var founded = false;
				for (var k = res3.length - 1; k >= 0; k--) {
					if (res3[k][0] === itemCountry) {
						founded = true;
						res3[k][1] += item['no-inflation'];
						res3[k][2] += item.death;
					}
				}
				if (!founded)
					res3.push([nData3[i].country[j], nData3[i]['no-inflation'], nData3[i].death]);
			}
		}
		function drawRegionsMap() {
			var data = google.visualization.arrayToDataTable(res3);

			var options = {};

			var chart = new google.visualization.GeoChart(document.getElementById('main3'));

			chart.draw(data, options);
		}



		var myChart2 = echarts.init(document.getElementById('main4'));

		//app.title = '折柱混合';

		var ext1Data = initialData.ext1.slice(0);


		var xAxisDataFiltered = [];
		var seriesDataFiltered = [];

		for (var i = 0; i < xAxisData.length; i++) {
			for (var j = 0; j < ext1Data.length; j++) {
				if (ext1Data[j].year === xAxisData[i] && xAxisDataFiltered.indexOf(xAxisData[i]) === -1) {
					xAxisDataFiltered.push(xAxisData[i]);
					seriesDataFiltered.push(seriesDataSorted[i]);
				}
			}
		}
		var ext1DataGrouped = {};

		for (var i = ext1Data.length - 1; i >= 0; i--) {
			var elm = ext1Data[i];
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
				data:['Emisiones globales de CO2','Catástrofes ambientales']
			},
			xAxis: [
			{
				type: 'category',
				data: xAxisDataFiltered,
				axisPointer: {
					type: 'shadow'
				}
			}
			],
			yAxis: [
			{
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
			series: [
			{
				name:'Emisiones globales de CO2',
				type:'line',
				areaStyle: {normal: {}},
				data: seriesDataExt1
			},
			{
				name:'Catástrofes ambientales',
				type:'line',
				areaStyle: {normal: {}},
				yAxisIndex: 1,
				data: seriesDataFiltered
			}
			]
		};

		myChart2.setOption(option2);


		(function generateHeatmap(ownData, extData) {
			var myChart3 = echarts.init(document.getElementById('main5'));
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
			var bounds = {min: sortedYears[0], top: sortedYears[sortedYears.length - 1]};
			
			bounds.min = parseInt(bounds.min.toString().replace(/.$/,0));
			bounds.top = parseInt(bounds.top.toString().replace(/.$/,9));

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

			function chunkArray(myArray, chunk_size){
				var index = 0;
				var arrayLength = myArray.length;
				var tempArray = [];

				for (index = 0; index < arrayLength; index += chunk_size) {
					myChunk = myArray.slice(index, index+chunk_size);
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
					formatter: function (params, ticket, callback) {
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
		})(initialData.data.slice(0), initialData.ext2.slice(0));

		
		(function generateRadar(ownData, extData) {
			var dataSet = anychart.data.set([
				['GDP', 1, 0.11982978723404256, 0.6180425531914894],
				['GDP Real Growth Rate', 0.3666666666666667, 0.5583333333333333, 0.7583333333333333],
				['Infant Mortality', 0.06578947368421052, 0.15576923076923077, 0.24473684210526317],
				['Life Expectancy', 0.9576093653727663, 0.8268638324091188, 0.8905730129390017],
				['Population', 0.22638827767366515, 0.10979008847837246, 1],
				['Area', 0.5390698290165805, 1, 0.5487479259581779],
				['Density', 0.02995156531259858, 0.00783120233080335, 0.1299664111937944],
				['Population Growth Rate', 0.3087248322147651, -0.12416107382550336, 0.19463087248322147]
				]);

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
				console.log(event, extValues)
				ownDataSet.push([event, extValues.maxTemp.average, extValues.minHumidity.average, extValues.dailyMaxWind.average]);
			}

			console.log(ownDataSet)
			dataSet = anychart.data.set(ownDataSet);
			    // map data for the first series, take x from the zero column and value from the first column of data set
			    var data1 = dataSet.mapAs({'x': 0, 'value': 1});
			    // map data for the second series, take x from the zero column and value from the second column of data set
			    var data2 = dataSet.mapAs({'x': 0, 'value': 2});
			    // map data for the third series, take x from the zero column and value from the third column of data set
			    var data3 = dataSet.mapAs({'x': 0, 'value': 3});

			    // create radar chart
			    var chart = anychart.radar();

			    // set chart title text settings
			    chart.title('Catástrofes naturales y condiciones atmosféricas')
			            // set chart legend
			            .legend(true);

			    // set chart padding settings
			    chart.padding().bottom(70);

			    // set chart yScale settings
			    chart.yScale()
			    .minimum(0)
			    .maximum(70)
			    .ticks({'interval': 10});

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
			    chart.container('main6');
			    // initiate chart drawing
			    chart.draw();
			})(initialData.data.slice(0), initialData.ext3.norms.slice(0));	


			$scope.count = initialData.count;
			$scope.filter =  {
				offset: parseInt(searchObj.offset) || 0,
				limit: parseInt(searchObj.limit)  || 10,
				event: searchObj.event || null,
				year: parseInt(searchObj.year) || null,
				death: parseInt(searchObj.death) || null, 
				inflation: parseFloat(searchObj.inflation) || null, 
				"no-inflation": parseFloat(searchObj['no-inflation']) || null, 
				type: searchObj.type || null, 
				country: searchObj.country || null,
				from: parseInt(searchObj.from) || null,
				to: parseInt(searchObj.to) || null
			};

			var reloadTableData = function (index, cb) {
				$scope.loading = true;
				var filterObj = JSON.parse(JSON.stringify($scope.filter));
				if (typeof index === 'function') {
					cb = index;
					index = $scope.filter.offset;
				}
				if (index == null) {
					index = $scope.filter.offset;
				}
				filterObj.offset = index;
				$q.all([MajorDisaster.v1.list(processFilter(filterObj)), MajorDisaster.v2.count(filterObj)]).then(function (res) {
					$scope.data = res[0].data;
					$scope.count = Math.ceil(res[1].data.count / $scope.filter.limit);
					$scope.loading = false;
					$scope.filter.offset = index;
					var trimmedFilter = {};
					for (var key in $scope.filter) {
						if ($scope.filter[key] !== "" && $scope.filter[key] != null)
							trimmedFilter[key] = $scope.filter[key];
					}
					$location.search(trimmedFilter);
					if (cb) cb(res);
				}).catch(function (res) {
					$scope.loading = false;
					if (cb) cb(res);
				});
			};

			$scope.resetFilters = function () {
				$scope.filter =  {
					offset: 0,
					limit:  10,
					event: null,
					year: null,
					death: null, 
					inflation: null, 
					"no-inflation": null, 
					type: searchObj.type || null, 
					country: searchObj.country || null,
					from: parseInt(searchObj.from) || null,
					to: parseInt(searchObj.to) || null
				};
				reloadTableData();
			};

			$scope.getElement = function (item) {
				$location.path('/overview/' + item.event);
			};

			$scope.create = function () {
				ngDialog.open({
					template: '/ui/v1/major-disasters/overviewItem.template.html',
					controller: "overviewModItemCtrl",
					data: {
						operation: 'create',
						item: {
							event: null,
							year: null,
							type: [],
							country: [],
							death: null,
							inflation: null,
							"no-inflation": null
						}
					}, preCloseCallback: function () {
						reloadTableData(function () {
							$location.hash('');
						});
					}
				});
			};

			$scope.remove = function (id) {
				MajorDisaster.v1.remove(id).then(function (rRes) {
					if ($scope.data.length === 1 && $scope.filter.offset > 0) $scope.filter.offset -= 1;
					reloadTableData(function (res) {
						$scope.data = res[0].data;
						$scope.count = Math.ceil(res[1].data.count / $scope.filter.limit);
						ngDialog.open(buildStatusPopup(rRes));
					});
				}).catch(function (rRes) {
					ngDialog.open(buildStatusPopup(rRes));
				});
			};

			$scope.removeAll = function () {
				MajorDisaster.v2.count().then(function (cRes) {
					if (window.confirm("¿Borrar las " + cRes.data.count + " entradas?"))
						MajorDisaster.v1.removeAll().then(function (res) {
							reloadTableData(function () {
								ngDialog.open(buildStatusPopup(res));
							});
						}).catch(function (res) {
							reloadTableData(function () {
								ngDialog.open(buildStatusPopup(res));
							});
						});
					}).catch(function (cRes) {
						reloadTableData(function () {
							ngDialog.open(buildStatusPopup(cRes));
						});
					});

				};

				$scope.modify = function (id) {
					$location.hash(id);
					MajorDisaster.v1.get(id).then(function (res) {
						ngDialog.open({
							template: '/ui/v1/major-disasters/overviewItem.template.html',
							controller: "overviewModItemCtrl",
							data: {
								operation: 'modify',
								item: res.data
							}, preCloseCallback: function () {
								reloadTableData(function () {
									$location.hash('');
								});
							}
						});
					}).catch(function (res) {
						var p = buildStatusPopup(res);
						p.preCloseCallback = function () {
							reloadTableData(function () {
								$location.hash('');
							});
						};

						ngDialog.open(p);
					});
				};

				if (autoLoad) $scope.modify(autoLoad);


				function processFilter (obj) {
					obj.country = (obj.country) ? obj.country.split(',').map(function (e) {if (e) return e.trim(); }) : obj.country;
					obj.type = (obj.type) ? obj.type.split(',').map(function (e) {if (e) return e.trim(); }) : obj.type;
					return obj;
				}

				$scope.navigate = function (index) {
					index = (index) ? index : 0;
					reloadTableData(index);
				};

			})

.controller('overviewModItemCtrl', function ($scope, MajorDisaster, $injector, ngDialog, $route) {
	try {
		$scope.nData = JSON.parse(JSON.stringify($scope.ngDialogData.item));
		$scope.operation = $scope.ngDialogData.operation;
	} catch (e) {
		$scope.nData = $route.current.locals.initialData.data;
		$scope.operation =$route.current.locals.initialData.operation;
	}

		/*
		$scope.nData = initialData.data || JSON.parse(JSON.stringify($scope.ngDialogData.item));
		$scope.operation = initialData.operation || $scope.ngDialogData.operation;
		*/
		$scope.tmp = {
			country: {
				val: "",
				valid: $scope.nData.country.length > 0
			},
			type: {
				val: "",
				valid: $scope.nData.type.length > 0
			}
		};

		$scope.addToArray = function (prop) {
			if ($scope.tmp[prop].val.trim() !== "") {
				$scope.formItem.$pristine = false;
				$scope.nData[prop].push($scope.tmp[prop].val.trim());
				$scope.tmp[prop].valid = $scope.nData[prop].length > 0;
			}
			$scope.tmp[prop].val = "";
		};

		$scope.removeFromArray = function (prop, index) {
			$scope.formItem.$pristine = false;
			$scope.nData[prop].splice(index, 1);
			$scope.tmp[prop].valid = $scope.nData[prop].length > 0;
		};

		$scope.submit = function () {
			if ($scope.formItem.$valid) {
				if ($scope.nData.type.length > 0 && $scope.nData.country.length > 0) {
					var action = ($scope.operation === 'modify') ? 
					MajorDisaster.v1.update($scope.nData.event, $scope.nData) :
					MajorDisaster.v1.add($scope.nData);
					action.then(function (res) {
						ngDialog.close($scope.ngDialogId);
						ngDialog.open(buildStatusPopup(res));
					}).catch(function (res) {
						ngDialog.open(buildStatusPopup(res));
					});
				} else {
					window.alert('Datos inválidos');
				}

			}
		};
	})

.controller('overviewPopupCtrl', function ($scope, ngDialog) {
		//console.log($scope.ngDialogData);
		var res = $scope.ngDialogData;
		$scope.data = (function (res) {
			var data = {msg: "", type: ""};
			switch (res.status) {
				case 200:
				case 201:
				case 204:
				data = {msg: "La operación se ha completado con éxito", type: "success"};
				break;
				case 400:
				data = {msg: "Datos inválidos", type: "warning"};
				break;
				case 404:
				data = {msg: "No se encuentra el recurso", type: "warning"};
				break;
				case 405:
				data = {msg: "Operación no permitida", type: "danger"};
				break;
				case 409:
				data = {msg: "El recurso ya existe", type: "warning"};
				break;
				case 502:
				data = {msg: "Operación no disponible", type: "warning"};
				break;
				default:
				data = {msg: "La operación se ha completado con éxito", type: "success"};
			}
			return data;
		})(res);
	})

.controller('overviewLiveGraphCtrl', function ($scope, MajorDisaster, initialData, SocketIO) {
	var fields = {label: 'type', data: 'country'};
	$scope.labels = [];
	$scope.data = [];


	$scope.init = (function () {
		for (var i = 0; i < initialData.data.length; i++) {
			var obj = initialData.data[i];
			for (var j = 0; j < obj.type.length; j++) {
				var index = $scope.labels.indexOf(obj.type[j]);
				if (index === -1) {
					$scope.labels.push(obj.type[j]);
					$scope.data.push(obj.country.length);
				} else {
					$scope.data[index] += obj.country.length;
				}
			}
		}
	})();
		/*
		setTimeout(function () {
			$scope.labels = $scope.labels;
			$scope.$apply();
		}, 1000)
		*/
		console.log($scope.labels, $scope.data)
		//$scope.$apply();

		$scope.updateChart = function (fields, op, data) {
			var difference = 0;
			if (op === 'update') {
				difference = data.new[fields.data].length - data.old[fields.data].length;
				data = data.new;
			}
			else if (op === 'destroy')
				difference = data[fields.data].length * -1;
			else
				difference = data[fields.data].length;

			for (var i = 0; i < data[fields.data].length; i++) {
				var field = data[fields.label][i];
				var index = $scope.labels.indexOf(field);
				$scope.data[index] += difference;
			}
			$scope.$apply();
		};

		SocketIO.on('destroy', function (data) {
			$scope.updateChart(fields, 'destroy', data);
			console.log('destroy', data);
		});

		SocketIO.on('create', function (data) {
			$scope.updateChart(fields, 'create', data);
			console.log('create', data);
		});

		SocketIO.on('update', function (data) {
			$scope.updateChart(fields, 'update', data);
			console.log('update', data);
		});


	});