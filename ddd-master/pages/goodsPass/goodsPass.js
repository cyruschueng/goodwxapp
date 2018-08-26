import { formatTime, extend } from '../../utils/util.js';
import base from '../../utils/base.js';
const app = getApp();

// pages/goodsPass/goodsPass.js

var gpm = {

  /**
   * 页面的初始数据
   */
  data: {
    ispass: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        let ispass = options.ispass * 1;
        app.fetchData({
          func:'goods.get_award'
        }).then(data=>{
          this.setData({
            ginfo:data,
            userInfo:app.globalData.userInfo,
            ispass: ispass
          });
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
  
  },
  toAddress:function(){
    app.toPage('address',{
      ga_id: this.data.ginfo.ga_id
    });
  },
  toIndex: function () {
    app.toPage('index');
  }
}
var gpmh = extend(gpm, base);
Page(gpmh);
