// cardadd.js
var common = require('../../common/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenstorage:'',
    swapstorage:'',
    id:'',
    card_comment:'',
    disabled: false,
    ad_status: 2,
    ad_comment:'',
    templateone: '资金充足，大量收柜台2/3/5/10/20/50/100/200/300的大小票，纸电同步，量大可上门，价格非常有优势',
    templatetwo: '银行承兑汇票买断，沈阳，大连，营口，鞍山，锦州，葫芦岛长期有人驻点，北三省高铁沿线随时上门，足月，不足月，银行，粘单不限，各种瑕疵，疑难杂票，批量100w50w20w 10w 银行不限',
    templatethree: '主打：不足年、不足月全授信城商农商\n全授信（100万以上）\n城商5.0+70\n农商5.1+70\n100万以下3个月以内单询\n百万以上5个月起收\n国股5-6个月4.65+50 \n半年以上4.63+50',
    bindForm:[],
    templateonecolor: '1',
    templatetwocolor: '1',
    templatethreecolor:'1'
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    var _this = this;
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
          loadingHidden: true
        })
      },
      fail: function (res) {
        _this.setData({
          tokenstorage: '',
          loadingHidden: true
        })
      }
    })
    //获取storage的swap
    wx.getStorage({
      key: 'swapstorage',
      success: function (res) {
        _this.setData({
          swapstorage: res.data,
        })
      }
    })
    if (options.id !== undefined) {
      this.carddetail(options.id)
    }
    this.WxValidate = app.globalDataValidate(
      {
        textarea: {
          required: true,
          maxlength: 500
        }
      }
      , {
        textarea: {
          required: '请填写业务推广',
          maxlength: '业务推广不能超过500字符'
        }
      }
    )
    _this.setData({
      disabled: false
    })
  },
  bindFormSubmit: function (e) {
    var _this = this;
    _this.setData({
      bindForm: e
    });
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        duration: 2000
      })
      return false
    }
    if (_this.data.id == undefined) {
      var url = '/dtk/advertisements';
      var method = 'POST';
      //var data = { 'ad_comment': e.detail.value.textarea, ad_status: e.detail.value.ad_status }
      var data = { 'ad_comment': e.detail.value.textarea, ad_status: 2 }
    } else {
      var url = '/dtk/advertisements/' + _this.data.id;
      var method = 'PUT';
      var data = { 'ad_comment': e.detail.value.textarea }
    }
    _this.setData({
      disabled: true
    });
    wx.request({
      url: common.getRequestUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.setStorageSync('xystorage', '0')
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          if (_this.data.id == undefined) {
            wx.redirectTo({
              url: '../carddetail/carddetail?id=' + res.data.advertisements_id
            })
          } else {
            wx.redirectTo({
              url: '../carddetail/carddetail?id=' + _this.data.id
            })
          }
          
        } else if (res.data.code == 'TOKEN_INVLID') {
          _this.exchangeToken()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      }
    })
  },
  carddetail: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/advertisements/' + e,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': _this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          _this.setData({
            loadingHidden: true,
            ad_comment: res.data.data[0].ad_comment,
            ad_status: res.data.data[0].ad_status
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //换取 token
  exchangeToken: function () {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/users/token',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'swap': _this.data.swapstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.setStorageSync('tokenstorage', res.data.token)

          _this.setData({
            tokenstorage: res.data.token
          })
          _this.bindFormSubmit(_this.data.bindForm)
        } else if (res.data.code == 'USER_NOT_LOGIN') {
          app.userLogin(e)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 2000
          })
          try {
            wx.setStorageSync('tokenstorage', '');
            wx.setStorageSync('swapstorage', '')
            wx.setStorageSync('myData', '')
            wx.setStorageSync('avatarInfo', '')
            _this.setData({
              tokenstorage: '',
              swapstorage: '',
              myData: '',
              srcavatar: '../../image/m.png'
            })
          } catch (e) {
          }
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
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

  onPullDownRefresh: function () {
  
  },
   */
  /**
   * 页面上拉触底事件的处理函数

  onReachBottom: function () {
  
  },
   */
  /**
   * 用户点击右上角分享
  
  onShareAppMessage: function () {
  
  }, */
  templateone: function () {
    var _this = this;
    _this.setData({
      ad_comment: _this.data.templateone
    })
    setTimeout(function () {
      _this.setData({
        templateonecolor: '1'
      })
    }, 200);
  },
  touchstarteone: function () {
    var _this = this;
    this.setData({
      templateonecolor: '0.4'
    })
  },
  templatetwo: function () {
    var _this = this;
    _this.setData({
      ad_comment: _this.data.templatetwo
    })
    setTimeout(function () {
      _this.setData({
        templatetwocolor: '1'
      })
    }, 200);
  },
  touchstartetwo: function () {
    var _this = this;
    this.setData({
      templatetwocolor: '0.4'
    })
  },
  templatethree: function () {
    var _this = this;
    _this.setData({
      ad_comment: _this.data.templatethree
    })
    setTimeout(function () {
      _this.setData({
        templatethreecolor: '1'
      })
    }, 200);
  },
  touchstartethree: function () {
    var _this = this;
    this.setData({
      templatethreecolor: '0.4'
    })
  },
  cleared: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        templateonecolor: '1',
        templatetwocolor: '1',
        templatethreecolor: '1'
      })
    }, 500);
  }
})