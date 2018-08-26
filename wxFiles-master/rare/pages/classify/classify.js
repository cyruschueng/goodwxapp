var app = getApp()
Page({
  data: {
    opq:0,
    position:1,
    list:[],
    li:[],
    sea:0,
    key:'',
    classname:'',
    gli:[]
  },
  gotoClassify: function(e){
    var that = this
    if(this.data.position == 1){
      this.setData({
        position: 2
      })
    }else{
      this.setData({
        position: 1
      })
    }
    wx.request({
      url: app.url + 'ShowIndexPro/showselect',
      success: function(res){
        console.log(res)
        that.setData({
          gli: res.data[e.currentTarget.dataset.id].tmemessage,
          classname: res.data[e.currentTarget.dataset.id].classname
        })
      }
    })
  },
  //产品详情
  navToGoods: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.id,
    })
  },
  delsearch: function () {
    var that = this
    this.setData({
      key:'',
      sea:0,
      li:that.data.list
    })
  },
  onLoad: function (options) {
    var that = this
    app.load(that)
    wx.request({
      url: app.url + 'TClClass/select',
      success: function (res){
        console.log(res)
        that.setData({
          opq: 1,
          list:res.data.rows,
          li: res.data.rows
        })
      }
    })
  },
  searchClassify: function(e){
    var that = this
    var key = e.detail.value
    this.setData({
      key:key
    })
    var optem = [];
    var list = that.data.list;
    for(var i=0;i<list.length;i++){
      if(list[i].classname.indexOf(key) >-1){
        optem.push(list[i])
      }
    }
    if(this.data.key == ""){
      optem = list
      this.setData({
        sea: 0
      })
    }else{
      this.setData({
        sea: 1
      })
    }
    this.setData({
      li:optem
    })
  },
  onShow: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  onReachBottom: function () {
  
  },
  onPullDownRefresh: function () {
  
  }
})