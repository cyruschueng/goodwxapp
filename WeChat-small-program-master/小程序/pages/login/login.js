//获取应用实例
var app = getApp()
Page({
    data: {
        login: true
    },
    onLoad: function (opt) {
        var that = this;
        if (opt.login) {
            that.setData({
                login: false
            })
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];   //当前页面
            var prevPage = pages[pages.length - 2];  //上一个页面
            prevPage.setData({
               gohome:true
            })
        } else {
            that.setData({
                login: true
            })
        }
    },
    login: function () {
        wx.navigateTo({
            url: '../authorization/authorization'
        })
    },
    register: function () {

    },
    clickOrder:function () {
        wx.navigateTo({
            url: '../order/order'
        })
    },
    clickSet:function () {
        wx.navigateTo({
            url: '../set/set'
        })
    }
});
