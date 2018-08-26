var app = getApp()
var reg = /^(\d+)-(\d+)-(\d+)$/;
var nowTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    count: 6,
    MonthArr: [],
    availableDate: [],
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    days: [],
    chmon: '',
    chday: '',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择日期',
    })
    if (options.cday) {
      //console.log(options.cday.match(reg)[2], options.cday.match(reg)[3])
      this.setData({
        chmon: options.cday.match(reg)[2],
        chday: options.cday.match(reg)[3]
      })
    }
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/goods/list?shopId=' + options.shopId,
      success: function (res) {
        self.setData({
          availableDate: res.data.result.days,
        })
        var times = new Date()
        var availableArr = self.checkDay()
        self.loopmonth(times.getFullYear(), times.getMonth(), availableArr)
      }
    })
  },
  choosedate: function (e) {
    var choosed = e.currentTarget.dataset.cdate
    if (choosed.color) {
      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      prevPage.setData({//直接给上移页面赋值
        cday: choosed.year + '-' + choosed.month + '-' + choosed.day,
      });
       wx.navigateBack({//返回
         delta: 1
       })
    }
  },
  checkDay: function () {
    //正则匹配可选日期
    var availableDate = this.data.availableDate;
    var availableArr = [];
    //取出可选日期中的年月日,转化为时间戳放在availableArr
    for (let i = 0; i < availableDate.length; i++) {
      var Year = availableDate[i].match(reg)[1];
      var Month = availableDate[i].match(reg)[2] - 1;
      var Day = availableDate[i].match(reg)[3];
      availableArr.push(new Date(Year, Month, Day).getTime());
    };
    return availableArr
  },
  loopmonth: function (years, months, availableArr) {
    var dateArray = []
    let mm = [];
    let a = months;
    for (let i = 0; i < this.data.count; i++) {
      mm.push(++a);
      dateArray.push(this.loopday(new Date(years, months * 1 + i), availableArr))
    }
    this.setData({
      MonthArr: mm,
      days: dateArray
    });
  },
  loopday: function (Dates, availableArr) {
    //获取日期（因为月份一直在不断地增加，获取每个月的信息）
    var time = Dates;
    var dateArr = [],
    noeMonthCont = [],
    year = time.getFullYear(),//年
    month = time.getMonth(),//月
    date = time.getDate(),//日
    firstDay = new Date(year, month, 1).getDay(),//每个月的第一天是星期几
    lastDay = new Date(year, month + 1, 0).getDate();//每个月各有多少天{
    for (var i = 1; i <= 35; i++) {
      //获取到每个月的月份，日期
      var newYear = new Date(year, month, i - firstDay).getFullYear(),
      newMonth = new Date(year, month, i - firstDay).getMonth() + 1,
      newDate = new Date(year, month, i - firstDay).getDate(),//各个月的所有的日期
      newTime = new Date(year, month, i - firstDay).getTime();//每个月每天的时间戳
      //进行判断不同情况的数据
      if (i - firstDay < 1 || i - firstDay > lastDay) {
        dateArr.push({
          day: newDate
        });
      } else if (newTime >= nowTime) {
        if (this.inarray(newTime, availableArr)) {
          dateArr.push({
            year: newYear,
            month: newMonth,
            day: newDate,
            color: '#333'
          });
        } else {
          dateArr.push({
            day: newDate,
          });
        }
      } else {
        dateArr.push({
          day: newDate
        });
      }
    }
    return dateArr
  },
  inarray: function (str, arr) {
    for (var i = 0; i <= arr.length; i++) {
      if (str == arr[i]) { return true }
    }
    return false
  }
})