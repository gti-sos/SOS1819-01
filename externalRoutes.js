const express = require('express');
const request = require('request');
var router = express.Router();
var async = require('async');
var cache = null;
var aweatherCredentials = [
	{ usages: 0, token: 'Basic d1JORml6aXhXaXRHeURlYXIwQVlQTHc3clhpakFOWW46c2pHeEdMQ2RKTHJhZHd1NQo=' },
	{ usages: 0, token: 'Basic WkdPRlZYRlExVkdoZU1CY2M2OElxc1NhUjVtNlRjV0U6QW04QlRNdzBWbExNT2FRbw==' },
	{ usages: 0, token: 'Basic bUsxdkR3RXpjR3l5T2IwcVlRaldqSnhaeEd1OWR6YXo6WGViUDhlMUlzbU5uQTlpQg==' },
	{ usages: 0, token: 'Basic WkU3R2tTVjVXOWxpOEhhSTZlTTZXT2phZGFXQ0x6amU6QW1YSTZKVTZqeFl5WExyVQ==' },
	{ usages: 0, token: 'Basic RktHVjF0clpqbjQ4R2lBMHNIMlJmTFpGR2pRTVFZQzQ6SUVpaWw4Skgyb1hqUEdENw==' },
	{ usages: 0, token: 'Basic QUxiZW52c3NvMzNJN0c0VWVMeVNHa2cyc1lSbFd0N2g6cTk2RHZUWlh5R3JjQmhBUw==' },
	{ usages: 0, token: 'Basic ckl3WUUzYTlTc0lxR0s1ZHJMOE9aZ1NvZTM5OUp2bFM6bVVBVEVhaWNZNkZzbXhVZQ==' },
	{ usages: 0, token: 'Basic aVhFWGI0R2o5bGRQZnBSUVhJR0k3Nk9tbjltYjRPbDA6UFB1MW9HSkFocXRCa2Zieg==' },
	{ usages: 0, token: 'Basic RkpTQWlIVHVjZXMzWnJWZENhNHlpeGxhRWZRbFlNUTQ6TEFQSW1sTmRNUjdqNGhVag==' },
	{ usages: 0, token: 'Basic ZTljNzFZZWFCTHkxYUF5ZW8zWVNxUWxuQ0RTQTVpcEs6UEFFeG9ZVTZiUEFIRHRuMgo=' },
	{ usages: 0, token: 'Basic QkFCRVJ3QmMwdjd4MTlPYkJJSGRUR05TRlJnNjBGYWI6eGxFRE5TZ3BQRzV6YmE3VQ==' },
	{ usages: 0, token: 'Basic aVdjbHdBR0NNS0dqOUtMbU5BcExlelp5Q2RZcnZYaEY6dUFJQTBsUmFNNHNxUERIcg==' },
	{ usages: 0, token: 'Basic Z09kc1RiUHF4SHgxUWtVQkF0QVJzQ20yUHZPellBY2Q6dFRET2FKY2FLckxvVUhoNg==' }
];



router.
get('/youth-unemployment-stats', function(req, res) {
		req.pipe(request('https://sos1819-12.herokuapp.com/api/v1/youth-unemployment-stats')).pipe(res);
	})

	.get('/emigrations-by-countries', function(req, res) {
		req.pipe(request('https://sos1819-08.herokuapp.com/api/v1/emigrations-by-countries')).pipe(res);
	})

	.get('/marcas-vehiculos', function(req, res) {
		req.pipe(request('https://parallelum.com.br/fipe/api/v1/carros/marcas')).pipe(res);
	})
	.get('/albums', function(req, res) {
		req.pipe(request('https://api.myjson.com/bins/1lzv8')).pipe(res);
	})
	.get('/pollution-stats', function(req, res) {
		req.pipe(request('https://sos1819-12.herokuapp.com/api/v1/pollution-stats')).pipe(res);
	})

	.get('/sports-centers', function(req, res) {
		req.pipe(request('https://sos1819-15.herokuapp.com/api/v1/sports-centers')).pipe(res);
	})
	.get('/country-stats', function(req, res) {
		req.pipe(request('https://sos1819-03.herokuapp.com/api/v1/country-stats')).pipe(res);
	})
	.get('/computers-attacks-stats', function(req, res) {
		req.pipe(request('https://sos1819-03.herokuapp.com/api/v1/computers-attacks-stats')).pipe(res);
	})
	.get('/poke', function(req, res) {
		/*
		request('https://pokeapi.co/api/v2/type', function (err, httpcode, resp) {
			console.log(resp)
			res.json({})
		})
		*/
		req.pipe(request('https://pokeapi.co/api/v2/type')).pipe(res);
	})

	.get('/awhere/weather', function(req, res) {
		var randomToken = aweatherCredentials[Math.floor(Math.random() * aweatherCredentials.length)];

		for (var i = 0; i < 10; i++) {
			if (randomToken.usages >= 20)
				randomToken = aweatherCredentials[Math.floor(Math.random() * aweatherCredentials.length)];
			else {
				randomToken.usages++;
				break;
			}
		}

		var logOpts = {
			uri: 'https://api.awhere.com/oauth/token',
			method: 'POST',
			body: 'grant_type=client_credentials',
			json: true,
			headers: {
				Authorization: randomToken.token,
				"Content-Type": 'application/x-www-form-urlencoded'
			}
		};

		var fieldOpts = {
			uri: 'https://api.awhere.com/v2/fields',
			method: 'POST',
			body: {
				"id": "field1",
				"name": "My First Field",
				"farmId": "farm1",
				"acres": 100,
				"centerPoint": {
					"latitude": 39.8282,
					"longitude": -98.5795
				}
			},
			json: true,
			headers: {
				Authorization: '',
				"Content-Type": 'application/json'
			}
		};

		var dataOpts = {
			uri: 'https://api.awhere.com/v2/weather/fields/field1/norms/08-23,10-23/years/2005,2008?limit=5',
			method: 'GET',
			json: true,
			headers: {
				Authorization: '',
				"Content-Type": 'application/json'
			}
		};

		request(logOpts, function(err, httpCode, response) {
			if (err) return res.sendStatus(httpCode);
			if (cache) return res.json(cache);
			fieldOpts.headers.Authorization = 'Bearer ' + response.access_token;
			dataOpts.headers.Authorization = 'Bearer ' + response.access_token;
			request(fieldOpts, function(err1, httpCode1, response1) {
				request(dataOpts, function(err2, httpCode2, response2) {
					if (!err2) {
						cache = response2;
						return res.json(response2);
					}
					res.sendStatus(httpCode2);
				});
			});

		});
	});

module.exports = router;
