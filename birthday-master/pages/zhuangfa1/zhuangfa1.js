// pages/zhuangfa/zhuangfa.js
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
    niceText: [
      '亲，快把你的生日告诉我吧~等你生日的时候会收到我的祝福哦！',
      '有句话一直没敢对你说，想了想还是生日那天说最好，填好你的生日，到了那一天就能听到啦！',
      '您的包容和关怀，让我迅速成长，感恩不在言表，请让我和您一起分享生日的喜悦吧！',
      '虽然是微不足道的关心，也希望您能知道我的心意，为您在生日那天送上最美好的祝愿！',
      '多年的好朋友啊，为了那一刻的惊喜，我预谋已久，现在就差你的生日啦！',
      '同舟共济数载，我们默契如初，快来写下你的生日吧，我的祝福已经上路啦！'
    ],
    now: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo);
    this.setData({
      userInfo: userInfo
    })
    

  },
  onLaunch: function (ops) {
    
    
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
    let that = this;
    app.getAuth(function () {
      let userInfo = wx.getStorageSync('userInfo');
      let sign = wx.getStorageSync('sign');
      let mid = wx.getStorageSync("mid");
      that.setData({
        mid: mid
      })
    })
  },
  // 其他的页面函数、生命周期函数等
  onShareAppMessage() {
    let that = this;
    let sign = wx.getStorageSync("sign");
    return {
      title: that.data.niceText[that.data.now],
      path: '/pages/zhuangfa2/zhuangfa2?invite_mid=' + that.data.mid,
      success(res) {
        tips.success("转发成功")
        console.log(res);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        tips.alert("转发失败")
        // 转发失败
      }
    }
  },
  change() {
    let that = this;
    let now = that.data.now;
    if (now < that.data.niceText.length - 1) {
      setTimeout(function () {
        now += 1;
        that.setData({
          now
        })
      }, 20)
    } else {
      that.setData({
        now: 0
      })
    }
  }


})