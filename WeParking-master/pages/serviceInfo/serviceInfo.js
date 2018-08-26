// serviceInfo.js

var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    wechat:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
    })
    var that=this
    wx.request({
      url: app.globalData.serverUrl +'getServiceInfo.als',
      success:function(res){
        wx.hideLoading()
        if(res.data.status==0){
          that.setData({
            phone: res.data.servicePhone,
            wechat: res.data.wechatNumber
          })
        }else{
          wx.showToast({
            title: '出错了',
            icon:'loading',
            duration:1000
          })
        }
      },
      fail:function(){
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '网络不太通畅,请稍后再试',
        })
      }
    })
  },
  contactService:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  copyWechat:function(){
    wx.setClipboardData({
      data: this.data.wechat,
      success:function(res){
        wx.showModal({
          title: '提示',
          content: '客服微信已复制,请前去粘贴搜索',
          showCancel:false,
          confirmColor:'#f4c600'
        })
      }
    })
  }
})