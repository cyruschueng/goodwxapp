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
    status: ''
  },
  formSubmit: function (e) {
    console.log('form', e)
    if (e.detail.target.id == 'ignore') {
      wx.switchTab({
        url: '../qClock/qClock'
      })
      return
    }
    var that = this
    tools.request({
      url: config.service.acceptClock,
      method: "POST",
      data: {
        form_id: e.detail.formId,
        id: clockID
      },
      success: function (res) {
        util.showSuccess('确认成功', () => {
          wx.switchTab({
            url: '../qClock/qClock'
          })
        })
      },
      fail: function (err) {
        util.showError('请求失败', err)
      }
    })
  },
  onLoad: function (opt) {
    console.log('启动参数', opt)
    clockID = opt.clockID
    var that = this
    tools.login(function () {
      tools.request({
        url: config.service.getClock,
        data: {
          id: clockID,
          de: 1
        },
        success: function (res) {
          console.log('data', res.data)
          if(!res.data.title) {
            util.showError('登录失败', () => {
              wx.redirectTo({
                url: './accept?clockID=' + clockID
              })
            })
            return
          }
          that.setData({
            title: res.data.title,
            detail: res.data.detail,
            status: res.data.status,
            date: util.getShowDate(res.data.time),
            time: util.getShowTime(res.data.time)
          })
        },
        fail: function (err) {
          if(err.indexOf('登录过期') != -1) {
            wx.redirectTo({
              url: './accept?clockID=' + clockID
            })
          } else {
            util.showModel('提示', err)
          }
        }
      })
    })
  }
})

