// pages/myCenter/addteam/addteam.js
var app = getApp();
var FamilyName = "";
var FamilySce = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FamilyName:"",
    FamilyImg: [],
    FamilySce:"",
    src: "/images/medium/add.png",  //绑定image组件的src
    tempFilePaths: [], //绑定image组件的src
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
  FamilyName:function(e){
    this.setData({
      FamilyName: e.detail.value
    })
    FamilyName=e.detail.value;
  },
  FamilySce:function(e){
    this.setData({
      FamilySce: e.detail.value
    })
    FamilySce=e.detail.value;
  },
  FamilyImg:function(){
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        _this.tempFilePaths = tempFilePaths
        _this.setData({
          tempFilePaths: res.tempFilePaths,
          src: res.tempFilePaths[0]
        })
      }
    })
  },
  //创建家族
  setMyFamily:function(){
    var _this = this;
    wx.uploadFile({
      url: app.globalData.url +'/family/familyinfo/createfamily', //仅为示例，非真实的接口地
      filePath: _this.tempFilePaths[0],
      name: 'head_img',
      formData: {
        user_id: app.globalData.user_id,
        name: FamilyName,
        introduce: FamilySce,
        // head_img: _this.FamilyImg
      },
      success: function (res) {
        console.log("1111111");
        console.log(res.data);
        wx.showToast({
          title: "创建成功了",
          icon: 'success11111',
          duration: 2000
        })
      }
    })
    // wx.request({
    //   url: 'https://www.assistedu.com/family/familyinfo/createfamily',
    //   method: 'post',
    //   data: {
    //     user_id: app.globalData.user_id,
    //     name: FamilyName,
    //     introduce: FamilySce,
    //     head_img: _this.FamilyImg
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res){
    //     console.log(res);
    //     wx.showToast({
    //       title: res.data.errmsg,
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   }
    // })
  }
})