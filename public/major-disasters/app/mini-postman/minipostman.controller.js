angular.module('majorDisastersApp.miniPostman')

	.controller('miniPostmanCtrl', function ($scope, MajorDisaster) {
		var emptyResponse = {data: "NONE", status: "NONE"};
		$scope.tests = {
			zero: {event: "Great Hanshin earthquake", response: emptyResponse},
			one: {data: '{"country": ["China"],"type": ["earthquake"],"year": 2008,"no-inflation": 148,"inflation": 176.4,"death": 87587,"event": "Terremoto de Lorca"}', response: emptyResponse},
			two: {event: "Great Hanshin earthquake", data: '{"country":["Japan"],"type":["earthquake"],"year":1995,"no-inflation":197,"inflation":329.8,"death":2,"event":"Great Hanshin earthquake"}', response: emptyResponse},
			three: {event: "Terremoto de Lorca", response: emptyResponse},
			four: {response: emptyResponse},
			five: {response: emptyResponse},
			six: {event: "Great Hanshin earthquake", data: '{"country": ["China"],"type": ["earthquake"],"year": 2008,"no-inflation": 148,"inflation": 176.4,"death": 87587,"event": "Sichuan earthquake"}', response: emptyResponse},
			seven: {event: "Great Hanshin earthquake", data: '{"country": ["China"],"type": ["earthquake"],"year": 2008,"no-inflation": 148,"inflation": 176.4,"death": 87587,"event": "Sichuan earthquake"}', response: emptyResponse},
			eight: {response: emptyResponse}
		};
		$scope.apiUrl = MajorDisaster.apiUrl;

		
		$scope.populate = function () {
			MajorDisaster.populate().then(function (res) {
				$scope.tests.eight.response = {status: res.status};
			}).catch(function (res) {
				$scope.tests.eight.response = {status: res.status};
			});
		};

		$scope.list = function () {
			MajorDisaster.list({offset: 0, limit: 0}).then(function	 (res) {
				$scope.tests.four.response = {data: res.data, status: res.status};
			}).catch(function (res) {
				$scope.tests.four.response = {data: res.data, status: res.status};
			});
		};
 
		$scope.get = function (id) {
			MajorDisaster.get(id).then(function (res) {
				$scope.tests.zero.response = {data: res.data, status: res.status};
			}).catch(function (res) {
				$scope.tests.zero.response = {data: res.data, status: res.status};
			});
		};


		$scope.add = function () {
			try {
			    var data = JSON.parse($scope.tests.one.data);
				MajorDisaster.add(data).then(function(res) {
					$scope.tests.one.response = {data: res.data, status: res.status};
				}).catch(function (res) {
					$scope.tests.one.response = {data: res.data, status: res.status};
				});
			} catch (e) {
			    alert(e);
			}
		};

		$scope.addBad = function (id) {
			try {
			    var data = JSON.parse($scope.tests.six.data);
				MajorDisaster.addBad(id, data).then(function(res) {
					$scope.tests.six.response = {data: res.data, status: res.status};
				}).catch(function (res) {
					$scope.tests.six.response = {data: res.data, status: res.status};
				});
			} catch (e) {
			    alert(e);
			}
		};

		$scope.update = function (id) {
			try {
			    var data = JSON.parse($scope.tests.two.data);
				MajorDisaster.update(id, data).then(function(res) {
					$scope.tests.two.response = {data: res.data, status: res.status};
				}).catch(function (res) {
					$scope.tests.two.response = {data: res.data, status: res.status};
				});
			} catch (e) {
			    alert(e);
			}
		};

		$scope.updateBad = function () {
			try {
			    var data = JSON.parse($scope.tests.seven.data);
				MajorDisaster.updateBad(data).then(function(res) {
					$scope.tests.seven.response = {data: res.data, status: res.status};
				}).catch(function (res) {
					$scope.tests.seven.response = {data: res.data, status: res.status};
				});
			} catch (e) {
			    alert(e);
			}
		};

		$scope.remove = function (id) {
			MajorDisaster.remove(id).then(function (res) {
				$scope.tests.three.response = {data: res.data, status: res.status};
			}).catch(function (res) {
				$scope.tests.three.response = {data: res.data, status: res.status};
			});
		};

		$scope.removeAll = function () {
			MajorDisaster.removeAll().then(function (res) {
				$scope.tests.five.response = {data: res.data, status: res.status};
			}).catch(function (res) {
				$scope.tests.five.response = {data: res.data, status: res.status};
			});
		};

});