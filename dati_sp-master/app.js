//app.js
App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        wx.setStorageSync('userInfo', res.userInfo)
        wx.setStorageSync('hasUserInfo', true)
      }
    })
    var that = this
    wx.checkSession({
      success: function () {
    wx.getStorage({
      key: 'wxid',
      success: function (res) {
        wx.request({
          url: that.globalData.server + '/api/Sp/check',
          data: {
            wxid: res.data
          },
          success: function (res) {
            switch(res.data.msg){
              case 'islocked':
                wx.showToast({
                  title: '账号已被冻结',
                  icon:'none'
                })
                break;
              case 'error':
              wx.showToast({
                title: '请稍后重试',
                icon: 'none'
              })
              break;
            }
          },
          fail: function () {
            wx.showToast({
              title: '请稍后重试',
              icon: 'none'
            })
          }
        })
      },
          fail: function () {
            wx.login({
              success: function (res) {
                wx.request({
                  url: that.globalData.server + '/api/Sp/login',
                  data: {
                    js_code: res.code
                  },
                  success: function (res) {
                    if (res.data.msg == 'success') {
                      wx.setStorage({
                        key: 'wxid',
                        data: res.data.data['wxid'],
                      })
                      wx.request({
                        url: that.globalData.server + '/api/Sp/check',
                        data: {
                          wxid: res.data.data['wxid']
                        },
                        success: function (res) {
                          switch (res.data.msg) {
                            case 'islocked':
                              wx.showToast({
                                title: '账号已被冻结',
                                icon: 'none'
                              })
                              break;
                            case 'error':
                              wx.showToast({
                                title: '请稍后重试',
                                icon: 'none'
                              })
                              break;
                          }
                        },
                        fail: function () {
                          wx.showToast({
                            title: '请稍后重试',
                            icon: 'none'
                          })
                        }
                      })
                    } else {
                      wx.showToast({
                        title: '请稍后重试',
                        icon: 'none'
                      })
                    }
                  },
                  fail: function () {
                    wx.showToast({
                      title: '请稍后重试',
                      icon: 'none'
                    })
                  }
                })
              },
              fail: function () {
                wx.showToast({
                  title: '请稍后重试',
                  icon: 'none'
                })
              }
            })
          }
        })
      },
      fail: function () {
        wx.login({
          success: function (res) {
            wx.request({
              url: that.globalData.server + '/api/Sp/login',
              data: {
                js_code: res.code
              },
              success: function (res) {
                if (res.data.msg == 'success') {
                  wx.setStorage({
                    key: 'wxid',
                    data: res.data.data['wxid'],
                  })
                  wx.request({
                    url: that.globalData.server + '/api/Sp/check',
                    data: {
                      wxid: res.data.data['wxid']
                    },
                    success: function (res) {
                      switch (res.data.msg) {
                        case 'islocked':
                          wx.showToast({
                            title: '账号已被冻结',
                            icon: 'none'
                          })
                          break;
                        case 'error':
                          wx.showToast({
                            title: '请稍后重试',
                            icon: 'none'
                          })
                          break;
                      }
                    },
                    fail: function () {
                      wx.showToast({
                        title: '请稍后重试',
                        icon: 'none'
                      })
                    }
                  })
                } else {
                  wx.showToast({
                    title: '请稍后重试',
                    icon: 'none'
                  })
                }
              },
              fail: function () {
                wx.showToast({
                  title: '请稍后重试',
                  icon: 'none'
                })
              }
            })
          },
          fail: function () {
            wx.showToast({
              title: '请稍后重试',
              icon: 'none'
            })
          }
        })
      }
    })
        
  },
  onShow: function (options) {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)\

    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        wx.setStorageSync('userInfo', res.userInfo)
        wx.setStorageSync('hasUserInfo', true)
      }
    })
    var that = this
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'wxid',
          success: function (res) {
            wx.request({
              url: that.globalData.server + '/api/Sp/check',
              data: {
                wxid: res.data
              },
              success: function (res) {
                switch (res.data.msg) {
                  case 'islocked':
                    wx.showToast({
                      title: '账号已被冻结',
                      icon: 'none'
                    })
                    break;
                  case 'error':
                    wx.showToast({
                      title: '请稍后重试',
                      icon: 'none'
                    })
                    break;
                }
              },
              fail: function () {
               wx.showToast({
                 title: '请稍后重试',
                 icon: 'none'
               })
              }
            })
          },
          fail: function () {
            wx.login({
              success: function (res) {
                wx.request({
                  url: that.globalData.server + '/api/Sp/login',
                  data: {
                    js_code: res.code
                  },
                  success: function (res) {
                    if (res.data.msg == 'success') {
                      wx.setStorage({
                        key: 'wxid',
                        data: res.data.data['wxid'],
                      })
                      wx.request({
                        url: that.globalData.server + '/api/Sp/check',
                        data: {
                          wxid: res.data.data['wxid']
                        },
                        success: function (res) {
                          switch (res.data.msg) {
                            case 'islocked':
                              wx.showToast({
                                title: '账号已被冻结',
                                icon: 'none'
                              })
                              break;
                            case 'error':
                              wx.showToast({
                                title: '请稍后重试',
                                icon: 'none'
                              })
                              break;
                          }
                        },
                        fail: function () {
                          wx.showToast({
                            title: '请稍后重试',
                            icon: 'none'
                          })
                        }
                      })
                    } else {
                      wx.showToast({
                        title: '请稍后重试',
                        icon: 'none'
                      })
                    }
                  },
                  fail: function () {
                    wx.showToast({
                      title: '请稍后重试',
                      icon: 'none'
                    })
                  }
                })
              },
              fail: function () {
                wx.showToast({
                  title: '请稍后重试',
                  icon: 'none'
                })
              }
            })
          }
        })
      },
      fail: function () {
        wx.login({
          success: function (res) {
            wx.request({
              url: that.globalData.server + '/api/Sp/login',
              data: {
                js_code: res.code
              },
              success: function (res) {
                if (res.data.msg == 'success') {
                  wx.setStorage({
                    key: 'wxid',
                    data: res.data.data['wxid'],
                  })
                  wx.request({
                    url: that.globalData.server + '/api/Sp/check',
                    data: {
                      wxid: res.data.data['wxid']
                    },
                    success: function (res) {
                      switch (res.data.msg) {
                        case 'islocked':
                          wx.showToast({
                            title: '账号已被冻结',
                            icon: 'none'
                          })
                          break;
                        case 'error':
                          wx.showToast({
                            title: '请稍后重试',
                            icon: 'none'
                          })
                          break;
                      }
                    },
                    fail: function () {
                      wx.showToast({
                        title: '请稍后重试',
                        icon: 'none'
                      })
                    }
                  })
                } else {
                  wx.showToast({
                    title: '请稍后重试',
                    icon: 'none'
                  })
                }
              },
              fail: function () {
                wx.showToast({
                  title: '请稍后重试',
                  icon: 'none'
                })
              }
            })
          },
          fail: function () {
            wx.showToast({
              title: '请稍后重试',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  globalData: {
    server: "https://www.17dati.com.cn",
    res_path: "https://www.17dati.com.cn/assets"
  }
})