// pages/cooperation/goodsList/goodsList.js
const app = getApp();
var pages = 1;
Page({
  data: {
    classlist:[],
    goodslist:[],
    loadtext:true,
    shop_id:0,
    selectlistshow:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shop_id: options.shop_id
    })
    pages=1;
    this.requestShopdata("", pages,"");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      pages=1;
      this.requestShopdata("", pages,"",true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      pages++;
      this.requestShopdata("", pages, "");
  },
  //请求产品列表
  requestShopdata: function (cat_id, page, search,msg) {
    var _this = this;
    wx.request({
      url: app.globalData.url + '/shop/goodsmanager/getGoodsList',
      method: 'get',
      data: {
          shop_id: _this.data.shop_id,
          cat_id: cat_id,
          page: page,
          search: search,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          if (res.data.errcode==0){
              if (msg == true) {
                  setTimeout(function () {
                      _this.ShowToast("刷新成功");
                      wx.stopPullDownRefresh();
                  }, 1000)
              }
              if (res.data.data.length==0){
                  _this.ShowToast("没有更多数据");
                  _this.setData({
                    loadtext: false,
                    goodslist:[],
                  })
              }else{
                var resd = res.data.data.data;
                var resarr = [];
                for (var i = 0; i < resd.length; i++) {
                  resarr.push(resd[i]);
                  _this.setData({
                    goodslist: resarr,
                  })
                }
                _this.setData({
                    loadtext: true,
                })
              }
          }else{
              _this.ShowToast("网络错误")
          }
      }
    })
  },
  //根据店铺产品分类
  changeActive: function () {
    var _this = this;
    wx.request({
      url: app.globalData.url + '/shop/shop/getGoodsCatInfo',
      method: 'get',
      data: {
        shop_id: _this.data.shop_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.errcode == 0) {
          _this.setData({
            classlist: res.data.data,
            selectlistshow: false,
          })
        } else {
          _this.ShowToast("网络错误");
        }
      }
    })
  },
  selectlisthide:function(){
      this.setData({
        selectlistshow:true,
      })
  },
  inputvalue:function(e){
      pages=1;
      this.requestShopdata("", pages,e.detail.value)
  },
  //店铺分类
  classtab:function(e){
      pages=1;
      this.requestShopdata(e.currentTarget.dataset.id,pages,"");
      this.setData({
        selectlistshow:true,
      })
  },
  goodsDetail:function(e){
    wx.navigateTo({
      url: '/pages/myCenter/shop/goodsDetail/goodsDetail?goodsid=' + e.currentTarget.dataset.index + '&shop_id=' + this.data.shop_id
    })
  },
  ShowToast:function(e){
    wx.showToast({
      title: e,
      icon: 'success',
      duration: 1000
    })
  }
})