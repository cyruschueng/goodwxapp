var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 3
  },
  onLoad(options){
    var that = this;
    console.log("options：", options);
    var options = options;
    wx.setStorageSync("options", options);
    if (options.scene) {
      let scene = decodeURIComponent(options.scene);
      console.log('scene', scene);
      var strs = new Array(); //定义一数组 
      strs = scene.split("_"); //字符分割 
      console.log(strs);
      console.log("idol_id:", strs[3]);
      this.setData({
        idol_id: strs[3]
      })
      wx.setStorageSync('idol_id', strs[3]);
    }
    // 二维码
    // if (options.scene) {
    //   var scenes = options.scene;
    //   if (scenes.indexOf("fg_doyuunsme") != -1) {  //fg_doyuunsme包含字符串
    //     let scene = decodeURIComponent(options.scene);
    //     console.log("scene:", scene);
    //     var strs = new Array(); //定义一数组 
    //     strs = scene.split("_"); //字符分割 
    //     console.log(strs);
    //     console.log("friend_mid1:", strs[2]);
    //     console.log("g_id1:", strs[3]);
    //     var friend_mid = strs[2];
    //     var g_id = strs[3];
    //     wx.setStorageSync("scene", options.scene);
    //     wx.setStorageSync("friend_mid", friend_mid);
    //     wx.setStorageSync("g_id", g_id);
    //     // that.setData({
    //     //   scene: options.scene,
    //     //   friend_mid: friend_mid,
    //     //   g_id: g_id
    //     // })
    //   }

    // }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    let time = that.data.time;
    var second = that.data.second;
    wx.request({
      url: "https://unify.playonweixin.com/site/get-advertisements?operator_id=" + app.data.kid,
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          var advers = res.data.adver.advers;
          var head_adver = res.data.adver.head_adver;
          var broadcasting = res.data.adver.broadcasting;
          wx.setStorageSync("advers", advers);
          wx.setStorageSync("broadcasting", broadcasting);
          that.setData({
            head_adver
          })

          var inter = setInterval(function () {
            if (second <= 1) {
              clearInterval(inter);
              wx.switchTab({
                url: '../indexs/indexs',
              })
            }
            second--;
            console.log(second);
            that.setData({
              second,
              inter
            })
          }, 1000)
        }
      }
    })
  },


  jumpAd() {
    var inter = this.data.inter;
    clearInterval(inter);
    wx.switchTab({
      url: '../indexs/indexs',
    })
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
  // onShareAppMessage: function () {
  //   return {
  //     path: '/pages/index/index',
  //     success: function (res) {
  //       console.log(res);
  //       // 转发成功
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //       // 转发失败
  //     }
  //   }
  // }
})
