// pages/kongbai/kongbai.js
var apputil = require('../../utils/util.js')
var imgurl = "http://odbsh2xd4.bkt.clouddn.com/qw/img.jpg";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.imgurl) {
      imgurl = options.imgurl;
    }
    console.log(options);
    if (options.userid) {
      app.globalData.fid = options.userid;//传参过来的用户id从来比较当前用户id，不一样则入库加积分
    }
    var xinxi = wx.getStorageSync('userInfo');
    var myopenid = xinxi.openid;
    console.log(myopenid);
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth + "px";
        var height = res.windowHeight + "px";
        if (myopenid.length > 10) {
          that.setData({
            width: res.windowWidth + "px",
            height: res.windowHeight + "px",
            imgurl: imgurl
          });
        } else {
          console.log("onLoad获取失败");
          apputil.getUserInfo();
          var uu = setInterval(function () {
            console.log(app.globalData.ok);
            if (app.globalData.ok == "OK") {
              clearInterval(uu);
              wx.getUserInfo({
                success: function (res) {
                  console.log("onLoad获取成功", res.userInfo);
                  that.setData({
                    width: res.windowWidth + "px",
                    height: res.windowHeight + "px",
                    imgurl: imgurl
                  });
                },
                fail: function (res) {
                  console.log("onLoad获取失败");
                }
              });
            }
          }, 500);
        }
      }
    })
  },
  //跳转页面
  bdctact: function (e) {
    console.log(e);
  },
  //存formId
  obtainFormId: function (e) {
    var xinxi = wx.getStorageSync('userInfo');
    var formId = e.detail.formId;
    console.log(xinxi.openid, formId)
    app.setFormId(xinxi.openid, formId)
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