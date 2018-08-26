// pages/captain/captain.js
var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认不是堡主
    isCaptain:true,
    captainInfo:{},
    totalEarnings:0,//总收益,
    userInfo:{},
    customer_id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   

  },
  // 堡主信息方法
  getCaptainInfo(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var totalEarnings = res.data.result.love_honey_bean + res.data.result.shopping_bonus + res.data.result.sign_honey_bean;
          res.data.result.picture =res.data.result.picture
          that.setData({
            captainInfo:res.data.result,
            totalEarnings: totalEarnings,
            isCaptain:false
          })
          wx.setStorage({
            key: 'fort_id',
            data: that.data.captainInfo.fort_id,
          })
        }else{
          if (res.data.msg = "请先成为堡主"){
            that.setData({
              isCaptain:true
            })
          }
        }
      }
    })
  },
  // 点击成为堡主
  becomeCaptain(e){
    wx.navigateTo({
      url: './inputID/inputID',
    })
  },
  // 点击去工厂分红收益
  goFactoryDividendEarnings(e){
    var navid = e.currentTarget.dataset.navid;
    wx.setStorage({
      key: 'navid',
      data: navid,
    })
    wx.navigateTo({
      url: './factoryDividendEarnings/factoryDividendEarnings'
    })
  },
  
  // 点击去排行榜
  goTopPage(e){
    wx.navigateTo({
      url: './topPage/topPage',
    })
  },
  // 点击客服管理
  goPartner(e){
    wx.navigateTo({
      url: './partner/partner',
    })
  },
  // 点击去提现
  withdrawClick(e){
    wx.showModal({
      title: '提示',
      content: '暂未开通',
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
    var that = this;
    // 获取用户id
    wx.getStorage({
      key: 'customer_id',
      success: function (res) {
        // console.log(res)
        that.setData({
          customer_id: res.data
        })
        // 获取堡主信息
        var captainInfoUrl = baseUrl + '/api/fort/hostess/load-info?customer_id=' + that.data.customer_id;
        that.getCaptainInfo(captainInfoUrl);
      },
    })

    
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
  
  }
})