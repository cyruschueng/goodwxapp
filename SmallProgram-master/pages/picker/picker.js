Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr1: ['美国', '中国', '巴西', '日本'],
    index1: 0,
    arr2: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    index2: [0, 0, 0],
    time: '00:00',
    date: '2017-12-14',
    region: []
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
    
  },



  /*
  事件
  */
  change1: function (e) {
    this.setData({
      index1:e.detail.value
    });
  },

  change2: function (e) {
    this.setData({
      index2:e.detail.value
    });
  },

  change3: function (e) {
    this.setData({
      time: e.detail.value
    });
  },

  change4: function (e) {
    this.setData({
      date: e.detail.value
    });
  },

  change5: function (e) {
    this.setData({
      region: e.detail.value
    });
  }

})