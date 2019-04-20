

function buildStatusPopup (data) {
	return popupConfig = {
		template: '/ui/v1/major-disasters/overview/overviewPopup.template.pug',
		className: 'ngdialog-theme-plain',
		disableAnimation: true,
		controller: 'overviewPopupCtrl',
		data: (data) ? data: {}
	};
}

angular.module('majorDisastersApp.overview')

	.controller('overviewCtrl', function ($scope, $q, MajorDisaster, initialData, ngDialog) {
		$scope.loading = false;
		$scope.nData = {};
		$scope.data = initialData.data || [];
		$scope.filter =  {
			offset: initialData.pagination.offset || 0,
			limit: initialData.pagination.limit || 10,
			count: initialData.pagination.count || 0,
			event: null,
			year: null,
			death: null, 
			inflation: null, 
			"no-inflation": null, 
			type: null, 
			country: null,
			from: null,
			to: null
		};

		$scope.yearFilterSelector = {

		};

		function processFilter (obj) {
			//var obj = JSON.parse(JSON.stringify($scope.filter));
			obj.country = (obj.country) ? obj.country.split(',').map(e => {if (e) return e.trim(); }) : obj.country;
			obj.type = (obj.type) ? obj.type.split(',').map(e => {if (e) return e.trim(); }) : obj.type;
			return obj;
		}

		$scope.navigate = (index) => {
			index = (index) ? index : 0;
			reloadTableData(index, function (res) {
				$scope.filter.offset = index;
			});
			/*
			$q.all([MajorDisaster.list(processFilter()), MajorDisaster.count($scope.filter)]).then((res) => {
				$scope.loading = false;
				$scope.data = res[0].data;
				$scope.filter.count = Math.ceil(res[1].data.count / $scope.filter.limit);
			}).catch((res) => {
				$scope.filter.offset = index;

				$scope.loading = false;
				window.alert(JSON.stringify(res));
			});
			*/
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
			$q.all([MajorDisaster.v1.list(processFilter(filterObj)), MajorDisaster.v2.count(filterObj)]).then((res) => {
				$scope.data = res[0].data;
				$scope.filter.count = Math.ceil(res[1].data.count / $scope.filter.limit);
				$scope.loading = false;
				if (cb) cb(res);
			}).catch(function (res) {
				$scope.loading = false;
				if (cb) cb(res);
			});
		};

		$scope.create = () => {
			ngDialog.open({
				template: '/ui/v1/major-disasters/overview/overviewItem.template.pug',
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
				}, preCloseCallback: reloadTableData
			});
		};

		$scope.remove = (id) => {
			MajorDisaster.v1.remove(id).then((rRes) => {
				if ($scope.data.length === 1 && $scope.filter.offset > 0) $scope.filter.offset -= 1;
				reloadTableData(function (res) {
					$scope.data = res[0].data;
					$scope.filter.count = Math.ceil(res[1].data.count / $scope.filter.limit);
					ngDialog.open(buildStatusPopup(rRes));
				});
			}).catch((rRes) => {
				ngDialog.open(buildStatusPopup(rRes));
			});
		};

		$scope.removeAll = () => {
			if (window.confirm("¿Borrar TODOS los elementos?"))
				MajorDisaster.v1.removeAll().then(function (res) {
					reloadTableData(function () {
						buildStatusPopup(res);
					});
				}).catch(function (res) {
					reloadTableData(function () {
						buildStatusPopup(res);
					});
				});
		};

		$scope.modify = (item) => {
			ngDialog.open({
				template: '/ui/v1/major-disasters/overview/overviewItem.template.pug',
				controller: "overviewModItemCtrl",
				data: {
					operation: 'modify',
					item: item
				}, preCloseCallback: reloadTableData
			});
			//window.alert(JSON.stringify(item))
		};
	})


	.controller('overviewModItemCtrl', function ($scope, MajorDisaster, ngDialog) {
		$scope.nData = JSON.parse(JSON.stringify($scope.ngDialogData.item));
		$scope.operation = $scope.ngDialogData.operation;
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
		$scope.addToArray = (prop) => {
			if ($scope.tmp[prop].val.trim() !== "") {
				$scope.formItem.$pristine = false;
				$scope.nData[prop].push($scope.tmp[prop].val.trim());
				$scope.tmp[prop].valid = $scope.nData[prop].length > 0;
			}
			$scope.tmp[prop].val = "";
		};

		$scope.removeFromArray = (prop, index) => {
			$scope.formItem.$pristine = false;
			$scope.nData[prop].splice(index, 1);
			$scope.tmp[prop].valid = $scope.nData[prop].length > 0;
		};

		$scope.submit = () => {
			if ($scope.formItem.$valid) {
				if ($scope.nData.type.length > 0 && $scope.nData.country.length > 0) {
					var action = ($scope.operation === 'modify') ? 
						MajorDisaster.v1.update($scope.nData.event, $scope.nData) :
						MajorDisaster.v1.add($scope.nData);
					action.then((res) => {
						ngDialog.close($scope.ngDialogId);
						ngDialog.open(buildStatusPopup(res));
					}).catch((res) => {
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
	});



function validate (obj) {
	var keys = ["inflation", "no-inflation", "death", "year", "country", "type", "event"];
	var validData = keys.every(val => Object.keys($scope.nData).includes(val));
	var res = validData;
	if (validData) {
		var typesCheck = [
			isFinite(obj.inflation),
			isFinite(obj["no-inflation"]),
			isFinite(obj.death),
			isFinite(obj.year),
			obj.type instanceof Array,
			obj.country instanceof Array,
			obj.event.trim() !== ""
		].every(val =>  {return val === true;});
		if (!typesCheck) window.alert('Datos incorrectos');
		res = typesCheck;
	} else {
		window.alert('Faltan datos');
	}
	return res;
}


