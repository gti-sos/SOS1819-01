module.exports=function(app){
    
app.use("/api/v1/secure/testing-of-nuclear-bombs", require('../authMiddleware'));
    
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://pema:pema@sos-wj0yb.mongodb.net/sos1819?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

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
    
    bombs.find(search.fields, {fields:{_id:0}}).limit(search.limit).skip(search.page * search.limit).toArray((err,bombsArray)=>{
        if(err)
            console.log("Error " + err)
            
        res.send(bombsArray);       
    });
    
});


//POST /testing-nuclear-bombs
app.post("/api/v1/testing-of-nuclear-bombs",(req, res)=>{
    
    var newBomb = req.body;
    
    var keys = ["name","country","year","maxYield","shot","hob"];
    
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

    bombs.findOne({ name : nameAux },{fields:{_id:0}}, function (err, result) {
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

/////////////////////////////////////////////////////////////////////////SECURE///////////////////////////////////////////////////////////////

var apiKey = "sos1819-01-1234567890";

app.get("/api/v1/secure/testing-of-nuclear-bombs/loadInitialData", (req, res) => {
    
    if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
	    return res.status(401).json({code: 401, msg: "Unauthorized"});
	

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
    
    if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
	    return res.status(401).json({code: 401, msg: "Unauthorized"});
    
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
    
    bombs.find(search.fields, {fields:{_id:0}}).limit(search.limit).skip(search.page * search.limit).toArray((err,bombsArray)=>{
        if(err)
            console.log("Error " + err)
            
        res.send(bombsArray);       
    });
    
});


//POST /testing-nuclear-bombs
app.post("/api/v1/secure/testing-of-nuclear-bombs",(req, res)=>{
    
    if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
	    return res.status(401).json({code: 401, msg: "Unauthorized"});
    
    var newBomb = req.body;
    
    var keys = ["name","country","year","maxYield","shot","hob"];
    
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
app.delete("/api/v1/secure/testing-of-nuclear-bombs", (req, res) => {

    if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
	    return res.status(401).json({code: 401, msg: "Unauthorized"});

    bombs.remove({},function(err,r){
        res.sendStatus(200);
    });
    
});

//GET /testing-nuclear-bombs/EEUU

app.get("/api/v1/secure/testing-of-nuclear-bombs/:name", (req, res) => {
    
    if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
	    return res.status(401).json({code: 401, msg: "Unauthorized"});

    var nameAux = req.params.name;

    bombs.findOne({ name : nameAux },{fields:{_id:0}}, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.json(result);
        }
    });

   

});


//PUT /testing-nuclear-bombs/EEUU
app.put("/api/v1/secure/testing-of-nuclear-bombs/:name", (req, res) => {

    if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
	    return res.status(401).json({code: 401, msg: "Unauthorized"});
    
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
app.delete("/api/v1/secure/testing-of-nuclear-bombs/:name", (req, res) => {

    if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
	    return res.status(401).json({code: 401, msg: "Unauthorized"});

    var nameAux = req.params.name;

    bombs.remove({name : nameAux},function(err,r){
        res.sendStatus(200);
    });
});

//POST /testing-nuclear-bombs/EEUU
app.post("/api/v1/secure/testing-of-nuclear-bombs/:name", (req, res) => {
    if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
	    return res.status(401).json({code: 401, msg: "Unauthorized"});
	    
    res.sendStatus(405);
});

app.put("/api/v1/secure/testing-of-nuclear-bombs/", (req, res) => {
    
    if (!req.headers["sos1819-token"] || req.headers["sos1819-token"] !== apiKey)
	    return res.status(401).json({code: 401, msg: "Unauthorized"});

    res.sendStatus(405);
})


}