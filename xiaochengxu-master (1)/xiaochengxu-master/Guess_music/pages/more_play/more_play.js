//获取应用实例
var app = getApp()

Page({
  data: {
    items:{}
  },

  //跳成语一起猜
  more_play: function (e) {
    var appid = e.currentTarget.dataset.appid;
    console.log(appid)
    wx.navigateToMiniProgram({
      appId: appid,
      path: 'pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        //console.log("ok")
      }
    })
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: "https://caimusic4.mytp8.cn/public_html/index.php/index/Appid/index",
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          items:res.data
        })
      }
    })
  },
  onReady: function () {
    //console.log('onReady')
  },
  onShow: function () {
    //console.log('onShow')
  },

})
