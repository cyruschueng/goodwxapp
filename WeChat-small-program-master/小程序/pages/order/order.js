//获取应用实例
var app = getApp()
Page({
    data: {
        navbar: ['全部', '待支付'],
        currentTab: 0,
        product:[],
        products:[],
    },
    onLoad:function () {

    },
    navbarTap: function(e){
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
        console.log( e.currentTarget.dataset.idx,'点击')
    },
    goDetails:function () {
        wx.navigateTo({
            url: '../orderdetail/orderdetail'
        })
    },
    orderCancel:function () {
        
    },
    goPay:function () {
        
    }
})