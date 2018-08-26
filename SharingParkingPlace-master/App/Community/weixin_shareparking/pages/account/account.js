var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
Page({
    data: {
        userInfo: {},
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

    },
    
    about: function (e) {
         common.showModal('开发于2017-12月底，前端基于weui样式，后端开发基于Laravel+Bmob API测试。开发者博客：https://blog.luckyye.com');
    }

})