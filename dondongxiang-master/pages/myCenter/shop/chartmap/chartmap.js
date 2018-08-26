// pages/myCenter/shop/chartmap/chartmap.js
var app = getApp();
Page({
  data: {
    checkbox:0,
      maplist:[ ],
      curraddress:{}

  },
  onLoad: function (options) {
     var that = this;
     that.GetaddressInfo();
  },
  onPullDownRefresh: function () {
    var that = this;
    that.GetaddressInfo();
    wx.stopPullDownRefresh();
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  //获取地址信息
  GetaddressInfo:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + '/pay/orders/getAddress',
      method: 'get',
      data: {
        user_id: app.globalData.user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.errcode == 0) {
          console.log(res);
          that.setData({
            maplist: res.data.data,
          })
        } else {
          this.viewmsg("网络出问题");
        }
      }
    })
  },
  maplist:function(e){
    this.setData({
      checkbox: e.currentTarget.dataset.id
    })
    // console.log(this.data.checkbox);
    // console.log(e);
    this.mapedit(this.data.checkbox);
  },
  //添加地址
  AddAddress:function(username,tle,address,detail_address){

    wx.request({
      url: app.globalData.url +'/pay/orders/addAddress',
      method:"POST",
      data:{
        user_id: app.globalData.user_id,
        user_name: username,
        tel: tle,
        address: address,
        detail_address: detail_address,
        is_default_address:0
      },
      header: {
        'content-type':'application/json'
      },
      success:function(res) {
        console.log(res)
        that.GetaddressInfo();
      }
    })


    //var _this = this;
    // if (wx.chooseAddress) {
    //   wx.chooseAddress({
    //     success: function (res) {
          //console.log(app.globalData.user_id)
          
      //   },
      //   fail: function (err) {
      //     _this.viewmsg("操作错误");
      //   }
      // })
    // } else {
    //   this.viewmsg("当前版本过低")
    // }
  },
  //编辑地址
  mapedit: function (addressid) {
    console.log(addressid);
    var that = this;
    for (var i = 0; i < that.data.maplist.length; i++) {
      if (that.data.maplist[i].address_id = addressid){
        that.setData({
          curraddress: that.data.maplist[i]
        })
      }
    }
    console.log(that.data.curraddress);
    wx.request({
      url: app.globalData.url + '/pay/orders/setDefaultAddress',
      method: "POST",
      data: {
        address_id: addressid,
        // user_name: that.data.curraddress.user_name,
        // tel: that.data.curraddress.tel,
        // address: that.data.curraddress.address,
        // detail_address: that.data.curraddress.detail_address,
        // is_default_address: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        // that.GetaddressInfo();
      }
    })
  },
  //删除地址
  mapdel:function(e){
    console.log(e);
    var that = this;
    wx.request({
      url: app.globalData.url +'/pay/orders/delAddress',
      method: "POST",
      data: {
        address_id: e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res),
        that.GetaddressInfo();
      }
    })
  },
  mapadd:function(e){
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(res)
          var address = res.provinceName+res.cityName+res.countyName
          that.AddAddress(res.userName, res.telNumber, address,res.detailInfo);
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
  viewmsg:function(e){
    wx.showToast({
      title: e,
      icon: 'success',
      duration: 2000
    })
  }
})