var common = require('../../common/common.js');
var util = require('../../common/util.js')
var app = getApp();
Page({
  data: {
    stardate: util.formatTime2(new Date),
    tokenstorage: '',
    swapstorage: '',
    showView: false,
    fundsTypeView: false,
    searchValue: '',
    corporationNameVal: '',
    corporationIdVal: '',
    array: [],
    index: 0,
    loadingHidden: true,
    disabled: false,
    bindForm: []
  },
  //日期空间
  bindStartDateChange: function (e) {
    this.setData({
      stardate: e.detail.value
    })
  },
  //提交表单
  formSubmit: function (e) {
    var that = this;
    that.setData({
      bindForm: e
    });
    if (that.data.array[that.data.index] == '其他' && e.detail.value.funds_other_type == ''){
      wx.showToast({
        title: '请输入业务类型',
        icon: 'cancel',
        duration: 2000
      })
      return false
    } else if (!this.WxValidate.checkForm(e)){
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        duration: 2000
      })
      return false
    }    
    if (that.data.array[that.data.index] == '其他'){
      var funds_type = e.detail.value.funds_other_type;
    }else{
      var funds_type = that.data.array[that.data.index];
    }
    //业务金额 0-1000000000，0时显示不限
    if (e.detail.value.funds_value ==''){
      var funds_value = 0;
    }else{
      var funds_value = Number(e.detail.value.funds_value + '0000');
    }
     //业务期限0-1000，0时显示不限
    if (e.detail.value.funds_duration == '') {
      var funds_duration = 0;
    } else {
      var funds_duration = Number(e.detail.value.funds_duration);
    }
    //日收益率0-1000，0时显示面议
    if (e.detail.value.yield_rate == '') {
      var yield_rate = 0;
    } else {
      var yield_rate = Math.floor(e.detail.value.yield_rate * 100) / 100;
    }

    that.setData({
      loadingHidden: false,
      disabled:true
    });
    wx.request({
      url: common.getRequestUrl + '/dtk/funds',
      data: {
        'funds_type': funds_type,
        'funds_value': funds_value,
        'funds_start_date': e.detail.value.funds_start_date,
        'funds_duration': funds_duration,
        'funds_bank': e.detail.value.funds_bank,
        'yield_rate': yield_rate,
        'customer_name': e.detail.value.customer_name,
        'address': e.detail.value.address,
        'funds_comment': e.detail.value.funds_comment
      },
      method: 'POST',
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
          that.setData({
            dataList: res.data.data,
            loadingHidden: true
          });
          wx.redirectTo({
            url: '../detail/detail?id=' + res.data.funds_id
          })
        } else if (res.data.code == 'TOKEN_INVLID') {
          that.exchangeToken(2)
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
  exchangeToken: function (e) {
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
          setTimeout(function () {
              if(e==1) {
                _this.fundTypes()
              } else if(e == 2) {
                _this.formSubmit(_this.data.bindForm)
              }
          }, 1000);
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
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
          swapstorage: res.data,
        })
      }
    })
    this.fundTypes();

    //表单验证
    this.WxValidate = app.globalDataValidate(
      {
        funds_value: {
          max:100000
        },
        funds_duration: {
          max: 1000
        },
        yield_rate: {
          max: 1000
        },
        customer_name:{
          maxlength:30
        },
        funds_bank: {
          maxlength: 30
        },
        address: {
          maxlength: 10
        },
        funds_comment: {
          maxlength: 500
        }
      }
      , {
        funds_value: {
          max: '业务金额不能\n大于10亿'
        },
        funds_duration: {
          max: '业务期限不能\n大于1000天'
        },
        yield_rate: {
          max: '日收益率不能\n大于1000‰'
        },
        customer_name: {
          maxlength: '客户名称不能\n超过30字符'
        },
        funds_bank: {
          maxlength: '所属银行不能\n超过30字符'
        },
        address: {
          maxlength: '交易地点不能\n超过10字符'
        },
        funds_comment: {
          maxlength: '业务备注不能\n超过500字符'
        }
      }
    )
    _this.setData({
      disabled: false
    })

  },
  //获取资金业务类型
  fundTypes:function(){
    var _this=this;
      wx.request({
        url: common.getRequestUrl + '/dtk/search/fund_types',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': _this.data.tokenstorage
        },
        success: function (res) {
          if (res.data.code == 'OK') {
            console.log(res.data.data)
            var fundType = [];
            for (var i = 0; i < res.data.data.length; i++) {
              fundType.push(res.data.data[i].fund_type);
            }
            fundType.push("其他");
            console.log(fundType)
            _this.setData({
              array: fundType
              //array: res.data.data
            })

          } else if (res.data.code == 'TOKEN_INVLID') {
            _this.exchangeToken(1)
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
  //点击列表进入详细页面
  listClick: function (event) {
    //var id = event.currentTarget.id
    var id = event.currentTarget.dataset.id;
    var corporationname = event.currentTarget.dataset.corporationname;
    var corporationid = event.currentTarget.dataset.corporationid;
    this.setData({
      searchValue: id,
      corporationNameVal: corporationname,
      corporationIdVal: corporationid,
      showView: false
    })
  },
   /**
   * 监听普通picker选择器
   */
  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value
    });
  }, 
  bindfundsType:function(){
    this.setData({
      fundsTypeView: true
    })
  },
  bindfundsTypehide: function () {
    this.setData({
      fundsTypeView: false
    })
  },
  bindfundsTypeClick: function (event) {
    //var id = event.currentTarget.id
    var id = event.currentTarget.dataset.id;
    this.setData({
      draftAuto: id,
      fundsTypeView: false
    })
  },
})
