var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    busname: '',
    memberId: 0,
    shopId: '',
    bizId: '',
    list:'',
    thirdSession: ''
  
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
    var that = this;

    wx.getStorage({
      key: 'busname',
      success: function (res) {
        that.setData({
          busname: res.data
        })
      },
    })


    that.getList()


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

  tomore:function(option){

    if((option.currentTarget.dataset.currentstatus == 4)){
      wx.showToast({
        title: '已取消订单',
        icon: 'loading',
        duration: 2000,
        image:'/image/i/x.png'
      })
    }else{
      wx.navigateTo({
        url: '/page/reserveList/reserveListMore/index?id=' + option.currentTarget.dataset.id
      })

    }

  },

  //获取列表
  getList:function(){
    var subdata = { };
    var that = this;

    app.commonAjax('cat/reserve/queueList', ['shopId','memberId'], {}, function (res) {

      that.setData({
        list: res.data.data
      })

    }, app)
  }
})