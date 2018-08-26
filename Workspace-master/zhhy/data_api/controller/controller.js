exports.name = 'controaller';

var fs = require("fs")
var err = JSON.parse(fs.readFileSync('./config/err.json'))
var uuid = require('node-uuid');
var dbapi = require('../util/dbapi.js');

function init(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	var pdata = new Object();
	pdata.cmdin = req.params.cmd;
	var r = {
		state: 0,
		msg: 'unknow',
		aaData: []
	}

	pdata.r = r;
	pdata.params = new Object();
	for(name in req.params) {
		var nname = name.trim();
		var val = req.params[name].trim();
		pdata.params[nname] = val;
	}
	pdata.next = next;
	pdata.params.ip = global.util.getIp(req)
	return pdata;
}

exports.ysh = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	var pdata = init(req, res, next)
	if(!pdata.params.sesskey) {
		res.send(err.GetSesskeyFail)
	} else {
		var sql = "select * from DB_SESSION where sesskey='" + pdata.params.sesskey + "'";
		global.db.getAll(sql, function(rd, errs) {
			if(rd.length <= 0) {
				res.send(err.InvalidSesskey)
			} else {
				dbapi.proapi(pdata, function(data) {
					res.send(data)
				})
			}
		})
	}
}