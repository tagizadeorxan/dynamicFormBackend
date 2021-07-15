var express = require("express");
var dataRouter = require("./data");


var app = express();

app.use("/data/", dataRouter);


module.exports = app;