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