//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     "listArr":[
            { "imgSrc": "../../images/home_3.png", "name": "物流责任保险(整车保)", "explain": "浓浓人情味,尽在微速保","price":"100"},
            {
              "imgSrc": "../../images/home_2.png",
              "name": "物流责任保险(整车保)",
              "explain": "浓浓人情味,尽在微速保",
              "price": "2"
            },
            {
              "imgSrc": "../../images/home_3.png",
              "name": "国内水路、陆路货物运输保险(综合险)",
              "explain": "微速保定制版",
              "price": "20"
            },
            {
              "imgSrc": "../../images/home_2.png",
              "name": "国内水路、陆路货物运输保险(火灾爆炸交通基本险)",
              "explain": "众安保险承保",
              "price": "5"
            }
          ]
  },
  homeDetail:function(e){
    console.log(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../insure/insure?id='+ e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success:function(res){
        var userInfo = res.userInfo;
        // console.log(res)
      }
    });
    wx.login({
      success:function(res){
        // console.log(res)
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
    
  },
  


})
