var express = require('express');
var router = express.Router();
var controller = require('./controller.js');

router.get('/loadInitialData', controller.init);
router.get('/count', controller.count);
router.get('/docs', (req, res, next) => res.redirect("https://documenter.getpostman.com/view/6919343/S17tQ7ZH"));
router.get('', controller.list);
router.get('/:event', controller.get);
router.post('', controller.create);
router.post('/:event', (req, res) => res.status(405).json({code: 405, msg: "Method Not Allowed"}));
router.put('', (req, res) => res.status(405).json({code: 405, msg: "Method Not Allowed"}));
router.put('/:event', controller.update);
router.delete('/:event', controller.destroy);
router.delete('', controller.destroyAll);

module.exports = router;