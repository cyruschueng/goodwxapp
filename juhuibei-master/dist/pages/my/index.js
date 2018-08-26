import { Cache } from '../../utils/cache.js';
var cache = new Cache();
import api from '../../api/api_v1.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info: {},
    vip: [
      { name: "普通用户", color: "#313538" },
      { name: "黄金会员", color: "#FFAAA6" },
      { name: "钻石会员", color: "#FF8C94" },
      { name: "至尊会员", color: "#FF4444" }
    ],
    vip_info: {},
    uid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._onLoad();
    
  },
  
  _onLoad: function () {
    var uid = cache.get('uid');
    if (uid) {
      this.getUserInfo(uid);
      this.setData({
        uid: uid
      })
    }
  },

  getUserInfo: function (uid) {
    var that = this;
    api.getUserInfo({
      query: {
        user_id: uid
      },
      success: (res) => {
        console.log('getUserInfo', res.data.data)

        if (res.data.res === 0) {

          that.setData({
            user_info: res.data.data
          });

          var index = res.data.data.vip;

          that.setData({
            vip_info: that.data.vip[index]
          })

          // wx.setNavigationBarColor({
          //   frontColor: '#ffffff',
          //   backgroundColor: that.data.vip[index].color,
          //   animation: {
          //     duration: 400,
          //     timingFunc: 'easeIn'
          //   }
          // })

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
    this._onLoad();
    wx.stopPullDownRefresh();
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
    return false;
  },
  
  onRefresh: function () {
    this._onLoad();
  }
})