//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var tools = require('./utils/tools.js')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        tools.login()
    },
    onShow: function () {
      wx.getShareInfo({
        shareTicket: 'ceshi',
      })
    }
})