var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:1,
    goods:null,
    url:'',
    showDialog:false,
    shopid:null
  },
  //跳转到支付页面
  navToPayfor: function () {
    var temp = [];
    for (var i = 0; i < this.data.goods.attribute.length; i++) {
      temp.push(false)
      for (var j = 0; j < this.data.goods.attribute[i].content.length; j++) {
        if(this.data.goods.attribute[i].content[j].active) {
          temp[i] = true
        }
      }
    }
    console.log(temp)
    var tem = true;
    for(var i=0;i<temp.length;i++){
      if(!temp[i]){
        tem = false
      }
    }
    if(!tem){
      this.setData({
        showDialog: true,
      })
    }else{
      var that = this;
      var temp = 0;
      var shopCart = [];
      this.data.goods.text = "";
      shopCart.push(this.data.goods);
      console.log(shopCart)
      var totalPrice = this.data.goods.price;
      wx.navigateTo({
        url: '/pages/payfor/payfor?shopCart=' + JSON.stringify(shopCart) + '&totalPrice='
        + that.data.goods.totalPrice + '&shopNum=' + that.data.goods.count + '&shopsendprice=0&shopcouponstart=0&shopcouponend=0&shopboxprice=0&packageNum=0&shopid=' + that.data.shopid,
      })
    }
    
  },
  close: function (e){
    var log = this.data.showDialog;
    this.setData({
      showDialog:!log
    })
  },
  initAttr: function (e){
    for (var i = 0; i < this.data.goods.attribute.length;i++){
      for (var j = 0; j < this.data.goods.attribute[i].content.length;j++){
        this.data.goods.attribute[i].content[j].active =false
      }
    }
  },
  chooseIt: function (e) {
    var that = this;
    this.initAttr(e.currentTarget.dataset.in);
    if (that.data.goods.attribute[e.currentTarget.dataset.in].content[e.currentTarget.dataset.dex].active){
      that.data.goods.attribute[e.currentTarget.dataset.in].content[e.currentTarget.dataset.dex].active = false;
    }else{
      that.data.goods.attribute[e.currentTarget.dataset.in].content[e.currentTarget.dataset.dex].active = true;
      
    }
   this.counts();
    that.setData({
      goods:that.data.goods
    })
  },
  counts: function() {
    var that = this;
    var temp = 0
    for (var i = 0; i < this.data.goods.attribute.length; i++) {
      for (var j = 0; j < this.data.goods.attribute[i].content.length; j++) {
        if (this.data.goods.attribute[i].content[j].active) {
          temp += parseFloat(that.data.goods.attribute[i].content[j].addPrice);
        }
      }
    }
    that.data.goods.realprice = temp + that.data.goods.price;
    that.data.goods.totalPrice = ((temp + that.data.goods.price) * that.data.goods.discount * that.data.goods.count).toFixed(2);
  },
  //减少数量
  remin: function () {
    var that = this;
    var count = this.data.count;
    if (count > 1) {
      count = count - 1;
      this.data.goods.count -= 1
    }
    this.counts()
    this.setData({
      count: count,
      goods: that.data.goods
    })
  },
  //增加数量
  readd: function () {
    var that = this;
    var count = this.data.count;
    count = count + 1;
    this.data.goods.count += 1
    this.counts()
    this.setData({
      count: count,
      goods: that.data.goods
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setWindow(this);
    var that = this;
    app.wxRequest('product/wx/find.do',{id:options.id},function(res){
      var article = res[0].text;
      res[0].attribute = JSON.parse(res[0].attribute);
      res[0].count = 1;
      res[0].realprice = res[0].price;
      res[0].totalPrice = res[0].price;
      for (var i = 0; i < res[0].attribute.length;i++){
        for (var j = 0; j < res[0].attribute[i].content.length; j++){
          res[0].attribute[i].content[j].active =false;
        }
      }
      WxParse.wxParse('article', 'html', article, that, 5);
      that.setData({
        shopid:options.shopid,
        goods:res[0],
        url:app.ip
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})