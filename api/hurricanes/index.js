//-------JuanAPI----------------------------
module.exports = function(app){
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
    var hurricanesAux = require("./populateData.json")

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

/*
app.get("/api/v1/hurricanes", (req, res) => {
    var aux=hurricanes
    if (req.params.name) {
        aux.filter(name => name==req.params.name)
    }
    res.send(aux)
})
*/
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
       // else if (["country", "type"].indexOf(key) > -1)
         //   search.fields[key] = {"$in": req.query[key]};
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
    
    for (var i = keys.length-1; i >= 0; i--) {
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

app.delete("/api/v1/hurricanes/:id", (req, res) => {

    var idAux = req.params.id;

    hurricanes.remove({_id:new ObjectID(idAux)},function(err,r){
        res.sendStatus(200);
    });
});

app.delete("/api/v1/hurricanes", (req, res) => {

    hurricanes.remove({},function(err,r){
        res.sendStatus(200);
    });
    
});
/*
app.delete("/api/v1/hurricanes", (req, res) => {

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

app.get("/api/v1/hurricanes/:name", (req, res) => {

    var nameAux = req.params.name;
    console.log(nameAux);

    hurricanes.findOne({ name : nameAux }, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.json(result);
        }
    });

});
/*
app.get("/api/v1/hurricanes/:name", (req, res) => {

    var idAux = req.params.name;
    console.log(idAux);

    hurricanes.findOne({ _name : new ObjectID(idAux) }, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.json(result);
        }
    });
});*/
/*
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
*/

app.put("/api/v1/hurricanes/:name", (req, res) => {
    
    if (req.body._id && req.params.name !== req.body.name)
        return res.sendStatus(400);    
        
    var keys = ["name","year","country","speed","damagesuntil2008","mbar"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!req.body.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
    

    delete req.body._id;
    
    hurricanes.updateOne({name: new ObjectID(req.params.name)},{$set: req.body}, function (err,c) {
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


});*/
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
    
    for (var i = keys.length-1; i >= 0; i--) {
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

app.delete("/api/v1/secure/hurricanes/:name", (req, res) => {

    var idAux = req.params.name;

    hurricanes.remove({name:new ObjectID(idAux)},function(err,r){
        res.sendStatus(200);
    });
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


app.get("/api/v1/secure/hurricanes/:id", (req, res) => {

    var idAux = req.params.id;
    console.log(idAux);

    hurricanes.findOne({ _id : new ObjectID(idAux) }, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.json(result);
        }
    });
});


app.put("/api/v1/secure/hurricanes/:id", (req, res) => {
    
    if (req.body._id && req.params.id !== req.body._id)
        return res.sendStatus(400);    
        
    var keys = ["name","year","country","speed","damagesuntil2008","mbar"];
    
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!req.body.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
    

    delete req.body._id;
    
    hurricanes.updateOne({_id: new ObjectID(req.params.id)},{$set: req.body}, function (err,c) {
        if(c && c.matchedCount==0){
          return res.sendStatus(404);  
        }
        let code = (err) ? 404 : 200;
        let msg = (err) ? "Not Found" : "OK";
        res.status(code).json({code: code, msg: msg});
    })


});
}