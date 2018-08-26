
var Bmob = require('../../../utils/bmob.js');
var that;
var typeId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrProcted:[],
    skip: 0,
    limit: 3,
    toView: "",
    loadfinish: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e.typeId)
    typeId = e.typeId;
    that = this;
    getdetailList();
   

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
    if (that.data.loadfinish) {
      wx.showToast({
        title: '已经全部加载完毕',
        icon: '',
      })
      return
    }
    console.log('--------上拉刷新-------');
    getdetailList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
  scroll: function (e) {
    if (this.data.toView == "top") {
      this.setData({
        toView: ""
      })
    }
  },
})

function getdetailList() {
  wx.showLoading({
    title: '刷新中',
    mask: true
  })
  var homeList = Bmob.Object.extend("homeList");
  var query = new Bmob.Query(homeList);
  query.descending('createdAt');
  query.equalTo("type", parseInt(typeId));
  query.skip(that.data.skip);
  query.find({
    success: function (results) {
      wx.hideLoading();
      if (results.length > 0) {
        that.data.skip += results.length;
        console.log(results);
        console.log(that.data.skip);
        that.setData({
          arrProcted: that.data.arrProcted.concat(results)
        })
      }else {
        that.data.loadfinish = true;
      }
    },
    error: function (error) {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}