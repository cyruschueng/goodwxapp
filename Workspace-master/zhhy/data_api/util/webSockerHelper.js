exports.name = 'websocker';
var webSocketServer = require('ws').Server
exports.websocket = {
    "websocketInit": function (port, callback) {
        websocketInit(port, callback)
    },
    "sendMsg": function (ws, msg, callback) {
        websocketSendMsg(ws, msg, callback)
    },
    "webSocketClose": function (ws, callback) {
        websocketclose(ws, callback)
    }
}

function websocketInit(port, callback) {
    wss = new webSocketServer({
        port: port, //监听接口
        verifyClient: socketVerify //可选，验证连接函数
    });
    console.log("websocket " + port + " 端口监听成功")
    wss.on('connection', function (ws) {
        ws.on('message', function (jsonStr, flags) {
            if(typeof jsonStr != 'object')
                try{
                    var msg = eval('(' + jsonStr + ')');
                    callback && callback(true, msg, ws)
                }catch(e){
                    callback && callback(false, jsonStr, ws)
                }
            });
        ws.on('close', function (close) {
            try {
                console.log("前端连接断开")
            } catch (e) {
                console.log('刷新页面了');
            }
        });
    });
}

function socketVerify(info) {
    console.log(info.origin);
    console.log(info.req.t);
    console.log(info.secure);
    // console.log(info.origin);
    // var origin = info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);
    //if (origin.length >= 3 && origin[2] == "blog.luojia.me") {
    //    return true; //如果是来自blog.luojia.me的连接，就接受
    //}
    // console.log("连接",origin[2]);
    return true; //否则拒绝
}

var websocketclose = function (ws, callback) {
    ws.close()
}

function websocketSendMsg(ws, msg, callback) {
    if(typeof msg =="object"){
        msg = JSON.stringify(msg)
    }
    ws.send(msg.toString())
    callback && callback(ws)
}