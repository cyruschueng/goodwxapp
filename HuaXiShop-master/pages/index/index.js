//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    GuestUserData:null,//用户信息
<<<<<<< HEAD
=======
    ShopInfo:null,//商城店铺
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
    ProductCategoryList:null,//商品分类
    LingShouProductList:null,//商品
  },
  onLoad: function () {
    var that = this
    if (app.globalData.GuestUserData) {
      that.setData({
        GuestUserData: app.globalData.GuestUserData,
        userInfo: app.globalData.userInfo
      })
      that.getShopInfo();
    } else {
      app.appCallback = res => {//用户信息返回后调用
        that.setData({
          GuestUserData: res.data,
          userInfo: app.globalData.userInfo
        });
        that.getShopInfo();
      }
    }
  },
  //获取商城店铺
  getShopInfo:function(){
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
        Command: "getShopInfo",
        ShopId:2,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log("获取商城店铺:")
        console.log(res)
<<<<<<< HEAD
        wx.setNavigationBarTitle({
          title: res.data.ds[0].ShopName,
        });
        that.getShopImages();
      }
    });
  },
  //获取店铺图片
  getShopImages:function(){
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
        Command: "getShopImages",
        ShopId: 2,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log("获取店铺图片:")
        console.log(res)
        that.getProductCategoryList();
      }
    });
  },
  //获取商城店铺分类
  getProductCategoryList:function(){
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
        Command: "getProductCategoryList",
        ShopId: 2,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log("获取商城店铺分类:")
        console.log(res)
        if(res.data.ds!=undefined){
        that.setData({
          ProductCategoryList:res.data.ds
        })
        }
        that.getLingShouProductList();
      }
    });
  },
  //获取商城商品
  getLingShouProductList:function(){
=======
        that.setData({
          ShopInfo:res.data.ds[0]
        })
        wx.setNavigationBarTitle({
          title: res.data.ds[0].ShopName,
        });
        that.getShopImages();
      }
    });
  },
  //获取店铺图片
  getShopImages:function(){
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
<<<<<<< HEAD
        Command: "getLingShouProductList",
=======
        Command: "getShopImages",
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
        ShopId: 2,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
<<<<<<< HEAD
        console.log("获取商城商品:")
        console.log(res)
        if (res.data.ds != undefined) {
        that.setData({
          LingShouProductList:res.data.ds
        })
        }
=======
        console.log("获取店铺图片:")
        console.log(res)
        that.getProductCategoryList();
      }
    });
  },
  //获取商城店铺分类
  getProductCategoryList:function(){
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
        Command: "getProductCategoryList",
        ShopId: 2,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log("获取商城店铺分类:")
        console.log(res)
        if(res.data.ds!=undefined){
        that.setData({
          ProductCategoryList:res.data.ds
        })
        }
        that.getLingShouProductList();
      }
    });
  },
  //获取商城商品
  getLingShouProductList:function(){
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
        Command: "getLingShouProductList",
        ShopId: 2,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log("获取商城商品:")
        console.log(res)
        if (res.data.ds != undefined) {
        that.setData({
          LingShouProductList:res.data.ds
        })
        }
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
      }
    });
  },
})
