
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "messagePage",
  /**
   * 页面的初始数据
   */

  data: {
  	
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(res) {
  
  },
  bindKeyInput: function (e) {
    if (this.data.index == 0) {
      this.setData({
        inputValue: e.detail.value,
        frameNo: e.detail.value
      })
    } else {
      this.setData({
        inputValue: e.detail.value,
        licenseNo: e.detail.value
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // if (getApp().data.userOpenId == null || getApp().data.userOpenId == "") {
    //   wx.showLoading({ title: '' });
    //   wx.login({
    //     success: function (res) {
    //       wx.request({
    //         url: 'https://51yangcong.com/568data/GetOpenId',
    //         //url: 'http://localhost:8880/568data/GetOpenId',
    //         method: 'POST',
    //         header: {
    //           'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         data: {
    //           'code': res.code
    //         },
    //         success: function success(res) {
    //           getApp().data.userOpenId = res.data.openid;
    //           wx.hideLoading();
    //         }
    //       });
    //     }
    //   });
    // }
    console.log("openid:" + getApp().data.userOpenId);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //以下为自定义点击事件

  tap_bafd41db: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },
  //投保查询
  tap_7a42cdda: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },
  //状态查询
  tap_a51bae1f: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },

  tap_483ab025: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },
  //出险查询
  tap_4f1610c5: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },
  //维保查询
  tap_WBJL: function (e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  }

})

