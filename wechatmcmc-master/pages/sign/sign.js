// sign.js
var res = wx.getSystemInfoSync();
var h = res.windowHeight;
// var session_id = wx.getStorageSync('session_id');
// var openid = wx.getStorageSync('wxopenid');
// var session_id = wx.getStorageSync('session_id');
// var openid = wx.getStorageSync('wxopenid');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   height:h,
   display:'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  close:function(){
      this.setData({
        display:'none'
      })
  },
  onLoad: function () {
     var that=this;
    
     app.getUserInfo(function (userInfo) {
       //更新数据
       that.setData({
         userInfo: userInfo,
       })
     })
     var session_id = wx.getStorageSync('session_id');
     var openid = wx.getStorageSync('wxopenid');
     wx.request({
       url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=checkSign',
       method:'post',
       data:{
         'openid':openid,
       },
       header: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Cookie': 'PHPSESSID=' + session_id + '; path=/'
       },
       success:function(e){
         console.log(e);
          that.setData({
            status:e.data
          })
       }
     }) 
  },

  sign:function(e){
    var that=this;
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    console.log(e.detail.formId);
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=moreFormId',
      data: {
        'openid': openid,
        'formId': e.detail.formId
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {
        console.log(e);
      }
    })
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=getSignJinbi',
      method: 'post',
      data: {
        'openid': openid,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success:function(e){
        console.log(e);
        if(e.data!=0){
          that.setData({
            status: 1,
            display:'block',
            day:e.data.day,
            jinbi:e.data.jinbi,
          })
        }
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
    var that = this;

    return {
      title: '签到领取金币',
      path: '/pages/sign/sign',
      }
  }
})