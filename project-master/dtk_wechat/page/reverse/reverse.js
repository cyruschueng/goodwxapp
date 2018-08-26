var util = require('../../common/util.js')
var app = getApp()
Page({
  data: {
    start_date: util.formatTime2(new Date()),
    end_date: '',
    days: undefined,
    sum: 10,
    sumdays: 0,
    accural: '',
    surplus: '',
    forward: false,
    year_rate: '',
    month_rate: '',
    dayChoose: ['三个月', '半年', '一年'],
    current: 1,

    //zhanglianhao
    calshow: false,
    all: '',
    quantity: '',
    lakh: 0
  },
  onLoad: function (opt) {
    this.WxValidate = app.globalDataValidate(
      {
        sum: {
          required: true
        },
        accural: {
          required: true
        }
      },
      {
        sum: {
          required: '请填写票面金额'
        },
        accural: {
          required: '请填写贴现利息'
        }
      }
    )

    //设置结束日期
    this.setData({
      days: this.days(this.monthPlus(this.data.start_date, 6)),
      year_rate: '0.00',
      month_rate: '0.00'
    })

    if (opt.forward == 1) {
      this.setData({
        sum: opt.sum,
        accural: opt.accural,
        days: opt.days,
      })
      this.calculate()
    }

    //计算售价----zhanglianhao
    if (opt.calshow) {
      this.setData({
        calshow: opt.calshow,
        sum: opt.sumMoney,
        end_date: opt.stardate,
        all: opt.sumMoney,
        quantity: opt.quantity
      })
    }
  },
  //清除sum
  clearSum() {
    this.setData({
      sum: ''
    })
  },
  bindPickerChange(e) {
    let month = e.detail.value

    this.setData({
      current: month
    })

    let now = this.data.start_date
    if (month == 0) {
      let end = this.monthPlus(now, 3)
      this.setData({
        days: this.days(end),
        year_rate: '0.00',
        month_rate: '0.00'
      })
    } else if (month == 1) {
      let end = this.monthPlus(now, 6)
      this.setData({
        days: this.days(end),
        year_rate: '0.00',
        month_rate: '0.00'
      })
    } else {
      let end = this.monthPlus(now, 12)
      this.setData({
        days: this.days(end),
        year_rate: '0.00',
        month_rate: '0.00'
      })
    }
  },
  /**
   * 开始日期加6个月
   * @param  {[string]} curr [开始日期]
   * @param  {[Number]} num  [增加月份数]
   * @return {[string]}      [结束日期]
   */
  monthPlus: function (curr, num) {
    var date = curr//this.data.start_date
    var now = date.split('-')
    var year = now[0]
    var month = parseInt(now[1])
    var days = now[2]

    //判断加6个月是否超过一年
    var substract = (month + num) - 12
    if (substract <= 0) {
      year = year
      if (month + num < 10) {
        month = '0' + (month + num)
      } else {
        month = month + num
      }
    } else {
      year = parseInt(year) + 1
      month = '0' + ((month + num) - 12)
    }

    //当月份为二月时，根据闰年还是非闰年判断天数
    if (parseInt(month) == 2) {
      var sdays
      sdays = (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0) ? 29 : 28
      days = days > sdays ? sdays : days
    } else if (parseInt(month) == 1 || parseInt(month) == 3 || parseInt(month) == 5 || parseInt(month) == 7 || parseInt(month) == 8 || parseInt(month) == 10 || parseInt(month) == 12) {
      days = days
    } else {
      days = days > 30 ? 30 : days
    }
    var end_date = [year, month, days].join('-')
    return end_date
  },
  //计算计息天数
  days: function (last) {
    var start = this.data.start_date.split('-')
    var end = last.split('-')
    var astart = new Date(start[1] + '/' + start[2] + '/' + start[0])
    var aend = new Date(end[1] + '/' + end[2] + '/' + end[0])
    var days = parseInt(Math.abs(aend - astart) / 1000 / 60 / 60 / 24)
    return days
  },
  //返回增加票源页面----zhanglianhao
  goticket: function () {
    var all = this.data.all
    var quantity = this.data.quantity
    var stardate = this.data.end_date
    // wx.redirectTo({
    //   url:`../ticketadd/ticketadd?surplus=${this.data.surplus}&all=${all}&quantity=${quantity}&stardate=${stardate}`
    // })


    var pages = getCurrentPages();//获取当前页面
    var prevPage = pages[pages.length - 2]//上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      calculateDate: {
        surplus: this.data.surplus,
        all: all,
        quantity: quantity,
        stardate: stardate
      }
    })
    wx.navigateBack({
      delta: 1
    })
  },
  //转发
  onShareAppMessage: function (res) {
    return {
      title: '贴现计算器',
      path: `/page/reverse/reverse?sum=${this.data.sum}&accural=${this.data.accural}&days=${this.data.days}&forward=1`,
      success: res => { },
      fail: res => { }
    }
  },

  formSubmit: function (e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        image: '../../image/warn.png',
        duration: 2000
      })
      return false
    }

    var days = this.data.days                             //计息天数
    var sum = e.detail.value.sum
    sum = parseFloat(sum * 10000)                          //票面金额
    var accural = parseFloat(e.detail.value.accural)       //贴现利息

    if (sum == 0) {
      this.setData({
        year_rate: 0,
        month_rate: 0
      })
    } else {
      //贴现利息=票面金额×(计息天数÷360)×年利率
      
      var year_rate = ((accural * 100) / (sum * (days / 360))).toFixed(2)
      var month_rate = ((year_rate / 12) * 10).toFixed(2)
     console.log()

      this.setData({
        year_rate: year_rate,
        month_rate: month_rate
      })
    }
  },
  calculate: function () {
    var days = this.data.days
    var sum = this.data.sum * 10000
    var accural = parseInt(this.data.accural)

    if (sum == 0) {
      this.setData({
        year_rate: 0,
        month_rate: 0
      })
    } else {
      var year_rate = ((accural * 100) / (sum * (days / 360))).toFixed(2)
      var month_rate = ((year_rate / 12) * 10).toFixed(2)
      this.setData({
        year_rate: year_rate,
        month_rate: month_rate
      })
    }
  },
  formReset: function () {
    this.setData({
      year_rate: '0.00',
      month_rate: '0.00',
      start_date: this.data.start_date,
      end_date: this.data.end_date
    })
  },
  bindStartDate: function (e) {
    this.setData({
      start_date: e.detail.value
    })
  },
  bindEndDate: function (e) {
    this.setData({
      end_date: e.detail.value
    })
  },
  //调整天数
  changeday: function (e) {
    this.setData({
      days: e.detail.value
    })
  },
  sumMoney: function (e) {
    this.setData({
      sum: e.detail.value
    })
  },
  lakhchange: function (e) {
    this.setData({
      lakh: e.detail.value
    })
  },
  accuralMoney(e) {
    this.setData({
      accural: e.detail.value
    })
  }
})















































