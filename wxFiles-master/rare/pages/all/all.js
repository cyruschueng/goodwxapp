var app = getApp()
Page({
  data: {
    opq:0,
    innerHeight: 0,
    innerWidth: 0,
    tap:0,
    limit:6,
    pageIndex:1,
    list: [],
    spage:1,
    slist:[]
  },
  //产品详情
  navToGoods: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.id,
    })
  },
  changetap: function (e) {
    this.setData({
      tap: e.currentTarget.dataset.id
    })
    this.load();
  },
  changesw: function (e) {
    this.setData({
      tap: e.detail.current
    })
    this.load();
  },
  load: function () {
    var that = this
    if (that.data.tap == 0) {
      wx.request({
        url: app.url + 'ShowIndexPro/MsgSelect',
        method: 'get',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          SalesFalg: 0,
          integralFlag: 0,
          limit: that.data.limit,
          pageIndex: 1
        },
        success: function (res) {
          that.setData({
            opq: 1
          })
          console.log(res)
          that.setData({
            list: res.data
          })
        }
      })
    } else {
      
      wx.request({
        url: app.url + 'ShowIndexPro/MsgSelect',
        data: {
          SalesFalg: 1,
          integralFlag: 0,
          limit: that.data.limit,
          pageIndex: 1
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          that.setData({
            opq: 1
          })
          if (res.data.length > 0) {
            that.setData({
              slist: res.data
            })
          }
        }
      })
    }
  },
  onLoad: function (options) {
    var that = this
    app.load(that);
    if(options.ty == 'all'){
      this.setData({
        tap: 0 
      })
    }else{
      this.setData({
        tap: 1
      })
    }
    that.load()
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onReachBottom: function (e) {
    var that = this
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 800 
      })
      if(that.data.tap == 0){
        var page = that.data.pageIndex + 1 
        that.setData({
          pageIndex: page
        })
        wx.request({
          url: app.url + 'ShowIndexPro/MsgSelect',
          method: 'get',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            SalesFalg: 0,
            integralFlag: 0,
            limit: that.data.limit,
            pageIndex: page
          },
          success: function (res) {
            console.log(res)
            var li = that.data.list
            if(res.data.length > 0){
              for (var i = 0; i < res.data.length; i++) {
                li.push(res.data[i])
              }
            }
            that.setData({
              list: li
            })
          }
        })
      }else{
        var page = that.data.spage + 1 
        that.setData({
          spage: page
        })
        wx.request({
          url: app.url + 'ShowIndexPro/MsgSelect',
          data: {
            SalesFalg: 1,
            integralFlag: 0,
            limit: that.data.limit,
            pageIndex: page
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var li = that.data.slist
            if (res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                li.push(res.data[i])
              }
              that.setData({
                slist: li
              })
            }
          }
        })
      }
  },
  onShareAppMessage: function () {
  
  },
  onPullDownRefresh: function () {
    var that = this
    if (that.data.tap == 0) {
      that.setData({
        pageIndex: 1
      })
      wx.request({
        url: app.url + 'ShowIndexPro/MsgSelect',
        method: 'get',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          SalesFalg: 0,
          integralFlag: 0,
          limit: that.data.limit,
          pageIndex: 1
        },
        success: function (res) {
          wx.stopPullDownRefresh()
          console.log(res)
          that.setData({
            list: res.data
          })
        }
      })
    } else {
      this.setData({
        tap: 1
      })
    }
  }
})