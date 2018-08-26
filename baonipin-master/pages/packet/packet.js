// pages/packet/packet.js
const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgList:[
        {
          img:'../images/k1.png',
          active:'false',
        }, {
          img: '../images/k2.png',
          active: 'false'
        }, {
          img: '../images/k3.png',
          active: 'false'
        }, {
          img: '../images/k4.png',
          active: 'false'
        }, {
          img: '../images/k5.png',
          active: 'false'
        }, {
          img: '../images/k6.png',
          active: 'false'
        }, {
          img: '../images/k7.png',
          active: 'false'
        }
      ]
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      red_id: options.red_id
    })
  },
  onShow: function () {
    
  },
  change(e){
      let that = this;
      let bg_id = e.currentTarget.dataset.bg_id;
      wx.setStorageSync('bg_id', e.currentTarget.dataset.bg_id);
      wx.navigateTo({
        url: '../share/share?red_id=' + that.data.red_id + '&bg_id=' + bg_id
      })
      console.log(bg_id);
  }

})