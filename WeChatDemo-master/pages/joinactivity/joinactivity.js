// pages/joinactivity/joinactivity.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'scaleToFill',
    topimg: app.globalData.imgpath + 'invite1.png',
    schoolinfo: '',
    xiaoyouinfo: '',
    activityinfo: '',
    src: app.globalData.smallimg,
    userimg: '',
    time: '',
    userinfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var _this = this;
    wx.request({
      url: app.globalData.url + 'apiActivityDetail',
      data: { id: options.id },
      method: 'POST',
      success: function (res) {
        if(res.data){
          _this.setData({
            activityinfo: res.data,
          })
          if(res.data.xiaoyouinfo != null){
            _this.setData({
              xiaoyouinfo: res.data.xiaoyouinfo,
            })
          }
          if(res.data.xiaoyou_id){
            wx.request({
              url: app.globalData.url + 'apiXiaoyouhuiDetail/' + res.data.xiaoyou_id,
              success: function (res2) {
                wx.hideLoading();
                if(res2.data.school_info != null){
                  _this.setData({
                    schoolinfo: res2.data.school_info,
                  })
                }
              },
              fail: function (res3) {
              }
            })
          }
        }
      }
    })
    wx.request({
      url: app.globalData.url + 'apiUserInfo',
      data: { id: options.userid },
      method: 'POST',
      success: function (res) {
        _this.setData({
          userimg: res.data.headImg,
          userinfo: res.data
        })
      },
      fail: function (res) {
      }
    })
    _this.setData({
      time: options.time,
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
  join: function(){
    wx.showLoading({
      title: '加载中',
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
                  var isexit = true;
                  for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].xiaoyou_id == _this.data.xiaoyouinfo.id) {
                      isexit = false;
                      break;
                    }
                  }
                  if (isexit) {
                    wx.hideLoading();
                    wx.showModal({
                      title: '',
                      content: '还没有加入校友会，请先加入该活动所属校友会',
                      showCancel: false,
                      confirmText: '知道了',
                      success: function (res) {
                        // wx.redirectTo({
                        //   url: '../personinvit/personinvit?id=' + _this.data.xiaoyouinfo.id + '&userid = ' + _this.data.userinfo.id,
                        // })
                        wx.navigateTo({
                          url: '../personinvit/personinvit?id=' + _this.data.xiaoyouinfo.id + '&userid=' + _this.data.userinfo.id,
                        })
                      }
                    })
                  } else {
                    var data = {
                      huodong_id: _this.data.activityinfo.id,
                      openid: openid,
                      openid_yaoqing: _this.data.userinfo.openid
                    }
                    wx.request({
                      url: app.globalData.url + 'apiBaoming',
                      data: data,
                      method: 'POST',
                      success: function (res) {
                        wx.hideLoading();
                        if (res.data == 'isset') {
                          wx.hideLoading();
                          wx.showModal({
                            title: '提示',
                            content: '您已经加入活动，不能重复加入',
                            confirmText: '知道了',
                            showCancel: false,
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  // url: '../activityinfo/activityinfo?id=' + _this.data.activityinfo.id,
                                  url: '../activitylist/activitylist',
                                })
                              }
                            }
                          })
                        } else if (res.data == 'success') {
                          wx.hideLoading();
                          wx.showModal({
                            title: '',
                            content: '加入成功！',
                            showCancel: false,
                            confirmText: '知道了',
                            success: function (res) {
                              wx.switchTab({
                                url: '../activitylist/activitylist',
                              })
                            }
                          })
                          // wx.showToast({
                          //   title: '加入成功',
                          //   icon: 'success',
                          //   duration: 1000,
                          //   mask: true
                          // });
                          // setTimeout(function () {
                          //   wx.switchTab({
                          //     // url: '../activityinfo/activityinfo?id=' + _this.data.activityinfo.id,
                          //     url: '../activitylist/activitylist',
                          //   })
                          // }, 1000);
                        }
                      },
                      fail: function (res) {
                        wx.hideLoading();
                      }
                    })
                  }
                },
                fail: function (res) {
                  wx.hideLoading();
                }
              })
            }
            wx.hideLoading();
          },
          fail: function (res) {
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
                var isexit = true;
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].xiaoyou_id == _this.data.xiaoyouinfo.id) {
                    isexit = false;
                    break;
                  }
                }
                if (isexit) {
                  wx.hideLoading();
                  wx.showModal({
                    title: '',
                    content: '还没有加入校友会，请先加入该活动所属校友会',
                    showCancel: false,
                    confirmText: '知道了',
                    success: function (res) {
                      // wx.redirectTo({
                      //   url: '../personinvit/personinvit?id=' + _this.data.xiaoyouinfo.id + '&userid=' + _this.data.userinfo.id,
                      // })
                      wx.navigateTo({
                        url: '../personinvit/personinvit?id=' + _this.data.xiaoyouinfo.id + '&userid=' + _this.data.userinfo.id,
                      })
                    }
                  })
                }else{
                  var data = {
                    huodong_id: _this.data.activityinfo.id,
                    openid: openid,
                    openid_yaoqing: _this.data.userinfo.openid
                  }
                  wx.request({
                    url: app.globalData.url + 'apiBaoming',
                    data: data,
                    method: 'POST',
                    success: function(res){
                      if (res.data == 'isset'){
                        wx.hideLoading();
                        wx.showModal({
                          title: '提示',
                          content: '您已经加入活动，不能重复加入',
                          confirmText: '知道了',
                          showCancel: false,
                          success: function(res){
                            if (res.confirm) {
                              wx.switchTab({
                                // url: '../activityinfo/activityinfo?id=' + _this.data.activityinfo.id,
                                url: '../activitylist/activitylist',
                              })
                            }
                          }
                        })
                      } else if (res.data == 'success'){
                        wx.hideLoading();
                        // wx.showToast({
                        //   title: '加入成功',
                        //   icon: 'success',
                        //   duration: 1000,
                        //   mask: true
                        // });
                        // setTimeout(function () {
                        //   wx.switchTab({
                        //     // url: '../activityinfo/activityinfo?id=' + _this.data.activityinfo.id,
                        //     url: '../activitylist/activitylist',
                        //   })
                        // }, 1000);
                        wx.showModal({
                          title: '',
                          content: '加入成功！',
                          showCancel: false,
                          confirmText: '知道了',
                          success: function (res) {
                            wx.switchTab({
                              url: '../activitylist/activitylist',
                            })
                          }
                        })
                      }
                    },
                    fail: function(res){
                      wx.hideLoading();
                    }
                  })
                }
              },
              fail: function (res) {
                wx.hideLoading();
              }
            })
          }
          wx.hideLoading();
        },
        fail: function (res) {
        }
      })
    }
  }
})