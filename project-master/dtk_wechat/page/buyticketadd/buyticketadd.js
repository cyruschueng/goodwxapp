var common = require('../../common/common.js');
var util = require('../../common/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenstorage: '',
    swapstorage: '',
    loadingHidden: true,
    acceptancetypetrue:true,
    acceptancetypefalse:'',
    acceptancevaluetrue: true,
    acceptancevaluefalse: '',
    acceptancetermtrue: true,
    acceptancetermfalse: '',
    acceptanceTypeChange: [],
    acceptanceValueChange: [],
    acceptanceTermChange: [],
    bindForm: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
      }
    })
    //获取storage的swap
    wx.getStorage({
      key: 'swapstorage',
      success: function (res) {
        _this.setData({
          swapstorage: res.data
        })
      }
    })

    //表单验证
    this.WxValidate = app.globalDataValidate(
      {
        address: {
          maxlength: 10
        },
        draft_comment: {
          maxlength: 500
        }
      }
      , {
        address: {
          maxlength: '交易地点不能超过10字符'
        },
        draft_comment: {
          maxlength: '业务备注不能超过500字符'
        }
      }
    )

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
  
  },  */

  /**
   * 页面上拉触底事件的处理函数
  
  onReachBottom: function () {
  
  },
 */
  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {
  
  },*/
  formSubmit: function (e) {
    var that=this;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        duration: 2000
      })
      return false
    }
    that.setData({
      disabled: true,
      bindForm: e
    });
    wx.request({
      url: common.getRequestUrl + '/dtk/drafts/buy',
      data: {
        'draft_type': e.detail.value.draft_type,
        'draft_value': e.detail.value.draft_value,
        'acceptance_type': e.detail.value.acceptance_type,
        'draft_term': e.detail.value.draft_term,
        'address': e.detail.value.address,
        'draft_comment': e.detail.value.draft_comment
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '../buyticketdetail/buyticketdetail?id=' + res.data.drafts_id
          })
        } else if (res.data.code == 'TOKEN_INVLID') {
          that.exchangeToken()
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
          _this.formSubmit(_this.data.bindForm)
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
  //承兑人不限与其他切换
  acceptanceTypeClick: function(e){
    var currentStatu = e.currentTarget.dataset.type;
    var _this=this;
    console.log(_this.data.acceptanceTypeChange.length)
    if (currentStatu==1){
      if (_this.data.acceptancetypetrue == true) {
        _this.setData({
          acceptancetypetrue: false
        })
      } else {
        _this.setData({
          acceptancetypetrue: true
        })
      }
      _this.setData({
        acceptancetypefalse: false
      })
    }else{
      if (_this.data.acceptanceTypeChange.length==0){
        _this.setData({
          acceptancetypetrue: true
        })
      }else{
        _this.setData({
          acceptancetypetrue: false
        })
      }
      
    }
  },
  //金额不限与其他切换
  acceptanceValueClick: function (e) {
    var currentStatu = e.currentTarget.dataset.type;
    var _this = this;
    if (currentStatu == 1) {
      if (_this.data.acceptancevaluetrue == true) {
        _this.setData({
          acceptancevaluetrue: false
        })
      } else {
        _this.setData({
          acceptancevaluetrue: true
        })
      }
      _this.setData({
        acceptancevaluefalse: false
      })
    } else {
      if (_this.data.acceptanceValueChange.length == 0) {
        _this.setData({
          acceptancevaluetrue: true
        })
      } else {
        _this.setData({
          acceptancevaluetrue: false
        })
      }
    }
  },
  //期限不限与其他切换
  acceptanceTermClick: function (e) {
    var currentStatu = e.currentTarget.dataset.type;
    var _this = this;
    if (currentStatu == 1) {
      if (_this.data.acceptancetermtrue == true) {
        _this.setData({
          acceptancetermtrue: false
        })
      } else {
        _this.setData({
          acceptancetermtrue: true
        })
      }
      _this.setData({
        acceptancetermfalse: false
      })
    } else {
      if (_this.data.acceptanceTermChange.length == 0) {
        _this.setData({
          acceptancetermtrue: true
        })
      } else {
        _this.setData({
          acceptancetermtrue: false
        })
      }
    }
  },
  acceptanceTypeChange:function(e){
    var _this = this;
    _this.setData({
      acceptanceTypeChange: e.detail.value
    })
  },
  acceptanceValueChange: function (e) {
    var _this = this;
    _this.setData({
      acceptanceValueChange: e.detail.value
    })
  },
  acceptanceTermChange: function (e) {
    var _this = this;
    _this.setData({
      acceptanceTermChange: e.detail.value
    })
  }
})