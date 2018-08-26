// pages/zapay/zapay.js
//倒计时
var app = getApp();  
function countdown(that) {
  var second = that.data.second;
  var minute = that.data.minute;
  var time = setTimeout(function () {
    if (second ==0){
      second = 60;
      that.setData({
        minute: minute - 1
      });
    }
    if (second <= 10) {
      that.setData({
        second: '0'+ (second - 1)
      });
    }else{
      that.setData({
        second: second - 1
      });
    }
    countdown(that);
  }, 1000)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minute:29,
    second:60,
    num:'1140_EC1402018020500145600',
    name:'货运险(综合险)',
    money:'￥100.00',
    _wxChange:false,
  },


  wxChange: function(e){
    let self = this;
    if (self.data._wxChange) {
      self.setData({
        _wxChange: false
      })
    } else {
      self.setData({
        _wxChange: true
      })
    }
  },
  //确认支付
  payType:function(){
    if (this.data._wxChange){
      app.globalData.payTypeName = '支付宝支付';
      let payTypeName = app.globalData.payTypeName;
      console.log('ali')
      wx.switchTab({
        url: '../list/list',
      })
    }else{
      app.globalData.payTypeName = '微信支付';
      let payTypeName = app.globalData.payTypeName;
      console.log('wx');
      wx.switchTab({
        url: '../list/list',
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    countdown(this)
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