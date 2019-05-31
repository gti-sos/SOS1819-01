
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
.controller('overviewCtrl', function ($scope, $location, $q, MajorDisaster, initialData, ngDialog, autoLoad, SocketIO) {

	var searchObj = $location.search();
	$scope.loading = false;
	$scope.data = initialData.data || [];


		xAxisData = []; //tags
		seriesData = [];

		for (var i = 0; i < initialData.data.length; i++) {
			var elm = initialData.data[i];
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
			tooltip: {},
			legend: {
				data:['Nº de incidentes']
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




		function compare( a, b ) {
		  if ( a.last_nom < b.last_nom ){
		    return -1;
		  }
		  if ( a.last_nom > b.last_nom ){
		    return 1;
		  }
		  return 0;
		}


		var nData2 = $scope.data.splice(0);
		
		nData2.sort(function (a, b) {
			if ( a.death < b.death ){
			   return 1;
			 }
			 if ( a.death > b.death ){
			   return -1;
			 }
			 return 0;
		});

		nData2 = nData2.slice(0, 50);
		
		var nData2 = nData2.map(function (e) {
			return {x: e.year, y: e.inflation, z: e.death, name: e.event};
		});

		console.log(nData2, initialData)
		
		/*
		for (var i = 0; i < $scope.data.length; i++) {
			var elm = $scope.data[i];

		}
		*/



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
		        text: 'Lista de las ' + nData2.length + ' catástrofes con más muertes'
		    },

		    subtitle: {
		        text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>'
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
		        data: nData2 /*[
		            { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
		            { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
		            { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
		            { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
		            { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
		            { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
		            { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
		            { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
		            { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
		            { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
		            { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
		            { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
		            { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
		            { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
		            { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
		        ]*/
		    }]

		});





















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