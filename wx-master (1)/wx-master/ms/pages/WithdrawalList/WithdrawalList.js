// 提现列表pages/WithdrawalList/WithdrawalList.js
var urlData = require('../../utils/util.js');
var app =getApp()
//提现列表
var withDrawalList = function(that,page){
  var str = {
    "OperationType": "10030",
    "uid": wx.getStorageSync("uid"),
    "page": page
  };
  console.log(wx.getStorageSync("uid"))
  console.log(that.data.page)
  //发起请求*
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10030)
      console.log(res)
      //page从1开始，
      if(that.data.page==1){
        if(res.data.data.length){
          //判断是否有体现记录
          that.setData({
            listData: res.data.data,
            show:false
          })
        }else{
          that.setData({
            show: true,
          })
        }
          
        console.log(10030)
      }else{
        console.log(10031)
        //如果page大于1，判断下一页是否有数据，有则开启上拉加载功能
        if (res.data.data.length && res.data.data!=that.data.listData){
          var arr = that.data.listData;
          //体现记录全部都加入listData
          for(var i = 0;i<res.data.data.length;i++){
           arr.push(res.data.data[i])
          }
          that.setData({
            listData:arr
          })
          console.log(res.data.data)
          console.log(that.data.page)
        }else{
          console.log(10032)
          wx.showToast({
            title: '没有数据了',
            image: "../../images/icon/f.png",
            duration: 1000,
            mask: true,
          })
          that.data.page--;
        }
      }
    }
  })
  
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    method:"T+0提现",
    jine:"", //提现金额
    listData:[], //提现记录列表
    page:1,  //提现页数
    show:""  //判断是否有体现记录bool
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
    var that = this;
    // //提现列表
    withDrawalList(that,1)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //页面退出后使page归为1，
    var that = this;
    that.setData({
      page:1
    })
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    that.setData({
      page: 1
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    that.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //下拉加载
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    that.data.page++;
    withDrawalList(that,that.data.page)
    console.log(that.data.page)
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})