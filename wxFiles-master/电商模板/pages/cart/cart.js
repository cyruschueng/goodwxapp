var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    loading:false,
    countPrice:0,
    checkedAll:false,
    ip:null
  },
  navToPayfor(e){
    var list = this.data.list;
    var li = [];
    for(var item in list){
      if(list[item].active){
        li.push(list[item]);
      }
    }
    var that = this;
    wx.navigateTo({
      url: '/pages/payfor/payfor?shop=' + JSON.stringify(li) + '&countPrice=' + that.data.countPrice,
    })
  },
  deletes(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除？',
      success: function(res){
        if(res.confirm){
          app.post('order/item/wx/deletes', {
            itemIds: e.currentTarget.dataset.id
          }, function (res) {
            if (res.code == 1000) {
              that.getCart();
            }
          })
        }
      }
    })
  },
  chooseIt(e){
    var that = this;
    that.data.list[e.currentTarget.dataset.index].active = !that.data.list[e.currentTarget.dataset.index].active;
    that.setData({
      list:that.data.list
    })
    this.count()
  },
  count(){
    var that = this;
    var count  = 0;
    var all = 0;
    var checkedAll = false;
    for(var item in this.data.list){
      if (this.data.list[item].active){
        count += this.data.list[item].itemPrice;
        all += 1;
      }
    }
    if (all == this.data.list.length){
      checkedAll = true
    }
    this.setData({
      countPrice: count,
      checkedAll: checkedAll
    })
  },
  chooseAll(){
    var that = this;
    var ca = false;
    if (this.data.checkedAll){
      for (var item in this.data.list) {
        this.data.list[item].active = false;
      }
      ca = false;
    }else{
      for (var item in this.data.list) {
        this.data.list[item].active = true;
      }
      ca = true
    }
    this.count();
    that.setData({
      list: that.data.list,
      checkedAll: ca
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getCart(){
    var that = this;
    app.post('order/item/wx/finds',{
      shopCarId:app.userInfo.shopCarId
    },function(res){
      for(var item in res.body.modelData){
        res.body.modelData[item].active = false;
      }
      that.setData({
        ip:app.ip,
        list: res.body.modelData
      })
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
    this.getCart();
  },

})