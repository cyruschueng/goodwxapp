// pages/self/publish/publish.js
var app = getApp()
var product_name = "";//产品名称
var material = "";//材质
var price = "";//产品价格
var org_price = "";//产品原价格
var freight_price = "";//运费
var stock_number = 1;//产品库存
var deliver_address ="";//发货地址
var goods_desc = ""//产品描述

Page({
  data: {
    array: [],
    index: 0,
    shop_id:"",
    goods_id:0,//产品ID
    catinfo:[],//分类数组
    innerwidth:0,
    proinnerimg:[],//产品轮播图数组
    descimglist:[],//产品描述图片数组
    goods_name: "",//产品名
    material: "",//材质
    price: "",//价格
    oldprice: "",//原价格
    stock_number: "",//库存
    goods_desc: "",//产品描述
    freight_price:"",//运费
  },
  onLoad: function (opt) {
    console.log(opt);
    if (opt.goodsid>0){
       //有产品ID就是编辑了,刷新产品信息
      this.setData({
        goods_id: opt.goodsid
      })
      this.refreshgoodsinfo(this.data.goods_id);
      
    }
    this.setData({
      shop_id: opt.shop_id
    })
    this.getclassdata();
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  //产品描述
  bindTextAreaBlur: function (e) {
    this.setData({
      goods_desc: e.detail.value
    })
    goods_desc = e.detail.value
  },
  //产品名字控件读取数值
  productNameInput: function (e) {
    this.setData({
      goods_name: e.detail.value
    })
    product_name = e.detail.value
  },
  //产品材质控件读取数值
  MaterialInput: function (e) {
    this.setData({
      material: e.detail.value
    })
    material = e.detail.value
  },
  //产品价格控件读取数值
  priceInput: function (e) {
    this.setData({
      price: e.detail.value
    })
    price = e.detail.value
  },
  //产品原价格控件读取数值
  org_priceInput: function (e) {
    this.setData({
      org_price: e.detail.value
    })
    org_price = e.detail.value
  },
  //产品运费格控件读取数值
  freight_priceInput: function (e) {
    this.setData({
      freight_price: e.detail.value
    })
    freight_price = e.detail.value
  },
  //产品库存格控件读取数值
  stock_numberInput: function (e) {
    this.setData({
      stock_number: e.detail.value
    })
    stock_number = e.detail.value
  },
  //产品发货地址控件读取数值
  deliver_addressInput: function (e) {
    this.setData({
      deliver_address: e.detail.value
    })
    deliver_address = e.detail.value
  },
  publisheditGoods:function(e){
    if (this.data.goods_id>0){
      this.editgoodsinfo();
    }else{
      this.publishGoods();
    }
  },
  //发布产品接口
  publishGoods:function(e){
    var that = this;
    var goods_imgsterarry = [];//解产品轮播图
    for (var i = 0; i < that.data.proinnerimg.length; i++) {
      goods_imgsterarry.push(that.data.proinnerimg[i].img_url)
    };
    var goods_desc_imgsterarry = [];//解产品描述图
    for (var i = 0; i < that.data.descimglist.length; i++) {
      goods_desc_imgsterarry.push(that.data.descimglist[i].img_url)
    };
    wx.request({
      url: app.globalData.url +'/shop/shop/createGoods',
      method: 'POST',
      data: { 
        goods_name:product_name,
        shop_id: that.data.shop_id,
        cat_id: that.data.catinfo[that.data.index].cat_id,
        price: price,
        org_price:org_price,
        freight_price:freight_price,
        stock_number:stock_number,
        goods_imgs: goods_imgsterarry,
        goods_desc:goods_desc,
        goods_desc_imgs: goods_desc_imgsterarry
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          console.log(res);
          wx.navigateBack()
      }
    })
  },
  //上传产品轮播图
  proinnerpic: function (e) {
    this.commaddimg("proinnerimg")
  },
  //上传产品描述图片数组
  addDecpicImg: function (e) {
    this.commaddimg("descimglist")
  },
  commaddimg:function(obj){
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original'],
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        var urlsrc = [];
        for (var i = 0; i < imgsrc.length; i++) {
          wx.uploadFile({
            url: app.globalData.url +'/shop/shop/uploadShopImgs',
            filePath: imgsrc[i],
            name: 'shop_imgs[]',
            formData: {},
            success: function (res) {
              var data = JSON.parse(res.data);
              var obj1 = { img_url: data.data[0] };
              urlsrc.push(obj1);
              if (obj =="proinnerimg"){
                that.setData({
                  proinnerimg: urlsrc,
                  innerwidth: urlsrc.length*100+100
                })
              }else{
                that.setData({
                  descimglist: urlsrc
                })
              }
              
            }
          })
        }
      }
    })
  },
  getclassdata:function(){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/shop/shop/getGoodsCatInfo',
      method: "get",
      data: { shop_id: _this.data.shop_id},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var arr = [];

        for (var i = 0; i < res.data.data.length;i++){
          arr.push(res.data.data[i].cat_name)
          _this.setData({
            array:arr,
            catinfo: res.data.data
          })
        }
      }
    })
  },
  refreshgoodsinfo: function (goods_id){
    var that = this;
    wx.request({
      url: app.globalData.url + '/shop/shop/getGoodsInfo',
      method: 'GET',
      data: {
        goods_id: goods_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var resdata = res.data.data;
        console.log(res);
        that.setData({
          proinnerimg: resdata.goods_imgs,//产品图片数组
          goods_name: resdata.goods_name,//产品名
          material: resdata.material,//材质
          price: resdata.price,//价格
          oldprice: resdata.org_price,//原价格
          stock_number: resdata.stock_number,//库存
          descimglist:resdata.goods_desc_imgs,//产品描述图片数组
          goods_desc:resdata.goods_desc//产品描述
        })
      }
    })
  },
  //编辑产品
  editgoodsinfo: function (goods_id){
    var that = this;
    wx.request({
      url: app.globalData.url + '/shop/shop/editGoodsInfo',
      method: 'POST',
      data: {
        goods_id: goods_id,
        goods_name: that.data.goods_name,
        shop_id: that.data.shop_id,
        cat_id: that.data.catinfo[that.data.index].cat_id,
        price: that.data.price,
        org_price: that.data.oldprice,
        freight_price: that.data.freight_price,
        stock_number: that.data.stock_number,
        delivery_address: that.data.deliver_address,
        goods_imgs: that.data.proinnerimg,//产品轮播图数组
        goods_desc: that.data.goods_desc,//产品描述
        goods_desc_imgs: that.data.descimglist,//产品描述图片数组
        material: that.data.material

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var resdata = res.data.data;
        console.log(res);
        wx.navigateBack()
        
      }
    })
  },
  //删除图片
  delpic:function(e){
    var that = this;
    wx.request({
      url: app.globalData.url + '/commons/common/deletePic',
      method: 'POST',
      data: {
        id: e.currentTarget.dataset.id,
        type:3
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var resdata = res.data.data;
        console.log(res);
        this.refreshgoodsinfo(this.data.goods_id);
      }
    })
  }
})