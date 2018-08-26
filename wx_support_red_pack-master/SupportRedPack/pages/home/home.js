// pages/pages_tj/pages_tj.js
var app = getApp()
Page({
  data: {
    userInfo: "",
    currentPageNum: 1,
    //顶部轮播图
    slider: [],
    //首页精选
    indexData: [],
    image_new: [],
    navbar: ['精选', '最新'],
    theEnd: 0
  },

  //上推加载更多
  loadMore: function () {
    var that = this
    that.setData({
      currentPageNum: that.data.currentPageNum + 1
    });

    //首页精选
    wx.request({
      url: getApp().globalData.apiServer + "redpack/list",
      method:"post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { pageNum: that.data.currentPageNum != null ? that.data.currentPageNum : 1,
       type:'0'},
      success: function (data) {
        if (data.data.data.length > 0) {
          var dataArray = that.data.image_index;
          dataArray = dataArray.concat(data.data.data);
          that.setData({
            indexData: dataArray
          })
        } else {
          
          that.setData({
              theEnd:10,
              currentPageNum: that.data.currentPageNum - 1
            });
            
        }
      }
    });
  },
  //下拉刷新
  refesh: function () {

  },
  getMyProfile: function () {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  },

  //查看图片
  imageView: function (e) {
    wx.navigateTo({
      url: '/pages/pages_imageView/imageView?imgId=' + e.currentTarget.dataset.id + "&url=" + e.currentTarget.dataset.url + "&pageNum=" + e.currentTarget.dataset.num
    });
    wx.request({
      url: getApp().globalData.apiServer + "portal/click",
      data: { id: e.currentTarget.dataset.id }, success: function (data) { }
    });
  },

  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this//不要漏了这句，很重要
    //首页热门图集
    wx.request({
      url: getApp().globalData.apiServer + "redpack/indexTopSlider",
      success: function (data) {
        //赋值
        that.setData({
          slider: data.data
        });
      }
    });

    //首页精选
    wx.request({
      url: getApp().globalData.apiServer + "redpack/list",
      data: { pageNum: 1,type:'0' },
      success: function (data) {
       //赋值
        that.setData({
          currentPageNum: 1,
          indexData: data.data.data.dataList
        })
      }
    });

  },

  toAddRedpack:function(){
    wx.navigateTo({
      url: '/pages/addRedPack/addRedpack'
    });
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

    wx.showShareMenu({
      withShareTicket: true
    })

    var that = this;
    var nickName = "";
    wx.getUserInfo({
      success: function (resdata) {
        var userInfo = resdata.userInfo;
        that.setData({
          userInfo: userInfo
        });
        wx.setStorageSync('USER_INFO', userInfo)
      }
    })
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
  onShareAppMessage: function (res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      var tempType = res.target.dataset.info.type;
      var tempKey = res.target.dataset.info.key;
    return {
      title: '请助攻一下' + tempType+'红包',
      path: '/pages/shareOpen/shareOpen',
      success: function (res) {
        var tempTickets = res.shareTickets[0];
        console.log("转发成功，正在请求");
        // 转发成功
        var that = this//不要漏了这句，很重要
        //首页热门图集
        wx.request({
          url: getApp().globalData.apiServer + "redpack/shareTickets",
          data: { tickets: tempTickets, redpackKey: tempKey, type: tempType},
          success: function (data) {
            console.log(data)
          }});
      },
      fail: function (res) {
        // 转发失败
      }
    }
    }
    else{
      //公共的转发
    }
  }
})
