var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   * tempParam 过渡参数   0为加入购物车  1为立即购物
   * tempPriceD 折后价
   */
  data: {
    version:1,
    store:null,
    ip:null,
    imgUrls: [],
    msg:null,
    showCan:false,
    count:1,
    tempParam:0,
    showGui:false,
    glist:[],
    tempPrice:null,
    tempPriceD: null,
    tempPhoto:null,
    tempChoose:'未选择',
    tempChooseId:null,
  },
  //加入购物车 或 立即购买
  submitToBuyStyle(){
    var that = this;
    var sid = -1;
    for(var item in this.data.glist){
      if (this.data.glist[item].active){
        sid = this.data.glist[item].specificationId;
      }
    }
    //判断是否选择了规格
    if(sid == -1){
      wx.showToast({
        title: '请选择规格',
        image:'/img/60.png',
        duration:800
      })
    }else{
      //添加到购物车
      if (this.data.tempParam == 0){
        wx.showLoading({
          title: '',
        })
        app.post('order/item/wx/add',{
          specificationId:sid,
          shopCarId:app.userInfo.shopCarId,
          itemCount:this.data.count
        },function(res){
          wx.hideLoading();
          if(res.code == 1000){
            wx.showToast({
              title: '已加入购物车',
              duration:800
            })
            that.setData({
              showGui:false
            })
          }else{
            wx.showToast({
              title: '加入购物车失败',
              duration: 800
            })
          }
        })
      }else{
        //立即购买
        var countp = 0;
        if(this.data.msg.isDiscount == 1){
          countp = this.data.tempPriceD*this.data.count
        }else{
          countp = this.data.tempPrice * this.data.count
        }
        var simple = { itemCount: this.data.count, commodityName: this.data.msg.commodityName, specificationId: this.data.tempChooseId, specificationName:this.data.tempChoose,imagePath:this.data.tempPhoto,itemPrice:countp};
        wx.navigateTo({
          url: '/pages/payfor/payfor?countPrice=' + countp+'&simple='+JSON.stringify(simple),
        })
      }
    }
  },
  //数量 加
  addCount(){
    var count = this.data.count+1;
    this.setData({
      count:count
    })
  },
  //数量 减
  minCount(){
    var count = this.data.count;
    if (this.data.count > 1){
      count = count - 1;
    }
    this.setData({
      count: count
    })
  },
  initChooseGui(){
    for(var item in this.data.glist){
      this.data.glist[item].active = false;
    }
  },
  //选择规格
  chooseGui(e){
    var tempPrice = null;
    var tempPhoto = null;
    var tempPriceD = null;
    var tempChoose = '未选择';
    var tempChooseId = null;
    if (this.data.glist[e.currentTarget.dataset.index].active){
      this.data.glist[e.currentTarget.dataset.index].active = false;
      tempPrice = this.data.msg.commodityPrice;
      tempPhoto = this.data.msg.imagePath;
      tempPriceD = this.data.msg.commodityPrice;
    }else{
      this.initChooseGui();
      this.data.glist[e.currentTarget.dataset.index].active = true;
      tempPrice = this.data.glist[e.currentTarget.dataset.index].specificationPrice;
      tempPhoto = this.data.glist[e.currentTarget.dataset.index].imagePath;
      tempPriceD = this.data.glist[e.currentTarget.dataset.index].specificationPrice;
      tempChoose = this.data.glist[e.currentTarget.dataset.index].specificationName;
      tempChooseId = this.data.glist[e.currentTarget.dataset.index].specificationId
    }
    var that = this;
    if(this.data.msg.isDiscount == 1){
      tempPriceD = (tempPriceD * this.data.msg.commodityDiscount).toFixed(2);
    }
    this.setData({
      tempChooseId: tempChooseId,
      tempChoose: tempChoose,
      glist:that.data.glist,
      tempPrice:tempPrice,
      tempPriceD: tempPriceD,
      tempPhoto: tempPhoto
    })
  },

  //输入数量
  counted(e){
    var that = this;
    if(e.detail.value < 1){
      that.setData({
        count:1
      })
    }else{
      that.setData({
        count: e.detail.value
      })
    }
  },
  // 过渡方法   获取规格
  tempDu(e){
    var that = this;
    app.post('commodity/specification/finds',{
      pageIndex: 1,
      pageSize: 100,
      commodityId: that.data.id,
      searchString: ''
    },function(res){
      for (var item in res.body.modelData){
        res.body.modelData.active = false
      }
      that.setData({
        showGui: true,
        tempParam: e.currentTarget.dataset.id,
        glist:res.body.modelData
      })
    })
  },

  // 关闭选择
  closePanel(){
    var that = this;
    that.setData({
      showGui:false
    })
  },

  //打开参数面板
  openCan(){
    var that = this;
    if(this.data.showCan){
      this.setData({
        showCan:false
      })
    }else{
      this.setData({
        showCan: true
      })
    }
  },
  switchToHome(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  switchToCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.setWindowSize(this);
    this.getGoods(options.id);
    
  },
  getCarousel(id){
    var that = this;
    app.post('carousel/info/finds', {
      pageIndex: 1,
      pageSize: 10,
      commodityId: id,
      searchString: '',
      carouselType: 2
    }, function (res) {
      var list = [];
      console.log(that.data.msg.imagePath);
      list.push({ imagePath: that.data.msg.imagePath});
      for (var item in res.body.modelData){
        list.push(res.body.modelData[item])
      }
      that.setData({
        version:app.version,
        store:app.store,
        id:id,
        ip:app.ip,
        imgUrls:list
      })
    })
  },
  getGoods(id){
    var that = this;
    app.post('commodity/info/find',{
      commodityId: id
    },function(res){
      var article = res.body.knowMore;
      res.body.commodityValues = JSON.parse(res.body.commodityValues);
      WxParse.wxParse('article', 'html', article, that, 5);
      var tempPriceD = res.body.commodityPrice;
      if (res.body.isDiscount == 1) {
        tempPriceD = (tempPriceD * res.body.commodityDiscount).toFixed(2);
      }
      that.setData({
        msg:res.body,
        tempPrice: res.body.commodityPrice,
        tempPriceD:tempPriceD,
        tempPhoto:res.body.imagePath
      })
      that.getCarousel(id);
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


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: that.data.msg.commodityName,
      path: '/pages/goods/goods?id=' + that.data.msg.commodityId
    }
  }
})