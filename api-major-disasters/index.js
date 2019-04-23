var express = require('express');
var router = express.Router();
var controller = require('./controller.js').api;

function apiVersionMiddleware (fnName, req, res, next) {
	if (!controller[req._apiVersion] || !controller[req._apiVersion][fnName])
		return res.sendStatus(501);
	console.log('returning', typeof controller[req._apiVersion][fnName]);
	controller[req._apiVersion][fnName](req, res);
}

router.get('/loadInitialData', apiVersionMiddleware.bind(this, 'init'));
router.get('/count', apiVersionMiddleware.bind(this, 'count'));
router.get('/docs', (req, res, next) => res.redirect("https://documenter.getpostman.com/view/6919343/S17tQ7ZH"));
router.get('',  apiVersionMiddleware.bind(this, 'list'));
router.get('/:event', apiVersionMiddleware.bind(this, 'get'));
router.post('', apiVersionMiddleware.bind(this, 'create'));
router.post('/:event', (req, res) => res.status(405).json({code: 405, msg: "Method Not Allowed"}));
router.put('', (req, res) => res.status(405).json({code: 405, msg: "Method Not Allowed"}));
router.put('/:event', apiVersionMiddleware.bind(this, 'update'));
router.delete('/:event', apiVersionMiddleware.bind(this, 'destroy'));
router.delete('', apiVersionMiddleware.bind(this, 'destroyAll'));

module.exports = router;