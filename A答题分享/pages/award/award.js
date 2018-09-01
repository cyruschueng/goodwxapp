// pages/award/award.js
var util = require('../../utils/util.js');
Page({
  data: {
    userInfo:{},
    sessionKey:'',
    openid:'',
    chance:''
  },
  /* 生命周期函数--监听页面显示 */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'sessionKey',
      success: function (res) {
        that.setData({
          sessionKey: res.data.sessionKey,
          openid: res.data.openid
        })
      
        wx.request({
          url: util.Apis + "/h5/game/user/login",
          data: {
            openid: that.data.openid,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'  // 默认值
          },
          method: 'POST',
          success: function (res) {
            
              that.setData({
                userInfo: res.data.data,
                chance: res.data.data.chance
              })
            }
          })
      }
    })
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

  // 转发分享
  onShareAppMessage: function (res) {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button') {
      wx.showShareMenu({
        withShareTicket: true
      })
    }
    return {
      title: '荣耀大拷问',
      path: 'pages/index/index',
      imageUrl: 'http://yukicomic-pic.oss-cn-hangzhou.aliyuncs.com/XCX_rongyao/share.png',
      success: function (res) {
        console.log(res.shareTickets)
        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {
            
            //解密
            wx.request({
              url: util.Apis + "/h5/game/weChat/decodeUserInfo",
              data: {
                sessionKey: that.data.sessionKey,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'  // 默认值
              },
              method: 'POST',
              success: function (res) {
               
                //查询是否分享过该群
                wx.request({
                  url: util.Apis + "/h5/game/user/share",
                  data: {
                    openGId: res.data.data.openGId,
                    openid: that.data.openid,
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'  // 默认值
                  },
                  method: 'POST',
                  success: function (res) {
                    if (res.data.code) {
                      wx.showToast({
                        title: '请分享到不同的群',
                        icon: 'none',
                        duration: 2000
                      })
                    } else {
                     
                      that.setData({
                        chance: res.data.data
                      })
                    }
                  }
                })
              }
            })
          },
          fail(res) {
            
            wx.showToast({
              title: '请分享到不同的群',
              icon: 'none',
              duration: 2000
            })
          }
        })
        // 转发成功
      },
      fail: function (res) {
        
        // 转发失败
      }
    }

  }
})