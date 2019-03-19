//mock de datos

var _data = [];


_setData = function (data) {
	_data = data;
};

exports.init = () => {
	var nData = [
		{"id": 1, "country": ["Japan"], "year": 2011, "no-inflation": 360, "inflation": 411.30, "death": 15894, "type": ["earthquake", "tsunami"], "event": "Tōhoku earthquake and tsunami"},
		{"id": 2, "country": ["Japan"], "year":1995, "no-inflation":	197, "inflation":	329.80, "death":	5502, "type":	["earthquake"], "event": "Great Hanshin earthquake"},
		{"id": 3, "country": ["China"], "year":2008, "no-inflation":	148, "inflation":	176.40, "death":	87587, "type":	["earthquake"], "event": "Sichuan earthquake"},
		{"id": 4, "country": ["United States"], "year":2005, "no-inflation":	125, "inflation":	165, "death": 1245, "type":	["cyclone"], "event": "Hurricane Katrina"},
		{"id": 5, "country": ["United States"], "year":2017, "no-inflation":	125, "inflation":	129.50, "death":	107, "type":	["cyclone"], "event": " Hurricane Harvey"},
		{"id": 6, "country": ["Puerto Rico, Dominica, Guadeloupe"], "year":2017, "no-inflation":	91.60, "inflation":94.90, "death": 3057, "type": ["cylone"], "event": "Hurricane Maria"},
		{"id": 7, "country": ["United States, Haiti, Saint Martin"], "year":2012, "no-inflation":	68.7, "inflation":76.30, "death": 233, "type":["cyclone"], "event": "Hurricane Sandy"},
		{"id": 8, "country": ["United States"], "year":2017, "no-inflation":	64, "inflation": 66.50, "death":134, "type": ["cyclone"], "event":	"Hurricane Irma"},
		{"id": 9, "country": ["United States", "Canada"], "year":2010, "no-inflation": 60, "inflation": 69.70, "death": 11, "type": ["contamination"], "event": "Deepwater Horizon oil spill"}
	];
	_setData(nData)
	console.log(_data);
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
	var err = false;
	obj.id = Date.now();
	_data.push(obj);
	cb(err);
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