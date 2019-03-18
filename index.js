var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8000;

app.use("/",  express.static(path.join(__dirname, "public")));

app.get("/hello", (req, res) => {
	res.send("hello");
});

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
