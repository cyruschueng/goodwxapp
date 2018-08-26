// pages/personal/winegroup/winegroup.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xqid: 0,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    length: 0,
    message:''
  },
  clickWeixin:function(event){
    console.log(event)
    wx.navigateTo({
      url: '/pages/home/weixindetail/weixindetail?id=' + event.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var userInfo = wx.getStorageSync('userInfo');
    var userInfo = publicUrl.globalData.userInfo
    var posts = [];
    var weixins = [];
    // this.setData({
    //   sqname: userInfo.sqname,
    //   xqname: userInfo.xqname
    // })
    // console.log(userInfo)
    // console.log("============userInfo====sqname====" + userInfo.sqname)
    // console.log("============userInfo=====name===" + userInfo.name)
    // console.log("============userInfo=====gender===" + userInfo.gender)
    // console.log("============userInfo===xqname=====" + userInfo.xqname)
    // console.log("============userInfo==avatar======" + userInfo.avatar)
    // console.log("============userInfo========" + userInfo.id)
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.request({
      url: url + '/weixins?userid=' + userInfo.id,
      method: 'get',
      data: {
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        if(res.data.code==10001){
          that.setData({
            message: '您还没有发布微信群，快去发布吧~'
          })
        }else if(res.data.code==10002){
          console.log(res.data.weixin)
          for (var i = 0; i < res.data.weixin.length; i++) {
            var weixin = {
              id: res.data.weixin[i].wid,
              username: userInfo.name,
              userasset: userInfo.avatar,
              wname: res.data.weixin[i].wname,
              weino: res.data.weixin[i].weino,
            }
            weixins.push(weixin);
            console.log(weixins)
          }
          that.setData({
            weixins: weixins,
            length: res.data.weixin.length
          })
        }

      }
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