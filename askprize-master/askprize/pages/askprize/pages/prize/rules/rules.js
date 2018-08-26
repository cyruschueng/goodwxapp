import util from "../../../utils/util"
import { prizeApi } from '../../../utils/api/prizeApi.js';
import { userApi } from '../../../utils/api/userApi.js';
var app = getApp();//获取应用实例
var app = getApp();//获取应用实例
/**
 * 有奖问答成功页面
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //限时答题1；自由答题2
      isselect:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
  },
  onrules:function(e){
      let that = this;
      that.data.isselect = 1
      that.setData({
          isselect: that.data.isselect,
      })
  },
  onruless: function (e) {
      let that = this;
      that.data.isselect = 2
      that.setData({
          isselect: that.data.isselect,
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


  onShareAppMessage: function (res) {
    var  that  =  this;
    console.log(that.data.prize.money);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '参加电动邦有奖问答，瓜分' + that.data.prize.money + '元',
      path: '/pages/prize/detail/detail',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }


})