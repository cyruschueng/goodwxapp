// pages/business/ShopList/ShopList'.js
var app = getApp();
var page = 1;
var requestShopList = function(ele,val){
  var _this = this;
    wx.request({
      url: app.globalData.url +'/shop/shop/getShopList',
      method: 'get',
      data: {
        page: page,
        size: 10,
        search: val == undefined ? "" : val,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          if (res.data.data.arr!=0){
            console.log(res.data.data)
            var shoplist = ele.data.shoplist;
            for (var i = 0; i < res.data.data.arr.length; i++) {
              shoplist.push(res.data.data.arr[i]);
              ele.setData({
                shoplist: shoplist
              });
            }
            page++;
          }else{
              wx.showToast({
                title: '没有更多数据了',
                icon: 'success',
                duration: 1000
              })
              return false;
          }
      }
    })
}
Page({
  data: {
      shoplist:[],
      search:"",
      alldata:true,
      pagenum:1
  },
  onLoad: function (options) {
    page = 1;
    requestShopList(this);
    //店铺地理导航
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       scale: 28
    //     })
    //   }
    // })

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(){
    requestShopList(this);
    console.log("上拉");
  },
  //获取用户地理位置
  getuserloation:function(){
      wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
      }
    })
     
  },
  viewMoreGoods: function (e) {
    wx.navigateTo({
      url: '/pages/business/shop/shop?shop_id=' + e.currentTarget.dataset.index + ''
    })
  },
  getsearch:function(e){
    page = 1;
    this.setData({
      shoplist : [],
    });
    requestShopList(this,e.detail.value);
  }
})