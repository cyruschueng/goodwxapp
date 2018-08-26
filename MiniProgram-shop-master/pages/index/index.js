//index.js
//获取应用实例
const app = getApp()
const web_url = getApp().globalData.web_url;

Page({
  data: {
    imgUrl: [],
    items:[],

    title_1:'',
    text_1:'',
    info_1_img:'',

    title_2: '',
    text_2: '',
    info_2_img: '',

    title_3: '',
    text_3: '',
    info_3_img: '',

    ad_img:'',

    lists:[],
    goods_num: 1,
    animationData_1: {},
    animationData_2:{}
    
  },
  //事件处理函数
  goodsList: function (e) {
    var that = this;
    var idx = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var title = that.data.items[index].name
    wx.navigateTo({
      url: '/pages/goods-list/goods-list?cate_id=' + idx + '&title=' + title
    })
  },
  goods_details: function (e) {
    var idx = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods-details/goods-details?id=' + idx
    })
  },
  info_list: function (e) {
    let idx = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/info-list/info-list?id=' + idx
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
    that.animationFn(0,0)
  },
  //关闭动画块
  animation_close: function () {
    var that = this
    that.animationFn('-500rpx','1250rpx')
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

  onLoad: function () {
    var that = this;
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
    }

    //首页轮播图
    wx.request({
      url: web_url + '/app.php?c=Banner&act=index',
      data: {},
      header: { 'content-type': 'application/json'},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        var imgUrl = res.data
        that.setData({
          imgUrl:imgUrl
        })
      },
    })

    //导航栏 产品分类
    wx.request({
      url: web_url + '/app.php?c=Goods&act=cate',
      data: {},
      header: { 'content-type': 'application/json'},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res)
        var items = res.data.list
        that.setData({
          items: items
        })
      },
    })

    //皮具资讯
    wx.request({
      url: web_url + '/app.php?c=Notice&act=pjzxshow&id=3',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        var title_1 = res.data.data.name;
        var text_1 = res.data.data.content;
        var info_1_img = res.data.data.thumb
        that.setData({
          title_1: title_1,
          text_1: text_1,
          info_1_img: info_1_img
        })
      },
    })

    //右边资讯
    wx.request({
      url: web_url + '/app.php?c=Notice&act=pjzxshow&id=4',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log('zixun',res)
        var title_2 = res.data.data.name;
        var text_2 = res.data.data.content;
        var info_2_img = res.data.data.thumb
        that.setData({
          title_2: title_2,
          text_2: text_2,
          info_2_img: info_2_img
        })
      },
    })
    wx.request({
      url: web_url + '/app.php?c=Notice&act=pjzxshow&id=5',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        var title_3 = res.data.data.name;
        var text_3 = res.data.data.content;
        var info_3_img = res.data.data.thumb
        that.setData({
          title_3: title_3,
          text_3: text_3,
          info_3_img: info_3_img
        })
      },
    })

    //广告宣传图
    wx.request({
      url: web_url + '/app.php?c=Banner&act=carouselpord',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        var ad_img = res.data[0].thumb
        that.setData({
          ad_img: ad_img
        })
      },
    })

    //产品列表
    wx.request({
      url: web_url + '/app.php?c=Goods&act=index',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        var lists = res.data
        that.setData({
          lists: lists
        })
      },
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
