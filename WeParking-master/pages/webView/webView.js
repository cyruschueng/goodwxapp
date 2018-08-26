// webView.js
var app=getApp();
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    contentType:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var contentType=options.contentType
    //用户注册协议
    if(contentType==1){
      this.setData({
        title:'用户协议',
        contentType:contentType
      })
      this.getWebviewContent(contentType)
    }
    //关于我们
    else if(contentType==2){
      this.setData({
        title:'关于我们',
        contentType:contentType
      })
      this.getWebviewContent(contentType)
    }
  },
  onReady:function(){
    wx.setNavigationBarTitle({
      title:this.data.title,
    })
  },
  //获得webView内容
  getWebviewContent:function(contentType){
    var that=this
    wx.showLoading({
      title: '加载中',
    })
    //获得用户注册协议内容
    if(contentType==1){
        wx.request({
          url: app.globalData.serverUrl +'getUserAgreements.als',
          success:function(res){
            if(res.data.status==0){
              wx.hideLoading()
              WxParse.wxParse('content', 'html',res.data.result, that, 5);
            }else{
              wx.hideLoading()
              wx.showToast({
                title: '出错了',
                icon: 'loading',
                duration: 1000
              })
            }
          },fail:function(){
            wx.hideLoading()
            wx.showToast({
              title: '出错了',
              icon:'loading',
              duration:1000
            })
          }
        })
    }
    //获得关于我们内容
    else if(contentType==2){
      wx.request({
        url: app.globalData.serverUrl + 'getAboutUS.als',
        success: function (res) {
          if (res.data.status == 0) {
            wx.hideLoading()
            WxParse.wxParse('content', 'html', res.data.result, that, 5);
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '出错了',
              icon: 'loading',
              duration: 1000
            })
          }
        }, fail: function () {
          wx.hideLoading()
          wx.showToast({
            title: '出错了',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    }else{
      wx.hideLoading()
    }
  }
})