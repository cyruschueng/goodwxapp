var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    linkphone:'',
    headsculpture:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  getUserData(){
    this.setData({
      baseinfo: app.globalData.baseinfo,
      userInfo: app.globalData.userInfo,
      linkphone: app.globalData.linkphone,
      username: app.globalData.username,
      headsculpture: app.globalData.headsculpture
    })
  },
  signout(){
    wx.showModal({
      content: '是否退出登录',
      success: function (res) {
        if (res.confirm) {


          


            
              wx.removeStorage({
                key: 'sessionKey',
                success: function (res) { },
              })

              wx.removeStorage({
                key: 'username',
                success: function (res) { },
              })

              wx.removeStorage({
                key: 'password',
                success: function (res) { },
              })


              wx.reLaunch({
                url: '/page/login/index'
              })

              app.UserLogin()
              // if (res.data.code == 0) {}

          // app.commonAjax('/shop/user/delLogin', [], {}, (res) => {
          // }, app, 'post')


        } else if (res.cancel) {

        }
      }
    })
  }


})