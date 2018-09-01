var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var tools = require('../../utils/tools.js')
var clockID = 0
var title = ''
Page({
  data: {
    date: '', //当前日期
    time: '', //当前时间
    title: '',
    detail: '',
    tip: '',
    openType: ''
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    var that = this
    tools.request({
      url: config.service.confirmClock,
      method: "POST",
      showLoading: that.data.openType == 'share' ? false : true,
      data: {
        form_id: e.detail.formId,
        id: clockID
      },
      success: function (res) {       
        if(that.data.openType == 'share') {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 500)
        } else {
          util.showSuccess('确认成功', function () {
            wx.navigateBack({
              delta: 1
            })
          })
        }
      },
      fail: function (err) {
        util.showError(err)
      }
    })
  },
  //配置分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title ? title : '您的好友给您设定了一个提醒',
      path: '/pages/accept/accept?clockID=' + clockID,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  backChange: function (e) {
    console.log(e)
    wx.navigateBack({
      
    })
  },
  onLoad: function (opt) {
    clockID = opt.clockID
    title = opt.title
    var that = this
    if(opt.type == 0) {
      this.setData({
        tip: '请您确认提醒的日期和时间，然后点击下方的确认提醒即可成功添加闹钟，您将在您设定的时间收到您设置的提醒。'
      })
    } else {
      this.setData({
        tip: '请您确认提醒的日期和时间，然后点击下方的确认提醒发送给好友，好友同意后ta就会在您设定的时间收到您设置的提醒。',
        openType: 'share'
      })
    }
    tools.request({
      url: config.service.getClock,
      data: {
        id: opt.clockID,
        de: 0
      },
      success: function (res) {
        console.log('data' ,res.data)
        that.setData({
          title: res.data.title,
          detail: res.data.detail,
          date: util.getShowDate(res.data.time),
          time: util.getShowTime(res.data.time)
        })
      }, 
      fail: function (err) {
        util.showError(err)
      }
    })
  }
})