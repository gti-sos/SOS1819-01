var Model = require('./model.js');

exports.init = function (req, res) {
	Model.init();
	res.end();
};

exports.list = function (req, res) {
	Model.getAll(req.query, (data) => {
		res.send(data);
	});
};

exports.get = function (req, res) {
	Model.getById(req.params.id, (data) => {
		res.send(data);
	});
};

exports.create = function (req, res) {
	Model.add(req.body, (err) => {
		var code = (err) ? 401 : 201;
		res.status(code).send(req.body);
	});
	
};

exports.update = function (req, res) {
	Model.update(req.params.id, req.body, (err) => {
		var code = (err) ? 409 : 200;
		res.status(code).end();
	});
};

exports.destroy = function (req, res) {
	res.status(204).end();
};

exports.destroyAll = function (req, res) {
	res.status(204).end();
};