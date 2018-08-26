// pages/goods-list/goods-list.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_title:'',
    lists: [],

    goods_num: 1,
    animationData_1: {},
    animationData_2: {}
  },

  //搜索商品功能
  formSubmit: function (e) {
    console.log(e.detail.value.keyword)
    let that = this
    wx.request({
      url: web_url + '/app.php?c=Goods&act=index',
      data: {
        keyword: e.detail.value.keyword
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          lists: res.data,
        })
      },
    })
  },


  goods_details: function (e) {
    console.log(e)
    var idx = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods-details/goods-details?id=' + idx,
      success: function (res) { },
    })
  },


  //动画函数
  animationFn: function (btt, top_fixed) {
    var that = this;
    var animation_1 = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: "50% 50% 0",
    });
    animation_1.bottom(btt).step();
    var animation_2 = wx.createAnimation({
      duration: 0,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: "50% 50% 0",
    });
    animation_2.top(top_fixed).step();
    that.setData({
      animationData_1: animation_1.export(),
      animationData_2: animation_2.export(),
    })
  },
  //点加入购物车图标，调用动画
  toShopcart: function (e) {
    var that = this;
    var goods_id = e.currentTarget.dataset.id
    wx.request({
      url: web_url + '/app.php?c=Goods&act=show',
      data: {
        user_id: that.data.user_id,
        id: goods_id
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        var title = res.data.name;
        var price = res.data.price;
        var stock = res.data.inventory;
        var goods_img = res.data.thumb
        that.setData({
          title: title,
          price: price,
          stock: stock,
          goods_img: goods_img,
          goods_id: goods_id
        })
      },
    })
    that.animationFn(0, 0)
  },
  //关闭动画块
  animation_close: function () {
    var that = this
    that.animationFn('-500rpx', '1250rpx')
  },
  //减少购买数量
  minusCount: function (e) {
    var that = this
    let goods_num = that.data.goods_num;
    goods_num--;
    if (goods_num == 0) {
      goods_num = 1
    }
    that.setData({
      goods_num: goods_num
    })
  },
  //增加购买数量
  addCount: function (e) {
    var that = this;
    let goods_num = that.data.goods_num;
    goods_num++;
    that.setData({
      goods_num: goods_num
    })
  },
  //手动输入购买数量
  changeNumFn: function (e) {
    var that = this;
    let goods_num = e.detail.value;
    that.setData({
      goods_num: goods_num
    })
  },
  //提交购物车
  submitOrder: function (e) {
    var that = this;
    wx.request({
      url: web_url + '/app.php?c=Cart',
      data: {
        user_id: that.data.user_id,
        goods_id: that.data.goods_id,
        goods_num: that.data.goods_num
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx.showToast({
          title: '加入成功',
          icon: 'succcess',
          image: '',
          duration: 2000,
          mask: true,
        })
      },
    })
  },


  onLoad: function (options) {
    var that = this
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
    }
    that.setData({
      user_id: that.data.user_id,
    })
    wx.request({
      url: web_url + '/app.php?c=Goods&act=index',
      data: {
        cate_id: options.cate_id
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.setData({
          lists: res.data,
          list_title: options.title
        })
      },
    })

    wx.setNavigationBarTitle({
      title: options.title,
      success: function (res) { },
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})