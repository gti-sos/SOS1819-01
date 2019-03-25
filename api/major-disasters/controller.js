const mongoose = require('mongoose');
const Model = require('./model.js');
const MajorDisaster = mongoose.model("MajorDisaster");
const populateData = require("./populateData.json");

exports.init = async function (req, res) {
	const number = await MajorDisaster.countDocuments({});
	let err = undefined;
	if (number > 0) {
		err = new Error();
		err.message = "majorDisasters is already populated!";
		err.name = "populationError";
		err.httpCode = 405;
		res.status(err.httpCode).send(err);
	} else {
		const promises = populateData.map(function (e) {
			new MajorDisaster(e).save();
		});
		await Promise.all(promises);
		res.status(200).end();

	}
}

exports.list = async function (req, res) {
	let search = {fields: {}, page: undefined, limit: undefined};

	for (let key in req.query) {
		if (["from", "to"].indexOf(key) > -1) {
			var nCondition = (key === "from") ? "$gt" : "$lt";
			if (!search.fields.year) 
				search.fields.year = {};
			search.fields.year[nCondition] = req.query[key];
		} else if (["page", "limit"].indexOf(key) > -1)
			search[key] = parseInt(req.query[key]);
		else if (["country", "type"].indexOf(key) > -1)
			search.fields[key] = {"$in": req.query[key]};
		else 
			search.fields[key] = req.query[key];
	}

	//console.log(search);
	MajorDisaster.find(search.fields).limit(search.limit).skip(search.page * search.limit).exec(function (err, data) {
		if (err)
			return res.send(err);
		res.json(data);	
	});
	
};

exports.get = function (req, res) {
	MajorDisaster.findById(req.params.id, function (err, data) {
		res.json(data);
	});
};

exports.create = function (req, res) {
	let majorDisaster = new MajorDisaster(req.body);
	majorDisaster.save(function (err) {
		let code = (err) ? 401 : 201;
		let msg = (err) ? err.message : ""; 
		res.status(code).send(msg);
	});
};

exports.update = function (req, res) {
	MajorDisaster.updateOne({_id: req.params.id}, req.body, function (err) {
		let code = (err) ? 404 : 200;
		res.status(code).send(err);
	});
};

exports.destroy = function (req, res) {
	MajorDisaster.deleteOne({_id: req.params.id}, function (err) {
		res.status((err) ? 404 : 204).end();
	});
};

exports.destroyAll = function (req, res) {
	MajorDisaster.deleteMany({}, function () {
		res.status(204).end();
	});
};