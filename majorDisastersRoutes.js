const express = require('express');
var router = express.Router();
const path = require('path');
const simpleOauth2 = require('simple-oauth2');
const request = require('request');

const oauth2 = simpleOauth2.create({
	client: {
		id: "c5c1e43e307942afbcbd",
		secret: "4209f44f43e2037a86d97fe9052b12dd35dbb5cd"
	},
	auth: {
		tokenHost: 'https://github.com',
		tokenPath: '/login/oauth/access_token',
		authorizePath: '/login/oauth/authorize'
	}
});

const authorizationUri = oauth2.authorizationCode.authorizeURL({
	redirect_uri: 'https://sos1819-01.herokuapp.com/major-disasters/oauth-callback',
	scope: 'read:user',
	state: '3(#0/!~',
});

router
	/*
	.get('/major-disasters/:directory/:file', function (req, res) {
      res.render(path.join(__dirname, "public/ui/v1/major-disasters/app", req.params.directory + '/' + req.params.file));
    });

    .post('/login', function (req, res) {
    	if (!req.body.user || !req.body.password) return res.sendStatus(400);
    	var username = req.body.user;
    	var password = req.body.password;
    	  	if(!(username === 'test' && password === 'test'))
    		     return res.status(401).json({error: 'usuario o contraseña inválidos'});
    	var token = jwt.sign({username: username, date: Date.now()}, 'Secret Password', {
    		expiresIn: 60 * 60 * 24
    	});
    	res.json(token);
    })
    */

    .get('/oauth', function (req, res) {
    	res.redirect(authorizationUri);
    })

    .get('/oauth-callback', function (req, res) {
    	const code = req.query.code;
    	const options = {code};
    	oauth2.authorizationCode.getToken(options).then(function (result) {
    		console.log('The resulting token: ', result);
    		const token = oauth2.accessToken.create(result);
    		return res.status(200).cookie('oauth', token, {httpOnly: true, maxAge: 1000 * 60 * 15}).json(token);
    	}).catch(function (error) {
    		console.error('Access Token Error', error.message);
    		return res.status(500).json('Authentication failed');
    	});
    })

    .get('/test', function (req, res) {
    	res.cookie('test', {valorA: 1, valorB: 2}).end();
    })

    .get('/test2', function (req, res) {
    	console.log(req.cookies);
    	res.json(req.cookies);
    })

    .get('/oauth/user', function (req, res) {
    	console.log(req.cookies);
    	if (!req.cookies || !req.cookies.oauth) return res.sendStatus(400);
    	request({
    	    headers: {
    	    	'User-Agent': 'SOS1819-01',
    	    	'Authorization': 'token ' + req.cookies.oauth.access_token
    	    },
    	    uri: 'https://api.github.com/user',
    	    method: 'GET'
    	  }, function (err, rRes, body) {
    	    console.log(rRes, body)
    	    res.json(body);
    	    //it works!
    	  });
    	//res.json(req.cookies);
    	//res.json()
    });


    module.exports = router;