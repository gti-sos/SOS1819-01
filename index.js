const express = require("express");
const path = require("path");
const app = express();
const http = require('http');
const server = http.createServer(app);
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const request = require('request');
const cookieParser = require('cookie-parser');
//const pug = require('pug');
const bombsAPI = require("./api-testing-of-nuclear-bombs");
const hurricanesAPI = require("./api-hurricanes");
const MongoClient = require("mongodb").MongoClient;
const compression = require('compression');
const io = require('socket.io')(server);
const cors = require('cors');
//var pugStatic = require('pug-static');
//var pugStatic = require('express-pug-static');

app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
//app.set('views', [path.join(__dirname, 'public')]);
//app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, "public")));
app.use("/major-disasters", require('./majorDisastersRoutes.js'));
app.use("/proxy", require('./externalRoutes.js'));

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));


const uri = "mongodb+srv://pema:pema@sos-wj0yb.mongodb.net/sos1819?retryWrites=true";
const uri2 = "mongodb+srv://juajimbal:1234@cluster0-jate4.mongodb.net/test?retryWrites=true";
//const uri3 = "mongodb://localhost/sos1819";
const uri3 = "mongodb+srv://admin:sos1819@cluster-sos1819-accsm.mongodb.net/sos1819?retryWrites=true";
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

mongoose.connect(uri3, {useNewUrlParser: true}).then(function () {
    app.use("/api/:version/major-disasters", function (req, res, next) {
        req._apiVersion = req.params.version;
        next();
    }, require('./api-major-disasters'));
    //app.use("/api/:version/major-disasters", require('./api-major-disasters'));
    //app.use("/api/v2/major-disasters", require('./api-major-disasters'));
    
    app.use("/api/:version/secure/major-disasters", require('./api-major-disasters/authMiddleware'), function (req, res, next) {
        req._apiVersion = req.params.version;
        next();
    }, require('./api-major-disasters'));

    console.log("Connected DB Bernabé");
});

server.listen(process.env.PORT || 8080, () => {
    console.log("Servidor de NodeJS corriendo en", process.env.IP || "localhost", process.env.PORT || 8080);
});

exports = module.exports =  {app: app, io: io};