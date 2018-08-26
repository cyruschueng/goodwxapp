var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctapFlag:1,
    //是否显示商品详情参数
    showdetail: false,

    //显示商品的列表
    goods: [],
    innerScroll: false,
    lfalg: 0,

    //是否显示购物车参数
    showCart: false,

    // 店铺ID
    shopId: null,
    url: null,

    //过度商品
    tempGoods: null,

    //购物车商品列表
    shopCart: [],

    //合计价格
    totalPrice: 0,
    //合计商品件数
    shopNum: 0,
    //餐盒数量
    packageNum:0,
    //原商品列表
    initGoods: []
  },
  closeTapCarts:function (){
    this.setData({
      showCart: false,
    })
  },
  makeCall: function (){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.shop.shopphone,
    })
  },
  navToGoodsDetail: function(e){
    var that = this;
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?id=' + e.currentTarget.dataset.id + '&shopid=' + e.currentTarget.dataset.shopid,
    })
  },
  ctap: function (e) {
    this.setData({
      ctapFlag:e.currentTarget.dataset.id
    })
  },
  //计算购物车商品数量  和   总价
  sumTs: function () {
    var cart = this.data.shopCart;
    var num = 0;
    var price = 0;
    var packageNum = 0
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        num += cart[i].count;
        price += cart[i].realprice * cart[i].count;
        if (cart[i].packageprice){
          packageNum += 1;
        }
      }
      this.setData({
        packageNum: packageNum,
        shopNum: num,
        totalPrice: price
      })
    }
  },
  //选择规格
  chooseIt: function (e) {
    if (this.data.tempGoods.attribute[e.currentTarget.dataset.in].content[e.currentTarget.dataset.dex].active) {
      this.data.tempGoods.attribute[e.currentTarget.dataset.in].content[e.currentTarget.dataset.dex].active = false;
    } else {
      for (var i = 0; i < this.data.tempGoods.attribute[e.currentTarget.dataset.in].content.length; i++) {
        this.data.tempGoods.attribute[e.currentTarget.dataset.in].content[i].active = false;
      }
      this.data.tempGoods.attribute[e.currentTarget.dataset.in].content[e.currentTarget.dataset.dex].active = true;
    }
    var temp = this.data.tempGoods;
    this.setData({
      tempGoods: temp
    })
  },
  close: function () {
    this.setData({
      showdetail: false,
      scroll: true
    })
  },
  //跳转到支付页面
  navToPayfor: function () {
    var that = this;
    var temp = 0;
    for (var i = 0; i < that.data.shopCart.length;i++){
      if (that.data.shopCart[i].packageprice){
        temp += that.data.shop.shopboxprice * that.data.shopCart[i].count
      }
    }
    wx.navigateTo({
      url: '/pages/payfor/payfor?isTangs='+that.data.isTangs+'&shopCart=' + JSON.stringify(that.data.shopCart) + '&totalPrice=' 
        + that.data.totalPrice + '&shopNum=' + that.data.shopNum + '&shopsendprice=' 
      + that.data.shop.shopsendprice + "&shopcouponstart=" + that.data.shop.shopcouponstart
      + "&shopcouponend=" + that.data.shop.shopcouponend + "&shopboxprice=" + temp + "&packageNum=" + that.data.packageNum
      + "&shopname=" + that.data.shop.shopname + "&shopid=" + that.data.shop.id + "&shopimage=" + that.data.shop.shopimage + "&shopphone" + that.data.shop.shopphone,
    })
  },

  //购车车内商品 +1
  cartShopAdd: function (e) {
    var that = this;
    that.data.shopCart[e.currentTarget.dataset.index].count = this.data.shopCart[e.currentTarget.dataset.index].count + 1;
    for (var i = 0; i < that.data.goods.length; i++) {
      for (var j = 0; j < that.data.goods[i].product.length; j++) {
        if (that.data.goods[i].product[j].id == that.data.shopCart[e.currentTarget.dataset.index].id) {
          that.data.goods[i].product[j].count += 1;
        }
      }
    }
    that.setData({
      shopCart: that.data.shopCart,
      goods: that.data.goods
    })
    that.sumTs();
  },
  //加入购物车   判断 规格与ID
  addToCart: function (e) {
    var tempGoods = this.data.tempGoods;
    var shopCart = this.data.shopCart;
    var that = this;
    that.data.goods[tempGoods.index1].product[tempGoods.index2].count += 1;
    var temp = '';
    tempGoods.gui = '';
    for (var i = 0; i < tempGoods.attribute.length; i++) {
      var flag = false;
      for (var j = 0; j < tempGoods.attribute[i].content.length; j++) {
        if (tempGoods.attribute[i].content[j].active) {
          flag = true;
          tempGoods.gui = tempGoods.gui + tempGoods.attribute[i].content[j].label + ' /';
          tempGoods.realprice += parseFloat(tempGoods.attribute[i].content[j].addPrice * tempGoods.discount);
        }
      }
      if (!flag) {
        temp += ' ' + tempGoods.attribute[i].title;
      }
    }
    tempGoods.gui = tempGoods.gui.substring(0, tempGoods.gui.length - 1);
    if (temp == '') {
      if (shopCart.length > 0) {
        var temp = false;
        var tnum = -1;
        for (var i = 0; i < shopCart.length; i++) {
          if (shopCart[i].id == tempGoods.id && shopCart[i].gui == tempGoods.gui) {
            temp = true;
            tnum = i;
          }
        }
        if (temp) {
          shopCart[tnum].count += 1;
        } else {
          tempGoods.count = 1;
          shopCart.push(tempGoods);
        }
        this.setData({
          shopCart: shopCart,
          showdetail: false,
          goods: that.data.goods
        })
      } else {
        tempGoods.count += 1;
        shopCart.push(tempGoods);
        this.setData({
          shopCart: shopCart,
          showdetail: false,
          goods: that.data.goods
        })
      }
    } else {
      wx.showToast({
        title: '您还没选择 ' + temp,
        image: '/img/60.png',
        duration: 800
      })
    }
    this.sumTs();
  },
  //购物车数量 -1
  reduseBtn: function (e) {
    var reType = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    var that = this;
    

    var temp = [];
    for (var i = 0; i < that.data.shopCart.length; i++) {
      temp.push({ list: [] });

    }
    var showdetail = false;
    
    if (reType == 0){
      for (var i = 0; i < that.data.goods.length; i++) {
        if (that.data.goods[i].id == id){
          if (that.data.goods[i].attribute){
            showdetail = true;
          }
        }
      }
      if (!showdetail){
        for (var i = 0; i < that.data.goods.length; i++) {
          for (var j = 0; j < that.data.goods[i].product.length; j++) {
          if (that.data.goods[i].product[j].id == id) {
            if (that.data.goods[i].product[j].count > 0)
              that.data.goods[i].product[j].count = that.data.goods[i].product[j].count-1
          }
          }
        }
        for (var i = 0; i < that.data.shopCart.length; i++) {
          if (that.data.shopCart[i].id == id) {
            if (that.data.shopCart[i].count > 1)
              that.data.shopCart[i].count = that.data.shopCart[i].count - 1
            else if (that.data.shopCart[i].count == 1){
              that.data.shopCart.splice(i, 1);
            }
          }

        }
      }
    }else{
      showdetail = true;
      for (var i = 0; i < that.data.goods.length; i++) {
        for (var j = 0; j < that.data.goods[i].product.length; j++) {
          if (that.data.goods[i].product[j].id == id && that.data.goods[i].product[j].count > 0) {
            that.data.goods[i].product[j].count = that.data.goods[i].product[j].count - 1;
          }
        }
      }
      if(that.data.shopCart[e.currentTarget.dataset.index].count >1 ){
        that.data.shopCart[e.currentTarget.dataset.index].count = that.data.shopCart[e.currentTarget.dataset.index].count-1;
      } else if(that.data.shopCart[e.currentTarget.dataset.index].count == 1){
        that.data.shopCart.splice(e.currentTarget.dataset.index,1);
      }
    }
    

    that.setData({
      showCart: showdetail,
      shopCart: that.data.shopCart,
      goods: that.data.goods
    })
    that.sumTs();
  },
  //加入购物车 add 增加数量
  addBtn: function (e) {
    
    this.initGoods()
    var that = this;
    var attr = false;
    var tempGoods = null;
    console.log(that.data.goods,e.currentTarget.dataset.in)
    tempGoods = that.data.goods[e.currentTarget.dataset.in].product[e.currentTarget.dataset.dex];
    tempGoods.realprice = tempGoods.price * tempGoods.discount;
    tempGoods.gui = '无'
    //当 商品 有参数时 执行
    if (that.data.goods[e.currentTarget.dataset.in].product[e.currentTarget.dataset.dex].attribute) {
      attr = true;

      tempGoods.attribute = that.data.goods[e.currentTarget.dataset.in].product[e.currentTarget.dataset.dex].attribute;
      //显示的 单品应付价格

      tempGoods.index1 = e.currentTarget.dataset.in;
      tempGoods.index2 = e.currentTarget.dataset.dex;
      console.log(tempGoods)
      //初始化规格的选项
      for (var i = 0; i < tempGoods.attribute.length; i++) {
        for (var j = 0; j < tempGoods.attribute[i].content.length; j++) {
          tempGoods.attribute[i].content[j].active = false;
        }
      }

      this.setData({
        tempGoods: tempGoods,
        showdetail: true,
      })
    } else { //当 商品 无参数时 执行

      //商品列表里商品 +1
      that.data.goods[e.currentTarget.dataset.in].product[e.currentTarget.dataset.dex].count += 1;
      var shopCart = that.data.shopCart;
      if (shopCart.length > 0) {
        var temp = false;
        var tem = 0;
        for (var i = 0; i < shopCart.length; i++) {
          if (shopCart[i].id == tempGoods.id) {
            temp = true;
            tem = i;
          }
        }
        if (temp) {
          shopCart[tem].count += 1;
        } else {
          shopCart.push(tempGoods);
        }
      } else {
        shopCart.push(tempGoods);
      }
      this.setData({
        shopCart: shopCart,
        goods: that.data.goods
      })
    }
    this.sumTs();

  },
  //初始化商品
  initGoods: function () {
    var goods = this.data.goods;
    for (var i = 0; i < goods.length; i++) {
      for (var j = 0; j < goods[i].product.length; j++) {
        if (goods[i].product[j].attribute && goods[i].product[j].attribute !="")
         goods[i].product[j].attribute = JSON.parse(goods[i].product[j].attribute);

      }
    }
    this.setData({
      goods: goods
    })
  },
  //购物车详情信息 显示与关闭
  showCart: function () {
    if (this.data.showCart) {
      this.setData({ showCart: false })
    } else {
      this.setData({ showCart: true })
    }
  },
  //跟换菜单
  changeMeun: function (e) {
    var shop = this.data.goods;

    for (var i = 0; i < shop.length; i++) {
      shop[i].active = false;
    }
    shop[e.currentTarget.dataset.index].active = true;

    this.setData({
      goods: shop,
      lfalg: 't' + e.currentTarget.dataset.index,
      innerScroll: true
    })
  },
  load: function (shop) {
    var that = this;
    app.wxRequest('classes/wx/find.do', { type: 2, parent: that.data.shop.id, relation: true }, function (res) {
      var temp = res;
      var e = {}
      for (var i = 0; i < temp.length; i++) {
        res[i].active = false;
        for (var j = 0; j < temp[i].product.length; j++) {
          temp[i].product[j].count = 0;
          if(shop != ''){
            console.log(temp[i].product[j].id == shop.id)
            if (temp[i].product[j].id == shop.id){
              e = {
                currentTarget:{
                  dataset:{
                    in:i,
                    dex:j
                  }
                }
              };
              
            }
          }
        }
      }
      res[0].active = true;
      var showCart = false;
      if(shop != ''){
        showCart = true
      }
      that.setData({
        goods: temp,
        initGoods: temp,
        showCart: showCart
      })
      if(shop!= ''){
        that.addBtn(e);
      }
        
    })
  },

  /**
   * 外部scroll-view bindscroll监听方法
   */
  outerScrollListenerPlay: function (e) {
    this.setData({
      innerScroll: true
    })
  },
  outerScrollListenerStop: function () {
    this.setData({
      innerScroll: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isTangs = 0;
    if(options.isTangs){
      isTangs = options.isTangs;
    }
    var that = this;
    app.setWindow(this);
    var shop = '';
    if(options.shop){
      shop = JSON.parse(options.shop);
    }
    app.wxRequest('shop/findshop.do', { id: options.shopid,type:2,userid:wx.getStorageSync("openid")},function(res){
      that.setData({ shop: res[0], url: app.ip, isTangs: isTangs });
      that.load(shop);
      var date = new Date();
      var st = parseInt(res[0].starttime.substring(0,2));
      var art = parseInt(res[0].starttime.substring(3, 5));
      var en = parseInt(res[0].endtime.substring(0, 2));
      var nd = parseInt(res[0].endtime.substring(3, 5));
      var nowSt = parseInt(date.getHours());
      var nowArt = parseInt(date.getMinutes());

      if(nowSt > st && nowSt < en){

      } else if (nowSt == st && nowArt > art){
        
      } else if (nowSt == en && nowArt < nd){

      } else{
        wx.showModal({
          title: '提示',
          content: '现在不是营业时间哦！店家营业时间为' + res[0].starttime+'-'+res[0].endtime,
          showCancel:false,
          success: function(res){
            wx.navigateBack({
              delta:1
            })
          }
        })
      }
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

})