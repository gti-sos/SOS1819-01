var express = require('express');
var router = express.Router();
var path = require('path');

router
	.get('/', function (req, res) {
     	res.send('index.html');
     	//res.render(path.join('index.pug'));
   	 })

	.get('/major-disasters/:directory/:file', function (req, res) {
      res.render(path.join(__dirname, "public/ui/v1/major-disasters/app", req.params.directory + '/' + req.params.file));
    });

module.exports = router;