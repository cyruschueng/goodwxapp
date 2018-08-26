var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
Page({
    data: {
        userInfo: {},
        xh:'',
    },
    //事件处理函数
    bindViewLogin: function () {
      wx.navigateTo({
        url: '../login/login'
      })
    },
    onLoad: function () {
        var that = this
        this.setData({
          xh: wx.getStorageSync('xh')
        })
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

    },
    goFeedback:function(e){
      wx.navigateTo({
        url: 'feedback/feedback'
      })
    },
    goAboutUs: function (e) {
      // common.showModal('作者：软件1431-沈新宇\r\n我们是机电工程系移动互联应用开发兴趣小组，我们崇尚技术的力量，同时也欣赏设计的美！');
      wx.navigateTo({
        url: 'about/about'
      })
    },
    removeBind:function(e){
      wx.navigateTo({
        url: '../login/unBind/unBind'
      })
    },
    goShare: function (res) {
      wx.navigateTo({
        url: 'share/share'
      })
      
      }
})