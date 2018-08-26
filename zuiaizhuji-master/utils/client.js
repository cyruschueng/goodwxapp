"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var listener_js_1 = require("./listener.js");
/**
 * 基本配置信息
 */
var Config = /** @class */ (function () {
    /**
     * 服务配置信息
     * @param {string} host 主机名
     * @param {number} port 端口号
     */
    function Config(host, port) {
        this.host = host;
        this.port = port;
    }
    /**
     * 获取主机名
     * @return {string}
     */
    Config.prototype.getHost = function () {
        return this.host;
    };
    /**
     * 设置主机名
     * @param {string} host
     */
    Config.prototype.setHost = function (host) {
        this.host = host;
    };
    /**
     * 获取端口号
     * @return {number}
     */
    Config.prototype.getPort = function () {
        return this.port;
    };
    /**
     * 设置端口号
     * @param {number} port
     */
    Config.prototype.setPort = function (port) {
        this.port = port;
    };
    /**
     * 获取连接地址
     * @return {string}
     */
    Config.prototype.getAddress = function () {
        return this.host + ":" + this.port;
    };
    return Config;
}());
exports.Config = Config;
/**
 * 消息类
 */
var Message = /** @class */ (function () {
    /**
     * 默认构造器
     * @param {string} id 唯一消息ID
     * @param {string} type 消息类型
     * @param {*} data 消息体
     */
    function Message(id, type, data) {
        this.id = id;
        this.type = type;
        this.data = data;
    }
    /**
     * 解析数据然后转换为Message对象
     * @param {string} data
     * @return {Message}
     */
    Message.parse = function (data) {
        data = JSON.parse(data);
        return new Message(data.id, data.type, data.data);
    };
    /**
     * 获取唯一ID
     * @return {string}
     */
    Message.prototype.getId = function () {
        if (!this.id)
            this.id = 'm' + new Date().getTime();
        return this.id;
    };
    /**
     * 获取消息类型
     * @return {string}
     */
    Message.prototype.getType = function () {
        return this.type;
    };
    /**
     * 获取消息内容
     * @return {*}
     */
    Message.prototype.getData = function () {
        return this.data;
    };
    /**
     * 设置消息内容
     * @param {*} data
     */
    Message.prototype.setData = function (data) {
        this.data = data;
    };
    /**
     * 转换成字符串
     * @return {string}
     */
    Message.prototype.toString = function () {
        return JSON.stringify({ id: this.getId(), type: this.getType(), data: this.getData() });
    };
    return Message;
}());
exports.Message = Message;
/**
 * 客户端
 */
var Client = /** @class */ (function () {
    function Client() {
    }
    /**
     * 初始化
     * @param {Config} config
     */
    Client.init = function (config) {
        Client.config = config;
        wx.onSocketOpen(function (res) { return listener_js_1.default.fireEventListener('websocket.open', [res]); });
        wx.onSocketError(function (res) { return listener_js_1.default.fireEventListener('websocket.error', [res]); });
        wx.onSocketClose(function (res) {
            Client._isConnected = false;
            Client._isLogin = false;
            listener_js_1.default.fireEventListener('websocket.close', [res]);
        });
        wx.onSocketMessage(function (res) {
            res = JSON.parse(res.data);
            //回应服务器心跳
            if ('ping' === res.type) {
                console.debug('ping server...', new Date());
                wx.sendSocketMessage({ data: '{"type":"pong"}' });
                return;
            }
            var msg = new Message(res.id, res.type, res.data);
            console.debug('receiving server message', msg);
            for (var i = 0; i < Client.routes.length; i++) {
                var route = Client.routes[i];
                if (typeof route.rule === 'function') {
                    if (route.rule.call(null, msg) && route.callback.call(null, msg) === false)
                        return;
                }
                else {
                    if (route.rule === msg.getType() && route.callback.call(null, msg) === false)
                        return;
                }
            }
        });
    };
    /**
     * 是否已经初始化
     * @return {boolean}
     */
    Client.isInited = function () {
        return Client.config != null;
    };
    /**
     * 连接服务器
     * @param {Object} options
     */
    Client.connect = function (options) {
        if (options === void 0) { options = {}; }
        var oldSuccess = options.success;
        options.success = function (res) {
            Client._isConnected = true;
            oldSuccess && oldSuccess.call(null, res);
        };
        wx.connectSocket(__assign({ url: 'wss://' + Client.config.getAddress() }, options));
    };
    /**
     * 关闭连接
     * @param {Object} [options]
     */
    Client.close = function (options) {
        if (options === void 0) { options = { code: 1000, reason: '' }; }
        wx.closeSocket(options);
    };
    /**
     * 请求一个操作
     * @param {Message} msg
     * @param {Object} options
     */
    Client.request = function (msg, options) {
        if (options === void 0) { options = {}; }
        wx.sendSocketMessage({
            data: msg + "",
            success: function () {
                var route = Client.addRoute(function (message) {
                    return message.getId() === msg.getId();
                }, function (message) {
                    Client.removeRoute(route);
                    options.success && options.success.call(null, message);
                    options.complete && options.complete.call(null, message);
                    return false;
                });
            }, fail: function (res) {
                console.error('sendSocketMessage:', res);
                options.fail && options.fail.call(null, res);
                options.complete && options.complete.call(null, res);
            }
        });
    };
    /**
     * 登录账号
     * @param {number} uid
     * @param {Object} options
     */
    Client.login = function (uid, options) {
        if (options === void 0) { options = {}; }
        var handler = function () {
            console.log("login server...");
            var msg = new Message(null, 'login', { uid: uid });
            var oldSuccess = options.success;
            options.success = function (res) {
                console.log("login result", res);
                Client._isLogin = true;
                oldSuccess && oldSuccess.call(null, res);
            };
            Client.request(msg, options);
        };
        if (Client.isConnected()) {
            console.log('connected!');
            handler();
        }
        else {
            Client.connect({ success: function () { return setTimeout(handler, 500); }, fail: console.error });
        }
    };
    /**
     * 发送消息
     * @param {Message} msg
     * @param {Object} [options]
     */
    Client.send = function (msg, options) {
        if (options === void 0) { options = {}; }
        wx.sendSocketMessage(__assign({ data: msg }, options));
    };
    /**
     * 是否已连接服务器
     * @return {boolean}
     */
    Client.isConnected = function () {
        return Client._isConnected;
    };
    /**
     * 是否已登录
     * @return {boolean}
     */
    Client.isLogin = function () {
        return Client._isLogin;
    };
    /**
     * 添加一个路由
     * @param {Function} rule
     * @param {Function} callback
     * @return {Route}
     */
    Client.addRoute = function (rule, callback) {
        var route = { rule: rule, callback: callback };
        Client.routes.push(route);
        return route;
    };
    /**
     * 删除一个路由
     * @param {Route} route
     */
    Client.removeRoute = function (route) {
        var routes = Client.routes;
        var index = routes.indexOf(route);
        if (index !== -1)
            routes.splice(index, 1);
    };
    /**
     * 添加一个WebSocket打开监听器
     * @param {Function} callback
     */
    Client.addOnOpenListener = function (callback) {
        listener_js_1.default.addEventListener('websocket.open', callback);
    };
    /**
     * 添加一个WebSocket错误监听器
     * @param {Function} callback
     */
    Client.addOnErrorListener = function (callback) {
        listener_js_1.default.addEventListener('websocket.error', callback);
    };
    /**
     * 添加一个WebSocket关闭监听器
     * @param {Function} callback
     */
    Client.addOnCloseListener = function (callback) {
        listener_js_1.default.addEventListener('websocket.close', callback);
    };
    /**
     * 移除一个WebSocket打开监听器
     * @param {Function} callback
     */
    Client.removeOnOpenListener = function (callback) {
        listener_js_1.default.removeEventListener('websocket.open', callback);
    };
    /**
     * 移除一个WebSocket错误监听器
     * @param {Function} callback
     */
    Client.removeOnErrorListener = function (callback) {
        listener_js_1.default.removeEventListener('websocket.open', callback);
    };
    /**
     * 移除一个WebSocket关闭监听器
     * @param {Function} callback
     */
    Client.removeOnCloseListener = function (callback) {
        listener_js_1.default.removeEventListener('websocket.open', callback);
    };
    /**
     * 路由列表
     * @type {Array}
     */
    Client.routes = [];
    /**
     * 是否已连接服务器
     * @type {boolean}
     * @private
     */
    Client._isConnected = false;
    /**
     * 是否已经登录
     */
    Client._isLogin = false;
    return Client;
}());
exports.Client = Client;
