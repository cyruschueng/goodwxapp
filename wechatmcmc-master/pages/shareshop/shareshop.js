// shareshop.js
var app = getApp();
var id;
Page({
  data: {
    token: 1,
    zhiwei: [],
    logo:'',
    gongsi:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    var session_id = wx.getStorageSync('session_id')
    var openid;
    if (e.token == 1) {
      openid = wx.getStorageSync('wxopenid')
      id = wx.getStorageSync('wxopenid')
    } else {
      openid = e.openid
      id = e.openid
    }
    //  console.log(openid);
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shareshop',
      data: {
        'openid': openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      method: 'post',
      success: function (res) {
         console.log(res);
       
        that.setData({
          zhiwei: res.data.zhiwei,
          token: e.token,
          logo: res.data.logo,
          gongsi:res.data.gongsi,
        })

        // console.log(that.data.height)
        // 
      }
    })
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
    return {
      title: "共享餐饮机会",
      desc: "",
      path: '/pages/shareshop/shareshop?openid=' + id + '&token=0'

    }
  }
})