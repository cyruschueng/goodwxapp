var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    city: wx.getStorageSync('city'),
    flag: 0,
    plist: [
      {
        id: 1, icon: '/img/follow.png', name: '萍聚类型', value: '电影', list: [
          '电影', '旅行', '爬山', '唱歌', '运动', '跑腿', '酒吧', '吃饭', '逛街', '公益'
        ]
      },
      {
        id: 2, icon: '/img/users.png', name: '萍聚人数', value: 1, list: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        ]
      },
      { id: 3, icon: '/img/calendar.png', name: '萍聚日期', value: util.formatTime(new Date).substring(0, 10).replace(/\//g, '-'), startDate: util.formatTime(new Date).substring(0, 10).replace(/\//g, '-') },
      { id: 4, icon: '/img/clock_green.png', name: '萍聚时间', value: util.formatTime(new Date).substring(11, 16), startTime: util.formatTime(new Date).substring(11, 16) },
      { id: 5, icon: '/img/money_green.png', name: '金额预算', value: '10-100元', list: ['不限', '10-100元', '100-500元', '500-1000元', '1000-5000元', '5000元以上'] },
      { id: 6, icon: '/img/lca.png', name: '萍聚地点', value: '', },
      { id: 7, icon: '/img/gender.png', name: '性别选择', value: '限男性', list: ['限男性', '限女性', '男女不限'], },
      { id: 8, icon: '/img/flag_green.png', name: '开支性质', value: 'AA', list: ['AA', '我做东', '求请', '男A女免'], },
      { id: 9, icon: '/img/message.png', name: '萍聚介绍', value: '再补充一下活动内容吧~(12-500字)' }
    ]
  },
  changeCity: function () {
    wx.redirectTo({
      url: '/pages/city/city?type=publish'
    })
  },
  bindPickerType: function (e) {
    var list = this.data.plist;
    var that = this;
    list[0].value = that.data.plist[0].list[e.detail.value];
    this.setData({
      plist: list
    })
  },
  bindPickerNum: function (e) {
    var list = this.data.plist;
    var that = this;
    list[1].value = that.data.plist[1].list[e.detail.value];
    this.setData({
      plist: list
    })
  },
  bindDateChange: function (e) {
    var list = this.data.plist;
    var that = this;
    list[2].value = e.detail.value;
    if (this.data.plist[2].value == util.formatTime(new Date).substring(0, 10).replace(/\//g, '-')) {
      list[3].startTime = util.formatTime(new Date).substring(0, 10).replace(/\//g, '-');
    } else {
      list[3].startTime = "00:00";
    }
    this.setData({
      plist: list
    })
  },
  bindTimeChange: function (e) {
    var list = this.data.plist;
    var that = this;
    list[3].value = e.detail.value;
    this.setData({
      plist: list
    })
  },
  bindPickerBudget: function (e) {
    var list = this.data.plist;
    var that = this;
    list[4].value = that.data.plist[4].list[e.detail.value];
    this.setData({
      plist: list
    })
  },
  bindPickerGender: function (e) {
    var list = this.data.plist;
    var that = this;
    list[6].value = that.data.plist[6].list[e.detail.value];
    this.setData({
      plist: list
    })
  },
  bindPickerGeneral: function (e) {
    var list = this.data.plist;
    var that = this;
    list[7].value = that.data.plist[7].list[e.detail.value];
    this.setData({
      plist: list
    })
  },
  desInput: function (e) {
    var list = this.data.plist;
    var that = this;
    list[8].value = e.detail.value;
    this.setData({
      plist: list
    })
  },
  addressInput: function (e) {
    var list = this.data.plist;
    var that = this;
    list[5].value = e.detail.value;
    this.setData({
      plist: list
    })
  },
  publishBtn: function () {
    console.log(this.data.plist)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var city = wx.getStorageSync('city');
    if (city && city.length > 0) {
      city = city.replace('市', '');
      this.setData({ city: city });
    }
    if (!wx.getStorageSync('userInfo').id) {
      wx.showModal({
        title: '提示',
        content: '您还没有注册哦！',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/own/own?types=publish',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    var list = this.data.plist;
    var that = this;
    if (this.data.plist[2].value == util.formatTime(new Date).substring(0, 10).replace(/\//g, '-')) {
      list[3].startTime = util.formatTime(new Date).substring(0, 10).replace(/\//g, '-');
    } else {
      list[3].startTime = "00:00";
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  submit: function () {
    var that = this
    var str = 'movie';
    var genl = 0;
    var pay = 0;
    switch (that.data.plist[0].value) {
      case '电影': str = 'movie'; break;
      case '旅行': str = 'travel'; break;
      case '唱歌': str = 'ktv'; break;
      case '爬山': str = 'climb'; break;
      case '运动': str = 'sports'; break;
      case '跑腿': str = 'running'; break;
      case '酒吧': str = 'drink'; break;
      case '吃饭': str = 'dine'; break;
      case '逛街': str = 'shopping'; break;
      case '公益': str = 'charity'; break;
    }
    switch (that.data.plist[6].value) {
      case '限男性': genl = 0; break;
      case '限女性': genl = 1; break;
      case '男女不限': genl = 2; break;
    }
    switch (that.data.plist[7].value) {
      case 'AA': pay = 0; break;
      case '我做东': pay = 1; break;
      case '求请': pay = 2; break;
      case '男A女免': pay = 3; break;
    }
    var task = {
      uid: wx.getStorageSync('userInfo').id,
      openid: wx.getStorageSync('userInfo').openid,
      city: wx.getStorageSync('city'),
      province: wx.getStorageSync('userInfo').province,
      des: that.data.plist[8].value, cate: str,
      sex: genl,
      address: that.data.plist[5].value,
      year: that.data.plist[2].value.substring(0, 4),
      month: that.data.plist[2].value.substring(5, 7),
      day: that.data.plist[2].value.substring(8, 10),
      hour: that.data.plist[3].value.substring(0, 2),
      minute: that.data.plist[3].value.substring(3, 5),
      expend: pay, num: that.data.plist[1].value, fee: that.data.plist[4].value
    };
    console.log(task)
    if (!wx.getStorageSync('userInfo').id) {
      wx.showModal({
        title: '提示',
        content: '您还没有注册哦！',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/own/own?types=publish',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      
      wx.request({
        url: app.api + 'publish',
        method: 'post',
        data: task,
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 1) {
            wx.navigateTo({ url: '/pages/dopublish/dopublish?id=' + res.data.data.id });
          } else {
            wx.showToast({
              title: '您的萍聚地址或萍聚介绍没有填写',
              icon: 'success',
              duration: 2000
            });
            setTimeout(function () {
              wx.hideToast()
            }, 2000);
          }
        },
        fail: function (res) {
          wx.hideToast()
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    }

  }
})