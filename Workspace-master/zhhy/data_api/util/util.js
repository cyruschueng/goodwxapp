exports.name = 'osUtil';
exports.osUtil = {
	"getIp": function(req) {
		return getClientIP(req)
	},
	"getRandomString": function(len) {
		return randomString(len)
	},
	"timeFormat": function(time) {
		return timeFormat(time)
	}
}

/*
 * Get Client IP Address
 * @params
 * req:The object of request
 */
function getClientIP(req) {
	var ipAddress;
	var headers = req.headers;
	var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
	forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
	if(!ipAddress) {
		ipAddress = req.connection.remoteAddress;
	}
	if(ipAddress == "::1") {
		ipAddress = getIPAdress()
	} else {
		ipAddress = ipAddress.replace("::ffff:", "")
	}
	return ipAddress;
}

/*
 * Get Local IP Address
 */
function getIPAdress() {
	var interfaces = require('os').networkInterfaces();
	for(var devName in interfaces) {
		var iface = interfaces[devName];
		for(var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address;
			}
		}
	}
}

/*
 * Get randomString
 * @params:
 * len: Generate string length (default 32)
 * @Time
 * 2016/11/29
 * @Author　啸
 */
function randomString(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = $chars.length;
	var pwd = '';
	for(i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

/*
 * Get TimeFormat
 * @params:
 * time: January 1, 1970 and midnight (GMT time) the number of milliseconds (default new Date().getTime())
 * @Exception  IllegalType
 * @Time
 * 2016/11/29
 * @Author　啸
 */
function timeFormat(time) {
	try {
		time = time || new Date().getTime()
	} catch(e) {
		return global.ERROR.IllegalType
	}
	var obj = {
		time: new Date(time).getFullYear() + "/" + (new Date(time).getMonth() + 1) + "/" + new Date(time).getDate() + " " + new Date(time).getHours() + ":" + new Date(time).getMinutes() + ":" + new Date(time).getSeconds(),
		_time: new Date(time).getFullYear() + "年" + (new Date(time).getMonth() + 1) + "月" + new Date(time).getDate() + "日 " + new Date(time).getHours() + "点" + new Date(time).getMinutes() + "分" + new Date(time).getSeconds() + "秒",
		time_: new Date(time).getFullYear() + "-" + (new Date(time).getMonth() + 1) + "-" + new Date(time).getDate() + " " + new Date(time).getHours() + ":" + new Date(time).getMinutes() + ":" + new Date(time).getSeconds(),
		timef: new Date(time).getFullYear() + "/" + (new Date(time).getMonth() + 1) + "/" + new Date(time).getDate(),
		_timef: new Date(time).getFullYear() + "-" + (new Date(time).getMonth() + 1) + "-" + new Date(time).getDate(),
		timef_: new Date(time).getFullYear() + "年" + (new Date(time).getMonth() + 1) + "月" + new Date(time).getDate() + "日 "
	}
	return obj
}