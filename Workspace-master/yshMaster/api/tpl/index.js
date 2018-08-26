var restify = require('restify');
//var user=require('./lib/user');
var yshdb = require('./lib/yshdb');
var api = require('./api/ditui');
global.yshdb = yshdb;
global.db = new yshdb.db("ysh_shop");
global.logs = new yshdb.db("ysh_log");
global.dbs = {};
global.cmds = {};
global.log = function(obj) {
	console.log('object :' + JSON.stringify(obj));
}
global.log1 = function(s) {
	console.log('string :' + s);
}

//加载控制器
var ctrl = require('./controllers');
var server = restify.createServer();

global.models = require('./models');

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
global.getform = function(api, params, func) {
	var client = restify.createJsonClient({
		url: api,
		version: '*'
	});
	client.post('', params, function(err, req, res, obj) {
		func(obj);
	});
}
global.getform("http://localhost:5001//api/ysh/getcmds", {
	project: 'ysh'
}, function(rt) {
	for(var i in rt.aaData) {
		global.cmds[rt.aaData[i].cmd] = rt.aaData[i];
	}
	console.log("cmds loaded:" + rt.aaData.length);
});

server.get('/api/tcauth/:name/:num/:userid', ctrl.TcAuth.tcauth);
server.get('/api/getmanager/:userid', ctrl.Manager.getManagerById);
server.post('/api/login', ctrl.Manager.login);

server.get('/getopenid/:code', ctrl.WeiXin.GetOpenID);
server.get('/api/get/:cmd', ctrl.goods.get);
server.post('/api/get/:cmd', ctrl.goods.get);

server.get('/api/ysh/:cmd', ctrl.business.ysh);
server.post('/api/ysh/:cmd', ctrl.business.ysh);

server.get('/api/goods/:cmd', ctrl.goods.get);
server.post('/api/goods/:cmd', ctrl.goods.get);

server.get('/log/:cmd', ctrl.business.log);
server.post('/log/:cmd', ctrl.business.log);

server.get('/test', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	var s = "";
	s = "<div>";
	for(k in req) {
		if(k != 'query') {
			s += k + "  " + req[k] + "<br>";
		}
	}
	s += "</div>";
	res.send(s);
});

server.listen(6001, function() {
	console.log('%s listening at %s', server.name, server.url);
});