import api from '../../api/api_v1.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: '',
    title: '娱乐',
    desc: '这里有好玩的'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGamesAll();
  },
  /**
   * 获取游戏列表
   */
  getGamesAll: function () {
    var that = this;
    api.getGamesAll({
      success: (res) => {
        if (res.data.res === 0) {
          console.log('getGamesAll', res.data.data)
          that.setData({ grids: res.data.data })
        }
      }
    })
  },
  /**
   * 进入游戏web-view
   */
  goToplay: function (e) {
    console.log(e);
    var url = e.target.dataset.url;
    console.log(url);
    if (url) {
      wx.navigateTo({
        url: '/pages/game-detail/index?url=' + url
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
  onShareAppMessage: function () {
  
  }
})