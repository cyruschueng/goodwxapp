// pages/queryzaocao/queryzaocao.js
Page({
  data: {
    xh: '',//学号
    stime: '',//从缓存中取 kaixueriqi
    diaryList: [],
    hiddenLoading: true
  },
  queryBox: function (e) {
    const that = this;
    that.setData({
      xh: e.detail.value.xhinput//获取学号 通过表单

      
    })
  },
  query: function (e) {//打卡次数查询
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    })
    var that = this
    wx.request({
      url: getApp().data.queryzaocao,//全局变量
      data: {
        xh: this.data.xh,
        stime: this.data.stime,
        etime: transDate(new Date())//当前时间
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          hiddenLoading: true,
          name: res.data.name,
          sclass: res.data.class,
          cishu: res.data.cishu,
        })
      }
    })
  },
  queryDetail: function () {//打卡详情查询
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    })
    var that = this
    console.log(transDate(new Date()))
    wx.request({
      url: getApp().data.queryDetailzaocao,
      data: {
        xh: this.data.xh,
        stime: this.data.stime.replace(/-/g, ''),
        etime: transDate(new Date()).replace(/-/g, '')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        that.setData({
          hiddenLoading: true,
          diaryList: res.data
        })
      }
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
    this.setData({
      stime: wx.getStorageSync('kaixueriqi')
    })
    console.log(this.data.stime.replace(/-/g, ''))
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
function transDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}