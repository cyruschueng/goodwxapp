var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip:null,
    imgUrls:[],
    list:[],
    glist:[],
    loading:false,
    pageModel: {
      pageIndex: 1,
      pageSize: 6,
      recordCount: 1
    },
  },
  navToCustomer(e){
    if(e.currentTarget.dataset.id == 2){
      wx.navigateTo({
        url: '/pages/category/category?id=108',
      })
    } else if (e.currentTarget.dataset.id == 3){
      wx.makePhoneCall({
        phoneNumber: '15320750155',
      })
    }else{
      wx.navigateTo({
        url: '/pages/customer/customer?id=' + e.currentTarget.dataset.id,
      })
    }
      
  },
  nav(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  navToSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //跳转到商品详情页
  navToGoods(e){
    wx.navigateTo({
      url: '/pages/goods/goods?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      loading:true
    })
    app.setWindowSize(this);
    this.getCarousel();
    this.getList();
    this.getGlist(0);
  },
  getGlist(num){
    
    var that = this;
    var pageIndex = this.data.pageModel.pageIndex;
    if(num == 0){
      pageIndex = 1;
    }else{
      pageIndex += 1
    }
    var data = {
      pageIndex: pageIndex,
      pageSize: this.data.pageModel.pageSize,
      storeId: app.storeId,
      searchString: '',
      commodityType: 1
    };
    if (this.data.glist.length < this.data.pageModel.recordCount || num == 0){
      this.setData({
        loading: true
      })
      app.post('commodity/info/finds', data, function (res) {
        var list = that.data.glist;
        if (num == 1) {
          for (var item in res.body.modelData) {
            list.push(res.body.modelData[item]);
          }
        } else {
          list = res.body.modelData
        }
        that.setData({
          pageModel: res.body.pageModel,
          glist: list,
          loading: false
        })
      })
    }
    
  },
  getCarousel(){
    var that = this;
    app.post('carousel/info/finds',{
      pageIndex: 1,
      pageSize: 10,
      storeId: app.storeId,
      searchString: '',
      carouselType: 1
    },function(res){
      that.setData({
        ip:app.ip,
        imgUrls: res.body.modelData
      })
    })
  },
  navToCategory(e){
    wx.navigateTo({
      url: '/pages/category/category?id='+e.currentTarget.dataset.id,
    })
  },
  getList(){
    var that = this;
    app.post('commodity/category/getTwos',{
      pageIndex: 1,
      pageSize: 3,
      categoryOneId:app.storeId,
      searchString: '',
      type: 1,
      categoryTwoType: 2
    },function(res){
      var cate = res.body.modelData;
      var num = 0;
      for(var item in cate){
        app.post('commodity/info/finds',{
          pageIndex: 1,
          pageSize: 8,
          storeId: app.storeId,
          categoryTwoId: cate[item].categoryTwoId,
          searchString: '',
          commodityType: 1
        },function(res){
          for (var it in cate){
            if (cate[it].categoryTwoId == res.body.modelData[0].categoryTwoId) {
              cate[it].goods = res.body.modelData;
            } 
          }
          if(item == cate.length-1){
            that.setData({
              list: cate,
              loading: false
            })
          }
        });
      }
    })
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
    this.getGlist(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:app.store.storeName,
      path:'/pages/index/index'
    }
  }
})