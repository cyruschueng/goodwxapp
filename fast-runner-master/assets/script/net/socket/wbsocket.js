var wbsocket = cc.Class({
    extends : require("socket"),

    createSocketInstance : function(params) {
        var ws = new WebSocket(params.url);

        ws.onopen = params.onopen;
        ws.onmessage = params.onmessage;
        ws.onerror = params.onerror;
        ws.onclose = params.onclose;

        return ws;
    },
});

module.exports = wbsocket;