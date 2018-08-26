// pages/mycard/mycard.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backimg: app.globalData.imgurl,
    smallimg: app.globalData.smallimg,
    info: '',
    userInfo: '',
    tel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this =this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    if (app.globalData.userInfo) {
      _this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          _this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
   var _this = this;
   console.info(options.userid);
   wx.request({
     url: app.globalData.url + 'apiUserInfo',
     data: { id: options.userid},
     method: 'POST',
     success: function (res) {
       _this.setData({
         info: res.data
       });
       if (options.alumniID) {
         wx.request({
           url: app.globalData.url + 'getXiaoyouhuiManage/' + options.alumniID,
           method: 'GET',
           success: function (res2) {
             var openid = app.globalData.openid;
             if (res.data.isopen == 1 && openid != res2.data.openid && openid != res.data.openid){
               _this.setData({
                 tel: res.data.tel.substring(0, 3) + "********" 

               });
             }else{
               _this.setData({
                 tel: res.data.tel
               });
             }
             wx.hideLoading();
          },
           fail: function (res) {
           }
         })
       }
     },
     fail: function (res) {
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
  
  }
})