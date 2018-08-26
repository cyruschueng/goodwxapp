// pages/kami/kami.js
var app = getApp();
var urlData = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus1: true,
    focus2: "",
    focus3: "",
    phone: "",
    pwd: "",
    num: "",
    getBtnText: "发送验证码",
    arr: "",
    getName: "getName",
    getNum: "getNum",
    inputPwd: "inputPwd",
    code: "",
    disa: false,
    SurplusNum: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var str = {
      'OperationType': '10049',
      "uid": wx.getStorageSync("uid")
    }
    wx.request({
      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(res)
        if (res.data.CODE = "00") {
          that.setData({
            SurplusNum: res.data.data[0].SurplusNum
          })
        }
      }
    })

    var arr = [
      {
        src: "../../images/kami/1.png",
        password: false,
        focus: that.data.focus1,
        inputGet: that.data.getName,
        value: that.data.phone,
        placehold: "请输入下发账号"
      },
      {
        src: "../../images/kami/2.png",
        password: false,
        focus: that.data.focus2,
        inputGet: that.data.getNum,
        value: that.data.num,
        placehold: "请输入下发数量"
      },
      {
        src: "../../images/kami/3.png",
        password: true,
        focus: that.data.focus3,
        inputGet: that.data.inputPwd,
        value: that.data.pwd,
        placehold: "请输入下发交易密码"
      }
    ]
    that.setData({
      arr: arr
    })
  },

  //获取下发账号：
  getName: function (e) {
    this.setData({
      phone: e.detail.value
    })
    if (this.data.phone.length == 11) {
      this.setData({
        focus2: true
      })
    }
  },

  //获取下发账号：
  getNum: function (e) {
    this.setData({
      num: e.detail.value
    })
  },

  //获取下发账号：
  inputPwd: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  getCode: function (e) {
    console.log("改变验证码")
    this.setData({
      code: e.detail.value
    })
    console.log(e.detail.value)
  },

  //发送验证码
  sendCode: function () {
    var that = this;
    urlData.sendCode(that, wx.getStorageSync("userData").username, that.data.disa, that.data.getBtnText)
  },

  send: function () {
    var that = this;
    var str = {
      'OperationType': '10002',
      "mobile": wx.getStorageSync("phone"),
      "code": that.data.code
    }
    console.log(wx.getStorageSync("phone"))
    console.log(that.data.code)
    wx.request({
      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(10002)
        console.log(res)
        if (res.data.CODE == "00") {
          var str = {
            "OperationType": "10044",
            "uid": wx.getStorageSync("uid"),
            "phone": that.data.phone,
            "paypwd": that.data.pwd,
            "ShareCount": that.data.num
          }

          //发起请求*
          wx.request({
            url: app.globalData.url,
            data: str,
            method: 'POST',
            header: { "content-type": "application/json" },
            success: function (res) {
              console.log(res)
              if (res.data.CODE = "00") {
                that.setData({
                  phone: "",
                  pwd: "",
                  num: "",
                  code: ""
                })
                wx.switchTab({
                  url: "../index/index",
                })
              }
            }
          })

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.MESSAGE,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.setData({
                  code: ""
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                that.setData({
                  code: ""
                })
              }
            }
          })
        }
      }
    })
    //10044

  },

  sendkami:function(){
    var that = this;
    wx.navigateTo({
      url: '../sendkami/sendkami',
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