// pages/test/map/map.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../../../image/play.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 30,
      height: 30
    }],

    controls: [{
      id: 1,
      position: {
        left: 10,
        top: 10,
        width: 100,
        height: 100,
      },
      clickable: true,
      iconPath: "../../../image/play.png",
    }],

    polyline: [{
      points: [
        {
          longitude: 113.3245211,
          latitude: 23.10229
        },
        {
          longitude: 113.324520,
          latitude: 23.21229
        }
      ],

      color: "#FF0000DD",
      borderColor: "#FFFFFF",
      width: 5,
      borderWidth: 2,
      dottedLine: false,
      arrowLine: true,
    }],

    circles: [{
      latitude: 23.099994,
      longitude: 113.324520,
      color: "#FF0000DD",
      fillColor: "#FFFFFF	",
      radius: 150,
      strokeWidth: 1,
    }]
  },

  controltap(e) {
    // console.log(e.controlId)
    wx.showModal({
      title: 'controltap',
      content: "被点击的Control的ID是：" + String(e.controlId),

      success: function (res) {
        if (res.confirm) {
          wx.getLocation({
            success: function (res) {
              console.log(res)
            },
          })
        }
      }
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
    return {
      complete: function (res) {
        console.log(res)
      }
    }
  }
})
