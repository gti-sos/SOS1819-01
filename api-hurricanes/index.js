const request = require('request')
var hurricanesAPI = {};
module.exports = hurricanesAPI;


//-------JuanAPI----------------------------
hurricanesAPI.register = function(app, hurricanes){

    
    //Implementación API of ice and fire
    

app.get("/api/v1/hurricanes/got/:num", (req, res)=>{
    console.log("aaaaaaaaaaaaa");
   request.get({
       url: "https://anapioficeandfire.com/api/characters/"+req.params.num,
       json:true
   },function(err, httpcode, body){
   
       return res.json(body);
   }
       
   );
});

//Implementación pokeapi
app.get("/api/v1/hurricanes/pok/:num", (req, res)=>{
    console.log("aaaaaaaaaaaaa");
   request.get({
       url: "https://pokeapi.co/api/v2/pokemon/"+req.params.num,
       json:true
   },function(err, httpcode, body){
   
       return res.json(body);
   }
       
   );
});

//Implementación country-stats
app.get("/api/v1/hurricanes/country-stats/", (req, res)=>{
    console.log("aaaaaaaaaaaaa");
   request.get({
       url: "https://sos1819-03.herokuapp.com/api/v1/country-stats",
       json:true
   },function(err, httpcode, body){
   
       return res.json(body);
   }
       
   );
});

//Implementación country-stats
app.get("/api/v1/hurricanes/computers-attacks-stats/", (req, res)=>{
    console.log("aaaaaaaaaaaaa");
   request.get({
       url: "https://sos1819-03.herokuapp.com/api/v1/computers-attacks-stats",
       json:true
   },function(err, httpcode, body){
   
       return res.json(body);
   }
       
   );
});
app.get("/api/v1/hurricanes/docs", (req, res)=>{
   res.redirect("https://documenter.getpostman.com/view/6916951/S17ut6v5");
});

app.get("/api/v2/hurricanes/count", (req, res)=>{
  let search = {fields: {}, offset: 0, limit: 0};
  for (let key in req.query) {
      if (["from", "to"].indexOf(key) > -1) {
          var nCondition = (key === "from") ? "$gte" : "$lte";
          if (!search.fields.year) 
              search.fields.year = {};
          search.fields.year[nCondition] = parseInt(req.query[key]);
      } else if (["offset", "limit"].indexOf(key) > -1)
          search[key] = parseInt(req.query[key]);
     // else if (["country", "type"].indexOf(key) > -1)
       //   search.fields[key] = {"$in": req.query[key]};
    
      else {
  
          search.fields[key] = req.query[key];
      }    
  }

  

  hurricanes.countDocuments(search.fields, function (err, count) {
        if (err) return res.json(err);
        res.json({count: count});
    });
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
    
    let search = {fields: {}, offset: 0, limit: 0};

    for (let key in req.query) {
        if (["from", "to"].indexOf(key) > -1) {
            var nCondition = (key === "from") ? "$gte" : "$lte";
            if (!search.fields.year) 
                search.fields.year = {};
            search.fields.year[nCondition] = parseInt(req.query[key]);
        } else if (["offset", "limit"].indexOf(key) > -1)
            search[key] = parseInt(req.query[key]);
       // else if (["country", "type"].indexOf(key) > -1)
         //   search.fields[key] = {"$in": req.query[key]};
      
        else {
   
            search.fields[key] = req.query[key];
        }    
    }
    
    hurricanes.find(search.fields, {fields: {_id: 0}}).limit(search.limit).skip(search.offset * search.limit).toArray((err,hurricanesArray)=>{
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
    console.log(req.body);
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
    
    var nameAux = req.params.name;
    
    hurricanes.remove({name : nameAux},function(err,r){
        res.sendStatus(200);
    });
});

// GET /hurricanes/Katrina

app.get("/api/v1/hurricanes/:name", (req, res) => {

    var nameAux = req.params.name;
    console.log(nameAux);

    hurricanes.findOne({ name : nameAux }, {fields: {_id: 0}}, function (err, result) {
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
    
    if (req.body.name && req.params.name !== req.body.name)
        return res.sendStatus(400);    
        
    var keys = ["name","year","country","speed","damagesuntil2008","mbar"];
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!req.body.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
    
    
    hurricanes.updateOne({name: req.params.name},{$set: req.body}, function (err,c) {
        if(c && c.matchedCount==0){
          return res.sendStatus(404);  
        }
        res.sendStatus((err) ? 404 : 200);
    });


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
       // else if (["country", "type"].indexOf(key) > -1)
         //   search.fields[key] = {"$in": req.query[key]};
        else 
            search.fields[key] = req.query[key];
    }
    
    hurricanes.find(search.fields, {fields: {_id: 0}}).limit(search.limit).skip(search.page * search.limit).toArray((err,hurricanesArray)=>{
        if(err)
            console.log("Error " + err);
            
        res.send(hurricanesArray);       
    });
    
});

app.post("/api/v1/secure/hurricanes",(req, res)=>{
    
    var newHurricane = req.body;
    
    var keys = ["name","year","country","speed","damagesuntil2008","mbar"];
    console.log(req.body);
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

app.delete("/api/v1/secure/hurricanes", (req, res) => {

    hurricanes.remove({},function(err,r){
        res.sendStatus(200);
    });
    
});

app.delete("/api/v1/secure/hurricanes/:name", (req, res) => {
    
    var nameAux = req.params.name;
    
    hurricanes.remove({name : nameAux},function(err,r){
        res.sendStatus(200);
    });
});

// GET /hurricanes/Katrina

app.get("/api/v1/secure/hurricanes/:name", (req, res) => {

    var nameAux = req.params.name;
    console.log(nameAux);

    hurricanes.findOne({ name : nameAux }, {fields: {_id: 0}}, function (err, result) {
        if (!result) {
            res.sendStatus(404);
        }
        else {
            res.json(result);
        }
    });

});


app.put("/api/v1/secure/hurricanes/:name", (req, res) => {
    
    if (req.body.name && req.params.name !== req.body.name)
        return res.sendStatus(400);    
        
    var keys = ["name","year","country","speed","damagesuntil2008","mbar"];
    for (var i = keys.length - 1; i >= 0; i--) {
        if (!req.body.hasOwnProperty(keys[i])) {
            return res.sendStatus(400);
        }
    }
    
    
    hurricanes.updateOne({name: req.params.name},{$set: req.body}, function (err,c) {
        if(c && c.matchedCount==0){
          return res.sendStatus(404);  
        }
        res.sendStatus((err) ? 404 : 200);
    })

var countryStatsAPI='/api';
var apiServerHost = 'http://echo.httpkit.com';

var app = express();  
app.use(paths, function(req, res) {
  var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

});
}