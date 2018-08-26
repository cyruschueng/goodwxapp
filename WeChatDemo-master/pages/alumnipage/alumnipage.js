// pages/alumnipage/alumnipage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: app.globalData.acimg,
    mode: 'scaleToFill',
    isAgree: false,
    creater: '../../image/creater.png',
    notice: '../../image/notice.png',
    addresslist: '../../image/addresslist.png',
    people: '../../image/right.png',
    activities: '',
    topmsg: app.globalData.imgurl,
    info:{},
    iscreater:false,
    headimg: '',
    hasactivity: false,
    addresslisturl: '',
    alumniId: '',
    noticelisturl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      alumniId: options.id
    })
    wx.request({
      url: app.globalData.url + 'apiXiaoyouhuiDetail/'+options.id,
      success:function(res){
        if (app.globalData.openid){
          if (app.globalData.openid == res.data.add_user){
            _this.setData({
              iscreater: true
            })
          }
        }
        _this.setData({
          info: res.data,
          addresslisturl: '../addresslist/addresslist?id=' + res.data.id,
          noticelisturl: '../noticelist/noticelist?id=' + res.data.id,
          headimg: app.globalData.imgpath + res.data.school_info.logo
        })
        if (res.data.activitys.length > 0){
          _this.setData({
            hasactivity: true
          })
        }
      },
      fail:function(res){
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
    var _this = this;
    wx.request({
      url: app.globalData.url + 'apiXiaoyouhuiDetail/' + _this.data.alumniId,
      success: function (res) {
        if (app.globalData.openid) {
          if (app.globalData.openid == res.data.add_user) {
            _this.setData({
              iscreater: true
            })
          }
        }
        _this.setData({
          info: res.data,
          addresslisturl: '../addresslist/addresslist?id=' + res.data.id,
          headimg: app.globalData.imgpath + res.data.school_info.logo
        })
        if (res.data.activitys.length > 0) {
          _this.setData({
            hasactivity: true
          })
        }
      },
      fail: function (res) {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var _this = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button') {
      // 来自页面内转发按钮
      var path = 'pages/personinvit/personinvit?id=' + _this.data.info.id + '&userid=' + _this.data.info.userinfo.id;
      return {
        title: '邀请函',
        path: path,
        success: function (res) {
          if (_this.data.info.is_connect == 1 && _this.data.info.wx_name == null) {
            if (res.errMsg == 'shareAppMessage:ok') {
              wx.getShareInfo({
                shareTicket: res.shareTickets[0],
                complete: function (res4) {
                  var session_key = wx.getStorageSync('session_key');
                  var updateOpenGId = {
                    alumniId: _this.data.info.id,
                    encryptedData: res4.encryptedData,
                    iv: res4.iv,
                    appid: app.globalData.appid,
                    sessionKey: session_key,
                    openid: app.globalData.openid
                  }
                  wx.request({
                    url: app.globalData.url + 'getOpenGid',
                    method: 'POST',
                    data: updateOpenGId,
                    success: function (res5) {
                      if (res5.data == 'isbuild') {
                        wx.showModal({
                          title: '绑定结果',
                          content: '校友会已绑定，绑定微信群失败',
                          showCancel: false,
                          confirmText: '知道了'
                        })
                      }else if (res5.data == '-41003') {
                        wx.showModal({
                          title: '绑定结果',
                          content: '绑定微信群失败,请重新绑定',
                          showCancel: false,
                          confirmText: '知道了'
                        })
                      } else if (res5.data == 'notmanage') {
                        wx.showModal({
                          title: '绑定结果',
                          content: '您不是校友会管理员，绑定失败',
                          showCancel: false,
                          confirmText: '知道了'
                        })
                      }else{
                        wx.showToast({
                          title: '绑定成功',
                          icon: 'success',
                          duration: 2000
                        })
                        wx.request({
                          url: app.globalData.url + 'apiXiaoyouhuiDetail/' + _this.data.alumniId,
                          success: function (res6) {
                            _this.setData({
                              info: res6.data,
                            })
                          },
                          fail: function (res) {
                          }
                        })
                      }
                    },
                    fail: function (res) {
                      wx.showModal({
                        title: '绑定结果',
                        content: '绑定微信群失败,服务器错误',
                        showCancel: false,
                        confirmText: '知道了'
                      })
                    }
                  })
                }
              })
            }
          }else{
            wx.showToast({
              title: '分享成功',
              icon: 'success',
              duration: 2000
            })
          }
        },
        complete: function (res){
          
        }
      }
    }else{
      wx.showToast({
        title: '分享成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
  /**
   * 编辑
   */
  edit: function(res){
    wx.navigateTo({
      url: '../alumnimanager/alumnimanager?id=' + this.data.info.id
    })
  },
  /**
   * 删除
   */
  deleted: function(res){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除',
            mask: true
          })
          wx.request({
            url: app.globalData.url + 'deleteXiaoyouhui/' + _this.data.info.id,
            success: function(res){
              wx.hideLoading();
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              wx.switchTab({
                url: '../alumnilist/alumnilist',
              })
            },
            fail: function(res){
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '删除失败',
                showCancel: false,
                confirmText: '知道了'
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  /**
   * 查看通讯录
   */
  lookAddress: function(){
    wx.navigateTo({
      url: this.data.addresslisturl,
    })
  }
})