//index.js
//获取应用实例
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;
Page({
  data: {
    array: [
      {url:'http://www.weilaihexun.com/wxxcx/images/sy_b1.jpg'},
      {url:'http://www.weilaihexun.com/wxxcx/images/sy_b2.jpg'}
    ],
    imgurl:imgurl,
    getNew:[],
    current_page: 1,
    last_page: 1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getNew();
  },
  /*
   *获取资讯列表
   */
  getNew:function(){
    var that = this;
    common.httpG('article/index',{},function(data){
      if(data.code == 0){
        that.setData({
          getNew: data.data.data,
          page:data.data.current_page,
          last_page: data.data.last_page
        })
      }
    })
  },
 /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh:function(){
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: wxurl + 'article/index',
      data: {},
      success: (res) => {
        that.setData({
          getNew: res.data.data.data
        });
      },
      complete: () => {
        //结束下拉刷新
        wx.stopPullDownRefresh();
        setTimeout(() => {
          wx.hideToast();
        }, 600)
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var getNew = that.data.getNew;
    var current_page = that.data.current_page;
    var page = current_page + 1;
    if (current_page < that.data.last_page) {
      wx.request({
        url: wxurl + 'article/index',
        data: {
          page: page,
        },
        success: (res) => {
          that.setData({
            current_page: res.data.data.current_page,
            getNew: that.data.getNew.concat(res.data.data.data),
          })
        },
        complete: () => {
          setTimeout(() => {
            wx.hideToast();
          }, 600)
        },
      });
    } else {
      wx.showToast({
        title: '没有更多啦',
      })
    }
  },
})