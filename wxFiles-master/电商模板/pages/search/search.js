var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like: '#',
    list: [],
    loading: false,
    record: [],
    showRecord: false,
    pageModel:{
      pageIndex: 1,
      pageSize: 10,
      recordCount:1
    }
    
  },
  goToShopBuy: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.dataset.id,
    })
  },
  focus() {
    this.setData({ showRecord: true })
  },
  blur() {
    this.setData({ showRecord: false })
  },
  recSearch(e) {
    this.setData({ like: e.currentTarget.dataset.item })
    this.getGoods(0)
  },
  clearRecord: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '清空将无法找回记录，是否继续?',
      success: function (res) {
        if (res.confirm) {
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
    if (key == '') {
      key = '#'
    }
    this.setData({
      like: key
    })
    this.getRecord();
    this.getGoods(0);
  },
  //获得历史记录
  getRecord: function (e) {
    if (wx.getStorageSync("record")) {
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
    var that = this;
    
    if (that.data.list.length < that.data.pageModel.recordCount || num == 0){
      this.setData({
        loading: true
      })
      app.post('commodity/info/finds', {
        pageIndex: this.data.pageModel.pageIndex,
        pageSize: this.data.pageModel.pageSize,
        storeId: app.storeId,
        commodityType: 1,
        searchString: this.data.like
      }, function (res) {
        var list = that.data.list;
        var rec = [];
        if (wx.getStorageSync("record")) {
          rec = wx.getStorageSync("record")
        }
        if (res.body.modelData.length > 0) {
          var temp = false;
          for (var i = 0; i < rec.length; i++) {
            if (rec[i] == that.data.like) {
              temp = true
            }
          }
          if (!temp) {
            rec.push(that.data.like);
            wx.setStorageSync("record", rec);
          }

        }
        if (num > 0) {
          for (var i = 0; i < res.body.modelData.length; i++) {
            list.push(res.body.modelData[i])
          }
        } else {
          list = res.body.modelData
        }
        that.getRecord();
        that.setData({
          loading: false,
          list: list,
          url: app.ip,
          pageModel: res.body.pageModel
        })
      })
    }
    
  },

  onReachBottom: function () {
    this.getGoods(this.data.list.length);
  },
})