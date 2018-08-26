var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like: '#',
    list: [],
    loading: false,
    record:[],
    showRecord: false,
  },
  goToShopBuy: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/shop/shop?shopid=' + e.currentTarget.dataset.shopid + '&shop=' + JSON.stringify(e.currentTarget.dataset.shop),
    })
  },
  focus(){
    this.setData({showRecord:true})
  },
  blur(){
    this.setData({ showRecord: false })
  },
  recSearch(e){
    this.setData({like:e.currentTarget.dataset.item})
    this.getGoods(0)
  },
  clearRecord:function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '清空将无法找回记录，是否继续?',
      success: function (res){
        if(res.confirm){
          wx.setStorageSync("record", []);
          that.getRecord()
        }
      }
    })
    
  },
  doSearch: function () {
    this.getGoods(0)
  },
  searchInput: function (e) {
    var key = e.detail.value;
    if(key == ''){
      key = '#'
    }
    this.setData({
      like: key
    })
    this.getRecord();
  },
  //获得历史记录
  getRecord: function (e){
    if(wx.getStorageSync("record")){
      this.setData({
        record: wx.getStorageSync("record")
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods(0);
    this.getRecord();
  },
  getGoods: function (num) {
    this.setData({ loading: true })
    var that = this;
    var data = { ptype: 0, start: num }
    if (that.data.like != '') {
      data.like = that.data.like
    }
    app.wxRequest('product/wx/search.do', data, function (res) {
      var list = that.data.list;
      var rec = [];
      if(wx.getStorageSync("record")){
        rec = wx.getStorageSync("record")
      }
      if(res.length > 0){
        var temp = false;
        for(var i=0;i<rec.length;i++){
          if (rec[i] == that.data.like ){
            temp = true
          }
        }
        if(!temp){
          rec.push(that.data.like);
          wx.setStorageSync("record", rec);
        }
        
      }
      if(num > 0){
        for(var i=0;i<res.length;i++){
          list.push(res[i])
        }
      }else{
        list = res
      }
      that.getRecord();
      that.setData({
        loading: false,
        list: list,
        url: app.ip
      })
    })
  },

  onReachBottom: function () {
    this.getGoods(this.data.list.length);
  },
})