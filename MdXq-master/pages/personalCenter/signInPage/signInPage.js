var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
var shop_id = app.globalData.shop_id;
var util=require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInTimeCurrent:true,
    customer_id:'',
    signPool:[],
    signPoolIng:[],
    sign_honey_bean:'',
    // 为你推荐数组
    recommendGoodsInfo: [],
    NotSignIn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendGoods(baseUrl + '/api/product/recommend?shop_id=' + shop_id + '&recommend_id=4')
  },
  // 获取签到渲染信息
  getSignInRenderInfo(url){
    var that=this;
    var formatTime = util.formatTime(new Date);
    var currentTime = formatTime.substring(11,13);
    var signPoolIng=[];
    var signPool=[];
    // console.log(currentTime)
    wx.request({
      url: url,
      success(res) {
        console.log(res)
        if (res.data.success) {
          var data = res.data.result.signPool;
          for (var i = 0; i < data.length;i++){
            if (data[i].state == 2 && signPoolIng.length==0){
              signPoolIng.push(data[i])
            }else{
              signPool.push(data[i])
            }
          }
          that.setData({
            signPool: signPool,
            signPoolIng: signPoolIng,
            sign_honey_bean: res.data.result.sign_honey_bean
          })
          // console.log(that.data.signPool)
          console.log(that.data.signPoolIng)
        } else if (res.data.msg == "暂不能签到，请联系客服"){
          that.setData({
            NotSignIn:true
          })
        }
      }
    })
  },
  // 点击签到
  signInClick(e){
    var pool_id = e.currentTarget.dataset.pool_id;
    var signInClickUrl = baseUrl + '/api/customer/sign-in?customer_id=' + this.data.customer_id + '&pool_id=' + pool_id;
    var signInRenderInfoUrl = baseUrl + '/api/customer/load-pool';
    wx.request({
      url: signInClickUrl,
      success(res){
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '领取成功',
          })
          this.getSignInRenderInfo(signInRenderInfoUrl + '?customer_id=' + this.data.customer_id);
        }else{
          wx.showToast({
            title: '领取失败',
          })
        }
      }
    })
  },
  //获取为你推荐数据
  getRecommendGoods(url) {
    var that = this
    wx.request({
      url: url,
      success(res) {
        // console.log(res)
        if (res.data.success) {
          var data = res.data.result;
          for (var i = 0; i < data.length; i++) {
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
  // 产品详情
  goProductDetail(e) {
    // console.log(e);
    var product_id = e.currentTarget.dataset.product_id;
    wx.navigateTo({
      url: '../../productDetails/productDetails?product_id=' + product_id,
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
    var that=this;
    var signInRenderInfoUrl = baseUrl +'/api/customer/load-pool';
    wx.getStorage({
      key: 'customer_id',
      success: function(res) {
        that.setData({
          customer_id:res.data
        })
        that.getSignInRenderInfo(signInRenderInfoUrl + '?customer_id=' + that.data.customer_id);
      },
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
  onShareAppMessage: function () {
  
  }
})