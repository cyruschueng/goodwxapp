// pages/components/worker-footer/worker-footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    textColor: {
      type: String
    },
    textColorMessage: {
      type: String
    },
    textColorMy: {
      type: String
    },
    workPath: {
      type: String
    },
    messagePath: {
      type: String
    },
    myPath: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    code: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toIndex: function() {
      wx.redirectTo({
        url: '../index/index'
      })
    },
    toMessage: function() {
      var that = this;
     
      // 获取用户信息
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            if(getApp().globalData.phone == null) {
              wx.navigateTo({
                url: '../login/login',
              })
            }else {
              wx.redirectTo({
                url: '../message/message'
              })
            }
            
          } else {
            wx.login({
              success: function(res) {
                that.setData({
                  code: res.code
                })

                wx.getUserInfo({
                  success: function (res) {
                    //console.log(res)
                  },
                  fail: function () {
                    wx.showModal({
                      title: '提示',
                      content: '如果不进行用户授权将无法使用本产品的其它功能，是否授权？',
                      success: function (res) {
                        if (res.confirm) {
                          wx.openSetting({
                            success: function (o) {
                              if (o.authSetting['scope.userInfo'] == true) {
                                wx.getUserInfo({
                                  success: function(res) {
                                    wx.request({
                                      url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/wx_user',
                                      method: 'POST',
                                      data: {
                                        code: that.data.code,
                                        encryptedData: res.encryptedData,
                                        iv: res.iv
                                      },
                                      header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                      },
                                      success: function (res) {
                                        console.log(res)
                                        getApp().globalData.wecha_id = res.data.user.wecha_id;
                                        getApp().globalData.wecha_name = res.data.user.wecha_name;
                                        getApp().globalData.headImg = res.data.user.img;
                                        getApp().globalData.status = res.data.user.status;
                                        getApp().globalData.phone = res.data.user.telphone;
                                        console.log(getApp().globalData.wecha_id);

                                        if (getApp().globalData.phone == null) {
                                          wx.navigateTo({
                                            url: '../login/login',
                                          })
                                        } else {
                                          wx.redirectTo({
                                            url: '../message/message'
                                          })
                                        }
                                      }
                                    })
                                  }
                                })
                              }
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            })        
          }
        }
      })
      
    },
    toMy: function() {
      var that = this;
      // 获取用户信息
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.redirectTo({
              url: '../my/my'
            })
          } else {
            wx.login({
              success: function (res) {
                that.setData({
                  code: res.code
                })

                wx.getUserInfo({
                  success: function (res) {
                    //console.log(res)
                  },
                  fail: function () {
                    wx.showModal({
                      title: '提示',
                      content: '如果不进行用户授权将无法使用本产品的其它功能，是否授权？',
                      success: function (res) {
                        if (res.confirm) {
                          wx.openSetting({
                            success: function (o) {
                              if (o.authSetting['scope.userInfo'] == true) {
                                wx.getUserInfo({
                                  success: function (res) {
                                    wx.request({
                                      url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/wx_user',
                                      method: 'POST',
                                      data: {
                                        code: that.data.code,
                                        encryptedData: res.encryptedData,
                                        iv: res.iv
                                      },
                                      header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                      },
                                      success: function (res) {
                                        console.log(res)
                                        getApp().globalData.wecha_id = res.data.user.wecha_id;
                                        getApp().globalData.wecha_name = res.data.user.wecha_name;
                                        getApp().globalData.headImg = res.data.user.img;
                                        getApp().globalData.status = res.data.user.status;
                                        getApp().globalData.telphone = res.data.user.telphone;
                                        console.log(getApp().globalData.wecha_id);
                                        wx.redirectTo({
                                          url: '../my/my'
                                        })
                                      }
                                    })
                                  }
                                })
                              }
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
  }
})
