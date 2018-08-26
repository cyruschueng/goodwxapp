// pages/details/details.js
var res=wx.getSystemInfoSync();
var h=res.windowWidth*0.3;
var top = (120 - res.windowWidth * 0.3)/2
var session_id = wx.getStorageSync('session_id');
var openid = wx.getStorageSync('wxopenid');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  height:h,
  top:top,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=getDetails',
      method: 'post',
      data: {
        'openid': openid,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
        var plus=0;
        var less=0;
        var info="";
       if(res.data.less){
         less = res.data.less;
       }
       if(res.data.plus){
          plus=res.data.plus
       }
      if(res.data.info){
        info = res.data.info;
        var len=res.data.info.length
        for(var i=0;i<len;i++){
          switch(info[i]['type']){
            case "0":
              info[i]['type']='金币充值'
              break;
            case "1":
              info[i]['type'] = '签到领取'
              break;
            case "2":
              info[i]['type'] = '分享领取'
              break;
            case "3":
              info[i]['type'] = '刷新职位'
              break;
            case "4":
              info[i]['type'] = '刷新店铺'
              break;
            case "5":
              info[i]['type'] = '下载简历'
              break;
          }
        }
      }
      console.log(info);
        that.setData({
          plus:plus,
          less:less,
          info:info
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