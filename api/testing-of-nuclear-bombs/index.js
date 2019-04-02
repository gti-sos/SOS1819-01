module.exports=function(app){
    
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

    var bombsAux = require("./populateData.json")

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

app.get("/api/v1/testing-of-nuclear-bombs/:name", (req, res) => {

    var nameAux = req.params.name;
    console.log(nameAux);

    bombs.findOne({ name : nameAux }, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.json(result);
        }
    });

   

});


//PUT /testing-nuclear-bombs/EEUU
app.put("/api/v1/testing-of-nuclear-bombs/:name", (req, res) => {
    
    if (req.body.name && req.params.name !== req.body.name)
        return res.sendStatus(400);    
        
    var keys = ["name","country","year","maxYield","shot","hob"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!req.body.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
    
    
    bombs.updateOne({name: req.body.name},{$set: req.body}, function (err,c) {
        if(c && c.matchedCount==0){
          return res.sendStatus(404);  
        }
        let code = (err) ? 404 : 200;
        let msg = (err) ? "Not Found" : "OK";
        res.status(code).json({code: code, msg: msg});
    })


});

//DELETE /testing-nuclear-bombs/EEUU
app.delete("/api/v1/testing-of-nuclear-bombs/:name", (req, res) => {

    var nameAux = req.params.name;

    bombs.remove({name : nameAux},function(err,r){
        res.sendStatus(200);
    });
});

//POST /testing-nuclear-bombs/EEUU
app.post("/api/v1/testing-of-nuclear-bombs/:name", (req, res) => {
    res.sendStatus(405);
});

app.put("/api/v1/testing-of-nuclear-bombs/", (req, res) => {

    res.sendStatus(405);
})

app.get("/api/v1/secure/testing-of-nuclear-bombs/loadInitialData", (req, res) => {

    var bombsAux = require("./populateData.json")
    
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
    
    var keys = ["name","country","year","maxYield","shot","hob"];
    
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

}