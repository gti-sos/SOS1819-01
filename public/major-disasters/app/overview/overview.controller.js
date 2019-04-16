angular.module('majorDisastersApp.overview')

	.controller('overviewCtrl', function ($scope, MajorDisaster) {
		$scope.data = [];
		$scope.pagination = {
			offset: 0,
			limit: 8,
			count: 0
		};
		$scope.navigate = function (index) {
			if (index >= 0) {
				$scope.pagination.offset = index;
				MajorDisaster.list($scope.pagination).then(function (res) {
					$scope.data = res.data;

					console.log(res.data)
				}).catch(function (res) {
					window.alert(JSON.stringify(res));
				});
			}
		};

		MajorDisaster.list($scope.pagination).then(function (res) {
			$scope.data = res.data;
		}).catch(function (res) {
			window.alert(JSON.stringify(res));
		});
		MajorDisaster.count().then(function (res) {
			$scope.pagination.count = Math.floor(res.data.count / $scope.pagination.limit);
			//console.log($scope.pagination.count)
		}).catch(function (res) {
			window.alert(JSON.stringify(res));
		});
	});