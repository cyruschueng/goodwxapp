exports.name ="fileload"
var http=require("http")
var url = require('url');
var qs = require('querystring');

//图片路径存如数据库返回ID
exports.fileload=function(req,res){
	try{
		var obj=req.params||req.context
		var filepath =obj.picUrl
		var type=obj.picType
	}
	catch(e){
		console.log(e)
	}
	var sql="INSERT INTO `DB_PICTURE` (`PictureUrl`,`DateTime`,`Type`,`Status`) VALUES('"+filepath+"',now(),'"+type+"',1);"
	global.db.getAll(sql,function(data,err,filed){
		if (!err.status)
		{
			var insertId=data.insertId
			res.send({"insertId":insertId})

		}
		else{
			console.log(err)
			res.send(err)
		}
	})
} 