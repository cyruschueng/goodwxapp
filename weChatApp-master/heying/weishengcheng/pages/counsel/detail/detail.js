import {$wuxRater} from '../../../wux/wux'
var api = require('../../../api.js')
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {name: '测测你是<欢乐颂>里的谁?', url: "./test", id: 0},
      {name: '测测你是<欢乐颂>里的谁?', url: "./test", id: 1},
      {name: '测测你是<欢乐颂>里的谁?', url: "./test", id: 2},
      {name: '测测你是<欢乐颂>里的谁?', url: "./test", id: 3},
      {name: '测测你是<欢乐颂>里的谁?', url: "./test", id: 4},
      {name: '测测你是<欢乐颂>里的谁?', url: "./test", id: 5},
      {name: '测测你是<欢乐颂>里的谁?', url: "./test", id: 6},
      {name: '测测你是<欢乐颂>里的谁?', url: "./test", id: 7},
      {name: '测测你是<欢乐颂>里的谁?', url: "./test", id: 8}
    ],
    item:[],
    condition: true,
    topicList: [
      {
        name: '你做事总是半途而废吗?',
        list: {
          0: '是的',
          1: '不是',
          2: '偶尔'
        }
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    $wuxRater.init('history', {
      value: 4,
      disabled: 1,
      activeColor: '#e4a338',
      fontSize: 18,
      margin: 0
    })
    if(options.scene){
      id = decodeURIComponent(options.scene);

      wx.showNavigationBarLoading();
      wx.showToast({
        title: 'Loading……',
        duration:20000,
        icon: 'loading'
      });
      api.zhuangxinfo(id, function(res) {
        wx.setNavigationBarTitle({
          title: res.name
        });

        that.setData({
          disabled: false,
          item: res
        })

        wx.hideNavigationBarLoading();
        wx.hideToast();
      },function(){
        wx.hideNavigationBarLoading();
        wx.hideToast();
        that.showZanToast('数据不存在或者被删除');
        setTimeout(function(){
          wx.navigateTo({
            url: "/pages/zhuangx/list/list?type=1"
          })
        },1500);
      });
    }
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
  start: function () {
    this.setData({
      condition: false
    })
  }
})