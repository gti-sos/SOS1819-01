var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//direccion local
//const mongoAddress = "mongodb://127.0.0.1:27017/sos1819";

//direccion remota 
const mongoAddress = "mongodb+srv://admin:sos1819@cluster-sos1819-accsm.mongodb.net/sos1819?retryWrites=true";

mongoose.connect(mongoAddress, {useNewUrlParser: true});
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(morgan('tiny'));

app.use("/api/v1/major-disasters", require('./api/major-disasters'));
app.use("/api/v1/secure/major-disasters", require('./api/authMiddleware'), require('./api/major-disasters'));
app.use("/api/v1/secure/testing-of-nuclear-bombs", require('./api/authMiddleware'));

//app.use("/api/v1/hurricanes", require('./api/hurricanes'));
app.use("/api/v1/secure/hurricanes",require('./api/authMiddleware'));
//process.env.NODE_ENV === 'production'


//-------JuanAPI----------------------------

var hurricanes = [];

const MongoClient2 = require("mongodb").MongoClient;
const url2 = "mongodb+srv://juajimbal:1234@cluster0-jate4.mongodb.net/test?retryWrites=true";
const client2 = new MongoClient2(url2, { useNewUrlParser: true });

var ObjectID = require('mongodb').ObjectID;

app.get("/api/v1/hurricanes/docs", (req, res)=>{
   res.redirect("https://documenter.getpostman.com/view/6916951/S17ut6v5");
});

//var hurricanes;

client2.connect(err => {
    hurricanes = client2.db("sos1819").collection("hurricanes");
    console.log("Connected")
});

app.get("/api/v1/hurricanes/loadInitialData", (req, res) => {
    var hurricanesAux = [{
        name: "Katrina",
        year: 2005,
        country: "EEUU",
        speed: 280,
        damagesuntil2008: 81.2,
        mbar: 902
    }, {
        name: "Mitch",
        year: 1998,
        country: "EEUU",
        speed: 285,
        damagesuntil2008: 5.8,
        mbar: 905
    }, {
        name: "Andrew",
        year: 1992,
        country: "EEUU",
        speed: 280,
        damagesuntil2008: 52.4,
        mbar: 922
    }, {
        name: "Ike",
        year: 2008,
        country: "Islas de Sotavento",
        speed: 230,
        damagesuntil2008: 32,
        mbar: 935
    }, {
        name: "Wilma",
        year: 2005,
        country: "Centro América",
        speed: 295,
        damagesuntil2008: 29.1,
        mbar: 882
    }];
    hurricanes.countDocuments({},function(err,c){
        if(c>0){
            res.sendStatus(409);
        } else {
            hurricanes.insertMany(hurricanesAux,function(err,r){
                res.sendStatus(200);
            });
        }
    });
});

app.get("/api/v1/hurricanes", (req, res) => {
    
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
    
    hurricanes.find(search.fields).limit(search.limit).skip(search.page * search.limit).toArray((err,hurricanesArray)=>{
        if(err)
            console.log("Error " + err)
            
        res.send(hurricanesArray);       
    });
    
});


//app.get("/api/v1/hurricanes", (req, res) => {
//    res.send(hurricanes);
//});

app.post("/api/v1/hurricanes",(req, res)=>{
    
    var newHurricane = req.body;
    
    var keys = ["name","year","country","speed","damagesuntil2008","mbar"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!newHurricane.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
 
    hurricanes.countDocuments(newHurricane,function(err,c){
        if(c>0){
            res.sendStatus(409);
        } else {
            hurricanes.insertOne(newHurricane,function(err,r){
                res.sendStatus(201);
            });
        }
    });
   
});

/*
app.post("/api/v1/hurricanes", (req, res) => {

    var newHurricane = req.body;

    hurricanes.push(newHurricane);

    res.sendStatus(201);
});*/

app.post("/api/v1/hurricanes/:name", (req, res) => {
    res.sendStatus(405);
});

app.put("/api/v1/hurricanes", (req, res) => {
    res.sendStatus(405);
});

app.delete("/api/v1/hurricanes", (req, res) => {

    hurricanes.remove({},function(err,r){
        res.sendStatus(200);
    });
    
});

/*app.delete("/api/v1/hurricanes", (req, res) => {

    hurricanes = [];

    res.sendStatus(200);
});
*/

app.delete("/api/v1/hurricanes/:name", (req, res) => {
    hurricanes = hurricanes.filter((c) => {
        return c.name != req.params.name;
    });
    res.sendStatus(200);
});

// GET /hurricanes/Katrina
/*
app.get("/api/v1/hurricanes/:name", (req, res) => {

    var idAux = req.params.name;
    console.log(idAux);

    hurricanes.findOne({ _name : new ObjectID(idAux) }, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.send(result);
        }
    });
});
*/
app.get("/api/v1/hurricanes/:name", (req, res) => {

    var name = req.params.name;

    var filteredHurricanes = hurricanes.filter((c) => {
        return c.name == name;
    })

    if (filteredHurricanes.length >= 1) {
        res.send(filteredHurricanes[0]);
    }
    else {
        res.sendStatus(404);
    }

});


app.put("/api/v1/hurricanes/:name", (req, res) => {
    
    if (req.body._name && req.params.name !== req.body._name)
        return res.sendStatus(400);    
        
    var keys = ["name","year","country","speed","damagesuntil2008","mbar"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!req.body.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
    

    delete req.body._name;
    
    hurricanes.updateOne({_name: new ObjectID(req.params.name)},{$set: req.body}, function (err,c) {
        if(c && c.matchedCount==0){
          return res.sendStatus(404);  
        }
        let code = (err) ? 404 : 200;
        let msg = (err) ? "Not Found" : "OK";
        res.status(code).json({code: code, msg: msg});
    })


});
/*
app.put("/api/v1/hurricanes/:name", (req, res) => {

    var name = req.params.name;
    var updatedContact = req.body;
    var found = false;

    var updatedHurricanes = hurricanes.map((c) => {

        if (c.name == name) {
            found = true;
            return updatedContact;
        }
        else {
            return c;
        }

    });


    if (updatedContact.name != req.params.name) {
        res.sendStatus(409);
    } else if (!found) {
        res.sendStatus(404);
    } else {
        hurricanes = updatedHurricanes;
        res.sendStatus(200);
    }

});
*/
//--------------------------------------------------------------
app.get("/api/v1/secure/hurricanes/loadInitialData", (req, res) => {
    var hurricanesAux = [{
        name: "Katrina",
        year: "2005",
        country: "EEUU",
        speed: 280,
        damagesuntil2008: 81.2,
        mbar: 902
    }, {
        name: "Mitch",
        year: "1998",
        country: "EEUU",
        speed: 285,
        damagesuntil2008: 5.8,
        mbar: 905
    }, {
        name: "Andrew",
        year: "1992",
        country: "EEUU",
        speed: 280,
        damagesuntil2008: 52.4,
        mbar: 922
    }, {
        name: "Ike",
        year: "2008",
        country: "Islas de Sotavento",
        speed: 230,
        damagesuntil2008: 32,
        mbar: 935
    }, {
        name: "Wilma",
        year: "2005",
        country: "Centro América",
        speed: 295,
        damagesuntil2008: 29.1,
        mbar: 882
    }];
    hurricanes.countDocuments({},function(err,c){
        if(c>0){
            res.sendStatus(409);
        } else {
            hurricanes.insertMany(hurricanesAux,function(err,r){
                res.sendStatus(200);
            });
        }
    });
});

app.get("/api/v1/secure/hurricanes", (req, res) => {
    
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
    
    hurricanes.find(search.fields).limit(search.limit).skip(search.page * search.limit).toArray((err,hurricanesArray)=>{
        if(err)
            console.log("Error " + err)
            
        res.send(hurricanesArray);       
    });
    
});


app.post("/api/v1/secure/hurricanes",(req, res)=>{
    
    var newHurricane = req.body;
    
    var keys = ["name","year","country","speed","damagesuntil2008","mbar"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!newHurricane.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }

        hurricanes.countDocuments(newHurricane,function(err,c){
        if(c>0){
            res.sendStatus(409);
        } else {
            hurricanes.insertOne(newHurricane,function(err,r){
                res.sendStatus(201);
            });
        }
    });
   
});


app.post("/api/v1/secure/hurricanes/:name", (req, res) => {
    res.sendStatus(405);
});

app.put("/api/v1/secure/hurricanes", (req, res) => {
    res.sendStatus(405);
});

app.delete("/api/v1/secure/hurricanes", (req, res) => {

    hurricanes.remove({},function(err,r){
        res.sendStatus(200);
    });
    
});


app.delete("/api/v1/secure/hurricanes/:name", (req, res) => {
    hurricanes = hurricanes.filter((c) => {
        return c.name != req.params.name;
    });
    res.sendStatus(200);
});

// GET /hurricanes/Katrina

app.get("/api/v1/secure/hurricanes/:name", (req, res) => {

    var idAux = req.params.name;
    console.log(idAux);

    hurricanes.findOne({ _name : new ObjectID(idAux) }, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.send(result);
        }
    });
});

app.put("/api/v1/secure/hurricanes/:name", (req, res) => {
    
    if (req.body._name && req.params.name !== req.body._name)
        return res.sendStatus(400);    
        
    var keys = ["name","year","country","speed","damagesuntil2008","mbar"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!req.body.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
    

    delete req.body._name;
    
    hurricanes.updateOne({_name: new ObjectID(req.params.name)},{$set: req.body}, function (err,c) {
        if(c && c.matchedCount==0){
          return res.sendStatus(404);  
        }
        let code = (err) ? 404 : 200;
        let msg = (err) ? "Not Found" : "OK";
        res.status(code).json({code: code, msg: msg});
    })


});



//-------JoseAPI---------------------------------------------
const MongoClient = require("mongodb").MongoClient;
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
})


app.listen(port, () => {
    console.log("Servidor de NodeJS corriendo en", process.env.IP || "localhost", port);
    console.log("Base de datos corriendo en", mongoAddress);
});

exports = module.exports = app;