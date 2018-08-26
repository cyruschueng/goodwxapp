//app.js
var _DuoguanData = require('./utils/data.js');
var listener = require('./utils/listener.js');

App({
    index_route: null,

    onLaunch: function () {
        var local_utoken = wx.getStorageSync("utoken");
        wx.onAppRouteDone(res => {
            if (!this.index_route) this.index_route = res.path;
            listener.fireEventListener('onAppRouteDone',[res]);
        });
        wx.onAppUnhang(res => {
            listener.fireEventListener('onAppUnhang', [res]);
        });
    },
    setLog: function (token, utoken) {
    },

    onShow: function (options){
        if (options.query._path) {
            const path = decodeURIComponent(options.query._path);
            wx.navigateTo({ url: path, });
        }
    },

    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            var utoken = wx.getStorageSync("utoken");
            wx.login({
                success: function (res) {
                    var code = res.code;
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            wx.request({
                                url: _DuoguanData.duoguan_auth_login_url,
                                method: "POST",
                                data: {
                                    utoken: utoken,
                                    code: code,
                                    token: _DuoguanData.duoguan_user_token,
                                    encryptedData: res.encryptedData,
                                    iv: res.iv
                                },
                                fail: function (res) {
                                    console.dir(res);
                                },
                                success: function (res) {
                                    var utoken = res.data.utoken;
                                    wx.setStorageSync("utoken", utoken);
                                    that.globalData.utoken = utoken;
                                    that.globalData.userInfo.utoken = utoken;
                                    typeof cb == "function" && cb(that.globalData.userInfo)
                                }
                            })
                        }
                    })
                }
            })
        }
    },
    getNewToken: function (cb) {
        var that = this
        var utoken = wx.getStorageSync("utoken");
        wx.login({
            success: function (res) {
                console.log(res)
                var code = res.code;
                wx.getUserInfo({
                    success: function (res) {
                        that.globalData.userInfo = res.userInfo;
                        wx.request({
                            url: _DuoguanData.duoguan_auth_login_url,
                            method: "POST",
                            data: {
                                utoken: utoken,
                                code: code,
                                token: _DuoguanData.duoguan_user_token,
                                encryptedData: res.encryptedData,
                                iv: res.iv
                            },
                            fail: function (res) {
                                console.dir(res);
                            },
                            success: function (res) {
                                var utoken = res.data.utoken;
                                wx.setStorageSync("utoken", utoken);
                                that.globalData.utoken = utoken;
                                that.globalData.userInfo.utoken = utoken;
                                typeof cb == "function" && cb(utoken)
                            }
                        })
                    }, fail: function (res) {
                        console.log(res);
                    }
                })
            }, fail: function (res) {
                console.log(res);
            }
        })
    },
    globalData: {
        userInfo: '',
        utoken: ''
    }
})