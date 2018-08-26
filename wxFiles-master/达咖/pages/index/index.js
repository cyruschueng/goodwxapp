var app = getApp()
Page({
  data: {
    imgUrl:[],
    location:'定位中...',
    nearShop:[],
    url:'',
    loading:false,
    showCoupon:false,
    blockTools:[]
  },
  seeMore: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/seemore/seemore?index=' + e.currentTarget.dataset.index,
    })
  },
  goToShopBuy: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/shop/shop?shopid=' + e.currentTarget.dataset.shopid + '&shop=' + JSON.stringify(e.currentTarget.dataset.shop),
    })
  },
  //跳转到节日订购
  navToHoliday: function (){
    wx.navigateTo({
      url: '/pages/holiday/holiday',
    })
  },
  //跳转到卡商城
  navToCardmarket: function(){
    wx.navigateTo({
      url: '/pages/cardmarket/cardmarket',
    })
  },
  //跳转到搜索页
  navToSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //使用优惠券
  useCoupon: function (e) {
    //将优惠券id 放入 缓存
    wx.setStorageSync('couponid', e.currentTarget.dataset.id);
    this.closeCou();
  },
  //关闭优惠券弹窗
  closeCou: function () {
    this.setData({
      showCoupon:false
    })
  },
  //链接到商品列表页面   (已停用)
  navToGoodslist: function (e){
    wx.navigateTo({
      url: '/pages/goodslist/goodslist?key='+e.currentTarget.dataset.key+'&theme='+e.currentTarget.dataset.theme,
    })
  },
  //链接到立即点餐界面
  navToTakeit: function (){
    var that = this;
    wx.navigateTo({
      url: '/pages/takeit/takeit?latitude=' + that.data.latitude + '&longitude=' + that.data.longitude + '&location=' + that.data.location,
    })
  },

  //链接到shop 页面
  navToShop: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/shop/shop?shopid='+ that.data.nearShop[e.currentTarget.dataset.index].id,
    })
  },
  //先择地址
  chooseLocation: function(){
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          location:res.address,
          latitude:res.latitude,
          longitude:res.longitude
        })
        that.getShopList()
      },
    })
  },
  //获得商店列表方法
  getShopList: function(){
    var that = this;
    this.setData({
      loading:true
    })
    app.wxRequest('shop/wx/nearshop.do', { x: that.data.latitude, y: that.data.longitude }, function (res) {
      //商店列表
      var nearShop = res;

      //四舍五入算法
      for (var i = 0; i < nearShop.length; i++) {
        if (nearShop[i].distance >= 1000) {
          nearShop[i].distance = parseFloat(parseFloat(nearShop[i].distance) / 1000);
          var temp = parseFloat((nearShop[i].distance + '').substring(0, (nearShop[i].distance + '').indexOf('.') + 2));
          if (parseFloat((nearShop[i].distance + '').substring((nearShop[i].distance + '').indexOf('.') + 2, (nearShop[i].distance + '').indexOf('.') + 3)) > 4) {
            temp += 0.1;
          }
          nearShop[i].distance = (temp + '').substring(0, (temp + '').indexOf('.') + 2) + 'km'
        } else {
          nearShop[i].distance = nearShop[i].distance + 'm'
        }
      }
      //数据渲染
      that.setData({
        loading: false,
        nearShop: nearShop
      })
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中...',
      mask: false
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    app.setWindow(this);
    app.wxRequest('image/wx/find.do',{type:1},function(res){
      that.setData({
        imgUrl:res
      })
    })
    //分享者得用户ID
    var uid = '';
    if(options.userid){
      uid = options.userid;
    }
    //用户登录
    app.getUserInfo(uid,function(res){
      if (wx.getStorageSync("showCoupon").length > 0) {
        that.setData({
          coupon: wx.getStorageSync("showCoupon"),
          showCoupon: true
        })
      }
      app.getLocation(function (res) {
        //坐标
        var local = res;
        wx.hideLoading();
        var location = res.location.body;
        //推荐板块
        app.wxRequest('plate/wx/find.do',{
          type:2,userid:wx.getStorageSync("openid")
        },
        function(res){
          that.setData({
            blockTools:res,
            latitude: local.latitude,
            longitude: local.longitude,
            location: location,
            url: app.ip,
          });
          that.getShopList();
        })
      })
    });
    
  },

  onPullDownRefresh: function () {
    var that = this;
    app.wxRequest('plate/wx/find.do', {
      type: 2, userid: wx.getStorageSync("openid")
    },function(res){
      wx.stopPullDownRefresh();
      that.setData({
        blockTools: res,
      })
      that.getShopList();
    })
  },
 

  onShow: function () {
    
  },

  //分享
  onShareAppMessage: function () {
    return {
      title: '达咖首页',
      path:'/pages/index/index?userid='+wx.getStorageSync("openid"),
      success: function (res) {
        console.log(res)
        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success: function (res) {
            console.log(res)
          },
          fail:function(){
            console.log(res)
          }
        })
      }
    }
  }
})
