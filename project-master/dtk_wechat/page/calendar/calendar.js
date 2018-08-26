var common = require('../../common/common.js')
var util = require('../../common/util.js')
var app = getApp()
var y, m
Page({
  data: {
    day: [{
      id: 1,
      day: '一'
    }, {
      id: 2,
      day: '二'
    }, {
      id: 3,
      day: '三'
    }, {
      id: 4,
      day: '四'
    }, {
      id: 5,
      day: '五'
    }, {
      id: 6,
      day: '六'
    }, {
      id: 7,
      day: '日'
    }],
    ym2: [],
    ym: [],
    month: '',
    year: '',
    calendarData: [],
    times: '',
    data: [],
    order: '',
    showLoading: true,
    now: '',
    today: '',
    lightleft: '',
    lightright: '',
    exchange: [
      {
        id: 1,
        value: '纸票'
      },
      {
        id: 2,
        value: '电票'
      }
    ],
    selected: true,
    selected1: false,
    type: 'half',
    currentYear: ''
  },
  //tab
  tabchange: function (e) {
    this.setData({
      selected1: false,
      selected: true,
      type: 'half',
      showLoading: true
    })
    this.calendar()
  },
  tabchange1: function (e) {
    this.setData({
      selected1: true,
      selected: false,
      type: 'one',
      showLoading: true
    })
    this.calendar()
  },
  //当前日期
  now: function () {
    var curr = util.formatTime2(new Date())
    var now = curr.split('-')
    var year = now[0]
    var month = now[1]
    var day = parseInt(now[2])

    var date = [year, month, day].join('-')
    this.setData({
      now: date,
      currentYear: year
    })
  },
  // 判断当前年份和下一年份的日期
  yearControl: function() {
    let year = this.data.currentYear
    let next = parseInt(year)+1
    let current = [year+'-01', year+'-02', year+'-03', year+'-04', year+'-05', year+'-06', year+'-07', year+'-08', year+'-09', year+'-10', year+'-11', year+'-12']
    let nextYear = [next+'-01', next+'-02', next+'-03', next+'-04', next+'-05', next+'-06', next+'-07', next+'-08', next+'-09', next+'-10', next+'-11', next+'-12']
    let ym = [...current, ...nextYear]

    let ym2 = ym.map(value => {
      let date = value.split('-')           //拆分年月
      return date[0]+'年'+date[1]+'月'      // picker中显示的年份
    })
    
    this.setData({
      ym: ym,
      ym2: ym2
    })
  },
  //开始点击改变透明度
  changeLeft: function () {
    this.setData({
      lightleft: '0.4'
    })
  },
  changeRight: function () {
    this.setData({
      lightright: '0.4'
    })
  },
  //清除透明度
  cleared: function () {
    setTimeout(() => {
      this.setData({
        lightleft: '1',
        lightright: '1'
      })
    }, 500)
  },
  onLoad: function () {

    this.now()
    this.yearControl()

    this.split(new Date(), null)
    this.setData({
      order: this.data.month - 1,
      today: 'today'
    })
    this.calendar()
  },
  //转发
  onShareAppMessage: function (res) {
    return {
      title: '开票日历',
      path: `/page/calendar/calendar`,
      success: res => { },
      fail: res => { }
    }
  },
  bindPickerChange: function (e) {
    var choose = e.detail.value
    var ym = this.data.ym

    this.setData({
      order: choose
    })

    //显示当前月份
    this.split(null, ym[choose])
    this.calendar()
  },
  bindPickerChange2: function (e) {
    var choose = e.detail.value
    var ym = this.data.ym

    this.setData({
      order: choose
    })

    //显示当前月份
    this.split(null, ym[choose])
    this.calendar()
  },
  //上个月
  last: function () {
    var last = this.data.order - 1
    var ym = this.data.ym
    var year = ym[last] //如果没有日历的话year为undefined
    
    if (!year) {
      wx.showToast({
        title: '没有日历了',
        image: '../../image/warn.png',
        duration: 2000
      })
    } else {
      this.setData({
        order: last,
        today: ''
      })

      setTimeout(() => {
        this.setData({
          lightleft: '1'
        })
      }, 500)

      setTimeout(() => {
        this.setData({
          today: 'today'
        })
      }, 180)

      this.split(null, ym[last])
      this.calendar()
    }
  },
  //下个月
  next: function () {
    var next = parseInt(this.data.order) + 1
    var ym = this.data.ym
    var balance = this.data.month
    var year = ym[next]

    //next要加1  所以是大于11不是12
    if (!year) {
      wx.showToast({
        title: '没有日历了',
        image: '../../image/warn.png',
        duration: 2000
      })
    } else {
      this.setData({
        order: next,
        today: ''
      })

      setTimeout(() => {
        this.setData({
          lightright: '1'
        })
      }, 500)

      setTimeout(() => {
        this.setData({
          today: 'today'
        })
      }, 180)

      this.split(null, ym[next])
      this.calendar()
    }
  },
  //处理年月参数
  split: function (today, date) {
    var curr
    if (today != null) {
      curr = util.formatTime2(today).split('-')
      this.setData({
        today: parseInt(curr[2])
      })
    } else {
      curr = date.split('-')
    }

    y = parseInt(curr[0])
    m = parseInt(curr[1])
    if (m >= 10) {
      m = parseInt(curr[1])
    } else {
      m = parseInt(curr[1][1])
    }


    this.setData({
      year: y,
      month: m,
    })
  },
  calendar: function () {
    wx.request({
      method: 'GET',
      url: common.getRequestUrl + '/dtk/search/calendar/' + this.data.type,
      data: {
        year: this.data.year,
        month: this.data.month
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        this.setData({
          showLoading: false
        })
        if (res.data.code != 'OK') {
          wx.showToast({
            title: res.data.msg,
            image: '../../image/warn.png',
            duration: 2000
          })
        } else {
          var cdata = res.data.calendar
          var calendarData = {}

          //二位数组变成一维数组
          cdata = [].concat.apply([], cdata)

          var arr = cdata.slice(0, 7)
          var alength = []
          for (var i = 0; i < arr.length; i++) {
            var a = 0
            if (arr[i] == 0) {
              alength[i] = cdata[i]
            }
          }

          this.setData({
            calendarData: cdata,
            data: res.data.calendar,
            times: alength.length
          })
        }
      }
    })
  },
  //换取token
  exchangeToken: function () {
    wx.request({
      url: `${common.getRequestUrl}/dtk/users/token`,
      method: 'GET',
      header: {
        swap: wx.getStorageSync('token'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.code !== 'OK') {
          wx.showToast({
            title: res.data.msg,
            image: '../../image/warn.png',
            duration: 2000
          })
        } else {
          wx.setStorageSync('token', res.data.token)
        }
      }
    })
  }
})
