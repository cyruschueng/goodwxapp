// page/component/pages/pay2/pay2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: 0.0,
    num: 2,
    part: 1.0,
    part1: 0.0,
    part2: 0.0,
    part3: 0.0,
    part4: 0.0,
    part5: 0.0,
    part6: 0.0,
    fee1: 0.0,
    fee2: 0.0,
    fee3: 0.0,
    fee4: 0.0,
    fee5: 0.0,
    fee6: 0.0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
    });

    // 转发到群组后打开 
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    };

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


  input_sum: function (e) {
    this.setData({
      sum: parseFloat(e.detail.value),
    })
  },
  input_num: function (e) {
    this.setData({
      num: parseFloat(e.detail.value),
    })
  },

  input_fee1: function (e) {
    this.setData({
      part1: parseFloat(e.detail.value),
    })
    this.setData({
      part: parseFloat(this.data.part1) + parseFloat(this.data.part2) + parseFloat(this.data.part3) + parseFloat(this.data.part4) + parseFloat(this.data.part5) + parseFloat(this.data.part6),
    })
    this.setData({
      part: Math.round(this.data.part * 100) / 100,
    })
  },
  input_fee2: function (e) {
    this.setData({
      part2: parseFloat(e.detail.value),
    })
    this.setData({
      part: parseFloat(this.data.part1) + parseFloat(this.data.part2) + parseFloat(this.data.part3) + parseFloat(this.data.part4) + parseFloat(this.data.part5) + parseFloat(this.data.part6),
    })
    this.setData({
      part: Math.round(this.data.part * 100) / 100,
    })
  },
  input_fee3: function (e) {
    this.setData({
      part3: parseFloat(e.detail.value),
    })
    this.setData({
      part: parseFloat(this.data.part1) + parseFloat(this.data.part2) + parseFloat(this.data.part3) + parseFloat(this.data.part4) + parseFloat(this.data.part5) + parseFloat(this.data.part6),
    })
    this.setData({
      part: Math.round(this.data.part * 100) / 100,
    })
  },
  input_fee4: function (e) {
    this.setData({
      part4: parseFloat(e.detail.value),
    })
    this.setData({
      part: parseFloat(this.data.part1) + parseFloat(this.data.part2) + parseFloat(this.data.part3) + parseFloat(this.data.part4) + parseFloat(this.data.part5) + parseFloat(this.data.part6),
    })
    this.setData({
      part: Math.round(this.data.part * 100) / 100,
    })
  },
  input_fee5: function (e) {
    this.setData({
      part5: parseFloat(e.detail.value),
    })
    this.setData({
      part: parseFloat(this.data.part1) + parseFloat(this.data.part2) + parseFloat(this.data.part3) + parseFloat(this.data.part4) + parseFloat(this.data.part5) + parseFloat(this.data.part6),
    })
    this.setData({
      part: Math.round(this.data.part * 100) / 100,
    })
  },
  input_fee6: function (e) {
    this.setData({
      part6: parseFloat(e.detail.value),
    })
    this.setData({
      part: parseFloat(this.data.part1) + parseFloat(this.data.part2) + parseFloat(this.data.part3) + parseFloat(this.data.part4) + parseFloat(this.data.part5) + parseFloat(this.data.part6),
    })
    this.setData({
      part: Math.round(this.data.part * 100) / 100,
    })
  },

  output: function (e) {
    var that = this;
    this.setData({
      part: parseFloat(this.data.part1) + parseFloat(this.data.part2) + parseFloat(this.data.part3) + parseFloat(this.data.part4) + parseFloat(this.data.part5) + parseFloat(this.data.part6),
    })
    this.setData({
      part: Math.round(this.data.part * 100) / 100,
    })
    this.setData({
      fee1: Math.round(this.data.sum * this.data.part1 / this.data.part * 100) / 100,
      fee2: Math.round(this.data.sum * this.data.part2 / this.data.part * 100) / 100,
      fee3: Math.round(this.data.sum * this.data.part3 / this.data.part * 100) / 100,
      fee4: Math.round(this.data.sum * this.data.part4 / this.data.part * 100) / 100,
      fee5: Math.round(this.data.sum * this.data.part5 / this.data.part * 100) / 100,
      fee6: Math.round(this.data.sum * this.data.part6 / this.data.part * 100) / 100,
    })
    console.log(this.data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '多人拼单分摊账单',
      path: 'page/component/pages/pay2/pay2',
      success: function (res) {
        console.log('转发成功');
        // 转发成功

        // 转发时获取群信息 
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        };

        console.log('shareTickets\t' + shareTickets);
        console.log('shareTickets[0]\t' + shareTickets[0]);
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            console.log('iv\t' + iv);
          }
        });

      },
      fail: function (res) {
        // 转发失败
      }
    }

  },
  showShareMenu: function (res) {      
    withShareTicket: true
  }
})
