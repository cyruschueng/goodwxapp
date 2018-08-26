// pages/accountMain/accountMain.js
const app = getApp();
import { makePar, extend } from '../../utils/util.js';
import _ from '../../utils/underscore.js';

let txm = {

  /**
   * 页面的初始数据
   */
  data: {
    getM:0,
    mover:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (po) {
      this.setData({
        saveM: po.m,
        userInfo: app.globalData.userInfo
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
     let imageUrl = 'https://wxapp.haizeihuang.com/wannengdequan_php/images/share.png';
     let title = '24小时随时答题夺金，对三道题就有奖金，答的多拿得多。';
     let path = 'pages/index/index?';
     return {
       title: title,
       path: path,
       imageUrl: imageUrl,
       success: function (res) {},
       fail: function (res) {}
     }
   },
  //mover
  changeGetM:function(e){
    let m = e.detail.value;
    let saveM = this.data.saveM
    //if (m > saveM)
    this.setData({
      getM: m
    });
  },
  getMoneyToMe: _.throttle(function () {
    app.fetchData({
      func:'withdrawals.withdrawals',
      money: this.data.getM*100
    })
  },400)
}


var txmh = extend(txm,{});
Page(txmh);
