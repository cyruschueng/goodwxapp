//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    //事件处理函数
    bindViewTap: function() {

    },
    onLoad: function () {

    },
    getUserInfo: function(e) {

    },
    allow:function () {
        wx.showModal({
            itemColor:'#4A4A4A',
            content: '检测到您的账号还未绑定手机号，请绑定手机号！',
            success: function(res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: '../bindphone/bindphone'
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    refuse:function () {
        wx.navigateBack ()
    }
});
