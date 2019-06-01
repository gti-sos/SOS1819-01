const mongoose = require('mongoose');
const Model = require('./model.js');
const MajorDisaster = mongoose.model("MajorDisaster");
const populateData = require("./populateData.json");
const jwt = require('jsonwebtoken');
const app = require('../index.js').app;
const io = require('../index.js').io;
const nsp = io.of('/major-disasters');
const request = require('request');

function buildSearch (req) {
	let search = {fields: {}, offset: undefined, limit: undefined};
	for (let key in req.query) {
		if (req.query[key]) {
			if (["from", "to"].indexOf(key) > -1) {
				var nCondition = (key === "from") ? "$gte" : "$lte";
				if (!search.fields.year) 
					search.fields.year = {};
				search.fields.year[nCondition] = parseInt(req.query[key]);
			} else if (["offset", "limit"].indexOf(key) > -1)
				search[key] = parseInt(req.query[key]);
			else if (["country", "type"].indexOf(key) > -1)
				search.fields[key] = {"$in": new RegExp(req.query[key], 'i')};
			else if (key === 'event')
				search.fields[key] = new RegExp(req.query[key], 'i');
			else
				search.fields[key] = req.query[key];
		}
	}
	return search;
}



exports.api = {
	v1: {
		init: function (req, res) {
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
					}).catch(function () {
						res.sendStatus(400);
					});
				}
			});
		},
		list: function (req, res) {
			var search = buildSearch(req);
			MajorDisaster.find(search.fields).select("-__v -_id").limit(search.limit).skip(search.offset * search.limit).exec(function (err, data) {
				if (err)
					return res.send(err);
				res.json(data);	
			});
			
		},
		get: function (req, res) {
			MajorDisaster.findOne({event: req.params.event}).select("-__v -_id").exec(function (err, data) {
				if (err || !data)
					return res.sendStatus(404);
					//return res.status(404).json({code: 404, msg: "Not Found"});
				res.json(data);
			});
		},
		create: function (req, res) {
			let majorDisaster = new MajorDisaster(req.body);
			//const count = await MajorDisaster.countDocuments({event: req.body.event});
			MajorDisaster.countDocuments({event: req.body.event}, function (er, count) {
				if (count > 0) 
					return res.sendStatus(409);
				majorDisaster.save(function (err, data) {
					if (!err) nsp.emit('create', data); 
					res.sendStatus(err ? 400 : 201);
					//res.status(code).json({code: code, msg: msg, data: data});
				});
			});
		},
		update: function (req, res) {
			if (req.body.event && req.params.event !== req.body.event) return res.sendStatus(400);
			MajorDisaster.findOne({event: req.params.event}).then(function (doc) {
				if (!doc) return res.sendStatus(404);
				var old = JSON.parse(JSON.stringify(doc._doc));
				var oKeys = Object.keys(doc._doc).filter(e => {return e !== '_id' && e !== "__v";});
				if (!oKeys.every(val => Object.keys(req.body).includes(val))) return res.sendStatus(400);
				for (var key in req.body) doc[key] = req.body[key];
				doc.validate(function (vErr) {
					console.log('vErr', vErr);
					if (vErr) return res.sendStatus(400);
					doc.save(function (sErr) {
						console.log('sErr', sErr);
						if (sErr) return res.sendStatus(400);
						nsp.emit('update', {old: old, new: req.body});
						res.sendStatus(200);
					});
				});
			}).catch(function (err) {
				console.log(err);
				res.sendStatus(400);
			});
		},
		destroy: function (req, res) {
			if (req.body.event && req.params.event !== req.body.event) return res.sendStatus(400);
			MajorDisaster.findOne({event: req.params.event}).select("-__v -_id").exec(function (err, doc) {
				if (err) return res.sendStatus(404);
				MajorDisaster.deleteOne({event: req.params.event}).catch(function (err) {
					res.sendStatus(400);
				}).then(function (result) {
					if (result.n === 0) 
						res.sendStatus(404);
					else {
						nsp.emit('destroy', doc);
						res.sendStatus(200);
					}
					return (result.n === 0) ? res.sendStatus(404) : res.sendStatus(200);
				});
			});
			
		},
		destroyAll: function (req, res) {
			MajorDisaster.deleteMany({}, function (err) {
				res.sendStatus((err) ? 404 : 200);
			});
		}
	},
	v2: {
		count: function (req, res) {
			var search = buildSearch(req);
			//console.log(search.fields);
			MajorDisaster.countDocuments(search.fields, function (err, count) {
				if (err) return res.json(err);
				res.json({count: count});
			});
		},
		login: function (req, res) {
			if (!req.body.user || !req.body.password) return res.sendStatus(400);
			var username = req.body.user;
			var password = req.body.password;
		  	if(!(username === 'test' && password === 'test'))
			     return res.status(401).json({error: 'usuario o contraseña inválidos'});
			var token = jwt.sign({username: username, date: Date.now()}, 'salt', {
				expiresIn: 60 * 60 * 24
			});
			res.json(token);
		}
	}
};