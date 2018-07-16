var Express = require("express");
var app = new Express();
app.use("/",Express.static(__dirname +"/client"));
var BodyParser = require("body-parser");
var Mongoose = require("mongoose");
var Bluebird = require("bluebird");
app.use(BodyParser.json());

Mongoose.connect("mongodb://localhost/newdb", function () {
    require("./server/toDo/toDo.model")(Mongoose);
    require("./server/toDo/toDo.router")(Mongoose, app);
});
app.listen(4002, function () {
    console.log("server started");
});