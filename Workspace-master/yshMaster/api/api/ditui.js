exports.dt=function(req,res,next){
	
	console.log("name"+req.params.cmd);
	res.setHeader('Access-Control-Allow-Origin','*');

res.setHeader('Content-Type','application/json');

	res.setHeader('Content-Type','text/json');
	global.db.getRow("select ticket from ysh_dt_users where "+req.params.cmd,function(rdata){
		res.send(JSON.stringify(rdata));
		console.log(JSON.stringify(rdata));
	});
	next();
}