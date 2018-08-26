var config = require('../../config.js');
var common = require('../../asset/js/common.js');
var Server = config.service;
var Session = common.Session;
var AppPages = common.AppPages;
var UserIdFun = common.UserIdFun;
var wxShowToast = common.wxShowToast;
// 菜单按钮图片
var menuImgLeftSrc = {
    "on": "../../asset/image/prize-gifton.png",
    "off": "../../asset/image/prize-giftoff.png",
};
var menuImgRightSrc = {
    "on": "../../asset/image/prize-myon.png",
    "off": "../../asset/image/prize-myoff.png",
};
// 领取奖品id
var acceptGiftId = "";
// 获取请求参数
function getInData() {
    var inData = {};
    inData.userId = UserIdFun.get();
    return inData;
}
// 菜单切换
function pageMenuSwicth(self, menu){
    var isRight = (menu == "right") ? true : false;
    var menuRightKey = isRight ? "on" : "off";
    var menuLeftKey = isRight ? "off" : "on";
    self.setData({
        pageKey: menu,
        menuImgLeft: menuImgLeftSrc[menuLeftKey],
        menuImgRight: menuImgRightSrc[menuRightKey]
    });
}
// 页面切换
function pageSwitchShow(self, key){
    var menu = key;
    var menuold = self.data.pageKey;
    if(menuold != menu){
        // 切换菜单
        pageMenuSwicth(self, menu);
        // 切换内容
        pageBodySwicth(self, menu);
    }
}

Page({
    data:{
        loadclass: 'slhide',
        popShowClass: "slhide",
        pageKey: "",
        rightKey: "",
        menuImgLeft: menuImgLeftSrc["off"],
        menuImgRight: menuImgRightSrc["on"],
        countDownDay: "",
        countDownHour: "",
        countDownMinute: "",
        countDownSec: "",
        mygiftNameInVal: "",
        mygiftTelInVal: "",
        theGiftId: "",
        popGiftTitle: "",
        mygiftRedPackList: [],
        mygiftBagList: [],
        packListArr: [],
        ruleListArr: []
    },
    onLoad: function (options) {
        var self = this;
        // 隐藏弹窗
        popFormShow(self, false);
        // 默认切换
        pageSwitchShow(self, "left");
    },
    tapMenuShowLeft: function(e){
        var self = this;
        pageSwitchShow(self, "left");
    },
    tapMenuShowRight: function (e) {
        var self = this;
        pageSwitchShow(self, "right");
    },
    inputMygiftName: function (e) {
        var self = this;
        self.setData({
            mygiftNameInVal: e.detail.value
        });
    },
    inputMygiftTel: function (e) {
        var self = this;
        var inVal = e.detail.value;
        self.setData({
            mygiftTelInVal: e.detail.value
        });
    },
    acceptTheGift: function (e) {
        var self = this;
        var dataset = e.currentTarget.dataset;
        if (dataset["isget"]){
            wx.showToast({
                title: "你已经领取过该奖品",
                icon: 'fail'
            });
        }
        else{
            // 填写个人信息
            fillPersonInfo(self, dataset["giftid"], dataset["gifttitle"]);
        }
    },
    submitTheGift: function (e) {
        var self = this;
        var inNameVal = self.data.mygiftNameInVal;
        var inTelVal = self.data.mygiftTelInVal;
        do{
            if (inNameVal == "") {
                wx.showModal({
                    title: '提示',
                    content: '姓名不能为空',
                    showCancel: false
                })
                break;
            }
            if (inTelVal == "") {
                wx.showModal({
                    title: '提示',
                    content: '手机号不能为空',
                    showCancel: false
                })
                break;
            }
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(inTelVal)) {
                wx.showModal({
                    title: '提示',
                    content: '请填写正确的手机号',
                    showCancel: false
                })
                break;
            }
            // 提交
            submitTheGiftInfo(self, inNameVal, inTelVal);
        }while(0);
    },
    pagePopClose: function(e){
        var self = this;
        popFormShow(self, false);
    }
});
// 页面内容切换
function pageBodySwicth(self, menu) {
    switch(menu){
        case "left":
            pageBodyLeftInit(self);
            break;
        case "right":
            pageBodyRightInit(self);
            break;
    }
}
// 加载礼包 和 规则信息
function loadGiftRuleInfo(self){
    wx.showLoading({
        title: '加载中...',
    })
    wx.request({
        url: Server.giftInfoUrl,
        data: "",
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            var code = res.data['code'];
            if (parseInt(code) == 200){
                self.setData({
                    packListArr: jsonData["giftImgPaths"],
                    ruleListArr: jsonData["gameRules"]
                });
            }
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
        }
    })
}
// 左边内容
function pageBodyLeftInit(self){
    // 加载礼包信息、规则信息
    loadGiftRuleInfo(self);
}
// 右边内容
function pageBodyRightInit(self) {
    // 默认获取倒计时
    rightBoxSwitch(self, "count");
}
// 右边内容切换
function setRightBoxClass(self, key) {
    self.setData({
        rightKey: key
    });
}
// 右边内容切换
function rightBoxSwitch(self, key) {
    //key值切换
    setRightBoxClass(self, key);
    switch (key) {
        case "count":
            getGiftSendTime(self);
            break;
        case "mygift":
            getMyGiftList(self);
            break;
        case "end":
            break;
    }
}
// 礼品派发倒计时
function getGiftSendTime(self){
    wx.showLoading({
        title: '加载中...',
    })
    var inData = { key: "giftDate" };
    wx.request({
        url: Server.getMsgInfoUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            // 截止时间
            var endtime = jsonData["value"];
            // 处理成 2017/01/01 格式兼容iOS
            endtime = String(endtime).replace(/-/g, '/'); 
            handleEndTime(self, endtime);
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
        }
    })
}
// 处理截止时间
function handleEndTime(self, endtime){
    var leftTimeMs = (new Date(endtime)) - new Date();
    if (leftTimeMs > 0){
        // 切换倒计时
        giftCountDown(self, endtime);
    }
    else{
        // 切换个人奖励
        rightBoxSwitch(self, "mygift");
    }
}
// 礼品派发倒计时
function giftCountDown(self, endtime){
    var countTimer = null;
    function addZeroNum(num) {
        return (num < 10) ? ("0" + num) : num;
    }
    // 剩余时间
    function remainTime(self, endDate) {
        var leftTime = (new Date(endDate)) - new Date(); //计算剩余的毫秒数
        if (leftTime < 0){
            leftTime = 0;
            clearInterval(countTimer);
            countTimer = null;
            //切换到个人获得礼包
            setTimeout(function(){
                rightBoxSwitch(self, "mygift");
            }, 2000);
        }
        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        days = addZeroNum(days);
        hours = addZeroNum(hours);
        minutes = addZeroNum(minutes);
        seconds = addZeroNum(seconds);
        // 显示时间
        self.setData({
            countDownDay: days,
            countDownHour: hours,
            countDownMinute: minutes,
            countDownSec: seconds
        });
    }
    clearInterval(countTimer);
    countTimer = setInterval(function () {
        remainTime(self, endtime);
    }, 1000);
}
//判断是否为数组类型
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
// 获取礼品列表
function getMyGiftList(self){
    wx.showLoading({
        title: '加载中...',
    })
    var inData = new getInData();
    wx.request({
        url: Server.myGiftUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            if ((isArray(jsonData) && jsonData.length > 0)){
                // 加载列表
                loadMyGiftList(self, jsonData);
            }
            else{
                rightBoxSwitch(self, "end");
            }
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
            rightBoxSwitch(self, "end");
        }
    })
}
// 加载获得奖励列表
function loadMyGiftList(self, dataArr){
    var redPackArr = [];
    var giftBagArr = [];
    for (var i = 0, len = dataArr.length; i<len; i++){
        var dataObj = dataArr[i];
        var tag = parseInt(dataObj["tag"]);
        // tag=0 -> 通关红包 , 其他为 大礼包奖品
        if(tag == 0){
            redPackArr.push(dataObj);
        }
        else{
            giftBagArr.push(dataObj);
        }
    }
    self.setData({
        mygiftRedPackList: redPackArr,
        mygiftBagList: giftBagArr,
    });
}
// 弹窗显示
function popFormShow(self, flag, giftTitle){
    var theTitle = (typeof (giftTitle) != "undefined") ? giftTitle : "";
    var popClass = flag ? "" : "slhide";
    self.setData({
        popShowClass: popClass,
        popGiftTitle: theTitle
    });
}
// 领取礼品填写个人信息
function fillPersonInfo(self, giftId, giftTitle) {
    acceptGiftId = giftId;
    popFormShow(self, true, giftTitle);
}
// 提交
function submitTheGiftInfo(self, name, phone) {
    wx.showLoading({
        title: '加载中...',
    })
    var inData = new getInData();
    inData.giftId = acceptGiftId;
    inData.name = name;
    inData.phone = phone;
    wx.request({
        url: Server.getMyGiftUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            var code = res.data['code'];
            if(parseInt(code) == 200){
                wxShowToast({
                    title: "提交成功",
                    flag: "success"
                });
                popFormShow(self, false);
                // 刷新奖励列表
                getMyGiftList(self);
            }
            else{
                wxShowToast({
                    title: "提交失败",
                    flag: "fail"
                });
            }
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
            wxShowToast({
                title: "提交失败",
                flag: "fail"
            });
        }
    })
}