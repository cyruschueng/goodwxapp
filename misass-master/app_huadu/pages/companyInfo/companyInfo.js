// pages/companyInfo/companyInfo.js

var trim = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 0,                //确认按钮背景标志
    companyName: '',          //企业名称
    companyNum: '',            //企业工商号
    companyAddr: '',           //企业地址
    companyWorkAddr: '',        //招聘地址
    companyPerson: '',             //法人代表
    phone: '',               //联系方式
    companyLat: '',  //企业经度
    companyLng: '',  //企业纬度
    ipnCode: '',     //验证码
    //countdown: '获取验证码',
    timeOut: null, //倒计时时间
    isChange: true,
    status:'',

  },

  //检查是否填写企业名称
  checkInputName: function (e) {
    this.setData({
      companyName: trim.trim(e.detail.value)
    })
  },

  //检查是否填写企业工商号
  checkInputNum: function (e) {
    this.setData({
      companyNum: trim.trim(e.detail.value)
    })
  },

  //检查是否填写企业地址
  checkInputAddr: function (e) {
    this.setData({
      companyAddr: trim.trim(e.detail.value)
    })
  },

  //定位招聘地址
  openLocation: function () {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userLocation']) {
          wx.chooseLocation({
            success: function (res) {
              //console.log(res)
              that.setData({
                companyWorkAddr: res.address,
                companyLat: res.latitude,
                companyLng: res.longitude,
              })
            },
          })
        } else {
          wx.chooseLocation({
            success: function (res) {
              that.setData({
                companyWorkAddr: res.address
              })
            },
            fail: function (res) {
              wx.openSetting({
                success: function (res) {
                  console.log(res);
                  if (res.authSetting['scope.userLocation'] == true) {
                    wx.chooseLocation({
                      success: function (res) {
                        that.setData({
                          companyWorkAddr: res.address
                        })
                      },
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  //检查是否填写企业法人代表
  checkInputFa: function (e) {
    this.setData({
      companyPerson: trim.trim(e.detail.value)
    })
  },

  //检查是否填写联系方式
  checkInputPhone: function (e) {
    this.setData({
      phone: trim.trim(e.detail.value)
    })
  },


  //企业手机号码修改跳转
  phoneJump: function (e) {
    var that = this;
    var dataPhone = that.data.phone;
    wx.navigateTo({
      url: '../phoneJump/phoneJump?status=1',
    })
  },


  //验证码
  checkCode: function (e) {
    //console.log(e.detail.value);
    this.setData({
      ipnCode: trim.trim(e.detail.value)
    })
  },
  //获取验证码
  gainTap: function () {
    var that = this;
    console.log(that.data.phone)
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/Edit_Getcode',
      method: 'POST',
      data: {
        phone: that.data.phone,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code == '100000') {
          wx.showModal({
            title: '提示',
            content: res.data.rand,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          if (that.data.isChange) {
            that.data.timeOut = 60;
            that.data.isChange = false;
            that.setData({
              countdown: that.data.timeOut
            });
            var clearTime = setInterval(function () {
              that.data.timeOut--
              that.setData({
                countdown: that.data.timeOut
              });
              if (that.data.timeOut <= 0) {
                clearInterval(clearTime);
                that.setData({
                  countdown: '获取验证码'
                });
                that.data.isChange = true;
              };
            }, 1000);
          };
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.error,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }

      },
      fail: function (res) {
        console.log(res)
      }

    });
  },

  //提交企业信息
  subCompanyInfo: function () {
    var that = this;
    var companyName = this.data.companyName;
    var companyNum = this.data.companyNum;
    var companyAddr = this.data.companyAddr;
    var companyWorkAddr = this.data.companyWorkAddr;
    var companyPerson = this.data.companyPerson;
    var phone = this.data.phone;
    var ipnCode = this.data.ipnCode;
    var regName = /^[\u2E80-\u9FFF]+$/;    //Unicode编码中的汉字范围
    var regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; //验证手机号
    if (!regName.test(companyPerson)) {
      wx.showModal({
        content: '请输入正确的中文名字',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else if (companyPerson.length <= 1 || companyPerson.length > 10) {
      wx.showModal({
        content: '名字长度不对',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } 
    else {
      wx.showLoading({
        title: '提交中',
        success: function () {
          setTimeout(function () {
            wx.request({
              url: 'https://xcx.misass.com/huadu/index.php?s=/api/User/enterprise_information',
              method: 'POST',
              data: {
                wecha_id: getApp().globalData.wecha_id,
                enterprise_name: companyName,
                business: companyNum,
                enterprise_username: companyPerson,
                //phone: phone,
                //code: ipnCode,
                address: companyAddr,
                hiring_address: companyWorkAddr,
                lat: that.data.companyLat,
                lng: that.data.companyLng,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res)
                if (res.data.code == '100000') {
                  wx.request({
                    url: 'https://xcx.misass.com/huadu/index.php?s=/api/User/info',
                    method: 'POST',
                    data: {
                      wecha_id: getApp().globalData.wecha_id
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      getApp().globalData.status = res.data.user.status;
                      wx.hideLoading();
                      wx.showToast({
                        title: '提交成功',
                      })
                      wx.navigateTo({
                          url:"../my/my"
                      })
                    }
                  })
                } else {
                  wx.hideLoading();
                  wx.showModal({
                    content: res.data.error,
                    showCancel: false,
                    confirmColor: '#29b6f6'
                  })
                }
              }
            })
          }, 1000)
        }
      })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/User/info',
      method: 'POST',
      data: {
        wecha_id: getApp().globalData.wecha_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        this.setData({
          companyName: res.data.user.enterprise_name,          //企业名称
          companyNum: res.data.user.business,            //企业工商号
          companyAddr: res.data.user.address,              //企业地址
          companyWorkAddr: res.data.user.hiring_address,           //企业招聘地址
          companyPerson: res.data.user.enterprise_username,             //法人代表
          phone: res.data.user.telphone,               //联系方式
        })
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
  onShareAppMessage: function () {

  }
})