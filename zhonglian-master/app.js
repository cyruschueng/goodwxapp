import { urls } from './utils/data.js';

var route = null;
console.log('hello world');
App({
    onLaunch: function () {
        wx.onAppRoute(this.onAppRoute);
    },
    onError: function (res) {
        console.error(res);
    },
    onAppRoute: function (res) {
        route = res;
    },
    getRoute: function () {
        return route;
    },
    getUserInfo: function (options) {
        options.isForce = options.isForce || false;//是否强制登录获取个人信息
        if (options.isForce !== true && this.globalData.userInfo) {
            options.success.call(options.callbackObj, this.globalData.userInfo);
        } else {
            wx.login({
                success: (res) => {
                    const code = res.code;
                    wx.getUserInfo({
                        success: (res) => {
                            this.globalData.userInfo = res.userInfo;
                            wx.request({
                                url: urls.member.login,
                                method: "POST",
                                data: {
                                    code: code,
                                    encryptedData: res.encryptedData,
                                    iv: res.iv
                                },
                                success: (res) => {
                                    const info = res.data, code = info.status, msg = info.info,
                                        data = info.data, utoken = data.utoken;
                                    if (code === 1) {
                                        wx.setStorageSync("utoken", utoken);
                                        this.globalData.utoken = utoken;
                                        this.globalData.userInfo = data;
                                        options.success.call(options.callbackObj, this.globalData.userInfo);
                                    } else {
                                        options.fail.call(options.callbackObj, { errMsg: msg, statusCode: code });
                                    }
                                }, fail: options.fail
                            });
                        }, fail: options.fail
                    });
                }, fail: options.fail
            });
        }
    },
    getUserToken: function () {
        //获取当前用户的token
        if (!this.globalData.utoken)
            this.globalData.utoken = wx.getStorageSync("utoken");
        return this.globalData.utoken;
    },
    globalData: {
        userInfo: null,
        utoken: null
    }
})