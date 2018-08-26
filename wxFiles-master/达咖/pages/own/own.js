var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    showVipRegister:false
  },
  //打开微信卡券
  navToCardqu: function () {
    wx.navigateTo({
      url: '/pages/cardmarket/cards/cards',
    })
  },
  navToProgrammer: function () {
    wx.navigateTo({
      url: '/pages/programmer/programmer',
    })
  },
  navToCard: function () {
    wx.navigateTo({
      url: '/pages/card/card',
    })
  },
  navToRecharge: function () {
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    })
  },
  navToVip: function () {
    wx.navigateTo({
      url: '/pages/vip/vip',
    })
  },
  navToVipRegister: function(){
    wx.navigateTo({
      url: '/pages/vip/register/register',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //显示用户信息
    if (wx.getStorageSync("userInfo") == null || !wx.getStorageSync("userInfo")){
      app.getUserInfo(function (res) {
        that.setData({
          user: res
        })
      });
    }else{
      that.setData({
        user: wx.getStorageSync("userInfo")
      })
    }
  },
  navToCoupon: function(){
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync("phone") == null || wx.getStorageSync("phone")==''){
      this.setData({ showVipRegister:false})
    }else{
      this.setData({ showVipRegister: true})
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '达咖首页',
      path: '/pages/index/index?userid=' + wx.getStorageSync("openid"),
      success: function (res) {
        console.log(res)
        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success: function (res) {
            console.log(res)
          },
          fail: function () {
            console.log(res)
          }
        })
      }
    }
  }
})