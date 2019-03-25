var express = require('express');
var router = express.Router();
var controller = require('./controller.js');

router.get('/loadInitialData', controller.init);
router.get('/docs', (req, res, next) => res.redirect("https://documenter.getpostman.com/view/6919343/S17tQ7ZH"));
router.get('', controller.list);
router.get('/:id', controller.get);
router.post('', controller.create);
router.post('/:id', (req, res) => res.status(405).json({code: 405, msg: "Method Not Allowed"}));
router.put('', (req, res) => res.status(405).json({code: 405, msg: "Method Not Allowed"}));
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('', controller.destroyAll);

module.exports = router;