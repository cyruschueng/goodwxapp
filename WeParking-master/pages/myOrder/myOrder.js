// myOrder.js

var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['我的共享', '我的预约'],
    currentTab: 0,
    sharePageIndex: 1,
    shareOrders: [],
    shareHasMore: true,
    share_load_more_text: '加载中..',
    share_show_more_hidden: true,
    share_no_data_hidden: true,
    bookPageIndex: 1,
    bookOrders: [],
    bookHasMore: true,
    book_load_more_text: '加载中..',
    book_show_more_hidden: true,
    book_no_data_hidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShareInfo()
    this.getBookInfo()
  },

  //获得共享数据
  getShareInfo: function () {
    var that = this
    if(that.data.sharePageIndex==1){
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.request({
      url: app.globalData.serverUrl + 'getOrderInfoList.als',
      data: { token: wx.getStorageSync('token'),infoType:0, pageIndex: that.data.sharePageIndex },
      success: function (res) {
        if(that.data.sharePageIndex==1){
          wx.hideLoading()
        }
        if (res.data.status == 0) {
          //有数据
          if (res.data.orderDetail.length > 0) {
            if (that.data.shareOrders.length == 0) {
              that.setData({
                shareOrders: res.data.orderDetail,
                share_show_more_hidden: true
              })
            } else {
              var orderList = []
              orderList = that.data.shareOrders.concat(res.data.orderDetail)
              that.setData({
                shareOrders: orderList,
                share_show_more_hidden: true
              })
            }
          }
          //第一次就没数据
          else if (that.data.sharePageIndex == 1 && res.data.orderDetail.length == 0) {
            that.setData({
              shareHasMore: false,
              share_no_data_hidden: false
            })
          }
          //后续没数据
          else if (res.data.orderDetail.length == 0) {
            that.setData({
              shareHasMore: false,
              share_show_more_hidden: false,
              share_load_more_text: '没有数据了..'
            })
          }
        } else {
          wx.showToast({
            title: '出错了',
            icon: 'loading',
            duration: 1000
          })
        }
      },
      fail: function () {
        if(that.data.sharePageIndex==1){
          wx.hideLoading()
        }
        wx.showToast({
          title: '出错了',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //共享上拉
    if(this.data.currentTab==0){
      if (this.data.shareHasMore) {
        this.setData({
          share_load_more_text: '加载中..',
          share_show_more_hidden: false,
          sharePageIndex: ++this.data.sharePageIndex
        })
        this.getShareInfo()
      }
    }
  },

  //获得预约数据
  getBookInfo: function () {
    var that = this
    if (that.data.bookPageIndex == 1) {
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.request({
      url: app.globalData.serverUrl + 'getOrderInfoList.als',
      data: { token: wx.getStorageSync('token'), infoType: 1, pageIndex: that.data.bookPageIndex },
      success: function (res) {
        if (that.data.bookPageIndex == 1) {
          wx.hideLoading()
        }
        if (res.data.status == 0) {
          //有数据
          if (res.data.orderDetail.length > 0) {
            if (that.data.bookOrders.length == 0) {
              that.setData({
                bookOrders: res.data.orderDetail,
                book_show_more_hidden: true
              })
            } else {
              var orderList = []
              orderList = that.data.bookOrders.concat(res.data.orderDetail)
              that.setData({
                bookOrders: orderList,
                book_show_more_hidden: true
              })
            }
          }
          //第一次就没数据
          else if (that.data.bookPageIndex == 1 && res.data.orderDetail.length == 0) {
            that.setData({
              bookHasMore: false,
              book_no_data_hidden: false
            })
          }
          //后续没数据
          else if (res.data.orderDetail.length == 0) {
            that.setData({
              bookHasMore: false,
              book_show_more_hidden: false,
              book_load_more_text: '没有数据了..'
            })
          }
        } else {
          wx.showToast({
            title: '出错了',
            icon: 'loading',
            duration: 1000
          })
        }
      },
      fail: function () {
        if (that.data.bookPageIndex == 1) {
          wx.hideLoading()
        }
        wx.showToast({
          title: '出错了',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //共享上拉
    if (this.data.currentTab == 0) {
      if (this.data.shareHasMore) {
        this.setData({
          share_load_more_text: '加载中..',
          share_show_more_hidden: false,
          sharePageIndex: ++this.data.sharePageIndex
        })
        this.getShareInfo()
      }
    }
    //预约上拉
    else if (this.data.currentTab == 1) {
      if (this.data.bookHasMore) {
        this.setData({
          book_load_more_text: '加载中..',
          book_show_more_hidden: false,
          bookPageIndex: ++this.data.bookPageIndex
        })
        this.getBookInfo()
      }
    }
  },

  getShareOrderDetail:function(e){
    wx.navigateTo({
      url: '/pages/shareInfoDetail/shareInfoDetail?orderId='+e.currentTarget.dataset.id,
    })
  },
  getBookOrderDetail: function (e) {
    wx.navigateTo({
      url: '/pages/bookInfoDetail/bookInfoDetail?orderId=' + e.currentTarget.dataset.id,
    })
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})