import api from '../../../api/api_v1.js';
import { Cache } from '../../../utils/cache.js';
var cache = new Cache();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    user_card: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid = cache.get('uid');
    if (uid) {
      this.getUserCardAll();
    }
  },

  getUserCardAll: function () {
    var that = this;
    api.getUserCardAll({
      success: (res) => {
        console.log('getUserCardAll', res.data.data);
        if (res.data.res === 0) {
          that.setData({
            user_card: res.data.data
          })
        }
      }
    })
  },

  openCode: function (e) {
    let card_id = e.currentTarget.dataset.card_id
    if (card_id) {
      wx.navigateTo({
        url: '../code/index?card_id=' + card_id,
      })
    }
  },

  openShare: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.onShareAppMessage();
  },

  toView: function (e) {
    console.log('点击', e);
    let card_id = e.target.dataset.card_id;
    if (card_id) {
      let url = 'https://www.juhuibei.com/card/' + card_id;
      wx.navigateTo({
        url: '../view/index?url=' + url + '&color=' + e.target.dataset.color
      })
    }
  },

  toEdit: function (e) {
    console.log('长按', e);
    let card_id = e.target.dataset.card_id;
    if (card_id) {
      wx.navigateTo({
        url: '../edit/index?card_id=' + card_id
      })
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') { // 来自页面内转发按钮
      let card_id = res.target.dataset.card_id;
      if (card_id) {
        let url = 'https://www.juhuibei.com/card/' + card_id;
        let color = res.target.dataset.color;
        let title = res.target.dataset.title;
        return {
          title: title,
          path: '/pages/card/view/index?url=' + url + '&color=' + color,
          imageUrl: 'https://www.juhuibei.com/images/wx_code/wx_code_bg.jpg',
          success: function (res) {
            // 转发成功
            console.log('转发成功', res);
          },
          fail: function (res) {
            // 转发失败
            console.log('转发失败', res);
          }
        }
      }
    } else {
      wx.hideShareMenu();
    }
    
    
  }
})