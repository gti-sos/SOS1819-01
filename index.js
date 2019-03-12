var express = require("express");
var path = require("path");
var app = express();
var port = (process.env.PORT || 16778);

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/hello", (req, res) => {
	res.send("hello");
});

app.listen(port, () => {
	console.log("servidor corriendo en puerto " + port);
});
