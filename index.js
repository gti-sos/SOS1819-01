var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use("/", express.static(path.join(__dirname, "public")));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/major-disasters", require('./api/major-disasters'));
//app.use("/api/v1/hurricanes", require('./api/hurricanes'));
//app.use("/api/v1/testing-of-nuclear-bombs", require('./api/testing-of-nuclear-bombs'));
//process.env.NODE_ENV === 'production'


//-------JuanAPI----------------------------

var hurricanes = [];


app.get("/api/v1/hurricanes/loadInitialData", (req, res) => {
    hurricanes = [{
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
    }];
    res.sendStatus(200);
});

app.get("/api/v1/hurricanes", (req, res) => {
    res.send(hurricanes);
});

app.post("/api/v1/hurricanes", (req, res) => {

    var newHurricane = req.body;

    hurricanes.push(newHurricane);

    res.sendStatus(201);
});

app.post("/api/v1/hurricanes/:name", (req, res) => {
    res.sendStatus(405);
});

app.put("/api/v1/hurricanes", (req, res) => {
    res.sendStatus(405);
});

app.delete("/api/v1/hurricanes", (req, res) => {

    hurricanes = [];

    res.sendStatus(200);
});

app.delete("/api/v1/hurricanes/:name", (req, res) => {
    hurricanes = hurricanes.filter((c) => {
        return c.name != req.params.name;
    });
    res.sendStatus(200);
});

// GET /hurricanes/Katrina

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

//-------JoseAPI---------------------------------------------

var bombs = []




app.get("/api/v1/testing-of-nuclear-bombs/loadInitialData", (req, res) => {

    var bombs1 = [{
        country: "Canada",
        year: "1959",
        maxYield: "10000",
        shot: "5",
        hob: "0",
    }, {
        country: "Australia",
        year: "1963",
        maxYield: "100000",
        shot: "1",
        hob: "136",
    }, {
        country: "EEUU",
        year: "1951",
        maxYield: "320000",
        shot: "68",
        hob: "35",
    }]
    
    bombs = bombs1;
    
    res.send(bombs);

})

// GET /testing-nuclear-bombs
app.get("/api/v1/testing-of-nuclear-bombs", (req, res) => {
    res.send(bombs);
})


//POST /testing-nuclear-bombs
app.post("/api/v1/testing-of-nuclear-bombs",(req,res)=>{
    var newBomb = req.body;
    bombs.push(newBomb)
    res.sendStatus(201);
})


//DELETE /testing-nuclear-bombs
app.delete("/api/v1/testing-of-nuclear-bombs", (req, res) => {

    bombs = [];

    res.sendStatus(200);
});

//GET /testing-nuclear-bombs/EEUU

app.get("/api/v1/testing-of-nuclear-bombs/:country", (req, res) => {

    var country = req.params.country;

    var filteredBombs = bombs.filter((c) => {
        return c.country == country;
    })

    if (filteredBombs.length >= 1) {
        res.send(filteredBombs[0]);
    }
    else {
        res.sendStatus(404);
    }

});


//PUT /testing-nuclear-bombs/EEUU
app.put("/api/v1/testing-of-nuclear-bombs/:country", (req, res) => {

    var country = req.params.country;
    var updatedBomb = req.body;
    var found = false;

    var updatedBombs = bombs.map((c) => {

        if (c.country == country) {
            found = true;
            return updatedBomb;
        }
        else {
            return c;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        bombs = updatedBombs;
        res.sendStatus(200);
    }

});

//DELETE /testing-nuclear-bombs/EEUU
app.delete("/api/v1/testing-of-nuclear-bombs/:country", (req, res) => {

    var country = req.params.country;
    var found = false;

    var updatedBombs = bombs.filter((c) => {
        if (c.country == country)
            found = true;
        return c.country != country;
    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        bombs = updatedBombs;
        res.sendStatus(200);
    }
});

//POST /testing-nuclear-bombs/EEUU
app.post("/api/v1/testing-of-nuclear-bombs/:country", (req, res) => {

    res.sendStatus(405);
});

app.put("/api/v1/testing-of-nuclear-bombs/", (req, res) => {

    res.sendStatus(405);
})


app.listen(port, () => {
    console.log("servidor corriendo en puerto " + port);
});

exports = module.exports = app;