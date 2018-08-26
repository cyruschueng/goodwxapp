global.log = function(obj, json) {
	var str = obj;
	if('object' == typeof obj) {
		str = JSON.stringify(obj);
	}
	var setFields = '';
	if(!json) {
		json = {
			LogLevelId: 0,
			ShortMessage: '',
			FullMessage: str,
			tag: tag + server_port
		}
	}

	for(k in json) {
		if(setFields) setFields += ',';
		setFields += k + "='" + json[k] + "'";
	}

	var sql = 'insert into Sys_Logs set ' + setFields + ',CreatedOnUtc=' + new Date().getTime();
	global.logs.getAll(sql, function(d, err) {
		if(err) {
			console.log(err);
		} else {

		}
	})
}

var restify = require('restify');
var yshdb = require('./lib/yshdb');
var api = require('./api/ditui');
var server_port = 7000;
global.yshdb = yshdb;

global.db = new yshdb.db("ysh_Wisdom");
global.logs = new yshdb.db("ysh_log");
global.dbs = {};
global.cmds = {};

//加载控制器
var ctrl = require('./controllers');
global.models = require('./models');

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({
	mapParams: true
}));
server.use(restify.dateParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.CORS());

function respond(req, res, next) {
	res.send('hello ' + req.params.name);
	next();
}

//路由控制

global.getfrom = function(api, params, func) {

	var client = restify.createJsonClient({
		url: api,
		version: '*'
	});

	client.post('', params, function(err, req, res, obj) {

		func(obj);
	});
}
global.getfrom("http://p.yshfresh.com/api/ysh/getapilist", {
	project: 'ysh'
}, function(rt) {
	if(rt) {
		for(var i in rt.aaData) {
			global.cmds[rt.aaData[i].cmd] = rt.aaData[i];
		}
		// global.cmds=rt.aaData;
		console.log("cmds loaded:" + rt.aaData.length);
	}
});

server.get('/api/tcauth/:name/:num/:userid', ctrl.TcAuth.tcauth);
server.get('/api/getmanager/:userid', ctrl.Manager.getManagerById);
server.post('/api/login', ctrl.Manager.login);

server.get('/api/test', function(req, res, next) {
	res.send("hello");
	next();
});

// server.post('/api/ActDisDetial', ctrl.PayMent.ActDisDetial);
// server.get('/api/ActDisDetial', ctrl.PayMent.ActDisDetial);
// server.post('/api/payment', ctrl.PayMent.payment);
// server.get('/api/payment', ctrl.PayMent.payment);

// server.get('/api/messageWeiXin', ctrl.WeiXin.messageWeiXin);
// server.post('/api/messageWeiXin', ctrl.WeiXin.messageWeiXin);
// server.get('/api/getAccess_token', ctrl.WeiXin.getAccess_token);
// server.post('/api/getAccess_token', ctrl.WeiXin.getAccess_token);
// server.post('/api/jsapiTicket', ctrl.WeiXin.jsapiTicket);
// server.get('/api/jsapiTicket', ctrl.WeiXin.jsapiTicket);
server.get('/getopenid/:code', ctrl.WeiXin.GetOpenID);
server.get('/api/get/:cmd', msg_useysh);
server.post('/api/get/:cmd', msg_useysh);

function msg_useysh(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	var r = {
		state: -1,
		msg: '请使用接口 /api/ysh/'
	};
	res.write(JSON.stringify(r));
	res.end();
}

server.get('/api/ysh/:cmd', ctrl.business.ysh);
server.post('/api/ysh/:cmd', ctrl.business.ysh);
// server.get('authority/:cmd', ctrl.authority.authority);
// server.post('authority/:cmd', ctrl.authority.authority);

// server.get('/api/ds/:cmd', ctrl.business.ysh);
// server.post('/api/ds/:cmd', ctrl.business.ysh);

// server.get('/api/goods/:cmd', ctrl.goods.get);
// server.post('/api/goods/:cmd', ctrl.goods.get);

// server.get('/api/InterfaceTest/:cmd',ctrl.business.InterfaceTest);
// server.post('/api/InterfaceTest/:cmd',ctrl.business.InterfaceTest);

server.get('/log/:cmd', ctrl.business.log);
server.post('/log/:cmd', ctrl.business.log);

server.get('/test', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	console.log('===================================================');
	var s = "";

	console.log(req.client);
	s = "<div>";

	for(k in req) {
		// console.log(k);
		// if(k=='_clen') break;
		if(k != 'query') {
			s += k + "  " + req[k] + "<br>";
		}
	}
	s += "</div>";
	res.send(s);
});

server.listen(server_port, function() {
	console.log('%s listening at %s', server.name, server.url);
});