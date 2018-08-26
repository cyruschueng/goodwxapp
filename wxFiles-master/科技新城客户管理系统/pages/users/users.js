// pages/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:['全公司的','我负责的','我下属的','无人负责的'],
    titleFlag:0,
    list:[
      {par1:'黄渤',par2:'杭州双沃网络科技有限公司',par3:'2',par4:'张继科',par5:'2'},
      { par1: '迪丽热巴', par2: '北京主打歌网络科技有限公司', par3: '1', par4: '杨幂', par5: '1' },
      { par1: '赵薇', par2: '浙江蓝鲸科技有限公司', par3: '0', par4: '无人', par5: '0' }
    ]
  },
  navToDetail:function(e){
    wx.navigateTo({
      url: '/pages/users/detail/detail',
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