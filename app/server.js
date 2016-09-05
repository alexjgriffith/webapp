'use strict';

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


var express = require('express');
var url = require('url');
var app = express();
var server = require('http').createServer(app);
var db = require('./queries');



var PORT =8090;

server.listen(PORT);

app.get("/api/items",db.getAllItems);
app.get("/api/items/byname/:name",db.getAllItemsByName);
app.post("/api/items",db.createItem);

app.get("/",function(req,res){    
    console.log(req.url);
    res.sendFile(__dirname + url.parse(req.url, true).pathname);
});

// Hosts supporting material from shared
// <a src="/shared/img/test.svg>Test Image<a/>"
app.use("/shared",express.static(__dirname+"/shared/"));

