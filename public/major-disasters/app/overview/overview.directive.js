angular.module('majorDisastersApp.overview')
	.directive('arrayInput', function () {
		return {
			restrict: "A",
			require: 'ngModel',
			link: function (scope, elm, attr, ngModel) {
				
						//scope.tmp[attr.name] = viewValue;
						//console.log(modelValue)
						/*
				        if (scope.nData.length > 0) {
				          return true
				        }
				        return false;
				        c
				      console.log(scope.nData[attr.name])
				      if ([1,2,3,4,5,].length > 0) {
				      	return true
				      } else 
				      	return null;
				      //return scope.nData[attr.name].length > 0;




				      };

				     */    
				   
				//console.log(scope)
				/*
				ngModel.$parsers.unshift(function(value) {
					var valid = attr.arrayInput.length > 0;
				 	ngModel.$setValidity('arrayInput', valid);
				        return valid ? value : undefined;
					});

				          //For model -> DOM validation
				ngModel.$formatters.unshift(function(value) {
				   ngModel.$setValidity('arrayInput', attr.arrayInput.length > 0);
				   return value;
				});
				
				ngModel.$validators[attr.name] = function () {
					console.log(attr.arrayInput)
					//console.log(scope.tmp[attr.name], attr.arrayInput.length, typeof attr.arrayInput);
					//console.log($parse(attr.ngModel));
					//var a = scope.nData[attr.name].length > 0;
					//ngModel.$modelValue = scope.tmp[attr.name];
					//return scope.nData[attr.name].length > 0;
					//return a;
					//return scope.nData[attr.name].length > 0;
				};
				*/		

			}
		};
	});


/*
	.directive('food', function (){ 
	  return {
	    require: 'ngModel',
	    link: function(scope, elem, attr, ngModel) {
	      function updateFoodInfo(scope, elem){
	          var food1 = $('#food').val();
	          var data = scope.foods;
	          if (data.indexOf(food1) < 0) {
	            ngModel.$parsers.unshift(function (value) {
	              ngModel.$setValidity('food', data.indexOf(value) !== -1);
					return value;
	            });
	          }
			}
	      setInterval(function(){updateFoodInfo(scope,elem);}, 1000);
	    }
	  };
	});
*/