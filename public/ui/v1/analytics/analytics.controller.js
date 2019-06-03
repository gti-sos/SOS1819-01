angular.module('SOS1819-app.analytics')

.controller('analyticsCtrl', function ($scope, initialData) {
	console.log(initialData);
	
	var disastersSeries = initialData.disasters.data.map(function (e, i) {
		return [i, e.inflation];
	});
	var bombSeries = initialData.bombs.data.map(function (e, i) {
		return [i, e.hob];
	});
	var hurricanesSeries = initialData.hurricanes.data.map(function (e, i) {
		return [i, e.damagesuntil2008];
	});

	var chart = new EJSC.Chart("main", {
	    show_legend: true,
	  });

	  var stack = chart.addSeries(new EJSC.StackedBarSeries({
	      intervalOffset: 1,
	      title: "Integración grupal"
	  }));
	  
	  stack.addSeries(new EJSC.BarSeries(
	    new EJSC.ArrayDataHandler(disastersSeries),
	    {title: "Coste en millones de $"}
	  ));
	  
	  stack.addSeries(new EJSC.BarSeries(
	    new EJSC.ArrayDataHandler(bombSeries),
	    {title: "Número de disparos"}
	  ));
	  stack.addSeries(new EJSC.BarSeries(
	    new EJSC.ArrayDataHandler(hurricanesSeries),
	    {title: "Daños hasta 2008"}
	  ));
});