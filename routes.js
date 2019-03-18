var express = require("express");
var path = require("path");
//var router = express.Router()
  /*
  app.use("/api/v1/hurricanes", require('./api/hurricanes'));
  app.use("/api/v1/major-disasters", require('./api/major-disasters'));
  app.use("/api/v1/testing-of-nuclear-bombs", require('./api/testing-of-nuclear-bombs'));
  app.use("/",  express.static(path.join(__dirname, "public")));
*/
//module.exports = function (app) {
  var router = express.Router()
  router.use("/api/v1/hurricanes", require('./api/hurricanes'));
  router.use("/api/v1/major-disasters", require('./api/major-disasters'));
  router.use("/api/v1/testing-of-nuclear-bombs", require('./api/testing-of-nuclear-bombs'));
  //router.use("/",  express.static(path.join(__dirname, "public")));
//};

module.exports = router