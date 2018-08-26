var appInstance = getApp();
var R_htmlToWxml = require("../../resource/js/htmlToWxml.js");
Page({
    data: {
        scrollHeight: 0,
        newsData: {}
    },
    getNewsDetail: function e() {
        var o = this;
        wx.request({
            url: "https://wedengta.com/wxnews/getNews?action=DiscNewsContent&type=4&id=1478677877_1406730_1_9",
            headers: {
                "Content-Type": "application/json"
            },
            success: function e(n) {
                var t = n.data;
                if (t.ret == 0) {
                    var a = JSON.parse(t.content);
                    a.content = R_htmlToWxml.html2json(a.sContent);
                    a.time = appInstance.util.formatTime(a.iTime * 1e3);
                    o.setData({
                        newsData: a
                    })
                } else {
                    console.log("数据拉取失败")
                }
            },
            fail: function e(o) {
                console.log("数据拉取失败")
            }
        })
    },
    stockClick: function e(o) {
        var n = o.currentTarget.dataset.seccode;
        var t = o.currentTarget.dataset.secname;
        console.log("stockClick:" + n + ";secName:" + t)
    },
    onLoad: function e(o) {
        this.getNewsDetail();
        console.log("onLoad")
    },
    onShow: function e() {
        console.log("onShow")
    },
    onReady: function e() {
        console.log("onReady")
    },
    onHide: function e() {
        console.log("onHide")
    },
    onUnload: function e() {
        console.log("onUnload")
    }
});