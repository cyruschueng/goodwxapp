// pages/me/me.js
let that;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'名字',
    imageUrl:'',
    orderList: [
      { image: 'http://res.o2o.com.cn:8082/img/8a40de726d4a4927b3ace0b3a06faa59', title: '待付款'},
      { image: 'http://res.o2o.com.cn:8082/img/6878535b3cbd49919328126fe5464f35', title: '待收货'},
      { image: 'http://res.o2o.com.cn:8082/img/254359d0f3b04be08037645fe7f706ec', title: '待评价'},
      { image: 'http://res.o2o.com.cn:8082/img/f2002c88e6c546daa144468bdeff1d91', title: '全部订单'},
    ],
    headerBgImageUrl: 'http://res.o2o.com.cn:8082/img/de7662bf67d14607afb0eccd1d3da8ec',
    list: [
      // {id: 0, image: 'http://res.o2o.com.cn:8082/img/36649409052644f89fbab5009c329940', name: '优惠券' },
      {id: 1, image: 'http://res.o2o.com.cn:8082/img/ea9f255fe04a46beacb94862369a6db8', name: '购物车' },
      {id: 2, image: 'http://res.o2o.com.cn:8082/img/5406d19e32544468a633c742576e44d9', name: '消息' },
    ],
    arrow: 'http://res.o2o.com.cn:8082/img/f5a743bbab7c417fadca160f13f399eb',
    waitNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({
      headerBgImageUrl: that.getHeaderBgImageUrl(app.globalData.skin)
    });
    wx.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: that.getNavBgColor(app.globalData.skin)
    });
    app.util.get("/ApiShop/CustomerInfo", {}, function (res) {
      that.setData({
        nickName: res.Name,
        imageUrl: res.Avatar
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShow: function () {
    that.requestData();
  },
  //流程按钮
  flowTap: function (e) {
    var id = e.currentTarget.dataset.id;
    var selectIndex = 0;//对应的order里面的index
    switch (id) {
      case 0://待付款
        selectIndex = 1;
        break;
      case 1://待收货
        selectIndex = 3;
        break;
      case 2://待评价
        wx.navigateTo({
          url: 'children/evaluateList/evaluateList',
        });
        return;
      case 3://全部订单
        selectIndex = 0;
        break;
      default:
        break;
    }
    wx.navigateTo({
      url: 'children/myOrder/myOrder?selectIndex=' + selectIndex,
    });
  },

  //列表点击事件
  listCellTap: function (e) {
    var id = e.currentTarget.dataset.id;
    switch (id) {
      case 0://优惠券
        wx.navigateTo({
          url: 'children/tickets/tickets',
        })
        break;
      case 1://购物车
        wx.navigateTo({
          url: '/pages/cart/cart',
        });
        break;
      case 2://消息
        break;
      default:
        break;
    }
  },

  /**
     * 收货地址点击事件
     */
  shoppingAddressTab: function () {
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  // 待付款状态
  requestData: function (){ 
    app.util.get("/ApiShop/MyOrderList?pageIndex=1&status=0", {}, function (res) {
      that.setData({
        waitNum: res.length
      })
    });
  },
  //背景色
  getHeaderBgImageUrl: function (skin) {
    var imageUrl = "http://res.o2o.com.cn:8082/img/de7662bf67d14607afb0eccd1d3da8ec";
    switch (skin) {
      case "gray":
        imageUrl = "http://res.o2o.com.cn:8082/img/f31ddec09e95492b8b0f81b159bab2d9";
        break;
      case "green":
        imageUrl = "http://res.o2o.com.cn:8082/img/1337727086274ab29b739723e1194ffe";
        break;
      case "blue":
        imageUrl = "http://res.o2o.com.cn:8082/img/26cdcf9160f243c68c16f86b098ec3d2";
        break;
    }
    return imageUrl;
  },
  //顶部颜色
  getNavBgColor: function (skin) {
    var color = "#fef2f6";
    switch (skin) {
      case "gray":
        color = "#fefefe";
        break;
      case "green":
        color = "#fefefe";
        break;
      case "blue":
        color = "#fefefe";
        break;
    }
    return color;
  }
})