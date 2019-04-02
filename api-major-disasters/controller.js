const mongoose = require('mongoose');
const Model = require('./model.js');
const MajorDisaster = mongoose.model("MajorDisaster");
const populateData = require("./populateData.json");

exports.init = function (req, res) {
	//const count = await MajorDisaster.countDocuments({});
	MajorDisaster.countDocuments({}, function (er, count) {
		if (count > 0) {
			res.sendStatus(405);
		} else {
			const promises = populateData.map(function (e) {
				return new MajorDisaster(e).save();
			});
			Promise.all(promises).then(function () {
				res.sendStatus(200);
				//res.status(200).json({code: 200, msg: "OK"});
			});
		}
	});
	
}

exports.list = function (req, res) {
	let search = {fields: {}, page: undefined, limit: undefined};

	for (let key in req.query) {
		if (["from", "to"].indexOf(key) > -1) {
			var nCondition = (key === "from") ? "$gte" : "$lte";
			if (!search.fields.year) 
				search.fields.year = {};
			search.fields.year[nCondition] = parseInt(req.query[key]);
		} else if (["page", "limit"].indexOf(key) > -1)
			search[key] = parseInt(req.query[key]);
		else if (["country", "type"].indexOf(key) > -1)
			search.fields[key] = {"$in": req.query[key]};
		else 
			search.fields[key] = req.query[key];
	}

	//console.log(search);
	MajorDisaster.find(search.fields).select("-__v -_id").limit(search.limit).skip(search.page * search.limit).exec(function (err, data) {
		if (err)
			return res.send(err);
		res.json(data);	
	});
	
};

exports.get = function (req, res) {
	MajorDisaster.findOne({event: req.params.event}).select("-__v -_id").exec(function (err, data) {
		if (err || !data)
			return res.sendStatus(404);
			//return res.status(404).json({code: 404, msg: "Not Found"});
		res.json(data);
	});
};

exports.create = function (req, res) {
	let majorDisaster = new MajorDisaster(req.body);
	//const count = await MajorDisaster.countDocuments({event: req.body.event});
	MajorDisaster.countDocuments({event: req.body.event}, function (er, count) {
		if (count > 0) 
			return res.sendStatus(409);
		majorDisaster.save(function (err, data) {
			res.sendStatus(err ? 400 : 201);
			//res.status(code).json({code: code, msg: msg, data: data});
		});
	});
};

exports.update = function (req, res) {
	if (req.body.event && req.params.event !== req.body.event)
		return res.sendStatus(409);
	MajorDisaster.findOne({event: req.params.event}).then(function (doc) {
		//console.log(doc, doc instanceof MajorDisaster);
		//res.json(doc);
		//console.log(Object.keys(doc._doc), Object.keys(req.body));
		var oKeys = Object.keys(doc._doc).filter((x) => { return ["__v", "_id"].indexOf(x) === -1; });
		//console.log(oKeys);

		//console.log(oKeys, Object.keys(req.body))
		if (!oKeys.every(val => Object.keys(req.body).includes(val))) return res.sendStatus(400);
		//if ((Object.keys(doc).length) !== Object.keys(req.body).length) return res.sendStatus(400);
		//delete req.body._id;
		for (var key in req.body) {
			doc[key] = req.body[key];
		}
		doc.validate(function (err) {
			if (err) return res.sendStatus(400);
			doc.save();
			res.sendStatus(200);
		});
	}).catch(function (err) {
		res.sendStatus(400);
		//res.status(400).send(err);
	});
};

exports.destroy = function (req, res) {
	MajorDisaster.deleteOne({event: req.params.event}, function (err) {
		res.sendStatus((err) ? 404 : 200);
	});
};

exports.destroyAll = function (req, res) {
	MajorDisaster.deleteMany({}, function (err) {
		res.sendStatus((err) ? 404 : 200);
	});
};