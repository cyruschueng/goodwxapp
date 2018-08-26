var express=require('express');
var app=express.createServer();
app.use(express.bodyParser());
app.all('/',function(req,res){
	res.send(req.body.title);
})
app.listen(3000);
