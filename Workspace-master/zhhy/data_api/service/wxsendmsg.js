exports.name ="WXsendmsg"
var https = require('https');
var request = require('request');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
try {
	var DBconfig = JSON.parse(fs.readFileSync('./config/config.json'))
} catch(exception) {
	console.log(exception)
}
var now_date =new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
var AppId=DBconfig.wx_config.AppId
var AppSecret=DBconfig.wx_config.AppSecret
var access_token=''
var timestamp=0
var token=DBconfig.wx_config.token
var AdminOpenId ='oZ53jvnhgdduh92UkJazMMiJjwRQ'

exports.WXsendmsg=function(req,res){
	var program = req.params||req.context||req.query
	var env=program.env
	var userid=program.userid
	exports.GetMsgObj(env,userid,function(obj){
		exports.getAccess_token(function(ret){
			var Access_Token =ret;
			var options = {
				url: "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + Access_Token,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body: JSON.stringify(obj)
			};
	//				options.body = '"'+options.body+'"' 
	request(options, function(err, ress, data) {
		var errmsg =data.split(',')[1].split(':')[1].split('"')[1]
		if(errmsg == "ok") {
			res.send({"code":200,"message":"ok"})
		}
		else{
			res.send({"code":400,"message":"erro"})
		}
	});
});

	})

}


//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe4e7663a01ea7382&secret=8e68fc4222ad0a11a4f4c60ea9da5e76
exports.getAccess_token=function(cb){
	var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + AppId + "&secret=" + AppSecret
	var return_json = new Object();
	var now = Date.parse(new Date())
	if((now - 7200) < timestamp) {
		access_token = access_token
		cb && cb(access_token)
	} else {
		request(url, function(err,res,data) {
			var data=JSON.parse(data)
			if (err){
				console.log(err)
			}
			else{
				access_token=data.access_token
				timestamp = Date.parse(new Date())
				cb && cb(access_token)
			}
		})
	}
}

//模板消息json
exports.GetMsgObj= function(env,userid,cb){
	var modelmsg=DBconfig.wx_moblemsg
	var sql="SELECT * FROM DB_USER WHERE Id="+userid
	global.db.getRow(sql,function(data,err){
		if (!err.status){
			var username=data.UserName||''
			var phone=data.PhoneNum||''
			var person=data.LiablePerson||''
			var OpnId=data.WxOpenId||''
			if (env==1){
	    //认证通知管理员
	    modelmsg.touser="oZ53jvnhgdduh92UkJazMMiJjwRQ"
	    modelmsg.template_id="5Ydl8JoNvUVqRLMvppG_SIsWIN8EKwSWnsxQet1X9_Y"
	    modelmsg.url=""
	    modelmsg.data.first.value="【智慧合约】有新的商户认证申请"
	    modelmsg.data.keyword1.value=username
	    modelmsg.data.keyword2.value=person
	    modelmsg.data.keyword3.value=phone
	    modelmsg.data.keyword4.value=now_date
	    modelmsg.data.remark.value="请尽快点击进入查看并审核"
	    cb&&cb(modelmsg)
	}else if (env==2){
		modelmsg.touser=OpnId
		modelmsg.template_id="iUFBKpEufWGAZJRUa0FncIwK028fxjsVHerSImTgaFM"
		modelmsg.url=""
		modelmsg.data.first.value="【智慧合约】认证成功"
		modelmsg.data.keyword1.value="通过认证"
		modelmsg.data.keyword2.value=now_date
		modelmsg.data.remark.value="请点击进入查看"
		cb&&cb(modelmsg)
	}
}
else{
	console.log(err)
}
})
}
//根据openid 获取微信用户信息
exports.userinfo=function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	try{
		var program = req.params||req.context||req.query
		var userid=program.userid
	}
	catch(e){
		console.log(e)
	}
	var sql="select * from DB_USER WHERE Id="+userid
	global.db.getRow(sql,function(data,err){
		var OPENID=data.WxOpenId
		var obj = global.ERROR.success
		if (!OPENID){
			res.send({
				"status": -1,
				"state": 1,
				"msg": "openid is null",
			})
		}else{
			
			exports.getAccess_token(function(ret){
				var Access_Token =ret;
				var url="https://api.weixin.qq.com/cgi-bin/user/info?access_token="+Access_Token+"&openid="+OPENID+"&lang=zh_CN"
				request(url,function(err,ress,data){
					if(err){
						console.log(err)
						res.send(err)
					}else{
						var dd=JSON.parse(data)
						console.log(dd.headimgurl)
						obj.aaData.push({"headimgurl":dd.headimgurl})
						res.send(obj)
					}
				})	
			})
		}
	})
}

//前端获取OpenId
exports.GetOpenID = function (req, res, next) {
	var param= req.params||req.context||req.query
	console.log(param)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    var params = '/sns/oauth2/access_token?appid=' + AppId + '&secret=' + AppSecret + '&code=' + param.code + '&grant_type=authorization_code';
    https.get('https://api.weixin.qq.com' + params, function (ret) {
        var returnjson;
        var r = {};
        r.state = 567;
        r.msg = 'success';
        ret.on('data', function (chunk) {
            returnjson += chunk;
        });
        ret.on('end', function () {
            if (true) {
                var obj = JSON.parse(returnjson.substring(9));
                var model = {};
                model.openid = obj.openid;
                r.aaData = model;
                res.send(r);
            } else {
                r.satae = -1;
                r.msg = 'err:invalid code';
                res.send(r);
            }
            ;
        });
    });
}