// pages/dynamic/cash/cash.js
var app = getApp();
var CashNumber = "";//提现金额
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0,//零钱
    canwithdraw:0,//可提现
    ShowPhoneInfo: true,
    CashNumber:0,
    bank_name: "工商银行",
    bank_no: "",
    bank_account_name: "",
    phone_num: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetUserDataInfo(app.globalData.user_id);
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
    this.GetUserDataInfo(app.globalData.user_id);
    wx.stopPullDownRefresh();
    setTimeout(function () {
      wx.showToast({
        title: '下拉刷新',
        icon: 'success',
        duration: 1000
      })
    }, 800)

  },
  //提现金额
  CashInput: function (e) {
    this.setData({
      CashNumber: e.detail.value
    })
    CashNumber = e.detail.value
  },
  powerDrawer: function (e) {
    this.setData({
      ShowPhoneInfo: false
    })
  },
  ShowMsgBg: function () {
    this.setData({
      ShowPhoneInfo: true
    })
  },
  //提现一部分
  Cashsome: function (){
    this.CashApply(this.data.CashNumber);
  },
  //提现全部
  Cashall: function () {
    this.CashApply(this.data.balance);
  },

  //提现方法
  CashApply: function (CashNumber){
    console.log(CashNumber);
    var that = this;
     wx.request({
       url: app.globalData.url +'/cash/cashapply/cashApply',
       method: 'POST',
       data: { user_id: app.globalData.user_id, money: CashNumber},
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         console.log(res);
         if (res.data.errcode == 0) {
           wx.showToast({
             title: res.data.errmsg,
             icon: 'success',
             duration: 1000
           })
           that.GetUserDataInfo(app.globalData.user_id);
          //  setTimeout(function () {
          //    wx.reLaunch({
          //      url: '/pages/circle/cricle'
          //    })
          //  }, 800);
         }else{
           wx.showToast({
             title: res.data.errmsg,
             icon: 'fail',
             duration: 1000
           })
         }
       }
     })
   },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  //银行名控件读取
  bank_nameInput: function (e) {
    this.setData({
      bank_name: e.detail.value
    })
    
  },
  //银行账号控件读取
  bank_noInput: function (e) {
    this.setData({
      bank_no: e.detail.value
    })
    
  },
  //银行开户名控件读取
  bank_account_nameInput: function (e) {
    this.setData({
      bank_account_name: e.detail.value
    })
    
  },
  //填写提现信息
  withdrawInfo:function(){
    console.log("5555555");
    var _this = this;
    wx.request({
      url: app.globalData.url +'/cash/cashapply/bindBankInfo',
      method: 'post',
      data: {
        user_id: app.globalData.user_id,
        bank_name: _this.data.bank_name,
        bank_no: _this.data.bank_no,
        bank_account_name: _this.data.bank_account_name
        // phone_num: options.fromId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
         console.log(res);
         _this.setData({
           ShowPhoneInfo: true
         })
         this.GetUserDataInfo(app.globalData.user_id);
      }
    })
     //哈哈哈
  },
  //提现记录
  Cashrecord:function(){
    wx.navigateTo({
      url: "/pages/myCenter/cash/cashRecord/cashRecord"
    })
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  GetUserDataInfo: function (userid) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/login/Login/getUserInfo',
      method: 'get',
      data: { user_id: userid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var resdata = res.data.data;
        that.setData({
          balance: resdata.balance,
          bank_account_name: resdata.bank_account_name,
          bank_name:resdata.bank_name,
          bank_no:resdata.bank_no
        })
      }
    })
  }
})