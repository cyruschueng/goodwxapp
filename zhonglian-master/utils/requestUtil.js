import { _ } from "underscore";
const app = getApp();

//登录失效接口
const LOGIN_INVALID_LISTENER = [];
const REQUEST_ID = {};

/**
 * 获取info值，找到就返回
 * @param {Object} info
 * @param {Array} names
 * @param {*} [defaultValue]
 * @return {*}
 */
function getResponseValue(info, names, defaultValue) {
    for (let i = 0; i < names.length; i++) {
        if (info[names[i]] !== undefined)
            return info[names[i]];
    }
    return defaultValue;
}

module.exports = {
    inBindAccount: false,
    //获取公共请求配置
    makeRequestOptions: function (options) {
        const requestUtil = this;
        options = _.extend({
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                options.isLoginInvalid = false;
                res = options.isUpload ? JSON.parse(res.data) : res.data;
                const code = parseInt(getResponseValue(res, ['status', 'code','RESULT']));
                const msg = getResponseValue(res, ['msg', 'errMsg', 'info'], "fail");
                const data = getResponseValue(res, ['data', 'info', 'RESULT', 'result'], []);

                if (code === 1) {
                    options.callback.call(options.callbackObj, data, res);
                } else if (code === -1) {//登录失效或未登录
                    //触发登录失效事件
                    options.isLoginInvalid = true;
                    options.loginInvalidCount = options.loginInvalidCount + 1 || 1;
                    if (options.loginInvalidCount > 3) {
                        wx.showModal({ content: '请稍后重试~', showCancel: false });
                        return;
                    }

                    this._fireLoginInvalidListener();

                    //返回false，将不进行默认处理
                    if (options.onLoginInvalid && options.onLoginInvalid() === false)
                        return;

                    wx.showToast({ title: '登陆中...', icon: 'loading', duration: 10000 });
                    app.getUserInfo({
                        isForce: true,
                        success: (info) => {
                            if (typeof info == 'string') {
                                wx.setStorageSync('open_id', info);
                                options.isLoginInvalid = false;
                                console.error("in bind:", requestUtil.inBindAccount);
                                if (requestUtil.inBindAccount) {
                                    return;
                                }
                                requestUtil.inBindAccount = true;
                                const navUrl = '/pages/user/info/bind';
                                // if (navUrl == app.getRoute().path) return;
                                wx.navigateTo({ url: navUrl, });
                            } else {
                                wx.showToast({ title: '请稍后...', icon: 'loading', duration: 10000 });

                                //再次请求数据
                                options.data.utoken = info.utoken;
                                wx.request(options);
                            }
                        },
                        fail: (err) => {
                            delete REQUEST_ID[options.requestId];
                            options.completeAfter && options.completeAfter.call(options.callbackObj, err);
                        }
                    });
                } else {
                    if (options.failAfter && options.failAfter.call(options.callbackObj, code, msg, res) === false) return;
                    wx.showModal({ content: msg, showCancel: false, });
                }
            },
            fail: (res) => {
                console.error(res.stack, options.url);
                options.isLoginInvalid = false;
                options.failAfter && options.failAfter.call(options.callbackObj, res);
            },
            complete: (res) => {
                if (options.isLoginInvalid) {
                } else {
                    setTimeout(() => {
                        if (options.isShowLoading) wx.hideToast();
                        delete REQUEST_ID[options.requestId];
                    }, options.delay);
                    options.completeAfter && options.completeAfter.call(options.callbackObj, res);
                }
            }
        }, options);

        //必须配置
        options.isShowLoading = options.isShowLoading !== false;
        options.loadingText = options.loadingText || "请稍后...";
        options.delay = options.delay || 500;
        options.data = options.data || {};
        options.data.utoken = app.getUserToken();
        options.requestId = _.uniqueId("RQ");//生成全局唯一ID "RQ" + new Date().getTime();
        REQUEST_ID[options.requestId] = 1;

        return options;
    },
	/**
	 * get 请求数据
	 */
    get: function (url, data, callback, extend) {
        const options = this.makeRequestOptions(_.extend({ url: url, data: data, callback: callback }, extend || {}));

        if (options.isShowLoading) wx.showToast({ icon: "loading", title: options.loadingText, duration: 10000 });
        wx.request(options);

        return options.requestId;
    },
	/**
	 * post 请求数据
	 */
    post: function (url, data, callback, extend) {
        const options = this.makeRequestOptions(_.extend({
            url: url, data: data, method: "POST", callback: callback,
        }, extend || {}));

        if (options.isShowLoading) wx.showToast({ icon: "loading", title: options.loadingText, duration: 10000 });
        wx.request(options);

        return options.requestId;
    },
	/**
	 * 上传文件
	 */
    upload: function (url, filepath, name, data, callback, extend) {
        const options = this.makeRequestOptions(_.extend({
            url: url, filePath: filepath, name: name, formData: data, callback: callback, isUpload: true,
        }, extend || {}));

        wx.showToast({ title: options.loadingText, icon: 'loading', duration: 10000 });
        wx.uploadFile(options);

        return options.requestId;
    },
	/**
	 * 根据requestId检查是否正在请求
	 */
    isLoading: function (requestId) {
        if (!requestId) return false;
        return REQUEST_ID[requestId] !== undefined;
    },
	/**
	 * 添加一个登录失效回调接口
	 */
    addLoginInvalidListener: function (listener, isInsert) {
        isInsert = isInsert === undefined ? false : isInsert;
        if (isInsert) LOGIN_INVALID_LISTENER.unshift(listener);
        else LOGIN_INVALID_LISTENER.push(listener);
    },
	/**
	 * 移除一个登录失效回调接口
	 */
    removeLoginInvalidListener: function (listener) {
        const index = $.indexOf(LOGIN_INVALID_LISTENER, listener);
        if (index >= 0) LOGIN_INVALID_LISTENER.splice(index, 1);
    },
	/**
	 * 触发登录失效或未登录接口
	 */
    _fireLoginInvalidListener: function () {
        for (const x in LOGIN_INVALID_LISTENER)
            LOGIN_INVALID_LISTENER[x].apply(this);
    }
};