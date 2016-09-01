'use strict';

var express = require('express');
var url = require('url');
var app = express();
var server = require('http').createServer(app);
var PORT =8090;

server.listen(PORT);

app.get("/",function(req,res){    
    console.log(req.url);
    //res.send("hello world");
    res.sendFile(__dirname + url.parse(req.url, true).pathname);
});

// Hosts supporting material from shared
// <a src="/shared/img/test.svg>Test Image<a/>"
app.use("/shared",express.static(__dirname+"/shared/"));
