// pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {},
    user: "常瑜",
    joinTime: "2016年2月9日",
    hr: [
      {
        name: 'hr',
      }
    ],
    classTime: '2017年1月5日',
    mainTeacher: {
      name: '刘娟',
      imageUrl: '../../image/pic0.jpg'
    },
    nbTeacher: {
      name: '郭义婷',
      imageUrl: '../../image/pic1.jpg'
    },
    fullMarkProject: 'Leve16-unit2-lesson1',
    workQuantity: {
      submit: 289,
      improve: 185,
      present: 78,
      timeAll: 134,
      speakTime: 85,
      readeQuantity: 52
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '成绩单',
      path: 'pages/secondScore/secondScore',
      success:function (res) {

      },
      fail: function (res) {}
    }
  },
  //
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})