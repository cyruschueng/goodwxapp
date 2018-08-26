Page({
  data: {
    data:[],
    commodity:[],
    electricity: [],
    clientele:[],
    visitor:[]
  },
  onLoad: function () {
    var endDate = this.getNowTime();
    var startDate = this.getDateStr(endDate,-7);
    console.log(endDate, startDate);
    var that = this;
    wx.request({
      url: 'https://dingdian.parllay.cn/wxserver/stat/getManagerTopData',
      data: {
        "data": {
          "storeNo": "B02S0002",
        }
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        
        console.log(res);
        that.setData({
          data: res.data.data,
        });
      }
    })
    wx.request({
      url: 'https://dingdian.parllay.cn/wxserver/stat/getManagerCircleVisitorData',
      data: {
        "data": {
          "storeNo": "B02S0002",
          "endDate":endDate,
          "startDate": startDate
        }
        
      }, 
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res)
        that.setData({
          electricity: res.data.data,
        });
      }
    })
    wx.request({
      url: 'https://dingdian.parllay.cn/wxserver/stat/getManagerVisitorData',
      data: {
        "data": {
          "storeNo": "B02S0002",
          "endDate": endDate,
          "startDate": startDate
        }
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res);
        that.setData({
          visitor: res.data.data,
        });
      }
    })
    wx.request({
      url: 'https://dingdian.parllay.cn/wxserver/stat/getManagerProductData',
      data: {
        "data": {
          "storeNo": "B02S0002",
          "endDate": endDate,
          "startDate": startDate
        }
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res);
        that.setData({
          commodity: res.data.data,
        });
      }
    })
    wx.request({
      url: 'https://dingdian.parllay.cn/wxserver/stat/getManagerCusotmerData',
      data: {
        "data": {
          "storeNo": "B02S0002",
          "endDate": endDate,
          "startDate": startDate
        }
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res);
        that.setData({
          clientele: res.data.data,
        });
      }
    })
  },
  getNowTime: function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    if(month < 10) {
      month = '0' + month;
    };
    if(day < 10) {
      day = '0' + day;
    };
    if(h < 10) {
      h = '0' + h;
    };
    if(m < 10) {
      m = '0' + m;
    };
    if(s < 10) {
      s = '0' + s;
    };
    var formatDate = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
    return formatDate;
  },
  getDateStr: function(today, addDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var month = dd.getMonth() + 1;//获取当前月份的日期 
    var d = dd.getDate();
    var h = dd.getHours();
    var m = dd.getMinutes();
    var s = dd.getSeconds();
    if (month < 10) {
      month = '0' + month;
    };
    if (d < 10) {
      d = '0' + d;
    };
    if (h < 10) {
      h = '0' + h;
    };
    if (m < 10) {
      m = '0' + m;
    };
    if (s < 10) {
      s = '0' + s;
    };
    return y + "-" + month + "-" + d + ' ' + h + ':' + m + ':' + s;
  },
  Seven: function () {
    var endDate = this.getNowTime();
    var startDate = this.getDateStr(endDate, -7);
    console.log(endDate, startDate);
    var that = this
    wx.request({
      url: 'https://dingdian.parllay.cn/wxserver/stat/getManagerCircleVisitorData',
      data: {
        "data": {
          "storeNo": "B02S0002",
          "endDate":endDate,
          "startDate": startDate
        }
        
      }, 
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res)
        that.setData({
          electricity: res.data.data,
        });
      },
      currentTab: 1
    })
  },
  Thirty: function () {
    var endDate = this.getNowTime();
    var startDate = this.getDateStr(endDate, -30);
    console.log(endDate, startDate);
    var that = this
    wx.request({
      url: 'https://dingdian.parllay.cn/wxserver/stat/getManagerCircleVisitorData',
      data: {
        "data": {
          "storeNo": "B02S0002",
          "endDate": endDate,
          "startDate": startDate
        }

      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res)
        that.setData({
          electricity: res.data.data,
        });
      },
      currentTab: 2
    })
  }
}) 