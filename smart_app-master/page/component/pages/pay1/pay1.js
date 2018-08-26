// page/component/pages/pay1/pay1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: 1720,
    rent: 2580,
    rent1: 2400,
    rent2: 100,
    rent3: 50,
    rent4: 30,
    month: 2,
    num: 3,
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

  input_rent1: function (e) {
    var that = this;
    this.setData({
      rent1: parseFloat(e.detail.value),
    })
    this.setData({
      rent: parseFloat(this.data.rent1) + parseFloat(this.data.rent2) + parseFloat(this.data.rent3) + parseFloat(this.data.rent4),
      price: Math.round(this.data.rent * this.data.month / (this.data.num) * 100) / 100
    })
  },
  input_rent2: function (e) {
    var that = this;
    this.setData({
      rent2: parseFloat(e.detail.value),
    })
    this.setData({
      rent: parseFloat(this.data.rent1) + parseFloat(this.data.rent2) + parseFloat(this.data.rent3) + parseFloat(this.data.rent4),
      price: Math.round(this.data.rent * this.data.month / (this.data.num) * 100) / 100
    })
  },
  input_rent3: function (e) {
    var that = this;
    this.setData({
      rent3: parseFloat(e.detail.value),
    })
    this.setData({
      rent: parseFloat(this.data.rent1) + parseFloat(this.data.rent2) + parseFloat(this.data.rent3) + parseFloat(this.data.rent4),
      price: Math.round(this.data.rent * this.data.month / (this.data.num) * 100) / 100
    })
  },
  input_rent4: function (e) {
    var that = this;
    this.setData({
      rent4: parseFloat(e.detail.value),
    })
    this.setData({
      rent: parseFloat(this.data.rent1) + parseFloat(this.data.rent2) + parseFloat(this.data.rent3) + parseFloat(this.data.rent4),
      price: Math.round(this.data.rent * this.data.month / (this.data.num) * 100) / 100
    })
  },

  input_month: function (e) {
    var that = this;
    this.setData({
      month: parseFloat(e.detail.value),
    })
    this.setData({
      price: Math.round(this.data.rent * this.data.month / (this.data.num) * 100) / 100
    })
  },
  input_num: function (e) {
    var that = this;
    this.setData({
      num: parseFloat(e.detail.value),
    })
    this.setData({
      price: Math.round(this.data.rent * this.data.month / (this.data.num) * 100) / 100
    })
  },
  output: function (e) {
    var that = this;
    this.setData({
      price: Math.round(this.data.rent * this.data.month / (this.data.num) * 100) / 100
    })
  },

  requestPayment: function () {
    var self = this

    self.setData({
      loading: true
    })
    // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
    // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: paymentUrl,
          data: {
            openid
          },
          method: 'POST',
          success: function (res) {
            console.log('unified order success, response is:', res)
            var payargs = res.data.payargs
            wx.requestPayment({
              timeStamp: payargs.timeStamp,
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign
            })

            self.setData({
              loading: false
            })
          }
        })
      } else {
        console.log('err:', err)
        self.setData({
          loading: false
        })
      }
    })
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
      title: '房租相关费用分摊账单',
      path: 'page/component/pages/pay1/pay1',
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
