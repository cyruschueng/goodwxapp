// pages/manageUser/manageUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: "",
    avatarUrl:wx.getStorageSync("avatarUrl"),
    nickName: wx.getStorageSync("nickName"),
    display:wx.getStorageSync("display"),
   sort: wx.getStorageSync("sort"),
   phone:wx.getStorageSync("phone"),
   total_money: wx.getStorageSync("money"),
    list: [
      {
        "img": "../../images/manageUser/1.png",
        "txt": "未审核"
      },
      {
        "img": "../../images/manageUser/2.png",
        "txt": "已注册"
      },
      {
        "img": "../../images/manageUser/3.png",
        "txt": "已开通"
      },
      {
        "img": "../../images/manageUser/4.png",
        "txt": "禁止"
      },
      {
        "img": "../../images/manageUser/5.png",
        "txt": "统计"
      }
    ]
  },
  onTap: function (e) {
    console.log(e)
    if (wx.getStorageSync("uid")) {
      this.setData({
        showModalStatus: false
      })
      var index = e.currentTarget.dataset.index;
      console.log(index)
      if (index !== 4) {
        wx.navigateTo({
          url: '../membership/membership',
        })
        wx.setStorageSync("userToMember", true)  //从用户管理进入用户列表
      } else {
        wx.navigateTo({
          url: '../count/count',
        })
      }
      wx.setStorageSync("order", index);      
    } else {
      this.setData({
        showModalStatus: true
      })
    }
  },

  //去注册：
  regist: function (e) {
    this.setData({
      showModalStatus: false
    })

    wx.navigateTo({
      url: '../regist/regist',
    })
  },

  //去登陆：
  login: function () {
    this.setData({
      showModalStatus: false
    })

    wx.navigateTo({
      url: '../login/login',
    })
  },

  //关闭弹窗
  close: function () {
    this.setData({
      showModalStatus: false
    })
  },

//去交易
  trade:function(){
    wx.navigateTo({
      url: '../wallet/wallet',
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.setData({
    //   showModalStatus: false
    // })
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

  }
})