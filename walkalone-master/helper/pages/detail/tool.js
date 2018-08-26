// pages/detail/tool.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      func_name:'',   //哈希函数
      data:'',
      pwd:'',
      result:'这里显示哈希后的结果'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.name)
    this.data.func_name = options.name;
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

  copyResult(e){
    wx.setClipboardData({
      data: this.data.result,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
      }
    })
  },

  bindTextAreaBlur:function (e){
    //console.log(this.data.data)
    this.setData({
      data: e.detail.value
    })
  },

  calculator:function(){
    var that = this;
    setTimeout(function(){
      if(that.data.data == '' || that.data.data == undefined || that.data.data == null){
        wx.showToast({
          title: '请输入需要哈希的数据',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
      }
      wx.request({
        url: app.globalData.apiDomain + '/smallContent/calculator',
        data: { 'func_name': that.data.func_name, 'data': that.data.data, 'pwd':that.data.pwd },
        success: res => {
          that.setData({result:res.data.msg})
        }
      })
    }
    ,100)
  },
})