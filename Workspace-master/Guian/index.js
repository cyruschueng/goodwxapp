var http=require("http")
var express =require("express")
var app =express()
var port =4008
var fs = require('fs');
var path = require("path");

var bodyParser = require('body-parser');
var multer = require('multer');


http.createServer(app).listen(port, function() {
	console.log("端口" + ':' + port);
});
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-d

var ctrl = require("./controllers")
app.get('/getInfo', ctrl.ReadFile.getInfo);
app.post('/getInfo',ctrl.ReadFile.getInfo);

app.get('/getdata', ctrl.gatdata.GetToken);
app.post('/getdata',ctrl.gatdata.GetToken);
