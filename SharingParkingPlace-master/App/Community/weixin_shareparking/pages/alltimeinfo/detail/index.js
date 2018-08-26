// pages/alltimeinfo/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    equipId: null,
    description: null,
    state: null,
    markers: [{
      iconPath: "../../../image/location.png",
      id: 0,
      latitude: 31.893539,
      longitude: 120.564432,
      width: 35,
      height: 45
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
        equipId: e.object_equip_id,
        userId: e.object_user_id,
        description: e.object_description,
        state: e.object_state,
        location_nl: Number(e.object_nl),
        location_el: Number(e.object_el),
        phone: e.object_phone
    });
    var that = this;
  },

  // 邮件发送跳转界面
  sendEmail: function() {
      wx.redirectTo({
        url: '../../sendSms/sendSms?userId='+this.data.userId + '&&equipId=' + this.data.equipId + '&&description=' + this.data.description,
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.mapCtx = wx.createMapContext('myMap');
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: this.data.river_nl,
        longitude: this.data.river_el,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
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