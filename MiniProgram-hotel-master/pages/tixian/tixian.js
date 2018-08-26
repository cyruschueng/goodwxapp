// pages/tixian/tixian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0,
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
    console.log(phoneValue.length)
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
  //提交表单
  formSubmit:function(event){
    console.log(event.detail.value)
    var that = this
    console.log(that.data)
    if (!that.data.isMoney || !that.data.isPhone ){
      wx.showToast({
        title: '请输入正确内容',
        icon: 'success',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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