

// 获取全局应用程序实例对象
const app = getApp();
import http from '../../js/request'

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "fail",
  /**
   * 页面的初始数据
   */

  data: {
    avatarUrl: '',
    totalTime: Number,
    questionNum: Number,
  
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({totalTime: options.totaltime}),
    this.setData({questionNum: options.questionNum})
    this.setData({avatarUrl: app.globalData.userInfo.photourl})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  startExam: function () {
    let that = this;
    if (app.globalData.userInfo.challengeNumber > 0) {
      wx.showModal({
        title: '开始答题，消耗一次挑战次数',
        success: (res) => {
          if (res.confirm) {
            // 确认答题
              app.globalData.userInfo.challengeNumber--;
              http.post('User', {
                openid: app.globalData.userInfo.openId,
                remainnumber: app.globalData.userInfo.challengeNumber
              }).then(() => {
                wx.redirectTo({
                  url: '../dati/dati'
                })
              })
          } else if (res.cancel) {
            return
          }
          
        }
      })
    }
  },
  quit() {
    wx.redirectTo({
      url: '../index/index'
    });
  }
})