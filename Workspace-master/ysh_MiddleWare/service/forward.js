var dbObject = require('../common/dbapi.js');
var dbapi = dbObject.dbapi();
var mesgArr = new Array();
var forward = {
		forward:function(ipAddress,way,body,res,callback){
			superagent_Forward(res,way,body,ipAddress,function(reqObj){
				if(!reqObj.status){
					var count = 0;
					for(var num in mesgArr){
						if(mesgArr[num].ipAddress == reqObj.ipAddress && mesgArr[num].resToken == reqObj.resToken){
							mesgArr[num].times = mesgArr[num].times + 1;
							count++;
						}
					}
					if(count==0){
						reqObj.times = 1;
						mesgArr.push(reqObj);
					}
				}
			});
			callback && callback();
		}
};

//superagent To Forward
function superagent_Forward(res,way,body,ipAddress,callback){ 
	var superagent = require('superagent');
	if(way=="get"){
		var sreq = superagent.get(ipAddress); 
	}else if(way=="post"){
		var sreq = superagent.post(ipAddress).send(JSON.parse(body)); 
	}
	var reqObj = {
			ipAddress:ipAddress,
			status:false,
			resToken:res
	};
	
	res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});  
	sreq.pipe(res);
	sreq.on('end', function(err){
		//Get faile request
		if(!err)
			reqObj.status = true;
			callback && callback(reqObj);
   });
}

setInterval(function () {
	 if(mesgArr.length >0){
		 var obj = mesgArr[0];
		 if(obj.times<5){
			 superagent_Forward(obj.resToken,obj.ipAddress,function(reqObj){
				 if(!reqObj.status){
					 mesgArr[0].times = mesgArr[0].times + 1;
				 }else{
					 mesgArr.shift();
				 }	 
			 });
		 }else{
			 mesgArr.shift();
		 }
	 }
}, 1500);

exports.initForward = function(){
    return forward;
};
