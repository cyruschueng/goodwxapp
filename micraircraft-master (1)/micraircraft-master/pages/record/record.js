// pages/record/record.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({

  /**
   * 页面的初始数据
   */
    data: {
        indicatorDots: true,//是否显示面板指示点
        autoplay: true,  //是否自动切换
        interval: 5000, //自动切换时间
        duration: 1000,  //滑动时间
        goods: null,
        srcUser: 'wation',
        content: '每个孩子都有一个\n飞翔的梦想!\n你真的懂了吗？',
        money: 1.5,
        waitTime: 5,
        rawPrice: 15,
        currentPrice:5
  },

    touchHandler: function (e) {
        console.log(pieChart.getCurrentDataIndex(e));
    },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getFields();
      this.setData({
          topScroll: [
              { "id": "35", "Pic": '/images/xiaofeiji.png'},
              { "id": "36", "Pic": '/images/xiaofeiji.png'},
              { "id": "37", "Pic": '/images/xiaofeiji.png' }]
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  getFields: function () {
    //   console.log("getFields")
    //   var _this = this;
    //   //创建节点选择器
    //   var query = wx.createSelectorQuery();
    //   //选择id
    //   query.select('#pieCanvas').boundingClientRect()
    //   query.exec(function (res) {
    //       //res就是 该元素的信息 数组
    //       console.log(res);
    //       //取高度
    //       _this.setData({
    //           currentPrice: res[0].height
    //       })
    //       console.log('取高度', _this.data.currentPrice);
    //   })

    //   var that = this
    //     var query = wx.createSelectorQuery()
    //     query.select('#pieCanvas').boundingClientRect()
    //     query.exec(function (res) {
    //         console.log("1" + res)       // #the-id节点的上边界坐
    //         that.setData({
    //             canvasHeight: res.height
    //         });
    //     })
    },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //   console.log('canvasHeight:' + this.data.canvasHeight);

      var windowWidth = 320;
      var windowHeight = 640;
      try {
          var res = wx.getSystemInfoSync();

        //   console.log(res.model)
        //   console.log(res.pixelRatio)
        //   console.log(res.screenWidth)
        //   console.log(res.screenHeight)
        //   console.log(res.windowWidth)
        //   console.log(res.windowHeight)
        //   console.log(res.language)
        //   console.log(res.version)
        //   console.log(res.platform)
          windowWidth = res.windowWidth;
          windowHeight = res.windowHeight;
      } catch (e) {
          console.error('getSystemInfoSync failed!');
      }
      console.log('windowHeight:' + windowHeight);
      var canvasHeight = windowHeight - ((480 + 76 + 10) * (windowWidth / 750));
      console.log('canvasHeight:' + canvasHeight);
      pieChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'pie',
          series: [{
              name: '我帮忙减掉2元',
              data: 2,
          }, {
              name: '其他人帮忙减掉11元',
              data: 11,
          }, {
              name: '还需要支付3元',
              data: 3,
          }],
          width: windowWidth,
          height: canvasHeight,
          dataLabel: true,
      });
  
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
  showItry: function() {
      wx.navigateTo({ url: "/pages/index/index" })
  },
  showFriends: function () {
      wx.navigateTo({ url: "/pages/friends/friends" })
  },
  showRules: function () {
      wx.navigateTo({ url: "/pages/rules/rules" })
  },
  showDetail: function () {
      wx.navigateTo({ url: "/pages/detail/detail" })
  }

})