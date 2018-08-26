// pages/personinvit/personinvit.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'scaleToFill',
    img: '../../image/1.png',
    topmsg: app.globalData.imgurl,
    alumniInfo: '',
    userinfo: '',
    schoollogo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    if (!app.globalData.userInfo) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
    var _this = this;
    if(options){
      wx.request({
        url: app.globalData.url + 'apiXiaoyouhuiDetail/' + options.id,
        success: function (res) {
          _this.setData({
            alumniInfo: res.data,
            schoollogo: app.globalData.imgpath + res.data.school_info.logo
          })
          wx.request({
            url: app.globalData.url + 'apiUserInfo',
            data: { id: options.userid },
            method: 'POST',
            success: function (res2) {
              wx.hideLoading();
              _this.setData({
                userinfo: res2.data,
                img: res2.data.headImg,
              });
            },
            fail: function (res) {
            }
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (ops) {

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
   * 加入校友会
   */
  join: function(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var _this = this;
    var openid = wx.getStorageSync('openid');
    if (openid == '') {
      app.openIdReadyCallback = res => {
        var json = JSON.parse(res.data);
        openid = json.openid;
        //判断是否添加个人信息
        wx.request({
          url: app.globalData.url + 'apiUserInfo',
          data: { openid: openid },
          method: 'POST',
          success: function (res) {
            if (res.data.name == "" || res.data.name == "null" || res.data.name == null) {
              wx.hideLoading();
              wx.showModal({
                title: '',
                content: '请先编辑个人信息',
                showCancel: false,
                confirmText: '知道了',
                success: function (res) {
                  // wx.reLaunch({
                  //   url: '../personal/personal',
                  // })
                  wx.navigateTo({
                    url: '../personal/personal',
                  })
                }
              })
            } else {
              //判断是否已经加入此校友会
              wx.request({
                url: app.globalData.url + 'apiXiaoyouList',
                data: { openid: openid },
                method: 'POST',
                success: function (res) {
                  var isexit = false;
                  for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].xiaoyou_id == _this.data.alumniInfo.id) {
                      isexit = true;
                      break;
                    }
                  }
                  if (isexit) {
                    wx.hideLoading();
                    wx.showModal({
                      title: '',
                      content: '已经加入校友会，不能重复加入',
                      showCancel: false,
                      confirmText: '知道了',
                      success: function (res) {
                        wx.switchTab({
                          url: '../alumnilist/alumnilist',
                        })
                      }
                    })
                  } else {
                    //判断是否是从绑定的微信群小卡片跳转过来的用户
                    if (_this.data.alumniInfo.is_connect == 1 && _this.data.alumniInfo.wx_name != null && _this.data.alumniInfo.wx_name != 'null' && _this.data.alumniInfo.wx_name != '') {
                      var shareTicket = wx.getStorageSync('shareTicket');
                      if (shareTicket != '') {
                        wx.getShareInfo({
                          shareTicket: shareTicket,
                          complete: function(res3){
                            var session_key = wx.getStorageSync('session_key');
                            var updateOpenGId = {
                              alumniId: _this.data.alumniInfo.id,
                              encryptedData: res3.encryptedData,
                              iv: res3.iv,
                              appid: app.globalData.appid,
                              sessionKey: session_key
                            }
                            wx.request({
                              url: app.globalData.url + 'getopenID',
                              method: 'POST',
                              data: updateOpenGId,
                              success: function (res) {
                                if (res.data == '-41001' || res.data == '-41002') {
                                  wx.hideLoading();
                                  wx.showModal({
                                    title: '',
                                    content: '加入失败,登录失效,请重新加入',
                                    showCancel: false,
                                    confirmText: '知道了'
                                  })
                                  return;
                                }
                                if (res.data == false) {
                                  wx.hideLoading();
                                  wx.showModal({
                                    title: '',
                                    content: '加入失败,请重新通过小卡片加入',
                                    showCancel: false,
                                    confirmText: '知道了'
                                  })
                                  return;
                                }
                                var openGid = JSON.parse(res.data);
                                if (openGid.openGId != _this.data.alumniInfo.wx_name) {
                                  wx.hideLoading();
                                  wx.showModal({
                                    title: '',
                                    content: '您没有权限加入此校友会,请通过绑定微信群加入校友会',
                                    showCancel: false,
                                    confirmText: '知道了',
                                    success: function (res) {
                                      wx.switchTab({
                                        url: '../alumnilist/alumnilist',
                                      })
                                    }
                                  })
                                } else {
                                  //加入校友会
                                  var data = {
                                    openid: openid,
                                    xiaoyou_id: _this.data.alumniInfo.id
                                  }
                                  wx.request({
                                    url: app.globalData.url + 'apiEnterXiaoyou',
                                    method: 'POST',
                                    data: data,
                                    success: function (res) {
                                      wx.hideLoading();
                                      wx.showModal({
                                        title: '',
                                        content: '加入成功！',
                                        showCancel: false,
                                        confirmText: '知道了',
                                        success: function () {
                                          var pagelength = getCurrentPages().length;
                                          if (pagelength == 1) {
                                            wx.switchTab({
                                              url: '../alumnilist/alumnilist',
                                            })
                                          } else {
                                            wx.navigateBack({
                                              delta: 1
                                            })
                                          }
                                        }
                                      })
                                      // wx.showToast({
                                      //   title: '加入成功',
                                      //   icon: 'success',
                                      //   duration: 1000,
                                      //   mask: true
                                      // });
                                      // setTimeout(function () {
                                      //   var pagelength = getCurrentPages().length;
                                      //   if (pagelength == 1) {
                                      //     wx.switchTab({
                                      //       url: '../alumnilist/alumnilist',
                                      //     })
                                      //   } else {
                                      //     wx.navigateBack({
                                      //       delta: 1
                                      //     })
                                      //   }
                                      // }, 1000);
                                    },
                                    fail: function (res) {
                                      wx.hideLoading();
                                      wx.showModal({
                                        title: '',
                                        content: '服务器错误，请退出重试',
                                        showCancel: false,
                                        confirmText: '知道了'
                                      })
                                    }
                                  })
                                }
                              },
                              fail: function (res) {
                                wx.hideLoading();
                                wx.showModal({
                                  title: '',
                                  content: '服务器错误，请退出重试',
                                  showCancel: false,
                                  confirmText: '知道了'
                                })
                              }
                            })
                          }
                        })
                      } else {
                        wx.hideLoading();
                        wx.showModal({
                          title: '',
                          content: '加入失败,请通过绑定微信群加入校友会',
                          showCancel: false,
                          confirmText: '知道了',
                          success: function () {
                            wx.switchTab({
                              url: '../alumnilist/alumnnilist',
                            })
                          }
                        })
                      }
                    } else {
                      //加入校友会
                      var data = {
                        openid: openid,
                        xiaoyou_id: _this.data.alumniInfo.id
                      }
                      wx.request({
                        url: app.globalData.url + 'apiEnterXiaoyou',
                        method: 'POST',
                        data: data,
                        success: function (res) {
                          if (res.data != 'error') {
                            wx.hideLoading();
                            wx.showModal({
                              title: '',
                              content: '加入成功！',
                              showCancel: false,
                              confirmText: '知道了',
                              success: function () {
                                var pagelength = getCurrentPages().length;
                                if (pagelength == 1) {
                                  wx.switchTab({
                                    url: '../alumnilist/alumnilist',
                                  })
                                } else {
                                  wx.navigateBack({
                                    delta: 1
                                  })
                                }
                              }
                            })
                            // wx.showToast({
                            //   title: '加入成功',
                            //   icon: 'success',
                            //   duration: 1000,
                            //   mask: true
                            // });
                            // setTimeout(function () {
                            //   var pagelength = getCurrentPages().length;
                            //   if (pagelength == 1) {
                            //     wx.switchTab({
                            //       url: '../alumnilist/alumnilist',
                            //     })
                            //   } else {
                            //     wx.navigateBack({
                            //       delta: 1
                            //     })
                            //   }
                            // }, 1000);
                          } else {
                            wx.hideLoading();
                            wx.showModal({
                              title: '',
                              content: '加入失败！',
                              showCancel: false,
                              confirmText: '知道了',
                              success: function () {
                                wx.switchTab({
                                  url: '../alumnilist/alumnilist',
                                })
                              }
                            })
                          }

                        },
                        fail: function (res) {
                          wx.hideLoading();
                          wx.showModal({
                            title: '',
                            content: '服务器错误，请退出重试',
                            showCancel: false,
                            confirmText: '知道了'
                          })
                        }
                      })
                    }
                  }
                },
                fail: function (res) {
                  wx.hideLoading();
                  wx.showModal({
                    title: '',
                    content: '服务器错误，请退出重试',
                    showCancel: false,
                    confirmText: '知道了'
                  })
                }
              })
            }
          },
          fail: function (res) {
            wx.hideLoading();
            wx.showModal({
              title: '',
              content: '服务器错误，请退出重试',
              showCancel: false,
              confirmText: '知道了'
            })
          }
        })
      }
    } else {
      //判断是否添加个人信息
      wx.request({
        url: app.globalData.url + 'apiUserInfo',
        data: { openid: openid },
        method: 'POST',
        success: function (res) {
          if (res.data.name == "" || res.data.name == "null" || res.data.name == null) {
            wx.hideLoading();
            wx.showModal({
              title: '',
              content: '请先编辑个人信息',
              showCancel: false,
              confirmText: '知道了',
              success: function (res) {
                // wx.reLaunch({
                //   url: '../personal/personal',
                // })
                wx.navigateTo({
                  url: '../personal/personal',
                })
              }
            })
          } else {
            //判断是否已经加入此校友会
            wx.request({
              url: app.globalData.url + 'apiXiaoyouList',
              data: { openid: openid },
              method: 'POST',
              success: function (res) {
                var isexit = false;
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].xiaoyou_id == _this.data.alumniInfo.id) {
                    isexit = true;
                    break;
                  }
                }
                if (isexit) {
                  wx.hideLoading();
                  wx.showModal({
                    title: '',
                    content: '已经加入校友会，不能重复加入',
                    showCancel: false,
                    confirmText: '知道了',
                    success: function (res) {
                      wx.switchTab({
                        url: '../alumnilist/alumnilist',
                      })
                    }
                  })
                } else {
                  //判断是否是从绑定的微信群小卡片跳转过来的用户
                  if (_this.data.alumniInfo.is_connect == 1 && _this.data.alumniInfo.wx_name != null && _this.data.alumniInfo.wx_name != 'null' && _this.data.alumniInfo.wx_name != '') {
                    var shareTicket = wx.getStorageSync('shareTicket');
                    if (shareTicket != '') {
                      wx.getShareInfo({
                        shareTicket: shareTicket,
                        complete: function (res3) {
                          var session_key = wx.getStorageSync('session_key');
                          var updateOpenGId = {
                            alumniId: _this.data.alumniInfo.id,
                            encryptedData: res3.encryptedData,
                            iv: res3.iv,
                            appid: app.globalData.appid,
                            sessionKey: session_key
                          }
                          wx.request({
                            url: app.globalData.url + 'getopenID',
                            method: 'POST',
                            data: updateOpenGId,
                            success: function (res) {
                              if (res.data == '-41001' || res.data == '-41002') {
                                wx.hideLoading();
                                wx.showModal({
                                  title: '',
                                  content: '加入失败,登录失效,请重新加入',
                                  showCancel: false,
                                  confirmText: '知道了'
                                })
                                return;
                              }
                              if (res.data == false) {
                                wx.hideLoading();
                                wx.showModal({
                                  title: '',
                                  content: '加入失败,请重新通过小卡片加入',
                                  showCancel: false,
                                  confirmText: '知道了'
                                })
                                return;
                              }
                              var openGid = JSON.parse(res.data);
                              if (openGid.openGId != _this.data.alumniInfo.wx_name) {
                                wx.hideLoading();
                                wx.showModal({
                                  title: '',
                                  content: '您没有权限加入此校友会,请通过绑定微信群加入校友会',
                                  showCancel: false,
                                  confirmText: '知道了',
                                  success: function (res) {
                                    wx.switchTab({
                                      url: '../alumnilist/alumnilist',
                                    })
                                  }
                                })
                              } else {
                                //加入校友会
                                var data = {
                                  openid: openid,
                                  xiaoyou_id: _this.data.alumniInfo.id
                                }
                                wx.request({
                                  url: app.globalData.url + 'apiEnterXiaoyou',
                                  method: 'POST',
                                  data: data,
                                  success: function (res) {
                                    wx.hideLoading();
                                    wx.showModal({
                                      title: '',
                                      content: '加入成功！',
                                      showCancel: false,
                                      confirmText: '知道了',
                                      success: function () {
                                        var pagelength = getCurrentPages().length;
                                        if (pagelength == 1) {
                                          wx.switchTab({
                                            url: '../alumnilist/alumnilist',
                                          })
                                        } else {
                                          wx.navigateBack({
                                            delta: 1
                                          })
                                        }
                                      }
                                    })
                                    // wx.showToast({
                                    //   title: '加入成功',
                                    //   icon: 'success',
                                    //   duration: 1000,
                                    //   mask: true
                                    // });
                                    // setTimeout(function () {
                                    //   var pagelength = getCurrentPages().length;
                                    //   if (pagelength == 1) {
                                    //     wx.switchTab({
                                    //       url: '../alumnilist/alumnilist',
                                    //     })
                                    //   } else {
                                    //     wx.navigateBack({
                                    //       delta: 1
                                    //     })
                                    //   }
                                    // }, 1000);
                                  },
                                  fail: function (res) {
                                    wx.hideLoading();
                                    wx.showModal({
                                      title: '',
                                      content: '服务器错误，请退出重试',
                                      showCancel: false,
                                      confirmText: '知道了'
                                    })
                                  }
                                })
                              }
                            },
                            fail: function (res) {
                              wx.hideLoading();
                              wx.showModal({
                                title: '',
                                content: '服务器错误，请退出重试',
                                showCancel: false,
                                confirmText: '知道了'
                              })
                            }
                          })
                        }
                      })
                    }else{
                      wx.hideLoading();
                      wx.showModal({
                        title: '',
                        content: '加入失败,请通过绑定微信群加入校友会',
                        showCancel: false,
                        confirmText: '知道了',
                        success: function(){
                          wx.switchTab({
                            url: '../alumnilist/alumnnilist',
                          })
                        }
                      })
                    }
                  }else{
                    //加入校友会
                    var data = {
                      openid: openid,
                      xiaoyou_id: _this.data.alumniInfo.id
                    }
                    wx.request({
                      url: app.globalData.url + 'apiEnterXiaoyou',
                      method: 'POST',
                      data: data,
                      success: function (res) {
                        if(res.data != 'error'){
                          wx.hideLoading();
                          wx.showModal({
                            title: '',
                            content: '加入成功！',
                            showCancel: false,
                            confirmText: '知道了',
                            success: function () {
                              var pagelength = getCurrentPages().length;
                              if (pagelength == 1) {
                                wx.switchTab({
                                  url: '../alumnilist/alumnilist',
                                })
                              } else {
                                wx.navigateBack({
                                  delta: 1
                                })
                              }
                            }
                          })
                          // wx.showToast({
                          //   title: '加入成功',
                          //   icon: 'success',
                          //   duration: 1000,
                          //   mask: true
                          // });
                          // setTimeout(function () {
                          //   var pagelength = getCurrentPages().length;
                          //   if (pagelength == 1) {
                          //     wx.switchTab({
                          //       url: '../alumnilist/alumnilist',
                          //     })
                          //   } else {
                          //     wx.navigateBack({
                          //       delta: 1
                          //     })
                          //   }
                          // }, 1000);
                        }else{
                          wx.hideLoading();
                          wx.showModal({
                            title: '',
                            content: '加入失败！',
                            showCancel: false,
                            confirmText: '知道了',
                            success: function () {
                              wx.switchTab({
                                url: '../alumnilist/alumnilist',
                              })
                            }
                          })
                        }
                        
                      },
                      fail: function (res) {
                        wx.hideLoading();
                        wx.showModal({
                          title: '',
                          content: '服务器错误，请退出重试',
                          showCancel: false,
                          confirmText: '知道了'
                        })
                      }
                    })
                  }
                }
              },
              fail: function (res) {
                wx.hideLoading();
                wx.showModal({
                  title: '',
                  content: '服务器错误，请退出重试',
                  showCancel: false,
                  confirmText: '知道了'
                })
              }
            })
          }
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showModal({
            title: '',
            content: '服务器错误，请退出重试',
            showCancel: false,
            confirmText: '知道了'
          })
        }
      })
    }
  },

})