const mongoAddress = "mongodb+srv://admin:sos1819@cluster-sos1819-accsm.mongodb.net/sos1819?retryWrites=true";
var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");


var bombsAPI = require("./api-testing-of-nuclear-bombs");
var hurricanesAPI = require("./api-hurricanes");


app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(morgan('tiny'));

//direccion remota 

/////////Conexion APIJOSE/////////
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://pema:pema@sos-wj0yb.mongodb.net/sos1819?retryWrites=true";
const uri2 = "mongodb+srv://juajimbal:1234@cluster0-jate4.mongodb.net/test?retryWrites=true";

const client = new MongoClient(uri, { useNewUrlParser: true });
const client2 = new MongoClient(uri2, { useNewUrlParser: true });


client.connect(err => {
    var bombs = client.db("sos1819").collection("bombs");
    bombsAPI.register(app,bombs);
    console.log("Connected DB Jose");
});

client2.connect(err => {
    var hurricanes = client2.db("sos1819").collection("hurricanes");
    hurricanesAPI.register(app, hurricanes);
    console.log("Connected DB Juan");
});


mongoose.connect(mongoAddress, {useNewUrlParser: true}).then(function () {
    app.use("/api/v1/major-disasters", require('./api/major-disasters'));
    app.use("/api/v1/secure/major-disasters", require('./api/authMiddleware'), require('./api/major-disasters'));
    console.log("Connected DB Bernabé");
});









app.listen(port, () => {
    console.log("Servidor de NodeJS corriendo en", process.env.IP || "localhost", port);
    console.log("Base de datos corriendo en", mongoAddress);
});

exports = module.exports = app;