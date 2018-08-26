var api = require('../../api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        //user:wx.getStorageSync('user')
    },
    lianxi:function () {
      wx.getNetworkType({
        success: function(res) {
          var networkType = res.networkType;
          wx.navigateToMiniProgram({
            appId: 'wx8abaf00ee8c3202e',
            extraData: {
              id: '18106',
              customData: {
                clientInfo: config.config.version+' '+app.globalData.system_info.version+' '+app.globalData.system_info.windowWidth+' '+app.globalData.system_info.pixelRatio+' '+app.globalData.system_info.model+' '+(app.globalData.system_info.brand?app.globalData.system_info.brand:''),
                clientVersion: app.globalData.system_info.SDKVersion,
                os: app.globalData.system_info.platform,
                osVersion: app.globalData.system_info.system,
                netType: networkType
              }
            }
          })
        }
      })
    },
    dashang:function () {
      wx.navigateToMiniProgram({
        appId: 'wx18a2ac992306a5a4',
        path:'pages/apps/largess/detail?accountId=3300'
      })
    },
    profile:function () {
      if(!util.isEmptyObject(this.data.user)){
          wx.navigateTo({
            url: "/pages/profile/index/index?user_name="+this.data.user.user_name+"&avatar="+this.data.user.user_avatar+'&user_id='+this.data.user.user_id
          })
        }
    },
    onShow: function () {
        console.log(config.config)

        var that = this

      api.login(function (_user) {
        api.getUser(function (user) {
          console.log(user)
          that.setData({
            user: user
          });
        },function () {
        })
      },function () {

      },'必须授权登录之后才能操作呢，是否重新授权登录？')


        that.setData({
            is_verify:wx.getStorageSync('is_verify')
        })

    },
    onReady: function () {
    }
})
