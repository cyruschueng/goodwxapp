class Options {
    constructor(obj) {
        this.debug = false; //是否打印调试信息
        this.url = ""; //websocket连接地址
        this.params = {}; //websocket连接参数
        this.onMessage = () => {}; //服务端消息回调
        this.onHeartbeat = () => { }; //心跳回调
        Object.assign(this, obj);
    }
}

class WebSocket {

    constructor(obj) {

        this.cache = [];
        this.options = new Options(obj);
        this.debug = this.options.debug;
        this.isOpen = false;
        this.socketHandler = null;
        this.timeoutHandler = null;
        this.timeout = 2000;
        

        /**
         * 创建连接
         */
        this.connectSocket();

        /**
         * 成功建立连接
         */
        console.log("wx.onSocketOpen");
        wx.onSocketOpen(res => {
            this.debug && console.log('webSocket is connected!', res);
            this.isOpen = true;
            if (this.timeoutHandler) {
                clearInterval(this.timeoutHandler);
                this.timeoutHandler = null;
            }
            //心跳
            this.socketHandler = setInterval(() => {
                this.debug && console.log('webSocket heart!', res, this.socketHandler);
                wx.sendSocketMessage({
                    data: ""
                });
                this.options.onHeartbeat();
                this.timeout = 2000;
            }, 25e3);
        });

        /**
         * 收到服务端消息
         */
        wx.onSocketMessage(res => {
            // this.debug && console.log("webSocket on message!", res);
            this.options.onMessage(res);
        });

        /**
         * 收到断开连接消息
         */
        wx.onSocketClose(res => {
            this.debug && console.log("webSocket is closed!%c (code: " + res.code + ", msg: " + res.reason + ")", "color:red");
            this.isOpen = false;
            if (this.socketHandler) {
                clearTimeout(this.socketHandler);
                this.socketHandler = null;
            }

            //断线自动重连
            if (res.code != 1000) {
                this.timeoutHandler = setTimeout(() => {
                    this.timeout *= 2;
                    this.connectSocket();
                }, this.timeout);
            }
        });

    }

    /**
     * 创建连接
     */
    connectSocket() {
        this.options && wx.connectSocket({
            url: this.options.url,
            method: "GET",
            data: this.options.params,
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                this.debug && console.log("webSocket is connecting!", this.options.url);
                if (this.cache.length != 0) {
                    this.cache.forEach((item) => {
                        this.sendMessage(item)
                    });
                    this.cache.length = 0;
                }
            },
            fail: res => {
                console.log('wx.connectSocket fail', res);
            }
        });
    }

    /**
     * 断开连接
     */
    closeSocket() {
        wx.closeSocket({
            code: 1000,
            reason: '正常关闭连接',
            success:()=>{
                this.timeoutHandler && clearTimeout(this.timeoutHandler);
                this.socketHandler && clearInterval(this.socketHandler);
            }
        });
    }

    /**
     * 发送消息
     * 返回: 连接状态
     */
    sendMessage(data) {
        this.debug && console.log("webSocket send message!", JSON.stringify(data), "success: " + this.isOpen);

        if (this.isOpen) {
            wx.sendSocketMessage({
                data: data,
                success: () => {
                    console.log('发送成功', data);
                },
                fail: () => {
                    console.log('发送失败', data);
                }
            });
        } else {
            this.cache.push(data)
            // wx.showToast({
            //     title: '与服务器失去连接',
            //     duration: 2000,
            //     mask: true
            // });
        }
        return this.isOpen;
    }
}



module.exports = WebSocket;