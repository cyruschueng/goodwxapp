var config = require('../../config.js');
var common = require('../../asset/js/common.js');
var Server = config.service;
var Session = common.Session;
var AppPages = common.AppPages;
var UserIdFun = common.UserIdFun;
// 地图路径
var mapImgSrcObj = {
    "lv1": "../../asset/image/map-dalin.png",
    "lv2": "../../asset/image/map-baisha.png",
    "lv3": "../../asset/image/map-hejiang.png",
    "lv4": "../../asset/image/map-sanxing.png",
    "lv5": "../../asset/image/map-taiping.png",
    "lv6": "../../asset/image/map-jitian.png",
    "lv7": "../../asset/image/map-jiancha.png",
    "lv8": "../../asset/image/map-yongxing.png",
    "lv9": "../../asset/image/map-xinxing.png",
    "lv10": "../../asset/image/map-xinglong.png",
    "lv11": "../../asset/image/map-zhengxing.png",
    "lv12": "../../asset/image/map-wanan.png",
    "lv13": "../../asset/image/map-huayang.png"
};
// 恢复首页内容
function RecoverHome(self){
    self.setData({
        startGameAnim: ""
    })
}
// 获取请求参数
function getInData() {
    var inData = {};
    inData.userId = UserIdFun.get();
    return inData;
}
// 设置信息
function setUserInfo(self, jsonData) {
    var mapLevel = "lv" + jsonData["level"];
    var barWidthPer = common.totalLevelPer(jsonData["level"], jsonData["star"]);
    var starBgHideClass = (parseInt(jsonData["level"]) >= 13) ? "starhide" : "";
    self.setData({
        loadclass: "",
        starBgHide: starBgHideClass,
        userLevel: jsonData["level"],
        userStar: jsonData["star"],
        userScore: jsonData["score"],
        levelBarWidth: barWidthPer,
        mapImgSrc: mapImgSrcObj[mapLevel]
    })
}
// 请求用户数据
function reqUserInfoData(self, inData){
    // 转换服务器数据
    var fatServerData = function (jsonData) {
        var clientData = {};
        clientData.level = jsonData["level"];
        clientData.star = jsonData["star"];
        clientData.score = jsonData["score"];
        clientData.allStar = jsonData["allStar"];
        return clientData;
    }
    // wx.showLoading({
    //     title: '加载中...',
    // })
    wx.request({
        url: Server.getUserInfoUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            var userData = fatServerData(jsonData);
            // 设置用户数据
            setUserInfo(self, userData);
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
        }
    })
}
// 请求数据
function getUserInfo(self) {
    var inData = new getInData();
    self.setData({
        loadclass: "slhide"
    })
    // 请求数据
    reqUserInfoData(self, inData);
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
Page({
    data: {
        loadclass: "slhide",
        userface: "",
        usernick: "",
        levelBarWidth: "0%",
        starBgHide: "",
        userLevel: "",
        userStar: "",
        userScore: "",
        mapImgSrc: mapImgSrcObj["lv1"],
        startGameAnim: ""
    },
    onLoad: function (options) {
        var self = this;
        //恢复页面
        RecoverHome(self);
        // 设置用户头像
        setUserBoxInfo(self);
        // 从服务器获取信息
        getUserInfo(self);
    },
    onShow: function (e) {
        var self = this;
        RecoverHome(self);
    },
    onPullDownRefresh: function () {
        var self = this;
        // 从服务器获取信息
        getUserInfo(self);
        wx.stopPullDownRefresh();
    },
    onShareAppMessage: common.ShareApp,
    linkPageMe: function (e) {
        wx.navigateTo({
            url: AppPages.pageMe
        })
    },
    linkPageGame: function (e) {
        var self = this;
        self.setData({
            startGameAnim: "animated"
        })
        setTimeout(function(){
            wx.navigateTo({
                url: AppPages.pageGame
            })
        }, 1000);
    },
    linkPagePrize: function (e) {
        wx.navigateTo({
            url: AppPages.pagePrize
        })
    }
});