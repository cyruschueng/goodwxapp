// pages/newTeam/newTeam.js
  Page({
    projectName: '',
    array: [''],
    team: 0,
    startDate: '2018-04-18',
    endDate: '2018-04-18',
    visible: true,
    /**
     * 页面的初始数据
     */
    data: {
      projectName: '',
      array: ['选择团队', '蜗壳办公开发团队', '精弘网络产品开发部'],
      team: 0,
      startDate: '2018-04-18',
      endDate: '2018-04-18',
      visible: true,
    },

    confirmShedule: function () {
      wx: wx.navigateTo({
        url: '../mySchedule/mySchedule'
      })
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
    onShareAppMessage: function () {

    }
  })