var config = require('../../config.js');
var common = require('../../asset/js/common.js');
var Server = config.service;
var Session = common.Session;
var AppPages = common.AppPages;
var UserIdFun = common.UserIdFun;
//设置
//物理像素比
var sysInfo = wx.getSystemInfoSync();
var pixelRatio = sysInfo.pixelRatio;
// 获取请求参数
function getInData() {
    var inData = {};
    inData.userId = UserIdFun.get();
    return inData;
}
// 设置信息
function setUserInfo(self, jsonData) {
    var barWidthPer = common.totalLevelPer(jsonData["level"], jsonData["star"]);
    self.setData({
        loadclass: "",
        levelBarWidth: barWidthPer,
        userLevel: "Lv" + jsonData["level"],
        userStar: jsonData["star"],
        userScore: jsonData["score"],
        friendRank: jsonData["friendRank"]
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
        levelMin: "Lv1",
        levelMax: "Lv13",
        levelBarWidth: "0%",
        userLevel: "",
        userStar: "",
        userScore: "",
        friendRank: "",
    },
    onLoad: function (options) {
        var self = this;
        drawShareImg(self);
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
        // 画分享图
        drawShareImg(self);
    },
    onShareAppMessage: common.ShareApp,
    linkPageRank: function(e){
        wx.navigateTo({
            url: AppPages.pageRank
        })
    },
    createShareImg: function (e) {
        var self = this;
        previewShareImg();
    }
});

//画分享图
function drawShareImg(self) {
    var canvasInfo = {
        width: 420,
        height: 630
    };
    var ctx = wx.createCanvasContext('myCanvas');
    // 底色白色
    ctx.beginPath();
    ctx.rect(0, 0, canvasInfo.width, canvasInfo.height);
    ctx.setFillStyle('#FFFFFF');
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    // 背景
    var shareBgImg = {
        src: "../../asset/image/sharebg.jpg",
        width: 420,
        height: 630
    };
    ctx.drawImage(shareBgImg.src, 0, 0, shareBgImg.width, shareBgImg.height);
    ctx.closePath();

    //画圆形图片
    function circleImg(ctx, img, x, y, r) {
        ctx.save();
        var d = 2 * r;
        var cx = x + r;
        var cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, x, y, d, d);
        ctx.restore();
    }
    
    ctx.beginPath();
    // 二维码
    var qrImg = "../../asset/image/appqr.png";
    ctx.drawImage(qrImg, 96, 217, 231, 231);
    // 长按识别
    // 指纹
    var qrImg = "../../asset/image/sharefinger.png";
    ctx.drawImage(qrImg, 96, 512, 69, 68);
    // 分享文本
    ctx.setTextAlign('left');
    ctx.setFillStyle('#FFFFFF');
    ctx.setFontSize(18);
    ctx.fillText("长按识别小程序码", 181, 542);
    ctx.fillText("开始挑战", 181, 566);
    ctx.closePath();
    ctx.draw();
}
// 预览分享图
function previewShareImg() {
    var canvasInfo = {
        width: 420,
        height: 630
    };
    wx.canvasToTempFilePath({
        destWidth: canvasInfo.width * pixelRatio,
        destHeight: canvasInfo.height * pixelRatio,
        canvasId: 'myCanvas',
        success: function (res) {
            var imgPath = res.tempFilePath;
            wx.hideLoading();
            // 预览图片
            wx.previewImage({
                current: imgPath,
                urls: [imgPath]
            })
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
        }
    })
}