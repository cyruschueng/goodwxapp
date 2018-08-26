/*
 * 测评参数
 */
var appData = getApp();
var evalParam =  {
	"connect":{
		"cmd":"connect",
		"param":{
			"sdk":{
				"version":50528256,
			    "source":2,
			    "protocol":2
			},
			"app":{
				"applicationId" : "",
				"sig" : "",
				"timestamp" : ""
	    	}
		}
	},
	"start":{
		"cmd":"start",
		"param":{
			"app":{
				"userId":"wechat",
				"applicationId":"",
				"sig":"",
				"timestamp":""
			},
	        "audio":{
	        	"audioType":"mp3",
	        	"sampleRate":8000,
	        	"channel":1,
	        	"sampleBytes":2
	        },
	        "request":{
	            "typeThres" : 0,
	            "precision" : 1,
	            "coreType" : "",
	            "refText" : "",
	            "attachAudioUrl" : 1,
	            "rank": 100 ,
	            "tokenId": "59acc7bd75d5bd0000019780",
	        }
	    }
	}
};
/*
 * 获取评测的json
 * @param userId 微信用户Id
 * @param refText 测评内容
 * @param coreType 测评类型
 */
function getEvalJson(userId, refText, coreType = 'en.sent.score'){
	evalParam.connect.param.sdk.version = getVersion();
	evalParam.connect.param.sdk.source = source();
	evalParam.start.param.app.userId = userId;
	evalParam.start.param.request.refText = refText;
	evalParam.start.param.request.coreType = coreType;
	
	return evalParam;
}


/*
 * 生成签名
 */
function getSig(appKey = false, secretKey = false, timeStamp){
	if(!appkey || !secretKey){
		return false;
	}else{
		return true;
	}
}

/*
 * 获取source
 */
function source(){
	var ispc = isPC();
	if(ispc){
		return 7;
	}else{
		var source = getOS;
		return getOS();
	}
}

/*
 * 产生版本号
 */
function getVersion(){
	var vers = '2.0.0';
	var strs=vers.split(".");
	var version = (parseInt(strs[0]) * Math.pow(2,16) + 
					parseInt(strs[1]) * Math.pow(2,8) + 
					parseInt(strs[2])) * Math.pow(2,8);
	return version;
}

/*
 * 获取操作系统
 * 判断是IOS还是android
 */
function getOS(){
	if(appData.globalData.sysFlag == 'ios'){
		return 5
	}else {
		return 1;
	}
	return;
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
       return 1;
    }
    if (isIOS) {
　　　　return 5;
    }
}

/*
 * 判断是否是PC端
 * @return false 为手机端, true 为PC端
 */
function isPC(){
	return false;
	var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
module.exports = {
    // isPC:isPC,
    // getOS:getOS,
	getVersion:getVersion,
	source:source,
	getSig:getSig,
	getEvalJson:getEvalJson,
	evalParam:evalParam
};