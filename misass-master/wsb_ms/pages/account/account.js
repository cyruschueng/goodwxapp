// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _phoneshow:false
  },
  //点击头像
  clickImg:function(e){
    console.log("点击头像")
  },
  //修改手机号码
  confimPhone: function (e) {
    console.log("修改手机号码")
    this.setData({
      _phoneshow:true
    })
  },
  //手机号码 取消弹窗
  closehide: function (e) {
    this.setData({
      _phoneshow: false
    })
  },
  //手机号码 确定弹窗
  phonesure: function (e) {
    this.setData({
      _phoneshow: false
    })
  },

  getphonenum: function (e) {
    let self = this;
    let strnum = e.detail.value;
    function isPoneAvailable(str) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(str)) {
        console.log('手机号码格式不正确');
        self.setData({
          phonenum: null
        })
      } else {
        self.setData({
          phonenum: strnum
        })
      }
    }
    isPoneAvailable(strnum)
  },
  //获取验证码
  getCode: function (e) {
    console.log(this.data.phonenum)
  },

  

  //退出登录
  quit:function(e){
    console.log("退出登录")
    wx.reLaunch({
      url: '../me/me',
    })
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