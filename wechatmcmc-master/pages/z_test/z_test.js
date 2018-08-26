// pages/z_test/z_test.js
var session_id = wx.getStorageSync('session_id');
var openid = wx.getStorageSync('wxopenid');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  formsubmit:function(e){
    console.log(e);
    // wx.navigateTo({
    //   url: '../guanlijianli/guanlijianli',
    // })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // var that=this;

    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo,
    //   })
    // })
    // wx.request({
    //   url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=getList',
    //   data:{

    //   },
    //   success:function(e){
    //   console.log(e);
    //   }
    // })
    // // wx.showShareMenu({
    // //   withShareTicket: true
    // // })
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
    // console.log(urlarr[0]);
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
  // onShareAppMessage: function () {
  //   var that = this;
  //   return {
  //     title: '共享餐饮招聘机会',
  //     path: '/pages/activity/activity',
  //     success: function (res) {
  //       // 转发成功
  //       var session_key = wx.getStorageSync('session_key');
  //       console.log(res);
  //       wx.getShareInfo({
  //         shareTicket: res.shareTickets[0],
  //         success: function (e) {
  //           console.log(e);
  //           //解密获得群id
  //           wx.request({
  //             url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=getOpenGid2',
  //             method: 'post',
  //             data: {
  //               'session_key': session_key,
  //               'encryptedData': e.encryptedData,
  //               'iv': e.iv
  //             },
  //             header: {
  //               'Content-Type': 'application/x-www-form-urlencoded',
  //               'Cookie': 'PHPSESSID=' + session_id + '; path=/'
  //             },
  //             success: function (e) {
  //              console.log(e);
  //             }
              
  //           })
  //         },
  //         fail: function () {
  //           //分享的不是微信群，在这里提示
  //           wx.showModal({
  //             title: '提示',
  //             content: '分享的不是微信群',
  //             showCancel: false,
  //           })


  //         }
  //       })
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //       console.log(res);
  //     }
  //   }
  // }








  
})