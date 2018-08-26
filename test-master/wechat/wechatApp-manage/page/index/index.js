var app = getApp()
Page({

  data: {
    hiddenmodalput: true,
    username : ''
  },

  onLoad: function (options) {
    this.baseinfo()
    this.setData({
      username: app.globalData.username
    })

  },


  baseinfo(){
    this.setData({
      baseinfo: app.globalData.baseinfo,
      userInfo: app.globalData.userInfo
    })
  },

  onReady: function () {
  
  },

  onShow: function () {
    this.baseinfo()

    
  },


  //获取商户信息和用户信息
  getBaseinfoAndUserInfo(){
    app.commonAjax('/shop/user/login', [], {}, (res) => {

      if (res.data.code == 0) {
        app.globalData.headsculpture = res.data.data.userInfo.avatar

        app.globalData.username = res.data.data.userInfo.username
        app.globalData.shopId = res.data.data.userInfo.busid
        app.globalData.bizId = res.data.data.baseinfo.bizId
        app.globalData.linkphone = res.data.data.userInfo.phone
        app.globalData.userId = res.data.data.userInfo.userId

        app.globalData.baseinfo = res.data.data.baseinfo
        app.globalData.userInfo = res.data.data.userInfo
      }

    }, app, 'post')
  },


  onUnload: function () {
  
  },


})