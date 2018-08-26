
//获取应用实例 
Page({
  onShareAppMessage: function () {
    var that = this
    console.log(that.data.id)
    return {
      title: '微信小程序之语音红包',
      desc: '最具人气的语音红包游戏!',
      path: '/pages/receiveMoney/receiveMoney?cid=' + that.data.id,
      success: function (res) {
        //console.log(that.data.id)
    }
  }
},
  data: {
    openId: "",
    id: "",
  },
  onLoad: function (res) {
    if (res.cid) {
      var hid = res.cid
    } else {
      var hid = getApp().globalData.id
    }
    getApp().globalData.qid = hid
    console.log("qid" + getApp().globalData.qid)
    var that = this
    //请求我的记录发出的接口数据
    wx.request({
      url: 'https://www.mqtp8.cn/applet/pay/hongBao', //红包页面的接口
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        openId: getApp().globalData.openId,
        id: getApp().globalData.qid,
      },
      success: function (res) {
        console.log(res)
      }

    })
  },
  //我要发按钮
  goIndex: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
})


