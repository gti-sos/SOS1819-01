var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use("/",  express.static(path.join(__dirname, "public")));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/major-disasters", require('./api/major-disasters'));
//app.use("/api/v1/hurricanes", require('./api/hurricanes'));
//app.use("/api/v1/testing-of-nuclear-bombs", require('./api/testing-of-nuclear-bombs'));
//process.env.NODE_ENV === 'production'


//-------JuanAPI

var hurricanes = [{
    name : "Katrina",
    year : "2005",
    country : "EEUU",
    speed : "280",
    damagesuntil2008 : "81,2",
    mbar :"902"
}]

app.get("/hurricanes",(req,res)=>{
    res.send(hurricanes);
})

app.post("/hurricanes",(req,res)=>{
        
    var newHurricane = req.body;
    
    hurricanes.push(newHurricane)
    
    res.sendStatus(201);
})

app.delete("/hurricanes", (req,res)=>{
    
    hurricanes =  [];

    res.sendStatus(200);
});

// GET /hurricanes/Katrina

app.get("/hurricanes/:name", (req,res)=>{

    var name = req.params.name;

    var filteredHurricanes = hurricanes.filter((c) =>{
       return c.name == name; 
    })
    
    if (filteredHurricanes.length >= 1){
        res.send(filteredHurricanes[0]);
    }else{
        res.sendStatus(404);
    }

});

app.put("/hurricanes/:name", (req,res)=>{

    var name = req.params.name;
    var updatedContact = req.body;
    var found = false;

    var updatedHurricanes = hurricanes.map((c) =>{
    
        if(c.name == name){
            found = true;
            return updatedContact;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        hurricanes = updatedHurricanes;
        res.sendStatus(200);
    }

});

app.listen(port, () => {
	console.log("servidor corriendo en puerto " + port);
});

exports = module.exports = app;