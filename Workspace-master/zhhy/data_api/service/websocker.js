exports.name ="websocker"
var webSocker = require('../util/webSockerHelper').websocket

exports.websocker=function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');	
	console.log("请求正常")
	var program = req.params||req.context||req.query
	var sesskey=program.sesskey
	var value=program.value
	console.log(program)
	if (sesskey){
		var sql="SELECT * FROM DB_SESSION WHERE `sesskey`='"+sesskey+"'"
		global,db.getRow(sql, function(data,err){
			var ws=JSON.parse(data.ws)
			console.log(ws)
			var retmsg=global.ERROR.success
			if (ws){
				retmsg.aaData[0]={"loding":value}
				webSocker.sendMsg(ws, retmsg, function (ws) {
					console.log(retmsg)
					res.send(retmsg)
				}) 
			}
			else{
				res.send("ws is null")
			}

		})
	}
	else {
		res.send("sesskey is null")
	}
} 