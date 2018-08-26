var DataDefine = require("DataDefine");

var socket = cc._Class.extend({
    ctor : function() {
        this.mConnectState = DataDefine.SocketConnectState.origin;
        this.mIgnoreMsgs = {
            'heart_beat' : true,
        };
    },

    log : function(desc) {
        var suffix = fr.userinfo.mUserId || 'defualt';
        cc.log("===[socket|" + suffix + "]===", desc);
    },

    connect : function(url, emitHandler) {
        this.log("connect url : " + url);
        this.mUrl = url;
        this.mEmitHandler = emitHandler;

        this.mSocket = this.createSocketInstance({
            url : url,
            onopen : this.onopen.bind(this),
            onmessage : this.onmessage.bind(this),
            onerror : this.onerror.bind(this),
            onclose : this.onclose.bind(this),
        });
    },

    emit : function() {
        if (this.mEmitHandler) {
            this.mEmitHandler.apply(this, arguments);
        } else {
            fr.display.emit.apply(fr.display, arguments);
        }
    },

    onopen : function(event) {
        this.mConnectState = DataDefine.SocketConnectState.opened;

        fr.display.unschedule(this, this.heartBeat);
        fr.display.schedule(this, this.heartBeat, fr.userinfo.mHeartBeatInterval);

        this.emit(fr.events.Socket_OnOpen);
    },

    onmessage : function(event) {
        var content = this.decodeMessage(event.data);
        if (content == null || content == '0000') {
            return;
        }

        var strJson = content.substr(0, content.length - 0);
        if (strJson != null && strJson.length > 0) {
            var json = JSON.parse(strJson);
            if (!this.mIgnoreMsgs[json.cmd]) {
                this.log('[receive msg]: ' + unescape(content.replace(/\\u/gi,'%u')));
            }

            this.emit(json.cmd, json.result);
        }
    },

    onerror : function(event) {
        this.log("socket.onerror: " + JSON.stringify(event));
        this.mConnectState = DataDefine.SocketConnectState.error;
    },

    onclose : function(event) {
        this.log("socket.onclose: " + JSON.stringify(event));
        this.mConnectState = DataDefine.SocketConnectState.closed;
    },

    send : function(jsonData) {
        if (this.mConnectState == DataDefine.SocketConnectState.opened) {
            var msg = JSON.stringify(jsonData);
            if (!this.mIgnoreMsgs[jsonData.cmd]) {
                this.log('[send msg] : ' + msg);
            }

            this.mSocket.send(msg);
        } else {
            this.log("socket connect is break, reconnect");
            this.connect(this.mUrl);
        }
    },

    heartBeat : function () {
        fr.msg.heartBeat();
    },

    decodeMessage : function(data) {
        if (typeof ArrayBuffer != 'undefined' && data instanceof ArrayBuffer) {
            var databytes = new Uint8Array(data);
            var content = ''
            for (var i = 0, len = databytes.length; i < len; i++) {
                var tmpc = String.fromCharCode(databytes[i]);
                content += tmpc;
            }
            return content
        }
        var data = fr.codec.base64decodeRaw(data);
        var mask = data.slice(0, 4);
        data = data.slice(4);
        for (var i = 0, len = data.length; i < len; i++) {
            var charcode = data[i];
            charcode ^= mask[i % 4];
            data[i] = charcode;
        }
        var result = fr.codec.utf8Decode(data);
        return result;
    },
});

module.exports = socket;