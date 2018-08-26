// lingqu.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yh:[],
    height:0,
    // status:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var that = this; 
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=yhq',
      data:{
        openid:openid,
      },
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success:function(res){
        // console.log(res.data.yh);
      //   var zhuangtai=[];
      //   var a = res.data.yh;
      //  for(var i=0;i<res.data.yh.length;i++){
      //    zhuangtai[i] = a[i]['status']
      //  }
        wx.getSystemInfo({
          success: function(e) {
            that.setData({
              yh: res.data.yh,
              // status:zhuangtai,
              height:e.windowHeight
          })
          },
        })
        
      }
    })
  },
  ling:function(e){
        // console.log(e);
        var that=this;
    var id = e.currentTarget.dataset.id;
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=ling',
      data:{
        openid:openid,
        id:id
      },
      method:"post",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success:function(res){
        // console.log(res.data);
       that.setData({
         yh: res.data.yh,
       })
        wx.showModal({
          title: res.data.title,
          content: res.data.content,
          showCancel:false
        })
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
  
  }
})