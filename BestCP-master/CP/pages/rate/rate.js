// pages/rate/rate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount:13024,//人数
    description: "",
    star: '',
    rate:2,
    type_id:-1,
  },
  goAbout: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    console.log("onShare")
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '寻找最佳CP',
      path: '/pages/index/index',
      imageUrl: '/pages/cover.jpeg',
      success: function (res) {
        var cptype = wx.getStorageSync('cptype');
        console.log("share successfully")
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var that = this;
            console.log("type = " + cptype);
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            wx.request({
              url: 'https://api.gentleleetommy.cn/bestcp/onShare', 
              data: {
                wx_id: wx.getStorageSync('wx_id'),
                encryptedData: encryptedData,
                cptype: cptype,
                sessionKey: wx.getStorageSync('sessionKey'),
                iv : iv
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res.data.group_id)
                wx.setStorageSync('group_id', res.data.group_id)
                wx.redirectTo({
                  url: '../result/result',
                })
              }
            })
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  checkCP: function () {
    console.log("click check Cp");
    // wx.navigateTo({
    //   url: '../result/result',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    var options = currentPage.options;
    this.setData({
      rate: options['id']
    })
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    // 获取魅力指数
    wx.request({
      url: 'https://api.gentleleetommy.cn/bestcp/testResult',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        wx_id:wx.getStorageSync("wx_id")
      },
      success: function (res) {
        console.log(res)
        var src = 'star' + res.data.rate + '.png';
        that.setData({
          description: res.data.description,
          star: src,
          type_id:res.data.rate
        })
      }
    })
    
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
  
  }
})