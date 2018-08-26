var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip:'',
    cate:[],
    tempId:-1,
    pageModel:{
      pageIndex:1,
      pageSize: 6,
      recordCount:1
    },
    showBottomText:false,
    list:[],
    loading:false
  },
  //跳转到商品详情页
  navToGoods(e) {
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //id -1 为全部
    this.getCate(options.id);
    app.setWindowSize(this);
  },
  changeBar(e){
    var id = -1;
    for (var item in this.data.cate) {
      this.data.cate[item].active = false;
    }
    for (var item in this.data.cate) {
      if (this.data.cate[item].categoryTwoId == e.currentTarget.dataset.id) {
        this.data.cate[item].active = true;
        id = this.data.cate[item].categoryTwoId;
      }
    }
    this.getGoods(id,0);
  },
  //获取商品
  getGoods(id,num){
    
    var that = this;
    var pageIndex = this.data.pageModel.pageIndex;
    if(num == 0){
      pageIndex = 1;
    }else{
      pageIndex += 1;
    }
    var data ={
      pageIndex: pageIndex,
      pageSize: this.data.pageModel.pageSize,
      storeId: app.storeId,
      searchString: '',
      commodityType: 1
    };
    if(id != -1){
      data.categoryTwoId = id
    } 
    if (this.data.list.length < this.data.pageModel.recordCount || num == 0){
      this.setData({
        loading: true
      })
      app.post('commodity/info/finds', data, function (res) {
        var list = that.data.list;
        if (num == 1) {
          for (var item in res.body.modelData) {
            list.push(res.body.modelData[item]);
          }
        } else {
          list = res.body.modelData
        }
        that.setData({
          tempId: id,
          pageModel: res.body.pageModel,
          list: list,
          cate: that.data.cate,
          loading: false
        })
      })
    } else if (this.data.list.length == this.data.pageModel.recordCount){
      that.setData({
        showBottomText:true
      })
    }
    
  },
  //获取分类
  getCate(num){
    var that = this;
    app.post('commodity/category/getTwos', {
      pageIndex: 1,
      pageSize: 50,
      categoryOneId: app.storeId,
      searchString: '',
      type: 1,
      categoryTwoType: 2
    },function(res){
        var list = [];
        list.push({ categoryTwoName: '全部', categoryTwoId:-1,active:false});
        for(var item in res.body.modelData){
          res.body.modelData[item].active = false;
          list.push(res.body.modelData[item])
        }
        for (var item in list) {
          if (list[item].categoryTwoId == num){
            list[item].active = true;
          }
        }
        that.setData({
          cate:list,
          ip:app.ip
        });
        that.getGoods(num,0);
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
    this.getGoods(this.data.tempId,1);
  },

  onShareAppMessage:function(){
    var that = this;
    return {
      title: '商城分类',
      path: '/pages/category/category?id=' + that.data.tempId
    }
  }
})