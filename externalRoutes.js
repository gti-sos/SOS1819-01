const express = require('express');
const request = require('request');
var router = express.Router();

router.
	get('/youth-unemployment-stats', function (req, res) {
		req.pipe(request('https://sos1819-12.herokuapp.com/api/v1/youth-unemployment-stats')).pipe(res);
	})

	.get('/emigrations-by-countries', function (req, res) {
		req.pipe(request('https://sos1819-08.herokuapp.com/api/v1/emigrations-by-countries')).pipe(res);
	})

	.get('/pollution-stats', function (req, res) {
		req.pipe(request('https://sos1819-15.herokuapp.com/api/v1/sports-centers')).pipe(res);
	})

	.get('/sports-centers', function (req, res) {
		req.pipe(request('https://sos1819-15.herokuapp.com/api/v1/sports-centers')).pipe(res);
	});


module.exports = router;