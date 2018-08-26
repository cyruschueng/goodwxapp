// pages/phone/phone.js
var util = require('../../utils/util.js');

var app = getApp();
var that;
var arr = null;
var time = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getCode: "获取验证码",
    coutDownStatus: false,//倒计时状态 false为没有倒计时
    message: "",
    phone: null,
    code: null,
    unionid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      }
    });

    arr = getCurrentPages();//获取全部页面进行传值
    arr[arr.length - 2].data.directBack = true;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.userInfo,
          unionid: options.unionid
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  getCodeTap: function(event){
    if (!that.data.coutDownStatus){
      if (that.data.phone != null) {
        that.setData({
          coutDownStatus: true
        })
        util.httpPost("/api/v1/sendWxMobileCode?mobile=" + that.data.phone, function (data) {
          if (data.status == "OK") {
            that.coutDown(60)
          } else {
            that.setData({
              coutDownStatus: false
            })
          }

          console.log(data);
          that.setData({
            message: data.msg
          });
        })
      }
    } 
  },

  coutDown: function(num){
      var data;
      time = setInterval(function(){
          num --;
          console.log(num)
          that.setData({
            getCode: num + "s",
            coutDownStatus: true
          })
          if (num == 0){
            clearInterval(time);
            that.setData({
              getCode: "获取验证码",
              coutDownStatus: false
            })
          }
      }, 1000);
  },

  formSubmit: function (e) {
    var data = e.detail.value;
    if (data.input == ""){
      that.setData({
        message: "手机号不能为空"
      })
    } else if (data.code == ""){
      that.setData({
        message: "验证码不能为空"
      })
    } else {
      if (that.data.unionid == null || that.data.unionid == undefined){
        wx.showToast({
          title: 'unionid获取失败',
          duration: 2000,
          icon: 'none'
        });
        return false;
      }
      console.log(that.data.unionid);
      var url = "/api/v1/sendWxValidateCode?mobile=" + data.input + "&code=" + data.code + "&unionid=" + that.data.unionid + "&nickname=" + that.data.userInfo.nickName + "&headimgurl=" + that.data.userInfo.avatarUrl;
      if (app.globalData.uid){
        url += "&uid=" + app.globalData.uid
      }
      util.httpPost(url, function (data) {
        console.log(data);
        that.setData({
          message: data.msg
        })
        if (data.status == "OK"){
          wx.showToast({
            title: '绑定成功',
            duration: 2000
          });
          setTimeout(function(){
            wx.navigateBack({
              delta: 2,
              success: function (res) {
                arr[arr.length - 2].data.whetherBinding = true
              }
            })
          }, 1000);
        }
      })
    }
  },

  inputBlur: function(e){
      console.log(e);
      if (e.detail.value == ""){
        that.setData({
          message: '手机号码不能为空'
        })
      } else if (!(/^1\d{10}$/.test(e.detail.value))) {
        that.setData({
          message: '手机号码输入不正确',
        })
      } else {
        that.setData({
          message: '',
          phone: e.detail.value
        })
      }
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
    clearInterval(time);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(time);
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