//index.js
//获取应用实例
const filter = require('../../filter');
var app = getApp()
Page(filter.loginCheck({
  data: {
    title: '群排行',
    userInfo: {},
    isshow: false,
    pagedata: []
  },
  //事件处理函数
  gotoIndex: function () {
    wx.redirectTo({
      url: "/pages/index/index"
    })
  },
  userInfoReadyCallback: function () {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      isshow: true
    })
    console.log(app.globalData.userInfo)
  },
  getdata: function () {
    var that=this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.domain + '/getRank',
      data: { groupid: app.globalData.userInfo.groupid },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          pagedata:res.data
        });
      }
    })
  },
  onReady: function () {
    var that = this
    that.userInfoReadyCallback();
  },
  onLoad: function (opt) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    if (app.globalData.userInfo) {
      that.userInfoReadyCallback();
      that.getdata();
    }
    wx.updateShareMenu({
      withShareTicket: true
    })

  },
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '测试标题',
      path: 'pages/rank/rank',
      success: function (res) {
        // 转发成功
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            console.log(res);
            app.getGroupInfo(encryptedData, iv);
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
)