var app = getApp()
var util = require('../../utils/util.js');
var date = new Date();

var hour = date.getHours()
hour = util.formatNumber(hour)
var minute = date.getMinutes()
minute = util.formatNumber(minute)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    aq_arr:[1,2],
    date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
    today: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    time: hour + ":" +minute
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     openid:wx.getStorageSync('openid')
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
  
  },

  btnAddAq:function(){
    (this.data.aq_arr).push(this.data.aq_arr.length + 1);
    this.setData({
      aq_arr:this.data.aq_arr,
      });
  },
  btnDelAq:function(e){
      (this.data.aq_arr).splice(e.currentTarget.id,1)
      this.setData({
        aq_arr: this.data.aq_arr,
      });
  },
  radioChange:function(e){
    for(var i = 1;i <= 3;i++)
    if(e.detail.value == i){
     this.setData({
       right:i
     })
    }

  },
  bindDateChange:function(e){
   this.setData({
   date:e.detail.value
   })
  },
  bindTimeChange: function (e) {
    this.setData({
    time: e.detail.value
    })
  },
  formSubmit:function(e){
    for (var i = 0; i < this.data.aq_arr.length;i++){
      if (e.detail.value["row[" + i + "][question]"] == '' || e.detail.value["row[" + i + "][answer][1]"] == '' || e.detail.value["row[" + i + "][answer][2]"] == '' || e.detail.value["row[" + i + "][answer][3]"] == '') {
        wx.showToast({
          title: '请完成所有设置',
          image: '../images/icon_warning.png'
        })
        return;
      }
    }
    wx.redirectTo({
      url: '../index/index',
    })
    wx.showToast({
      title: '等待审核',
      duration: 2000
    })
    // wx.request({
    //   url: app.globalData.server + '/api.php/V1/wenti',
    //   data: {
    //     code: e.detail.value
    //   },
    //   success:function(res){

    //   }
    // })
  }
})