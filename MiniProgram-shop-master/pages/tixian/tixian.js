// pages/tixian/tixian.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:'',
    process_items:[
      { url: '/image/logo11.png', title: '提交成功' },
      { url: '/image/logo12.png', title: '等待审核' },
      { url: '/image/logo13.png', title: '提现成功' },
    ]
  },
  //金额判断
  bindMoney:function(event){
    let moneyValue = event.detail.value;
    var isMoney =true;
    var that = this
    if (moneyValue < 1){
      isMoney = false
      wx.showToast({
        title: '最低额度为1元',
        icon: '',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
    } else if (moneyValue > that.data.balance){
      isMoney = false;
      wx.showToast({
        title: '余额不足',
        icon: '',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
    }
    if (isNaN(moneyValue)) {
      isMoney = false
      wx.showToast({
        title: '不是数字',
        icon: '',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
    }
    that.setData({
      isMoney: isMoney
    })
  },
  //电话号码判断
  bindPhone:function(event){
    let phoneValue = event.detail.value;
    var that = this;
    var isPhone = true;
    if (isNaN(phoneValue) || phoneValue.length !== 11){
      isPhone = false
      wx.showToast({
        title: '号码格式不对',
        icon: '',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
    }
    that.setData({
      isPhone: isPhone
    })
  },
  //微信判断
  bindWeChat: function (event){
    let WeChatValue = event.detail.value;
    let that = this;
    let isWeChat = true;
    if (WeChatValue == '' || WeChatValue == null){
      isWeChat = false;
      wx.showToast({
        title: '输入微信号',
        icon: '',
        image: '',
        duration: 1000,
        mask: true,
      })
    }
    that.setData({
      isWeChat: isWeChat
    })
  },

  //提交表单
  formSubmit:function(event){
    console.log(event.detail.value)
    var that = this
    console.log(that.data)
    if (!that.data.isMoney || !that.data.isPhone || !that.data.isWeChat){
      wx.showToast({
        title: '请输入正确内容',
        icon: 'success',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
      return false
    }
    wx.request({
      url: web_url + '/app.php?c=Withdraw&act=add',
      data: {
        userid: that.data.user_id,
        phone: event.detail.value.phone,
        money: event.detail.value.money,
        WeChat: event.detail.value.weChat,
        allmoney: that.data.balance
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if (res.errMsg){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            image: '',
            duration: 800,
            mask: true,
            success: function(res) {},
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
    }
    // console.log('options', options)
    that.setData({
      balance: options.balance
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