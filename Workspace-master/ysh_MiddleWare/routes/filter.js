var express = require('express');
var dbObject = require('../common/dbapi.js');
var forward = require("../service/forward.js");
var middleWare = require("../service/middleWare.js");
var middleWareObj = middleWare.middleWare();
var forwardObj = forward.initForward();
var router = express.Router();
var dbapi = dbObject.dbapi();

/* GET router listing. */
router.get('/:router/:cmd/:Interface', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	//res.setHeader('content-type', 'text/html;charset=UTF-8');
	var param = {
			router:req.params.router || null,
			cmd : req.params.cmd || null,
			Interface:req.params.Interface || null,
			query:req.query || null,
			body:req.body||null,
			way:"get",
			type:3
	};
	var ipAddress = getClientIP(req).split("::");
	getForwardurl(param,ipAddress,res);
});

router.post('/:router/:cmd/:Interface', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	//res.setHeader('content-type', 'text/html;charset=UTF-8');
	var param = {
			router:req.params.router || null,
			cmd : req.params.cmd || null,
			Interface:req.params.Interface || null,
			query:req.query || null,
			body:req.body||null,
			way:"post",
			type:3
	};
	var ipAddress = getClientIP(req).split("::");
	getForwardurl(param,ipAddress,res);
});


router.get('/:router/:Interface', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	//res.setHeader('content-type', 'text/html;charset=UTF-8');
	var param = {
			router:req.params.router || null,
			Interface:req.params.Interface || null,
			query:req.query || null,
			body:req.body||null,
			way:"get",
			type:2
	};
	var ipAddress = getClientIP(req).split("::");
	getForwardurl(param,ipAddress,res);
});

router.post('/:router/:Interface', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	//res.setHeader('content-type', 'text/html;charset=UTF-8');
	var param = {
			router:req.params.router || null,
			Interface:req.params.Interface || null,
			query:req.query || null,
			body:req.body||null,
			way:"post",
			type:2
	};
	var ipAddress = getClientIP(req).split("::");
	getForwardurl(param,ipAddress,res);
});

router.get('/:router', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	//res.setHeader('content-type', 'text/html;charset=UTF-8');
	var param = {
			router:req.params.router || null,
			query:req.query || null,
			body:req.body||null,
			way:"get",
			type:1
	};
	var ipAddress = getClientIP(req).split("::");
	getForwardurl(param,ipAddress,res);
});

router.post('/:router', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	var param = {
			router:req.params.router || null,
			query:req.query || null,
			body:req.body||null,
			way:"post",
			type:1
	};
	
	var ipAddress = getClientIP(req).split("::");
	getForwardurl(param,ipAddress,res);
});


function getForwardurl(param,ipAddress,res){
	if(param.router.indexOf(".") < 0){
		if(ipAddress[1]!=1){
			ipAddress[1] = ipAddress[1].split("ffff:")[1];
		}else{
			ipAddress[1] = 'localhost';
		}
		if(param.router=="MiddleWare"){
			middleWareObj.initMiddleWare(param,function(result){ 
				res.send(result);
			});
		}else{
			var url = "http://";
			switch (param.type) {
				case 1:
					if(param.router=='test' || param.router=='log' || param.router=='authority' || param.router=='getopenid'){
						url +="api2.yshfresh.com/" + param.router;
					}else if(param.router=='ss'){
						console.log("B端服务");
					}else{
						console.log("特殊服务3");
					}
					break;
				case 2:
					if(param.router=='sss'){
						url +="api2.yshfresh.com/" + param.router + "/" + param.Interface;
					}else if(param.router=='api'||param.router=='test' || param.router=='log' || param.router=='authority' || param.router=='getopenid'){
						url +="api2.yshfresh.com/" + param.router + "/" + param.Interface;
					}else{
						console.log("特殊服务1");
					}
					break;
				case 3:
					if(param.router=='see'){
						console.log("特殊服务2");
					}else if(param.router=='ss'){
						console.log("B端服务");
					}else{
						url +="api2.yshfresh.com/" + param.router + "/" + param.cmd + "/" + param.Interface;
					}
					break;
			};
			
			var str_body="";
			if(param.body){
				str_body = JSON.stringify(param.body);
			}
			
			if(param.query){
				var str = "?";
				for (var num in param.query){
					var strTemp = num + "=" + param.query[num] +"&";
					str += strTemp;
				}
				url += str;
			}
			forwardObj.forward(url,param.way,str_body,res,function(result){
				//coding 访问写入
			});
		}
	};
}

function getClientIP(req){
	var ipAddress;
	var headers = req.headers;
	var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
	forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
	if (!ipAddress) {
		ipAddress = req.connection.remoteAddress;
	}
		return ipAddress;
}

module.exports = router;
