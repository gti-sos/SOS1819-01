var express = require('express');
var router = express.Router();
var controller = require('./controller.js');

router.get('/loadInitialData', controller.init);
router.get('', controller.list);
router.get('/:id', controller.get);
router.post('', controller.create);
router.post('/:id', (req, res) => res.status(405).send());
router.put('', (req, res) => res.status(405).send());
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('', controller.destroyAll);

module.exports = router;