// pages/getjianli/getjianli.js
var token;
var name;
var qiyechakan;
var jianlishu;
var app = getApp()
Page({
  data: {
    userInfo: {},
    info: {},
    look: 0,
    phone: 0,
  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    token = options.token;
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    // 加载数据
    wx.showToast({
      title: '简历加载中…',
      icon: 'loading',
      duration: 10000
    });
    // 获取数据
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=download', //真实的接口地址
      data: {
        'token': token,
       
      },
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
        // console.log(res.data)
        name = res.data.name;
        jianlishu = res.data.jianlishu;
        qiyechakan = res.data.qiyechakan,

          that.setData({
            info: res.data,
            phone: res.data.haoma
          })
        // 隐藏提示
        wx.hideToast()
        if (res.data.lahei == 1) {
          wx.showModal({
            title: '提示',
            content: '该简历已被拉黑，请慎重',
            showCancel: false,
          })
        }
      },
      // 接口调用失败
      fail: function () {

      },
      complete: function () {
      }
    })

  },
  callphone: function (e) {
   // console.log(e);
              // 调用电话
              wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.id  
              })
         
      

      //更新数据
      // this.setData({
      //   userInfo: userInfo
      // })
 

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})