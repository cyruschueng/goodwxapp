var app = getApp()
Page({
  data: {
    opq:0,
    classify:[],
    noneshow:0,
    page:1,
    list:[]
  },
  onLoad: function (options) {
    app.load(this)
    var that = this
    wx.request({
      url: app.url + 'TClClass/select',
      success: function (res) {
        console.log(res)
        that.setData({
          opq: 1,
          classify: res.data.rows,
          keyword:''
        })
      }
    })
  },
  chan: function (e){
    var that = this
    wx.request({
      url: app.url + 'ShowIndexPro/showselect' ,
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data[e.currentTarget.id].tmemessage
        })
      }
    })
    
  },
  navToGoods: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.id,
    })
  },
  inputSearch: function (e){
    var that = this
    if(e.detail.value != ''){
      wx.request({
        url: app.url + 'TmeMessage/select',
        data: {
          limit: 6,
          pageIndex: 1,
          searchname: e.detail.value
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res)
          that.setData({
            list: res.data.rows,
            keyword: e.detail.value
          })
        }
      })
    }else{
      this.setData({
        list:[]
      })
    }
    
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
})