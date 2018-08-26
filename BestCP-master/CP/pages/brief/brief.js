// pages/brief/brief.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座","天蝎座","摩羯座","射手座","水瓶座","双鱼座"],
    index: 0,
    imgURL: "http://www.bellazhang.cn/PNG/circle-button.png",
    age:20,
    gender: '未知',
    nickname: '',
    avatarUrl: '',
    model: "",
    screenHeight:"",
    isipx: false

  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  inputAge: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  goNext: function() {
    var that = this;
    
    wx.request({
      url: 'https://api.gentleleetommy.cn/bestcp/basicInfo', 
      data: {
        wx_id: wx.getStorageSync('wx_id'),
        gender: that.data.gender,
        age: that.data.age,
        constellation: that.data.array[that.data.index], 
        nickname: that.data.nickname,
        avatarUrl: that.data.avatarUrl       
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'POST',
      success: function (res) {
        console.log(res.data)
      }
    })
    wx.redirectTo({
      url: '../question/question'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mobileModel = wx.getSystemInfoSync().model;
    var dat = mobileModel.substring(0, mobileModel.lastIndexOf("X")) + "X";
    if(dat=="iPhone X")
    this.setData({
      isipx: true
    })
    this.setData({
      model: dat,
      screenHeight: wx.getSystemInfoSync().screenHeight,
    })
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var gen = res.userInfo.gender;
        if (gen == 1)
          gen = '男'
        else gen = '女'
        that.setData({
          gender: gen,
          avatarUrl: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
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