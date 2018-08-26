var util = require('../../util/md5.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    // util.hexMD5('123456')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  inputUsername (e){
    this.setData({
      username: e.detail.value
    })
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  userLogin(){


    if (this.data.username){

      if (this.data.password){
        wx.showLoading({
          title: '登录中',
        })
        this.userSave() 
      }else{
        wx.showToast({
          title: '请输入密码',
          image: '/image/i/x.png',
          duration: 2000
        })
      }


    }else{
      wx.showToast({
        title: '请输入用户名',
        image: '/image/i/x.png',
        duration: 2000
      })
    }

  },


  userSave () {
    //通过用户名获取随机数
    app.baseAjax('/shop/user/getSalt', { 'username': this.data.username }, 'get', (res) => {


      var newpass = this.data.password + res.data.data

      //用户登录
      app.commonAjax('/shop/user/login',[], { 'username': this.data.username, 'password': util.hexMD5(newpass).toUpperCase() }, (res) => {
        if (res.data.code == 0) {
 
          wx.setStorage({
            key: 'username',
            data: this.data.username,
            success:()=>{
              wx.setStorage({
                key: 'password',
                data: util.hexMD5(newpass).toUpperCase(),
                success:()=>{
                  app.globalData.username = res.data.data.userInfo.username
                  app.globalData.shopId = res.data.data.userInfo.busid
                  app.globalData.bizId = res.data.data.baseinfo.bizId
                  app.globalData.linkphone = res.data.data.userInfo.phone
                  app.globalData.userId = res.data.data.userInfo.userId

                  app.globalData.headsculpture = res.data.data.userInfo.avatar

                  app.globalData.baseinfo = res.data.data.baseinfo
                  app.globalData.userInfo = res.data.data.userInfo

                  app.globalData.thirdSession = res.data.data.thirdSession

                  wx.setStorageSync('sessionKey', res.data.data.thirdSession)

                  // wx.redirectTo({
                  //   url: '/page/index/index'
                  // })
                  wx.switchTab({
                    url: '/page/index/index',
                  })
                }
              })
            }
          })

          

          

        } else {

          

          wx.showToast({
            title: res.data.message,
            image: '/image/i/x.png',
            duration: 2000
          })

        }
      }, app, 'post')

    })
  }




})