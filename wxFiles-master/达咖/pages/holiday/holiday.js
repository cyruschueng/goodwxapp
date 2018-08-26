var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like:'',
    list:[],
    loading:false
  },
  doSearch: function () {
    this.getGoods(0)
  },
  searchInput: function (e) {
    this.setData({
      like:e.detail.value
    })
  },
  navToGoodsDetail: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?shopid=' + that.data.list[e.currentTarget.dataset.index].shopid + '&id=' + that.data.list[e.currentTarget.dataset.index].id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods(0);
  },
  getGoods: function (num) {
    this.setData({loading:true})
    var that = this;
    var data = {ptype:1,start:num}
    if(that.data.like != ''){
      data.like = that.data.like
    }
    app.wxRequest('product/wx/search.do',data, function (res) {
      var list = that.data.list;
      if (num > 0) {
        for (var i = 0; i < res.length; i++) {
          list.push(res[i])
        }
      } else {
        list = res
      }
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
})