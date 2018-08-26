// pages/count/countDown.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var tools = require('../../utils/tools.js')
var Session = require('../../utils/session.js')

const hours = []
const minutes = []
const seconds = []

for (let i = 0; i < 24; i++) {
  hours.push(i)
}

for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}

for (let i = 0; i <= 59; i++) {
  seconds.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    hour: 0,
    minute: 15,
    second: 0,
    value: [0, 15, 0],
    date: ''
  },

  bindChange: function (e) {
    const val = e.detail.value
    let hour = this.data.hours[val[0]]
    let minute = this.data.minutes[val[1]]
    let second = this.data.seconds[val[2]]
    this.setData({
      hour: hour,
      minute: minute,
      second: second,
      date: configDate(hour, minute, second)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: configDate(0, 15, 0)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    var that = this
    let clockType = e.detail.target.id == 'remind_me' ? 0 : 1
    tools.login(() => {
      tools.request({
        url: config.service.addClock,
        method: "POST",
        data: {
          date: that.data.date,
          title: e.detail.value.title ? e.detail.value.title : '时间到啦(*´∀`)~♥',
          detail: e.detail.value.detail ? e.detail.value.detail : '没有备注',
          clock_type: clockType,
          form_id: e.detail.formId
        },
        success: function (res) {
          wx.navigateTo({
            url: '../share/share?type=' + clockType + '&clockID=' + res.data.clockID + '&title=' + e.detail.value.title
          })
        },
        fail: function (err) {
          util.showError(err)
        }
      })
    })
  },

  onShareAppMessage: function (res) {

    return {
      title: '企鹅闹钟,可以给好友设置闹钟哦',
      path: '/pages/count/countDown',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

function configDate (hour, minute, second) {
  let date = new Date()
  date.setSeconds(date.getSeconds() + hour * 60 * 60 + minute * 60 + second)
  return date
}