var wxsocket = cc.Class({
    extends : require("socket"),

    createSocketInstance : function(params) {
        cc.info("wxsocket createSocketInstance")
        wx.connectSocket({
            url: params.url
        });

        wx.onSocketOpen(function(events) {
            params.onopen(events);
        });

        wx.onSocketMessage(function(events) {
            params.onmessage(events);
        });

        wx.onSocketError(function(events) {
            params.onerror(events);
        });

        wx.onSocketClose(function(events) {
            params.onclose(events);
        });

        wx.send = function(msg) {
            wx.sendSocketMessage({
                data    : msg,
                success : function(params){
                },
                fail    : function(params) {
                    cc.error('wxsocket | TCP sendMsg fail:' + JSON.stringify(arguments));
                },
            });
        }

        return wx;
    },
});

module.exports = wxsocket;