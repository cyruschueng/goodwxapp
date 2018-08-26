var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    index:'',
    rankNo3:[],
    dayList:[],
    monthList:[],
    dayRankBox:{}
  },
  onLoad: function (options) {
    var that = this
    wx.showShareMenu({        // 分享卡片，发送群ID和openid给后台；
      withShareTicket: true
    });
    
  },
  toIndex:function(){
    wx.redirectTo({
      url: '/pages/index/index?fromLoginOut=true',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  second10: function () {
    var that = this
    var num = 8
    var name  = setInterval(function(){
      that.setData({
        index: num
      })
      num--;
      if(num == 0){
        clearInterval(name)
        that.setData({
          index: ''
        })
      }
    },1000)
    },   
  onShow: function () {
    var that = this;
    that.second10()
    setTimeout(function(){
      if (wx.getStorageSync('shareDate')) {
        var dayRankBox = wx.getStorageSync('shareDate')
        console.log(that.data.dayRankBox)
        var rankNo3 = []
        if (dayRankBox.dayList.length <= 3) {
          rankNo3 = dayRankBox.dayList
        } else {
          rankNo3 = dayRankBox.dayList.slice(1, 3)
        }
        that.setData({
          dayRankBox: dayRankBox,
          rankNo3: rankNo3,
        })
        console.log(dayRankBox)
      }else{
        that.setData({
          index:'无排名'
        })
      }
      
    },8000)
  },
  /**
   * 生命周期函数--监听页面显示
   */

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
    var shareObj = util.shareFunc()
    return shareObj
  }
})