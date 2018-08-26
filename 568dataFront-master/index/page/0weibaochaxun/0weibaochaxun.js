
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();
var globalpos = -11;
// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page7",
  /**
   * 页面的初始数据
   */

  data: {
    vin : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
  },
  bindKeyInput: function (e) {
    var value = e.detail.value;
    var pos = e.detail.cursor;
    console.log(pos)
    console.log(value)
    if (globalpos != pos || pos==null) {
      globalpos = pos;
      this.setData({
        vin: value.toUpperCase()
      })
      console.log(value.toUpperCase())
      return value.toUpperCase();
    } else if (globalpos == pos){
      this.setData({
        vin: value.toUpperCase()
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    wx.hideLoading();
    app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  //以下为自定义点击事件
  tap_WBCX: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  }
})

