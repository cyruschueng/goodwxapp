// pages/homepage/homepage.js
var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
var shop_id = app.globalData.shop_id;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    touchMovingLeft: false,
    touchMovingRight: false,
    moveLeft: 0,
    touchStart: 0,
    touchMove: 0,
    touchEnd: 0,
    // 爆品数组
    hotGoodsInfo:[],
    // 为你推荐数组
    recommendGoodsInfo:[],
    // 头部轮播图数组
    topBannerInfo:[],
    swiperParam: {
      indicatorDots: true,
      indicatorColor: "#aaa",
      indicatorActiveColor: "#f1f1f1",
      autoplay: true,
      circular: true,
      interval: 3000
    },
    openid:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 用户登录
    // 获取用户信息
    wx.getUserInfo({
      success: function (res) {
        // console.log(res)
        var userInfo = res.userInfo;
        // 登录
        wx.login({
          success: res => {
            // console.log(res)
            if (res.code) {
              // console.log(res.code)
              var url = baseUrl + '/api/customer/login?code=' + res.code
                + '&appid=wxb27dd17f341dc468' + '&secret=fd3882c51618812dbc90b687345e30b8' + '&nickname=' + userInfo.nickName + '&picture=' + userInfo.avatarUrl;
                wx.request({
                  url: url,
                  success(res) {
                    // console.log(res)
                    var data=res.data.result;
                    if(res.data.success){
                      //性别 0：未知、1：男、2：女
                      wx.setStorage({
                        key: 'picture',
                        data: data.picture,
                      })
                      wx.setStorage({
                        key: 'nickname',
                        data: data.nickname,
                      })
                      
                      wx.setStorage({
                        key: 'customer_id',
                        data: data.customer_id,
                      })
                      wx.setStorage({
                        key: 'level',
                        data: data.level,
                      })
                      wx.setStorage({
                        key: 'referee_id',
                        data: data.referee_id,
                      })
                      wx.setStorage({
                        key: 'recharge_balance',
                        data: data.recharge_balance,
                      })
                    }else{
                      wx.showModal({
                        title: '提示',
                        content: '登录失败',
                      })
                    }
                  }
                })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
    
    this.getHotGoods(baseUrl + '/api/product/hot?shop_id=' + shop_id)
    this.getRecommendGoods(baseUrl + '/api/product/recommend?shop_id=' + shop_id+'&recommend_id=4')
    this.getTopBanner(baseUrl + '/api/banner/load-list?shop_id=' + shop_id+'&state=1')  
  },
  // 获取顶部轮播图数据
  getTopBanner(url){
    var that = this;
    wx.request({
      url: url,
      success(res){
        // console.log(res)
        if(res.data.success){
          var data = res.data.result;
          for (var i = 0; i < data.length;i++){
            data[i].picture = imgUrl + data[i].picture
            that.setData({
              topBannerInfo: res.data.result
            })
          }
          // console.log(that.data.topBannerInfo)
        }
      }
    })
  },
  // 点击去加入会员
  goNewProducts(e){
    wx.navigateTo({
      url: '../newProducts/newProducts',
    })
  },
  // 点击去加入股东
  goTimeUp(e){
    wx.navigateTo({
      url: '../goTimeUp/goTimeUp',
    })
  },
  //获取为你推荐数据
  getRecommendGoods(url){
    var that = this
    wx.request({
      url: url,
      success(res){
        // console.log(res)
        if(res.data.success){
          var data = res.data.result;
          for(var i = 0;  i < data.length;i++){
            data[i].exhibition = imgUrl + data[i].exhibition;
            that.setData({
              recommendGoodsInfo: data
            })
          }
          // console.log(that.data.recommendGoodsInfo)
        }
      }
    })
  },
  // 获取今日爆品数据
  getHotGoods(url){
    var that = this;
    wx.request({
      url: url,
      success(res){
        // var data = res.data.result
        // console.log(res)
        if(res.data.success){
          var data = res.data.result;
          for (var i = 0; i < data.length;i++){
            data[i].exhibition = imgUrl + data[i].exhibition;
            that.setData({
              hotGoodsInfo: data
            })
          }
        }
      },fail(error){

      }
    })
  },
  // 限时秒杀+新品推荐
  goNewGoods(e){
    console.log(e)
    var tapId = e.currentTarget.dataset.tapid
    if (tapId == 0) {//新品推荐
      wx.navigateTo({
        url: '../newProducts/newProducts',
      })
    } else if (tapId == 1) { // 限时秒杀
      wx.navigateTo({
        url: '../timeUp/timeUp?isTimeUp='+true,
      })
    }
  },
  goProductDetail(e){
    // console.log(e);
    var product_id = e.currentTarget.dataset.product_id;
    wx.navigateTo({
      url: '../productDetails/productDetails?product_id=' + product_id,
    })
  },
  recommendGoProductDetail(e){
    wx.navigateTo({
      url: '../productDetails/productDetails',
    })
  },
  // 触摸开始
  touchstart: function (event) {

    var touchStart = event.touches[0].pageX;
    this.setData({
      touchStart: touchStart
    })
    // console.log(event)
  },
  // 触摸结束
  touchend: function (event) {
    var touchEnd = event.changedTouches[0].pageX;
    this.setData({
      touchEnd: touchEnd
    })
    // console.log(touchEnd)
  },
  click(e){
    // console.log(e)
  },
  // 触摸移动

  touchmove: function (event) {
    var touchMove = event.touches[0].pageX;
    this.setData({
      touchMove: touchMove
    })
    // console.log(touchMove)
    if (this.data.touchStart > this.data.touchEnd) {
      this.setData({
        touchMovingLeft: true,
        touchMovingRight: false
      })
    } else {
      this.setData({
        touchMovingRight: true,
        touchMovingLeft: false
      })
    }
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