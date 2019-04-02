const mongoAddress = "mongodb+srv://admin:sos1819@cluster-sos1819-accsm.mongodb.net/sos1819?retryWrites=true";
var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(morgan('tiny'));

//direccion remota 

mongoose.connect(mongoAddress, {useNewUrlParser: true});

require("./api/testing-of-nuclear-bombs")(app);
require("./api/hurricanes")(app);


app.use("/api/v1/major-disasters", require('./api/major-disasters'));
app.use("/api/v1/secure/testing-of-nuclear-bombs", require('./api/authMiddleware'));
app.use("/api/v1/secure/major-disasters", require('./api/authMiddleware'), require('./api/major-disasters'));

app.listen(port, () => {
    console.log("Servidor de NodeJS corriendo en", process.env.IP || "localhost", port);
    console.log("Base de datos corriendo en", mongoAddress);
});

exports = module.exports = app;