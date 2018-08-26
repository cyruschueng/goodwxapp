// pages/login/login.js

var trim = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: null,
    second: 60,
    flag: 1,
    status:''
  },

  //获取手机
  getPhone: function (e) {
    var phone1 = trim.trim(e.detail.value);
    console.log(4564)
    this.setData({
      phone: phone1
    })
  },

  //获取验证码
  getCode: function (e) {
    var code1 = trim.trim(e.detail.value);
    this.setData({
      code: code1,
    })
  },

  //发送验证码到手机
  sendCode: function () {
    var that = this;
    console.log(that.data.phone)
    var re = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (that.data.phone === '') {
      wx.showModal({
        content: '请填写手机号码',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else  if (!re.test(that.data.phone)) {
      wx.showModal({
        content: '请填写正确的手机号码',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else {
      this.setData({
        flag: -1
      });
      wx.request({
        url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/Getcode',
        method: 'POST',
        data: {
          phone: that.data.phone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var str = '';
          str = res.data.rand;
          if (res.data.code == '100000') {
            wx.showModal({
              content: str
            })
          } else if (res.data.code == '2') {
            wx.showModal({
              content: '当前不能操作',
              confirmColor: '#29b6f6',
              showCancel: false
            })
          }
          that.setData({
            flag: 0
          })
          that.countTime();
        }
      })
    }
  },

  //倒计时
  countTime: function () {
    var that = this;
    var inter = setInterval(function () {
      var count = that.data.second;
      count = count - 1;

      that.setData({
        second: count
      });
      if (count == 0) {
        that.setData({
          second: 60,
          flag: 1
        });
        clearInterval(inter);
      }
    }, 1000)
  },
  // 登陆
  toIndex: function () {
    var that = this;
    var re = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    var phone = that.data.phone;
    var code = that.data.code;
    console.log(code)
    if (phone == '') {
      wx.showModal({
        content: '请填写手机号码',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else if (!re.test(phone)) {
      wx.showModal({
        content: '请输入正确的手机号码',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else if (code == null) {
      wx.showModal({
        content: '请填写验证码',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else {
      wx.request({
        url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/login',
        method: 'POST',
        data: {
          phone: that.data.phone,
          code: that.data.code,
          wecha_id: getApp().globalData.wecha_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.code == '1') {
            wx.showModal({
              content: '验证码或手机错误',
              confirmColor: '#29b6f6',
              showCancel: false
            })
          } else if (res.data.code == '2') {
            wx.showModal({
              content: '验证码过期',
              confirmColor: '#29b6f6',
              showCancel: false
            })
          } else if (res.data.code == '100000') {
            getApp().globalData.phone = that.data.phone;
            if (that.data.status ==0) {
              wx.navigateTo({
                url: "../my/my"
              })
            }  
            if (that.data.status == 1){
              wx.navigateTo({
                url:"../companyInfo/companyInfo"
              })
            }      
         }
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: options.status
    });
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