// pages/msgdetail/msgdetail.js
var WxParse = require('../../components/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: { 
      // id: 1, 'type': 2,
      // message: "<p>您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……</p>",
      // preview: "您参与的线下读书会活动，还有一天就要开始啦！快快准备吧……",
      // image: 'https://www.shtongnian.com/ueditor/php/upload/image/20171027/1509084896547518.jpg',
      // time: "2017-10-24 17:25",
    },
    logo: 'https://shtongnian.com/logo.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    console.log(id)
    var that = this;
    
    wx.getStorage({
      key: 'systemList',
      success: function(res) {
        var list = res.data;
        
        for(var i in list){
          console.log(list[i])
          if(list[i].id == id){
            that.setData({
              message: list[i]
            })
            break;
          }
        }

        WxParse.wxParse('moduContent', 'html', that.data.message.content, that, 0);
      },
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
  
  }
})