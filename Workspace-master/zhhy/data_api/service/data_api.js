exports.name ="data_api"
var http=require("http")
var url = require('url');
var qs = require('querystring');
exports.GetData=function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');	
	try{
		var body =req.context || req.params;
		console.log(body)
		if (body){
			var api =body.api||'';
			var gram =body.gramList;
			var sql="select * from DB_CMDS where api='"+ api +"'";
			global.db.getRow(sql,function(data,err){
				if(err){
					console.log(err)
					res.send({"status":300,"msg":"sql错误","data":err});
				}else{
					var sqls=data.ssql;
					var start="[";
					var end ="]";
					var arrgram = getParamsFromCMD(sqls,start,end)
					var cmdsql = replaceParams(sqls,arrgram,gram)
					global.db.getAll(cmdsql,function(data,err){
						res.send({"status":200,"msg":"请求成功","datalist":data});
					})
				}
			})
		}
		else{
			res.send({"status":200,"msg":"请求成功","data":"nodata"})
		}
	}catch(e){
		res.send({"status":500,"msg":"服务器出错"})
		console.log(e)
	}
}
function getParamsFromCMD(cmd,start,end){
	var a = cmd.split(start), b=[]
	if(a.length > 0){
		for(var i = 0, l = a.length; i < l; i++){
			if(a[i].indexOf(end) != -1){
				b.push(a[i].split(end)[0])
			}        
		}
	}
	return b
	
}
function replaceParams(cmds,arrgram,gram){
	var c = arrgram.length;
	var str = cmds;
	for(var i = 0 ; i < c ; i++){
		if(arrgram[i]){
			var ele = arrgram[i];
			var reg = "["+ele+"]";
			var rpls = gram[ele];
			str = str.replace(reg, rpls); 
		}
	}
	return str
}
