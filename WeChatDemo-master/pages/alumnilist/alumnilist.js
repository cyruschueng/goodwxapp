// pages/alumnilist/alumnilist.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    alumnis: '',
    src: '../../image/1.png',
    mode: 'scaleToFill',
    search: '',
    isshow: true
  },
  create: function () {
    wx.navigateTo({
      url: '../createpage/createpage',
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var _this=this;
    var openid = app.globalData.openid;
    if(openid != '' || openid != undefined){
      var datas = {
        keywords: e.detail.value,
        openid: openid
      }
      wx.request({
        url: app.globalData.url + 'apiXiaoyouList',
        data: datas,
        method: 'POST',
        success: function (res) {
          _this.setData({
            search: res.data
          });
        },
        fail: function (res) {
        }
      })
    }
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.userInfo) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
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
  onShow: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    var _this = this;
    var openid = wx.getStorageSync('openid');
    if (openid == '') {
      app.openIdReadyCallback = res => {
        var json = JSON.parse(res.data);
        openid = json.openid;
        wx.request({
          url: app.globalData.url + 'apiUserInfo',
          data: { openid: openid },
          method: 'POST',
          success: function (res) {
            if (res.data.name != "" && res.data.name != "null" && res.data.name != null) {
              wx.request({
                url: app.globalData.url + 'apiXiaoyouList',
                data: { openid: openid },
                method: 'POST',
                success: function (res) {
                  if (res.data == '') {
                    _this.setData({
                      isshow: false,
                    })
                  } else {
                    _this.setData({
                      isshow: true,
                    })
                  }
                  for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].schoolinfo != null) {
                      res.data[i].schoollogo = app.globalData.imgpath + res.data[i].schoolinfo.logo;
                    } else {
                      res.data[i].schoollogo = '../../image/1.png';
                    }
                  }
                  _this.setData({
                    alumnis: res.data,
                  })
                  wx.hideLoading();
                },
                fail: function (res) {
                  wx.hideLoading();
                }
              })
            } else {
              
              wx.reLaunch({
                url: '../personal/personal',
              })
            }
            wx.hideLoading();
          },
          fail: function (res) {
          }
        })
      }
    } else {
      wx.request({
        url: app.globalData.url + 'apiUserInfo',
        data: { openid: openid },
        method: 'POST',
        success: function (res) {
          if (res.data.name != "" && res.data.name != "null" && res.data.name != null) {
            wx.request({
              url: app.globalData.url + 'apiXiaoyouList',
              data: { openid: openid },
              method: 'POST',
              success: function (res) {
                if (res.data == '') {
                  _this.setData({
                    isshow: false,
                  })
                } else {
                  _this.setData({
                    isshow: true,
                  })
                }
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].schoolinfo != null) {
                    res.data[i].schoollogo = app.globalData.imgpath + res.data[i].schoolinfo.logo;
                  } else {
                    res.data[i].schoollogo = '../../image/1.png';
                  }
                }
                _this.setData({
                  alumnis: res.data,
                })
                wx.hideLoading();
              },
              fail: function (res) {
                wx.hideLoading();
              }
            })
          } else {
            wx.reLaunch({
              url: '../personal/personal',
            })
          }
          wx.hideLoading();
        },
        fail: function (res) {
        }
      })
    }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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
        wx.request({
          url: app.globalData.url + 'apiXiaoyouList',
          data: { openid: openid },
          method: 'POST',
          success: function (res) {
            if (res.data == '') {
              _this.setData({
                isshow: false,
              })
            } else {
              _this.setData({
                isshow: true,
              })
            }
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].schoolinfo != null) {
                res.data[i].schoollogo = app.globalData.imgpath + res.data[i].schoolinfo.logo;
              } else {
                res.data[i].schoollogo = '../../image/1.png';
              }
            }
            _this.setData({
              alumnis: res.data,
            })
            wx.hideLoading();
          },
          fail: function (res) {
            wx.hideLoading();
          }
        })
      }
    } else {
      wx.request({
        url: app.globalData.url + 'apiXiaoyouList',
        data: { openid: openid },
        method: 'POST',
        success: function (res) {
          if (res.data == '') {
            _this.setData({
              isshow: false,
            })
          } else {
            _this.setData({
              isshow: true,
            })
          }
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].schoolinfo != null) {
              res.data[i].schoollogo = app.globalData.imgpath + res.data[i].schoolinfo.logo;
            } else {
              res.data[i].schoollogo = '../../image/1.png';
            }
          }
          _this.setData({
            alumnis: res.data,
          })
          wx.hideLoading();
        },
        fail: function (res) {
          wx.hideLoading();
        }
      })
    }
  }
})