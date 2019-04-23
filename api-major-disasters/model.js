//mock de datos
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	"country": [{type: String, required: true}],
	"no-inflation": {type: Number, required: true},
	"inflation": {type: Number, required: true},
	"death": {type: Number, required: true},
	"type": [{type: String, required: true}],
	"year": {type: Number, required: true},
	"event": {type: String, required: true, unique: true, index: true}
});

mongoose.model('MajorDisaster', schema);



/*
	var arr = document.getElementsByClassName("wikitable")[0].childNodes[2].childNodes
	var data = []
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].tagName === "TR") {
			var row = arr[i].textContent.split("\n").filter(function (e) { return e !== "" })
			var c = arr[i].lastElementChild.getElementsByTagName("IMG");
			var country = []
			for (var j = 0; j < c.length; j++) {
				country.push(c[j].alt)
	        }	
			//arr[i].textContent.split("\n").filter(function (e) { return e !== "" })
	        
			var obj = {
				inflation: parseFloat(row[1].split("[")[0].split("–").reverse()[0].replace("$", "").replace("≥", "").replace("~", "").replace(">", "").trim()), 
				"no-inflation": parseFloat(row[0].split("–").reverse()[0].replace("$", "").replace("≥", "").replace("~", "").replace(">", "").trim()), 
				country: country,//row[6].split(",").map(function (e) { return e.trim() }),
				event: row[3].trim().replace(/[0-9]/g, ''), 
				type: row[4].trim().split(",").map(function (e) { return e.trim() }), 
				year: parseInt(row[5].trim()), 
				death: parseInt(row[2].split("–").reverse()[0].trim())
			}
			data.push(obj)
			//console.log(obj)
		}
	}
	console.log(JSON.stringify(data))
*/