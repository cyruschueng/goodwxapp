var app = getApp()
var url = app.globalData.baseAPI;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Community: '',  //小区
    resultCity: '',  //如：朝阳区
    resultCountys: '', //如：望京
    province:''
  },

  back:function(){
    wx.navigateBack({
      babel : 2
    })
  },

  confirm:function(){
    var userInfo = app.globalData.userInfo
    wx.request({
      url: url + '/users/' + userInfo.id,
      method: 'PUT',
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      data: {
        xiaoqu_id: userInfo.xqid
      },
      success: function (res) {
        console.log(res);
        wx.switchTab({
          url: '/pages/home/home'
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('xiaoquid');
    var userInfo = wx.getStorageSync('userInfo');
    var userid = userInfo.id;
    var that = this;
    var userInfo = app.globalData.userInfo

    that.setData({
      name: userInfo.name,
      avatar: userInfo.avatar,
      gender: userInfo.gender,
      province: options.province,
      Community: options.Community,
      resultCity: options.resultCity,
      resultCountys: options.resultCountys
    })

    console.log(value);
    console.log("value");
    console.log(userInfo);

    userInfo.xqid = value;
    userInfo.sqname = options.resultCountys;
    userInfo.xqname = options.Community;
    app.globalData.userInfo = userInfo;

    wx.setStorage({
      key: "userInfo",
      data: userInfo
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