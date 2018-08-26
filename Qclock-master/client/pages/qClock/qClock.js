var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var tools = require('../../utils/tools.js')
var Session = require('../../utils/session.js')

const days = ['今天', '明天', '后天', '大后天', '大大后天', '大大大后天', '大大大大后天']
const hours = []
const minutes = []

for (let i = 0; i < 24; i++) {
  hours.push(i)
}

for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}

Page({
  data: {
    date: '',
    days: days,
    hours: hours,
    minutes: minutes,
    day: days[0],
    hour: 15,
    minute: 0,
    value: [0, 15, 0]
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
  bindChange: function (e) {
    console.log(e)
    const val = e.detail.value
    let day = this.data.days[val[0]]
    let hour = this.data.hours[val[1]]
    let minute = this.data.minutes[val[2]]
    this.setData({
      day: day,
      hour: hour,
      minute: minute,
      date: configDate(val[0], hour, minute)
    })
  },
  onLoad: function () {
    let currentDate = new Date()
    let laterDate = getDate()
    let hour = laterDate.getHours()
    let minute = laterDate.getMinutes()
    if (currentDate.getDate() != laterDate.getDate()) {
      console.log('测试啊')
      this.setData({
        value: [1, parseInt(hour), parseInt(minute)]
      })
    } else {
      this.setData({
        value: [0, parseInt(hour), parseInt(minute)]
      })
    }
    this.setData({
      date: laterDate
    })
  },
  onShow: function () {
    
  },

  onShareAppMessage: function (res) {

    return {
      title: '企鹅闹钟,可以给好友设置闹钟哦',
      path: '/pages/qClock/qClock',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

function getDate () {
  // var date = new Date('2017-12-31 23:58')
  var date = new Date()
  var min = date.getMinutes()
  date.setMinutes(min + 15)
  return date
}

function configDate (day, hour, minute) {
  let date = new Date()
  date.setDate(date.getDate() + parseInt(day))
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, '00')
}

// function getCurrentDate(date) {
//   let str = date.toLocaleDateString()
//   str = str.replace(/\//g, '-')
//   return str
// }

// function getCurrentTime(date) {
//   return date.getHours() + ':' + date.getMinutes()
// }

// function getShowDate(date) {
//   let dateArray = date.split('-')
//   let showDate = dateArray[0] + '年' + fix(dateArray[1], 2) + '月' + fix(dateArray[2], 2) + '日'
//   return showDate
// }

// function getShowTime(time) {
//   let timeArray = time.split(':')
//   let showTime = fix(timeArray[0], 2) + ':' + fix(timeArray[1], 2)
//   if (timeArray[0] < 12) {
//     showTime = '上午 ' + showTime
//   } else {
//     let hour = parseInt(timeArray[0]) - 12
//     showTime = '下午 ' + fix(hour > 0 ? hour : 12, 2) + ':' + fix(timeArray[1], 2)
//   }
//   return showTime
// }

// function fix(num, length) {
//   return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
// }