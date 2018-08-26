var restify = require('restify');
var fs = require('fs');
var yshdb = require('./util/yshdb');
var api = require('./api/ditui');
var server_port = 5400;
var ENV = process.env.node_env || "development"
global.yshdb = yshdb;
global.db = new yshdb.db("ysh_Wisdom", ENV);
global.util = require('./util/util').osUtil;
global.ERROR = JSON.parse(fs.readFileSync('config/err.json'))
global.dbs = {};
global.cmds = {};

// global.sqlHelper = require('./util/sqlHelper').sqlHelper;
// global.sqlHelper.sql_Init(function (ret, err) {
    // ret ? console.log("---> SqlHelper init success") : console.log("---> SqlHelper init false :" + JSON.stringify(err))
    //global.sqlHelper.sql_AssociatedQuery({
    //    "baseName": "ysh_Wisdom",
    //    "mainTable": "DB_ORDITEM",
    //    "joinTable": [{
    //        "way": "left",
    //        "tableName": "DB_ORDER"
    //    }, {
    //        "way": "left",
    //        "tableName": "DB_USER",
    //        "targetTable": "DB_ORDER",
    //        "targetKey": "Id"
    //    }, {
    //        "way": "left",
    //        "tableName": "DB_PRODUCT",
    //        "joinKey": "Id",
    //        "targetTable": "DB_ORDITEM",
    //        "targetKey": "ProductId"
    //    }, {
    //        "way": "left",
    //        "tableName": "DB_PRODUCTMOULD",
    //        "targetTable": "DB_PRODUCT",
    //        "targetKey": "MouldId"
    //    }],
    //    "searchKey": [
    //        {
    //            "tableName": "DB_PRODUCTMOULD",
    //            "key": "Id",
    //            "value": "1",
    //            "operator": "!="
    //        }, {
    //            "tableName": "DB_PRODUCT",
    //            "key": "Id",
    //            "value": "Id",
    //            "operator": "!="
    //        }
    //    ]
    //}, function (err, resault, sql) {
    //    //console.log(err)
    //    //console.log(resault)
    //    //console.log(sql)
    //})
// })
var retmsg =global.ERROR.success
var webSocker = require('./util/webSockerHelper').websocket
webSocker.websocketInit(2000, function (err, msg, ws) {
    console.log(msg)
    retmsg.aaData[0] ={"loding":1}
    try{
        var session=msg.sesskey        
        webSocker.sendMsg(ws, retmsg, function (ws) {
            var strws= JSON.stringify(ws)
            var sql="UPDATE DB_SESSION SET ws='"+ws+"'WHERE `sesskey`='"+session+"'"   
            global.db.getAll(sql,function(data,err){
            })  
        })   
    }
    catch(e){
        console.log(e)
        webSocker.sendMsg(ws, 'false', function (ws) {
        })
    }
})

//加载控制器
var service = require('./service');
var controaller = require('./controller');
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

//路由控制
global.getfrom = function (api, params, func) {
    var client = restify.createJsonClient({
        url: api,
        version: '*'
    });
    client.post('', params, function (err, req, res, obj) {
        func(obj);
    });
}

global.getfrom("http://p.yshfresh.com/api/ysh/getapilist", {
    project: 'ysh'
}, function (rt) {
    if (rt) {
        for (var i in rt.aaData) {
            global.cmds[rt.aaData[i].cmd] = rt.aaData[i];
        }
    }
});

server.get('/api/tcauth/:name/:num/:userid', service.TcAuth.tcauth);
server.get('/api/getmanager/:userid', service.Manager.getManagerById);
server.post('/api/login', service.Manager.login);
server.get('/api/ysh/getSesskey', service.authority.getSesskey);
server.post('/api/ysh/getSesskey', service.authority.getSesskey);

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
server.get('/api/captchapng', service.captchas.captchas);
server.post('/api/captchapng', service.captchas.captchas);
server.get('/api/ysh/:cmd', controaller.controaller.ysh);
server.post('/api/ysh/:cmd', controaller.controaller.ysh);

//文件上传
server.get('/api/filepath', service.fileload.fileload);
server.post('/api/filepath', service.fileload.fileload);
//微信模板消息
server.get('/api/wxsendmsg', service.WXsendmsg.WXsendmsg);
server.post('/api/wxsendmsg', service.WXsendmsg.WXsendmsg);

//微信关注获取openid
server.get('/api/weixin', service.WeiXin.messageWeiXin);
server.post('/api/weixin', service.WeiXin.messageWeiXin);

//交易二维码
server.get('/api/ordernumber', service.ordernumber.createorder);
server.post('/api/ordernumber', service.ordernumber.createorder);

//获取用户信息
server.get('/api/GetUserInfo', service.WXsendmsg.userinfo);
server.post('/api/GetUserInfo', service.WXsendmsg.userinfo);

//前端获取OpenId
server.get('/api/GetOpenID', service.WXsendmsg.GetOpenID);
server.post('/api/GetOpenID', service.WXsendmsg.GetOpenID);

//后端判断用户角色状态
server.get('/api/userrole', service.UserRole.userrole);
server.post('/api/userrole', service.UserRole.userrole);

//二维码websocker
server.get('/api/websocker', service.websocker.websocker);
server.post('/api/websocker', service.websocker.websocker);
server.listen(server_port, function () {
    console.log('server start in ', server.name, server.url);
});

