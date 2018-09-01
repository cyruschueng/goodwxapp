var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var tools = require('../../utils/tools.js')
var clockID = 0
Page({
  data: {
    date: '', //当前日期
    time: '', //当前时间
    title: '',
    detail: '',
    openType: '',
    enterType: ''
  },
  /**
   * 删除闹钟
   */
  deleteClock: function (e) {
  
  },
  /**
   * 视图加载
   */
  onLoad: function (opt) {
    console.log('入场参数', opt)
    clockID = opt.clockID
    this.setData({
      enterType: opt.enterType
    })
    var that = this
    tools.login(() => {
      tools.request({
        url: config.service.getClock,
        data: {
          id: opt.clockID,
          de: 0
        },
        success: function (res) {
          console.log('data', res.data)
          that.setData({
            title: res.data.title,
            detail: res.data.detail,
            date: util.getShowDate(res.data.time),
            time: util.getShowTime(res.data.time)
          })
        },
        fail: function (err) {
          if (err.indexOf('登录过期') != -1) {
            wx.redirectTo({
              url: './detail?clockID=' + clockID
            })
          } else {
            util.showModel('提示', err)
          }
        }
      })
    })
  }
})

