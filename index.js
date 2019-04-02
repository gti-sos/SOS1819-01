var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

//var hurricanesAPI = require("./api/hurricanes")
app.use(bodyParser.json());

//hurricanesAPI(app)
//direccion local
//const mongoAddress = "mongodb://127.0.0.1:27017/sos1819";

//direccion remota 
const mongoAddress = "mongodb+srv://admin:sos1819@cluster-sos1819-accsm.mongodb.net/sos1819?retryWrites=true";


mongoose.connect(mongoAddress, {useNewUrlParser: true});
require("./api/testing-of-nuclear-bombs")(app);
require("./api/hurricanes")(app);
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(morgan('tiny'));

app.use("/api/v1/major-disasters", require('./api/major-disasters'));
app.use("/api/v1/secure/major-disasters", require('./api/authMiddleware'), require('./api/major-disasters'));
app.use("/api/v1/secure/testing-of-nuclear-bombs", require('./api/authMiddleware'));

//app.use("/api/v1/hurricanes", require('./api/hurricanes'));
app.use("/api/v1/secure/hurricanes",require('./api/authMiddleware'));
//process.env.NODE_ENV === 'production'





//-------JoseAPI---------------------------------------------
/*const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://pema:pema@sos-wj0yb.mongodb.net/sos1819?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var ObjectID = require('mongodb').ObjectID;

var bombs;

client.connect(err => {
    bombs = client.db("sos1819").collection("bombs");
    console.log("Connected")
});


app.get("/api/v1/testing-of-nuclear-bombs/docs", (req, res)=>{
   res.redirect("https://documenter.getpostman.com/view/6914151/S17usmtd");
});

app.get("/api/v1/testing-of-nuclear-bombs/loadInitialData", (req, res) => {

    var bombsAux = [{
        country: "canada",
        year: 1959,
        maxYield: 10000,
        shot: 5,
        hob: 0,
    }, {
        country: "australia",
        year: 1963,
        maxYield: 100000,
        shot: 1,
        hob: 136,
    }, {
        country: "islandia",
        year: 1958,
        maxYield: 40000,
        shot: 5,
        hob: 0,
    }, {
        country: "eeuu",
        year: 1951,
        maxYield: 320000,
        shot: 68,
        hob: 35,
    }, {
        country: "eeuu",
        year: 1961,
        maxYield: 40000,
        shot: 50,
        hob: 175,
    }]
    
    bombs.countDocuments({},function(err,c){
        if(c>0){
            res.sendStatus(409);
        } else {
            bombs.insertMany(bombsAux,function(err,r){
                res.sendStatus(200);
            });
        }
    });
    

})

// GET /testing-nuclear-bombs
app.get("/api/v1/testing-of-nuclear-bombs", (req, res) => {
    
    let search = {fields: {}, page: 0, limit: 100};

    for (let key in req.query) {
        if (["from", "to"].indexOf(key) > -1) {
            var nCondition = (key === "from") ? "$gt" : "$lt";
            if (!search.fields.year) 
                search.fields.year = {};
            search.fields.year[nCondition] = parseInt(req.query[key]);
        } else if (["page", "limit"].indexOf(key) > -1)
            search[key] = parseInt(req.query[key]);
        else if (["country", "type"].indexOf(key) > -1)
            search.fields[key] = {"$in": req.query[key]};
        else 
            search.fields[key] = req.query[key];
    }
    
    bombs.find(search.fields).limit(search.limit).skip(search.page * search.limit).toArray((err,bombsArray)=>{
        if(err)
            console.log("Error " + err)
            
        res.send(bombsArray);       
    });
    
});


//POST /testing-nuclear-bombs
app.post("/api/v1/testing-of-nuclear-bombs",(req, res)=>{
    
    var newBomb = req.body;
    
    var keys = ["country","year","maxYield","shot","hob"];
    
    for (var i = keys.length-1; i >= 0; i--) {
        if (!newBomb.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
 
    bombs.countDocuments(newBomb,function(err,c){
        if(c>0){
            res.sendStatus(409);
        } else {
            bombs.insertOne(newBomb,function(err,r){
                res.sendStatus(201);
            });
        }
    });
   
});


//DELETE /testing-nuclear-bombs
app.delete("/api/v1/testing-of-nuclear-bombs", (req, res) => {

    bombs.remove({},function(err,r){
        res.sendStatus(200);
    });
    
});

//GET /testing-nuclear-bombs/EEUU

app.get("/api/v1/testing-of-nuclear-bombs/:id", (req, res) => {

    var idAux = req.params.id;
    console.log(idAux);

    bombs.findOne({ _id : new ObjectID(idAux) }, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.json(result);
        }
    });

   

});


//PUT /testing-nuclear-bombs/EEUU
app.put("/api/v1/testing-of-nuclear-bombs/:id", (req, res) => {
    
    if (req.body._id && req.params.id !== req.body._id)
        return res.sendStatus(400);    
        
    var keys = ["country","year","maxYield","shot","hob"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!req.body.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
    

    delete req.body._id;
    
    bombs.updateOne({_id: new ObjectID(req.params.id)},{$set: req.body}, function (err,c) {
        if(c && c.matchedCount==0){
          return res.sendStatus(404);  
        }
        let code = (err) ? 404 : 200;
        let msg = (err) ? "Not Found" : "OK";
        res.status(code).json({code: code, msg: msg});
    })


});

//DELETE /testing-nuclear-bombs/EEUU
app.delete("/api/v1/testing-of-nuclear-bombs/:id", (req, res) => {

    var idAux = req.params.id;

    bombs.remove({_id:new ObjectID(idAux)},function(err,r){
        res.sendStatus(200);
    });
});

//POST /testing-nuclear-bombs/EEUU
app.post("/api/v1/testing-of-nuclear-bombs/:id", (req, res) => {
    res.sendStatus(405);
});

app.put("/api/v1/testing-of-nuclear-bombs/", (req, res) => {

    res.sendStatus(405);
})

app.get("/api/v1/secure/testing-of-nuclear-bombs/loadInitialData", (req, res) => {

    var bombsAux = [{
        country: "canada",
        year: 1959,
        maxYield: 10000,
        shot: 5,
        hob: 0,
    }, {
        country: "australia",
        year: 1963,
        maxYield: 100000,
        shot: 1,
        hob: 136,
    }, {
        country: "islandia",
        year: 1958,
        maxYield: 40000,
        shot: 5,
        hob: 0,
    }, {
        country: "eeuu",
        year: 1951,
        maxYield: 320000,
        shot: 68,
        hob: 35,
    }, {
        country: "eeuu",
        year: 1961,
        maxYield: 40000,
        shot: 50,
        hob: 175,
    }]
    
    bombs.countDocuments({},function(err,c){
        if(c>0){
            res.sendStatus(409);
        } else {
            bombs.insertMany(bombsAux,function(err,r){
                res.sendStatus(200);
            });
        }
    });
    

})

// GET /testing-nuclear-bombs
app.get("/api/v1/secure/testing-of-nuclear-bombs", (req, res) => {
    
    let search = {fields: {}, page: 0, limit: 100};

    for (let key in req.query) {
        if (["from", "to"].indexOf(key) > -1) {
            var nCondition = (key === "from") ? "$gt" : "$lt";
            if (!search.fields.year) 
                search.fields.year = {};
            search.fields.year[nCondition] = parseInt(req.query[key]);
        } else if (["page", "limit"].indexOf(key) > -1)
            search[key] = parseInt(req.query[key]);
        else if (["country", "type"].indexOf(key) > -1)
            search.fields[key] = {"$in": req.query[key]};
        else 
            search.fields[key] = req.query[key];
    }
    
    bombs.find(search.fields).limit(search.limit).skip(search.page * search.limit).toArray((err,bombsArray)=>{
        if(err)
            console.log("Error " + err)
            
        res.send(bombsArray);       
    });
    
});


//POST /testing-nuclear-bombs
app.post("/api/v1/secure/testing-of-nuclear-bombs",(req, res)=>{
    
    var newBomb = req.body;
    
    var keys = ["country","year","maxYield","shot","hob"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!newBomb.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
 
    bombs.countDocuments(newBomb,function(err,c){
        if(c>0){
            res.sendStatus(409);
        } else {
            bombs.insertOne(newBomb,function(err,r){
                res.sendStatus(201);
            });
        }
    });
   
});


//DELETE /testing-nuclear-bombs
app.delete("/api/v1/secure/testing-of-nuclear-bombs", (req, res) => {

    bombs.remove({},function(err,r){
        res.sendStatus(200);
    });
    
});

//GET /testing-nuclear-bombs/EEUU

app.get("/api/v1/secure/testing-of-nuclear-bombs/:id", (req, res) => {

    var idAux = req.params.id;
    console.log(idAux);

    bombs.findOne({ _id : new ObjectID(idAux) }, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.send(result);
        }
    });

   

});


//PUT /testing-nuclear-bombs/EEUU
app.put("/api/v1/secure/testing-of-nuclear-bombs/:id", (req, res) => {
    
    if (req.body._id && req.params.id !== req.body._id)
        return res.sendStatus(400);    
        
    var keys = ["country","year","maxYield","shot","hob"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!req.body.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
    

    delete req.body._id;
    
    bombs.updateOne({_id: new ObjectID(req.params.id)},{$set: req.body}, function (err,c) {
        if(c && c.matchedCount==0){
          return res.sendStatus(404);  
        }
        let code = (err) ? 404 : 200;
        let msg = (err) ? "Not Found" : "OK";
        res.status(code).json({code: code, msg: msg});
    })


});

//DELETE /testing-nuclear-bombs/EEUU
app.delete("/api/v1/secure/testing-of-nuclear-bombs/:id", (req, res) => {

    var idAux = req.params.id;

    bombs.remove({_id:new ObjectID(idAux)},function(err,r){
        res.sendStatus(200);
    });
});

//POST /testing-nuclear-bombs/EEUU
app.post("/api/v1/secure/testing-of-nuclear-bombs/:id", (req, res) => {
    res.sendStatus(405);
});

app.put("/api/v1/secure/testing-of-nuclear-bombs/", (req, res) => {

    res.sendStatus(405);
})*/


app.listen(port, () => {
    console.log("Servidor de NodeJS corriendo en", process.env.IP || "localhost", port);
    console.log("Base de datos corriendo en", mongoAddress);
});

exports = module.exports = app;