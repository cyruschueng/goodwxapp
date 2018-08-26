// pages/test/test.js

const network = require('../../utils/NetType.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
      app:''
  },
  //返回上一层
  back: function () {    
      /*
        wx.navigateTo(OBJECT)跳转过来的 可以用wx.navigateBack(OBJECT)跳转返回
       如果是wx.redirectTo(Object) 跳转到此页面  所以不能使用wx.navigateBack(OBJECT)跳转回去

    */
    // // 此处是A页面
    // wx.navigateTo({
    //   url: 'B?id=1'
    // })

    // // 此处是B页面
    // wx.navigateTo({
    //   url: 'C?id=1'
    // })

    // 在C页面内 navigateBack，将返回A页面
    wx.navigateBack({
      delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页。 默认值为1
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const dev = network.devUel();  //获取固定的url  url在NetType里面设置     
    //network.networkget(del+"url",header,params) 接受三个参数 url：请求路径，请求header，params请求参数
      network.networkget(dev +"/customer/index/siteList", "'content-type':'application/json'",{page:2}).then((res)=>{
        console.log(res.data)
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