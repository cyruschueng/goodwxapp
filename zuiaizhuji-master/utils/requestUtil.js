const $ = require('underscore');
const { Client } = require('client');
const _data = require('data');
const app = getApp();

//登录失效接口
const LOGIN_INVALID_LISTENER = [];
const REQUEST_ID = {};
const LOGIN_CALLBACK_LIST = [];
var isLoginLoading = false;
//formIds
const FORM_ID_LIST = [];

module.exports = {

	/**
	 * 获取公共请求配置
	 * @param {Object} options
	 * @param {Object} page
	 * @return {Object}
	 */
    getRequestOptions: function (options, page) {
        const that = this;
        options = $.extend({
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'client': 'XCX',
            },
            success: function (res) {
                try {
                    options.isLoginInvalid = false;
                    res = res.data;
                    const code = res.code === undefined ? res.status : res.code;
                    if (code == 1) {
                        var data = null;
                        if (res.info !== undefined) data = res.info;
                        if (res.data !== undefined) data = res.data;
                        options.callback.call(page, data, res, options);
                    } else if (code == 2) {//登录失效或未登录
                        options.loginInvalidCount = options.loginInvalidCount + 1 || 1;
                        if (options.loginInvalidCount > 1) {
                            wx.showModal({ content: '请稍后重试~', showCancel: false });
                            return;
                        }

                        options.isLoginInvalid = true;
                        that._fireLoginInvalidListener();
                        if (!options.onLoginInvalid || options.onLoginInvalid() !== false) {//返回true，将不进行默认处理
                            that.login({
                                success: function (utoken) {
                                    options.data.utoken = utoken;
                                    wx.request(options);//再次请求数据
                                }, complete: options.complete
                            });
                        }
                    } else {
                        var msg = undefined;
                        if (res.msg !== undefined) msg = res.msg;
                        if (res.errMsg !== undefined) msg = res.errMsg;
                        if (res.code !== undefined && res.info !== undefined) msg = res.info;
                        if (msg !== undefined) {
                            if (options.error && options.error.call(options.callbackObj, code, msg, options) === false)
                                return;
                            wx.showModal({ content: msg, showCancel: false, });
                        }
                    }
                } catch (err) {
                    console.error(err.stack);
                }
            },
            fail: function (res) {
                console.error(res);
                options.isLoginInvalid = false;
                options.failAfter && options.failAfter.call(page, res, options);
                console.error(res, options.url);
            },
            complete: function (res) {
                if (options.isLoginInvalid && isLoginLoading) return;
                setTimeout(function () {
                    if (options.isShowLoading) wx.hideToast();
                    delete REQUEST_ID[options.requestId];
                }, options.delay);
                options.completeAfter && options.completeAfter.call(page, res, options);
            },
        }, options);

        //必须配置
        options.isShowLoading = options.isShowLoading !== false;
        options.loadingText = options.loadingText || "请稍后...";
        options.delay = options.delay || 500;
        options.data = options.data || {};
        options.data.utoken = wx.getStorageSync("utoken");
        options.data.token = _data.duoguan_user_token;

        //GET 请求放一条formId
        if (FORM_ID_LIST.length) {
            if (options.method) {
                options.data._form_id = [FORM_ID_LIST.shift()];
            } else { //POST 请求放20条 formId
                options.data._form_id = FORM_ID_LIST.splice(0, 20);
            }
            options.data._form_id = JSON.stringify(options.data._form_id);
        }

        options.requestId = options.requestId || $.uniqueId("RQ");//生成全局唯一ID "RQ" + new Date().getTime();
        REQUEST_ID[options.requestId] = 1;
        return options;
    },

	/**
	 * get 请求数据
	 * @param {string} url
	 * @param {Object} data
	 * @param {Function} callback
	 * @param {Object} [page]
	 * @param {Object} [options]
	 * @return {string}
	 */
    get: function (url, data, callback, page, options) {
        options = this.getRequestOptions($.extend({ url: url, data: data, callback: callback }, options || {}), page);
        if (options.isShowLoading)
            wx.showToast({ icon: "loading", title: options.loadingText, duration: 10000 });
        wx.request(options);
        return options.requestId;
    },

	/**
	 * post 请求数据
	 * @param {string} url
	 * @param {Object} data
	 * @param {Function} callback
	 * @param {Object} page
	 * @param {Object} [options]
	 * @return {string}
	 */
    post: function (url, data, callback, page, options) {
        options = this.getRequestOptions($.extend({
            url: url,
            data: data,
            callback: callback,
            method: "POST"
        }, options || {}), page);
        if (options.isShowLoading)
            wx.showToast({ icon: "loading", title: options.loadingText, duration: 10000 });
        wx.request(options);
        return options.requestId;
    },

	/**
	 * 上传文件
	 * @param {string} url
	 * @param {string} filepath
	 * @param {string} name
	 * @param {Object} data
	 * @param {Function} callback
	 * @param {Object} [page]
	 * @param {Object} [options]
	 * @return {string}
	 */
    upload: function (url, filepath, name, data, callback, page, options) {
        wx.showToast({ title: '上传中...', icon: 'loading', duration: 10000 });
        options = $.extend({
            url: url, filePath: filepath, name: name, formData: data,
            success: function (res) {
                res = JSON.parse(res.data);
                options.isLoginInvalid = false;
                if (res.code == 1) {
                    callback.apply(page, [res.data, res]);
                } else if (res.code == 2) {
                    options.isLoginInvalid = true;
                    var newToken = null;
                    wx.showToast({
                        title: '登陆中',
                        icon: 'loading',
                        duration: 10000,
                        success: function () {
                            app.getNewToken(function (token) {
                                wx.hideToast();
                                wx.uploadFile(options);
                            })
                        }
                    });
                    setTimeout(function () {
                        if (newToken == null) {
                            delete REQUEST_ID[options.requestId];
                            options.completeAfter && options.completeAfter.apply(page,
                                [{ statusCode: 0, errMsg: "请求超时", data: null }]);
                        }
                    }, 10000);
                } else {
                    wx.showModal({ content: res.info, showCancel: false });
                }
            },
            fail: function (res) {
                console.error(res);
                wx.showModal({ content: res.errMsg, showCancel: false });
            },
            complete: function (res) {
                if (options.isLoginInvalid) {
                } else {
                    wx.hideToast();
                    setTimeout(function () {
                        delete REQUEST_ID[options.requestId];
                    }, options.delay);
                    options.completeAfter && options.completeAfter.apply(page, [res]);
                }
            }
        }, options || {});
        options.delay = options.delay || 1000;
        options.formData = options.formData || {};
        options.formData.utoken = wx.getStorageSync("utoken");
        options.formData.token = _data.duoguan_user_token;
        options.requestId = $.uniqueId("RQ");//生成全局唯一ID "RQ" + new Date().getTime();
        REQUEST_ID[options.requestId] = 1;
        wx.uploadFile(options);
        return options.requestId;
    },

	/**
	 * 根据requestId检查是否正在请求
	 * @param {String} requestId
	 * @return {boolean}
	 */
    isLoading: function (requestId) {
        if (!requestId) return false;
        return REQUEST_ID[requestId] !== undefined;
    },

	/**
	 * 添加一个登录失效回调接口
	 * @param {Function} listener
	 * @param {Boolean} isInsert
	 */
    addLoginInvalidListener: function (listener, isInsert) {
        isInsert = isInsert === undefined ? false : isInsert;
        if (isInsert)
            LOGIN_INVALID_LISTENER.unshift(listener);
        else
            LOGIN_INVALID_LISTENER.push(listener);
    },

	/**
	 * 移除一个登录失效回调接口
	 * @param {Function} listener
	 */
    removeLoginInvalidListener: function (listener) {
        var index = $.indexOf(LOGIN_INVALID_LISTENER, listener);
        if (index >= 0) LOGIN_INVALID_LISTENER.splice(index, 1);
    },

	/**
	 * 触发登录失效或未登录接口
	 */
    _fireLoginInvalidListener: function () {
        for (var x in LOGIN_INVALID_LISTENER)
            LOGIN_INVALID_LISTENER[x].apply(this);
    },

	/**
	 * 放进一个formId，在未来的某个时刻发送到后台
	 * @param {String} formId
	 */
    pushFormId: function (formId) {
        if (FORM_ID_LIST.length >= 100) FORM_ID_LIST.shift();
        return FORM_ID_LIST.push(formId);
    },

	/**
	 * 登录
	 * @param {Object} obj
	 */
    login: function (obj) {
        LOGIN_CALLBACK_LIST.push(obj);
        if (isLoginLoading) return;

        const fireListener = function (type, res) {
            for (var i = 0; i < LOGIN_CALLBACK_LIST.length; i++) {
                var callback = LOGIN_CALLBACK_LIST[i];
                if (type === "complete") {
                    callback.complete.apply(null, res);
                } else {
                    callback.success.apply(null, res);
                }
            }
        }, fireCompleteListener = function (res) {
            isLoginLoading = false;
            wx.hideToast();
            fireListener("complete", [res]);
            LOGIN_CALLBACK_LIST.splice(0, LOGIN_CALLBACK_LIST.length);
        }, fireSuccessListener = function (res) {
            res = res.data;
            if (res.code != 1) {
                fireCompleteListener(res);
                wx.showModal({ content: res.info, showCancel: false });
            } else {
                wx.setStorageSync('user_info', res.data);
                wx.setStorageSync('utoken', res.utoken);
                isLoginLoading = false;
                fireListener("success", [res.utoken, res.data]);
                LOGIN_CALLBACK_LIST.splice(0, LOGIN_CALLBACK_LIST.length);

                //连接及时通讯服务器
                if (Client.isInited() && !Client.isLogin()) {
                    Client.login(res.data.uid);
                }
            }
        };

        isLoginLoading = true;
        wx.showToast({ title: '登陆中', icon: 'loading', duration: 10000, });
        wx.login({
            success: function (res) {
                const code = res.code, utoken = wx.getStorageSync("utoken");
                wx.request({
                    url: _data.duoguan_auth_login_url,
                    data: {
                        token: _data.duoguan_user_token,
                        utoken: utoken,
                        code: code,
                    },
                    method: "POST",
                    success: fireSuccessListener,
                    fail: function (res) {
                        fireCompleteListener(res);
                        wx.showModal({ content: '请稍后重试~', showCancel: false });
                    },
                });
            },
            fail: function (res) {
                fireCompleteListener(res);
                wx.showModal({ content: '请稍后重试~', showCancel: false });
            },
        });
    }
};