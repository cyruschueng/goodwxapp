var app= getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nearShop:[],
    loading:false,
    url:null,
    location:'',
    like:'',
    onload:false
  },
  search: function(e){
    this.setData({
      like:e.detail.value
    })
    this.getShopList(0)
  },
  //先择地址
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          location: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
        that.getShopList(0)
      },
    })
  },
  //链接到shop 页面
  navToShop: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/shop/shop?isTangs=1&&shopid=' + e.currentTarget.dataset.index,
    })
  },
  //获得商店列表方法
  getShopList: function (num) {
    this.setData({
      loading:true
    })
    var that = this;
    var data = { x: that.data.latitude, y: that.data.longitude, start: num }
    if(that.data.like != ''){
      data.like = that.data.like
    }
    app.wxRequest('shop/wx/search.do',data , function (res) {
      //商店列表
      var nearShop = null;
      if (num > 0) {
        nearShop = that.data.nearShop;
        for (var i = 0; i < res.length; i++) {
          if (res[i].distance >= 1000) {
            res[i].distance = parseFloat(parseFloat(res[i].distance) / 1000);
            var temp = parseFloat((res[i].distance + '').substring(0, (res[i].distance + '').indexOf('.') + 2));
            if (parseFloat((res[i].distance + '').substring((res[i].distance + '').indexOf('.') + 2, (res[i].distance + '').indexOf('.') + 3)) > 4) {
              temp += 0.1;
            }
            res[i].distance = (temp + '').substring(0, (temp + '').indexOf('.') + 2) + 'km'
          } else {
            res[i].distance = res[i].distance + 'm'
          }
          nearShop.push(res[i]);
        }
      }else{
        nearShop = res;
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
      }
      
      

      if(num > 0){
      
      }
      //数据渲染
      that.setData({
        loading: false,
        nearShop: nearShop,
        onload:true
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      location:options.location,
      latitude: options.latitude,
      longitude: options.longitude,
      url:app.ip
    })
    this.getShopList(0);
  },
  onReachBottom: function () {
    this.getShopList(this.data.nearShop.length);
  },
})