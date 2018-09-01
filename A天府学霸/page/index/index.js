var config = require('../../config.js');
var common = require('../../asset/js/common.js');
var Server = config.service;
var Session = common.Session;
var AppPages = common.AppPages;
var UserIdFun = common.UserIdFun;
// 设置
var linkPageTimer;
var signLevelSrcBase = "../../asset/image/";
var signLevelMapObj = {
    "lv1": signLevelSrcBase + "sign-lv1.png",
    "lv2": signLevelSrcBase + "sign-lv2.png",
    "lv3": signLevelSrcBase + "sign-lv3.png",
    "lv4": signLevelSrcBase + "sign-lv4.png",
    "lv5": signLevelSrcBase + "sign-lv5.png",
    "lv6": signLevelSrcBase + "sign-lv6.png",
    "lv7": signLevelSrcBase + "sign-lv7.png",
    "lv8": signLevelSrcBase + "sign-lv8.png",
    "lv9": signLevelSrcBase + "sign-lv9.png",
    "lv10": signLevelSrcBase + "sign-lv10.png",
    "lv11": signLevelSrcBase + "sign-lv11.png",
    "lv12": signLevelSrcBase + "sign-lv12.png",
    "lv13": signLevelSrcBase + "sign-lv13.png"
};
// 获取请求参数
function getInData() {
    var inData = {};
    inData.userId = UserIdFun.get();
    return inData;
}
// 设置信息
function setSignInfo(self, data) {
    var mapLevel = "lv13";
    self.setData({
        loadclass: "",
        signLevelMap: signLevelMapObj[mapLevel]
    })
}
// 请求数据
function getSignInfo(self) {
    // 显示签到按钮
    self.setData({
        loadclass: ""
    })
    return ;
    wx.showLoading({
        title: '加载中...',
    })
    var inData = new getInData();
    wx.request({
        url: Server.getUserInfoUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            var signData = {};
            signData.level = jsonData["level"];
            setSignInfo(self, signData);
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
        }
    })
}
// 设置用户头像信息
function setUserBoxInfo(self) {
    // 设置用户头像
    wx.getUserInfo({
        success: function (res) {
            var userInfo = res.userInfo;
            var avatarUrl = userInfo.avatarUrl;
            var nickName = userInfo.nickName;
            self.setData({
                userface: avatarUrl,
                usernick: nickName
            })
        },
        fail: function () { }
    });
}
// 分享添加好友关系
function shareAddFriend(friendId) {
    var inData = {};
    inData.userId = UserIdFun.get();
    inData.friendId = friendId;
    wx.request({
        url: Server.addFriendUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
        }
    })
}
// 应用初始化 \ 获取仅限
function AppInit(self, callback) {
    // 提示用户获取仅限
    wx.getUserInfo({
        success: function (res) {
            var userInfo = res.userInfo;
            var avatarUrl = userInfo.avatarUrl;
            var nickName = userInfo.nickName;
            self.setData({
                userface: avatarUrl,
                usernick: nickName
            })
            // 回调函数
            if (typeof (callback) != 'undefined') {
                callback();
            }
        },
        fail: function (err) {
            console.log(err);
            wx.hideLoading();
            wx.showModal({
                title: '提示',
                content: '天府学霸需要获取用户头像',
                showCancel: false,
                success: function (res) {
                    wx.openSetting({
                        success: function (res) {
                            AppInit(self, callback);
                        },
                        fail: function (res) {
                            AppInit(self, callback);
                        }
                    })
                }
            })
        }
    });
}
// APP登录
function AppLogin(self, callback, addfriend) {
    // 是否为注册用户
    function userIsReg(userid) {
        do {
            // userid是否有效
            if (!UserIdFun.isvalid()) {
                userLogin();
                break;
            }
            // 用户是否已经注册
            // if (getApp().globalData.userreg) {
            //     if (typeof (callback) != 'undefined') {
            //         callback();
            //     }
            //     break;
            // }
            // 服务器校验是否为注册用户
            // wx.showLoading({
            //     title: '加载中...',
            // })
            var inData = {};
            inData.userId = userid;
            inData.userface = self.data.userface;
            inData.usernick = self.data.usernick;
            wx.request({
                url: Server.isNeedSignUrl,
                data: inData,
                success: function (res) {
                    wx.hideLoading();
                    // 分享添加好友关系
                    if (typeof (addfriend) != "undefined") {
                        addfriend();
                    }
                    // 判断注册 \ 签到
                    var jsonData = res.data;
                    var code = jsonData['code'];
                    var dataObj = jsonData['data'];
                    var isNeedSign = dataObj["needSign"];
                    console.log("isNeedSign = " + isNeedSign);
                    if (isNeedSign) {
                        // 用户未注册 \ 未签到
                        // 获取签到信息
                        getSignInfo(self);
                    }
                    else {
                        // 已存在该用户 \ 不需要签到
                        getApp().globalData.userreg = true;
                        if (typeof (callback) != 'undefined') {
                            callback(isNeedSign);
                        }
                    }
                },
                fail: function (err) {
                    wx.hideLoading();
                    console.log(err)
                }
            })
        } while (0);
    }
    // 用户登录获取userId,保存在session
    function userLogin() {
        wx.login({
            success: function (res) {
                wx.hideLoading();
                if (res.code) {
                    wx.request({
                        url: Server.wxloginUrl,
                        data: { code: res.code },
                        success: function (res) {
                            var jsonData = res.data['data'];
                            var userId = jsonData["openId"];
                            // 设置userId
                            UserIdFun.set(userId);
                            // 检查用户
                            userIsReg(userId);
                        },
                        fail: function (err) {
                            console.log(err);
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            },
            fail: function (err) {
                wx.hideLoading();
                console.log(err);
            }
        });
    }
    // 登录态检查
    wx.checkSession({
        success: function () {
            console.log("Login state： not due");
            var userId = UserIdFun.get();
            userIsReg(userId);
        },
        fail: function () {
            console.log("Login state： due");
            // 登录
            userLogin();
        }
    })
}
// 跳转首页
function linkPageHome(ms) {
    var delay = (typeof (ms) != "undefined") ? ms : 1000;
    clearTimeout(linkPageTimer);
    linkPageTimer = setTimeout(function () {
        wx.hideToast();
        wx.redirectTo({
            url: AppPages.pageHome
        });
    }, delay);
}

Page({
    data:{
        loadclass: 'slhide',
        userface: "",
        usernick: "",
        signLevelMap: signLevelMapObj["lv13"],
    },
    onLoad: function (options) {
        var self = this;
        // APP应用初始化
        AppInit(self, function () {
            // APP应用登录
            AppLogin(self, function () {
                // 跳转首页
                linkPageHome(2000);
            }, function () {
                // 获取分享friendId
                if (typeof (options) != "undefined") {
                    if (typeof (options["friendId"]) != "undefined") {
                        shareAddFriend(options["friendId"]);
                    }
                }
            });
        });
    },
    submitSignIn: function () {
        var self = this;
        // 点击签到
        actionSignInfo(self);
    }
});
// 点击签到
function actionSignInfo(self) {
    var inData = new getInData();
    inData.userface = self.data.userface;
    inData.usernick = self.data.usernick;
    wx.request({
        url: Server.signActionUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            var code = res.data['code'];
            if (parseInt(code) == 200){
                var tipText = "签到成功";
                if ((typeof (jsonData["signScore"]) != "undefined") && (jsonData["signScore"] > 0)){
                    tipText = "签到成功，获得" + jsonData["signScore"] + "积分";
                }
                wx.showToast({
                    title: tipText,
                    icon: 'none',
                    duration: 1500
                });
            }
            // 跳转首页
            linkPageHome();
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
            // 跳转首页
            linkPageHome();
        }
    })
}