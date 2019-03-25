//mock de datos
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	"country": [{type: String, required: true}],
	"no-inflation": {type: Number, required: true},
	"inflation": {type: Number, required: true},
	"death": {type: Number, required: true},
	"type": [{type: String, required: true}],
	"year": {type: Number, required: true},
	"event": {type: String, required: true}
});

var _data = [];
/*
schema.statics.populate = function (data, cb) {
	for (var i = data.length - 1; i >= 0; i--) {
		let item = newdata[i]
	}
};
*/

/*
_setData = function (data) {
	_data = data;
};



exports.getAll = (cb) => {
	cb(_data);
};

exports.getFiltered = (query, cb) => {
	var res = [];
	//console.log('getting all', _data)
	if (Object.keys(query).length === 0) {
		res = _data
	} else {
		_data.forEach(function (e) {
			var add = false;
			for (var key in query) {
				if (key === 'from' && e.year >= parseInt(query[key]) && (!query['to']) || e.year <= parseInt(query['to']))
					add = true; 
				if (key === 'country' || key === 'type')
					add = e.country.filter(value => query[key].includes(value)).length > 0;
				if (e[key] == query[key] || Object.keys(query).length === 0) 
					add = true;	
			}
			if (add) res.push(e);
		});
	}
	cb(res);
};

exports.getById = function (id, cb) {
	cb(_data.filter((x) => { return x.id == id }));
};




exports.add = function (obj, cb) {
	MajorDisaster.save(obj, function (err) {
		if (err)
			console.log('err on add', err);
		cb(err);
	});
	//var err = false;
	//obj.id = Date.now();
	//_data.push(obj);
};

exports.update = function (id, obj, cb) {
	var err = false;

	for (var i = _data.length - 1; i >= 0; i--) {
		if (_data[i].id == id) {
			if (_data[i].id == obj.id) {
				_data[i] = obj;
			} else {
				err = true;
			}
			break;
		}
	}
	cb(err);
};

exports.destroy = function (id, cb) {
	_data = _data.filter((e) => {
		return e.id != id;
	});
	cb(_data);
};

exports.destroyAll = function (cb) {
	_setData([]);
	cb();
};
*/
mongoose.model('MajorDisaster', schema);