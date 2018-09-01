var config = require('../../config.js');
var common = require('../../asset/js/common.js');
var Server = config.service;
var Session = common.Session;
var AppPages = common.AppPages;
var UserIdFun = common.UserIdFun;
// 设置
var ScoreSuccessVal = 600;
var gradeTheScore = "";
var handleBtnBgObj = {
    "choiceover": "../../asset/image/btn-over.png",
    "choicejixu": "../../asset/image/btn-jixu.png",
    "scorexuanyao": "../../asset/image/btn-xuanyao.png",
    "scoreshare": "../../asset/image/btn-share.png"
}
// 获取请求参数
function getInData() {
    var inData = {};
    inData.userId = UserIdFun.get();
    return inData;
}
// 设置信息
function setUserInfo(self, jsonData) {
    var level = parseInt(jsonData["level"]);
    var star = parseInt(jsonData["star"]);
    var levelNow = level;
    var levelNext = level + 1;
    var barWidthPer = star * 100 / 3 + "%";
    if(level >= 13){
        levelNow = 12;
        levelNext = 13;
        barWidthPer = '100%';
    }
    var haschoice = (parseInt(jsonData["chance"]) > 0) ? true : false;
    var choiceImgKey = haschoice ? "choicejixu" : "choiceover";
    var choiceClass = haschoice ? "" : "invalid";
    var shareImgKey = (parseInt(gradeTheScore) >= ScoreSuccessVal) ? "scorexuanyao" : "scoreshare";
    self.setData({
        loadclass: "",
        levelBarWidth: barWidthPer,
        levelNowVal: "Lv" + levelNow,
        levelNextVal: "Lv" + levelNext,
        theScore: gradeTheScore,
        userScore: jsonData["score"],
        friendRank: jsonData["friendRank"],
        gameChoiceImgSrc: handleBtnBgObj[choiceImgKey],
        shareScoreImgSrc: handleBtnBgObj[shareImgKey],
        haschoice: choiceClass
    })
}
// 请求用户数据
function reqUserInfoData(self, inData) {
    // 转换服务器数据
    var fatServerData = function (jsonData) {
        var clientData = {};
        clientData.level = jsonData["level"];
        clientData.star = jsonData["star"];
        clientData.score = jsonData["score"];
        clientData.allStar = jsonData["allStar"];
        clientData.chance = jsonData["chance"];
        clientData.friendRank = jsonData["friendRank"];
        return clientData;
    }
    wx.showLoading({
        title: '加载中...',
    })
    wx.request({
        url: Server.userRankInfoUrl,
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
Page({
    data:{
        loadclass: 'slhide',
        userface: "",
        usernick: "",
        levelBarWidth: "0%",
        levelNowVal: "Lv1",
        levelNextVal: "Lv2",
        theScore: "",
        userScore: "",
        friendRank: "",
        haschoice: "invalid",
        gameChoiceImgSrc: handleBtnBgObj["choicejixu"],
        shareScoreImgSrc: handleBtnBgObj["scoreshare"],
        shareScoreTipText: "（可获得2次挑战机会）"
    },
    onLoad: function (options) {
        var self = this;
        if (typeof (options["score"]) != "undefined"){
            gradeTheScore = options["score"];
        }
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
                // 从服务器获取信息
                getUserInfo(self);
            },
            fail: function () { }
        });
    },
    onShareAppMessage: function(res){
        return common.ShareApp(res, function(){
            wx.redirectTo({
                url: AppPages.pageResult + "?score=" + gradeTheScore
            })
        });
    },
    linkPageGame: function (e) {
        var self = this;
        var haschoice = (self.data.haschoice == "invalid") ? false : true;
        if (haschoice){
            wx.redirectTo({
                url: AppPages.pageGame
            })
        }
    },
    linkPageRank: function (e) {
        wx.navigateTo({
            url: AppPages.pageRank
        })
    }
});