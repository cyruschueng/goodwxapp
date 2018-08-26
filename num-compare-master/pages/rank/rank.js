let api = require('../../utils/api.js');
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curr_score: 0,
    curr_progress: 1,
    face: true,
    faceText: '预计可获得积分数奖励',
    currRank: 0,
    beforeRank: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curr_score: options.score,//,
      curr_progress: options.progress
    })
    
    wx.showShareMenu({
      withShareTicket: true
    })
    api.gamePoint({
      unionid: app.globalData.unionid,
      point: options.score
    }, result => {
      let face = null;
      let faceText = ''
      if(result.data.point == 0){
        face = false;
        faceText = '可惜未能获得积分奖励'
      }else{
        face = true;
        faceText = '预计可获得积分数奖励'
      }
      this.setData({
        currRank: result.data.rank,
        beforeRank: result.data.max,
        face: face,
        faceText: faceText
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let self = this;
    return {
      title: '[' + app.globalData.userInfo.nickName + '@我]一年级加减法，来虐一下？',
      path: '/pages/home/home',
      success: function(res) {
        wx.showToast({
          title: '分享成功',
          mask: true
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '分享失败',
          mask: true
        })
      }
    }
  },
  againPlayGame(){
    wx.getStorage({
      key: 'gameChance',
      success: function(res) {
        wx.setStorage({
          key: 'gameChanceCount',
          data: res.data,
          success: function(){
            wx.redirectTo({
              url: "/pages/ready/ready"
            })
          }
        })
      },
    })
    
  }
})