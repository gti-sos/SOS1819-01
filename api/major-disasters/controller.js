const mongoose = require('mongoose');
const Model = require('./model.js');
const MajorDisaster = mongoose.model("MajorDisaster");
const populateData = require("./populateData.json");

exports.init = async function (req, res) {
	const number = await MajorDisaster.countDocuments({});
	let err = undefined;
	if (number > 0) {
		err = new Error();
		err.message = "collection majorDisasters is already populated!";
		err.name = "populationError";
		err.httpCode = 405;
		res.status(err.httpCode).json(err);
	} else {
		const promises = populateData.map(function (e) {
			new MajorDisaster(e).save();
		});
		await Promise.all(promises);
		res.status(200).json({code: 200, msg: "OK"});
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
		if (err || !data)
			return res.status(404).json({code: 404, msg: "Not Found"});
		res.json(data);
	});
};

exports.create = async function (req, res) {
	let majorDisaster = new MajorDisaster(req.body);
	const count = await MajorDisaster.countDocuments({event: req.body.event});
	if (count > 0) 
		return res.status(409).json({code: 409, msg: "Conflict"});
	majorDisaster.save(function (err, data) {
		let code = err ? 400 : 201;
		let msg = err ? "Bad Request" : "Created";
		res.status(code).json({code: code, msg: msg, data: data});
	});
};

exports.update = function (req, res) {
	if (req.params.id !== req.body._id)
		return res.status(400).json({code: 400, msg: "Bad Request"});

	MajorDisaster.updateOne({_id: req.params.id}, req.body, function (err) {
		let code = (err) ? 404 : 200;
		let msg = (err) ? "Not Found" : "OK";
		res.status(code).json({code: code, msg: msg});
	});
};

exports.destroy = function (req, res) {
	MajorDisaster.deleteOne({_id: req.params.id}, function (err) {
		let code = (err) ? 404 : 200;
		let msg = (err) ? "Not Found" : "No Content";
		res.status(code).json({code: code, msg: msg});
	});
};

exports.destroyAll = function (req, res) {
	MajorDisaster.deleteMany({}, function (err) {
		let code = (err) ? 404 : 200;
		let msg = (err) ? "Not Found" : "No Content";
		res.status(code).json({code: code, msg: msg});
	});
};