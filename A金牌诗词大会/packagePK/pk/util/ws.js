/**
 * @file websocket服务
 * @author hurry
 * @date 2018/01/25
 */
import config from '../config';
import comConfig from '../../../utils/config';
import wxService from '../../../utils/wxService';

export default function (pkServer, options, userId) {
    let token = wx.getStorageSync('TOKEN');
    let isSocketClose = true;
    // wx.connectSocket({
    //     url: config.SERVER_HOST + config.PATHS.PK
    // });
    // wx.onSocketOpen((res) => {
    //     send(options.cmd, options.data);
    // });
    wx.onSocketClose(() => {
        console.log('websocket关闭');
        isSocketClose = true;
        options.onSocketClose && options.onSocketClose();
    });

    wx.onSocketError((res) => {
        options.onSocketError && options.onSocketError(res);
        console.log('WebSocket链接错误，错误原因：' + JSON.stringify(res));
    });

    function getLogerId() {
        return userId + '_' + (new Date().getTime());
    }

    function open(cmd, data, cb) {
        // console.log('###########');
        // console.log(config.SERVER_HOST + config.PATHS.PK);
        // wx.connectSocket({
        //     url: config.SERVER_HOST + config.PATHS.PK + ''
        //         + '?'
        //         + 'token=' + token
        //         + '&logerId=' + getLogerId()
        //         + '&appVersion=' + comConfig.APP_VERSION
        // });
        connect();
        wx.onSocketOpen((res) => {
            isSocketClose = false;
            send(cmd, data, cb);
        });
    }

    function on(cb) {
        wx.onSocketMessage(function (res) {
            cb && cb(res);
        });
    }

    function send(cmdType, dt, cb) {
        console.log('[' + (new Date().getTime()) + ']:' + cmdType + '\r\n' + '数据：' + JSON.stringify(dt));
        if (isSocketClose) {
            open(cmdType, dt, cb);
            return;
        }
        wx.sendSocketMessage({
            data: JSON.stringify({
                cmd: cmdType,
                data: dt
            }),
            success: cb
        });
    }

    function connectSocket(pkServer) {
        wx.connectSocket({
            url: pkServer
        });
    }

    function connect() {
        if (!pkServer) {
            // 获取邀请好友的websocket地址，保存到storage中
            wxService({
                url: comConfig.SERVER_HOST + comConfig.PATHS.PK_SERVER,
                success: (res) => {
                    // wx.setStorageSync('PK_SERVER', res.server);
                    // var url = '/pages/index/index';
                    // if (skipUrl) {
                    //     url += '?skipUrl=' + skipUrl
                    // }
                    // me.createFadeOutAnimation();
                    // wx.redirectTo({
                    //     url: url
                    // });
                    // 进入Pk页面一次获取一次，用于重连
                    pkServer = res.server;
                    connectSocket(pkServer);
                }
            });
            return;
        }
        connectSocket(decodeURIComponent(pkServer));
        // wx.connectSocket({
        //     // url: config.SERVER_HOST + config.PATHS.PK + ''
        //     url: (pkServer ? decodeURIComponent(pkServer) : config.SERVER_HOST + config.PATHS.PK)
        //         + '?'
        //         + 'token=' + token
        //         + '&loggerId=' + getLogerId()
        //         + '&appVersion=' + comConfig.APP_VERSION
        // });
    }

    // 重连
    function reconnect() {
        connect();
        wx.onSocketOpen((res) => {
            isSocketClose = false;
            send(config.CMD_TYPE.SERVER.RECONNECT);
        });
    }

    function close() {
        wx.closeSocket();
    }

    // 第一次发match信息
    open(options.cmd, options.data);

    return {
        on,
        send,
        close,
        reconnect
    };
};
